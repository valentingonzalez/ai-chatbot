<template>
    <div>
      <div class="d-flex justify-content-between align-items-end mb-2">
        <h4 class="mb-0">Favorites <span v-if="snippets.length">({{ snippets.length }})</span></h4>
        <button @click="openCreateFolderModal()" class="btn btn-outline-secondary fw-bold px-3 btn-sm">
          <svg class="me-2" width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M0.75 9C0.75 10.0834 0.963392 11.1562 1.37799 12.1571C1.7926 13.1581 2.40029 14.0675 3.16637 14.8336C3.93245 15.5997 4.84193 16.2074 5.84286 16.622C6.8438 17.0366 7.91659 17.25 9 17.25C10.0834 17.25 11.1562 17.0366 12.1571 16.622C13.1581 16.2074 14.0675 15.5997 14.8336 14.8336C15.5997 14.0675 16.2074 13.1581 16.622 12.1571C17.0366 11.1562 17.25 10.0834 17.25 9C17.25 7.91659 17.0366 6.8438 16.622 5.84286C16.2074 4.84193 15.5997 3.93245 14.8336 3.16637C14.0675 2.40029 13.1581 1.7926 12.1571 1.37799C11.1562 0.963393 10.0834 0.75 9 0.75C7.91659 0.75 6.8438 0.963393 5.84286 1.37799C4.84193 1.7926 3.93245 2.40029 3.16637 3.16637C2.40029 3.93245 1.7926 4.84193 1.37799 5.84286C0.963392 6.8438 0.75 7.91659 0.75 9Z" fill="#DC2631"/><path d="M5 9H13" stroke="white" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/><path d="M9 5V13" stroke="white" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></svg>
          Create Folder
        </button>
      </div>
      <div class="px-3 mb-2">
        <input type="search" class="form-control" placeholder="Search Favorites" v-model="search" @input="submitSearch">
      </div>
      <button @click="openManageFoldersModal()" v-if="localFoldersLength" class="btn btn-outline-secondary fw-bold px-3 btn-sm">
        <svg class="mx-2" width="19" height="19" viewBox="0 0 19 19" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M3.95833 15.0413C3.08388 15.0413 2.375 14.3325 2.375 13.458V5.54134C2.375 4.66689 3.08388 3.95801 3.95833 3.95801H7.125L8.70833 5.54134H11.875C12.7495 5.54134 13.4583 6.25022 13.4583 7.12467V7.91634M3.95833 15.0413H15.0417C15.9161 15.0413 16.625 14.3325 16.625 13.458V9.49967C16.625 8.62522 15.9161 7.91634 15.0417 7.91634H7.125C6.25055 7.91634 5.54167 8.62522 5.54167 9.49967V13.458C5.54167 14.3325 4.83278 15.0413 3.95833 15.0413Z" stroke="#EF4444" stroke-width="2" stroke-linecap="round"/></svg>
        <span>Manage folders <code>({{ localFoldersLength }})</code></span>
      </button>
      <div class="alert alert-warning text-center p-2 fs-7 fw-bold" v-if="Object.keys(snippets) == 0">
        There are no Favorites. <br>
        <span class="small">You can save favorites when prompting the A.I.<br> Click on the star and you should see `Add to Favorites`</span>
      </div>
      <div v-for="(folderContent, folderName) in snippets" :key="folderName" class="mb-3">
        <template v-if="folderName !== 'no_folder'">
          <FavoritesFolderCard :folderName="folderName" :length="folderContent.length" @onDeleteFolder="deleteFolder" />
          <div :id="`folder-${folderName.replace(/ /g, '_')}`" class="collapse opened-folder">
            <ul class="list-group mt-2">
              <li v-for="(item,index) in folderContent" :key="`${item.id}-${index}`" class="list-group-item" style="background-color: rgb(0,0,0,0) !important;">
                <SnippetCard :item="item" @onRemoveFromFolder="removeFromFolder" @onUseThis="useThis" :folder="folderName"/>
              </li>
            </ul>
          </div>
        </template>
      </div>
      <!-- 'no_folder' section -->
      <div class="mb-3">
        <ul class="list-group mt-2">
          <li v-for="(item,index) in snippets.no_folder" :key="`${item.id}-${index}`" class="list-group-item" style="background-color: rgb(0,0,0,0) !important;">
            <SnippetCard :item="item" @onOpenAddToFolderModal="openAddToFolderModal"
              @onDeleteSnippet="deleteSnippet" @onUseThis="useThis"/>
          </li>
        </ul>
      </div>

      <CreateFolderModal @onGetFolders="getFolders" ref="createFolderModal"/>
      <AddToFolderModal :item="selectedItem" @onGetSnippets="getSnippets" ref="addToFolderModal"/>
      <ManageFoldersModal @onGetFolders="getFolders" @onGetSnippets="getSnippets" ref="manageFoldersModal" />
    </div>
