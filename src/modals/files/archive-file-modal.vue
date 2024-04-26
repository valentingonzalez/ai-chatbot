<template>
  <div class="modal" ref="modal"  tabindex="-1">
    <div v-show="file" class="modal-dialog modal-dialog-centered modal-lg">
      <div class="modal-content">
        <div class="modal-header pb-2 flex-column">
          <div class="d-flex w-100 align-items-center">
            <div class="d-flex flex-column align-items-center">
              <h4 class="modal-title">
                Are you sure?
              </h4>
              <h4 class="modal-title">
                Do you want to archive <code>{{ file.title }}</code> from which model?
              </h4>
            </div>
            <button type="button" class="btn-close" data-bs-dismiss="modal" ref="closeModelModal" aria-label="Close"></button>
          </div>
        </div>
        <div class="modal-body pt-2">
          <div v-if="!loadingModels">
            <div v-if="filteredModels.length" class="mb-3 d-flex flex-row justify-content-between border-bottom">
              <p>Archive all</p>
              <input type="checkbox" class="form-check-input" v-model="archiveAll">
            </div>
            <div v-else class="mb-3 d-flex flex-row justify-content-between border-bottom">
              <p>No models found for this file</p>
            </div>
            <div v-for="model in filteredModels" v-bind:key="model.id" class="mb-3 d-flex flex-row justify-content-between border-bottom">
                <p>{{ model.name }}</p>
                <input type="checkbox" class="form-check-input" v-model="model.archive">
              </div>
          </div>
          <div class="d-flex justify-content-center align-items-center loading h-100" v-else  style="min-height: 50px;">
              <div role="status" class="spinner-border text-primary"><span class="visually-hidden">Loading...</span></div>
            </div>
        </div>
        <div class="modal-footer pt-2 pt-md-0 mt-0 justify-content-between justify-content-sm-end">
          <button type="button" class="m-0 btn px-5 me-2" data-bs-dismiss="modal">Cancel</button>
          <button type="button" :disabled="!selectedArchive.length" @click.prevent="deleteFileFromModels" class="m-0 btn px-5 btn-secondary">
            Archive
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import FilesService from '@/api-services/files.service';
  import { Modal } from 'bootstrap';

  export default {
    name: 'ArchiveFileModal',
    components: {
    },
    props: {
      file: {
        default: null,
        required: true
      },
    },
    data() {
      return {
        loadingModels : true,
        models : [],
        archiveAll: false,
      }
    },
    computed: {
      modal() {
        return new Modal(this.$refs.modal);
      },
      filteredModels(){
        return this.models;
      },
      selectedArchive(){
        return this.models.filter(model => model.archive)
      }
    },
    mounted() {
    },
    methods: {
      show() {
        this.$logActivity({ action: 'click', page: this.$route.name,type: 'archiveFile', ref_id: this.file.id });
        this.modal.show();
        FilesService.getModelsForFile({ file_id: this.file.id }).then(res => {
          this.loadingModels = false;
          if(!res.models || res.models.length == 0) {
            this.models = [];
            return;
          }
          res.models = res.models.filter(model => model.is_used);
          this.models = res.models;
        });
        this.$refs.modal.addEventListener('hidden.bs.modal', this.clearModels);
      },
      clearModels(){
        this.models = null;
        this.loadingModels = true;
        this.archiveAll = false;
      },
      deleteFileFromModels(){
        this.$swal({
          title: 'Are you sure you want to archive this file?',
          icon:'warning',
          showCancelButton: true,
        })
        .then(res => {
          if (res.isConfirmed){
            let params = {
              file_id: this.file.id,
              delete_type : 'one',
            };
            let promises = this.selectedArchive.map(model => {
              let localParams = {...params,model_id : model.id};
              return FilesService.archiveFile(localParams);
            });
            this.loadingModels = true;
            Promise.all(promises)
              .then(()=> {
                this.loadingModels = false;
                this.$store.dispatch('getAssistants');
                this.$store.dispatch('getAllFiles');
                this.$toast('File archived for models');
              })
              .catch(error => {
                this.loadingModels = false;
                this.$swal('Error archiving file',error,'error');
              });
              this.modal.hide();
          }
        })
      },
    },
    watch:{
      archiveAll(){
        this.models = this.models.map( m => {
          m.archive = this.archiveAll;
          return m;
        })
      }
    }
  }
</script>
<style scoped lang="scss">
  .modal-body {
    max-height: calc(var(--vh, 1vh) * 100 - 197px);
    overflow: auto;
    @media (max-width: 767px) {
      max-height: calc(var(--vh, 1vh) * 100 - 157px);
    }
  }
  .btn-primary {
    svg {
      color: var(--bs-body-bg);
      fill: #ffffff !important;
    }
  }
</style>