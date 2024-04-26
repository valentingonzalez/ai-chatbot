<template>
    <div class="modal" ref="modal">
      <div class="modal-dialog modal-dialog-centered modal-lg">
        <div class="modal-content">
          <div class="modal-header pb-0">
            <button type="button" class="btn-close" data-bs-dismiss="modal" ref="closeModelModal" aria-label="Close"></button>
          </div>
          <div class="modal-body pt-0">
            <h3 class="d-flex align-items-start">Data Sources <span class="small ms-2"><b>({{ filteredFiles.length }})</b></span></h3>
            <div class="d-flex flex-row justify-content-between align-items-center py-2">
              <div class="flex-grow-1">
                <input type="text" class="form-control" placeholder="Search" v-model="search" />
              </div>
              <div class="mx-2">
                <button type="button" class="btn btn-outline-primary small px-3" data-bs-toggle="dropdown" aria-expanded="false">
                  {{ selectedType }}
                  <div class="ps-2 ms-3">
                    <svg class="me-n2" width="13" height="8" viewBox="0 0 13 8" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M11.1666 1.5L6.49992 6.16667L1.83325 1.5" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>
                  </div>
                </button>
                <ul class="dropdown-menu fs-7" aria-labelledby="filePageType" role="menu">
                  <li v-for="(type) in fileTypes" :key="type">
                    <a class="dropdown-item" href="#" @click.prevent="selectedType = type">
                      {{ type }}
                    </a>
                  </li>
                </ul>
              </div>
              <FileSort class="d-flex align-items-center justify-content-end" @onFileSort="selectSort" />
            </div>
            <div class="d-flex justify-content-end mb-2">
              <div class="form-check">
                <input class="form-check-input" type="checkbox" v-model="training" id="flexCheckChecked" checked>
                <label class="form-check-label small text-muted" for="flexCheckChecked">
                  Training
                </label>
              </div>
            </div>
            <div class="mb-3 pb-3" style="max-height: 400px; overflow: auto;">
              <div class="files" v-if="files">
                <FileCardBig :showSelected="true" :showOptions="false" v-for="file in files" :key="file.id" :file="file" class="mb-2 w-100" @onDelete="onDelete" @addSelected="addFile" @removeSelected="removeFile"/>
              </div>
            </div>
            <div class="d-flex align-items-center justify-content-center my-3" v-if="loading">
                <div class="spinner-border spinner-border-sm"></div>
            </div>
          </div>
          <div class="modal-footer pt-2">
            <button v-if="newFiles.length" @click="UpdateFiles" type="button" class="btn px-5 btn-secondary" :disabled="updating">
              <div class="spinner-border spinner-border-sm me-2" v-if="updating"></div>
              Use Files
            </button>
          </div>
        </div>
      </div>
    </div>
  </template>
  
  <script>
    import { Modal } from 'bootstrap';
    import FilesService from '@/api-services/files.service';
    import FileCardBig from '@/components/cards/file-card-big';
    import FileSort from '@/components/file-sort.vue';

    export default {
      name: 'ExistingFilesModal',
      props: {
        model: null
      },
      components: {
        FileCardBig,
        FileSort
      },
      data() {
        return {
          files: [],
          loading:true,
          fileTypes: ['All Documents','Documents','Audios/Videos','YouTube','Websites','Social Accounts'],
          search: '',
          training: 0,
          selectedType: 'All Documents',
          selectedSort:{},
          newFiles: [],
          updating: false
        }
      },
      computed: {
        modal() {
          return new Modal(this.$refs.modal);
        },
        filteredFiles() {
          return this.files.filter(e => e.file_url.toLowerCase().includes(this.search.toLowerCase()) || e.title.toLowerCase().includes(this.search.toLowerCase())).filter(e => this.training ? !e.completed: e)
          .filter(e => 
            this.selectedType == 'Documents' ? e.file_type == 'pdf' || e.file_type == 'document' || e.file_type == 'csv' :
            this.selectedType == 'Audios/Videos' ? e.file_type == 'audio' || e.file_type == 'video' :
            this.selectedType == 'YouTube' ? e.file_type == 'youtube' :
            this.selectedType == 'Websites' ? e.file_type == 'website' :
            this.selectedType == 'Social Accounts' ? e.file_type == 'social' : e
          ).sort((a,b) => {
            if(this.selectedSort?.value == 'title') {
              return this.selectedSort.order == 'ASC' ? a.title.localeCompare(b.title) : b.title.localeCompare(a.title);
            } else if(this.selectedSort?.value == 'date') {
              return this.selectedSort.order == 'ASC' ? new Date(a.date_added) - new Date(b.date_added) : new Date(b.date_added) - new Date(a.date_added);
            }
          });
        },
      },
      mounted() {
        this.getFiles();
        this.$refs.modal.addEventListener('hidden.bs.modal', this.onHide);
      },
      methods: {
        show() {
        this.modal.show();
      },
      onHide() {
        clearInterval(this.int);
      },
      onDelete() {

      },
      getFiles() {
        FilesService.getAllFilesByModel({ model_id: this.model.id }).then(res => {
          this.loading = false;

          this.files = res.files.map(e => ({
            ...e,
            name: e.title,
            title: e.title || `${e.id}_${e.date_added}.${/(?:\.([^.]+))?$/.exec(e.file_url)[1]}`
          }))
        });
      },
      selectSort(name) {
        this.selectedSort = name;
      },
      addFile(id) {
        this.newFiles.push(id);
      },
      removeFile(id) {
        this.newFiles = this.newFiles.filter(e => e != id);
      },
      UpdateFiles() {
        this.updating = true;
        FilesService.updateFilesForModel({ model_id: this.model.id, file_ids: this.newFiles.join(',') }).then(() => {
          this.updating = false;
          this.$toast('Files Updated successfully');
          this.files = [];
          this.loading = true;
          this.$emit('onAdd');
          this.getFiles();
        });
      }
    },
  }
</script>
  
<style scoped lang="scss">
  .scraps {
    max-height: 250px;
    overflow: auto;
  }
  :deep(.VuePagination__count) {
    display: none !important;
  }
</style>