<template>
  <router-link class="text d-block" :to="`/deploy/${deploy.type.replaceAll(' ', '-').toLowerCase()}/${deploy.id}`" :class="{ 'compact': compact }">
    <div class="card p-2" v-if="deploy">
      <div class="row align-items-center" :class="{ 'gx-1': compact }">
        <div class="col text-truncate d-flex align-items-center text-muted small">
          <div class="icon text-primary me-2" v-html="icons[deploy.type.toLowerCase()]"></div>
          <div class="text-truncate">
            {{ deploy.name || 'no name' }}
          </div>
        </div>
        <div class="col text-truncate text-muted small">
          {{ deploy.type.replace(/_/g, ' ').toUpperCase() }}
        </div>
        <div class="col text-truncate" v-if="!compact">
          <div class="text-truncate">
            {{ model.name }}
          </div>
        </div>
        <div class="col text-truncate small text-muted d-flex align-items-center justify-content-between" :class="{ 'smaller': compact }">
         {{ date }}
         <div class="dropdown">
            <button type="button" id="deployOptions" data-bs-toggle="dropdown" aria-expanded="false">
              <svg width="16" height="4" viewBox="0 0 16 4" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M1 2C1 2.26522 1.10536 2.51957 1.29289 2.70711C1.48043 2.89464 1.73478 3 2 3C2.26522 3 2.51957 2.89464 2.70711 2.70711C2.89464 2.51957 3 2.26522 3 2C3 1.73478 2.89464 1.48043 2.70711 1.29289C2.51957 1.10536 2.26522 1 2 1C1.73478 1 1.48043 1.10536 1.29289 1.29289C1.10536 1.48043 1 1.73478 1 2Z" fill="currentColor" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round"/><path d="M7 2C7 2.26522 7.10536 2.51957 7.29289 2.70711C7.48043 2.89464 7.73478 3 8 3C8.26522 3 8.51957 2.89464 8.70711 2.70711C8.89464 2.51957 9 2.26522 9 2C9 1.73478 8.89464 1.48043 8.70711 1.29289C8.51957 1.10536 8.26522 1 8 1C7.73478 1 7.48043 1.10536 7.29289 1.29289C7.10536 1.48043 7 1.73478 7 2Z" fill="currentColor" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round"/><path d="M13 2C13 2.26522 13.1054 2.51957 13.2929 2.70711C13.4804 2.89464 13.7348 3 14 3C14.2652 3 14.5196 2.89464 14.7071 2.70711C14.8946 2.51957 15 2.26522 15 2C15 1.73478 14.8946 1.48043 14.7071 1.29289C14.5196 1.10536 14.2652 1 14 1C13.7348 1 13.4804 1.10536 13.2929 1.29289C13.1054 1.48043 13 1.73478 13 2Z" fill="currentColor" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round"/></svg>
            </button>
            <ul class="dropdown-menu fs-7" aria-labelledby="deployOptions" role="menu">
              <li><a @click.prevent="deleteDeploy" href="#" class="dropdown-item">Delete</a></li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  </router-link>
</template>

