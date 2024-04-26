<template>
  <div id="app" :class="{ 'iframe': iframe }">
    <GlobalLoader :visible="busy" />
    <template v-if="layout != 'empty'">
      <NavBarDeploy v-if="isDeployedApp" ref="navBar" :class="{ 'wide': collapsedMenu }" :collapsed="collapsedMenu" />
      <NavBar v-else ref="navBar" :class="{ 'wide': collapsedMenu }" :collapsed="collapsedMenu" />
    </template>
    <div class="d-flex flex-column flex-lg-row" :class="{ 'h-100': layout == 'empty' }">
      <template v-if="layout != 'empty'">
        <SidebarMenu ref="sidebarMenu" @onCollapse="onCollapseSidebar" v-if="!isDeployedApp" />
        <MessengerHeader />
        <div class="flex-grow-1 d-flex flex-column w-100">
          <div :class="{ 'd-flex': layout == 'default' }">
            <div class="flex-grow-1">
              <router-view class="full-height" ref="routerView"></router-view>
            </div>
            <SideBar ref="sideBar" v-if="layout == 'default' && !isDeployedApp" />
          </div>
        </div>
      </template>
      <template v-else>
        <div class="flex-grow-1">
          <router-view class="h-100" ref="routerView"></router-view>
        </div>
      </template>
    </div>
    <FileUploader ref="fileUploader"/>
    <ImageViewer ref="imageViewer" />
    <PreferencesModal ref="preferencesModal" />
    <EditModelModal :modelId="editingModel" ref="editModelModal" />
  </div>
</template>

