<template>
  <div class="model-single fs-7" v-if="model">
    <div>
      <div class="d-flex mb-2 pb-1 align-items-start">
        <a href="#" @click.prevent="onBack" class="pe-3">
          <svg width="8" height="14" viewBox="0 0 8 14" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M7 1.375L1.375 7L7 12.625" stroke="#8390A2" stroke-width="1.5" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round"/></svg>
        </a>
        <div class="position-relative flex-grow-1">
          <div class="d-flex justify-content-between mb-2 align-items-start">
            <div>
              <div class="text-muted smaller">ID: {{model.id}}</div>
              <h4 class="fw-bold mb-0">{{ updatedName }}</h4>
            </div>
            <div class="d-flex align-items-center">
              <span class="right-0 mx-2 cursor-pointer" @click="onEdit(model.id)">
                <svg width="15" height="15" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M1.33325 13.6667H4.66659L13.4166 4.91666C13.8586 4.47464 14.1069 3.87512 14.1069 3.25C14.1069 2.62488 13.8586 2.02536 13.4166 1.58333C12.9746 1.1413 12.375 0.892975 11.7499 0.892975C11.1248 0.892975 10.5253 1.1413 10.0833 1.58333L1.33325 10.3333V13.6667Z" stroke="#8390A2" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/><path d="M9.25 2.41667L12.5833 5.75001" stroke="#8390A2" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></svg>          
              </span>
              <button @click="selectModel" class="btn btn-xs fw-bold px-3 btn-outline-secondary" v-if="!editing && !editingDesc">
                Use
              </button>
            </div>
          </div>
          <div class="mt-1">
            <div v-if="model.description">
              {{ model.description }}
            </div>
            <div v-if="model.tones" class="badge tone smaller fw-normal text-capitalize rounded bg-info d-inline-flex align-items-center my-2">
              <div class="text-truncate">{{ model.tones }}</div>
            </div>
          </div>
          <div class="d-flex flex-column w-100" v-if="editingDesc">
            <div class="mb-1">
              <TextareaAutosize v-model="modelDesc" name="instruction" id="instruction" class="form-control fs-7" />
            </div>
            <div class="d-flex flex-row justify-content-between align-items-center mt-2">
              <div class="d-flex">
                <button class="btn btn-outline-primary px-4 fw-bold me-2 btn-sm" :disabled="updating" @click="editingDesc = false">
                  Cancel
                </button>
                <button class="btn btn-primary px-4 fw-bold btn-sm" @click="updateDesc" :disabled="updating || !modelDesc">
                  Update
                  <div v-if="updating" class="spinner-border spinner-border-sm ms-2"></div>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <WidgetInstructions ref="instructions" :isOpen="!collapsed.instructions" class="mb-3" :model="model" />
    <WidgetFiles ref="files" :isOpen="!collapsed.files" class="mb-3" :model="model" />
    <WidgetSettings :modelId="model.id"  />
    <EditModel :modelId="editing" ref="editModel" @onUpdate="onUpdate" />
  </div>
</template>
  

<script>
import WidgetInstructions from '@/components/models/widgets/instructions';
import WidgetSettings from '@/components/models/widgets/settings';
import WidgetFiles from '@/components/models/widgets/files';
import EditModel from '@/components/models/edit-model';
import ModelService from '@/api-services/models.service';
import { EventBus } from '@/main';


export default {
  name: 'ModelSingle',
  props: {
    model: {
      type: Object,
      default: null
    }
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
      updatedName: this.model.name,
      editingDesc: false,
      modelDesc: ''
    }
  },
  computed: {
  },
  mounted() {
    this.collapsed = JSON.parse(localStorage.getItem('collapsedSettings')) ?? {}
    this.isMobile = window.innerWidth < 700;
    this.$store.dispatch('selectedModel', this.model.id);
  },
  methods: {
    onUpdate(model) {
      this.editing = ''
      this.$emit('updated',model)
      this.updatedName = model.name
      this.$refs.instructions.getInstructions();
    },
    onEdit(id) {
      this.editing = id;
      this.$refs.editModel.show();
    },
    toggleInfo() {
      this.showInfo = !this.showInfo;
    },
    onBack() {
      this.$emit('onBack');
    },
    selectModel() {
      EventBus.$emit('useModel', this.model.id);
      if(this.isMobile) {
        EventBus.$emit('togglePanel');
      }
    },
    update() {
      this.$logActivity({action: 'click', page: this.$route.name, type: 'updateName', ref_id: this.model.id});

      this.updating = true;
      ModelService.updateModel({model_id: this.model.id, name: this.editing}).then(() => {
        this.updating = false;
        this.updatedName = this.editing;
        this.$emit('updated',this.model)
        this.editing = false;
      });
    },
    updateDesc() {
      this.$logActivity({action: 'click', page: this.$route.name, type: 'updateDescription', ref_id: this.model.id});

      this.updating = true;
      ModelService.updateModel({model_id: this.model.id, desc: this.modelDesc}).then(() => {
        this.updating = false;
        this.editingDesc = false;
        let temp = this.model;
        temp.description = this.modelDesc
        this.$emit('updated',temp)
        this.modelDesc = '';
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