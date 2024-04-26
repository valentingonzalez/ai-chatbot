<template>
  <Collapsible ref="collapsible" class="card p-3" transitionDuration="200ms" :isOpen="isOpen" :onCollapse="onCollapse">
    <div class="d-flex align-items-center justify-content-between" slot="trigger">
      <div class="d-flex align-items-center">
        <h6 class="mb-0">Instructions</h6>
        <button @click.stop="toggleInfo" data-bs-toggle="tooltip" title="Show/Hide Info" class="align-items-center justify-content-center d-flex ms-2">
          <svg width="16" height="15" viewBox="0 0 16 15" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M8.00016 14.1663C11.6821 14.1663 14.6668 11.1816 14.6668 7.49967C14.6668 3.81778 11.6821 0.833008 8.00016 0.833008C4.31826 0.833008 1.3335 3.81778 1.3335 7.49967C1.3335 11.1816 4.31826 14.1663 8.00016 14.1663Z" stroke="#8390A2" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/><path d="M8 4.83301V7.49967" stroke="#8390A2" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/><path d="M8 10.167H8.00667" stroke="#8390A2" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>
        </button>
      </div>
      <svg class="caret" width="10" height="6" viewBox="0 0 10 6" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M1 1L5 5L9 1" stroke="#94A3B8" stroke-width="2" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round"/></svg>
    </div>
    <div class="pt-2">
      <transition name="fadeHeight">
        <div class="fs-7 small text-muted mb-3" v-if="showInfo">
          Instructions are an essential component of training an AI to understand your specific needs and requests. By providing clear and concise instructions, you help guide the AI in answering and interacting with you in a way that is tailored to your unique requirements. These instructions can include specific keywords, phrases, or even examples of the types of responses you are looking for.
        </div>
      </transition>
      <div class="d-flex align-items-center justify-content-center" v-if="loading">
        <div class="spinner-border spinner-border-sm mt-2"></div>
      </div>
      <template v-else>
        <InstructionCard ref="instructions" v-model="inst.instruction" :instruction="inst" v-for="inst in reversedInstructions" :key="inst.id" @onDelete="deleteInstruction" @onBlur="deleteIfEmpty" />
      </template>
      <button class="btn btn-outline-secondary rounded-3 fw-bold px-2 btn-xs" @click="addInstruction">
        <svg class="me-2" width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M0.75 9C0.75 10.0834 0.963392 11.1562 1.37799 12.1571C1.7926 13.1581 2.40029 14.0675 3.16637 14.8336C3.93245 15.5997 4.84193 16.2074 5.84286 16.622C6.8438 17.0366 7.91659 17.25 9 17.25C10.0834 17.25 11.1562 17.0366 12.1571 16.622C13.1581 16.2074 14.0675 15.5997 14.8336 14.8336C15.5997 14.0675 16.2074 13.1581 16.622 12.1571C17.0366 11.1562 17.25 10.0834 17.25 9C17.25 7.91659 17.0366 6.8438 16.622 5.84286C16.2074 4.84193 15.5997 3.93245 14.8336 3.16637C14.0675 2.40029 13.1581 1.7926 12.1571 1.37799C11.1562 0.963393 10.0834 0.75 9 0.75C7.91659 0.75 6.8438 0.963393 5.84286 1.37799C4.84193 1.7926 3.93245 2.40029 3.16637 3.16637C2.40029 3.93245 1.7926 4.84193 1.37799 5.84286C0.963392 6.8438 0.75 7.91659 0.75 9Z" fill="#DC2631"/><path d="M5 9H13" stroke="white" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/><path d="M9 5V13" stroke="white" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></svg>
        Add Instruction
      </button>
    </div>
  </Collapsible>
</template>

<script>
import 'vue-collapsible-component/lib/vue-collapsible.css';
import debounce from 'debounce';
import Collapsible from 'vue-collapsible-component';
import InstructionsService from '@/api-services/instructions.service';
import config from '@/api-services/_config';
import InstructionCard from '@/components/cards/instruction-card';
import { Tooltip } from 'bootstrap';

export default {
  name: 'ModelWidgetInstruction',
  props: {
    assistant: {
      type: Object
    },
    isOpen: {
      type: Boolean,
      default: true
    }
  },
  components: {
    Collapsible,
    InstructionCard
  },
  data() {
    return {
      instruction: '',
      instructions: [],
      saving: false,
      addNew: false,
      tokenSize: '0',
      showInfo: false,
      loading: false
    }
  },
  computed: {
    sessionId() {
      return this.$route.query.session
    },
    nodeUrl() {
      return this.$root.$children[0].nodeUrl;
    },
    reversedInstructions() {
      return [...this.instructions].sort((a, b) => {
        let da = new Date(a.date_added).getTime(), db = new Date(b.date_added).getTime();
        return da < db ? -1 : da > db ? 1 : 0
      }).reverse();
    }
  },
  mounted() {
    [...document.querySelectorAll('[data-bs-toggle="tooltip"]')].forEach(e => {
      let t = new Tooltip(e);
      e.addEventListener('click', () => t.hide());
    });
    if(this.assistant) {
      this.getInstructions();
    }
  },
  methods: {
    deleteIfEmpty() {
      this.instructions = this.instructions.filter(e => e.instruction);
    },
    onCollapse() {
      let arr = JSON.parse(localStorage.getItem('collapsedSettings')) || {};
      localStorage.setItem('collapsedSettings', JSON.stringify({ ...arr, instructions: this.$refs.collapsible.open }));
    },
    toggleInfo() {
      this.showInfo = !this.showInfo;
    },
    async getInstructions() {
      this.loading = true;
      let memberId = await config.checkSession();
      InstructionsService.getInstructions({id: memberId, model_id: this.assistant.id}).then(res => {
        this.loading = false;
        this.instructions = res.instructions.map(e => ({ ...e, enable: !e.enable }));
      });
    },
    addInstruction() {
      this.instructions.unshift({ instruction: '' });
      setTimeout(() => this.$refs.instructions[this.$refs.instructions.length - 1].focus(), 100);
    },
    doWrite() {
      this.tokenSize = null;
      this.getDebouncedTokenSize();
    },
    getTokenSize() {
      InstructionsService.getTokenSize({ string: this.instruction }).then(e => this.tokenSize = e.token_size);
    },
    getDebouncedTokenSize: debounce(function() { this.getTokenSize(); }, 2000),
    deleteInstruction(id) {
      this.instructions = this.instructions.filter(e => e.id != id);
    }
  }
}
</script>
