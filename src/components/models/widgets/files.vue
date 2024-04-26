<template>
  <Collapsible ref="collapsible" class="card p-3" transitionDuration="200ms" :isOpen="isOpen" :onCollapse="onCollapse">
    <div class="d-flex align-items-center justify-content-between" slot="trigger">
      <div class="d-flex align-items-center">
        <h6 class="mb-0">Data Sources <sup class="text-muted small" v-if="filteredFiles.length > 0">({{ filteredFiles.length }})</sup></h6>
        <button @click.stop="toggleInfo = !toggleInfo" data-bs-toggle="tooltip" title="Show/Hide Info" class="align-items-center justify-content-center d-flex ms-2">
          <svg width="16" height="15" viewBox="0 0 16 15" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M8.00016 14.1663C11.6821 14.1663 14.6668 11.1816 14.6668 7.49967C14.6668 3.81778 11.6821 0.833008 8.00016 0.833008C4.31826 0.833008 1.3335 3.81778 1.3335 7.49967C1.3335 11.1816 4.31826 14.1663 8.00016 14.1663Z" stroke="#8390A2" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/><path d="M8 4.83301V7.49967" stroke="#8390A2" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/><path d="M8 10.167H8.00667" stroke="#8390A2" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>
        </button>
      </div>
      <svg class="caret" width="10" height="6" viewBox="0 0 10 6" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M1 1L5 5L9 1" stroke="#94A3B8" stroke-width="2" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round"/></svg>
    </div>
    <transition name="fadeHeight">
      <div v-if="toggleInfo" class="small mb-1 mt-2 text-muted">You can train the A.I model on specific files, such as website copy, video, audio, csv file, document, etc</div>
    </transition>

    <div class="pt-3">
      <div class="d-flex justify-content-between mb-3">
        <AddSource class="sm" />
        <v-select v-model="filesType" :searchable="false" :clearable="false" :options="filters" style="min-width: 160px;" :reduce="e => e.value">
          <template #open-indicator="{ attributes }">
            <div style="min-width: 10px" v-bind="attributes">
              <svg width="10" height="6" viewBox="0 0 10 6" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M1.625 1.375L5 4.75L8.375 1.375" stroke="#64748B" stroke-width="1.5" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round"/></svg>
            </div>
          </template>
        </v-select>
      </div>
      <div class="d-flex align-items-center justify-content-center my-3" v-if="loading">
        <div class="spinner-border spinner-border-sm"></div>
      </div>
      <template v-else>
        <div class="pb-3 mb-3 border-bottom" v-if="filesUploading.length > 0">
          <h6>Uploads</h6>
          <FileCard class="card flex-row p-2" v-for="(file, i) in filesUploading" :file="file" :class="{ 'mb-1' : i < files.length - 1 }" :key="i" @onDelete="deleteUpload" />
        </div>
        <template v-if="filteredFiles.length > 0">
          <FileCardBig v-for="file in filteredFiles" :key="`${file.id}-${file.number_of_embeddings}`" :file="file" :model_id="assistant.id" class="mb-2" :hide_disable="true" @openLinksModal="openLinksModal" @onArchive="onDelete" @onDelete="onDelete" />
        </template>
        <div v-else class="p-2 mb-0 text-center small">
          You have not uploaded any files to train your AI
        </div>
      </template>
    </div>
    <LinksModal :file="selectedLinksFile" ref="linksModal"/>
  </Collapsible>
</template>

<script>
import 'vue-collapsible-component/lib/vue-collapsible.css';
import moment from 'moment';
import Collapsible from 'vue-collapsible-component';
import FileCard from '@/components/cards/file-card';
import FileCardBig from '@/components/cards/file-card-big';
import SocialService from '@/api-services/social.service';  
import LinksModal from '@/modals/files/links-modal.vue';
import AddSource from '@/components/uploader/add-source';
import FilesService from '@/api-services/files.service';
import { EventBus } from '@/main';

