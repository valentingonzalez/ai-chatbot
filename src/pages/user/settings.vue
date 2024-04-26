<template>
  <div>
    <div class="settings-banner pt-3 py-md-0 ps-4 d-none">
      <h1 class="fw-bold m-0">Settings</h1>
    </div>
    <div class="w-100 h-100 bg-base overflow-auto">
      <router-view class="p-3 p-md-4 pb-md-4 mt-md-0" />
    </div>
  </div>
</template>

<script>
  export default {
    name:'userSettings',
    data() {
      return { 
      }
    }
  }
</script>

<style scoped lang="scss">
  .settings-banner {
    background: var(--bs-base);
    @media (min-width: 767px) {
      height: 70px;
      width: 100%;
      position: absolute;
      border-top: 1px solid var(--bs-border-color);
      border-bottom: 1px solid var(--bs-border-color);
      left: 0;
      z-index: 1000;
      display: flex;
      align-items: center;
    }
    @media (max-width: 767px) {
      h1 {
        font-size: 16px !important;
        margin-bottom: -10px !important;
        margin-top: 10px !important;
      }
    }
  }
</style>