<template>
  <div class="card p-3 fs-7">
    <div class="d-flex justify-content-between align-items-center">
      <a href="#" @click.prevent="selectModel" class="mb-0"><h5>{{ model.name }}</h5></a>
      <div class="d-flex">
        <button class="text-primary ms-2" @click="deleteModel">
          <svg width="20" height="20" viewBox="0 0 20 20" fill="none" stroke-width="1.5" xmlns="http://www.w3.org/2000/svg"><g clip-path="url(#clip0_92_469)"><path d="M3.33325 5.83337H16.6666" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round"/><path d="M8.33325 9.16663V14.1666" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round"/><path d="M11.6667 9.16663V14.1666" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round"/><path d="M4.16675 5.83337L5.00008 15.8334C5.00008 16.2754 5.17568 16.6993 5.48824 17.0119C5.8008 17.3244 6.22472 17.5 6.66675 17.5H13.3334C13.7754 17.5 14.1994 17.3244 14.5119 17.0119C14.8245 16.6993 15.0001 16.2754 15.0001 15.8334L15.8334 5.83337" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round"/><path d="M7.5 5.83333V3.33333C7.5 3.11232 7.5878 2.90036 7.74408 2.74408C7.90036 2.5878 8.11232 2.5 8.33333 2.5H11.6667C11.8877 2.5 12.0996 2.5878 12.2559 2.74408C12.4122 2.90036 12.5 3.11232 12.5 3.33333V5.83333" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round"/></g><defs><clipPath id="clip0_92_469"><rect width="20" height="20" fill="white"/></clipPath></defs></svg>
        </button>
      </div>
    </div>
    <div v-if="model.description">
      <small class="text-muted">{{ model.description }}</small>
    </div>
    <div class="d-flex justify-content-between align-items-center mt-1">
      <div class="text-muted">
        <span v-if="model.instruction_count > 0">
          {{ model.instruction_count }} Instruction<span v-if="model.instruction_count > 1">s</span>
        </span>
        <span v-if="model.file_count > 0">
          <span v-if="model.instruction_count > 0"> •</span>
          {{ model.file_count }} File<span v-if="model.file_count > 1">s</span>
        </span>
        <span v-if="model.embeddings_count  > 0">
          <span class="ms-1" v-if="model.instruction_count > 0 || model.file_count > 0"> •</span>
        {{ model.embeddings_count }} Embedding<span v-if="model.embeddings_count > 1">s</span>
        </span>
        <span v-if="model.date_formatted">
          <span class="ms-1"> •</span>
        Date {{ model.date_formatted }}
        </span>
      </div>
      <div v-if="!model.completed" class="alert alert-warning small px-2 py-0 mb-0">
        Training
      </div>
      <div v-else class="alert alert-success small px-2 py-0 mb-0">
        <svg class="me-1" width="8" height="7" viewBox="0 0 8 7" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M1 3L3 5L7 1" stroke="#42B075" stroke-width="1.5" stroke-miterlimit="10" stroke-linecap="round"/></svg>
        Ready
      </div>
    </div>
  </div>
</template>
  

<script>

export default {
  name: 'ModelCard',
  props: {
    model: {
      type: Object,
      required: true
    }
  },
  data() {
    return {
    }
  },
  methods: {
    selectModel() {
      this.$emit('onSelect', this.model.id);
    },
    deleteModel() {
      this.$emit('onDelete', this.model.id);
    }
  }
}
</script>

<style scoped lang="scss">
</style>