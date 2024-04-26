<template>
  <div class="modal" ref="modal">
    <div class="modal-dialog modal-dialog-centered modal-lg">
      <div class="modal-content">
        <div class="modal-header pb-2">
          <h4 v-if="step == 1" class="modal-title fw-bold">New</h4>
          <div class="d-flex align-items-center" v-else-if="step == 2">
            <a href="#" @click.prevent="step = 1">
              <svg class="me-3" width="8" height="14" viewBox="0 0 8 14" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M7 1L1 7L7 13" stroke="#8390A2" stroke-width="2" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round"/></svg>
            </a>
            <h4 class="modal-title fw-bold text-capitalize">New {{ deploy.type.replace(/_/g, ' ').toUpperCase() }}</h4>
          </div>
          <button type="button" class="btn-close" data-bs-dismiss="modal" ref="closeModelModal" aria-label="Close"></button>
        </div>
        <div class="modal-body pt-2">
          <template v-if="step == 1">
            <div class="row">
              <div class="col-md-6 mb-2 mb-md-4">
                <div class="card p-3" @click="selectDeploy('ai_chatbot')">
                  <div class="flex-grow-1">
                    <div class="icon text-primary">
                      <svg width="20" height="19" viewBox="0 0 20 19" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M16.52 13.34C17.8 12.06 18.6 10.46 18.6 8.7C18.6 4.7 14.68 1.5 9.8 1.5C4.92 1.5 1 4.7 1 8.7C1 12.7 4.92 15.9 9.8 15.9C10.68 15.9 11.48 15.82 12.28 15.58L17 17.5L16.52 13.34Z" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></svg>    
                    </div>
                  </div>
                  <div class="fw-bold fs-6">AI ChatBot</div>
                  <div class="text-muted">
                    Add an AI Chatbot to your website for people to interact with. Comes as a HTML snippet or a complete chat page
                  </div>
                </div>
              </div>
              <div class="col-md-6 mb-2 mb-md-4">
                <div class="card p-3 coming-soon" @click="selectDeploy('api_endpoint')">
                  <div class="flex-grow-1">
                    <div class="icon text-primary">
                      <svg width="22" height="22" viewBox="0 0 22 22" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M1 21.0001L3.464 18.5361" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/><path d="M4.96405 9.96387L3.46405 11.4639C2.52624 12.4017 1.99939 13.6736 1.99939 14.9999C1.99939 16.3261 2.52624 17.5981 3.46405 18.5359C4.40185 19.4737 5.67379 20.0005 7.00005 20.0005C8.32631 20.0005 9.59824 19.4737 10.536 18.5359L12.036 17.0359L4.96405 9.96387Z" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/><path d="M21 1L18.536 3.464" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/><path d="M17.036 12.0357L18.536 10.5357C19.4738 9.59788 20.0006 8.32594 20.0006 6.99968C20.0006 5.67343 19.4738 4.40149 18.536 3.46368C17.5982 2.52588 16.3262 1.99902 15 1.99902C13.6737 1.99902 12.4018 2.52588 11.464 3.46368L9.96399 4.96368L17.036 12.0357Z" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/><path d="M9 10L7 12" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/><path d="M12 13L10 15" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></svg>
                    </div>
                  </div>
                  <div class="fw-bold fs-6">API Endpoint</div>
                  <div class="text-muted">
                    Create an api that you can use in your application
                  </div>
                </div>
              </div>
              <div class="col-md-6 mb-2 mb-md-0">
                <div class="card p-3 coming-soon" @click="selectDeploy('email_bot')">
                  <div class="flex-grow-1">
                    <div class="icon text-primary">
                      <svg width="18" height="15" viewBox="0 0 18 15" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M1.28564 3.21429C1.28564 2.75963 1.46626 2.32359 1.78775 2.0021C2.10924 1.68061 2.54527 1.5 2.99993 1.5H14.9999C15.4546 1.5 15.8906 1.68061 16.2121 2.0021C16.5336 2.32359 16.7142 2.75963 16.7142 3.21429V11.7857C16.7142 12.2404 16.5336 12.6764 16.2121 12.9979C15.8906 13.3194 15.4546 13.5 14.9999 13.5H2.99993C2.54527 13.5 2.10924 13.3194 1.78775 12.9979C1.46626 12.6764 1.28564 12.2404 1.28564 11.7857V3.21429Z" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/><path d="M1.28564 3.21387L8.99993 8.35672L16.7142 3.21387" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></svg>
                    </div>
                  </div>
                  <div class="fw-bold fs-6">Email Agent</div>
                  <div class="text-muted">
                    Create an api that you can use in your application
                  </div>
                </div>
              </div>
              <div class="col-md-6">
                <div class="card p-3 coming-soon" @click="selectDeploy('text bot agent')">
                  <div class="flex-grow-1">
                    <div class="icon text-primary">
                      <svg width="18" height="20" viewBox="0 0 18 20" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M4 5.5H14C14.5304 5.5 15.0391 5.71071 15.4142 6.08579C15.7893 6.46086 16 6.96957 16 7.5V8.5L17 9.5V12.5L16 13.5V16.5C16 17.0304 15.7893 17.5391 15.4142 17.9142C15.0391 18.2893 14.5304 18.5 14 18.5H4C3.46957 18.5 2.96086 18.2893 2.58579 17.9142C2.21071 17.5391 2 17.0304 2 16.5V13.5L1 12.5V9.5L2 8.5V7.5C2 6.96957 2.21071 6.46086 2.58579 6.08579C2.96086 5.71071 3.46957 5.5 4 5.5Z" stroke="#64748B" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/><path d="M7 14.5H11" stroke="#64748B" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/><path d="M5.5 10.5C5.77614 10.5 6 10.2761 6 10C6 9.72386 5.77614 9.5 5.5 9.5C5.22386 9.5 5 9.72386 5 10C5 10.2761 5.22386 10.5 5.5 10.5Z" fill="#64748B" stroke="#64748B" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/><path d="M12.5 10.5C12.7761 10.5 13 10.2761 13 10C13 9.72386 12.7761 9.5 12.5 9.5C12.2239 9.5 12 9.72386 12 10C12 10.2761 12.2239 10.5 12.5 10.5Z" fill="#64748B" stroke="#64748B" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/><path d="M6 5.5L5 1.5" stroke="#64748B" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/><path d="M12 5.5L13 1.5" stroke="#64748B" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></svg>
                    </div>
                  </div>
                  <div class="fw-bold fs-6">Text Bot Agent</div>
                  <div class="text-muted">
                    Create an api that you can use in your application
                  </div>
                </div>
              </div>
            </div>
          </template>
          <template v-if="step == 2">
            <form @submit.prevent="createDeploy" >
              <label for="deployName">
                Name
              </label>
              <input type="text" id="deployName"  v-model="deploy.name" class="form-control mb-3" placeholder="Enter a name for your published app" />
              <div class="mb-3">
                <label class="mb-1" for="chatName">Select Assistant</label>
                <v-select :options="models" v-model="deploy.model_id" label="name" :reduce="model => model.id" class="models-select v-select-small flex-grow-1">
                  <template slot="option" slot-scope="model">
                    <div class="text-capitalize fs-7">{{ model.name }}</div>
                    <div class="smaller text-muted">
                      {{ model.description }}
                    </div>
                    <div class="smaller">
                      {{ model.instruction_count }} Instructions . 
                      {{ model.file_count }} Files . 
                      {{ model.embeddings_count }} Embeddings
                    </div>
                  </template>
                  <template #open-indicator="{ attributes }">
                    <span v-bind="attributes"><svg width="10" height="6" viewBox="0 0 10 6" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M1.625 1.375L5 4.75L8.375 1.375" stroke="#8390A2" stroke-width="1.5" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round"/></svg></span>
                  </template>
                  <span class="small" slot="no-options">Nothing found</span>
                </v-select>
              </div>
              <div class="d-flex justify-content-end mt-4">
                <button class="btn btn-secondary fw-bold btn-lg px-4" type="submit">Continue</button>
              </div>
            </form>
          </template>
        </div>
      </div>
    </div>
  </div>
