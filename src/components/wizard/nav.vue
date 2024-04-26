<template>
  <nav class="navbar py-0 navbar-expand-lg border-top bg-base">
    <div class="container-lg container-wizard align-items-center">
      <router-link to="/" class="navbar-brand text-primary">
      </router-link>
      <div class="breadcrumbs d-flex">
        <div class="bc d-flex align-items-center" v-for="(b, i) in crumbs.map(e => e.name)" :key="`bc-${i}`" :class="{ 'active' : b == actualStep }">
          <div class="label">
            Step
          </div>
          <div class="square fw-bold smaller d-flex align-items-center justify-content-center" >
            {{ i + 1 }}
          </div>
        </div>
      </div>
      <div class="d-flex d-lg-none align-items-center justify-content-center mb-1 mt-1">
        <button class="text-primary text-uppercase fw-bold" type="button" data-bs-toggle="collapse" data-bs-target="#navbarScroll" aria-controls="navbarScroll" aria-expanded="false" aria-label="Toggle navigation">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g clip-path="url(#clip0_50_333)"><path d="M4 6H20" stroke="#4B5563" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/><path d="M4 12H20" stroke="#4B5563" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/><path d="M4 18H20" stroke="#4B5563" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></g><defs><clipPath id="clip0_50_333"><rect width="24" height="24" fill="white"/></clipPath></defs></svg>
        </button>
      </div>
      <div class="collapse navbar-collapse flex-grow-0" id="navbarScroll">
        <ul class="navbar-nav navbar-nav-scroll">
          <UserOptions />
        </ul>
      </div>
    </div>
  </nav>
</template>

<script>
import AuthService from '@/api-services/auth.service';
import config from '@/api-services/_config';
import UserOptions from '@/components/navigation/user-options'

export default {
  name: 'WizardNav',
  props: {
    crumbs: {
      type: Array,
      default: () => []
    },
  },
  components: {
    UserOptions
  },
  data() {
    return {

    }
  },
  computed: {
    actualStep() {
      return this.$route.path.split('/').pop();
    }
  },
  methods: {
    async logout() {
      let res = await AuthService.logout();
      if(res.success) {
        document.cookie = "ezai_auth_session_cookie=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
        window.location = config.urlAuth;
      }
    }
  },
}
</script>

<style scoped lang="scss">
.navbar {
  z-index: 1;
  background: var(--bs-body-bg);
  border-bottom: 1px solid #F3F4F6;
  margin-bottom: -1px;
  .navbar-nav {
    --bs-navbar-height: 100vh !important;
  }
  .nav-link {
    color: #6B7280 !important;
    height: 60px;
    &.router-link-exact-active {
      color: var(--bs-secondary) !important;
      border-bottom: 3px solid var(--bs-secondary) !important;
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
  .breadcrumbs {
    .bc {
      margin: 0 8px;
      position: relative;
      &:first-child {
        .label {
          &::before {
            display: none !important;
          }
        }
      }
      &:last-child {
        &::after {
          display: none !important;
        }
      }
      .square {
        color: #4B5563;
        background: #D1D5DB;
        border-radius: 4px;
        width: 32px;
        height: 32px;
      }
      .label {
        width: 0;
        overflow: hidden;
        font-size: 16px;
        font-weight: bold;
        position: relative;
        transition: all .3s;
        &::before {
          content: '';
          background: #E5E7EB;
          width: 1px;
          height: 13px;
          left: 0;
          top: 6px;
          position: absolute;
          display: none;
        }
      }
      &.active {
        padding-right: 16px;
        .label {
          width: 54px;
          padding-left: 14px;
          &::before {
            display: block;
          }
        }
        .square {
          background: #111827;
          color: #fff;
        }
        &::after {
          content: '';
          background: var(--bs-body-bg);
          width: 1px;
          height: 13px;
          right: 0;
          top: 10px;
          position: absolute;
        }
      }
    }
  }
  @media (max-width: 767px) {
    .navbar-brand {
      svg {
        width: 80px;
      }
    }
    .breadcrumbs {
      .bc {
        margin: 0 2px;
        .square {
          width: 17px;
          height: 17px;
          border-radius: 2px;
        }
        .label {
          display: none;
        }
        &.active {
          padding-right: 0;
          &::after {
            display: none;
          }
        }
      }
    }
  }
}
</style>