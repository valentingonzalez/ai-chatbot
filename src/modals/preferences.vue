<template>
  <div class="modal" ref="modal">
    <div class="modal-dialog modal-dialog-centered modal-lg">
      <div class="modal-content">
        <div class="modal-header pb-2">
          <h4 class="modal-title">Preferences</h4>
          <button type="button" class="btn-close" data-bs-dismiss="modal" ref="closeModelModal" aria-label="Close"></button>
        </div>
        <div class="modal-body pt-2">
          <ul class="list-unstyled">
            <li class="mb-3 pb-3 border-bottom">
              <div class="fw-bold mb-1">Font Size</div>
              <div class="d-flex">
                <button type="button" class="btn btn-outline-secondary me-2 fs-btn p-0 d-flex align-items-center justify-content-center" @click="changeTextSize('smaller')" style="width: 32px; height: 32px;">
                  <svg width="8" height="8" viewBox="0 0 8 8" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M0.666748 1.91666V0.666664H7.33342V1.91666" stroke="currentColor" stroke-width="1.2" stroke-linecap="square" stroke-linejoin="round"/><path d="M2.75 7.33334H5.25" stroke="currentColor" stroke-width="1.2" stroke-linecap="square" stroke-linejoin="round"/><path d="M4 0.666664V7.33333" stroke="currentColor" stroke-width="1.2" stroke-linecap="square" stroke-linejoin="round"/></svg>
                </button>
                <button type="button" class="btn btn-outline-secondary fs-btn p-0 d-flex align-items-center justify-content-center ms-1" @click="changeTextSize('larger')" style="width: 32px; height: 32px;">
                  <svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M1.66675 3.66666V1.66666H12.3334V3.66666" stroke="currentColor" stroke-width="1.5" stroke-linecap="square" stroke-linejoin="round"/><path d="M5 12.3333H9" stroke="currentColor" stroke-width="1.5" stroke-linecap="square" stroke-linejoin="round"/><path d="M7 1.66666V12.3333" stroke="currentColor" stroke-width="1.5" stroke-linecap="square" stroke-linejoin="round"/></svg>
                </button>
              </div>
            </li>
            <li class="mb-3 pb-3 border-bottom d-none">
              <div class="fw-bold mb-1">Audio</div>
              <div class="form-check form-switch form-switch-sm d-inline-block">
                <input type="checkbox" id="enableAudio" class="form-check-input" v-model="enableAudio">
                <label class="form-check-label small" for="enableAudio">
                  Enable Audio
                </label>
              </div>
            </li>
            <li class="mb-2">
              <div class="fw-bold mb-1">Message</div>
              <div class="form-check form-switch form-switch-sm d-inline-block">
                <input type="checkbox" id="soe" class="form-check-input" v-model="sendOnEnter">
                <label class="form-check-label small" for="soe">
                  Send on enter
                </label>
              </div>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import { Modal } from 'bootstrap';

  export default {
    name: 'PreferencesModal',
    data() {
      return {
      }
    },
    computed: {
      modal() {
        return new Modal(this.$refs.modal);
      },
      enableAudio: {
        get() {
          return this.$store.state.enableAudio;
        },
        set(value) {
          this.$store.commit('updateEnableAudio', value);
        }
      },
      fontSize: {
        get() {
          return this.$store.state.fontSize;
        },
        set(value) {
          this.$store.commit('updateFontSize', value);
        }
      },
      sendOnEnter: {
        get() {
          return localStorage.getItem('sendOnEnter') == 'false' ? false : true;
        },
        set(value) {
          this.$store.commit('updateSendOnEnter', value);
        }
      }
    },
    async mounted() {
      if(!this.engines) await this.$store.dispatch('getEngines');
    },
    methods: {
      show() {
        this.modal.show();
      },
      changeTextSize(type) {
        this.fontSize = type === 'smaller' ? this.fontSize > 7 ? this.fontSize - 2 : this.fontSize : this.fontSize < 48 ? this.fontSize + 2 : this.fontSize;
      },
    },
    watch: {
      sendOnEnter(val) {
        localStorage.setItem('sendOnEnter', val);
      },
      engineId(val) {
        localStorage.setItem('selectedEngine', val);
        this.$logActivity({action: 'click', page: this.$route.name, type: 'engineIdChanged', ref_id: val});
      },
    }
  }
</script>

<style scoped lang="scss">
</style>