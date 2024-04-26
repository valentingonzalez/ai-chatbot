<template>
  <div class="dropdown user-dropdown">
    <a class="d-none main d-lg-flex nav-link px-0 py-3 mx-2 align-items-center fw-sbold" href="#" id="navbarScrollingDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false">
      <div class="text mx-2">{{ $store.state.member.user_name || "Member" }}</div>
      <svg width="12" height="8" viewBox="0 0 12 8" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M2.3837 1.20492L6 4.95273L9.6163 1.20492C9.94427 0.865026 10.4768 0.865026 10.8047 1.20492C11.1318 1.54381 11.1318 2.09255 10.8047 2.43144L6.59422 6.79508C6.59421 6.79509 6.5942 6.7951 6.59419 6.79511C6.26622 7.13497 5.73373 7.13496 5.40578 6.79508L1.19525 2.43144C0.86825 2.09255 0.86825 1.54381 1.19525 1.20492C1.52322 0.865026 2.05573 0.865026 2.3837 1.20492Z" fill="#6B7280" stroke="#6B7280" stroke-width="0.1" stroke-linecap="round" stroke-linejoin="round"/></svg>
    </a>
    <div class="user-dropdown-menu mx-2 mx-lg-0 dropdown-menu dropdown-menu-end p-lg-2" aria-labelledby="navbarScrollingDropdown">
      <div class="card p-lg-3 border-0">
        <div class="d-flex flex-column align-items-center gap-1">
          <div>
            <div class="thumb me-2">
              {{ $store.state.member.initials || "AI" }}
            </div>
          </div>
          <div class="d-flex flex-column align-items-center justify-content-between w-100">
            <div>
              <div class="text-center fw-bold">{{ $store.state.member.user_name || "Member" }}</div>
              <div v-if="$store.state.member.email" class="smaller text-x-muted text-center">{{ $store.state.member.email }}</div>
            </div>
          </div>
          <div class="mt-2 fw-bold small">
            {{ tokensUsed }} / {{ totalTokensPlan }} Tokens
          </div>
        </div>
      </div>
      <div class="mx-n2 mt-2">
        <router-link to="/whitelabel" class="nav-link d-flex align-items-center text small text-nowrap py-2 px-3" v-if="$store.state.showWhiteLabel">
          <!-- <div class="card" :style="{ width: '18rem', color:'white', fontWeight: 900, backgroundRepeat: 'round', backgroundImage: 'url(' + banner + ')' }">
            <div class="card-body">
              <h5 class="card-title">EZAI.io</h5>
              <p class="card-text text-wrap">Want Your Own AI Platform to Resell? Contact Us</p>
            </div>
          </div> -->
          <img :src="banner" >
        </router-link>
        <router-link to="/pricing" class="nav-link d-flex align-items-center text small text-nowrap py-2 px-3">
          <svg class="me-2" width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg"><g clip-path="url(#clip0_1847_24715)"><path d="M2.5 6.66675C2.5 6.00371 2.76339 5.36782 3.23223 4.89898C3.70107 4.43014 4.33696 4.16675 5 4.16675H15C15.663 4.16675 16.2989 4.43014 16.7678 4.89898C17.2366 5.36782 17.5 6.00371 17.5 6.66675V13.3334C17.5 13.9965 17.2366 14.6323 16.7678 15.1012C16.2989 15.57 15.663 15.8334 15 15.8334H5C4.33696 15.8334 3.70107 15.57 3.23223 15.1012C2.76339 14.6323 2.5 13.9965 2.5 13.3334V6.66675Z" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/><path d="M2.5 8.33325H17.5" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/><path d="M5.83325 12.5H5.84159" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/><path d="M9.16675 12.5H10.8334" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></g><defs><clipPath id="clip0_1847_24715"><rect width="20" height="20" fill="white"/></clipPath></defs></svg>
          Pricing
        </router-link>
        <a href="#" @click.prevent="$root.$children[0].$refs.preferencesModal.show()" class="nav-link d-flex align-items-center text small text-nowrap py-2 px-3">
          <svg class="me-2" width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg"><g clip-path="url(#clip0_1847_24728)"><path d="M10 4.99992C10 5.44195 10.1756 5.86587 10.4882 6.17843C10.8007 6.49099 11.2246 6.66659 11.6667 6.66659C12.1087 6.66659 12.5326 6.49099 12.8452 6.17843C13.1577 5.86587 13.3333 5.44195 13.3333 4.99992C13.3333 4.55789 13.1577 4.13397 12.8452 3.82141C12.5326 3.50885 12.1087 3.33325 11.6667 3.33325C11.2246 3.33325 10.8007 3.50885 10.4882 3.82141C10.1756 4.13397 10 4.55789 10 4.99992Z" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/><path d="M3.33325 5H9.99992" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/><path d="M13.3333 5H16.6666" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/><path d="M5 9.99992C5 10.4419 5.17559 10.8659 5.48816 11.1784C5.80072 11.491 6.22464 11.6666 6.66667 11.6666C7.10869 11.6666 7.53262 11.491 7.84518 11.1784C8.15774 10.8659 8.33333 10.4419 8.33333 9.99992C8.33333 9.55789 8.15774 9.13397 7.84518 8.82141C7.53262 8.50885 7.10869 8.33325 6.66667 8.33325C6.22464 8.33325 5.80072 8.50885 5.48816 8.82141C5.17559 9.13397 5 9.55789 5 9.99992Z" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/><path d="M3.33325 10H4.99992" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/><path d="M8.33325 10H16.6666" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/><path d="M12.5 14.9999C12.5 15.4419 12.6756 15.8659 12.9882 16.1784C13.3007 16.491 13.7246 16.6666 14.1667 16.6666C14.6087 16.6666 15.0326 16.491 15.3452 16.1784C15.6577 15.8659 15.8333 15.4419 15.8333 14.9999C15.8333 14.5579 15.6577 14.134 15.3452 13.8214C15.0326 13.5088 14.6087 13.3333 14.1667 13.3333C13.7246 13.3333 13.3007 13.5088 12.9882 13.8214C12.6756 14.134 12.5 14.5579 12.5 14.9999Z" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/><path d="M3.33325 15H12.4999" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/><path d="M15.8333 15H16.6666" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></g><defs><clipPath id="clip0_1847_24728"><rect width="20" height="20" fill="white"/></clipPath></defs></svg>
          Preferences
        </a>
        <router-link to="/user/settings/account" class="nav-link d-flex align-items-center text small text-nowrap py-2 px-3">
          <svg width="20" class="me-2" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" d="M10.343 3.94c.09-.542.56-.94 1.11-.94h1.093c.55 0 1.02.398 1.11.94l.149.894c.07.424.384.764.78.93.398.164.855.142 1.205-.108l.737-.527a1.125 1.125 0 011.45.12l.773.774c.39.389.44 1.002.12 1.45l-.527.737c-.25.35-.272.806-.107 1.204.165.397.505.71.93.78l.893.15c.543.09.94.56.94 1.109v1.094c0 .55-.397 1.02-.94 1.11l-.893.149c-.425.07-.765.383-.93.78-.165.398-.143.854.107 1.204l.527.738c.32.447.269 1.06-.12 1.45l-.774.773a1.125 1.125 0 01-1.449.12l-.738-.527c-.35-.25-.806-.272-1.203-.107-.397.165-.71.505-.781.929l-.149.894c-.09.542-.56.94-1.11.94h-1.094c-.55 0-1.019-.398-1.11-.94l-.148-.894c-.071-.424-.384-.764-.781-.93-.398-.164-.854-.142-1.204.108l-.738.527c-.447.32-1.06.269-1.45-.12l-.773-.774a1.125 1.125 0 01-.12-1.45l.527-.737c.25-.35.273-.806.108-1.204-.165-.397-.505-.71-.93-.78l-.894-.15c-.542-.09-.94-.56-.94-1.109v-1.094c0-.55.398-1.02.94-1.11l.894-.149c.424-.07.765-.383.93-.78.165-.398.143-.854-.107-1.204l-.527-.738a1.125 1.125 0 01.12-1.45l.773-.773a1.125 1.125 0 011.45-.12l.737.527c.35.25.807.272 1.204.107.397-.165.71-.505.78-.929l.15-.894z" /><path stroke-linecap="round" stroke-linejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
          Settings
        </router-link>
        <a href="#" class="nav-link d-flex align-items-center justify-content-between text small text-nowrap py-2 px-3 dropdown">
          <div class="d-flex align-items-center">
            <svg class="me-2" width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg"><circle cx="10" cy="10" r="7" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/><path d="M14 10C14 12.2091 12.2091 14 10 14V6C12.2091 6 14 7.79086 14 10Z" fill="currentColor"/></svg>
            Theme
          </div>
          <svg width="6" height="10" viewBox="0 0 6 10" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M1 1L5 5L1 9" stroke="currentColor" stroke-width="1.3" stroke-linecap="round" stroke-linejoin="round"/></svg>
          <div class="submenu">
            <div class="card py-2 me-4">
              <a href="#" @click.prevent="selectTheme('theme-white')" class="nav-link d-flex align-items-center justify-content-between text small text-nowrap px-3 py-2">
                Light
                <svg v-if="theme == 'theme-white'" width="10" height="7" viewBox="0 0 10 7" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M1 3.66667L3.66667 6.33333L9 1" stroke="currentColor" stroke-width="1.3" stroke-linecap="round" stroke-linejoin="round"/></svg>
              </a>
              <a href="#" @click.prevent="selectTheme('theme-black')" class="nav-link d-flex align-items-center justify-content-between text small text-nowrap px-3 py-2">
                Dark
                <svg v-if="theme == 'theme-black'" width="10" height="7" viewBox="0 0 10 7" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M1 3.66667L3.66667 6.33333L9 1" stroke="currentColor" stroke-width="1.3" stroke-linecap="round" stroke-linejoin="round"/></svg>
              </a>
              <a href="#" @click.prevent="() => {}" class="nav-link d-flex align-items-center justify-content-between text small text-nowrap px-3 py-2">
                System Theme
                <div class="badge text-uppercase bg-secondary px-1 fw-bold ms-2" style="font-size: 9px;">
                  Soon
                </div>
                <svg v-if="theme == 'theme-system'" width="10" height="7" viewBox="0 0 10 7" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M1 3.66667L3.66667 6.33333L9 1" stroke="currentColor" stroke-width="1.3" stroke-linecap="round" stroke-linejoin="round"/></svg>
              </a>
            </div>
          </div>
        </a>
        <router-link to="/wizard" class="nav-link d-flex align-items-center text small text-nowrap py-2 px-3">
          <svg class="me-2" width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M2.91675 4.58333L4.16675 5.83333L6.25008 3.75M2.91675 9.58333L4.16675 10.8333L6.25008 8.75M2.91675 14.5833L4.16675 15.8333L6.25008 13.75M9.16675 5H16.6667M9.16675 10H16.6667M9.16675 15H16.6667" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></svg>
          Set-up Wizard
        </router-link>
        <a href="#" @click="logout" class="nav-link d-flex align-items-center text small text-nowrap py-2 px-3">
          <svg class="me-2" width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg"><g clip-path="url(#clip0_1847_24741)"><path d="M11.6667 6.66659V4.99992C11.6667 4.55789 11.4911 4.13397 11.1785 3.82141C10.866 3.50885 10.442 3.33325 10 3.33325H4.16667C3.72464 3.33325 3.30072 3.50885 2.98816 3.82141C2.67559 4.13397 2.5 4.55789 2.5 4.99992V14.9999C2.5 15.4419 2.67559 15.8659 2.98816 16.1784C3.30072 16.491 3.72464 16.6666 4.16667 16.6666H10C10.442 16.6666 10.866 16.491 11.1785 16.1784C11.4911 15.8659 11.6667 15.4419 11.6667 14.9999V13.3333" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/><path d="M7.5 10H17.5L15 7.5" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/><path d="M15 12.5L17.5 10" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></g><defs><clipPath id="clip0_1847_24741"><rect width="20" height="20" fill="white"/></clipPath></defs></svg>
          Log Out
        </a>
      </div>
    </div>
  </div>
</template>

<script>
  import config from '@/api-services/_config';
  import AuthService from '@/api-services/auth.service';

  export default {
    name: 'UserOptions',
    data() {
      return {
        theme: localStorage.getItem('theme'),
      }
    },
    computed: {
      tokensUsed() {
        return this.$store.state.tokensUsed;
      },
      totalTokensPlan(){
        switch (this.$store.state.currentPlan) {
          case 'free':
            return 90000;
          case 'starter':
            return 180000;
          case 'premium':
            return 465000;
          case 'enterprise':
            return '-';
          default: return '';
        }
      },
      banner() {
        return require('@/assets/images/banner-background.svg');
      }
    },
    methods: {
      selectTheme(theme) {
        this.theme = theme;
        this.$root.$children[0].selectTheme(theme);
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
    > .card {
      min-width: 236px;
    }
    .dropdown {
      .submenu {
        position: absolute;
        display: none;
        transform: translateX(-100%);
        top: 0;
      }
      &:hover {
        .submenu {
          display: block !important;
        }
      }
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
  .nav-link {
    &.main {
      height: 60px;
      &:hover {
        background: inherit !important;
      }
    }
  }
</style>