<template>
  <div>
    <div v-if="currentPlan == 'free'" class="alert alert-info d-flex align-items-center justify-content-between fw-medium p-3" role="alert">
      <div class="small">Free plan doesn't allow you to deploy.</div>
      <button type="button" @click.prevent="$router.push('/pricing')" class="btn btn-sm btn-info text-nowrap ms-2">Upgrade now</button>
    </div>
    <div v-else>
      <div v-if="loading" class="d-flex justify-content-center mt-5">
        <div class="spinner-border"></div>
      </div>
      <template v-else>
        <div class="d-flex justify-content-between mb-2">
          <div>
            <div class="d-flex gap-2">
              <svg width="19" class="mt-2" height="19" viewBox="0 0 19 19" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M8.55556 18L1 13.75V5.25L8.55556 1L16.1111 5.25V9.5" stroke="#FF543E" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/><path d="M8.55542 9.65735L15.5513 5.72217" stroke="#FF543E" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/><path d="M8.55542 9.65747V17.5278" stroke="#FF543E" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/><path d="M8.55546 9.65735L1.55957 5.72217" stroke="#FF543E" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/><path d="M11.3889 15.1667H18" stroke="#FF543E" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/><path d="M15.1667 12.3333L18.0001 15.1666L15.1667 17.9999" stroke="#FF543E" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></svg>
              <h3 class="fw-bold mt-1">Publish</h3>
            </div>
            <div class="text-muted small">
              Publish your AI Assistant and use it outside of the EZAI.io platform
            </div>
          </div>

          <div v-if="deployments.length" class="d-flex justify-content-end">
            <button class="btn btn-sm btn-outline-secondary px-3 fw-bold" @click="$refs.newDeployModal.show()">
              <svg class="me-2" width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M0.75 9C0.75 10.0834 0.963392 11.1562 1.37799 12.1571C1.7926 13.1581 2.40029 14.0675 3.16637 14.8336C3.93245 15.5997 4.84193 16.2074 5.84286 16.622C6.8438 17.0366 7.91659 17.25 9 17.25C10.0834 17.25 11.1562 17.0366 12.1571 16.622C13.1581 16.2074 14.0675 15.5997 14.8336 14.8336C15.5997 14.0675 16.2074 13.1581 16.622 12.1571C17.0366 11.1562 17.25 10.0834 17.25 9C17.25 7.91659 17.0366 6.8438 16.622 5.84286C16.2074 4.84193 15.5997 3.93245 14.8336 3.16637C14.0675 2.40029 13.1581 1.7926 12.1571 1.37799C11.1562 0.963393 10.0834 0.75 9 0.75C7.91659 0.75 6.8438 0.963393 5.84286 1.37799C4.84193 1.7926 3.93245 2.40029 3.16637 3.16637C2.40029 3.93245 1.7926 4.84193 1.37799 5.84286C0.963392 6.8438 0.75 7.91659 0.75 9Z" fill="#DC2631"/><path d="M5 9H13" stroke="white" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/><path d="M9 5V13" stroke="white" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></svg>
              New
            </button>
          </div>
        </div>
        <div class="d-flex align-items-center flex-column " v-if="!deployments || !deployments.length">
          <div class="no-deploy-icon mb-3">
          </div>
          <p class="text-muted text-center">You do not have any published apps for this assistant</p>
          <button type="button" class="btn btn-outline-secondary fw-bold mt-3" @click="$refs.newDeployModal.show()">
            <svg class="me-2" width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M0.75 9C0.75 10.0834 0.963392 11.1562 1.37799 12.1571C1.7926 13.1581 2.40029 14.0675 3.16637 14.8336C3.93245 15.5997 4.84193 16.2074 5.84286 16.622C6.8438 17.0366 7.91659 17.25 9 17.25C10.0834 17.25 11.1562 17.0366 12.1571 16.622C13.1581 16.2074 14.0675 15.5997 14.8336 14.8336C15.5997 14.0675 16.2074 13.1581 16.622 12.1571C17.0366 11.1562 17.25 10.0834 17.25 9C17.25 7.91659 17.0366 6.8438 16.622 5.84286C16.2074 4.84193 15.5997 3.93245 14.8336 3.16637C14.0675 2.40029 13.1581 1.7926 12.1571 1.37799C11.1562 0.963393 10.0834 0.75 9 0.75C7.91659 0.75 6.8438 0.963393 5.84286 1.37799C4.84193 1.7926 3.93245 2.40029 3.16637 3.16637C2.40029 3.93245 1.7926 4.84193 1.37799 5.84286C0.963392 6.8438 0.75 7.91659 0.75 9Z" fill="#DC2631"/><path d="M5 9H13" stroke="white" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/><path d="M9 5V13" stroke="white" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></svg>
            Create One
          </button>
        </div>
        <template v-else>
          <div class="row fw-bold text-uppercase smaller mb-2 gx-1">
            <div class="col">Name</div>
            <div class="col">Type</div>
            <div class="col">Date</div>
          </div>
          <DeployCard v-for="deploy in deployments" :key="deploy.id" :deploy="deploy" class="mb-2" :compact="true" />
        </template>
      </template>
      <NewDeployModal ref="newDeployModal"   />
    </div>
  </div>
</template>


<script>
import DeployCard from '@/components/deploy/deploy-card';
import NewDeployModal from '@/modals/deploy/new-deploy-modal';
import DeployService from '@/api-services/deploy.service';


export default {
  name: 'PublishTab',
  components: {
    DeployCard,
    NewDeployModal
  },

  data() {
    return {
      loading: true,
      currentPlan: '',
      deployments: [],
    }
  },
  computed: {
    assistantId() {
      return this.$store.state.selectedAssistant.id;
    }
  },
  watch: {
    assistantId() {
      this.getDeploymentsForModel();
    }
  },
  mounted() {
    this.getDeploymentsForModel();
  },
  methods: {
    async getDeploymentsForModel(){
      let res = await DeployService.getDeploymentsByModelId({model_id: this.assistantId});
      this.deployments = res.deployments;
      this.loading = false;
    },
  }
}
</script>

