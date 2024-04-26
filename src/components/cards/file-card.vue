<template>
  <div v-if="file" class="file d-flex align-items-center justify-content-between py-2 fs-7" style="line-height: 0;">
    <div class="icon">
      <div class="ext">
        {{ ext || '' }}
      </div>
      <svg class="text-primary" width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M5.625 1.5C4.589 1.5 3.75 2.34 3.75 3.375V20.625C3.75 21.66 4.59 22.5 5.625 22.5H18.375C19.41 22.5 20.25 21.66 20.25 20.625V12.75C20.25 11.7554 19.8549 10.8016 19.1517 10.0983C18.4484 9.39509 17.4946 9 16.5 9H14.625C14.1277 9 13.6508 8.80246 13.2992 8.45083C12.9475 8.0992 12.75 7.62228 12.75 7.125V5.25C12.75 4.25544 12.3549 3.30161 11.6517 2.59835C10.9484 1.89509 9.99456 1.5 9 1.5H5.625Z" fill="currentColor"/><path d="M12.9709 1.81592C13.7975 2.76888 14.2517 3.98846 14.2499 5.24992V7.12492C14.2499 7.33192 14.4179 7.49992 14.6249 7.49992H16.4999C17.7614 7.49817 18.981 7.9524 19.9339 8.77892C19.494 7.10563 18.6175 5.57922 17.3941 4.3558C16.1706 3.13239 14.6442 2.25588 12.9709 1.81592Z" fill="currentColor"/></svg>
    </div>
    <div class="flex-grow-1 text-muted mx-2 text-truncate" style="line-height: normal">
      {{ file.name }}
    </div>
    <div>
      <div v-if="file.status == 'cancelled'" class="badge smallest rounded-pill bg-danger">
        Cancelled
        <button class="ms-1" @click="onDelete">
          <svg width="7" height="7" viewBox="0 0 7 7" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M6 1L1 6" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/><path d="M1 1L6 6" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></svg>
        </button>
      </div>
      <div v-else-if="file.progress && file.progress >= 100" class="badge small fw-normal rounded-pill bg-success">
        Done
      </div>
    </div>
    <div v-if="file.status != 'cancelled'" class="percent me-2">{{ file.progress }}%</div>
    <div class="spinner me-2" v-if="false">
      <ProgressCircle :completed-steps="file.progress" :total-steps="100" :diameter="20" :circle-width="2" start-color="var(--bs-primary)" stop-color="var(--bs-primary)" circle-color="transparent" />
    </div>
    <button v-if="file.status != 'cancelled'" class="cancel-bt d-flex align-items-center justify-content-center" @click="onCancel">
      <svg width="8" height="8" viewBox="0 0 8 8" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M1.54468 6.45508L6.45464 1.54512" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/><path d="M1.54468 1.54492L6.45464 6.45488" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></svg>
    </button>
  </div>
</template>

<script>
  import { ProgressCircle } from 'vue-progress-circle';

  export default {
    name: 'FileCard',
    props: {
      file: {
        default: null,
        required: true
      },
      deleteOnCancel: {
        default: false
      }
    },
    components: {
      ProgressCircle
    },
    data() {
      return {
        status: ''
      }
    },
    computed: {
      ext() {
        return this.file.name.split('.').pop();
      },
      fileUploader() {
        return this.$root.$children[0].$refs.fileUploader;
      }
    },
    methods: {
      onCancel() {
        if(this.deleteOnCancel) {
          this.$emit('onDelete', this.file);
          return;
        }
        this.status = 'cancelled';
        this.$set(this.fileUploader.files.find(e => e == this.file), 'status', 'cancelled');
        this.fileUploader.cancelUpload(this.file);
      },
      onDelete() {
        this.$emit('onDelete', this.file);
      }
    }
  }
</script>

<style scoped lang="scss">
  .file {
    .cancel-bt {
      width: 16px;
      height: 16px;
      border-radius: 16px;
      background: var(--bs-body-color);
      color: var(--bs-base) !important;
    }
    &.small {
      height: 32px;
      font-size: 11px !important;
      position: relative;
      overflow: visible;
      .cancel-bt {
        position: absolute;
        right: -4px;
        top: -4px;
        z-index: 2;
      }
    }
    .percent {
      width: 40px;
      min-width: 40px;
      text-align: right;
    }
    .icon {
      position: relative;
      .ext {
        color: #fff;
        font-size: 7px;
        text-transform: uppercase;
        position: absolute;
        z-index: 2;
        bottom: 7px;
        width: 100%;
        text-align: center;
        font-weight: bold;
        letter-spacing: -.5px;
        margin-left: -0.5px;
      }
    }
  }
</style>