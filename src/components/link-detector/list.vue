<template>
  <div class="links position-absolute align-self-start overflow-auto w-100" v-if="links && links.length">
    <div class="position-absolute d-flex align-items-end">
      <Link ref="link" v-for="(link, i) in links" :key="i" :link="link" :compact="true" @onDelete="onDelete" />
    </div>
  </div>
</template>

<script>
import Link from '@/components/link-detector/link'

export default {
  name: 'LinkList',
  props: {
    links: {
      default: () => []
    }
  },
  components: {
    Link
  },
  data() {
    return {
      animating: false
    }
  },
  methods: {
    newLink() {
      this.$toast('New link found!');
    },
    onDelete(link) {
      this.$emit('onDelete', link);
    }
  },
  watch: {
    links(o, n) {
      if(o && o.length) {
        if(o && n) {
          if(o.length > n.length) {
            this.newLink();
          }
        } else {
          this.newLink();
        }
      }
    }
  }
}
</script>

<style lang="scss" scoped>
  .links {
    top: -100px;
    height: 120px;
    display: flex;
    flex-direction: column;
    justify-content: flex-end;
    padding-bottom: 10px;
    z-index: 10;
  }
  .thumb {
    width: 100%;
    height: 50px;
  }
  .animating {
    animation: slideUp .5s;
  }
  @keyframes slideUp {
    0% { transform: translateY(50px); opacity: 0; }
    100% { transform: translateY(0); opacity: 1; }
  }
</style>