export default {
  name: 'ModelWidgetFiles',
  props: {
    isOpen: {
      type: Boolean,
      default: true
    },
  },
  components: {
    Collapsible,
    FileCardBig,
    LinksModal,
    FileCard,
    AddSource
  },
  data() {
    return {
      filesType: 'all',
      scope: false,
      toggleInfo: false,
      files: [],
      socialAccounts: [],
      selectedLinksFile:{},
      loading: true,
      filters: [
        { label: 'All', value: 'all' },
        { label: 'Documents', value: 'document' },
        { label: 'Videos/Audios', value: 'media' },
        { label: 'YouTube', value: 'youtube' },
        { label: 'Websites', value: 'website' },
        { label: 'Social Accounts', value: 'social' }
      ]
    }
  },
  computed: {
    assistant() {
      return this.$store.state.selectedAssistant;
    },
    filteredFiles() {
      if(this.filesType == 'all') return [...this.files, ...this.socialAccounts].sort((a,b) => new Date(b.date_added) - new Date(a.date_added));
      if(this.filesType == 'media') return this.files.filter(e => e.file_type == 'audio' || e.file_type == 'video');
      if(this.filesType == 'document') return this.files.filter(e => e.file_type == 'pdf' || e.file_type == 'document' || e.file_type == 'csv' || e.file_type == 'text');
      if(this.filesType == 'social') return this.socialAccounts;
      return [...this.fileUploader.files.filter(e => e.modelId == this.assistant.id), ...this.files.filter(e => e.file_type == this.filesType)];
    },
    fileUploader() {
      return this.$root.$children[0].$refs.fileUploader;
    },
    filesUploading() {
      return this.fileUploader ? this.fileUploader.files.filter(e => e.modelId == this.assistant.id && e.progress < 100 && e.status != 'cancelled') : [];
    }
  },
  mounted() {
    this.getFiles();
    this.getSocialAccounts();

    EventBus.$on('fileProgress', data => {
      this.files.forEach(file => {
        if(file.id === data.file_id) {
          file.progress = data.progress;
          if(data.progress === 100) {
            file.completed = 1;
            this.getFiles();
          }
        }
      })
    })
    EventBus.$on('refreshFiles', () => {
      this.getFiles();
    });
    EventBus.$on('addFiles', filesAdded => {
      filesAdded.forEach(async id => {
        let res = await FilesService.getFile(id);
        this.files.unshift({ ...res.file, new: true, name: res.file.title });
      })
    })
  },
  methods: {
    onCollapse() {
      let arr = JSON.parse(localStorage.getItem('collapsedSettings')) || {};
      localStorage.setItem('collapsedSettings', JSON.stringify({ ...arr, files: this.$refs.collapsible.open }));
    },
    openLinksModal(file){
        this.selectedLinksFile = file;
        this.$nextTick(() => {
          this.$refs.linksModal.show();
        });
      },
    async getFiles() {
      this.loading = true;
      await FilesService.getFilesByModel({model_id: this.assistant.id}).then(e => {
        this.files = e.files;
      });
      this.loading = false;
    },
    async getSocialAccounts() {
      this.loading = true;
      await SocialService.getSocialAccounts({model_id: this.assistant.id}).then(resp => {
        if(resp.success) {
          // this.socialAccounts = resp.accounts;
          this.socialAccounts = resp.accounts.map(e => ({ ...e, file_type: e.media_type, thumbnail_url: e.picture, title: e.name, date_formatted: moment(e.date_added).format('M/DD/YYYY') }));
        }
      });
      this.loading = false;
    },
    onDelete(id) {
      this.files = this.files.filter(e => e.id != id);
    },
    deleteUpload(file) {
      this.fileUploader.files = this.fileUploader.files.filter(e => e != file);
      EventBus.$emit('refreshFiles')
    },
    formatTimestamp(datetime){
      var inputDate = datetime;
      var date = new Date(inputDate);
      var month = date.getMonth() + 1; // Adding 1 because months are zero-based (0-11)
      var day = date.getDate();
      var year = date.getFullYear().toString().slice(-2); // Extracting the last two digits of the year

      return `${month}/${day}/${year}`;
    }
  }
}
</script>

<style scoped lang="scss">
  :deep(.vue-slider) {
    .vue-slider-rail {
      background: #CFFAFE;
    }
    .vue-slider-process {
      background: #06B6D4;
    }
    .vue-slider-dot-handle {
      box-shadow: none !important;
      background: #06B6D4;
      border-color: var(--bs-body-bg);
    }
  }
  input[type=radio]:checked + label.nav-link {
    color: var(--bs-nav-pills-link-active-color) !important;
    background-color: var(--bs-nav-pills-link-active-bg) !important;
  }
  .img-50{
    height: 50px;
    width: 50px;
  }
</style>
