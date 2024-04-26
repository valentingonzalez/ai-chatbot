<template>
  <div class="sidebar d-flex flex-column" :class="{ 'collapsed': collapsed }">
      <div>
        <div class="nav justify-content-between flex-nowrap border-bottom">
          <div class="nav-item flex-grow-1"  v-for="(t, i) in tabs" :key="t.name">
            <button @click="navigate(i)" :class="{ 'active': selectedTab == i, 'px-0': t.soon }" class="nav-link w-100 justify-content-center fw-sbold" type="button">
              <div class="me-1 icon d-none d-md-block" v-html="t.icon"></div>
              {{t.name}}
              <div class="badge bg-secondary py-0 px-1 ms-2 text-uppercase rounded-1" v-if="t.soon">Soon</div>
            </button>
          </div>
        </div>
      </div>
      <div v-if="Object.keys(assistant).length" class="tab-content p-3 pb-5 flex-grow-1 d-flex flex-column">
        <div class="tab-pane active flex-grow-1" v-if="false">
          <Talk />
        </div>
        <div class="tab-pane active flex-grow-1" v-if="selectedTab == 0">
          <Train />
        </div>
        <div class="tab-pane active flex-grow-1" v-if="selectedTab == 1">
          <Skills />
        </div>
        <div class="tab-pane active flex-grow-1" v-if="selectedTab == 4">
          <Details ref="details" />
        </div>
        <div class="tab-pane active flex-grow-1" v-if="selectedTab == 2">
          <Publish ref="publish" />
        </div>
      </div>
      <div v-else class="d-flex justify-content-center mt-5">
        <div class="spinner-border spinner-border-sm"></div>
      </div>
  </div>
</template>

