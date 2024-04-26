<template>
  <div>
    <button type="button" id="fileUploadBtn" ref="fileUploadBtn" class="btn btn-outline-secondary rounded-3 fw-sbold px-3" data-bs-toggle="dropdown" aria-expanded="false">
      <svg class="me-2" width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M0.75 9C0.75 10.0834 0.963392 11.1562 1.37799 12.1571C1.7926 13.1581 2.40029 14.0675 3.16637 14.8336C3.93245 15.5997 4.84193 16.2074 5.84286 16.622C6.8438 17.0366 7.91659 17.25 9 17.25C10.0834 17.25 11.1562 17.0366 12.1571 16.622C13.1581 16.2074 14.0675 15.5997 14.8336 14.8336C15.5997 14.0675 16.2074 13.1581 16.622 12.1571C17.0366 11.1562 17.25 10.0834 17.25 9C17.25 7.91659 17.0366 6.8438 16.622 5.84286C16.2074 4.84193 15.5997 3.93245 14.8336 3.16637C14.0675 2.40029 13.1581 1.7926 12.1571 1.37799C11.1562 0.963393 10.0834 0.75 9 0.75C7.91659 0.75 6.8438 0.963393 5.84286 1.37799C4.84193 1.7926 3.93245 2.40029 3.16637 3.16637C2.40029 3.93245 1.7926 4.84193 1.37799 5.84286C0.963392 6.8438 0.75 7.91659 0.75 9Z" fill="#DC2631"/><path d="M5 9H13" stroke="white" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/><path d="M9 5V13" stroke="white" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></svg>
      Add Source
    </button>
    <ul class="dropdown-menu fs-7" aria-labelledby="fileUploadBtn" style="min-width: 200px;">
      <li><a class="dropdown-item" href="#" @click.prevent="$refs.existingFiles.show();$logActivity({action: 'click', page: $route.name, type: 'UploadFromExisting',ref_id: assistant.id});">Select From Existing</a></li>
      <li><a class="dropdown-item" href="#" @click.prevent="$refs.documentUploaderModal.show(assistant);$logActivity({action: 'click', page: $route.name, type: 'UploadDocument&Media',ref_id: assistant.id});">Documents & Media</a></li>
      <li><a class="dropdown-item" href="#" @click.prevent="$refs.websiteScraperModal.show();$logActivity({action: 'click', page: $route.name, type: 'UploadWebsiteScrapper',ref_id: assistant.id});">Website Scraper</a></li>
      <li><a class="dropdown-item" href="#" @click.prevent="$refs.youtubeUploaderModal.show();$logActivity({action: 'click', page: $route.name, type: 'UploadYoutubeVideo',ref_id: assistant.id});">Youtube Video</a></li>
      <li><a class="dropdown-item" disabled="true" href="#" @click.prevent="$logActivity({action: 'click', page: $route.name, type: 'UploadFromExisting',ref_id: assistant.id});">Connect Social Profile <sup>Coming Soon</sup></a></li>
      <li><a class="dropdown-item" disabled="true" href="#" @click.prevent="$logActivity({action: 'click', page: $route.name, type: 'UploadFromGoogleDrive',ref_id: assistant.id});">Google Drive <sup>Coming Soon</sup></a></li>
    </ul>
    <FileUploaderModal ref="documentUploaderModal" :title="'Upload Documents & Media'" :model="assistant" @onAdd="addFiles" />
    <FileUploaderModal ref="mediaUploaderModal" :model="assistant" :title="'Upload Videos & Audios'" :allowedFileTypes="mediaFileTypes" @onAdd="addFiles" />
    <WebsiteScraper ref="websiteScraperModal" :model="assistant" @onAdd="eventGetFiles" />
    <YoutubeUploaderModal ref="youtubeUploaderModal" :model="assistant" @onAdd="eventGetFiles" />
    <ExistingFilesModal ref="existingFiles" :model="assistant" @onAdd="eventGetFiles" />
    <SocialModal ref="socialModal" :model="assistant" />
  </div>
</template>

<script>
  import FilesService from '@/api-services/files.service';
  import { EventBus } from '@/main';

  import FileUploaderModal from '@/modals/files/file-uploader-modal.vue';
  import WebsiteScraper from '@/modals/files/website-scraper-modal.vue';
  import YoutubeUploaderModal from '@/modals/youtube-uploader.vue';
  import ExistingFilesModal from '@/modals/files/existing-files-modal.vue';
  import SocialModal from '@/modals/files/socials-modal.vue';

  export default {
    name: 'AddSource',
    components: {
      FileUploaderModal,
      WebsiteScraper,
      YoutubeUploaderModal,
      ExistingFilesModal,
      SocialModal,
    },
    data() {
      return {
        documentsFileTypes: [
          { label: 'doc', type: 'application/msword' },
          { label: 'docx', type: 'application/vnd.openxmlformats-officedocument.wordprocessingml.document' },
          { label: 'pdf', type: 'application/pdf' },
          { label: 'csv', type: 'text/csv' },
          { label: 'xlsx', type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' },
          { label: 'xls', type: 'application/vnd.ms-excel' },
          { label: 'rtf', type: 'application/rtf' },
          { label: 'txt', type: 'text/plain' },
          { label: 'pages', type: 'application/vnd.apple.pages' },
          { label: 'html', type: 'text/html' },
          { label: 'xml', type: 'application/xml' },
          { label: 'json', type: 'application/json' }
        ],
        mediaFileTypes: [
          { label: 'mp3', type: 'audio/*' },
          { label: 'wav', type: 'audio/wav' },
          { label: 'm4a', type: 'audio/m4a' },
          { label: 'mp3', type: 'audio/mpeg' },
          { label: 'mp4', type: 'video/mp4' },
          { label: 'avi', type: 'video/avi' },
          { label: 'm4v', type: 'video/m4v' },
          { label: 'mpg', type: 'video/mpg' },
          { label: 'mpeg', type: 'video/mpeg' },
          { label: 'mov', type: 'video/quicktime' },
          { label: 'wmv', type: 'video/x-ms-wmv' },
        ]
      }
    },
    computed: {
      assistant() {
        return this.$store.state.selectedAssistant;
      }
    },
    mounted() {

    },
    methods: {
      open() {
        this.$refs.fileUploadBtn.click();
      },
      async addFiles(files) {
        await FilesService.finishUpload({ model_id: this.assistant.id, files: [...files] });
        EventBus.$emit('refreshFiles');
      },
      async eventGetFiles(){
        EventBus.$emit('refreshFiles');
      },
    }
  }
</script>

<style scoped lang="scss">
  .sm {
    #fileUploadBtn {
      height: 36px;
    }
  }
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