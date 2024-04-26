<template>
  <div class="card p-3 fs-7">
    <div class="d-flex justify-content-between align-items-center">
      <a href="#" @click.prevent="selectModel" class="fw-bold fs-6">{{ model.name }}</a>
      <div class="dropdown ms-2">
        <button type="button" id="options" data-bs-toggle="dropdown" aria-expanded="false">
          <svg width="14" height="3" viewBox="0 0 14 3" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M6.99996 2.83332C7.73634 2.83332 8.33329 2.23637 8.33329 1.49999C8.33329 0.76361 7.73634 0.166656 6.99996 0.166656C6.26358 0.166656 5.66663 0.76361 5.66663 1.49999C5.66663 2.23637 6.26358 2.83332 6.99996 2.83332Z" fill="#64748B"/><path d="M1.99996 2.83332C2.73634 2.83332 3.33329 2.23637 3.33329 1.49999C3.33329 0.76361 2.73634 0.166656 1.99996 0.166656C1.26358 0.166656 0.666626 0.76361 0.666626 1.49999C0.666626 2.23637 1.26358 2.83332 1.99996 2.83332Z" fill="#64748B"/><path d="M12 2.83332C12.7363 2.83332 13.3333 2.23637 13.3333 1.49999C13.3333 0.76361 12.7363 0.166656 12 0.166656C11.2636 0.166656 10.6666 0.76361 10.6666 1.49999C10.6666 2.23637 11.2636 2.83332 12 2.83332Z" fill="#64748B"/></svg>
        </button>
        <ul class="dropdown-menu fs-7" aria-labelledby="options" role="menu">
          <li>
            <a class="dropdown-item" href="#" @click="deleteModel">Delete</a>
          </li>
        </ul>
      </div>
    </div>
    <div class="mt-1 pe-4 fs-7 fw-light" v-if="showDetails && model.description">
      {{ model.description }}
    </div>
    <div class="d-flex justify-content-between align-items-center mt-2">
      <div class="text-muted smaller">
        <span v-if="model.instruction_count">
          {{ model.instruction_count }} Instruction<span v-if="model.instruction_count > 1">s</span>
        </span>
        <span v-if="model.file_count">
          <span v-if="model.instruction_count">•</span>
          {{ model.file_count }} File<span v-if="model.file_count > 1">s</span>
        </span>
        <span v-if="model.embeddings_count">
          <span class="ms-1" v-if="model.instruction_count || model.file_count">•</span>
          {{ model.embeddings_count }} Embedding<span v-if="model.embeddings_count > 1">s</span>
        </span>
      </div>
      <div v-if="!model.completed" class="badge bg-warning small fw-normal px-2 py-1">
        Training
      </div>
      <div v-else class="badge bg-success small fw-normal px-2 py-1">
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
    },
    showDetails: {
      default: false
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
      this.$emit('onDelete', this.model);
    }
  }
}
</script>

<style scoped lang="scss">
</style>