<template>
  <footer class="d-flex justify-content-between px-4 py-3 border-top">
    <router-link :to="`/wizard/${prevStep}`" class="btn btn-outline-secondary fw-bold px-4" :class="{ 'disabled': loading }" @click="setTimeout(() => $parent.skippable = skippable, 100)">
      <svg class="me-2" width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" clip-rule="evenodd" d="M12.7071 14.7071C13.0976 14.3166 13.0976 13.6834 12.7071 13.2929L9.41421 10L12.7071 6.70711C13.0976 6.31658 13.0976 5.68342 12.7071 5.29289C12.3166 4.90237 11.6834 4.90237 11.2929 5.29289L7.29289 9.29289C6.90237 9.68342 6.90237 10.3166 7.29289 10.7071L11.2929 14.7071C11.6834 15.0976 12.3166 15.0976 12.7071 14.7071Z" fill="#6B7280"/></svg>
      Back
    </router-link>
    <div class="d-flex align-items-center">
      <a @click.prevent="$emit('skip', nextStep)" v-if="$route.meta.skippable" class="me-4 fw-bold" href="#">Skip</a>
      <a href="#" class="btn btn-primary fw-bold px-4" @click.prevent="$emit('next', nextStep)" :class="{ 'disabled': loading }">
        <div v-if="loading" class="spinner-border spinner-border-sm me-2"></div>
        {{ !lastPage ? 'Next' : 'Finish' }}
        <svg class="ms-2" width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" clip-rule="evenodd" d="M7.29289 14.7071C6.90237 14.3166 6.90237 13.6834 7.29289 13.2929L10.5858 10L7.29289 6.70711C6.90237 6.31658 6.90237 5.68342 7.29289 5.29289C7.68342 4.90237 8.31658 4.90237 8.70711 5.29289L12.7071 9.29289C13.0976 9.68342 13.0976 10.3166 12.7071 10.7071L8.70711 14.7071C8.31658 15.0976 7.68342 15.0976 7.29289 14.7071Z" fill="white"/></svg>
      </a>
    </div>
  </footer>
</template>

<script>
export default {
  name: 'WizardFooter',
  props: {
    crumbs: {
      type: Array,
      default: () => []
    },
    skippable: {
      type: Boolean,
      default: false
    },
    loading: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
    }
  },
  computed: {
    breadCrumbs() {
      return this.crumbs.map(e => e.name);
    },
    lastPage() {
      return this.breadCrumbs.length - 1 == this.breadCrumbs.indexOf(this.actualStep)
    },
    actualStep() {
      return this.$route.path.split('/').pop();
    },
    nextStep() {
      return !this.lastPage ? `/wizard/${this.breadCrumbs[this.breadCrumbs.indexOf(this.actualStep) + 1]}` : '/pricing';
    },
    prevStep() {
      return this.breadCrumbs[this.breadCrumbs.indexOf(this.actualStep) - 1];
    }
  },
  methods: {
  }
}
</script>

<style scoped lang="scss">
  footer {
    background: var(--bs-navbar-bg);
    @media(max-width: 767px) {
      position: fixed;
      width: 100%;
      left: 0;
      bottom: 0;
    }
  }
</style>