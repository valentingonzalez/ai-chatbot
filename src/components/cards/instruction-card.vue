<template>
  <div>
    <div class="card mb-2">
      <div class="card-body p-2">
        <div class="d-flex align-items-start small">
          <TextareaAutosize @keydown.native.esc="blur" :value="value" placeholder="Write instruction" ref="textarea" @input.native="onInput" name="instruction" id="instruction" :class="{ 'disabled opacity-25 text-decoration-line-through': disable }" class="p-0 text-secondary text-muted bg-transparent border-0 w-100 small" :maxHeight="80" rows="1" />
          <div v-if="!editing" class="dropdown ms-2">
            <button type="button" :id="`menu-${instruction.id}`" data-bs-toggle="dropdown" aria-expanded="false">
              <svg width="16" height="4" viewBox="0 0 16 4" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M1 2C1 2.26522 1.10536 2.51957 1.29289 2.70711C1.48043 2.89464 1.73478 3 2 3C2.26522 3 2.51957 2.89464 2.70711 2.70711C2.89464 2.51957 3 2.26522 3 2C3 1.73478 2.89464 1.48043 2.70711 1.29289C2.51957 1.10536 2.26522 1 2 1C1.73478 1 1.48043 1.10536 1.29289 1.29289C1.10536 1.48043 1 1.73478 1 2Z" fill="#94A3B8" stroke="#94A3B8" stroke-linecap="round" stroke-linejoin="round"/><path d="M7 2C7 2.26522 7.10536 2.51957 7.29289 2.70711C7.48043 2.89464 7.73478 3 8 3C8.26522 3 8.51957 2.89464 8.70711 2.70711C8.89464 2.51957 9 2.26522 9 2C9 1.73478 8.89464 1.48043 8.70711 1.29289C8.51957 1.10536 8.26522 1 8 1C7.73478 1 7.48043 1.10536 7.29289 1.29289C7.10536 1.48043 7 1.73478 7 2Z" fill="#94A3B8" stroke="#94A3B8" stroke-linecap="round" stroke-linejoin="round"/><path d="M13 2C13 2.26522 13.1054 2.51957 13.2929 2.70711C13.4804 2.89464 13.7348 3 14 3C14.2652 3 14.5196 2.89464 14.7071 2.70711C14.8946 2.51957 15 2.26522 15 2C15 1.73478 14.8946 1.48043 14.7071 1.29289C14.5196 1.10536 14.2652 1 14 1C13.7348 1 13.4804 1.10536 13.2929 1.29289C13.1054 1.48043 13 1.73478 13 2Z" fill="#94A3B8" stroke="#94A3B8" stroke-linecap="round" stroke-linejoin="round"/></svg>
            </button>
            <ul class="dropdown-menu fs-7 opacity-100" :aria-labelledby="`menu-${instruction.id}`" :role="`menu-${instruction.id}`">
              <li><a class="dropdown-item" href="#" @click.prevent="toggleDisable">{{ disable ? 'Enable' : 'Disable' }}</a></li>
              <li><a class="dropdown-item" href="#" @click.prevent="archive">Archive</a></li>
            </ul>
          </div>
        </div>
      </div>
    </div>
    <template v-if="editing">
      <div class="d-flex flex-row justify-content-between align-items-center mt-2">
        <div class="fs-7 d-flex align-items-center" v-if="false">
          <div class="text-muted me-1">Token size:</div> 
          <div v-if="tokenSize">{{ tokenSize }}</div>
          <div v-else>-</div>
        </div>
        <div class="d-flex">
          <button class="btn btn-xs btn-outline-primary px-4 fw-bold me-2 btn-sm" :disabled="updating" @click="cancelUpdate">
            Cancel
          </button>
          <button class="btn btn-xs btn-primary px-4 fw-bold btn-sm" @click="update" :disabled="updating">
            Update
            <div v-if="updating" class="spinner-border spinner-border-sm ms-2"></div>
          </button>
        </div>
      </div>
    </template>
  </div>
</template>

