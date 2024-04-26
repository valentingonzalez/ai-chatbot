<template>
  <div class="modal" ref="modal" id="addModelModal" tabindex="-1">
    <div class="modal-dialog modal-dialog-centered modal-lg">
      <div class="modal-content">
        <div class="modal-header mt-3 pb-3">
          <div class="d-flex align-items-center">
            <h4 class="mb-0 fw-bold">Create a new folder</h4>
          </div>
          <button type="button" class="btn-close" data-bs-dismiss="modal" ref="closeModelModal" aria-label="Close"></button>
        </div>
        <form @submit.prevent="createFolder">
          <div class="modal-body mt-2 pt-2">
            <div class="d-flex gap-3 align-items-center">
              <div class="folder-square">
                <svg width="34" height="28" viewBox="0 0 34 28" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M1.25 5.25V22.75C1.25 24.683 2.817 26.25 4.75 26.25H29.25C31.183 26.25 32.75 24.683 32.75 22.75V8.75C32.75 6.817 31.183 5.25 29.25 5.25H18.75L15.25 1.75H4.75C2.817 1.75 1.25 3.317 1.25 5.25Z" stroke="#EF4444" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>
              </div>
              <input type="text" class="form-control" v-model="folderName" placeholder="Enter folder name..."/>
            </div>
          </div>
          <div class="modal-footer">
            <button type="button" @click.prevent="hide" class="btn">
              Cancel
            </button>
            <button type="submit" class="btn btn-secondary">
              Create
            </button>
          </div>
        </form>
      </div>
    </div>
  </div>

</template>

<script>
  import { Modal } from 'bootstrap';
  import SnippetsService from '@/api-services/snippets.service';

  export default {
    name: 'CreateFolderModal',
    data() {
      return {
        folderName: ""
      }
    },
    components: {
    },
    computed: {
      modal() {
        return new Modal(this.$refs.modal);
      }
    },
    methods: {
      show() {
        this.modal.show();
      },
      hide(){
        this.folderName = "";
        this.modal.hide();
      },
      createFolder(){
        this.$logActivity({ action: 'click', page: this.$route.name,type: 'createFolder'});
        if(!this.folderName || !this.folderName.trim()){
          return this.$swal("Error","Please enter a folder name","error");
        }
        SnippetsService.createFolder({folder_name: this.folderName}).then(()=>{
          this.$toast("Folder created succesfully");
          this.$emit("onGetFolders");
          this.hide();
        })
      }
    }
  }
</script>
