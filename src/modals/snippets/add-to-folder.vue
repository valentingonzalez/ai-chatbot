<template>
  <div class="modal" ref="modal" id="addToFolderModal" tabindex="-1">
    <div class="modal-dialog modal-dialog-centered modal-lg">
      <div class="modal-content">
        <div class="modal-header mt-3 pb-3">
          <div class="d-flex align-items-center">
            <h4 class="mb-0 fw-bold">Add favorite to a folder</h4>
          </div>
          <button type="button" class="btn-close" data-bs-dismiss="modal" ref="closeModelModal" aria-label="Close"></button>
        </div>
        <div class="modal-body mt-2 pt-2" style="max-height: 400px; overflow: auto;">
          <div v-if="loading" class="d-flex align-items-center justify-content-center mt-5">
            <div class="spinner-border"></div>
          </div>
          <div v-else-if="!loading && !folders.length" class="d-flex mt-2">
            <h4>No folders found.</h4>
          </div>
          <div v-else class="d-flex flex-column">
            <FolderCard v-for="folder in folders" :folder="folder" :selectable="true" @addSelected="addSelected" @removeSelected="removeSelected" :key="folder.id"/>
          </div>
        </div>
        <div class="modal-footer">
          <button type="button" @click.prevent="hide" class="btn">
            Cancel
          </button>
          <button type="button" @click.prevent="addFavoriteToFolders" :disabled="!foldersSelected.length" class="btn btn-secondary">
            Add
          </button>
        </div>
      </div>
    </div>
  </div>

</template>

<script>
  import { Modal } from 'bootstrap';
  import SnippetsService from '@/api-services/snippets.service';
  import FolderCard from '@/components/cards/folder-card.vue';
  export default {
    name: 'AddToFolderModal',
    props: {
      item: {
        default: null,
        required: true
      },
    },
    data() {
      return {
        loading: true,
        folders: [],
        foldersSelected: [],
      }
    },
    components: {
      FolderCard,
    },
    computed: {
      modal() {
        return new Modal(this.$refs.modal);
      }
    },
    methods: {
      show() {
        this.getAllFolders();
        this.modal.show();
      },
      hide(){
        this.folders = [];
        this.foldersSelected = [];
        this.modal.hide();
      },
      async getAllFolders(){
        this.loading = true;
        await SnippetsService.getAllFolders({search:''}).then(res => {
          if (res.folders){
            this.folders = res.folders;
          }})
        this.loading = false;
      },
      addSelected(id){
        this.foldersSelected.push(id);
      },
      removeSelected(id){
        this.foldersSelected = this.foldersSelected.filter(e => e != id);
      },
      addFavoriteToFolders(){
        this.$logActivity({ action: 'click', page: this.$route.name,type: 'addFavoriteToFolders',ref_id: this.item.id});

        let params = {
          snippet_id : this.item.id,
        }
        let promises = this.foldersSelected.map(folderId => {
          let localParams = {...params,folder_id : folderId};
          return SnippetsService.addSnippetToFolder(localParams);
        });
        this.loading = true;
        Promise.all(promises)
          .then(()=> {
            this.loading = false;
            //get all snippets with folders again
            this.$emit('onGetSnippets');
            this.$toast('Added favorite to folders');
          })
          .catch(error => {
            this.loading = false;
            this.$swal('Error saving favorite to folders',error,'error');
          });
        this.hide();
      }
    }
  }
</script>