</template>
  

<script>
import { EventBus } from '@/main';
import SnippetsService from '@/api-services/snippets.service';
import config from '@/api-services/_config';
import CreateFolderModal from '@/modals/snippets/create-folder.vue'
import AddToFolderModal from '@/modals/snippets/add-to-folder.vue'
import ManageFoldersModal from '@/modals/snippets/manage-folders.vue';
import debounce from 'debounce';
import SnippetCard from '@/components/cards/snippet-card.vue';
import FavoritesFolderCard from '@/components/cards/favorites-folder.vue';

export default {
  name: 'SnippetsTab',
  components: {
    SnippetCard,
    FavoritesFolderCard,
    CreateFolderModal,
    AddToFolderModal,
    ManageFoldersModal
  },
  data() {
    return {
      instructions: [],
      modelId: null,
      newModel: {
        title:'',
        modelId: '',
        isPrivate: ''
      },
      folders : [],
      localFoldersLength: 0,
      selectedItem: null,
      instruction:'',
      sessionId:'',
      showForm: false,
      savingModel: false,
      showInstructionForm: false,
      savingInstructions: false,
      search: ''
    }
  },
  computed: {
    snippets() {
      return this.$store.state.pins;
    },
  },
  mounted() {
    this.getFolders();
  },
  methods: {
    parsedData(data) {
      return this.$root.$children[0].extractCodeBlocks(data);
    },
    useThis(item) {
      this.$logActivity({
        action: 'click',
        page: '/',
        type: 'use_snippet',
        ref_id: item.id
      });
      EventBus.$emit('useThisSnippet',{ data: item.data })
    },
    submitSearch: debounce(function() {
      SnippetsService.getSnippetsWithFolders({search:this.search}).then((res)=>{
        this.$store.state.pins = res.pins;
      })
      }, 500),
    async deleteSnippet(item) {
      this.$logActivity({
        action: 'click',
        page: '/',
        type: 'delete_snippet',
        ref_id: item.id
      });
      let memberId = await config.checkSession();
      SnippetsService.delete({id: memberId, snippet_id: item.id})
      .then(() => {
        this.getSnippets();
      })
    },
    async getSnippets() {
      SnippetsService.getSnippetsWithFolders({search:''}).then(res => {
        this.$store.state.pins = res.snippets;
      });
    },
    getFolders() {
      SnippetsService.getAllFolders({search:''}).then(res => {
        this.folders = res.folders;
        this.localFoldersLength = res.folders.length;
      });
    },
    async deleteFolder(folderName){
      let folderFound = this.folders.find(folder => folder.folder_name === folderName);
      this.$logActivity({ action: 'click', page: this.$route.name,type: 'deleteFolder',ref_id: folderFound.id});
      this.$swal({
        title: '',
        text: `Are you sure you want to delete ${folderName}? You will lose all snippets saved in this folder, this cannot be undone.`,
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Yes, I am sure!',
        cancelButtonText: 'No, cancel it!',
      })
      .then(res => {
        if(res.isConfirmed){
          SnippetsService.deleteFolder({folder_id:folderFound.id})
          .then(() => {
            this.$toast("Folder deleted successfully")
            this.getSnippets();
            this.getFolders();
          })
        }
      })
    },
    openCreateFolderModal(){
      this.$refs.createFolderModal.show();
    },
    openManageFoldersModal(){
      this.$refs.manageFoldersModal.show();
    },
    openAddToFolderModal(item){
      this.selectedItem = item;
      this.$refs.addToFolderModal.show();
    },
    removeFromFolder(item,folderName){
      this.$logActivity({ action: 'click', page: this.$route.name,type: 'removeFromFolder',ref_id: item.id});

      let folderFound = this.folders.find(folder => folder.folder_name === folderName);
      this.$swal({
        title: '',
        text: `Are you sure you want to remove this favorite from ${folderName}?`,
        icon: 'question',
        showCancelButton: true,
        confirmButtonText: 'Yes, I am sure!',
        cancelButtonText: 'No, cancel it!',
      })
      .then(res => {
        if(res.isConfirmed){
          SnippetsService.removeSnippetFromFolder({snippet_id:item.id,folder_id:folderFound.id})
          .then(() => {
            this.$toast("Favorite removed from folder")
            this.getSnippets();
          })
        }
      })
    }
  }
}
</script>

<style scoped lang="scss">
  .opened-folder{
    padding: 5px;
    border : 2px solid rgba(255,0,0,0.3);
    border-radius : 5px;
  }
</style>
