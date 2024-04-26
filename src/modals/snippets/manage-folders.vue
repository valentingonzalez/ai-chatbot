<template>
  <div class="modal" ref="modal" id="manageFoldersModal" tabindex="-1">
    <div class="modal-dialog modal-dialog-centered modal-lg">
      <div class="modal-content">
        <div class="modal-header mt-3 pb-3">
          <div class="d-flex align-items-center">
            <h4 class="mb-0 fw-bold">Manage folders</h4>
          </div>
          <button type="button" class="btn-close" data-bs-dismiss="modal" ref="closeModelModal" aria-label="Close"></button>
        </div>
        <div class="modal-body mt-2 pt-2" style="max-height: 400px; overflow: auto;">
          <input type="search" class="form-control mb-2" placeholder="Search folders" v-model="searchFolders"/> 
          <div v-if="loading" class="d-flex align-items-center justify-content-center mt-5">
            <div class="spinner-border"></div>
          </div>
          <div v-else-if="!loading && !folders.length" class="d-flex mt-2">
            <h4>No folders found.</h4>
          </div>
          <div v-else class="d-flex flex-column">
            <FolderCard v-for="folder in filteredFolders" :deletable="true" :snippets="folderSnippets(folder.folder_name)" :editable="true" :folder="folder" :key="folder.id" @onChangeFolderName="changeFolderName" @onDeleteFolder="deleteFolder"/>
          </div>
        </div>
        <div class="modal-footer">
          <button type="button" @click.prevent="hide" class="btn btn-secondary">
            Done
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
    name: 'ManageFoldersModal',
    data() {
      return {
        loading: true,
        folders: [],
        foldersSelected: [],
        searchFolders: "",
      }
    },
    components: {
      FolderCard
    },
    computed: {
      modal() {
        return new Modal(this.$refs.modal);
      },
      filteredFolders(){
        return this.folders?.filter(folder => folder.folder_name.toLowerCase().trim().includes(this.searchFolders.toLowerCase().trim()));
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
      folderSnippets(folderName){
        return this.$store.state.pins[folderName];
      },
      addSelected(id){
        this.foldersSelected.push(id);
      },
      removeSelected(id){
        this.foldersSelected = this.foldersSelected.filter(e => e != id);
      },
      async deleteFolder(id){
        this.$swal({
          title: 'Are you sure?',
          text: 'You will lose all snippets saved on this folder, this cannot be undone.',
          icon: 'warning',
          showCancelButton: true,
          confirmButtonText: 'Yes, Delete folder',
          cancelButtonText: 'No, Cancel',
        })
        .then(async res => {
          if(res.isConfirmed){
            this.loading = true;
            await SnippetsService.deleteFolder({folder_id: id});
            this.loading = false;
            this.getAllFolders();
            this.$emit('onGetSnippets');
            this.$emit('onGetFolders');
            this.$toast('Deleted folder');
            }
          })
        .catch(error => {
          this.loading = false;
          this.$swal('Error deleting folder',error,'error');
        })
      },
      async changeFolderName(id,newName){
        this.loading = true;
        await SnippetsService.changeFolderName({folder_id: id,newName: newName}).then(res =>{
          if(!res.success){
            return this.$swal("Error",res.error,"error");
          }
          this.$toast("Changed folder name!")
        });

        this.getAllFolders();
        this.$emit('onGetSnippets');
        this.$emit('onGetFolders');

        this.loading = false;
      }
    }
  }
</script>
