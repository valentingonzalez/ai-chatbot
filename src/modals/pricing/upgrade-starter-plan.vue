<template>
  <div class="modal" ref="modal" tabindex="-1">
    <div class="modal-dialog modal-dialog-centered modal-lg">
      <div class="modal-content">
        <div class="modal-header pb-2">
          <button type="button" class="btn-close" data-bs-dismiss="modal" ref="closeModelModal" aria-label="Close"></button>
        </div>
        <div class="modal-body pt-2 text-center">
          <div class="display-4 mb-4">✅</div>
          <h1 class="fw-bold mb-4">
            Upgrade To Starter
          </h1>
          <div class="h6">
            We will redirect you to the payment processing screen to complete your upgrade!
          </div>
        </div>
        <div class="modal-footer pt-2">
          <a :href="checkoutUrl" class="btn mt-2 btn-secondary mx-auto justify-content-center" style="min-width: 326px;">
            Take Me To Checkout
          </a>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import { Modal } from 'bootstrap';
  export default {
    name: 'UpgradeBasicPlanModal',
    props: ['checkoutUrl'],
    data() {
      return {
        adding: false,
        dragover: false
      }
    },
    computed: {
      modal() {
        return new Modal(this.$refs.modal);
      },
    },
    methods: {
      show() {
        this.modal.show();
      }
    }
  }
</script>

<style scoped lang="scss">
</style>