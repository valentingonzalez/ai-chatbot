<template>
  <nav class="navbar py-0 navbar-expand-lg border-top bg-base">
    <div class="container d-flex justify-content-center" v-if="!loading">
      <div class="logo-wrapper d-none d-lg-flex align-content-center justify-content-center w-100">
        <div class="p-3" style="height: 60px" v-if="deployData && deployObject.logo">
          <template v-if="!loading">
            <router-link v-if="deployObject && deployObject.logo" to="/" target="_blank">
              <img :src="deployObject.logo" height="30" />
            </router-link>
            <router-link v-else to="/" target="_blank" class="navbar-brand text-primary" style="line-height: 0;">
              <img  class="ms-2" :src="logo" />
            </router-link>
          </template>
        </div>
        <div>
          <p class="fs-5 fw-bolder pt-3" v-if="deployData && deployObject.name">{{ deployData.name }} </p>
        </div>
      </div>
      <a v-if="deployButton" :href="deployButton.href" @click="clickedDeployButton" class="w-inline-block">
        <div class="btn-deploy my-2">
          <div style="-webkit-transform:translate3d(-100%, 0, 0) scale3d(1, 1, 1) rotateX(0) rotateY(0) rotateZ(0) skew(0, 0);-moz-transform:translate3d(-100%, 0, 0) scale3d(1, 1, 1) rotateX(0) rotateY(0) rotateZ(0) skew(0, 0);-ms-transform:translate3d(-100%, 0, 0) scale3d(1, 1, 1) rotateX(0) rotateY(0) rotateZ(0) skew(0, 0);transform:translate3d(-100%, 0, 0) scale3d(1, 1, 1) rotateX(0) rotateY(0) rotateZ(0) skew(0, 0)" class="btn-deploy-bg"></div>
          <div class="btn-deploy_wrapper">
            <span class="fw-bold small">{{ deployButton.label }}</span>
            <div class="btn-deploy-icon">
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M10.4763 6.16658L6.00633 1.69657L7.18483 0.518066L13.6667 6.99992L7.18483 13.4817L6.00633 12.3032L10.4763 7.83325H0.333334V6.16658H10.4763Z" fill="black"/>
              </svg>
            </div>
          </div>
        </div>
      </a>
    </div>
  </nav>
</template>

<script>
import config from '@/api-services/_config';
import AuthService from '../../api-services/auth.service';
import ChatbotService from '../../api-services/chatbot.service';
import {EventBus} from "@/main";


export default {
  name: 'NavBarDeploy',
  props: {
    showLogo: {
      default: false
    }
  },
  data() {
    return {
      loading: true,
      deployData: null, // Rename the data property
      deployButton: null,
    }
  },
  mounted() {
    EventBus.$on('addDeployment',async (deployment) => {
      this.deployData = deployment; // Assign the value to the renamed data property
      await this.getRandomButton();
      this.loading = false;
    });
  },
  computed: {
    deployObject() {
      return this.deployData; // Use the renamed data property
    },
    logo() {
      return require(`@/assets/images/logo.svg`);
    },
    isDeployedApp() {
      return config.isDeployedApp;
    },
  },
  methods:{
    getRandomButton(){
      ChatbotService.checkButton({deploy_id:this.deployData.id}).then( res => {
        if(!res.success){
          return;
        }
        ChatbotService.getRandomButton().then( res => {
          this.deployButton = res.button;
        })
      })
    },
    clickedDeployButton(){
      ChatbotService.clickedButton({button_id: this.deployButton.id});
    },
    async logout() {
      let res = await AuthService.logout();
      if(res.success) {
        document.cookie = "ezai_auth_session_cookie=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
        window.location = config.urlAuth;
      }
    }
  }
}
</script>

<style scoped lang="scss">
.w-inline-block {
  max-width: 100%;
  display: inline-block;
}
.btn-deploy {
  color: #000;
  background-color: #fff1bf;
  border-radius: .625rem;
  justify-content: center;
  align-items: center;
  padding: 8px;
  font-size: 1.2rem;
  transition: all .5s;
  position: relative;
  overflow: hidden;
  min-width: 192px;
}

.btn-deploy:hover {
  opacity: .8;
}

.btn-deploy-bg {
  width: 100%;
  height: 100%;
  filter: blur(20px);
  background-color: rgba(255, 255, 255, .24);
  position: absolute;
  top: 0%;
  bottom: auto;
  left: 0%;
  right: auto;
}
.btn-deploy_wrapper {
  z-index: 1;
  grid-column-gap: 1rem;
  grid-row-gap: 1rem;
  justify-content: center;
  align-items: center;
  font-family: Figtree Medium, sans-serif;
  font-weight: 500;
  display: flex;
  position: relative;
}
.btn-deploy-icon {
  width: 1.4rem;
}
.navbar {
  z-index: 11;
  background: var(--bs-body-bg);
  border-bottom: 1px solid #F3F4F6;
  margin-bottom: -1px;
  transition: margin-left .3s;
  .logo-wrapper {
    width: 0;
    transition: width .3s;
  }
  @media (max-width: 991px) {
    position: fixed;
    width: 100%;
    top: 66px;
  }
  @media (min-width: 992px) {
    &.wide {
      margin-left: -60px;
      z-index: 30;
      .logo-wrapper {
        width: 148px;
      }
    }
  }
  .navbar-nav {
    --bs-navbar-height: 100vh !important;
  }
  .nav-link {
    color: var(--bs-link-color) !important;
    border-bottom: 3px solid transparent !important;
    &.router-link-exact-active {
      color: var(--bs-secondary) !important;
      border-color: var(--bs-secondary) !important;
    }
  }
  .notifications {
    position: relative;
    .num {
      position: absolute;
      font-size: 10px;
      color: #fff;
      min-width: 13px;
      height: 13px;
      margin: -13px -2px 0 0;
      border-radius: 12px;
      padding: 0 2px 1px;
      background: #EE7337;
      display: flex;
      align-items: center;
      justify-content: center;
      font-weight: 500;
      top: 50%;
      left: 50%;
      @media (max-width: 991px) {
        position: static;
        margin: 0 0 0 10px;
        min-width: 18px;
        height: 18px;
        font-size: 14px;
      }
    }
  }
  .user-dropdown {
    .avatar {
      width: 28px;
      height: 28px;
      border-radius: 28px;
      object-fit: cover;
      img {
        width: 100%;
        height: 100%;
      }
    }
  }
  .user-dropdown-menu {
    .card {
      min-width: 236px;
    }
    .thumb {
      width: 32px;
      height: 32px;
      font-size: 12px;
      font-weight: 600;
      background: #FBE6C9;
      display: flex;
      align-items: center;
      justify-content: center;
      border-radius: 32px;
    }
    @media (max-width: 991px) {
      display: block !important;
      background: none !important;
      box-shadow: none !important;
      .card {
        box-shadow: none !important;
      }
    }
  }
}
</style>