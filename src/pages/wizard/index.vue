<template>
  <div class="d-flex flex-column">
    <WizardNav :crumbs="crumbs" />
    <div v-if="wizard" class="wizard-content container-lg container-wizard py-md-4 flex-grow-1 d-flex align-items-center justify-content-center flex-column">
      <div class="wizard card mx-md-0 mt-3 mt-md-0 mb-5 w-100">
        <div class="p-3 p-md-5 flex-grow-1 overflow-auto">
          <router-view ref="routerView" class="flex-grow-1 d-flex flex-column align-items-center" />
        </div>
        <WizardFooter :loading="loading" :crumbs="crumbs" v-if="$route.name != 'wizard-welcome'" @next="next" @skip="skip" />
      </div>
    </div>
  </div>
</template>

<script>
  //import WizardHeader from '@/components/wizard/header';
  import WizardFooter from '@/components/wizard/footer';
  import WizardNav from '@/components/wizard/nav';
  import WizardService from '@/api-services/wizard.service';

  export default {
    name: 'WizardPage',
    components: {
      //WizardHeader,
      WizardFooter,
      WizardNav
    },
    props: {
      skippable: { default: false }
    },
    data() {
      return {
        wizard: null,
        crumbs: [
          { name: 'welcome' },
          { name: 'user-type' },
          { name: 'model-name' },
       //   { name: 'website-url' },
       //   { name: 'model-type' },
          { name: 'documents-type' }
        ],
        loading: false
      }
    },
    computed: {
    },
    async mounted() {
      let resp = await WizardService.getWizard();
      if(!resp.wizard) {
        resp = await WizardService.newWizard();
        resp = {id : resp.wizard_id};
      } else {
        resp = resp.wizard;
      }
      this.wizard = resp;
      this.$store.commit('setWizard', this.wizard);
    },
    methods: {
      async next(to) {
        this.loading = true;
        await this.$refs.routerView.next(to);
        this.loading = false;
      },
      async skip(to) {
        this.loading = true;
        await this.$refs.routerView.skip(to);
        this.loading = false;
      }
    }
  }
</script>

<style scoped lang="scss">
  :deep(.container-wizard) {
    max-width: 1116px;
  }
  .wizard-content {
    max-height: calc(var(--vh, 1vh) * 100 - 50px);
    overflow: auto;
  }
  :deep(.form) {
    max-width: 547px;
  }
  .wizard {
    @media (max-width: 767px) {
      background: none;
      border: none;
      :deep(h1), :deep(.h1) {
        font-size: 26px !important;
      }
    }
    @media (min-width: 768px) {
      min-height: 700px;
    }
  }
</style>