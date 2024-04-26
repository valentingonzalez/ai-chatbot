<template>
  <transition>
    <div v-if="url" class="image-viewer" @click="url = null">
      <img class="mw-100 mh-100" :src="url" />
    </div>
  </transition>
</template>

<script>
export default {
  name: 'ImageViewer',
  data() {
    return {
      url: null
    }
  },
  methods: {
    show(url) {
      this.url = url;
    }
  }
}
</script>

<style scoped lang="scss">
  .image-viewer {
    width: 100%;
    height: 100%;
    background: rgba(0,0,0,.7);
    position: fixed;
    padding: 30px;
    left: 0;
    top: 0;
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 99999999;
  }
</style>