<template>
  <ColumnResize ref="column" class="sidebar-menu" :maxWidth="600" :width="panelWidth" :minWidth="panelWidth" v-if="layout != 'no-sidebars'" :class="{ 'collapsed': collapsed, 'collapsing': collapsing }" @onCollapse="onCollapse" @onMousedown="onMouseDown">
    <MainMenu :collapsed="collapsed" ref="mainMenu" v-if="layout == 'default' || layout == 'no-sidebar'" @toggleMenu="onCollapse" @onNewChat="showMenu" />
    <SettingsMenu ref="mainMenu" v-if="layout == 'settings'" @toggleMenu="onCollapse" />
  </ColumnResize>
</template>

<script>
  import MainMenu from '@/components/navigation/menu';
  import SettingsMenu from '@/components/navigation/settings-menu';
  export default {
    name: 'SidebarMenu',
    components: {
      MainMenu,
      SettingsMenu
    },
    data() {
      return {
        collapsing: false,
        collapsed: localStorage.getItem('collapsedMenu') ? JSON.parse(localStorage.getItem('collapsedMenu')) : false,
      }
    },
    computed: {
      panelWidth() {
        return this.collapsed ? 60 : 296;
      },
      layout() {
        return this.$root.$children[0].layout;
      }
    },
    methods: {
      onMouseDown() {
        if(this.collapsed) {
          this.collapsing = true;
          setTimeout(() => this.collapsing = false, 300);
          this.collapsed = false;
          this.$refs.column.stopResizing();
        }
      },
      onCollapse() {
        this.collapsing = true;
        setTimeout(() => this.collapsing = false, 300);
        this.collapsed = !this.collapsed;
      },
      showMenu() {
        if(this.collapsing) {
          this.collapsing = true;
          setTimeout(() => this.collapsing = false, 300);
          this.collapsed = false;
        }
      },
    },
    watch: {
      collapsed() {
        this.$emit('onCollapse', this.collapsed);
        localStorage.setItem('collapsedMenu', this.collapsed);
        window.dispatchEvent(new Event('toggleMenu'));
      }
    }
  }
</script>

<style scoped lang="scss">
  .sidebar-menu {
    z-index: 999;
    &.collapsing {
      transition: all .3s;
      //min-width: 60px !important;
    }
    @media (min-width: 991px) {
      &.collapsed {
        :deep(.d-collapsed-none) {
          display: none;
        }
        :deep(.no-chats) {
          display: none;
        }
        :deep(.add-chat) {
          padding: 0 !important;
          svg {
            margin: 0 !important;
          }
        }
        :deep(.collapse-bt) {
          flex-grow: 1;
          margin: 20px 0;
          transform: rotate(180deg);
        }
        :deep(.nav) {
          .nav-item {
            .nav-link {
              display: flex;
              justify-content: center;
              .thumb {
                margin: 0 !important;
              }
              &::after {
                display: none;
              }
            }
            &:hover .delete-bt {
              display: none !important;
            }
          }
        }
        :deep(.px-3) {
          padding-left: .6rem !important;
          padding-right: .6rem !important;
        }
        :deep(.add-assistant-btn) {
          display: flex !important;
          justify-content: center !important;
          padding: 0 !important;
          svg {
            margin: 0 !important;
            width: 22px;
            height: 22px;
          }
        }
      }
    }
  }
</style>