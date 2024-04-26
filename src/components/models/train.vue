<template>
  <div>
    <div v-if="loading" class="d-flex align-items-center justify-content-center mt-5">
      <div class="spinner-border"></div>
    </div>
    <template v-else>
      <TrainSingle v-if="assistant" @onBack="deselectAssistant" :key="assistant.id" @updated="modelUpdated" />
    </template>
  </div>
</template>

<script>
import TrainSingle from '@/components/models/train-single';
import ModelsService from '@/api-services/models.service';
import { EventBus } from '@/main';

export default {
  name: 'TrainComponent',
  components: {
    TrainSingle
  },
  data() {
    return {
      loading: false
    }
  },
  computed: {
    assistant() {
      return this.$store.state.selectedAssistant;
    },
    assistants() {
      return this.$store.state.assistants || [];
    }
  },
  async mounted() {
    this.getStorageValue();
    EventBus.$on('selectAssistant', model => this.selectAssistant(model));
    window.addEventListener('editingModel', this.getStorageValue);
  },
  methods: {
    selectAssistant(model) {
      this.assistant = null;
      setTimeout(() => {
        this.assistant = model;
        localStorage.setItem('editingModel', model.id);
      }, 10);
    },
    deselectAssistant() {
      this.assistant = null;
    },
    async getStorageValue() {
      if(localStorage.getItem('editingModel')) {
      this.loading = true;
      await ModelsService.getModel({ model_id: localStorage.getItem('editingModel')}).then(e => {
        if(e.success === 1) {
          this.selectAssistant(e.model)
        }
      });
      this.loading = false;
      }
    },
    async modelUpdated(model) {
      this.assistant = model;
      await this.$store.dispatch('getAssistants');
    }
  }
}
</script>

<style scoped lang="scss">
</style>
