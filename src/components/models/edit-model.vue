<template>
  <div class="modal" ref="modal" id="addModelModal" tabindex="-1">
    <div class="modal-dialog modal-dialog-centered modal-lg">
      <div class="modal-content">
        <div class="modal-header pb-3">
          <div class="d-flex align-items-center">
            <h4 class="mb-0 fw-bold">Edit Model</h4>
          </div>
          <button type="button" class="btn-close" data-bs-dismiss="modal" ref="closeModelModal" aria-label="Close"></button>
        </div>
        <div class="modal-body pt-2" :class="{'text-center': gettingModel}">
          <div class="model-edit" :class="{ 'sm': small }" v-if="!gettingModel">
            <template>
              <form @submit.prevent="addNewModel">
                <div class="form-group mb-3">
                  <label class="mb-2">Model Name</label>
                  <input required ref="input" :disabled="addingModel" v-model="newModel.title" type="text" class="form-control mb-1" placeholder="Model Name" />
                </div>
                <div class="form-group mb-3">
                  <label class="mb-2">
                    Objective/Summary
                    <div class="small text-muted">
                      Provide a brief objective/summary of what you want to accomplish with this assistant
                    </div>
                  </label>
                  <TextareaAutosize v-model="newModel.objective" class="form-control" rows="2" />
                  <!--<VueSimpleSuggest @focus="openObjectiveOnFocus" :filter-by-query="true" :styles="{ defaultInput: 'form-control' }" ref="objectives" v-model="newModel.objective" :list="objectives" :display-attribute="'objective'">
                    <template slot="misc-item-above">
                      <div class="misc-item">
                        <div class="text-muted">Our suggestions for you:</div>
                      </div>
                    </template>
                  </VueSimpleSuggest>-->
                </div>
                <div class="form-group mb-3">
                  <label class="mb-2">
                    Tone
                  </label>
                  <VueSimpleSuggest v-if="tones && tones.length" ref="tones" @focus="openTonesOnFocus" v-model="newModel.tone" :list="tones" :filter-by-query="true" :display-attribute="'name'">
                    <template slot="misc-item-above">
                      <div class="misc-item">
                        <div class="text-muted">Suggestions for you</div>
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
                <div class="d-flex" v-for="(ins, i) in newModel.instructions" :key="i">
                  <input v-model="ins.instruction" type="text" class="form-control mb-1" placeholder="Instruction" />
                  <button tabindex="-1" type="button" class="p-2" @click="delInstructionInput(i)" v-if="newModel.instructions.length > 1">
                    <svg width="10" height="10" viewBox="0 0 10 10" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M9 1L1 9" stroke="#8390A2" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/><path d="M1 1L9 9" stroke="#8390A2" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></svg>
                  </button>
                </div> 
                <button type="button" class="btn btn-outline-secondary btn-sm px-3 rounded-3 fw-sbold mt-1" @click="addInstructionInput">
                  <svg class="me-2" width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M0.75 9C0.75 10.0834 0.963392 11.1562 1.37799 12.1571C1.7926 13.1581 2.40029 14.0675 3.16637 14.8336C3.93245 15.5997 4.84193 16.2074 5.84286 16.622C6.8438 17.0366 7.91659 17.25 9 17.25C10.0834 17.25 11.1562 17.0366 12.1571 16.622C13.1581 16.2074 14.0675 15.5997 14.8336 14.8336C15.5997 14.0675 16.2074 13.1581 16.622 12.1571C17.0366 11.1562 17.25 10.0834 17.25 9C17.25 7.91659 17.0366 6.8438 16.622 5.84286C16.2074 4.84193 15.5997 3.93245 14.8336 3.16637C14.0675 2.40029 13.1581 1.7926 12.1571 1.37799C11.1562 0.963393 10.0834 0.75 9 0.75C7.91659 0.75 6.8438 0.963393 5.84286 1.37799C4.84193 1.7926 3.93245 2.40029 3.16637 3.16637C2.40029 3.93245 1.7926 4.84193 1.37799 5.84286C0.963392 6.8438 0.75 7.91659 0.75 9Z" fill="#DC2631"/><path d="M5 9H13" stroke="white" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/><path d="M9 5V13" stroke="white" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></svg>
                  Add Instruction
                </button>
                </div>
                <div class="d-flex justify-content-end">
                  <button type="submit" class="btn btn-secondary fs-6 rounded-3 px-4" :disabled="addingModel">
                    <div v-if="addingModel" class="spinner-border spinner-border-sm me-2"></div>
                    <span v-if="modelId">Update</span><span v-else>Add</span>
                  </button>
                </div>
              </form>
            </template>
          </div>
          <div v-else style="min-height: 400px;">
            <div class="spinner-border spinner-border-lg "></div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import ModelsService from '@/api-services/models.service';
  import VueSimpleSuggest from 'vue-simple-suggest';
  import 'vue-simple-suggest/dist/styles.css';
  import { Modal } from 'bootstrap';
  import { EventBus } from '@/main';

  export default {
    name: 'EditModelModal',
    props: {
      small: {
        type: Boolean,
        default: false
      },
      modelId: {
        type: String,
        default: ''
      }
    },
    data() {
      return {
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
          response_length: '',
        },
        copyModel: 0,
        presets: [],
        dataLoading: false,
        gettingModel: false,
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
      },
      modal() {
        return new Modal(this.$refs.modal);
      }
    },
    async mounted() {
      this.getData();
    },
    methods: {
      show() {
        this.modal.show();
      },
      async getModel(id) {
        this.gettingModel = true;
        let res = await ModelsService.getModelDetail({model_id: id});
        this.gettingModel = false;
        if(res.model) {
          this.newModel =  {
            title: res.model.name,
            modelId: id,
            instructions: res.model.instructions,
            summary: res.model.description,
            tone: res.model.tones,
            objective: res.model.description,
            response_length: res.model.response_length
          }
        }        
      },
      openObjectiveOnFocus() {
        this.$refs.objectives.listShown = true;
        let text = this.$refs.objectives.text;
        if(text)
          this.$refs.objectives.suggestions = this.objectives.filter(e => e.objective.includes(text));
        else
          this.$refs.objectives.suggestions = this.objectives
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
        if(!this.newModel.title) {
          this.$swal('Error', 'Assistant Name is required!', 'error');
          return;
        }
        //this.newModel.instructions = this.instructions.map(e => e.text) || [];
        let instructions = JSON.stringify(this.newModel.instructions) 
        ModelsService.updateModel({model_id: this.modelId, ...this.newModel, instruction: instructions}).then(() => {
          this.addingModel = false;
          let tempModel = this.models.find(e => e.id == this.modelId);
          EventBus.$emit('selectAssistant', tempModel);
          this.$swal('Success', 'Model Updated Successfully!', 'success');
          this.$emit('onUpdate', tempModel);
          this.modal.hide();
        });
        this.$store.state.assistants = this.$store.state.assistants.map(e => {
          if(e.id == this.modelId) {
            e.name = this.newModel.title;
            e.description = this.newModel.objective;
            e.description = this.newModel.objective;
            e.tones = this.newModel.tone;
            e.response_length = this.newModel.response_length;
          }
          return e;
        })
        // let id = await this.$store.dispatch('newModel', { ...this.newModel, instructions: this.newModel.instructions.map(e => e.text ) });
        // this.addingModel = false;
        // this.$emit('onAdd', id);
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
      modelId(val) {
        if(val)
          this.getModel(val);
      }
    }
  };
</script>

<style scoped lang="scss">
  .presets {
    max-height: 300px;
    overflow: auto;
  }
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

  @media (max-width: 575px) {
    .card-btn {
      height: 60px;
    }
  }
</style>