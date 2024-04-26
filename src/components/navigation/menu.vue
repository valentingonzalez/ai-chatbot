<template>
  <div class="menu h-100" :class="{ 'visible': visible }">
    <div class="sidebar d-flex flex-column">
      <div class="px-3">
        <div class="int-header bg-transparent d-lg-none">
          <button type="button" class="close-bt" @click="visible = false">
            <svg width="26" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" /></svg>
          </button>
          <img class="logo d-collapsed-none ms-2" :src="logo" />
        </div>
        <template v-if="false">
          <g-drive-selector ref="gDriveSelector" />
          <button class="add-chat btn btn-outline-secondary fw-bold w-100 mb-2 mt-3" @click="$refs.gDriveSelector.setupGoogleDrive();">
            Testing Gdrive
          </button>
        </template>
      </div>
      <AssistantSearch ref="assistantSearch" @onTogglePanel="togglePanel" class="my-3" />
      <div class="nav flex-grow-1 overflow-auto d-flex flex-nowrap flex-column">
        <div class="px-3 pb-1">
          <button v-if="!viewArchived" class="add-assistant-btn btn btn-outline-secondary justify-content-center d-flex align-items-center fw-sbold w-100 mb-2" @click="showModelModal">
            <svg class="me-2" width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M0.75 9C0.75 10.0834 0.963392 11.1562 1.37799 12.1571C1.7926 13.1581 2.40029 14.0675 3.16637 14.8336C3.93245 15.5997 4.84193 16.2074 5.84286 16.622C6.8438 17.0366 7.91659 17.25 9 17.25C10.0834 17.25 11.1562 17.0366 12.1571 16.622C13.1581 16.2074 14.0675 15.5997 14.8336 14.8336C15.5997 14.0675 16.2074 13.1581 16.622 12.1571C17.0366 11.1562 17.25 10.0834 17.25 9C17.25 7.91659 17.0366 6.8438 16.622 5.84286C16.2074 4.84193 15.5997 3.93245 14.8336 3.16637C14.0675 2.40029 13.1581 1.7926 12.1571 1.37799C11.1562 0.963393 10.0834 0.75 9 0.75C7.91659 0.75 6.8438 0.963393 5.84286 1.37799C4.84193 1.7926 3.93245 2.40029 3.16637 3.16637C2.40029 3.93245 1.7926 4.84193 1.37799 5.84286C0.963392 6.8438 0.75 7.91659 0.75 9Z" fill="#DC2631"/><path d="M5 9H13" stroke="white" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/><path d="M9 5V13" stroke="white" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></svg>
            <div class="d-collapsed-none">New Assistant</div>
          </button>
        </div>
        <div class="nav overflow-auto d-flex flex-nowrap flex-column px-3">
          <ul v-if="loading" class="d-flex justify-content-center mt-3"><div v-show="showLoading" class=" spinner-border"></div></ul>
          <div class="small fw-bold no-chats text-center text-muted" v-else-if="!assistants || !assistants.length">
            There are no assistants matching this criteria
          </div>
          <template v-else>
            <ul class="nav flex-column mx-n2">
              <template v-for="assistant in filteredAssistants">
                <li class="nav-item mw-100" :key="`room-${assistant.id}`" :class="{ 'selected': selectedAssistant.id == assistant.id }">
                  <router-link @click.native="selectAssistant(assistant)" :to="`/?room_id=${assistant.room_id}&search_assistant=${searchQuery}&view_archived=${viewArchived}`" class="nav-link px-2 text-muted d-flex align-items-center px-0">
                    <AssistantThumbnail :assistant="assistant" />
                    <div class="flex-grow-1 text-truncate d-collapsed-none">
                      <div class="fw-medium">
                        {{ assistant.name }}
                      </div>
                      <div class="text-muted smaller text-truncate">
                        {{ assistant.description }}
                      </div>
                    </div>
                    <a @click.stop.prevent="editAssistant(assistant.id)" href="#" class="delete-bt d-none me-1" data-bs-toggle="tooltip" title="Edit">
                      <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg"><g clip-path="url(#clip0_2005_30269)"><path d="M3.33325 16.6663H6.66659L15.4166 7.91627C15.8586 7.47424 16.1069 6.87472 16.1069 6.2496C16.1069 5.62448 15.8586 5.02496 15.4166 4.58293C14.9746 4.14091 14.375 3.89258 13.7499 3.89258C13.1248 3.89258 12.5253 4.14091 12.0833 4.58293L3.33325 13.3329V16.6663Z" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/><path d="M11.25 5.41699L14.5833 8.75033" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></g><defs><clipPath id="clip0_2005_30269"><rect width="20" height="20" fill="white"/></clipPath></defs></svg>
                    </a>
                    <a v-if="!assistant.archive" @click.prevent="archiveAssistant(assistant)" href="#" class="delete-bt d-none" data-bs-toggle="tooltip" title="Archive">
                      <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M15.8333 6.66634C16.2754 6.66634 16.6993 6.49075 17.0118 6.17819C17.3244 5.86563 17.5 5.4417 17.5 4.99967C17.5 4.55765 17.3244 4.13372 17.0118 3.82116C16.6993 3.5086 16.2754 3.33301 15.8333 3.33301H4.16667C3.72464 3.33301 3.30072 3.5086 2.98816 3.82116C2.67559 4.13372 2.5 4.55765 2.5 4.99967C2.5 5.4417 2.67559 5.86563 2.98816 6.17819C3.30072 6.49075 3.72464 6.66634 4.16667 6.66634M15.8333 6.66634H4.16667M15.8333 6.66634V14.9997C15.8333 15.4417 15.6577 15.8656 15.3452 16.1782C15.0326 16.4907 14.6087 16.6663 14.1667 16.6663H5.83333C5.39131 16.6663 4.96738 16.4907 4.65482 16.1782C4.34226 15.8656 4.16667 15.4417 4.16667 14.9997V6.66634M8.33333 9.99967H11.6667" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></svg>
                    </a>
                    <a v-else @click.prevent="unarchiveAssistant(assistant)" href="#" class="delete-bt d-none" data-bs-toggle="tooltip" title="Unarchive">
                      <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M15.8333 6.66634C16.2754 6.66634 16.6993 6.49075 17.0118 6.17819C17.3244 5.86562 17.5 5.4417 17.5 4.99967C17.5 4.55765 17.3244 4.13372 17.0118 3.82116C16.6993 3.5086 16.2754 3.33301 15.8333 3.33301H4.16667C3.72464 3.33301 3.30072 3.5086 2.98816 3.82116C2.67559 4.13372 2.5 4.55765 2.5 4.99967C2.5 5.4417 2.67559 5.86562 2.98816 6.17819C3.30072 6.49075 3.72464 6.66634 4.16667 6.66634M15.8333 6.66634H4.16667M15.8333 6.66634V14.9997C15.8333 15.4417 15.6577 15.8656 15.3452 16.1782C15.0326 16.4907 14.6087 16.6663 14.1667 16.6663H5.83333C5.39131 16.6663 4.96738 16.4907 4.65482 16.1782C4.34226 15.8656 4.16667 15.4417 4.16667 14.9997V6.66634M10 9.5V13.5M10 9.5L11.6667 11.1667M10 9.5L8.33333 11.1667" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></svg>
                    </a>
                  </router-link>
                </li>
              </template>
            </ul>
          </template>
        </div>
      </div>
    </div>
    <AddModelModal @onAdd="newAssistant" ref="addModelModal" />
  </div>
</template>

<script>
  import { EventBus } from '@/main';
  import ChatService from '@/api-services/chat.service';
  import AssistantSearch from '@/components/navigation/assistant-search';
  import ModelsService from '@/api-services/models.service';
  import GDriveSelector from '@/modals/gdrive';
  import AddModelModal from '@/modals/models/add-model-modal.vue';
  import AssistantThumbnail from '@/components/models/thumbnail';
  export default {
    name: 'MainMenu',
    props: [
      'collapsed'
    ],
    components:{
      AssistantSearch,
      GDriveSelector,
      AddModelModal,
      AssistantThumbnail
    },
    data() {
      return {
        view_archived: 0,
        visible: false,
        sidebarWidth: null,
        isMobile: false,
        loading: true,
        showLoading: localStorage.getItem('collapsedMenu') == 'false' ? true : false,
        editText: '',
        editing: false,
        ezaiText: 'EZAI.io Assistant',
        countNotification: 0,
        showArchived: 0
      }
    },
    computed: {
      viewArchived() {
        return Number(this.$route.query.view_archived || 0);
      },
      rooms() {
        return this.$store.state.rooms || [];
      },
      assistants() {
        let arr = this.$store.state.assistants || [];
        return arr.filter(e => e.name.toLowerCase().includes(this.searchQuery.toLowerCase())) || [];
      },
      archivedAssistants() {
        return this.$store.state.archivedAssistants;
      },
      logo() {
        return require(`@/assets/images/logo.svg`);
      },
      searchQuery() {
        return this.$route.query.search_assistant || '';
      },
      selectedAssistant() {
        return this.$store.state.selectedAssistant;
      },
      filteredAssistants() {
        let archived = Number(this.$route.query.view_archived);
        return archived ? this.archivedAssistants : this.assistants;
      }
    },
    async mounted() {
      if(!this.assistants || !this.assistants.length) await this.$store.dispatch('getAssistants');
      if(!this.archivedAssistants || !this.archivedAssistants.length) await this.$store.dispatch('getArchivedAssistants');
      window.addEventListener('resize', () => {
        this.isMobile = window.innerWidth < 700;
        this.sideBarWidth = this.isMobile ? '100%' : localStorage.getItem('sidebarWidth');
      });
      window.dispatchEvent(new Event('resize'));

      this.loading = false;
      while(!this.$root.$children[0].socket) {
        await new Promise(resolve => setTimeout(resolve, 1000));
      }
    },
    methods: {
      async selectAssistant(assistant) {
        this.$store.commit('selectAssistant', assistant);
        this.$store.commit('setSelectedModel', assistant);
        if(!this.selectedAssistant.room_id) {
          await ChatService.newChat({ model_id: this.selectedAssistant.id }).then(res => {
            this.$store.commit('setRooms', [ ...this.rooms, { id: res.room_id } ]);
            this.selectRoom(res.room_id);
          });
        }
      },
      editAssistant(id) {
        this.$root.$children[0].editModel(id);
      },
      archiveAssistant(assistant) {
        assistant.archive = !assistant.archive;
        this.$store.commit('deleteModel', assistant);
        ModelsService.delete({ model_id: assistant.id });
        this.selectAssistant(this.assistants[0] || {});
        this.selectRoom(this.assistants[0].room_id || null);
        this.$toast('Assistant successfully archived');
      },
      async unarchiveAssistant(assistant) {
        this.unArchiving = true;
        await ModelsService.undelete({ model_id: assistant.id });
        await this.$store.dispatch('getAssistants');
        await this.$store.dispatch('getArchivedAssistants');
        this.unArchiving = false;
        this.$toast('Assistant successfully unarchived');
      },
      togglePanel() {
        this.showLoading = !this.showLoading;
        this.$emit('toggleMenu');
      },
      toggle() {
        this.visible = !this.visible;
        this.$root.$children[0].$refs.sideBar.collapsed = true;
        this.$root.$children[0].$refs.navBar.collapse();
      },
      async newChat() {
        this.$logActivity({
          action: 'click',
          page: '/',
          type: 'new_chat'
        });
        if(this.$route.path != '/') {
          this.$router.push('/');
        }
        this.visible = false;
        this.$emit('onNewChat');
        ChatService.newChat().then(res => {
          EventBus.$emit('newChat', res.room_id);
          if(this.rooms) {
            this.rooms.unshift({id: res.room_id});
            this.selectRoom(res.room_id);
          }
        });
      },
      async showModelModal() {
        this.$refs.addModelModal.show();
      },
      newAssistant(assistant) {
        this.selectAssistant(assistant);
        this.$router.push({ query: Object.assign({}, this.$route.query, { room_id: this.selectedAssistant.room_id }) }).catch(() => {});
      },
      selectRoom(id) {
        this.visible = false;
        EventBus.$emit('selectRoom', id);
        this.$logActivity({ action: 'click', page: '/', type: 'select_room', ref_id: id });
      },
    },
    watch: {
      '$route.query.room_id'(val) {
        this.selectRoom(val);
      }
    }
  }
</script>


<style lang="scss" scoped>
.menu {
  transition: all .3s !important;
  .sidebar {
    transition: all .3s !important;
    box-shadow: var(--shadow-right);
    background: var(--bs-base);
    min-height: 100%;
    height: calc(var(--vh, 1vh) * 100 - 61px);
    max-width: calc(100vw) !important;
    position: relative;
    z-index: 10;
    .nav {
      .nav-item {
        position: relative;
        .nav-link {
          position: relative;
          border-radius: 7px;
          color: var(--bs-secondary) !important;
          font-size: 13px;
        }
        &.selected {
          .nav-link {
            background: var(--bs-selected) !important;
          }
        }
        &:hover {
          .delete-bt {
            display: flex !important;
          }
          .edit-bt {
            display: block !important;
          }
        }
        .edit-bt {
          position: absolute;
          z-index: 2;
          right: 27px;
          top: 6px;
        }
      }
    }
    .theme-selector {
      .theme-dropdown {
        min-width: 0 !important;
        margin-bottom: 10px !important;
      }
      .d-grid {
        grid-template-columns: repeat(2, 1fr);
        .c {
          width: 54px;
          height: 54px;
          .circle {
            width: 30px;
            height: 30px;
            display: block;
            box-sizing: content-box;
            border-radius: 100%;
            border: 1px solid rgb(127, 127, 127);
          }
        }
      }
    }
  }
  :deep(.resizable-component) {
    height: 100% !important;
  }
}

:deep(.preferences.collapsed) {
  .dropdown {
    align-items: center;
    display: flex;
    flex-direction: column;
    margin: 0 !important;
  }
  .pref-bt {
    svg { margin: 0 !important; }
    .text { display: none; }
  }
}
@media (max-width: 991px) {
  .menu {
    position: fixed;
    z-index: 1000;
    top: 0;
    left: 0;
    height: calc(var(--vh, 1vh) * 100 - 60px);
    left: -100vw;
    transition: left .2s;
    width: 100vw !important;
    max-width: 100vw !important;
    background: rgba(0,0,0,.6);
    &.visible {
      left: 0;
    }
    .close-bt {
      position: absolute;
    }
  }
}
</style>