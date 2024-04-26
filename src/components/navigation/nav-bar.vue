<template>
  <div class="navbar-wrapper position-relative ms-1 " style="z-index: 100;">
    <div class="menu-btn d-flex d-lg-none align-items-center justify-content-center mb-1 mt-1">
      <button class="text-primary text-uppercase fw-bold" type="button" data-bs-toggle="collapse" data-bs-target="#navbarScroll" aria-controls="navbarScroll" aria-expanded="false" aria-label="Toggle navigation" @click="$root.$children[0].$refs.sideBar.collapsed = true">
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g clip-path="url(#clip0_50_333)"><path d="M4 6H20" stroke="#4B5563" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/><path d="M4 12H20" stroke="#4B5563" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/><path d="M4 18H20" stroke="#4B5563" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></g><defs><clipPath id="clip0_50_333"><rect width="24" height="24" fill="white"/></clipPath></defs></svg>
      </button>
    </div>
    <nav class="navbar py-0 navbar-expand-lg border-top bg-base">
      <div class="container-fluid">
        <div class="logo d-none d-lg-block">
          <router-link to="/" class="navbar-brand text-primary" style="line-height: 0;">
            <svg width="133" viewBox="0 0 178 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M123.938 23.9617V0H132.04V23.9617H123.938Z" fill="#DC2631"/><path d="M0.480002 23.9617C0.214904 23.9617 0 23.7467 0 23.4817V0.480002C0 0.214904 0.214904 0 0.480002 0H29.8369V1.6896C29.8369 3.81039 28.1176 5.52962 25.9969 5.52962H8.58242C8.31733 5.52962 8.10242 5.74451 8.10242 6.00961V8.81282C8.10242 9.07792 8.31733 9.29283 8.58242 9.29283H19.0272C19.2924 9.29283 19.5072 9.50772 19.5072 9.77282V14.3424C19.5072 14.6075 19.2924 14.8224 19.0272 14.8224H8.58242C8.31733 14.8224 8.10242 15.0373 8.10242 15.3024V17.952C8.10242 18.2172 8.31733 18.432 8.58242 18.432H29.3569C29.622 18.432 29.8369 18.647 29.8369 18.912V23.4817C29.8369 23.7467 29.622 23.9617 29.3569 23.9617H0.480002Z" fill="#DC2631"/><path d="M115.441 23.224C115.644 23.5435 115.415 23.9617 115.036 23.9617H107.486C107.327 23.9617 107.179 23.8829 107.089 23.7511L105.186 20.9466C105.097 20.8148 104.948 20.736 104.789 20.736H88.4401C88.2809 20.736 88.1321 20.8148 88.0429 20.9466L86.1396 23.7511C86.0504 23.8829 85.9016 23.9617 85.7426 23.9617H78.1556C77.7765 23.9617 77.5471 23.5431 77.7509 23.2236L91.9972 0.887525C92.3499 0.334664 92.9603 0 93.616 0H99.6116C100.268 0 100.879 0.335452 101.232 0.889369L115.441 23.224ZM100.888 15.168C101.271 15.168 101.5 14.7432 101.289 14.424L97.0007 7.91162C96.8099 7.62184 96.384 7.62403 96.1962 7.91576L92.0028 14.4282C91.7973 14.7476 92.0266 15.168 92.4065 15.168H100.888Z" fill="#DC2631"/><path d="M64.1471 18.432C67.2011 18.432 69.6768 20.9077 69.6768 23.9617H40.3583C40.0931 23.9617 39.8782 23.7467 39.8782 23.4817V19.9357C39.8782 18.6383 40.5334 17.4286 41.62 16.7197L58.7712 5.52962H45.3695C42.3155 5.52962 39.8398 3.05391 39.8398 0H69.1968C69.4618 0 69.6768 0.214904 69.6768 0.480002V5.92185C69.6768 6.08436 69.5946 6.23583 69.4583 6.32437L50.8223 18.432H64.1471Z" fill="#DC2631"/><path d="M139.161 24V20.16H143.02V24H139.161Z" fill="#DC2631"/><path d="M150.192 12H154.263V23.9808H150.192V12Z" fill="#DC2631"/><path d="M160.744 14.1504C160.744 13.7664 160.834 13.44 161.013 13.1712C161.192 12.9024 161.429 12.6848 161.723 12.5184C162.018 12.3392 162.351 12.2112 162.722 12.1344C163.093 12.0448 163.477 12 163.874 12H174.376C174.735 12 175.099 12.0448 175.471 12.1344C175.855 12.224 176.194 12.3648 176.488 12.5568C176.783 12.736 177.026 12.96 177.218 13.2288C177.41 13.4976 177.506 13.8048 177.506 14.1504V21.8305C177.506 22.1761 177.41 22.4832 177.218 22.7521C177.026 23.0209 176.783 23.2513 176.488 23.4432C176.194 23.6224 175.855 23.7568 175.471 23.8465C175.099 23.9361 174.735 23.9808 174.376 23.9808H163.874C163.477 23.9808 163.093 23.9425 162.722 23.8656C162.351 23.776 162.018 23.648 161.723 23.4817C161.429 23.3024 161.192 23.0784 161.013 22.8096C160.834 22.5409 160.744 22.2145 160.744 21.8305V14.1504ZM172.475 21.216C173.006 21.216 173.435 20.7863 173.435 20.2561V15.7248C173.435 15.1946 173.006 14.7648 172.475 14.7648H165.755C165.225 14.7648 164.795 15.1946 164.795 15.7248V20.2561C164.795 20.7863 165.225 21.216 165.755 21.216H172.475Z" fill="#DC2631"/></svg>
          </router-link>
        </div>
        <div class="collapse navbar-collapse" ref="navbarScroll" id="navbarScroll">
          <router-link v-if="collapsed" to="/" class="navbar-brand text-primary" style="line-height: 0;">
            <img class="ms-2 logo d-collapse d-none" :src="logo" />
          </router-link>
          <ul class="navbar-nav me-auto navbar-nav-scroll fw-sbold d-none d-lg-flex">
            <li class="nav-item" >
              <router-link @click="$logActivity({action: 'click', page: $route.name, type: 'goToChats'});" to="/" class="nav-link main px-0 py-3 mx-3 d-flex align-items-center fw-medium" :class="{ 'router-link-exact-active': $route.path == '/' }" exact>
                <svg class="me-2" width="20" height="18" viewBox="0 0 20 18" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M16.52 12.84C17.8 11.56 18.6 9.96 18.6 8.2C18.6 4.2 14.68 1 9.8 1C4.92 1 1 4.2 1 8.2C1 12.2 4.92 15.4 9.8 15.4C10.68 15.4 11.48 15.32 12.28 15.08L17 17L16.52 12.84Z" stroke="currentColor" stroke-width="1.5" stroke-miterlimit="10" stroke-linecap="square" stroke-linejoin="round"/></svg>
                Chat
              </router-link>
            </li>
            <li class="nav-item" v-if="false">
              <router-link @click="$logActivity({action: 'click', page: $route.name, type: 'goToModels'});" to="/models" class="nav-link main px-0 py-3 mx-3 d-flex align-items-center fw-medium">
                <svg class="me-2" width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M14.8668 17V12.9338C15.6941 12.1401 16.3116 11.1537 16.6642 10.0628C17.0168 8.97197 17.0934 7.81072 16.8871 6.68302C16.6808 5.55532 16.1982 4.49636 15.4823 3.60093C14.7664 2.7055 13.8397 2.00154 12.7851 1.55208C11.7304 1.10262 10.5808 0.921671 9.43912 1.02544C8.29742 1.1292 7.19926 1.51445 6.24294 2.14668C5.28663 2.77891 4.502 3.63841 3.9593 4.64822C3.4166 5.65804 3.13275 6.78667 3.13318 7.93308V8.46643L0.999786 11.6665L3.13318 12.7332V15.4C3.13318 15.8243 3.30176 16.2313 3.60182 16.5314C3.90189 16.8314 4.30887 17 4.73322 17H8.46666C9.31538 17 10.1293 16.6628 10.7295 16.0627C11.3296 15.4626 11.6668 14.6486 11.6668 13.7999V9.53312" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/><path d="M11.6667 9.53313C12.845 9.53313 13.8001 8.57798 13.8001 7.39973C13.8001 6.22149 12.845 5.26634 11.6667 5.26634C10.4885 5.26634 9.53336 6.22149 9.53336 7.39973C9.53336 8.57798 10.4885 9.53313 11.6667 9.53313Z" fill="currentColor"/></svg>
                Assistants
              </router-link>
            </li>
            <li class="nav-item">
              <router-link @click="$logActivity({action: 'click', page: $route.name, type: 'goToDataSources'});" to="/files" class="nav-link main px-0 py-3 mx-3 d-flex align-items-center fw-medium">
                <svg class="me-2" width="17" height="20" viewBox="0 0 17 20" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M11 1V5C11 5.26522 11.1054 5.51957 11.2929 5.70711C11.4804 5.89464 11.7348 6 12 6H16" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/><path d="M14 15H7C6.46957 15 5.96086 14.7893 5.58579 14.4142C5.21071 14.0391 5 13.5304 5 13V3C5 2.46957 5.21071 1.96086 5.58579 1.58579C5.96086 1.21071 6.46957 1 7 1H11L16 6V13C16 13.5304 15.7893 14.0391 15.4142 14.4142C15.0391 14.7893 14.5304 15 14 15Z" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/><path d="M12 15V17C12 17.5304 11.7893 18.0391 11.4142 18.4142C11.0391 18.7893 10.5304 19 10 19H3C2.46957 19 1.96086 18.7893 1.58579 18.4142C1.21071 18.0391 1 17.5304 1 17V7C1 6.46957 1.21071 5.96086 1.58579 5.58579C1.96086 5.21071 2.46957 5 3 5H5" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></svg>
                Data Sources
              </router-link>
            </li>
            <li class="nav-item">
              <router-link @click="$logActivity({action: 'click', page: $route.name, type: 'goToDeploy'});" to="/deploy" class="nav-link main px-0 py-3 mx-3 d-flex align-items-center fw-medium">
                <svg class="me-2" width="19" height="19" viewBox="0 0 19 19" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M8.55556 18L1 13.75V5.25L8.55556 1L16.1111 5.25V9.5" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/><path d="M8.55554 9.65784L15.5514 5.72266" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/><path d="M8.55554 9.6582V17.5286" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/><path d="M8.55558 9.65784L1.55969 5.72266" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/><path d="M11.3889 15.167H18" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/><path d="M15.1667 12.333L18 15.1663L15.1667 17.9997" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></svg>
                Publish
              </router-link>
            </li>
          </ul>
          <ul class="navbar-nav navbar-nav-scroll">
            <li class="nav-item">
              <a :href="discordLink" target="_blank" class="nav-link main px-0 py-3 mx-3 d-flex align-items-center fw-medium" style="color: var(--color-discord) !important">
                <svg class="me-2" width="18" height="16" viewBox="0 0 18 16" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M11.4858 0.5L11.5883 0.505C13.2667 0.683333 14.5275 1.065 15.7267 1.89917C15.8698 1.99901 15.9779 2.14125 16.0358 2.30583C17.5992 6.735 18.0133 10.6283 17.245 12.5392C16.4092 14.21 15.0733 15.5 13.5833 15.5C12.9733 15.5 12.1725 14.6933 11.6433 13.7958C12.234 13.6883 12.8189 13.5512 13.3958 13.385C13.5011 13.3549 13.5994 13.3044 13.6852 13.2363C13.7709 13.1682 13.8424 13.0839 13.8956 12.9882C13.9488 12.8924 13.9825 12.7872 13.995 12.6784C14.0075 12.5696 13.9984 12.4594 13.9683 12.3542C13.9383 12.2489 13.8877 12.1506 13.8196 12.0648C13.7515 11.9791 13.6672 11.9076 13.5715 11.8544C13.4758 11.8013 13.3705 11.7675 13.2617 11.755C13.153 11.7425 13.0428 11.7516 12.9375 11.7817C10.1708 12.5733 7.82918 12.5733 5.06251 11.7817C4.8499 11.7209 4.62185 11.7471 4.42853 11.8544C4.23521 11.9618 4.09246 12.1416 4.03168 12.3542C3.9709 12.5668 3.99707 12.7948 4.10444 12.9882C4.2118 13.1815 4.39157 13.3242 4.60418 13.385C5.20168 13.555 5.78418 13.6933 6.35668 13.7967C5.82751 14.6925 5.02668 15.5 4.41668 15.5C2.92668 15.5 1.59085 14.21 0.726681 12.4758C-0.013319 10.6283 0.401681 6.73417 1.96418 2.30583C2.02212 2.14125 2.13026 1.99901 2.27335 1.89917C3.47251 1.065 4.73335 0.683333 6.41168 0.505C6.56223 0.48894 6.71432 0.5142 6.8516 0.578067C6.98887 0.641934 7.10616 0.741995 7.19085 0.8675L7.24335 0.956667L7.78585 2.0275L7.90001 2.01417C8.63227 1.93917 9.37026 1.93917 10.1025 2.01417L10.2142 2.0275L10.7558 0.9575C10.8165 0.837327 10.9053 0.733622 11.0147 0.655255C11.1241 0.576888 11.2509 0.526191 11.3842 0.5075L11.4858 0.5ZM6.50001 6.33333C6.10173 6.33332 5.71661 6.47593 5.4144 6.73534C5.11218 6.99475 4.91285 7.35381 4.85251 7.7475L4.83751 7.87583L4.83335 8L4.83751 8.125C4.86184 8.44837 4.97997 8.75763 5.17743 9.01486C5.3749 9.2721 5.64311 9.46614 5.94922 9.57321C6.25532 9.68027 6.58601 9.69572 6.90076 9.61764C7.2155 9.53957 7.50064 9.37136 7.72121 9.13365C7.94179 8.89594 8.08823 8.59904 8.14258 8.27934C8.19693 7.95964 8.15683 7.63102 8.0272 7.33377C7.89757 7.03652 7.68404 6.78354 7.41278 6.60584C7.14151 6.42814 6.8243 6.33344 6.50001 6.33333ZM11.5 6.33333C11.1017 6.33332 10.7166 6.47593 10.4144 6.73534C10.1122 6.99475 9.91285 7.35381 9.85251 7.7475L9.83751 7.87583L9.83335 8L9.83751 8.125C9.86184 8.44837 9.97997 8.75763 10.1774 9.01486C10.3749 9.2721 10.6431 9.46614 10.9492 9.57321C11.2553 9.68027 11.586 9.69572 11.9008 9.61764C12.2155 9.53957 12.5006 9.37136 12.7212 9.13365C12.9418 8.89594 13.0882 8.59904 13.1426 8.27934C13.1969 7.95964 13.1568 7.63102 13.0272 7.33377C12.8976 7.03652 12.684 6.78354 12.4128 6.60584C12.1415 6.42814 11.8243 6.33344 11.5 6.33333Z" fill="currentColor"/></svg>
                Join Our Discord
              </a>
            </li>
            <li class="d-none nav-item">
              <a href="#" class="nav-link main px-0 py-3 mx-2 notifications d-flex align-items-center">
                <div class="d-lg-none">Notifications</div>
                <div class="num">2</div>
                <svg class="d-none d-lg-block" width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M12.857 15.082C14.7202 14.8614 16.5509 14.4217 18.311 13.772C16.8204 12.1208 15.9967 9.9745 16 7.75V7.05V7C16 5.4087 15.3678 3.88258 14.2426 2.75736C13.1174 1.63214 11.5913 1 9.99999 1C8.40869 1 6.88257 1.63214 5.75735 2.75736C4.63213 3.88258 3.99999 5.4087 3.99999 7V7.75C4.00301 9.97463 3.17898 12.121 1.68799 13.772C3.42099 14.412 5.24799 14.857 7.14299 15.082M12.857 15.082C10.959 15.3071 9.041 15.3071 7.14299 15.082M12.857 15.082C13.0011 15.5319 13.0369 16.0094 12.9616 16.4757C12.8862 16.942 12.7018 17.384 12.4234 17.7656C12.1449 18.1472 11.7803 18.4576 11.3592 18.6716C10.9381 18.8856 10.4724 18.9972 9.99999 18.9972C9.52761 18.9972 9.06191 18.8856 8.6408 18.6716C8.21968 18.4576 7.85506 18.1472 7.57661 17.7656C7.29816 17.384 7.11375 16.942 7.0384 16.4757C6.96305 16.0094 6.99889 15.5319 7.14299 15.082" stroke="#6B7280" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></svg>
              </a>
            </li>
            <li class="nav-item d-flex align-items-center">
              <UserOptions />
            </li>
          </ul>
        </div>
      </div>
    </nav>
  </div>
