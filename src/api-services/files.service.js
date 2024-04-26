import config from '@/api-services/_config';

export default {
  start(data){
    return fetch(`${config.url}/file:upload/start`, {method: 'POST', body: JSON.stringify(data) });
  },
  uploadFile(data) {
    return fetch(`${config.url}/file:upload/upload`, { method: 'POST', body: config.makeFormData(data) }).then(res => res.json());
  },
  fileUrl(data){
    return fetch(`${config.url}/file:upload/file-url`, { method: 'POST', body: config.makeFormData(data) });
  },
  uploadFileByLink(data) {
    return fetch(`${config.url}/file:upload/upload-by-link`, { method: 'POST', body: config.makeFormData(data) }).then(res => res.json());
  },
  finishUpload(data) {
    return fetch(`${config.url}/file:upload/finish-upload`, { method: 'POST', body: config.makeFormData(data) }).then(res => res.json());
  },
  getFiles(data) {
    return fetch(`${config.url}/file:index/get-all-files`, { method: 'POST', body: config.makeFormData(data) }).then(res => res.json());
  },
  getFile(file_id) {
    return fetch(`${config.url}/file:index/get-file?file_id=${file_id}`, { method: 'GET' }).then(res => res.json());
  },
  getFilesByModel(data) {
    return fetch(`${config.url}/file:index/get-files-for-model`, { method: 'POST', body: config.makeFormData(data) }).then(res => res.json());
  },
  archiveFile(data) {
    return fetch(`${config.url}/file:index/delete-file`, { method: 'POST', body: config.makeFormData(data) }).then(res => res.json());
  },
  disable(data) {
    return fetch(`${config.url}/file:index/disable-file`, { method: 'POST', body: config.makeFormData(data) }).then(res => res.json());
  },
  getTotalMapped(data) {
    return fetch(`${config.url}/file:index/get-mapped`, { method: 'POST', body: config.makeFormData(data) }).then(res => res.json());
  },
  getModelsForFile(data) {
    return fetch(`${config.url}/file:index/get-models`, { method: 'POST', body: config.makeFormData(data) }).then(res => res.json());
  },
  updateModelsForFile(data) {
    return fetch(`${config.url}/file:index/update-models`, { method: 'POST', body: config.makeFormData(data) }).then(res => res.json());
  },
  getAllFilesByModel(data) {
    return fetch(`${config.url}/file:index/get-all-files-by-model`, { method: 'POST', body: config.makeFormData(data) }).then(res => res.json());
  },
  updateFilesForModel(data) {
    return fetch(`${config.url}/file:index/update-files-for-model`, { method: 'POST', body: config.makeFormData(data) }).then(res => res.json());
  },
  completeFileDelete(data){
    return fetch(`${config.url}/file:index/complete-file-deletion`, { method: 'POST', body: config.makeFormData(data) }).then(res => res.json());
  },
  uploadImage(data) {
    let reader = new FileReader(),
        form = new FormData();
    reader.readAsDataURL(data.image);
    form.append('image', data.image);
    form.append('file_type', data.image.type);
    return fetch(`${config.url}/ezuploader:index/upload-image`, { method: 'POST', body: form }).then(res => res.json());
  }
};
