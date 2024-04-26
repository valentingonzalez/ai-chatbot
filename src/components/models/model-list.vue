<template>
  <div>
    <div v-if="!models || !models.length" class="d-flex flex-column align-items-center">
      <div class="model-head mt-4 mb-2">
        <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M26.5 30.9999V23.3759C28.0511 21.8879 29.2089 20.0384 29.87 17.9931C30.531 15.9478 30.6746 13.7705 30.2879 11.6562C29.9011 9.54177 28.9962 7.55627 27.6539 5.87739C26.3117 4.19851 24.5742 2.87863 22.5968 2.03591C20.6194 1.19319 18.4639 0.853926 16.3233 1.04848C14.1827 1.24304 12.1237 1.96535 10.3306 3.15075C8.5376 4.33616 7.06647 5.94766 6.04893 7.84102C5.03139 9.73437 4.4992 11.8505 4.5 14V15.5L1.5 20.9999L4.5 22.4999V27.9999C4.5 28.7956 4.81607 29.5587 5.37868 30.1213C5.94129 30.6839 6.70435 30.9999 7.5 30.9999H14C15.8565 30.9999 17.637 30.2625 18.9497 28.9497C20.2625 27.6369 21 25.8565 21 23.9999V15.5" stroke="#64748B" stroke-width="1.5" stroke-miterlimit="10" stroke-linecap="round"/><path d="M24.0007 17.0004C24.9614 16.2045 25.5011 15.1252 25.5011 13.9997C25.5011 12.8742 24.9614 11.7949 24.0007 10.999" stroke="#64748B" stroke-width="1.5" stroke-miterlimit="10" stroke-linecap="round"/><path d="M17.9994 17.0004C17.0387 16.2045 16.499 15.1252 16.499 13.9997C16.499 12.8742 17.0387 11.7949 17.9994 10.999" stroke="#64748B" stroke-width="1.5" stroke-miterlimit="10" stroke-linecap="round"/></svg>
      </div>
      <h4 class="fw-bold">No assistants created</h4>
      <div class="text-muted text-center">
        You can create and train custom<br>models with your data
      </div>
      <button v-if="!loading" class="btn btn-outline-secondary fw-bold px-3 btn-sm mt-2" @click="openAddModelModal">
        <svg class="me-2" width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M0.75 9C0.75 10.0834 0.963392 11.1562 1.37799 12.1571C1.7926 13.1581 2.40029 14.0675 3.16637 14.8336C3.93245 15.5997 4.84193 16.2074 5.84286 16.622C6.8438 17.0366 7.91659 17.25 9 17.25C10.0834 17.25 11.1562 17.0366 12.1571 16.622C13.1581 16.2074 14.0675 15.5997 14.8336 14.8336C15.5997 14.0675 16.2074 13.1581 16.622 12.1571C17.0366 11.1562 17.25 10.0834 17.25 9C17.25 7.91659 17.0366 6.8438 16.622 5.84286C16.2074 4.84193 15.5997 3.93245 14.8336 3.16637C14.0675 2.40029 13.1581 1.7926 12.1571 1.37799C11.1562 0.963393 10.0834 0.75 9 0.75C7.91659 0.75 6.8438 0.963393 5.84286 1.37799C4.84193 1.7926 3.93245 2.40029 3.16637 3.16637C2.40029 3.93245 1.7926 4.84193 1.37799 5.84286C0.963392 6.8438 0.75 7.91659 0.75 9Z" fill="#DC2631"/><path d="M5 9H13" stroke="white" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/><path d="M9 5V13" stroke="white" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></svg>
        Create Model
      </button>
    </div>
    <div v-else>
      <div v-if="currentPlan == 'free'" class="alert alert-info d-flex align-items-center justify-content-between gap-3" role="alert">
        <small>Free plan allows you to use up to 3 assistants.</small>
        <button type="button" @click.prevent="$router.push('/pricing')" class="btn btn-sm btn-info py-4">Upgrade now</button>
      </div>
      <div v-else-if="currentPlan == 'starter'" class="alert alert-info d-flex align-items-center justify-content-between gap-3" role="alert">
        <small>Starter plan allows you to use up to 10 assistants.</small>
        <button type="button" @click.prevent="$router.push('/pricing')" class="btn btn-sm btn-info py-4">Upgrade now</button>
      </div>
      <div class="d-flex justify-content-between align-items-end mb-2">
        <h4 class="mb-0">AI Assistants <span v-if="filteredAssistants.length">({{ filteredAssistants.length }})</span></h4>
        <button v-if="!loading" class="btn btn-outline-secondary fw-bold px-3 btn-sm" @click="openAddModelModal">
          <svg class="me-2" width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M0.75 9C0.75 10.0834 0.963392 11.1562 1.37799 12.1571C1.7926 13.1581 2.40029 14.0675 3.16637 14.8336C3.93245 15.5997 4.84193 16.2074 5.84286 16.622C6.8438 17.0366 7.91659 17.25 9 17.25C10.0834 17.25 11.1562 17.0366 12.1571 16.622C13.1581 16.2074 14.0675 15.5997 14.8336 14.8336C15.5997 14.0675 16.2074 13.1581 16.622 12.1571C17.0366 11.1562 17.25 10.0834 17.25 9C17.25 7.91659 17.0366 6.8438 16.622 5.84286C16.2074 4.84193 15.5997 3.93245 14.8336 3.16637C14.0675 2.40029 13.1581 1.7926 12.1571 1.37799C11.1562 0.963393 10.0834 0.75 9 0.75C7.91659 0.75 6.8438 0.963393 5.84286 1.37799C4.84193 1.7926 3.93245 2.40029 3.16637 3.16637C2.40029 3.93245 1.7926 4.84193 1.37799 5.84286C0.963392 6.8438 0.75 7.91659 0.75 9Z" fill="#DC2631"/><path d="M5 9H13" stroke="white" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/><path d="M9 5V13" stroke="white" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></svg>
          Create Assistant
        </button>
      </div>
      <div class="form-control search d-flex p-1 ps-0 mb-3">
        <input v-if="!loading" v-model="filter" type="search" class="bg-transparent border-0 flex-grow-1" placeholder="Search Assistants" />
        <ModelSort @onModelSort="selectSort" class="ms-2" />
      </div>
      <div class="mt-1">
        <div class="d-flex align-items-center justify-content-center" v-if="loading">
          <div class="spinner-border mt-2"></div>
        </div>
        <template v-else>
          <ModelCard :showDetails="showDetails" class="mb-2" v-for="assistant in filteredAssistants" :model="assistant" :key="assistant.id" @onSelect="selectAssistant" @onDelete="deleteAssistant" />
        </template>
      </div>
    </div>
    <AddModelModal @onAdd="selectAssistant" ref="addModelModal" />
  </div>
