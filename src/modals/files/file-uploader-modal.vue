<template>
  <div class="modal" ref="modal" tabindex="-1">
    <div class="modal-dialog modal-dialog-centered modal-lg">
      <div class="modal-content">
        <div class="modal-header pb-2">
          <h4 class="modal-title">{{ title }}</h4>
          <button type="button" class="btn-close" data-bs-dismiss="modal" ref="closeModelModal" aria-label="Close"></button>
        </div>
        <div class="modal-body pt-2">
          <div class="drag-n-drop text-muted" @drop.stop.prevent="uploadFile" @mouseup="dragover=false" @dragover.prevent="dragover=true" @dragleave.prevent="dragover=false">
            <div v-if="loading" class="spinner-border mt-4 text-primary"></div>
            <template v-else>
              <svg class="mb-2" width="39" height="38" viewBox="0 0 39 38" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M21.5 5H5.5C4.43913 5 3.42172 5.42143 2.67157 6.17157C1.92143 6.92172 1.5 7.93913 1.5 9V29M1.5 29V33C1.5 34.0609 1.92143 35.0783 2.67157 35.8284C3.42172 36.5786 4.43913 37 5.5 37H29.5C30.5609 37 31.5783 36.5786 32.3284 35.8284C33.0786 35.0783 33.5 34.0609 33.5 33V25M1.5 29L10.672 19.828C11.4221 19.0781 12.4393 18.6569 13.5 18.6569C14.5607 18.6569 15.5779 19.0781 16.328 19.828L21.5 25M33.5 17V25M33.5 25L30.328 21.828C29.5779 21.0781 28.5607 20.6569 27.5 20.6569C26.4393 20.6569 25.4221 21.0781 24.672 21.828L21.5 25M21.5 25L25.5 29M29.5 5H37.5M33.5 1V9M21.5 13H21.52" stroke="#9CA3AF" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>
              <template v-if="!dragover">
                <div class="mb-1">
                  <a href="#" @click.prevent="showFilePrompt">Upload a file</a> or drag and drop
                </div>
                <div class="smaller text-uppercase">
                  {{ labels }}
                </div>
              </template>
              <div v-else>
                <h4 class="mb-0 fw-bold mt-3 text-primary">Drop it!</h4>
              </div>
            </template>
          </div>
          <div class="d-none my-3 crossline text-muted smaller">OR</div>
          <div class="d-none d-flex my-2">
            <div class="input-group">
              <input type="text" v-model="urlToAdd" class="form-control" placeholder="Enter file URL">
              <div class="input-group-append">
                <button class="btn btn-primary" type="button" @click="doUpload">
                  <div v-if="uploadLoading" class="spinner-border me-2"></div>
                  Upload
                </button>
              </div>
            </div>
          </div>
          <div v-if="files && files.length" class="mt-3">
            <h6>Uploads</h6>
            <FileCard v-for="(file, i) in files" :file="file" :class="{ 'mb-2' : i < files.length - 1 }" :key="i" @onDelete="deleteFile" />
          </div>
          <input multiple @change="uploadFile" ref="file" type="file" class="d-none" accept="*" />
        </div>
        <div class="modal-footer pt-2">
          <button type="button" class="btn px-5 btn-secondary" v-if="files && files.length > 0" @click="hide">
            Done
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import { Modal } from 'bootstrap';
  import FileCard from '@/components/cards/file-card';
  import FilesService from '@/api-services/files.service';
  import { EventBus } from '@/main';

  export default {
    name: 'FileUploaderModal',
    props: {
      allowedFileTypes: {
        type: Array,
        default: () => []
      },
      title: {
        type: String,
        default: 'Upload Files'
      },

    },
    components: {
      FileCard
    },
    data() {
      return {
        adding: false,
        dragover: false,
        loading: false,
        uploadLoading: false,
        urlToAdd:''
      }
    },
    computed: {
      assistant() {
        return this.$store.state.selectedAssistant;
      },
      modal() {
        return new Modal(this.$refs.modal);
      },
      fileUploader() {
        return this.$root.$children[0].$refs.fileUploader;
      },
      files() {
        if(!this.fileUploader){
          return [];
        }
        return this.allowedFiles.length ? this.fileUploader.files.filter(e => this.allowedFiles.includes(e.type)) : this.fileUploader.files;
      },
      uploading() {
        return this.files.filter(e => e.progress < 100).length;
      },
      allowedFiles() {
        return this.allowedFileTypes.map(e => e.type);
      },
      labels() {
        return this.allowedFileTypes.map(e => e.label).join(', ');
      }
    },
    mounted() {
      //clear everything
      this.urlToAdd = '';
    },
    methods: {
      async doUpload() {
        this.uploadLoading = true;
        let response = await FilesService.fileUrl({url: this.urlToAdd});
        let data = await response.json();

        if(data.error) {
          this.$swal('Error', data.error, 'error');
          this.uploadLoading = false;
          return;
        }
        let evt = {
          name: data.originalName,
          baseName: data.name,
          size: data.size,
          type: data.type,
          path: data.url
        };
        let resp = await this.fileUploader.uploadByLink(evt);
        if(resp.success) {
          await FilesService.finishUpload({ model_id: this.assistant.id, files: [resp.file_id] });
          EventBus.$emit('refreshFiles');
        }

        this.uploadLoading = false;
        this.urlToAdd = '';

        this.uploadFile(evt);
      },
      show() {
        this.modal.show();
      },
      hide() {
        this.modal.hide();
      },
      showFilePrompt() {
        //this.fileUploader.showFilePrompt(this.allowedFiles);
        this.$refs.file.click();
      },
      async uploadFile(evt) {
        this.hide();
        evt.preventDefault();
        this.dragover = false;
        let files = await this.fileUploader.parseFilesArray(evt);
        [...files].forEach(async e => {
          let resp = await this.fileUploader.upload(e, this.assistant.id);
          if(resp.success) {
            let res = await FilesService.finishUpload({ model_id: this.assistant.id, files: [resp.file_id] });
            EventBus.$emit('addFiles', res.files_added);
          }
          return resp;
        })
        /*
        this.fileUploader.onSelect(evt).then(async resp => {
          if(resp.success) {
            await FilesService.finishUpload({ model_id: this.modelId, files: [resp.file_id] });
            EventBus.$emit('refreshFiles');
            this.$emit('onFinishFile', resp);
          }
        });*/
      },
      addFiles() {
        this.adding = true;
        this.$emit('onAdd', this.files.map(e => e.id));
        //this.modal.hide();
      },
      deleteFile(file) {
        this.fileUploader.deleteFile(file);
      }
    }
  }
</script>

<style scoped lang="scss">
  .drag-n-drop {
    height: 140px;
  }

  .crossline {
    display: flex;
    align-items: center;
    width: 100%;
  }
  .crossline::before, .crossline::after {
    content: "";
    flex-grow: 1;
    border-bottom: 1px solid #F3F4F6;
  }
  .crossline::before {
    margin-right: 10px;
  }
  .crossline::after {
    margin-left: 10px;
  }
</style>