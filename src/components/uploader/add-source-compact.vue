<template>
  <div class="d-flex align-items-center gap-2 px-1 border-bottom w-100 mx-2" :class="{ 'dragover': dragover2 }" @drop.stop.prevent="uploadFile" @mouseup="dragover2=false" @dragover.stop.prevent="dragover2=true" @dragleave.stop.prevent="dragover2=false" @mouseleave.stop.prevent="dragover2=false">
    <button type="button" class="btn btn-add btn-outline-secondary my-2 btn-xs fw-bold px-2" id="addSource" role="button" data-bs-toggle="dropdown" aria-expanded="false" data-bs-auto-close="outside">
      <svg class="me-2" width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M0.75 9C0.75 10.0834 0.963392 11.1562 1.37799 12.1571C1.7926 13.1581 2.40029 14.0675 3.16637 14.8336C3.93245 15.5997 4.84193 16.2074 5.84286 16.622C6.8438 17.0366 7.91659 17.25 9 17.25C10.0834 17.25 11.1562 17.0366 12.1571 16.622C13.1581 16.2074 14.0675 15.5997 14.8336 14.8336C15.5997 14.0675 16.2074 13.1581 16.622 12.1571C17.0366 11.1562 17.25 10.0834 17.25 9C17.25 7.91659 17.0366 6.8438 16.622 5.84286C16.2074 4.84193 15.5997 3.93245 14.8336 3.16637C14.0675 2.40029 13.1581 1.7926 12.1571 1.37799C11.1562 0.963393 10.0834 0.75 9 0.75C7.91659 0.75 6.8438 0.963393 5.84286 1.37799C4.84193 1.7926 3.93245 2.40029 3.16637 3.16637C2.40029 3.93245 1.7926 4.84193 1.37799 5.84286C0.963392 6.8438 0.75 7.91659 0.75 9Z" fill="#DC2631"/><path d="M5 9H13" stroke="white" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/><path d="M9 5V13" stroke="white" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></svg>
        Add Data Source
    </button>
    <div class="overflow-auto position-relative flex-grow-1 file-list d-flex align-items-center">
      <div class="position-absolute d-flex align-items-center gap-2 flex-nowrap text-nowrap">
        <FileCard class="card flex-row p-2 small" v-for="(file, i) in filesUploading" :file="file" :key="i" @onDelete="() => {}" />
      </div>
    </div>
    <div ref="dropdownMenu" class="user-dropdown-menu dropdown-menu p-2 fs-7" aria-labelledby="addSource">
      <ul class="nav nav-tabs border-0 mb-3" id="addSourceTabs" role="tablist">
        <li class="nav-item me-2" role="presentation">
          <button class="nav-link border-0 bg-transparent p-0 small active" id="files-tab" data-bs-toggle="tab" data-bs-target="#files-tab-pane" type="button" role="tab" aria-controls="files-tab-pane" aria-selected="true">
            Files
          </button>
        </li>
        <li class="nav-item" role="presentation">
          <button class="nav-link border-0 bg-transparent p-0 small" id="accounts-tab" data-bs-toggle="tab" data-bs-target="#accounts-tab-pane" type="button" role="tab" aria-controls="accounts-tab-pane" aria-selected="false" disabled>
            Connect Accounts <sup>Coming Soon</sup>
          </button>
        </li>
      </ul>
      <div class="tab-content flex-grow-1" id="addSourceTabsContent">
        <div class="tab-pane fade h-100 show active" id="files-tab-pane" role="tabpanel" aria-labelledby="files-tab" tabindex="0">
          <div class="d-flex flex-column h-100">
            <button type="button" class="mini-uploader d-flex flex-column flex-grow-1 align-items-center justify-content-center" @mouseup="dragover=false" @dragover.stop.prevent="dragover=true" @dragleave.stop.prevent="dragover=false" @click.prevent="showFilePrompt">
              <template v-if="!startingUpload">
                <template v-if="!dragover">
                  <div class="d-flex align-items-center fw-medium mb-1">
                    <svg class="me-1" width="21" height="20" viewBox="0 0 21 20" fill="none" xmlns="http://www.w3.org/2000/svg"><g clip-path="url(#clip0_1796_32619)"><path d="M3.83334 14.1666V15.8333C3.83334 16.2753 4.00893 16.6992 4.32149 17.0118C4.63405 17.3244 5.05797 17.5 5.5 17.5H15.5C15.942 17.5 16.366 17.3244 16.6785 17.0118C16.9911 16.6992 17.1667 16.2753 17.1667 15.8333V14.1666" stroke="#0F172A" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/><path d="M6.33334 7.50004L10.5 3.33337L14.6667 7.50004" stroke="#0F172A" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/><path d="M10.5 3.33337V13.3334" stroke="#0F172A" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></g><defs><clipPath id="clip0_1796_32619"><rect width="20" height="20" fill="white" transform="translate(0.5)"/></clipPath></defs></svg>
                    Upload File
                  </div>
                  <div class="text-muted smaller">
                    or drag and drop it here
                  </div>
                </template>
                <template v-else>
                  Drop it!
                </template>
              </template>
              <div class="d-flex align-items-center small fw-bold" v-else>
                Starting upload...
                <div class="spinner-border spinner-border-sm ms-2"></div>
              </div>
            </button>
            <div class="my-2 d-none" >
              <div class="smaller">
                Or enter a URL
              </div>
              <div class="form-control d-flex p-1 ps-2">
                <input type="text" class="bg-transparent border-0 flex-grow-1" placeholder="Add the URL" />
                <button type="button" class="btn btn-secondary btn-xs">Submit</button>
              </div>
            </div>
            <input multiple @change="uploadFile" ref="file" type="file" class="d-none" accept="*" />
          </div>
        </div>
        <div class="tab-pane fade h-100" id="accounts-tab-pane" role="tabpanel" aria-labelledby="accounts-tab" tabindex="0">
          <button disabled type="button" class="card py-2 px-3 mb-2 fw-bold flex-row w-100">
            <img class="me-2" width="20" :src="facebookIcon" />
            Connect Facebook
          </button>
          <button disabled type="button" class="card py-2 px-3 mb-2 fw-bold flex-row w-100">
            <img class="me-2" width="20" :src="twitterIcon" />
            Connect Twitter
          </button>
          <button disabled type="button" class="card py-2 px-3 mb-2 fw-bold flex-row w-100">
            <img class="me-2" width="20" :src="instagramIcon" />
            Connect Instagram
          </button>
          <button disabled type="button" class="card py-2 px-3 mb-2 fw-bold flex-row w-100">
            <img class="me-2" width="20" :src="driveIcon" />
            Connect Drive
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import FilesService from '@/api-services/files.service';
  import { EventBus } from '@/main';
  import FileCard from '@/components/cards/file-card';

  export default {
    name: 'AddSourceCompact',
    components: {
      FileCard
    },
    data() {
      return {
        dragover: false,
        dragover2: true,
        startingUpload: false
      }
    },
    computed: {
      modelId() {
        return this.$store.state.selectedModel.id;
      },
      filesUploading() {
        return this.fileUploader ? this.fileUploader.files.filter(e => e.modelId == this.modelId && e.progress < 100 && e.status != 'cancelled') :[];
      },
      selectedAssistant() {
        return this.$store.state.selectedAssistant;
      },
      facebookIcon() {
        return require(`@/assets/images/social-icon-facebook.png`);
      },
      twitterIcon() {
        return require(`@/assets/images/social-icon-twitter.png`);
      },
      instagramIcon() {
        return require(`@/assets/images/social-icon-instagram.png`);
      },
      driveIcon() {
        return require(`@/assets/images/social-icon-drive.png`);
      },
      fileUploader() {
        return this.$root.$children[0].$refs.fileUploader;
      },
    },
    mounted() {

    },
    methods: {
      showFilePrompt() {
        this.$refs.file.click();
      },
      async uploadFile(evt) {
        evt.preventDefault();
        this.dragover = this.dragover2 = false;
        //this.startingUpload = true;
        let files = await this.fileUploader.parseFilesArray(evt);
        this.$refs.dropdownMenu.classList.remove('show');
        [...files].forEach(async e => {
          let resp = await this.fileUploader.upload(e, this.selectedAssistant.id);
          if(resp.success) {
            let res = await FilesService.finishUpload({ model_id: this.selectedAssistant.id, files: [resp.file_id] });
            EventBus.$emit('addFiles', res.files_added);
          }
          this.startingUpload = false;
          return resp;
        })
      },
    }
  }
</script>

<style scoped lang="scss">
  .user-dropdown-menu {
    width: 340px;
    height: 245px;
  }
  .mini-uploader {
    border-radius: 8px;
    border: 1px dashed rgba(100, 116, 139, 0.30);
    background: rgba(226, 232, 240, 0.30);
  }
  .file-list {
    height: 42px;
  }
  .nav-tabs {
    .active {
      font-weight: bold;
      color: var(--bs-body-color) !important;
      cursor: default;
    }
  }
</style>