<template>
	<div class="model-create mh-100" :class="{ 'sm': small }">
    <div class="row h-100">
      <div class="col-md-4 mh-100">
        <h6 class="fw-bold">Presets</h6>
        <div v-if="loadingPresets" class="d-flex justify-content-center mt-4">
          <div class="spinner-border"></div>
        </div>
        <div class="presets-wrapper h-100">
          <div class="presets h-100">
            <div v-for="(preset, i) in presets" :key="`preset-${i}`">
              <div class="card mb-2 cursor-pointer" @click="usePreset(preset)">
                <div class="card-body py-2">
                  <div class="d-flex flex-column align-items-start flex-sm-row justify-content-between">
                    <div class="mb-1">{{preset.name}}</div>
                    <div class="badge my-2 my-sm-0 fw-normal text-capitalize rounded bg-info">
                      <div class="smallest">{{preset.tone}}</div>
                    </div>
                  </div>
                  <div class="small text-muted">{{preset.objective}}</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="col-md-8 mh-100">
        <h6 class="fw-bold">Assistant Name</h6>
        <form @submit.prevent="add">
          <div class="form-group mb-3">
            <input required ref="input"  v-model="newModel.title" type="text" class="form-control mb-1" placeholder="Assistant Name" />
          </div>
          <div class="row gx-2">
            <div class="col-md-12 form-group mb-1">
              <label class="mb-2">
                Objective/Summary
                <div class="small text-muted">
                  Provide a brief objective/summary of what you want to accomplish with this assistant
                </div>
              </label>
              <TextareaAutosize v-model="newModel.objective" class="form-control" rows="2" />

            </div>
            <div class="form-group mb-3">
              <label class="mb-2">
                Tone
              </label>
              <VueSimpleSuggest ref="tones" v-model="newModel.tone" :list="tones" :filter-by-query="true" :display-attribute="'name'">
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
          </div>
          <div class="form-group mb-3">
            <label class="mb-2">
              Additional Instructions
            </label>
            <div class="d-flex" v-for="(ins, i) in newModel.instructions" :key="i">
              <input v-model="ins.text" type="text" class="form-control mb-1" placeholder="Instruction" />
              <button tabindex="-1" type="button" class="p-2" @click="delInstructionInput(i)" v-if="newModel.instructions.length > 1">
                <svg width="10" height="10" viewBox="0 0 10 10" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M9 1L1 9" stroke="#8390A2" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/><path d="M1 1L9 9" stroke="#8390A2" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></svg>
              </button>
            </div>
            <div class="d-flex justify-content-between mt-1">
              <div class="small text-muted">
                Provide clear and concise instructions to help guide the AI in answering and interacting with you
              </div>
              <button type="button" class="btn btn-outline-secondary btn-sm px-3 rounded-3 fw-sbold mt-1 text-nowrap ms-4" @click="addInstructionInput">
                <svg class="me-2" width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M0.75 9C0.75 10.0834 0.963392 11.1562 1.37799 12.1571C1.7926 13.1581 2.40029 14.0675 3.16637 14.8336C3.93245 15.5997 4.84193 16.2074 5.84286 16.622C6.8438 17.0366 7.91659 17.25 9 17.25C10.0834 17.25 11.1562 17.0366 12.1571 16.622C13.1581 16.2074 14.0675 15.5997 14.8336 14.8336C15.5997 14.0675 16.2074 13.1581 16.622 12.1571C17.0366 11.1562 17.25 10.0834 17.25 9C17.25 7.91659 17.0366 6.8438 16.622 5.84286C16.2074 4.84193 15.5997 3.93245 14.8336 3.16637C14.0675 2.40029 13.1581 1.7926 12.1571 1.37799C11.1562 0.963393 10.0834 0.75 9 0.75C7.91659 0.75 6.8438 0.963393 5.84286 1.37799C4.84193 1.7926 3.93245 2.40029 3.16637 3.16637C2.40029 3.93245 1.7926 4.84193 1.37799 5.84286C0.963392 6.8438 0.75 7.91659 0.75 9Z" fill="#DC2631"/><path d="M5 9H13" stroke="white" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/><path d="M9 5V13" stroke="white" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></svg>
                Add Instruction
              </button>
            </div>
          </div>
          <!--<div class="d-flex justify-content-end">
            <button type="submit" class="btn btn-secondary fs-6 rounded-3 px-4" :disabled="addingModel">
              <div v-if="addingModel" class="spinner-border spinner-border-sm me-2"></div>
              Add
            </button>
          </div>-->
        </form>
      </div>
    </div>
  </div>
