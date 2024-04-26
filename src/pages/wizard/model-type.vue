<template>
  <div>
    <h1 class="fw-bold text-center">
      <TypeWriter style="max-width: 430px; height: 80px;">
        🤖 What type of AI model are you trying to create?
      </TypeWriter>
    </h1>
    <div class="d-flex flex-column gap-3 form w-100 mt-5">
      <div class="card py-2 px-3">
        <div class="form-check w-100 mb-0">
          <input class="form-check-input" type="radio" name="option" id="product-knowledge" value="product-knowledge" v-model="model_type">
          <label class="form-check-label d-block w-100" for="product-knowledge">Product Knowledge A.I</label>
        </div>
      </div>
      <div class="card py-2 px-3">
        <div class="form-check w-100 mb-0">
          <input class="form-check-input" type="radio" name="option" id="sales" value="sales" v-model="model_type">
          <label class="form-check-label d-block w-100" for="sales">Sales & Marketing A.I</label>
        </div>
      </div>
      <div class="card py-2 px-3">
        <div class="form-check w-100 mb-0">
          <input class="form-check-input" type="radio" name="option" id="creative" value="creative" v-model="model_type">
          <label class="form-check-label d-block w-100" for="creative">Creative A.I</label>
        </div>
      </div>
      <div class="card py-2 px-3">
        <div class="form-check w-100 mb-0">
          <input class="form-check-input" type="radio" name="option" id="informational" value="informational" v-model="model_type">
          <label class="form-check-label d-block w-100" for="informational">Informational A.I</label>
        </div>
      </div>
      <div class="card py-2 px-3">
        <div class="form-check w-100 mb-0">
          <input class="form-check-input" type="radio" name="option" id="other" value="other" v-model="model_type">
          <label class="form-check-label d-block w-100" for="other">Other</label>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import WizardService from '@/api-services/wizard.service';
  export default {
    name: 'WizardUserType',
    data() {
      return {
        model_type: 'product-knowledge'
      }
    },
    mounted() {
      this.model_type = this.$store.state.wizard.model_type || this.model_type;
    },
    methods: {
      async next(to) {
        await WizardService.saveModelType({ model_type: this.model_type, id: this.$store.state.wizard.id });
        this.$store.commit('updateWizard', { model_type: this.model_type })
        this.$router.push(to);
      }
    }
  }
</script>