</template>
  
<script>
  import DeployService from '@/api-services/deploy.service';
  import { Modal } from 'bootstrap';

  export default {
    name: 'NewDeployModal',
    components: {
    },
    data() {
      return {
        step: 1,
        deploy: {
          type: '',
          name: '',
          model_id: '',
        }
      }
    },
    watch: {
    },
    computed: {
      assistant() {
        return this.$store.state.selectedAssistant;
      },
      modal() {
        return new Modal(this.$refs.modal);
      },
      models() {
        return this.$store.state.assistants || [];
      },
    },
    methods: {
      show() {
        this.step = 1;
        this.deploy.model_id = this.assistant.id;
        this.modal.show();
        setTimeout(() => {
          if(this.assistant) {
            this.deploy.name = this.assistant.name;
          }
        }, 500);
      },
      selectDeploy(type) {
        this.step = 2;
        this.deploy.type = type;
      },
      async createDeploy() {
        let res = await DeployService.createDeploy(this.deploy);
        if(res.error){
          this.$swal('Error', res.error, 'error');
          return;
        }
        this.deploy.id = res.deploy_id;
        this.$store.commit('addDeployment', this.deploy);
        this.$router.push(`/deploy/${this.deploy.type.replaceAll(' ', '-').toLowerCase()}/${res.deploy_id}`)
      }
    }
  }
</script>
  
<style scoped lang="scss">
.card {
  height: 163px;
  position: relative;
  cursor: pointer;
  .icon {
    width: 40px;
    height: 40px;
    background: var(--bs-selected);
    border-radius: 8px;
    display: flex;
    align-items: center;
    justify-content: center;
  }
  &.coming-soon {
    color: #64748B !important;
    cursor: default;
    pointer-events: none;
    .icon {
      background: var(--bs-base);
      color: var(--bs-muted-color) !important;
      border: 1px solid var(--bs-muted-color) !important;
    }
    &::after {
      content: 'coming soon';
      text-transform: uppercase;
      font-size: 10px;
      background: var(--bs-primary);
      font-weight: bold;
      color: #fff;
      padding: 3px 6px;
      border-radius: 2px;
      position: absolute;
      top: 7px;
      right: 5px;
    }
  }
}
</style>