<script>
  import moment from 'moment';
  import DeployService from '@/api-services/deploy.service';

  export default {
    name: 'DeployCard',
    props: {
      deploy: {
        default: null
      },
      compact: {
        default: false
      }
    },
    data() {
      return {
        icons: {
          'ai_chatbot': '<svg width="20" height="19" viewBox="0 0 20 19" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M16.52 13.34C17.8 12.06 18.6 10.46 18.6 8.7C18.6 4.7 14.68 1.5 9.8 1.5C4.92 1.5 1 4.7 1 8.7C1 12.7 4.92 15.9 9.8 15.9C10.68 15.9 11.48 15.82 12.28 15.58L17 17.5L16.52 13.34Z" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></svg>',
          'api_endpoint': '<svg width="22" height="22" viewBox="0 0 22 22" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M1 21.0001L3.464 18.5361" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/><path d="M4.96405 9.96387L3.46405 11.4639C2.52624 12.4017 1.99939 13.6736 1.99939 14.9999C1.99939 16.3261 2.52624 17.5981 3.46405 18.5359C4.40185 19.4737 5.67379 20.0005 7.00005 20.0005C8.32631 20.0005 9.59824 19.4737 10.536 18.5359L12.036 17.0359L4.96405 9.96387Z" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/><path d="M21 1L18.536 3.464" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/><path d="M17.036 12.0357L18.536 10.5357C19.4738 9.59788 20.0006 8.32594 20.0006 6.99968C20.0006 5.67343 19.4738 4.40149 18.536 3.46368C17.5982 2.52588 16.3262 1.99902 15 1.99902C13.6737 1.99902 12.4018 2.52588 11.464 3.46368L9.96399 4.96368L17.036 12.0357Z" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/><path d="M9 10L7 12" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/><path d="M12 13L10 15" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></svg>',
          'email-agent': '<svg width="18" height="15" viewBox="0 0 18 15" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M1.28564 3.21429C1.28564 2.75963 1.46626 2.32359 1.78775 2.0021C2.10924 1.68061 2.54527 1.5 2.99993 1.5H14.9999C15.4546 1.5 15.8906 1.68061 16.2121 2.0021C16.5336 2.32359 16.7142 2.75963 16.7142 3.21429V11.7857C16.7142 12.2404 16.5336 12.6764 16.2121 12.9979C15.8906 13.3194 15.4546 13.5 14.9999 13.5H2.99993C2.54527 13.5 2.10924 13.3194 1.78775 12.9979C1.46626 12.6764 1.28564 12.2404 1.28564 11.7857V3.21429Z" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/><path d="M1.28564 3.21387L8.99993 8.35672L16.7142 3.21387" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></svg>',
          'text-bot-agent': '<svg width="18" height="20" viewBox="0 0 18 20" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M4 5.5H14C14.5304 5.5 15.0391 5.71071 15.4142 6.08579C15.7893 6.46086 16 6.96957 16 7.5V8.5L17 9.5V12.5L16 13.5V16.5C16 17.0304 15.7893 17.5391 15.4142 17.9142C15.0391 18.2893 14.5304 18.5 14 18.5H4C3.46957 18.5 2.96086 18.2893 2.58579 17.9142C2.21071 17.5391 2 17.0304 2 16.5V13.5L1 12.5V9.5L2 8.5V7.5C2 6.96957 2.21071 6.46086 2.58579 6.08579C2.96086 5.71071 3.46957 5.5 4 5.5Z" stroke="#64748B" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/><path d="M7 14.5H11" stroke="#64748B" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/><path d="M5.5 10.5C5.77614 10.5 6 10.2761 6 10C6 9.72386 5.77614 9.5 5.5 9.5C5.22386 9.5 5 9.72386 5 10C5 10.2761 5.22386 10.5 5.5 10.5Z" fill="#64748B" stroke="#64748B" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/><path d="M12.5 10.5C12.7761 10.5 13 10.2761 13 10C13 9.72386 12.7761 9.5 12.5 9.5C12.2239 9.5 12 9.72386 12 10C12 10.2761 12.2239 10.5 12.5 10.5Z" fill="#64748B" stroke="#64748B" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/><path d="M6 5.5L5 1.5" stroke="#64748B" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/><path d="M12 5.5L13 1.5" stroke="#64748B" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></svg>'
        }
      }
    },
    methods: {
      deleteDeploy() {
        this.$swal({
          title: 'Warning',
          text: 'Do you want to delete this deploy?',
          icon: 'warning',
          showDenyButton: false,
          showCancelButton: true,
          confirmButtonText: 'Delete',
          denyButtonText: 'Cancel',
        }).then((result) => {
          if(result.isConfirmed) {
            DeployService.deleteDeploy({ deploy_id: this.deploy.id });
            this.$store.state.deployments = this.$store.state.deployments.filter(e => e.id != this.deploy.id);
          }
        });
      }
    },
    computed: {
      date() {
        return moment(this.deploy.date_added).format('MM/DD/YYYY');
      },
      model() {
        return this.$store.state.selectedAssistant;
      }
    }
  }
</script>

<style lang="scss" scoped>
  .icon {
    width: 40px;
    min-width: 40px;
    height: 40px;
    background: var(--bs-selected);
    border-radius: 8px;
    display: flex;
    align-items: center;
    justify-content: center;
  }
  .compact {
    .icon {
      width: 30px;
      min-width: 30px;
      height: 30px;
    }
  }
</style>