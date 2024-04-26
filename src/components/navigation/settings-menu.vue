<template>
  <div class="menu" :class="{ 'visible': visible }">
    <div class="sidebar d-flex flex-column">
      <div class="px-3">
        <div class="int-header bg-transparent d-md-none">
          <img class="logo d-collapsed-none ms-2" :src="logo" />
          <button type="button" class="right-bt d-lg-none" @click="visible = false">
            <svg width="26" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" /></svg>
          </button>
        </div>
      </div>
      <h4 class="ms-4 fw-bold mt-4">Settings</h4>
      <ul class="nav flex-column">
        <li class="nav-item">
          <router-link to="/user/settings/account" class="nav-link py-3 d-flex align-items-center ps-4" @click.native="visible = false">
            <div class="icon d-flex justify-content-center me-2">
              <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M15.9815 16.7247C15.2828 15.7996 14.3788 15.0493 13.3407 14.5331C12.3026 14.0168 11.1589 13.7487 9.99953 13.7497C8.84017 13.7487 7.69641 14.0168 6.65834 14.5331C5.62028 15.0493 4.71627 15.7996 4.01753 16.7247M15.9815 16.7247C17.345 15.5119 18.3066 13.9133 18.7407 12.1408C19.1748 10.3683 19.0598 8.50579 18.411 6.80018C17.7622 5.09457 16.6103 3.62648 15.1079 2.5906C13.6056 1.55472 11.8239 1 9.99903 1C8.17419 1 6.39246 1.55472 4.89013 2.5906C3.3878 3.62648 2.23585 5.09457 1.58706 6.80018C0.938265 8.50579 0.823276 10.3683 1.25734 12.1408C1.69141 13.9133 2.65403 15.5119 4.01753 16.7247M15.9815 16.7247C14.3355 18.1929 12.2052 19.0028 9.99953 18.9997C7.79355 19.0031 5.66376 18.1931 4.01753 16.7247M12.9995 7.74971C12.9995 8.54535 12.6835 9.30842 12.1208 9.87103C11.5582 10.4336 10.7952 10.7497 9.99953 10.7497C9.20388 10.7497 8.44081 10.4336 7.8782 9.87103C7.3156 9.30842 6.99953 8.54535 6.99953 7.74971C6.99953 6.95406 7.3156 6.19099 7.8782 5.62838C8.44081 5.06578 9.20388 4.74971 9.99953 4.74971C10.7952 4.74971 11.5582 5.06578 12.1208 5.62838C12.6835 6.19099 12.9995 6.95406 12.9995 7.74971Z" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></svg>
            </div>
            Account
          </router-link>
        </li><li class="nav-item">
          <router-link to="/user/settings/security" class="nav-link py-3 d-flex align-items-center ps-4" @click.native="visible = false">
            <div class="icon d-flex justify-content-center me-2">
              <svg width="22" height="22" viewBox="0 0 22 22" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M14.75 4.24971C15.5456 4.24971 16.3087 4.56578 16.8713 5.12839C17.4339 5.691 17.75 6.45406 17.75 7.24971M20.75 7.24971C20.7501 8.12483 20.5588 8.98938 20.1895 9.78274C19.8202 10.5761 19.2818 11.2791 18.6121 11.8424C17.9424 12.4057 17.1575 12.8156 16.3126 13.0436C15.4677 13.2715 14.5831 13.3118 13.721 13.1617C13.158 13.0647 12.562 13.1877 12.158 13.5917L9.5 16.2497H7.25V18.4997H5V20.7497H1.25V17.9317C1.25 17.3347 1.487 16.7617 1.909 16.3407L8.408 9.84171C8.812 9.43771 8.935 8.84171 8.838 8.27871C8.6962 7.45988 8.72604 6.62052 8.92563 5.81382C9.12522 5.00712 9.49021 4.25068 9.99748 3.59244C10.5047 2.9342 11.1432 2.38851 11.8724 1.98995C12.6016 1.5914 13.4057 1.34867 14.2336 1.27715C15.0616 1.20562 15.8953 1.30687 16.6821 1.57447C17.4688 1.84208 18.1914 2.27019 18.8041 2.8317C19.4167 3.3932 19.906 4.07584 20.241 4.83636C20.5759 5.59688 20.7493 6.41869 20.75 7.24971Z" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></svg>
            </div>
            Security
          </router-link>
        </li>
        <li class="nav-item">
          <router-link to="/user/settings/cards" class="nav-link py-3 d-flex align-items-center ps-4" @click.native="visible = false">
            <div class="icon d-flex justify-content-center me-2">
              <svg width="22" height="18" viewBox="0 0 22 18" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M1.25 5.25H20.75M1.25 6H20.75M4.25 11.25H10.25M4.25 13.5H7.25M3.5 16.5H18.5C19.0967 16.5 19.669 16.2629 20.091 15.841C20.5129 15.419 20.75 14.8467 20.75 14.25V3.75C20.75 3.15326 20.5129 2.58097 20.091 2.15901C19.669 1.73705 19.0967 1.5 18.5 1.5H3.5C2.90326 1.5 2.33097 1.73705 1.90901 2.15901C1.48705 2.58097 1.25 3.15326 1.25 3.75V14.25C1.25 14.8467 1.48705 15.419 1.90901 15.841C2.33097 16.2629 2.90326 16.5 3.5 16.5Z" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></svg>
            </div>
            Billing
          </router-link>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'SettingsMenu',
    data() {
      return {
        visible: false
      }
    },
    computed: {
      logo() {
        return require(`@/assets/images/logo.svg`);
      }
    },
    mounted() {
    },
    methods: {
      toggle() {
        this.visible = !this.visible;
      },
    }
  }
</script>

<style lang="scss" scoped>
  .menu {
    .sidebar {
      box-shadow: var(--shadow-right);
      background: var(--bs-base);
      min-height: 100%;
      height: calc(var(--vh, 1vh) * 100);
      position: relative;
      z-index: 10;
    }
    .nav {
      .nav-link {
        font-weight: bold;
        position: relative;
        color: #9CA3AF !important;
        .icon {
          width: 24px;
        }
        &.router-link-active {
          color: var(--bs-secondary) !important;
          background: var(--bs-selected);
        }
      }
    }
    :deep(.resizable-component) {
      height: 100% !important;
    }
  }
  @media (max-width: 991px) {
    .menu {
      position: fixed;
      z-index: 1000;
      top: 0;
      left: 0;
      height: calc(var(--vh, 1vh) * 100);
      left: 100vw;
      transition: left .2s;
      width: 100vw !important;
      max-width: 100vw !important;
      &.visible {
        left: 0;
      }
      .close-bt {
        position: absolute;
      }
    }
  }
</style>
