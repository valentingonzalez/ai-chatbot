<template>
  <div class="modal" ref="modal" tabindex="-1">
    <div class="modal-dialog modal-dialog-centered modal-lg">
      <div class="modal-content">
        <div class="modal-header pb-0">
          <div v-if="alreadyContacted" class="alert alert-warning text-center p-2 fs-7 fw-bold d-flex flex-column gap-1 align-content-center">Your already contacted us!</div>
          <button type="button" class="btn-close" data-bs-dismiss="modal" ref="closeModelModal" aria-label="Close"></button>
        </div>
        <div class="modal-body pt-0">
          <h1 class="mb-4">Contact Sales</h1>
          <form action="">
            <div class="row">
              <div class="col-md-6 mb-3">
                <label class="mb-2" for="fullName">Full Name</label>
                <input type="text" id="fullName" class="form-control" v-model="contact.full_name"/>
              </div>
              <div class="col-md-6 mb-3">
                <label class="mb-2" for="businessName">Business Name</label>
                <input type="text" id="businessName" class="form-control" v-model="contact.business_name"/>
              </div>
              <div class="col-md-6 mb-3">
                <label class="mb-2" for="email">Email</label>
                <input type="email" id="email" class="form-control" v-model="contact.email"/>
              </div>
              <div class="col-md-6 mb-3">
                <label class="mb-2" for="phone">Phone Number</label>
                <input type="tel" id="phone" class="form-control" v-model="contact.phone"/>
              </div>
              <div class="col-12">
                <label class="mb-2">Preferred Method</label>
                <div class="d-flex mb-3">
                  <div class="form-check me-3">
                    <div><input class="form-check-input" type="radio" name="method" id="method-email" value="method-email" v-model="contact.prefered_method"></div>
                    <label class="form-check-label d-block w-100 fs-7" for="method-email">Email</label>
                  </div>
                  <div class="form-check">
                    <div><input class="form-check-input" type="radio" name="method" id="method-phone" value="method-phone" v-model="contact.prefered_method"></div>
                    <label class="form-check-label d-block w-100 fs-7" for="method-phone">Phone</label>
                  </div>
                </div>
                <textarea class="form-control" rows="5" v-model="contact.text"></textarea>
              </div>
            </div>
          </form>
        </div>
        <div class="modal-footer pt-2">
          <button @click.prevent="$emit('onContactSubmit',contact)" type="button" class="btn btn-secondary mx-auto justify-content-center w-100">
            Send Message
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import { Modal } from 'bootstrap';
  export default {
    name: 'ContactSalesModal',
    props: ['alreadyContacted'],
    data() {
      return {
        contact:{
          full_name: '',
          business_name:'',
          email: '',
          phone: '',
          prefered_method: '',
          text:'',
        },
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