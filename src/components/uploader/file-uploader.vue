<!-- eslint-disable no-unreachable -->
<template>
  <div id="fileUploader" class="fs-7" :class="{ 'minimized': minimized }" v-show="false">
    <div class="header pt-4 pb-3 fw-bold px-4 py-2 cursor-pointer" @click="toggle">
      <h4 class="mb-0">Uploads</h4>
    </div>
    <div class="body">
      <div class="px-4">
        <FileCard v-for="(file, i) in files" :file="file" :class="{ 'mb-1' : i < files.length - 1 }" :key="i" @onDelete="deleteFile" />
      </div>
    </div>
    <input multiple @change="upload" ref="file" type="file" class="d-none" :accept="allowedFileTypes || '*'" />
  </div>
</template>

<script>
  const supportsFileSystemAccessAPI = 'getAsFileSystemHandle' in DataTransferItem.prototype;
  const supportsWebkitGetAsEntry = 'webkitGetAsEntry' in DataTransferItem.prototype;

  import FileCard from '@/components/cards/file-card';
  import chunkedUpload from '@/api-services/chunkedupload';
  import FilesService from '@/api-services/files.service';
  import { EventBus } from '@/main';
  
  export default {
    name: 'FileUploader',
    components: {
      FileCard
    },
    data() {
      return {
        minimized: false,
        allowedFileTypes: null,
        files: [],
      }
    },
    computed: {
      assistant() {
        return this.$store.state.selectedAssistant;
      },
    },
    mounted() {
      window.onbeforeunload = () => {
        if(this.files.filter(e => e.progress < 100).length) return confirm("Confirm refresh");
      };
    },
    methods: {
      toggle() {
        this.minimized = !this.minimized;
      },
      showFilePrompt(allowedFileTypes = '*') {
        this.allowedFileTypes = allowedFileTypes;
        setTimeout(() => {
          this.$refs.file.click();
        }, 10);
      },
      clearFiles() {
        this.files = [];
      },
      deleteFile(file) {
        this.files = this.files.filter(e => e != file);
      },
      cancelUpload(file) {
        file.uploadHandle.abort();
      },
      async parseFilesArray(evt) {
        let files = evt.target.files || []; //evt.target.files || evt.dataTransfer.files;
        let items = evt.dataTransfer && evt.dataTransfer.items;
        //let directory = [];
        if((supportsFileSystemAccessAPI || supportsWebkitGetAsEntry) && items) {
          for await (const e of [...items].map(e => supportsFileSystemAccessAPI ? e.getAsFileSystemHandle() : e.webkitGetAsEntry())) {
            if(e.kind === 'directory' || e.isDirectory) {
              for await(let file of e.values()) {
                let f = await file.getFile();
                files.push(f);
              }
            } else {
              let f = await e.getFile();
              files.push(f);
            }
          }
        }
        return files;
      },
      async upload(e, modelId = null) {
        let fileObj = this.newFileObject(e);
        this.files.push(fileObj);
        fileObj.modelId = modelId;
        const handle = chunkedUpload(e, percentDone => {
          fileObj.progress = percentDone;
          this.uploadContentProgress = percentDone;
          fileObj.progress = fileObj.progress == 100 ? 99 : fileObj.progress;
        });
        fileObj.uploadHandle = handle;
        const uploadKey = await handle.wait();
        return await FilesService.uploadFile({ uploadKey: uploadKey }).then(async resp => {
          if(resp.success) {
            fileObj.id = resp.file_id;
            fileObj.progress = 100;
            this.$emit('onFinishFile', resp);
            EventBus.$emit('refreshFiles')
          } else if(resp.error) {
            /*this.$swal('', resp.error, 'error').then(() => {
              this.files = this.files.filter(e => e != fileObj);
            });*/
          }
          return resp;
        });
      },
      async uploadByLink(e){
        let fileObj = this.newFileObject(e);
        this.files.push(fileObj);
        let data = { name: e.name, size: e.size, type: e.type }
        let res = await FilesService.start(data);
        res = await res.json();
        return await FilesService.uploadFileByLink({ uploadKey: res.uploadKey, external_path: e.path, mime_type: e.type }).then(async resp => {
          if(resp.success) {
            fileObj.id = resp.file_id;
            fileObj.progress = 100;
            this.$emit('onFinishFile', resp);
          } else if(resp.error) {
            this.$swal('', resp.error, 'error').then(() => {
              this.files = this.files.filter(e => e != fileObj);
            });
          }
          return resp;
        });
      },
      newFileObject(file) {
        return {
          name: file.name,
          type: file.type,
          roomId: file.roomId,
          progress: 0
        }
      }
    },
    watch: {
      files(val) {
        console.log('files', val);
      }
    }
  }
</script>

<style scoped lang="scss">
  #fileUploader {
    position: fixed;
    right: 24px;
    width: 360px;
    //position: absolute;
    //right: 0;
    //width: 100%;;
    bottom: 0;
    background: var(--bs-body-bg);
    //border: 1px solid var(--bs-border-color);
    box-shadow: 0 -10px 32px rgba(0,0,0,.1);
    border-radius: 10px 10px 0 0;
    z-index: 20;
    .header {
      border-radius: 10px 0 0;
    }
    .body {
      max-height: 180px;
      overflow: auto;
    }
    &.minimized {
      .body {
        height: 0;
      }
    }
  }
</style>