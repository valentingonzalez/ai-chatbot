<template>
  <div class="visible position-relative">
    <button v-if="false" type="button" class="tab d-flex align-items-center" @click="togglePanel">
      <svg :class="{ 'rotate-180': collapsed }" width="10" height="11" viewBox="0 0 10 11" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M1 1.5L5 5.5L1 9.5" stroke="#8390A2" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/><path d="M9 1.5L9 9.5" stroke="#8390A2" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></svg>
    </button>
    <ColumnResize :disabled="collapsed" class="side-panel d-flex flex-column" :width="panelWidth" :minWidth="panelWidth" :direction="'l'" :class="{ 'collapsed': collapsed, 'collapsing': collapsing }">
      <div class="px-3 d-lg-none">
        <div class="int-header bg-transparent">
          <img class="logo d-collapsed-none ms-2" :src="logo" />
          <button type="button" class="right-bt d-lg-none" @click="togglePanel">
            <svg width="24" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" class="w-6 h-6"><path stroke-linecap="round" stroke-linejoin="round" d="M11.25 11.25l.041-.02a.75.75 0 011.063.852l-.708 2.836a.75.75 0 001.063.853l.041-.021M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-9-3.75h.008v.008H12V8.25z" /></svg>
          </button>
        </div>
      </div>
      <div class="flex-grow-1 pt-1 pt-lg-0">
        <SidebarOptions :collapsed="collapsed" v-if="!isDeployedApp" class="h-100" ref="options" @onNavigate="showPanel" />
      </div>
    </ColumnResize>
  </div>
</template>

<script>
import SidebarOptions from '@/components/sidebar/sidebar-options';
import config from "@/api-services/_config";
import { EventBus } from '@/main';

export default {
  name: 'SideBar',
  components: {
    SidebarOptions,
    //VueResizable
  },
  data() {
    return {
      collapsed: localStorage.getItem('collapsedSidebar') == 'false' ? false : true,
      innerWidth: window.innerWidth,
      collapsing: false
    }
  },
  computed: {
    isDeployedApp() {
      return config.isDeployedApp
    },
    logo() {
      return require(`@/assets/images/logo.svg`);
    },
    maxWidth() {
      return this.innerWidth / 2;
    },
    panelWidth() {
      return this.collapsed ? 0 : 416;
    }
  },
  mounted() {
    window.addEventListener('resize', () => this.innerWidth = window.innerWidth);
    EventBus.$on('togglePanel', () => this.togglePanel());
  },
  methods: {
    toggleShowInfo() {
      this.$root.$children[0].showInfo = !this.$root.$children[0].showInfo;
    },
    togglePanel() {
      this.collapsing = true;
      setTimeout(() => this.collapsing = false, 300);
      this.collapsed = !this.collapsed;
      this.$root.$children[0].$refs.sidebarMenu.$refs.mainMenu.visible = false;
      this.$root.$children[0].$refs.navBar.collapse();
    },
    showPanel() {
      if(this.collapsed == true) {
        this.collapsing = true;
        setTimeout(() => this.collapsing = false, 300);
      }
      this.collapsed = false;
    },
    openPanel() {
      this.collapsing = true;
      setTimeout(() => this.collapsing = false, 300);
      this.collapsed = false;
    },
    onResizeEnd(evt) {
      this.panelWidth = evt.width;
      if(evt.width > this.maxWidth) {
        this.$refs.resizable.w = this.maxWidth;
        this.panelWidth = this.maxWidth;
      }
    },
    showDetailsTab(i) {
      this.$refs.options.showDetails(i);
    },
    async addPreview(code) {
      let ret = await this.$refs.options.addPreview(code);
      this.showPanel();
      return ret;
    }
  },
  watch: {
    collapsed() {
      localStorage.setItem('collapsedSidebar', this.collapsed);
    }
  }
}
</script>

<style scoped lang="scss">
  .side-panel {
    position: relative;
    height: 100% !important;
    background: var(--bs-base);
    box-shadow: var(--shadow-left);
    &.collapsing {
      transition: all .3s;
      min-width: 0 !important;
    }
    &:not(.collapsed) {
      width: 416px !important;
    }
    .collapse-bt {
      .icon {
        border-radius: 30px;
        transition: all .3s;
        transform: rotate(180deg);
      }
    }
    &.collapsed {
      width: 64px !important;
      .collapse-bt {
        .icon {
          transform: rotate(0);
        }
      }
      .nav-wrapper {
        margin-left: -50px;
        transition: margin-left .3s;
      }
      :deep(.sidebar) {
        left: 100%;
        .tab-content {
          display: none !important;
        }
        .nav {
          flex-direction: column;
          .nav-link {
            flex-direction: column;
            padding: 14px 10px !important;
            .icon {
              margin: 0 0 3px 0 !important;
            }
          }
        }
      }
    }
  }
  .resizable-component {
    right: 0 !important;
    left: auto !important;
    //height: 100% !important;
  }
  .tab {
    position: absolute;
    z-index: 100;
    border-radius: 5px 0 0 5px;
    padding: 7px 11px;
    left: -34px;
    top: 15px;
    background: var(--bs-base);
    svg {
      transition: transform .2s
    }
  }

  @media (max-width: 991px) {
    .side-panel {
      position: fixed !important;
      z-index: 100;
      top: 0;
      left: 0;
      height: calc(var(--vh, 1vh) * 100) !important;
      left: 100vw;
      transition: left .2s;
      width: 100vw !important;
      max-width: 100vw !important;
      min-width: 0 !important;
      &.collapsed {
        width: 100vw !important;
      }
      &:not(.collapsed) {
        width: 100vw !important;
        left: 0;
      }
    }
  }
</style>