</template>

<script>
  import ModelCard from '@/components/models/model-card';
  import ModelsService from '@/api-services/models.service';
  import ModelSort from '@/components/models/model-sort.vue'
  import AddModelModal from '@/modals/models/add-model-modal.vue';
  import { EventBus } from '@/main';

  export default {
    name: 'ModelList',
    components: {
      ModelCard,
      ModelSort,
      AddModelModal
    },
    props: {
      showDetails: {
        default: false
      }
    },
    data() {
      return {
        filter: '',
        selectedModel: true,
        selectedSort: "",
        loading: true,
        currentPlan:'',
      }
    },
    computed: {
      nodeUrl() {
        return this.$root.$children[0].nodeUrl;
      },
      sessionId() {
        return this.$route.query.session;
      },
      assistants() {
        return this.$store.state.assistants;
      },
      filteredAssistants() {
        if(!this.assistants) return [];
        return this.assistants.filter(e => e.name.toLowerCase().includes(this.filter.toLowerCase())).sort((a,b) => {
          if(this.selectedSort?.value == 'title') {
            return this.selectedSort.order == 'ASC' ? a.name.localeCompare(b.name) : b.name.localeCompare(a.name)
          } else if(this.selectedSort?.value == 'date') {
            return this.selectedSort.order == 'ASC' ? new Date(a.date_added) - new Date(b.date_added) : new Date(b.date_added) - new Date(a.date_added);
          }
        });
      }
    },
    async mounted() {
      if(!this.assistants) {
        await this.$store.dispatch('getAssistants');
      }
      await this.getCurrentPlan();
      this.loading = false;
    },
    methods: {
      async getCurrentPlan() {
        await this.$store.dispatch('getCurrentPlan');
        this.currentPlan = this.$store.state.currentPlan;
      },
      selectSort(name) {
        this.selectedSort = name;
      },
      selectAssistant(id) {
        this.$logActivity({action: 'click', page: this.$route.name, type: 'selectAssistant', ref_id: id});
        EventBus.$emit('selectAssistant', this.assistants.find(e => e.id === id));
      },
      deleteAssistant(assistant) {
        this.$logActivity({action: 'click', page: this.$route.name, type: 'deleteModel', ref_id: assistant.id});

        this.$swal({
          icon: 'warning',
          title: 'Warning!',
          html: 'Are you sure you want to delete this Assistant?<div><small>This action cannot be undone!</small></div>',
          showCancelButton: true
        }).then(res => {
          if(res.isConfirmed) {
            ModelsService.delete({ model_id: assistant.id }).then(this.$store.commit('deleteModel', assistant.id));
            this.$toast('Assistant successfully deleted');
          }
        });
      },
      openAddModelModal() {
        if(this.currentPlan == 'free' && this.assistants.length >= 3) {
          return this.$swal('','You can’t add more then 3 assistants on the Free plan, please upgrade your Plan or delete one Assistant','warning');
        }else if(this.currentPlan == 'starter' && this.assistants.length >= 10) {
          return this.$swal('','You can’t add more then 10 assistants on the Starter plan, please upgrade your Plan or delete one Assistant','warning');
        }else if(this.currentPlan == 'premium' && this.assistants.length >= 100) {
          return this.$swal('','You can’t add more then 100 assistants on the Premium plan, please upgrade your Plan or delete one Assistant','warning');
        }
        this.$refs.addModelModal.show();
      }
    }
  }
</script>

<style scoped lang="scss">
  .model-head {
    height: 64px;
    width: 64px;
    border-radius: 64px;
    background: rgba(100, 116, 139, .1);
    display: flex;
    align-items: center;
    justify-content: center;
  }
</style>