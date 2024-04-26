<template>
  <div class="model-single fs-7" v-if="assistant">
    <div class="position-relative flex-grow-1 mb-3">
      <div class="d-flex justify-content-between align-items-center">
        <h6 class="text-secondary mb-0">{{ assistant.name }}</h6>
        <a href="#" class="d-flex align-items-center" @click.prevent="onEdit">
          <svg width="15" height="15" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M1.33325 13.6667H4.66659L13.4166 4.91666C13.8586 4.47464 14.1069 3.87512 14.1069 3.25C14.1069 2.62488 13.8586 2.02536 13.4166 1.58333C12.9746 1.1413 12.375 0.892975 11.7499 0.892975C11.1248 0.892975 10.5253 1.1413 10.0833 1.58333L1.33325 10.3333V13.6667Z" stroke="#8390A2" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/><path d="M9.25 2.41667L12.5833 5.75001" stroke="#8390A2" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></svg>          
        </a>
      </div>
      <div class="mt-1">
        <div class="smaller text-muted" v-if="assistant.description">
          {{ assistant.description }}
        </div>
        <div v-if="assistant.tones || assistant.tone" class="badge fw-normal rounded bg-info d-inline-flex align-items-center my-2">
          <div >{{ assistant.tones || assistant.tone }}</div>
        </div>

        <div v-if="assistant.response_length" class="ms-2 badge fw-normal rounded bg-info d-inline-flex align-items-center my-2">
          <div class="text-capitalize">{{ assistant.response_length }}</div>
        </div>
      </div>
    </div>
    <WidgetInstructions ref="instructions" :isOpen="!collapsed.instructions" class="mb-3" :assistant="assistant" />
    <WidgetFiles ref="files" :isOpen="!collapsed.files" class="mb-3" :model="assistant" />
    <WidgetSettings :modelId="assistant.id"  />
    <EditModel :modelId="editing" ref="editModel" />
  </div>
</template>
  

<script>
import WidgetInstructions from '@/components/models/widgets/instructions';
import WidgetSettings from '@/components/models/widgets/settings';
import WidgetFiles from '@/components/models/widgets/files';
import EditModel from '@/components/models/edit-model';
import ModelService from '@/api-services/models.service';

export default {
  name: 'TrainSingle',
  props: {

  },
  components: {
    WidgetInstructions,
    WidgetSettings,
    WidgetFiles,
    EditModel
  },
  data() {
    return {
      files: [],
      showInfo: false,
      collapsed: {},
      isMobile: false,
      editing: '',
      updating: false,
      modelDesc: ''
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
  mounted() {
    this.collapsed = JSON.parse(localStorage.getItem('collapsedSettings')) ?? {}
    this.isMobile = window.innerWidth < 700;
    this.$store.dispatch('selectedModel', this.assistant);
  },
  methods: {
    onEdit() {
      this.editing = this.assistant.id;
      this.$root.$children[0].editModel(this.editing);
    },
    toggleInfo() {
      this.showInfo = !this.showInfo;
    },
    onBack() {
      this.$emit('onBack');
    },
    update() {
      this.$logActivity({action: 'click', page: this.$route.name, type: 'updateName', ref_id: this.assistant.id});
      this.updating = true;
      ModelService.updateModel({ model_id: this.assistant.id, name: this.editing }).then(() => {
        this.updating = false;
        this.editing = false;
        this.$emit('updated', this.assistant);
      });
    }
  },
  beforeDestroy() {
    localStorage.removeItem('editingModel');
  },
}
</script>

<style scoped lang="scss">
  .tone {
    max-width: 160px;
  }
</style>