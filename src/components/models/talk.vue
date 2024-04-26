<template>
  <div>
    <div v-if="!selectedAssistant" class="d-flex align-items-center justify-content-center mt-5">
      <div class="spinner-border"></div>
    </div>
    <div v-else class="d-flex flex-column align-items-center">
      <div class="thumb overflow-hidden">
        <img :src="selectedAssistant.thumb || assistantThumbPlaceholder" class="w-100 h-100" />
      </div>
      <div class="h5 fw-bold mt-3">{{ selectedAssistant.name }}</div>
    </div>
  </div>
</template>

<script>

export default {
  name: 'TalkComponent',
  components: {
  },
  data() {
    return {
      loading: false
    }
  },
  computed: {
    selectedAssistant() {
      return this.$store.state.selectedAssistant;
    },
    assistants() {
      return this.$store.state.assistants || [];
    },
    assistantThumbPlaceholder() {
      return require('@/assets/images/assistant-thumb-xl.png');
    },
  },
  async mounted() {
  },
  methods: {
    
  }
}
</script>

<style scoped lang="scss">
  .thumb {
    border-radius: 50%;
    width: 268px;
    height: 268px;
    img {
      object-fit: cover;
    }
  }
</style>
