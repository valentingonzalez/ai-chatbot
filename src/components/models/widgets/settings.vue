<template>
  <Collapsible ref="collapsible" class="card p-3" transitionDuration="200ms" :isOpen="isOpen" :onCollapse="onCollapse">
    <div class="d-flex align-items-center justify-content-between" slot="trigger">
      <h6 class="mb-0">Advanced Settings</h6>
      <svg class="caret" width="10" height="6" viewBox="0 0 10 6" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M1 1L5 5L9 1" stroke="#94A3B8" stroke-width="2" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round"/></svg>
    </div>

    <div class="my-3">
      <div class="fw-bold mb-1">AI Engine</div>
      <v-select v-if="engines" v-model="engineId" :searchable="false" :clearable="false" :options="engines" label="name" :reduce="engine => engine.id" class="models-select v-select-small w-100">
        <template slot="option" slot-scope="engine">
          <div class="text-capitalize fs-7">{{ engine.name }}</div>
          <div class="smaller text-muted text-wrap">
            {{ engine.description }}
          </div>
        </template>
        <template #open-indicator="{ attributes }">
          <div style="min-width: 10px" v-bind="attributes">
            <svg width="10" height="6" viewBox="0 0 10 6" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M1.625 1.375L5 4.75L8.375 1.375" stroke="#64748B" stroke-width="1.5" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round"/></svg>
          </div>
        </template>
        <span class="small" slot="no-options">Nothing found</span>
      </v-select>
    </div>

    <div class="my-3">
      <div class="mb-1">
        <div class="d-flex align-items-center justify-content-between">
          <div class="d-flex align-items-center">
            <div>Randomness</div>
            <button @click.stop="toggleInfo" data-bs-toggle="tooltip" title="Show/Hide Info" class="align-items-center justify-content-center d-flex ms-2">
              <svg width="14" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6"><path stroke-linecap="round" stroke-linejoin="round" d="M11.25 11.25l.041-.02a.75.75 0 011.063.852l-.708 2.836a.75.75 0 001.063.853l.041-.021M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-9-3.75h.008v.008H12V8.25z" /></svg>
            </button>
          </div>
          <input class="form-control form-control-sm" type="number" max="2" step="1" name="randomness" v-model="randomnessSliderValue" style="width: 50px" />
        </div>
        <transition name="fadeHeight">
          <div v-if="showInfo">
            <div class="text-muted small">Lower is better for strict instructions, higher for more creativity.</div>
          </div>
        </transition>
      </div>
      <VueSlider :min="0" :max="100" :step="0.01" :enable-cross="false" :dotSize="16" tooltip="none" type="decimal" :contained="false" :drag-on-click="true" v-model="randomness" @change="updateRandomness" />
      <div class="d-flex justify-content-between smaller">
        <div>Concise</div>
        <div>Moderate</div>
        <div>Very Random</div>
      </div>
    </div>
    <div class="mb-3">
      <div class="mb-1">
        <div class="d-flex align-items-center justify-content-between">
          <div class="d-flex align-items-center">
            <div>Chat Conversation History</div>
            <button @click.stop="toggleChatInfo" data-bs-toggle="tooltip" title="Show/Hide Info" class="align-items-center justify-content-center d-flex ms-2">
              <svg width="14" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6"><path stroke-linecap="round" stroke-linejoin="round" d="M11.25 11.25l.041-.02a.75.75 0 011.063.852l-.708 2.836a.75.75 0 001.063.853l.041-.021M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-9-3.75h.008v.008H12V8.25z" /></svg>
            </button>
          </div>
          <input class="form-control form-control-sm" type="number" max="2" step="1" name="chat_history" v-model="chatHistorySliderValue" style="width: 50px" />
        </div>
        <transition name="fadeHeight">
          <div v-if="showInfoChat">
            <div class="text-muted small">Choose how much information to retain. Scroll left for none, scroll right for maximum retention.</div>
          </div>
        </transition>
      </div>
      <VueSlider :min="0" :max="2" :enable-cross="false" :dotSize="16" tooltip="none" type="decimal" :contained="false" :drag-on-click="true" v-model="chatHistory" @change="updateChatHistory" />
      <div class="d-flex justify-content-between smaller">
        <div>Retain None</div>
        <div>Retain Some</div>
        <div>Retain All</div>
      </div>
    </div>

    <div>
      <div class="mb-1 d-flex align-items-center">
        <div class="d-flex align-items-center">
          <div class="form-check form-switch form-switch-sm small fw-medium">
            <input type="checkbox" id="authenticator" class="form-check-input" v-model="scope" @change="updateScope">
            <label class="form-check-label" for="authenticator">Restrict answers to only what assistant knows</label>
          </div>
        </div>
      </div>

      <div class="mb-1" v-if="scope">
        Restriction Prompt
        <div class="d-flex align-items-center">
          <textarea @blur="updateScopePrompt" name="scope" class="form-control" v-model="scopePrompt" id="" rows="3"></textarea>
        </div>
      </div>
    </div>

    <button type="button" class="btn btn-outline-secondary w-100 mt-3" @click="deleteConversation" :disabled="deletingConversation">
      <div class="d-flex align-items-center justify-content-center my-3" v-if="deletingConversation">
        <div class="spinner-border spinner-border-sm"></div>
      </div>
      <svg  v-if="!deletingConversation" class="me-2" width="16" height="18" viewBox="0 0 16 18" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M1.33334 4.83334H14.6667" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/><path d="M6.33334 8.16666V13.1667" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/><path d="M9.66666 8.16666V13.1667" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/><path d="M2.16666 4.83334L2.99999 14.8333C2.99999 15.2754 3.17558 15.6993 3.48815 16.0119C3.80071 16.3244 4.22463 16.5 4.66666 16.5H11.3333C11.7754 16.5 12.1993 16.3244 12.5118 16.0119C12.8244 15.6993 13 15.2754 13 14.8333L13.8333 4.83334" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/><path d="M5.5 4.83333V2.33333C5.5 2.11232 5.5878 1.90036 5.74408 1.74408C5.90036 1.5878 6.11232 1.5 6.33333 1.5H9.66667C9.88768 1.5 10.0996 1.5878 10.2559 1.74408C10.4122 1.90036 10.5 2.11232 10.5 2.33333V4.83333" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></svg>
      Clear chat conversation
    </button>
  </Collapsible>
