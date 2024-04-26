<template>
	<div class="model-create" :class="{ 'sm': small }">
    <template v-if="step == 1">
      <div class="row mb-4">
        <div class="col-sm-6">
          <button @click="step = 2" type="button" class="card fw-medium fs-6 flex-row card-btn align-items-center justify-content-sm-center ps-3 ps-sm-0 w-100 mb-2 mb-sm-0" :class="{ 'flex-sm-column': !small, 'py-2': small }">
            <div class="d-flex bg-primary rounded-circle align-items-center justify-content-center me-3 me-sm-0" :class="{ 'mb-sm-3': !small, 'me-sm-2': small }">
              <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M1 9H17" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/><path d="M9 1V17" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>
            </div>
            Start from Scratch
          </button>
        </div>
        <div class="col-sm-6">
          <button type="button" @click="step = 3" class="card fw-medium fs-6 flex-row card-btn align-items-center justify-content-sm-center ps-3 ps-sm-0 w-100" :class="{ 'flex-sm-column': !small, 'py-2': small }">
            <div class="d-flex bg-light rounded-circle align-items-center justify-content-center me-3 me-sm-0" :class="{ 'mb-sm-3': !small, 'me-sm-2': small }">
              <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M5 7C5 6.46957 5.21071 5.96086 5.58579 5.58579C5.96086 5.21071 6.46957 5 7 5H15C15.5304 5 16.0391 5.21071 16.4142 5.58579C16.7893 5.96086 17 6.46957 17 7V15C17 15.5304 16.7893 16.0391 16.4142 16.4142C16.0391 16.7893 15.5304 17 15 17H7C6.46957 17 5.96086 16.7893 5.58579 16.4142C5.21071 16.0391 5 15.5304 5 15V7Z" stroke="white" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/><path d="M13 5V3C13 2.46957 12.7893 1.96086 12.4142 1.58579C12.0391 1.21071 11.5304 1 11 1H3C2.46957 1 1.96086 1.21071 1.58579 1.58579C1.21071 1.96086 1 2.46957 1 3V11C1 11.5304 1.21071 12.0391 1.58579 12.4142C1.96086 12.7893 2.46957 13 3 13H5" stroke="white" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></svg>
            </div>
            Copy From Existing
          </button>
        </div>
      </div>
      <div class="d-flex justify-content-between align-items-center mb-3">
        <h6 class="fw-sbold mb-0">Start From Preset</h6>
        <input v-model="searchPreset" type="search" class="smaller form-control form-control-sm fw-light" placeholder="Search Preset" style="max-width: 220px;" />
      </div>
      <div class="presets-wrapper">
        <div class="presets" :class="{ 'row gx-1': small }">
          <div :class="{ 'col-md-6': small }" v-for="(preset, i) in filteredPresets" :key="`preset-${i}`">
            <div class="card mb-2 cursor-pointer" @click="usePreset(preset)">
              <div class="card-body p-2">
                <div class="d-flex flex-column align-items-sm-center flex-sm-row justify-content-between">
                  <div class="d-flex align-items-center">
                    <div class="thumb me-3" :style="{ backgroundColor: preset.hexcolor}">
                      {{ preset.name.substr(0, 1) }}
                    </div>
                    <div>
                      <div>{{ preset.name }}</div>
                      <div class="description small fw-light text-muted">{{ preset.objective }}</div>
                    </div>
                  </div>
                  <div class="flex-grow-1 d-flex justify-content-end ms-3">
                    <div class="tone d-inline badge smaller text-truncate my-2 my-sm-0 fw-light text-capitalize rounded bg-info">{{ preset.tone }}</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </template>
    <template v-if="step == 3">
      <div class="form-control search d-flex p-1 ps-0 mb-3">
        <input  v-model="filterModel" type="search" class="bg-transparent border-0 flex-grow-1" placeholder="Search Assistant" />
        <ModelSort @onModelSort="selectSort" class="ms-2" />
      </div>
      <!--<div style="max-height: 600px; overflow: auto;">
        <div class="card mb-2 cursor-pointer" :class="{'border-primary': item.id == selected}" @click="select(item.id)" v-for="item in filteredModels" v-bind:key="item.id">
          <div class="card-body"> 
            <div class="d-flex justify-content-between">
              <h6>{{item.name}}</h6>
              <div class="flex-grow-1">
                <div v-if="item.tones" class="tone d-block badge text-truncate smaller mt-2 fw-normal text-capitalize rounded bg-info d-inline-flex align-items-center">
                  <div class="text-truncate">{{ item.tones }}</div>
                </div>
              </div>
            </div>
            <p class="description fs-7 text-muted" >{{ item.description }}</p>
          </div>
        </div>
      </div>-->

      <div class="presets-wrapper">
        <div class="presets" :class="{ 'row gx-1': small }">
          <div :class="{ 'col-md-6': small }" v-for="item in filteredModels" :key="`preset-${item.id}`">
            <div class="card mb-2 cursor-pointer" @click="select(item.id)" :class="{ 'border-primary': item.id == selected }">
              <div class="card-body p-2">
                <div class="d-flex flex-column align-items-sm-center flex-sm-row justify-content-between">
                  <div class="d-flex align-items-center">
                    <div class="thumb me-3" :style="{ backgroundColor: item.hexcolor}">
                      {{ item.name.substr(0, 1) }}
                    </div>
                    <div>
                      <div>{{ item.name }}</div>
                      <div class="description small fw-light text-muted">{{ item.objective || item.description }}</div>
                    </div>
                  </div>
                  <div class="flex-grow-1 d-flex justify-content-end ms-3" v-if="item.tone || item.tones">
                    <div class="tone d-inline badge smaller text-truncate my-2 my-sm-0 fw-light text-capitalize rounded bg-info">{{ item.tone || item.tones }}</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </template>
    <template v-if="step == 2">
      <form @submit.prevent="addNewModel" v-if="!gettingModel">
        <div class="form-group mb-3">
          <label class="mb-2">Assistant Name</label>
          <input x-webkit-speech required ref="input" :disabled="addingModel" v-model="newModel.title" type="text" class="form-control mb-1" placeholder="Assistant Name" />
        </div>
        <div class="form-group mb-3">
          <label class="mb-2">
            Objective/Summary
            <div class="small text-muted">
              Provide a brief objective/summary of what you want to accomplish with this assistant
            </div>
          </label>
          <TextareaAutosize v-model="newModel.objective" class="form-control" rows="2" />
          <!--
          <VueSimpleSuggest @focus="openObjectiveOnFocus" :filter-by-query="true"  :styles="{ defaultInput: 'form-control' }" ref="objectives" v-model="newModel.objective" :list="objectives" :display-attribute="'objective'">
            <template slot="misc-item-above">
              <div class="misc-item">
                <div class="text-muted">Our suggestions for you:</div>
              </div>
            </template>
          </VueSimpleSuggest>
        -->
        </div>
        <div class="form-group mb-3">
          <label class="mb-2">
            Tone
          </label>
          <VueSimpleSuggest ref="tones" @focus="openTonesOnFocus" v-model="newModel.tone" :list="tones" :filter-by-query="true" :display-attribute="'name'">
            <template slot="misc-item-above">
              <div class="misc-item">
                <div class="text-muted">Our suggestions for you:</div>
              </div>
            </template>
          </VueSimpleSuggest>
        </div>
        <div class="form-group mb-3">
          <label class="mb-2">
            Response Length
            <div class="small text-muted">
              How long do you want the responses from the AI to be
            </div>
          </label>
          <select class="form-control" v-model="newModel.response_length">
            <option v-bind:key="item.value" :value="item.value" v-for="item in responses" :selected="newModel.response_length == item.value">{{ item.text }}</option>
          </select>
        </div>
        <div class="form-group mb-3">
          <label class="mb-2">
            Instructions
            <div class="small text-muted">
              Provide clear and concise instructions to help guide the AI in answering and interacting with you
            </div>
          </label>
          <div class="d-flex mb-1" v-for="(ins, i) in newModel.instructions" :key="i">
            <TextareaAutosize ref="instructions" class="form-control" v-model="ins.text" rows="2" />
            <button tabindex="-1" type="button" class="p-2" @click="delInstructionInput(i)" v-if="newModel.instructions.length > 1">
              <svg width="10" height="10" viewBox="0 0 10 10" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M9 1L1 9" stroke="#8390A2" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/><path d="M1 1L9 9" stroke="#8390A2" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></svg>
            </button>
          </div> 
          <button type="button" class="btn btn-outline-secondary btn-sm px-3 rounded-3 fw-sbold " @click="addInstructionInput">
            <svg class="me-2" width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M0.75 9C0.75 10.0834 0.963392 11.1562 1.37799 12.1571C1.7926 13.1581 2.40029 14.0675 3.16637 14.8336C3.93245 15.5997 4.84193 16.2074 5.84286 16.622C6.8438 17.0366 7.91659 17.25 9 17.25C10.0834 17.25 11.1562 17.0366 12.1571 16.622C13.1581 16.2074 14.0675 15.5997 14.8336 14.8336C15.5997 14.0675 16.2074 13.1581 16.622 12.1571C17.0366 11.1562 17.25 10.0834 17.25 9C17.25 7.91659 17.0366 6.8438 16.622 5.84286C16.2074 4.84193 15.5997 3.93245 14.8336 3.16637C14.0675 2.40029 13.1581 1.7926 12.1571 1.37799C11.1562 0.963393 10.0834 0.75 9 0.75C7.91659 0.75 6.8438 0.963393 5.84286 1.37799C4.84193 1.7926 3.93245 2.40029 3.16637 3.16637C2.40029 3.93245 1.7926 4.84193 1.37799 5.84286C0.963392 6.8438 0.75 7.91659 0.75 9Z" fill="#DC2631"/><path d="M5 9H13" stroke="white" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/><path d="M9 5V13" stroke="white" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></svg>
            Add Instruction
          </button>
        </div>
        <div class="d-flex justify-content-end">
          <button type="submit" class="btn btn-secondary fs-6 rounded-3 px-4" :disabled="addingModel">
            <div v-if="addingModel" class="spinner-border spinner-border-sm me-2"></div>
            Add
          </button>
        </div>
      </form>
      <div v-else class="w-100 text-center">
        <div style="min-height: 400px;">
          <div class="spinner-border spinner-border-lg "></div>
        </div>
      </div>
    </template>
  </div>
