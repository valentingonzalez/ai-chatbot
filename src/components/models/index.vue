<template>
  <div>
    <div v-if="loading" class="d-flex align-items-center justify-content-center mt-5">
      <div class="spinner-border"></div>
    </div>
    <template v-else>
      <ModelSingle v-if="selectedModel" @onBack="deselectModel" :model="selectedModel" :key="selectedModel.id" @updated="modelUpdated" />
      <ModelList :showDetails="true" v-else />
    </template>
  </div>
</template>

<script>
import ModelList from '@/components/models/model-list';
import ModelSingle from '@/components/models/model-single';
import ModelsService from '@/api-services/models.service';

export default {
  name: 'ModelsComponent',
  components: {
    ModelList,
    ModelSingle
  },
  data() {
    return {
      selectedModel: null,
      loading: false
    }
  },
  async mounted() {
    this.getStorageValue();
    window.addEventListener('editingModel', this.getStorageValue);
  },
  methods: {
    deselectModel() {
      this.selectedModel = null;
    },
    async getStorageValue() {
      if(localStorage.getItem('editingModel')) {
      this.loading = true;
      await ModelsService.getModel({ model_id: localStorage.getItem('editingModel')}).then(e => {
        if(e.success === 1) {
          this.selectModel(e.model)
        }
      });
      this.loading = false;
      }
    },
    async modelUpdated(model) {
      this.selectedModel = model;
      await this.$store.dispatch('getAssistants');
    }
  }
}
</script>

<style scoped lang="scss">
</style>