</template>

<script>
import 'vue-collapsible-component/lib/vue-collapsible.css';
import 'vue-slider-component/theme/antd.css'
import Collapsible from 'vue-collapsible-component';
import VueSlider from 'vue-slider-component'
import ModelsService from '@/api-services/models.service';
import ConversationService from '@/api-services/conversation.service';
import { EventBus } from '@/main';

export default {
  name: 'ModelWidgetSettings',
  props: {
    isOpen: {
      type: Boolean,
      default: true
    },
    modelId: {
      type: String,
      default: ''
    }
  },
  components: {
    Collapsible,
    VueSlider
  },
  computed: {
    engines() {
      return this.$store.state.engines;
    },
    engineId: {
      get() {
        return this.$store.state.selectedEngine;
      },
      set(value) {
        this.$store.commit('updateEngine', value);
      }
    },
  },
  data() {
    return {
      dataWeight: [Math.floor(Math.random() * 100), Math.floor(Math.random() * 100)],
      randomness: 0,
      randomnessSliderValue: 0,
      chatHistorySliderValue: 0,
      chatHistory: 0,
      scope: false,
      showInfo: false,
      showInfoChat: false,
      scopePrompt: '',
      scopePromptDefault: 'Your Job is to only reply to the information you have, any information that you don\'t have simply reply with " I don\'t have the required Information and Ask the user if he would want to ask anything different", Make sure you only reply to information you know off.',
      deletingConversation: false
    }
  },
  async created() {
    if(!this.engines) await this.$store.dispatch('getEngines');
    let res = await ModelsService.getSettings({ model_id: this.modelId});
    if(res.success) {
      this.randomness = res.settings.randomness != null ?  res.settings.randomness : 0;
      this.randomnessSliderValue = this.randomness;
      this.randomness = (res.settings.randomness* 100)/2;
      this.chatHistory = res.settings.retain_convo != null ?  res.settings.retain_convo : 0;
      this.chatHistorySliderValue = this.chatHistory;
      this.scope = res.settings.out_of_scope != null && res.settings.out_of_scope != 0 ? true : false;
      if(res.settings.default_engine_id){
        this.$store.state.selectedEngine = `${res.settings.default_engine_id}`
      }
      if(res.settings.out_of_scope_prompt) {
        this.scopePrompt = res.settings.out_of_scope_prompt;
      } else {
        this.scopePrompt = this.scopePromptDefault;
      }
    }
  },
  methods: {
    async deleteConversation() {
      this.$swal({
          title: 'Are you sure?',
          text: 'Are you sure, you want to delete this conversation?',
          icon: 'warning',
          showCancelButton: true
          }).then(async res => {
            if(res.isConfirmed) {
              this.deletingConversation = true;
              const response = await ConversationService.deleteRoomConversation(this.$route.query.room_id);
              EventBus.$emit('clearConversation');
              if(response.success == 0) {
                this.$swal('', response.error, 'error'); return;
              }
              this.deletingConversation = false;
            }
          })
    },
    onCollapse() {
      let arr = JSON.parse(localStorage.getItem('collapsedSettings')) || {};
      localStorage.setItem('collapsedSettings', JSON.stringify({ ...arr, settings: this.$refs.collapsible.open }));
    },
    toggleInfo() {
      this.showInfo = !this.showInfo;
    },
    toggleChatInfo() {
      this.showInfoChat = !this.showInfoChat;
    },
    updateRandomness() {
      this.randomnessSliderValue = (this.randomness/100) * 2;
      ModelsService.updateRandomness({randomness: this.randomnessSliderValue, model_id: this.modelId});
    },
    updateChatHistory() {
      this.chatHistorySliderValue = this.chatHistory
      ModelsService.updateChatHistory({history: this.chatHistorySliderValue, model_id: this.modelId});
    },
    updateScope() {
      ModelsService.updateScope({toggle_scope: this.scope ? 1 : 0, model_id: this.modelId });
    },
    updateScopePrompt() {
      ModelsService.updateScopePrompt({prompt: this.scopePrompt, model_id: this.modelId });
    }
  },
  watch: {
    randomnessSliderValue() {
      this.randomness = (this.randomnessSliderValue / 2) * 100;
      this.updateRandomness();
    },
    chatHistorySliderValue() {
      this.chatHistory = this.chatHistorySliderValue;
      this.updateChatHistory();
    }
  },
}
</script>

<style scoped lang="scss">
  :deep(.vue-slider) {
    .vue-slider-rail {
      background: var(--bs-secondary);
    }
    .vue-slider-process {
      background: var(--bs-secondary);
    }
    .vue-slider-dot-handle {
      box-shadow: none !important;
      background: var(--bs-secondary);
      border-color: var(--bs-body-bg);
    }
  }
</style>