<script>
  import MessengerHeader from '@/components/messenger/messenger-header';
  import SideBar from '@/components/sidebar/sidebar';
  import SidebarMenu from '@/components/navigation/sidebar-menu';
  import FileUploader from '@/components/uploader/file-uploader'
  import NavBar from '@/components/navigation/nav-bar'
  import NavBarDeploy from '@/components/navigation/nav-bar-deploy';
  import GlobalLoader from '@/components/global-loader';
  import ImageViewer from '@/components/image-viewer'
  import socketio from 'socket.io-client';
  import config from '@/api-services/_config';
  import AuthService from './api-services/auth.service';
  import DeployService from './api-services/deploy.service';
  import Eruda from 'eruda';
  import PreferencesModal from '@/modals/preferences'
  import EditModelModal from '@/components/models/edit-model';
  import WhitelLabel from './api-services/whitelabel.service';
  import ChatbotService from './api-services/chatbot.service';

  import { EventBus } from "@/main";
  import Vue from 'vue';

  export default {
    name: 'App',
    components: {
      NavBarDeploy,
      MessengerHeader,
      SideBar,
      SidebarMenu,
      FileUploader,
      NavBar,
      GlobalLoader,
      ImageViewer,
      PreferencesModal,
      EditModelModal
    },
    data() {
      return {
      dragover: false,
      busy: true,
      nodeUrl: process.env.VUE_APP_NODE_URL || 'https://chat.ezai.io', // socket.io path is routed to node from haproxy
      theme: localStorage.getItem('theme'),
      socket: null,
      collapsedMenu: localStorage.getItem('collapsedMenu') == 'true' ? true : false,
      deployObject: null,
      editingModel: null
      }
    },
    computed: {
      layout() {
        return this.$route.meta.layout || 'default';
      },
      fileUploader() {
        return this.$refs.fileUploader;
      },
      isDeployedApp() {
        return config.isDeployedApp;
      },
      iframe() {
        return window.self !== window.top;
      },
      rooms() {
        return this.$store.state.rooms;
      }
    },
    async created() {
      this.addPrototypes();
      if(!this.rooms) {
        await this.$store.dispatch('getAllRooms', this.searchQuery);
      }

      const connectSocket = () => {
        this.socket = socketio(this.nodeUrl, { auth: { token: config.sessionValue } });
      };

      const reconnectSocket = () => {
        setTimeout(() => {
          if(this.socket.io.readyState === 'pending') {
            this.socket.io.close();
            connectSocket();
            reconnectSocket();
          }
        }, 5000);
      };

      connectSocket();
      reconnectSocket();

      this.$router.beforeEach(async (to, from, next) => {
        if(this.$refs.navBar && !this.isDeployedApp) {
          this.$refs.navBar.collapse();
        }
        next();
      });
    },
    async mounted() {
      this.busy = true;
      window.addEventListener('contextmenu', e => e.preventDefault(), false);
      this.selectTheme(this.theme);
      if(this.isDeployedApp) {
        if(config.sessionValue) {
          await this.checkSession();
        }
        await this.setDeployment();
        this.pingInteraction();
      } else {
        await this.checkSession();
      }
      setTimeout(() => {
        this.busy = false;
      }, 700);
      //this.wearOffIntruders();
      if(this.$route.query.eruda == 'true') {
        Eruda.init();
      }

      this.checkWhiteLabel();
    },
    methods: {
      editModel(id) {
        this.editingModel = id;
        this.$refs.editModelModal.show();
      },
      addPrototypes() {
        Vue.prototype.$toast = (h, i) => this.$swal({ toast: true, position: 'top', icon: i || 'success', html: h, showConfirmButton: false, timer: 3000 });
        Vue.prototype.$parseDuration = (d) => {
          if(!d) return;
          let h = Math.floor(d / 3600), m = Math.floor((d % 3600) / 60), s = d % 60;
          return h > 0 ? `${h}:${m} hrs` : m > 0 ? `${m}:${s} mins` : `${s} secs`;
        };
      },
      wearOffIntruders() {
        let intervalId;
        let index = 0;
        const warningMessages = [
          `🚨 Hey! This is a restricted area! 🚨`,
          `👀 You're not supposed to be here! 👀`,
          `🔒 Access denied! 🔒`,
          `🙅‍♀️ Stop right there, intruder! 🙅‍♂️`,
          `🤖 Beep boop, unauthorized access detected! 🤖`,
          `🚨 I mean this is an A.I software... Did you think I wasn't going to notice?? 👀`,
          `✉️ Why don't you email us at contact@ezai.io and join our team if your this good!! 🚀`
        ];

        function startWarningMessages() {
          intervalId = setInterval(() => {
          index = (index + 1) % warningMessages.length;
          if(index === warningMessages.length) {
            stopWarningMessages();
          }
          }, 6000);
        }

        function stopWarningMessages() {
          clearInterval(intervalId);
        }
        startWarningMessages();
      },
      async setDeployment() {
        const response = await DeployService.getDeployment({deploy_key: config.deployKey});
        if(response.success == 0) {
          this.$swal('', response.error, 'error');
          return;
        }

        let deployment = response.deployment;
        if(deployment.settings && deployment.settings !== ''){
          deployment.settings = JSON.parse(deployment.settings);
        }
        
        EventBus.$emit('addDeployment', deployment);
        config.setDeploymentObject(deployment);
        this.deployObject = deployment;
      },
      async checkDeploySession() {
        const response = await DeployService.checkSession();
        if(response.success == 0) {
          document.cookie = "ezai_auth_session_cookie=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
          window.location = config.urlAuth;
        }
      },
      onCollapseSidebar(collapsed) {
        this.collapsedMenu = collapsed;
      },
      extractCodeBlocks(data) {
        const regex = /(```|``````)\s*([\s\S]*?)\s*\1/g;
        let matches;
        let lastIndex = 0;
        const codeBlocks = [];

        while ((matches = regex.exec(data)) !== null) {
          const [fullMatch, delimiter, content] = matches;
          const type = delimiter === '```' ? 'code' : 'html';
          const template = {
            id: 0,
            type: 'text',
            content,
            start: 0,
            end: regex.lastIndex,
            full: fullMatch
          }
          if(lastIndex === 0) {
            const startTag = '<!DOCTYPE html>';
            const startTagIndex = data.indexOf(startTag);
            if(startTagIndex === 0) {
              codeBlocks.push({
                ...template,
                content: '```' + startTag,
                end: startTagIndex + startTag.length,
                full: '```' + startTag
              });
              lastIndex = startTagIndex + startTag.length;
              continue;
            } else {
              codeBlocks.push({
                ...template,
                content: data.substring(0, matches.index)
              });
            }
          }
          codeBlocks.push({
            ...template,
            id: codeBlocks.length,
            type,
            content,
            start: lastIndex,
            end: matches.index,
          });
          lastIndex = regex.lastIndex;
        }
        if(lastIndex < data.length) {
          codeBlocks.push({
            id: codeBlocks.length,
            type: 'text',
            content: data.substring(lastIndex),
            start: lastIndex,
            end: data.length,
          });
        }
        if(codeBlocks.length > 0 && codeBlocks[codeBlocks.length - 1].type !== 'text') {
          codeBlocks.push({
            id: codeBlocks.length,
            type: 'text',
            content: '```',
            start: lastIndex,
            end: data.length,
          });
        }
        return codeBlocks;
      },
      showDetailsTab(event_id) {
        this.$refs.sideBar.showDetailsTab(event_id);
      },
      async checkSession() {
        const response = await AuthService.checkSession();
        if(response.success == 0) {
          document.cookie = "ezai_auth_session_cookie=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
          window.location = config.urlAuth;
        }
        this.$store.state.member = response.member;
      },
      async checkWhiteLabel() {
        const response = await WhitelLabel.checklabel();
        if(!response.exists)
          this.$store.commit('updateWhiteLabel', true);
      },
      selectTheme(theme) {
        this.theme = theme;
        const html = document.documentElement;
        html.classList.add('adding-theme');
        html.className = html.className.split(' ').filter(c => c.lastIndexOf('theme', 0) !== 0).join(' ').trim();
        localStorage.setItem('theme', theme);
        html.classList.add(localStorage.getItem('theme'));
        setTimeout(() => html.classList.remove('adding-theme'), 1000);
      },
      async addPreview(code) {
        return await this.$refs.sideBar.addPreview(code);
      },
      dontScroll(mobile = false) {
        document.getElementsByTagName('html')[0].classList.add(mobile ? 'no-scroll-mobile' : 'no-scroll');
      },
      scroll() {
        document.getElementsByTagName('html')[0].classList.remove('no-scroll', 'no-scroll-mobile');
      },
      pingInteraction() {
        let url = `https://${config.deployKey}.app.ezai.io/?token=${config.deployKey}`;
        ChatbotService.pingInteraction({url, deploy_key: config.deployKey});
        return;
      }
    }
  }
</script>

<style lang="scss">
  @import '@/assets/scss/app.scss';
  #app {
    height: calc(var(--vh, 1vh) * 100);
    .full-height {
      height: calc(var(--vh, 1vh) * 100 - 62px);
      overflow: auto;
    }
    @media (max-width: 991px) {
      .mainContent {
        margin-top: 68px;
      }
    }

    &.iframe {
      .deploy-logo {
        max-height: 26px;
      }
    }
  }
</style>