</template>

<script>
  import InstructionsService from '@/api-services/instructions.service';
  import ModelsService from '@/api-services/models.service';
  import VueSimpleSuggest from 'vue-simple-suggest';
  import 'vue-simple-suggest/dist/styles.css';

  export default {
    name: 'ModelCreate',
    props: {
      small: {
        type: Boolean,
        default: false
      },
      model_id: {
        default: null,
      }
    },
    data() {
      return {
        loadingPresets: false,
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
          response_length: 'short'
        },
        copyModel: 0,
        presets: [],
        dataLoading: false,
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
      VueSimpleSuggest
    },
    computed: {
      models() {
        return this.$store.state.assistants;
      }
    },
    async mounted() {
      if(this.model_id){
        ModelsService.getModel({model_id:this.model_id})
        .then(res => {
          if(res.model){
            this.newModel.title = res.model.name;
            this.newModel.modelId = res.model.id;
            this.newModel.tone = res.model.tones;
            this.newModel.objective = res.model.description;
            InstructionsService.getInstructions({model_id:this.model_id}).then(res => {
              this.newModel.instructions = res.instructions?.map(ins => ({text:ins.instruction}));
            })
          }
        })
      }
      await this.getData();
    },
    methods: {
      async getData() {
        this.dataLoading = true;
        this.loadingPresets = true;
        let res = await ModelsService.getFormData();
        this.loadingPresets = false;
        this.objectives = res.objectives;
        this.tones = res.tones;
        this.presets = res.presets;
        this.dataLoading = false;
      },
      async add() {
        if(!this.model_id){
        this.addingModel = true;
        if(!this.newModel.title) {
          this.$swal('Error', 'Assistant Name is required!', 'error');
          this.addingModel = false;
          return;
        }
        let id = await this.$store.dispatch('addAssistant', { ...this.newModel, instructions: this.newModel.instructions.map(e => e.text ) });
        this.addingModel = false;
        this.$emit('onAdd', id);
        }else{
          this.addingModel = true;
          if(!this.newModel.title) {
            this.$swal('Error', 'Assistant Name is required!', 'error');
            this.addingModel = false;
            return;
          }
          let id = this.newModel.modelId;
          let data = {id,...this.newModel}
          await this.$store.dispatch('updateAssistant', data);
        }
        return {id:this.newModel.modelId,name: this.newModel.title};
      },
      delInstructionInput(index) {
        this.newModel.instructions.splice(index, 1)
      }, 
      addInstructionInput() {
        this.newModel.instructions.push({ text: '' })
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
      openTonesOnFocus() {
        this.$refs.tones.listShown = true;
        let text = this.$refs.tones.text;
        if(text)
          this.$refs.tones.suggestions = this.tones.filter(e => e.name.includes(text));
        else
          this.$refs.tones.suggestions = this.tones
      },
      usePreset(preset) {
        this.step = 2;
        this.newModel.title = preset.name;
        this.newModel.objective = preset.objective;
        this.newModel.tone = preset.tone;

        /*preset.tone.split(' and ').forEach(t => {
          this.activeTones.push({ name: t });
        });*/
      }
    },
    watch: {
      step(val) {
        this.$emit('onNavigate', val);
      }
    }
  };
</script>

<style scoped lang="scss">
  .card-btn {
    height: 180px;
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

  .presets-wrapper {
    position: relative;
    overflow: hidden;
    &::after {
      content: '';
      position: absolute;
      bottom: 0;
      left: 0;
      width: 100%;
      height: 80px;
      pointer-events: none;
      background: linear-gradient(0deg, var(--bs-body-bg) 0%, rgba(255,255,255,0) 100%);
    }
    .presets {
      overflow: auto;
      position: relative;
    }
  }

  @media (max-width: 575px) {
    .card-btn {
      height: 60px;
    }
  }
</style>