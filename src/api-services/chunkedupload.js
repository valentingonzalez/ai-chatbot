import config from '@/api-services/_config';

/* eslint-disable no-undef */
/* eslint-disable no-constant-condition */
let chunkedUploadDebug = false;

window.sleep = async function(time) {
  return new Promise(resolve => {
    setTimeout(resolve, time);
  });
};

class UploadHandle {
  constructor(fileObject, progressCallback, keyCallback) {
    this.keyCallback = keyCallback;
    this.progressCallback = progressCallback;
    this.promise = chunkedUploadInner(fileObject, this.onEvent.bind(this));
    this.uploadKey = '';
    this.xhrRef = null;
  }
  onEvent(type, value) {
    if(type === 'key') {
      this.uploadKey = value;
      if(this.keyCallback) {
        this.keyCallback(value);
      }
    }
    if(type === 'xhr') {
      this.xhrRef = value;
    }
    if(type === 'progress' && this.progressCallback) {
      this.progressCallback(value);
    }
  }
  abort() {
    if(this.xhrRef) {
      this.xhrRef.abort();
    }
  }
  // Waits for completion and returns upload key
  async wait() {
    return await this.promise;
  }
}

/**
 * Perform a chunked upload of a file object.
 *
 * // js:
 * const uploadKey = await chunkedUpload(someFileInput.files[0]);
 * sendDataToServer({uploadKey, other, fields});
 *
 * // php:
 * $filePath = ChunkedUpload::moveFile($uploadKey, RPG_ROOT . '/tmp');
 * if(!$filePath) {
 *   // error
 * }
 * makeThumbnail($filePath); // etc.
 *
 * @param {File} fileObject A file object, like from fileInputElement.files[0]
 * @param progressCallback
 * @return {UploadHandle} The upload key you can use on the server to get the file.
 */
function chunkedUpload(fileObject, progressCallback, keyCallback) {
  return new UploadHandle(fileObject, progressCallback, keyCallback);
}

async function chunkedUploadInner(fileObject, events) {
  
  let startResult, bytesUploaded = 0;

  if(!startResult) {
    let res = await fetch(`${config.url}/file:upload/start`, {
      method: 'POST',
      body: JSON.stringify({ name: fileObject.name, size: fileObject.size, type: fileObject.type })
    });
    startResult = await res.json();
    if(startResult.status !== 'ok') {
      throw new Error('start request failed: ' + startResult.message);
    }

    //window.localStorage.setItem('wetChunk-' + md5sum, JSON.stringify(startResult));
    chunkedUploadDebug && console.log('uploadStart', startResult);
  }
  events && events('key', startResult.uploadKey);

  events && events('progress', 1.0);

  const { uploadKey, chunkSize } = startResult;
  const chunks = Math.ceil(fileObject.size / chunkSize);
  const totalSize = fileObject.size;
  const startChunk = Math.floor(bytesUploaded / chunkSize);

  for(let i = startChunk; i < chunks; i++) {
    // end exclusive, so 0-50000 gives bytes 0-49999

    // For recovery: We will constantly retry a single chunk, changing the startByte based on the
    // return value of chunkedUploadProgress.
    // The start byte would be the return value modulo chunk size. So if 5,250,000 bytes are uploaded
    // and the chunk size is 5,000,000, we'll still be on chunk #2 and start at 250,000.
    // We will not try and modify the end byte to keep it simpler.

    let chunkRes;
    let thisChunkSize;

    // resets when a chunk is successfully uploaded.
    // for the first iteration, use bytesUploaded in case it's non-zero, and we need to start at a
    // higher number in the middle of a chunk.
    let currentProgress = 0;
    if(i === startChunk) {
      currentProgress = bytesUploaded;
    }

    while(true) {
      const startByte = i * chunkSize + (currentProgress % chunkSize);
      const endByte = Math.min(fileObject.size, (i + 1) * chunkSize);
      chunkedUploadDebug && console.log('chunk', i, startByte, endByte);
      const blob = fileObject.slice(startByte, endByte);
      thisChunkSize = endByte - startByte;

      const xhr = new XMLHttpRequest();
      events && events('xhr', xhr);
      chunkRes = await new Promise(resolve => {
        if(events) {
          xhr.upload.addEventListener('progress', event => {
            if(event.lengthComputable) {
              let chunkProgress = event.loaded / event.total * 100;
              let totalProgress = 100 * (bytesUploaded + event.loaded) / totalSize;
              chunkedUploadDebug && console.log('upload progress:', chunkProgress, totalProgress);
              // we set 1% on the upload/start call so the rest is 99%
              events && events('progress', Math.round(1.0 + .99 * totalProgress));
            }
          });
        }
        xhr.addEventListener('loadend', () => {
          // a server error will fire loadend with a non 200 status
          chunkedUploadDebug && console.log('xhr loadend', xhr.readyState, xhr.status);
          if(xhr.readyState === 4 && xhr.status === 200) {
            resolve(JSON.parse(xhr.responseText));
          }
        });
        xhr.addEventListener('error', () => {
          // client error like network disconnection will fire the error event
          resolve('error');
        });

        xhr.addEventListener('abort', () => {
          resolve('abort');
        });

        xhr.open('POST', `${config.url}/file:upload/chunk/${uploadKey}`, true);
        xhr.setRequestHeader("Wet-Range-Start", startByte.toString());
        xhr.setRequestHeader("Wet-Range-End", endByte.toString());
        xhr.setRequestHeader("Wet-Chunk-Index", i.toString());
        xhr.setRequestHeader("Wet-Api-Request", 'true');
        xhr.setRequestHeader('X-Auth-Token', config.sessionValue);
        xhr.send(blob);
      });
      if(chunkRes === 'error') {
        currentProgress = await chunkedUploadProgressRetry(uploadKey);
        bytesUploaded = currentProgress;
      } else {
        break;
      }
    }

    if(chunkRes === 'abort') {
      return null;
    }

    if(chunkRes.status !== 'ok') {
      throw new Error('upload request failed');
    }

    bytesUploaded += thisChunkSize;
    if(chunkRes.bytesUploaded !== bytesUploaded || chunkRes.bytesSent !== thisChunkSize) {
      throw new Error('upload request failed - size mismatch');
    }
  }

  // remove this on successful upload
  //window.localStorage.removeItem('wetChunk-' + md5sum);
  return uploadKey;
}

async function chunkedUploadProgressRetry(key) {
  while(true) {
    try {
      return await chunkedUploadProgress(key);
    } catch(e) {
      await sleep(5000);
    }
  }
}

/**
 *
 * @param {String} key
 * @returns {Promise<Number>}
 */
async function chunkedUploadProgress(key) {
  const res = await fetch(`${config.url}/file:upload/progress/${key}`);
  const result = await res.json();
  if(result.status !== 'ok') {
    //throw new Error('progress request failed');
    return 0;
  }
  return result.bytesUploaded;
}

export default chunkedUpload;