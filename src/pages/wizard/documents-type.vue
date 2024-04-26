<template>
  <div class="w-100" style="min-height: 500px;">
    <div style="max-width: 430px; height: 200px;">
      <h1 class="fw-bold text-center">
        <TypeWriter @onComplete="showText = true">
          Upload Documents To Train Your A.I Assistant!
        </TypeWriter>
      </h1>
      <TypeWriter :speed="2" v-if="showText" @onComplete="clickUpload">
        You can train the A.I model on specific files, such as website copy, video, audio, csv file, documents, etc.
      </TypeWriter>
    </div>
    <AddSource ref="addSource" />

    <div class="files" v-if="files">
      <FileCard v-for="file in files" :key="file.id" :file="file" class="mb-2 w-100" @onDelete="onDelete" />
    </div>
  </div>
</template>

<script>
  import FileCard from '@/components/cards/file-card';
  import FilesService from '@/api-services/files.service';
  import WizardService from '@/api-services/wizard.service';
  import AddSource from '@/components/uploader/add-source';

  export default {
    name: 'WizardDocumentsType',
    components: {
      FileCard,
      AddSource
    },
    data() {
      return {
        loading: false,
        showText: false
      }
    },
    mounted() {
      this.$logActivity({action: 'view', page: this.$route.name, type: 'uploadDocument'});
    },
    computed: {
      modelId() {
        return this.$store.state.wizard.model_id;
      },
      fileUploader() {
        return this.$root.$children[0].$refs.fileUploader;
      },
      files() {
        if(!this.fileUploader){
          return [];
        }
        return this.fileUploader.files;
      },
      allowedDocuments() {
        return this.documentsFileTypes.map(e => e.type);
      },
      allowedMedia() {
        return this.mediaFileTypes.map(e => e.type);
      },
    },
    methods: {
      clickUpload() {
        this.$refs.addSource.open();
      },
      onDelete(file) {
        this.fileUploader.files = this.fileUploader.files.filter(e => e != file);
      },
      uploadDocument() {
        this.$logActivity({action: 'click', page: this.$route.name, type: 'uploadDocument'});
        this.fileUploader.showFilePrompt(this.allowedDocuments);
      },
      uploadMedia() {
        this.$logActivity({action: 'click', page: this.$route.name, type: 'uploadMedia'});
        this.fileUploader.showFilePrompt(this.allowedMedia);
      },
      async addFiles(files_ids, files) {
        files_ids;
        this.fileUploader.files = [...this.fileUploader.files, ...files.map(e => ({...e, name: e.url, progress: 100}))];
      },
      async next(to) {
        this.$logActivity({action: 'click', page: this.$route.name, type: 'finish'});
        await FilesService.finishUpload({ model_id: this.modelId, files: this.files.map(e => e.id) });
        await WizardService.completeWizard({ id: this.$store.state.wizard.id });
        await this.$store.dispatch('getAssistants');
        this.$router.push(to);
      },
      async skip(to) {
        this.$logActivity({action: 'click', page: this.$route.name, type: 'skip'});
        await WizardService.completeWizard({ id: this.$store.state.wizard.id });
        await this.$store.dispatch('getAssistants');
        this.$router.push(to);
      }
    }
  }
</script>

<style scoped lang="scss">
  :deep(#fileUploadBtn) {
    width: 250px !important;
  }
  .upload-dropdown {
    width: 355px;
    .dropdown-menu {
      width: 355px;
    }
    button {
      position: relative;
      .arrow {
        position: absolute;
        right: 20px;
      }
    }
    .dropdown-item {
      display: flex;
      align-items: center;
      .icon {
        width: 26px;
        min-width: 26px;
        display: flex;
        justify-content: center;
      }
    }
  }
  .files {
    width: 100%;
    max-width: 680px;
  }
  @media(max-width: 991px) {
    .upload-dropdown {
      width: 300px;
      .dropdown-menu {
        width: 300px;
      }
    }
  }
</style>