<script>
import debounce from 'debounce';
import InstructionsService from '@/api-services/instructions.service';
import config from '@/api-services/_config';

export default {
  name: 'InstructionCard',
  props: ['value', 'instruction'],
  data() {
    return {
      editing: false,
      updating: false,
      truncated: true,
      longText: false,
      tokenSize: null,
      disable: null,
      timeout: null
    }
  },
  computed: {
    assistant() {
      return this.$store.state.selectedAssistant;
    },
    instructionCount() {
      return this.instruction.instruction.split(' ').length - 1;
    },
  },
  mounted() {
    //setTimeout(() => this.longText = this.$refs.instructionText.scrollHeight > this.$refs.instructionText.offsetHeight, 0);
    this.getTokenSize();
    this.disable = this.instruction.disable ?? 0;
  },
  methods: {
    blur() {
      this.$refs.textarea.$el.blur();
      console.log('onblur')
      if(!this.value);
        this.$emit('onBlur');
    },
    focus() {
      this.$refs.textarea.$el.focus();
    },
    archive() {
      this.$logActivity({action: 'click', page: this.$route.name, type: 'archiveInstruction', ref_id: this.instruction.id});
      this.$swal({
        title: 'Are you sure?',
        text: 'Do you want to archive this instruction?',
        icon: 'danger',
        showDenyButton: false,
        showCancelButton: true,
        confirmButtonText: 'Archive',
        denyButtonText: 'Cancel',
      }).then(result => {
        if(result.isConfirmed) {
          this.$emit('onDelete', this.instruction.id);
          InstructionsService.archive({ instruction_id: this.instruction.id });
        }
      });
    },
    edit() {
      this.editing = true;
      setTimeout(() => this.$refs.textarea.$el.focus(), 50);
    },
    onInput(evt) {
      this.$emit('input', evt.target.value);
      if(this.timeout) clearTimeout(this.timeout);
      this.timeout = setTimeout(() => this.instruction.id ? this.update() : this.save(), 800);
    },
    async update() {
      this.doWrite();
      let memberId = await config.checkSession();
      InstructionsService.update({ id: memberId, instruction: this.value, token_size: this.instructionCount, instruction_id: this.instruction.id });
      this.$toast('Instruction Updated!');
    },
    async save() {
      let memberId = await config.checkSession();
      let resp = await InstructionsService.add({ id: memberId, instruction: this.value, token_size: this.instructionCount, model_id: this.assistant.id });
      this.$toast('New Instruction Saved!');
      console.log(resp);
      this.$logActivity({action: 'click', page: this.$route.name, type: 'addInstruction' });
    },
    cancelUpdate() {
      this.editing = false;
      this.getTokenSize();
    },
    doWrite() {
      this.tokenSize = null;
      this.getDebouncedTokenSize();
    },
    getTokenSize() {
      InstructionsService.getTokenSize({ string: this.value }).then(e => this.tokenSize = e.token_size );
    },
    getDebouncedTokenSize: debounce(function() { this.getTokenSize(); }, 2000),
    toggleDisable() {
      this.$logActivity({action: 'click', page: this.$route.name, type: this.disable ? 'Enable File' : 'Disable File', ref_id: this.instruction.id});

      this.disable = this.disable ? 0 : 1;
      InstructionsService.disable({
        instruction_id: this.instruction.id,
        disable: this.disable,
      });
    }
  }
}
</script>

<style scoped lang="scss">
  .instruction-text {
    &.truncated {
      overflow: hidden;
      -webkit-box-orient: vertical;
      display: block;
      display: -webkit-box;
      text-overflow: ellipsis;
      -webkit-line-clamp: 3;
    }
  }
   pre {
     white-space: pre-wrap;
   }
   .status {
        position: absolute;
        top: 0;
        right: 0;

        .alert {
            border-top: none !important;
            border-right: none !important;
            border-start-start-radius: 0 !important;
            border-start-end-radius: 0 !important;
            border-end-end-radius: 0 !important;
        }
    }
</style>