</template>

<script>
import { Collapse } from 'bootstrap';
import UserOptions from '@/components/navigation/user-options';

export default {
  name: 'NavBar',
  props: {
    showLogo: {
      default: false
    },
    collapsed: {
      default: false,
    }
  },
  components: {
    UserOptions
  },
  data() {
    return {
      theme: localStorage.getItem('theme'),
      discordLink: 'https://discord.gg/naK2g2xRTK'
    }
  },
  computed: {
    navbarCollapse() {
      return new Collapse(this.$refs.navbarScroll, { toggle: false });
    },
    logo() {
      return require(`@/assets/images/logo.svg`);
    }
  },
  mounted(){
    this.$store.dispatch('getCurrentPlan');
    this.$store.dispatch('getMonthlyTokens');
  },
  methods:{
    toggleTheme() {
      this.theme = this.theme == 'theme-white' ? 'theme-black' : 'theme-white';
      this.$root.$children[0].selectTheme(this.theme);
    },
    collapse() {
      this.navbarCollapse.hide();
    }
  }
}
</script>

<style scoped lang="scss">
.menu-btn {
  position: fixed;
  top: 17px;
  left: 13px;
  z-index: 1000;
}
.navbar {
  z-index: 2;
  background: var(--bs-body-bg);
  border-bottom: 1px solid #F3F4F6;
  transition: margin-left .3s;
  .logo {
    width: 272px;
  }
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
    &.main {
      height: 60px;
      &:hover {
        background: inherit !important;
      }
    }
    &.router-link-exact-active,
    &.router-link-active {
      color: var(--bs-bg-color) !important;
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
}
</style>