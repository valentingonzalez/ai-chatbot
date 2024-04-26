<template>
  <div class="d-flex justify-content-center">
    <header>
      <!--<h1 class="fw-bold text-center mb-4">{{ title }}</h1>
      <div v-if="description" class="description h4 mb-4 text-muted text-center">{{ description }}</div>-->
    </header>
  </div>
</template>

<script>
export default {
  name: 'WizardHeader',
  props: {
    crumbs: {
      type: Array,
      default: () => []
    }
  },
  data() {
    return {}
  },
  computed: {
    title() {
      return this.$route.meta.title;
    },
    description() {
      return this.$route.meta.description;
    }
  }
}
</script>

<style scoped lang="scss">
  header {
    max-width: 560px;
    h1 {
      font-size: 36px;
    }
    .description {
      line-height: 30px;
    }
  }
</style>