</template>

<script>
  import ModelsService from '@/api-services/models.service';
  import VueSimpleSuggest from 'vue-simple-suggest';
  import 'vue-simple-suggest/dist/styles.css';
  // import FileModel from '@/components/cards/file-model';
  import ModelSort from '@/components/models/model-sort.vue'

  export default {
    name: 'ModelCreate',
    props: {
      small: {
        type: Boolean,
        default: false
      }
    },
    data() {
      return {
        searchPreset: '',
        filterModel: '',
        step: 1,
        tones: [],
        objectives: [],
        addingModel: false,
        newModel: {
          title: '',
          modelId: null,
          instructions: [{ text: '' }],
          isPrivate: 0,
          summary: '',
          tone: '',
          objective: '',
          files: [],
          hexcolor: '#000000',
          response_length: 'short',
        },
        copyModel: 0,
        presets: [],
        dataLoading: false,
        selected: '',
        gettingModel: false,
        selectedSort: '',
        responses: [
          {text: 'Super Short - 1 Sentence', value: 'super short'},
          {text: 'Short - A few Sentences', value: 'short'},
          {text: 'Medium - At least a paragraph', value: 'medium'},
          {text: 'Long - At least 2 Paragraphs', value: 'long'},
          {text: 'Very Long - At least 3 Paragraphs', value: 'very long'},
        ]
      };
    },
    components: {
      VueSimpleSuggest,
      ModelSort
    },
    computed: {
      models() {
        return this.$store.state.assistants;
      },
      filteredPresets() {
        return this.searchPreset ? this.presets.filter(e => {
          if(e.name.toLowerCase().includes(this.searchPreset.toLowerCase()) || e.objective.toLowerCase().includes(this.searchPreset.toLowerCase()) || e.tone.toLowerCase().includes(this.searchPreset.toLowerCase()))
            return e;
        }) : this.presets;
      },
      filteredModels() {
        if(!this.models) return [];
        return this.models.filter(e => e.name.toLowerCase().includes(this.filterModel.toLowerCase())).sort((a,b) => {
          if(this.selectedSort?.value == 'title') {
            return this.selectedSort.order == 'ASC' ? a.name.localeCompare(b.name) : b.name.localeCompare(a.name)
          } else if(this.selectedSort?.value == 'date') {
            return this.selectedSort.order == 'ASC' ? new Date(a.date_added) - new Date(b.date_added) : new Date(b.date_added) - new Date(a.date_added);
          }
        });
      }
    },
    mounted() {
      this.getData();
    },
    methods: {
      removeFile(id) {
        this.newModel.files = this.newModel.files.filter(e => e.id != id);
      },
      openObjectiveOnFocus() {
        this.$refs.objectives.listShown = true;
        let text = this.$refs.objectives.text;
        if(text)
          this.$refs.objectives.suggestions = this.objectives.filter(e => e.objective.includes(text));
        else
          this.$refs.objectives.suggestions = this.objectives;
      },
      openTonesOnFocus() {
        this.$refs.tones.listShown = true;
        let text = this.$refs.tones.text;
        if(text)
          this.$refs.tones.suggestions = this.tones.filter(e => e.name.includes(text));
        else
          this.$refs.tones.suggestions = this.tones
      },
      async getData() {
        this.dataLoading = true;
        let res = await ModelsService.getFormData();
        this.objectives = res.objectives;
        this.tones = res.tones;
        this.presets = res.presets;
        this.dataLoading = false;
      },
      async addNewModel() {
        this.addingModel = true;
        let assistant = await this.$store.dispatch('addAssistant', { ...this.newModel, instructions: this.newModel.instructions.map(e => e.text ).join('|-|-|'), files: JSON.stringify(this.newModel.files.map(e => e.id)) });
        this.addingModel = false;
        this.$emit('onAdd', assistant);
      },
      delInstructionInput(index) {
        this.newModel.instructions.splice(index, 1)
      }, 
      addInstructionInput() {
        this.newModel.instructions.push({ text: '' });
        setTimeout(() => {
          this.$refs.instructions[this.$refs.instructions.length - 1].$el.focus();
        }, 10);
      },
      removeTone(i) {
        this.activeTones.splice(i, 1)
      },
      addTone(tone) {
        this.activeTones.push(tone)
      },
      addObjective(text) {
        this.$set(this.newModel,'summary',this.newModel.summary + ' ' + text);
      },
      removeLastTone() {
        if(!this.tone)
          this.activeTones.pop();
      },
      usePreset(preset) {
        this.step = 2;
        setTimeout(() => {
          this.newModel.title = preset.name;
          this.newModel.objective = preset.objective;
          this.newModel.tone = preset.tone;
          this.newModel.hexcolor = preset.hexcolor;
        }, 10);
      },
      clearModel() {
        this.newModel = {
          title: '',
          modelId: null,
          instructions: [{ text: '' }],
          isPrivate: 0,
          summary: '',
          tone: '',
          objective: '',
          files: [],
          hexcolor: '#000000',
          response_length: 'short'
        };
      },
      async select(id) {
        this.step = 2;
        this.gettingModel = true;
        let res = await ModelsService.getModelDetail({model_id: id});
        this.gettingModel = false;
        if(res.model) {
          this.newModel =  {
            title: res.model.name,
            modelId: id,
            hexcolor: res.model.hexcolor,
            instructions: res.model.instructions.map(e => ({ text: e.instruction })),
            summary: res.model.description,
            tone: res.model.tones,
            objective: res.model.description,
            files: res.model.files
          }
        }  
      },
      selectSort(name) {
        this.selectedSort = name;
      },
    },
    watch: {
      step(val) {
        this.clearModel();
        this.$emit('onNavigate', val);
      }
    }
  };
</script>

<style scoped lang="scss">
  .presets-wrapper {
    position: relative;
    &::after {
      content: '';
      position: absolute;
      width: 100%;
      bottom: 0;
      height: 80px;
      pointer-events: none;
      background: linear-gradient(0deg, var(--bs-modal-bg) 0%, rgba(255,255,255,0) 100%);
    }
    .presets {
      max-height: 300px;
      overflow: auto;
      position: relative;
      .thumb {
        width: 40px;
        min-width: 40px;
        height: 40px;
        border-radius: 40px;
        text-transform: uppercase;
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 18px;
        color: #fff;
        font-weight: 700;
      }
      .description {
        overflow: hidden;
        display: -webkit-box;
        line-clamp: 2;
        -webkit-line-clamp: 2;
        -webkit-box-orient: vertical;
      }
    }
  }
  .tone {
    max-width: 200px;
  }
  .card-btn {
    height: 140px;
    .rounded-circle {
      height: 36px;
      width: 36px;
    }
  }

  .sm {
    .card-btn {
      height: auto;
      .rounded-circle {
        height: 30px;
        width: 30px;
      }
    }
  }

  @media (max-width: 575px) {
    .card-btn {
      height: 60px;
    }
  }
</style>