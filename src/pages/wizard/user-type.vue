<template>
  <div>
    <div class="h1 fw-bold">
      <TypeWriter>
        🤔 What type of user are you? 🌟
      </TypeWriter>
    </div>
    <div class="d-flex flex-column gap-3 form w-100 mt-5">
      <div class="card py-2 px-3" v-for="type in types" :key="type.value">
        <div class="form-check w-100 mb-0">
          <input class="form-check-input" type="radio" name="option" :id="type.value" :value="type.value" v-model="user_type">
          <label class="form-check-label d-block w-100" :for="type.value">{{ type.label }}</label>
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
        user_type: 'individual',
        types: [
          {value: 'individual', label: 'Individual'},
          {value: 'business', label: 'Business'},
          {value: 'non-profit', label: 'Non-profit'},
          {value: 'marketing-agency', label: 'Marketing/Advertising Agency'},
          {value: 'creator-influencer-coach', label: 'Online Creator/Influencer/Coach'},
          {value: 'artist', label: 'Artist'},
          {value: 'community-group', label: 'Community Group'},
          {value: 'other', label: 'Other'},


        ],
      }
    },
    mounted() {
      this.$logActivity({action: 'view', page: this.$route.name, type: 'userType'});

      this.user_type = this.$store.state.wizard.user_type || this.user_type;
    },
    methods: {
      async next(to) {
        this.$logActivity({action: 'click', page: this.$route.name, type: 'next'});

        await WizardService.saveUserType({ user_type: this.user_type, id: this.$store.state.wizard.id });
        this.$store.commit('updateWizard', { user_type: this.user_type })
        this.$router.push(to);
      }
    }
  }
</script>
