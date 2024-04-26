<template>
  <div class="modal" ref="modal"  tabindex="-1">
    <div v-show="file" class="modal-dialog modal-dialog-centered modal-lg">
      <div class="modal-content">
        <div class="modal-header pb-2 flex-column">
          <div class="d-flex w-100 align-items-center">
            <h5 class="modal-title">Disable / Enable pages</h5>
            <button type="button" class="btn-close" data-bs-dismiss="modal" ref="closeModelModal" aria-label="Close"></button>
          </div>
          <div class="w-100 mt-1">
            Uncheck the box to disable the page.
          </div>
        </div>
        <div class="modal-body pt-2">
            <div v-for="link in file.links" :key="link.id" :class="link.disabled" class="form-check border-bottom py-2">
              <input ref="check" type="checkbox" :id="`selectlink-${link.id}`" class="form-check-input" :checked="!link.disabled" @change="link.disabled = !$event.target.checked;disableEnableLink(link)">
              <label class="d-flex w-100 form-check-label justify-content-between text-truncate" :for="`selectlink-${link.id}`">
                <div class="flex-grow-1 text-truncate">
                  <div class="text-truncate me-3">{{ link.title }}</div>
                </div>
                <div class="text-end text-truncate">
                  <a :href="link.url" class="small" target="_blank">{{ link.url }}</a>
                </div>
              </label>
            </div>
          <!-- <div class="d-flex justify-content-center align-items-center loading h-100" v-else  style="min-height: 50px;">
            <div role="status" class="spinner-border text-primary"><span class="visually-hidden">Loading...</span></div>
          </div> -->
        </div>
        <div class="modal-footer pt-2 pt-md-0 mt-0 justify-content-between justify-content-sm-end">
          <button type="button" class="m-0 btn px-5 me-2" data-bs-dismiss="modal">Cancel</button>
          <button type="button" class="btn-secondary m-0 btn px-5 me-2" data-bs-dismiss="modal">Update pages</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import EmbeddingService from '@/api-services/embedding.service';
import { Modal } from 'bootstrap';

  export default {
    name: 'LinksModal',
    components: {
    },
    props: {
      file: {
        default: null,
        required: true
      },
    },
    data() {
      return {
      }
    },
    computed: {
      modal() {
        return new Modal(this.$refs.modal);
      },
    },
    mounted() {
    },
    methods: {
      show() {
        this.modal.show();
        this.$refs.modal.addEventListener('hidden.bs.modal', this.clear);
      },
      disableEnableLink(link){
        EmbeddingService.enableDisableWebsiteEmbedding({file_id: this.file.id,link_id:link.id})
      }
      
    },
  }
</script>
<style scoped lang="scss">
  .modal-body {
    max-height: calc(var(--vh, 1vh) * 100 - 197px);
    overflow: auto;
    @media (max-width: 767px) {
      max-height: calc(var(--vh, 1vh) * 100 - 157px);
    }
  }
  .border-bottom {
    border-bottom: 1px solid var(--bs-muted-color);
  }
</style>