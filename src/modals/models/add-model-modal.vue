<template>
  <div class="modal" ref="modal" id="addModelModal" tabindex="-1">
    <div class="modal-dialog modal-dialog-centered modal-lg">
      <div class="modal-content">
        <div class="modal-header pb-3">
          <div class="d-flex align-items-center">
            <a href="#" v-if="step == 2 || step == 3" @click.prevent="$refs.form.step = 1">
              <svg class="me-3" width="8" height="14" viewBox="0 0 8 14" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M7 1L1 7L7 13" stroke="#8390A2" stroke-width="2" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round"/></svg>
            </a>
            <h5 class="mb-0 fw-sbold" v-if="step == 3">Copy From Existing</h5>
            <h5 class="mb-0 fw-sbold" v-else>Create Assistant</h5>
          </div>
          <button type="button" class="btn-close" data-bs-dismiss="modal" ref="closeModelModal" aria-label="Close"></button>
        </div>
        <div class="modal-body pt-2">
          <CreateModel ref="form" @onNavigate="onNavigate" @onAdd="onAdd" />
        </div>
      </div>
    </div>
  </div>

</template>

<script>
  import { Modal } from 'bootstrap';
  import CreateModel from '@/components/models/model-create-2';

  export default {
    name: 'AddModelModal',
    data() {
      return {
        step: 1
      }
    },
    components: {
      CreateModel
    },
    computed: {
      modal() {
        return new Modal(this.$refs.modal);
      }
    },
    methods: {
      onAdd(assistant) {
        this.$emit('onAdd', assistant);
        this.modal.hide();
      },
      show() {
        this.$refs.form.step = 1;
        this.modal.show();
      },
      onNavigate(step) {
        this.step = step;
      }
    }
  }
</script>