<script>
  //import { Tab } from 'bootstrap'
  import Train from '@/components/models/train';
  import Talk from '@/components/models/talk';
  import Skills from '@/components/models/skills';
  import Details from '@/components/sidebar/tabs/details-tab'
  import Publish from '@/components/sidebar/tabs/publish-tab'

  export default {
    name: 'SidebarOptions',
    props: {
      collapsed: localStorage.getItem('collapsedSidebar') == 'false' ? false : true,
    },
    components: {
      Train,
      Talk,
      Details,
      Skills,
      Publish
    },
    data() {
      return {
        selectedTab: 0,
        eventId: null,
        tabs: [
          //{ name: 'Talk', icon: '<svg class="me-1" width="14" height="17" viewBox="0 0 14 17" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M1 9.5V7.25C1 5.6587 1.63214 4.13258 2.75736 3.00736C3.88258 1.88214 5.4087 1.25 7 1.25C8.5913 1.25 10.1174 1.88214 11.2426 3.00736C12.3679 4.13258 13 5.6587 13 7.25V9.5" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/><path d="M11.5 13.25C11.5 14.4927 9.4855 15.5 7 15.5" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/><path d="M1 9.5C1 9.10218 1.15804 8.72064 1.43934 8.43934C1.72064 8.15804 2.10218 8 2.5 8H3.25C3.64782 8 4.02936 8.15804 4.31066 8.43934C4.59196 8.72064 4.75 9.10218 4.75 9.5V11.75C4.75 12.1478 4.59196 12.5294 4.31066 12.8107C4.02936 13.092 3.64782 13.25 3.25 13.25H2.5C2.10218 13.25 1.72064 13.092 1.43934 12.8107C1.15804 12.5294 1 12.1478 1 11.75V9.5Z" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/><path d="M9.25 9.5C9.25 9.10218 9.40804 8.72064 9.68934 8.43934C9.97064 8.15804 10.3522 8 10.75 8H11.5C11.8978 8 12.2794 8.15804 12.5607 8.43934C12.842 8.72064 13 9.10218 13 9.5V11.75C13 12.1478 12.842 12.5294 12.5607 12.8107C12.2794 13.092 11.8978 13.25 11.5 13.25H10.75C10.3522 13.25 9.97064 13.092 9.68934 12.8107C9.40804 12.5294 9.25 12.1478 9.25 11.75V9.5Z" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></svg>'},
          { name: 'Train', icon: '<svg class="me-1" width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M6.5 13.25H2C1.80109 13.25 1.61032 13.171 1.46967 13.0303C1.32902 12.8897 1.25 12.6989 1.25 12.5V2C1.25 1.80109 1.32902 1.61032 1.46967 1.46967C1.61032 1.32902 1.80109 1.25 2 1.25H6.5C6.89782 1.25 7.27936 1.40804 7.56066 1.68934C7.84196 1.97064 8 2.35218 8 2.75C8 2.35218 8.15804 1.97064 8.43934 1.68934C8.72064 1.40804 9.10218 1.25 9.5 1.25H14C14.1989 1.25 14.3897 1.32902 14.5303 1.46967C14.671 1.61032 14.75 1.80109 14.75 2V12.5C14.75 12.6989 14.671 12.8897 14.5303 13.0303C14.3897 13.171 14.1989 13.25 14 13.25H9.5C9.10218 13.25 8.72064 13.408 8.43934 13.6893C8.15804 13.9706 8 14.3522 8 14.75C8 14.3522 7.84196 13.9706 7.56066 13.6893C7.27936 13.408 6.89782 13.25 6.5 13.25Z" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/><path d="M8 2.75V14.75" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/><path d="M4.25 4.25H5" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/><path d="M4.25 7.25H5" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/><path d="M11 4.25H11.75" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/><path d="M11 7.25H11.75" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/><path d="M11 10.25H11.75" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></svg>' },
          { name: 'Skills', icon: '<svg class="me-1" width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M13.1335 15V11.4421C13.8573 10.7476 14.3977 9.88455 14.7061 8.93007C15.0146 7.97559 15.0816 6.95951 14.9012 5.97279C14.7207 4.98607 14.2984 4.05949 13.672 3.276C13.0456 2.49251 12.2347 1.87657 11.312 1.48329C10.3892 1.09002 9.38327 0.931692 8.3843 1.02249C7.38532 1.11328 6.42445 1.45036 5.58769 2.00356C4.75092 2.55675 4.06439 3.3088 3.58953 4.19237C3.11467 5.07595 2.86632 6.06348 2.86669 7.06658V7.53325L1 10.3333L2.86669 11.2666V13.6C2.86669 13.9713 3.01419 14.3274 3.27674 14.5899C3.5393 14.8525 3.8954 15 4.26671 15H7.53341C8.27603 15 8.98823 14.705 9.51333 14.1799C10.0384 13.6548 10.3334 12.9426 10.3334 12.2V8.46659" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/><path d="M10.3332 8.46659C11.3642 8.46659 12.1999 7.63085 12.1999 6.5999C12.1999 5.56896 11.3642 4.73322 10.3332 4.73322C9.3023 4.73322 8.46655 5.56896 8.46655 6.5999C8.46655 7.63085 9.3023 8.46659 10.3332 8.46659Z" fill="currentColor"/></svg>' },
          { name: 'Publish', icon: '<svg class="me-1" width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M7.5 14.75L2.00974 11.6617C1.69486 11.4846 1.5 11.1514 1.5 10.7902V5.20985C1.5 4.84857 1.69486 4.51539 2.00974 4.33827L7.00974 1.52577C7.31415 1.35454 7.68585 1.35454 7.99026 1.52577L12.9903 4.33827C13.3051 4.51539 13.5 4.84857 13.5 5.20985V8" stroke="currentColor" stroke-width="1.2" stroke-linecap="round" stroke-linejoin="round"/><path d="M7.5 8.125L13.0556 5" stroke="currentColor" stroke-width="1.2" stroke-linecap="round" stroke-linejoin="round"/><path d="M7.5 8.125V14.375" stroke="currentColor" stroke-width="1.2" stroke-linecap="round" stroke-linejoin="round"/><path d="M7.49989 8.125L1.94434 5" stroke="currentColor" stroke-width="1.2" stroke-linecap="round" stroke-linejoin="round"/><path d="M9.75 12.5H15" stroke="currentColor" stroke-width="1.2" stroke-linecap="round" stroke-linejoin="round"/><path d="M12.75 10.25L15 12.5L12.75 14.75" stroke="currentColor" stroke-width="1.2" stroke-linecap="round" stroke-linejoin="round"/></svg>' },
          //{ name: 'Favorites', icon: '<svg class="me-1" width="17" height="16" viewBox="0 0 17 16" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M8.5 1L10.818 5.60844L16 6.3474L12.25 9.93425L13.135 15L8.5 12.6084L3.865 15L4.75 9.93425L1 6.3474L6.182 5.60844L8.5 1Z" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></svg>' },
          //{ name: 'Preview', icon: '<svg class="me-1" width="16" height="14" viewBox="0 0 16 14" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M4.25 4L1.25 7L4.25 10" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/><path d="M11.75 4L14.75 7L11.75 10" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/><path d="M9.5 1L6.5 13" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></svg>' },
          //{ name: 'Embeds', icon: '<svg class="me-1" width="14" viewBox="0 0 14 10" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M1.375 5C1.375 5 3.625 0.875 7 0.875C10.375 0.875 12.625 5 12.625 5C12.625 5 10.375 9.125 7 9.125C3.625 9.125 1.375 5 1.375 5Z" stroke="currentColor" stroke-width="1.2" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round"/><path d="M7 7C8.10457 7 9 6.10457 9 5C9 3.89543 8.10457 3 7 3C5.89543 3 5 3.89543 5 5C5 6.10457 5.89543 7 7 7Z" fill="currentColor"/></svg>' },
        ],
        codeBlock: null,
        first: true
      }
    },
    computed: {
      models() {
        return this.$store.state.assistants || [];
      },
      assistant() {
        return this.$store.state.selectedAssistant;
      }
    },
    mounted() {
      this.selectedTab = localStorage.getItem('currentSidebarOption') || 0;
      if(this.selectedTab == 4) {
        this.selectedTab = 0;
      }
      setTimeout(() => {
        this.first = false;
      }, 200);
    },
    methods: {
      navigate(i) {
        this.selectedTab = i;
        localStorage.setItem('currentSidebarOption', i);
      },
      async addPreview(code) {
        this.navigate(2);
        return await this.$refs.preview.addPreview(code);
      },
      async selectPublishTab() {
        this.navigate(5);
        localStorage.setItem('currentSidebarOption', 5);
      },
      async selectModelsTab() {
        this.navigate(0);
        localStorage.setItem('currentSidebarOption', 0);
      },
      async selectSnippetsTab() {
        this.navigate(1);
        localStorage.setItem('currentSidebarOption', 1);
      },
      showDetails(event_id) {
        this.navigate(4);
        this.eventId = event_id;
        setTimeout(() => this.$refs.details.init(event_id), 100)
      }
    },
    watch: {
      selectedTab() {
        if(!this.first) {
          this.$emit('onNavigate');
        }
      }
    }
  }
</script>

<style lang="scss" scoped>
  .sidebar {
    :deep(.nav:not(.nav-pills)) {
      .nav-item {
        .nav-link {
          font-size: 14px;
          display: flex;
          align-items: center;
          padding: 14px 8px;
          margin-bottom: -1px;
          transition: all .2s;
            border-bottom: 2px solid transparent;
          .icon {
            line-height: 10px;
          }
          &.active {
            background: var(--bs-base);
            color: var(--bs-secondary) !important;
            border-color: var(--bs-secondary);
          }
        }
      }
    }
    &.collapsed {
      :deep(.nav:not(.nav-pills)) {
        border: none !important;
        .nav-item {
          .nav-link {
            font-size: 12px;
            &.active {
              border-color: transparent !important;
            }
          }
        }
      }
    }
  }
  .tab-content {
    max-height: calc(var(--vh, 1vh) * 100 - 113px);
    overflow: auto;
    overflow-x: hidden;
  }
  :deep(.code_editor) {
    tab-size: 2;
  }
</style>
