<template>
  <div v-if="currentPlan == 'free'">
    <div  class="alert alert-info d-flex align-items-center justify-content-between p-4 gap-3" role="alert">
      <small>Free plan doesn't allow you to deploy.</small>
      <button type="button" @click.prevent="$router.push('/pricing')" class="btn btn-sm btn-info py-4">Upgrade now</button>
    </div>
  </div>
  <div v-else class="p-4">
    <div v-if="loading" class="d-flex justify-content-center mt-5">
      <div class="spinner-border"></div>
    </div>
    <template v-else>
      <div class="d-flex align-items-center flex-column mt-5" v-if="!deployments || !deployments.length">
        <div class="no-deploy-icon mb-3">
          <svg width="38" height="38" viewBox="0 0 38 38" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M17.1111 36L2 27.5V10.5L17.1111 2L32.2222 10.5V19" stroke="#DC2631" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"/><path d="M17.111 19.3147L31.1028 11.4443" stroke="#DC2631" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"/><path d="M17.111 19.3145V35.0552" stroke="#DC2631" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"/><path d="M17.1111 19.3147L3.11932 11.4443" stroke="#DC2631" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"/><path d="M22.7778 30.333H36" stroke="#DC2631" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"/><path d="M30.3333 24.667L36 30.3337L30.3333 36.0003" stroke="#DC2631" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"/></svg>
        </div>
        <h3 class="fw-bold">You Do Not Have Any Published Assistants</h3>
        <button type="button" class="btn btn-outline-secondary fw-bold mt-3" @click="$refs.newDeployModal.show()">
          <svg class="me-2" width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M0.75 9C0.75 10.0834 0.963392 11.1562 1.37799 12.1571C1.7926 13.1581 2.40029 14.0675 3.16637 14.8336C3.93245 15.5997 4.84193 16.2074 5.84286 16.622C6.8438 17.0366 7.91659 17.25 9 17.25C10.0834 17.25 11.1562 17.0366 12.1571 16.622C13.1581 16.2074 14.0675 15.5997 14.8336 14.8336C15.5997 14.0675 16.2074 13.1581 16.622 12.1571C17.0366 11.1562 17.25 10.0834 17.25 9C17.25 7.91659 17.0366 6.8438 16.622 5.84286C16.2074 4.84193 15.5997 3.93245 14.8336 3.16637C14.0675 2.40029 13.1581 1.7926 12.1571 1.37799C11.1562 0.963393 10.0834 0.75 9 0.75C7.91659 0.75 6.8438 0.963393 5.84286 1.37799C4.84193 1.7926 3.93245 2.40029 3.16637 3.16637C2.40029 3.93245 1.7926 4.84193 1.37799 5.84286C0.963392 6.8438 0.75 7.91659 0.75 9Z" fill="#DC2631"/><path d="M5 9H13" stroke="white" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/><path d="M9 5V13" stroke="white" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></svg>
          Create New
        </button>
      </div>
      <template v-else>
        <div class="mb-3">
          <div class="d-flex justify-content-between">
            <div>
              <h3 class="fw-bold mb-1">Publish</h3>
              <div class="text-muted fs-6">
                Publish your AI Assistant and use it outside of the EZAI.io platform
              </div>
            </div>
            <button class="btn btn-sm btn-outline-secondary px-3 fw-bold" @click="$refs.newDeployModal.show()">
              <svg class="me-2" width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M0.75 9C0.75 10.0834 0.963392 11.1562 1.37799 12.1571C1.7926 13.1581 2.40029 14.0675 3.16637 14.8336C3.93245 15.5997 4.84193 16.2074 5.84286 16.622C6.8438 17.0366 7.91659 17.25 9 17.25C10.0834 17.25 11.1562 17.0366 12.1571 16.622C13.1581 16.2074 14.0675 15.5997 14.8336 14.8336C15.5997 14.0675 16.2074 13.1581 16.622 12.1571C17.0366 11.1562 17.25 10.0834 17.25 9C17.25 7.91659 17.0366 6.8438 16.622 5.84286C16.2074 4.84193 15.5997 3.93245 14.8336 3.16637C14.0675 2.40029 13.1581 1.7926 12.1571 1.37799C11.1562 0.963393 10.0834 0.75 9 0.75C7.91659 0.75 6.8438 0.963393 5.84286 1.37799C4.84193 1.7926 3.93245 2.40029 3.16637 3.16637C2.40029 3.93245 1.7926 4.84193 1.37799 5.84286C0.963392 6.8438 0.75 7.91659 0.75 9Z" fill="#DC2631"/><path d="M5 9H13" stroke="white" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/><path d="M9 5V13" stroke="white" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></svg>
              New
            </button>
          </div>
        </div>
        <div class="row fw-bold text-uppercase smaller mb-2 mx-0">
          <div class="col">Name</div>
          <div class="col">Type</div>
          <div class="col">Assistant</div>
          <div class="col ps-0">Date</div>
        </div>
        <DeployCard v-for="deploy in deployments" :key="deploy.id" :deploy="deploy" class="mb-2" />
      </template>
    </template>
    <NewDeployModal ref="newDeployModal" />
  </div>
</template>
  
<script>
  import DeployCard from '@/components/deploy/deploy-card';
  import NewDeployModal from '@/modals/deploy/new-deploy-modal';

  export default {
    name: 'DeployList',
    components: {
      DeployCard,
      NewDeployModal
    },
    data() {
      return {
        loading: true,
        currentPlan: '',
        /*deployments: [
          {
            id: 0,
            name: 'Deployment 1',
            type: 'API Endpoint',
            model: 'My Model',
            date: '04/07/2023'
          },
          {
            id: 1,
            name: 'Deployment 1',
            type: 'AI Chatbot',
            model: 'My Model',
            date: '04/07/2023'
          },
          {
            id: 2,
            name: 'Deployment 1',
            type: 'Text Bot Agent',
            model: 'My Model',
            date: '04/07/2023'
          },
          {
            id: 3,
            name: 'Deployment 1',
            type: 'Email Agent',
            model: 'My Model',
            date: '04/07/2023'
          }
        ]*/
      }
    },
    computed: {
      deployments() {
        return this.$store.state.deployments;
      }
    },
    async mounted() {
      await this.getCurrentPlan();
      if(!this.deployments) {
        await this.$store.dispatch('getAllDeployments');
      }
      this.loading = false;
    },
    methods: {
      async getCurrentPlan() {
        await this.$store.dispatch('getCurrentPlan');
        this.currentPlan = this.$store.state.currentPlan;
      },
    }
  }
</script>
  
<style lang="scss" scoped>
  .no-deploy-icon {
    background: #F1EBEE;
    height: 80px;
    width: 80px;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 50%;
  }
</style>
