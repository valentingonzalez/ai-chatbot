<template>
  <router-view />
</template>

<script>
  export default {
    name:'userPage',
    data() {
      return {
        
      }
    }
  }
</script>

<style scoped lang="scss">
  :deep(.main) {
    min-height: calc(var(--vh, 1vh) * 100 - 60px);
  }
  :deep(.wrapper) {
    max-width: 700px;
  }
</style>