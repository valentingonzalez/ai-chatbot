<template>
  <div class="border-left p-4">
    <ModelList :showDetails="true" />
  </div>
</template>

<script>
import ModelList from '@/components/models/model-list';

export default {
  name: 'ModelsModule',
  components: {
    ModelList
  },
  data() {
    return {
    }
  },
}
</script>
