<template>
  <div id="messengerHeader" class="position-relative messenger-header bg-white d-lg-none w-100">
    <div class="px-3">
      <div class="int-header bg-transparent position-relative w-100 d-flex justify-content-between">
        <button v-if="!isDeployedApp && layout == 'default'" type="button" class="ms-4 ps-1 hamburger d-flex align-items-center text-muted" @click="toggleMenu" style="z-index: 100;">
          <svg width="18" viewBox="0 0 16 15" fill="none" xmlns="http://www.w3.org/2000/svg"><path data-v-670584cc="" d="M13.6001 10.7C14.6667 9.63337 15.3334 8.30004 15.3334 6.83337C15.3334 3.50004 12.0667 0.833374 8.00008 0.833374C3.93341 0.833374 0.666748 3.50004 0.666748 6.83337C0.666748 10.1667 3.93341 12.8334 8.00008 12.8334C8.73341 12.8334 9.40008 12.7667 10.0667 12.5667L14.0001 14.1667L13.6001 10.7Z" stroke="currentColor" stroke-width="1.4" stroke-miterlimit="10" stroke-linecap="square" stroke-linejoin="round"></path></svg>
        </button>
        <div class="flex-grow-1 d-flex justify-content-center">
          <router-link to="/" target="_blank">
            <img v-if="deployObject && deployObject.logo" :src="deployObject.logo" class="deploy-logo d-collapsed-none fade-in  pt-3" height="45" />
            <img v-else class="ms-2" :src="logo" />
          </router-link>
          <p v-if="deployObject && deployObject.logo" class="fw-bolder fade-in fs-5 pt-3 ps-2">{{ deployObject.name }}</p>
        </div>
        <button v-if="!isDeployedApp && layout == 'default'" type="button" @click="togglePanel">
          <svg width="24" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" class="w-6 h-6"><path stroke-linecap="round" stroke-linejoin="round" d="M11.25 11.25l.041-.02a.75.75 0 011.063.852l-.708 2.836a.75.75 0 001.063.853l.041-.021M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-9-3.75h.008v.008H12V8.25z" /></svg>
        </button>
        <button v-else-if="layout == 'settings'" type="button" class="hamburger d-flex align-items-center text-muted" @click="toggleMenu">
          <svg width="22" height="22" xmlns="http://www.w3.org/2000/svg" fill="none" stroke-width="1.5" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" d="M9.594 3.94c.09-.542.56-.94 1.11-.94h2.593c.55 0 1.02.398 1.11.94l.213 1.281c.063.374.313.686.645.87.074.04.147.083.22.127.324.196.72.257 1.075.124l1.217-.456a1.125 1.125 0 011.37.49l1.296 2.247a1.125 1.125 0 01-.26 1.431l-1.003.827c-.293.24-.438.613-.431.992a6.759 6.759 0 010 .255c-.007.378.138.75.43.99l1.005.828c.424.35.534.954.26 1.43l-1.298 2.247a1.125 1.125 0 01-1.369.491l-1.217-.456c-.355-.133-.75-.072-1.076.124a6.57 6.57 0 01-.22.128c-.331.183-.581.495-.644.869l-.213 1.28c-.09.543-.56.941-1.11.941h-2.594c-.55 0-1.02-.398-1.11-.94l-.213-1.281c-.062-.374-.312-.686-.644-.87a6.52 6.52 0 01-.22-.127c-.325-.196-.72-.257-1.076-.124l-1.217.456a1.125 1.125 0 01-1.369-.49l-1.297-2.247a1.125 1.125 0 01.26-1.431l1.004-.827c.292-.24.437-.613.43-.992a6.932 6.932 0 010-.255c.007-.378-.138-.75-.43-.99l-1.004-.828a1.125 1.125 0 01-.26-1.43l1.297-2.247a1.125 1.125 0 011.37-.491l1.216.456c.356.133.751.072 1.076-.124.072-.044.146-.087.22-.128.332-.183.582-.495.644-.869l.214-1.281z" /><path stroke-linecap="round" stroke-linejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import config from '@/api-services/_config';
import {EventBus} from "@/main";

export default {
  name: 'MessengerHeader',
  data() {
    return {
      loading: true,
      deployObject: null
    }
  },
  computed: {
    layout() {
      return this.$route.meta.layout || 'default';
    },
    logo() {
      return require(`@/assets/images/logo.svg`);
    },
    isDeployedApp() {
      return config.isDeployedApp;
    }
  },
  mounted() {
    if(!this.isDeployedApp) {
      this.loading = false;
    } else {
      EventBus.$on('addDeployment',d => {
        this.deployObject = d;
        this.loading = false;
      });
    }
  },
  methods: {
    toggleMenu() {
      this.$parent.$refs.sidebarMenu.$refs.mainMenu.toggle();
    },
    togglePanel() {
      this.$parent.$refs.sideBar.togglePanel();
    }
  },
}
</script>

<style scoped lang="scss">
  .messenger-header {
    position: relative;
    @media (max-width: 991px) {
      position: fixed;
    }
  }
</style>
