<template>
  <div class="wrapper">
    <h3 class="mb-4 fw-bold">Account</h3>
    <div class="lead fw-bold">
      Profile
    </div>
    <div class="text-muted mb-3">
      This information will be displayed publicly so be careful what you share. 
    </div>

    <form @submit.prevent="() => {}">
      <div class="border-bottom border-top py-4">
        <div class="row align-items-center">
          <div class="col-lg-4">
            <label for="firstName">First name</label>
          </div>
          <div class="col-lg-8">
            <input type="text" class="form-control" id="firstName" name="first_name" v-model="firstName" />
          </div>
        </div>
      </div>
      <div class="border-bottom py-4">
        <div class="row align-items-center">
          <div class="col-lg-4">
            <label for="lastName">Last name</label>
          </div>
          <div class="col-lg-8">
            <input type="text" class="form-control" id="lastName" name="last_name"  v-model="lastName" />
          </div>
        </div>
      </div>
      <div class="border-bottom py-4">
        <div class="row align-items-center">
          <div class="col-lg-4">
            <label for="email">Email Address</label>
          </div>
          <div class="col-lg-8">
            <input type="email" class="form-control" id="email" name="email"  v-model="email"/>
          </div>
        </div>
      </div>

      <div class="d-flex mt-4 justify-content-end">
        <button type="button" class="btn btn-secondary px-5 me-3">Cancel</button>
        <button type="submit" class="btn btn-primary px-5" :disabled="saving" @click="updateInfo">
          Save <span class="spinner-border spinner-border-sm" v-if="saving"></span>
        </button>
      </div>
    </form>
    <button type="button" class="btn btn-primary mt-5" @click.prevent="deleteAccountInfo">
      Delete my account
    </button>
  </div>
</template>

<script>
import UserService from '@/api-services/user.service';
import AuthService from '@/api-services/auth.service';
import config from '@/api-services/_config';

  export default {
    name:'userSettingsAccount',
    data() {
      return {
        user: {},
        firstName: '',
        lastName: '',
        email: '',
        saving: false
      }
    },
    mounted() {
      this.getData();
    },
    methods: {
      getData() {
        UserService.getUserInfo().then(e => {
          this.user = e.member;
          this.firstName = this.user.name ? this.user.name.split(' ')[0] : '';
          this.lastName = this.user.name ? this.user.name.split(' ')[1] : '';
          this.email = this.user.email;
        });
      },
      updateInfo() {
        this.saving = true;
        UserService.updateUserInfo({email: this.email, name: this.firstName + ' ' + this.lastName}).then(() => {
          this.saving = false;
        });
      },
      deleteAccountInfo(){
        this.$swal({
          title: "Are you sure you want to delete your account?",
          text: "This will make your account permanently unusable and you will not be able to register with the same email address. Please keep in mind that this will delete all your information and you will not be able in the future to reactivate your account, or to retrieve any conversation or information you have used.",
          icon: "warning",
          showCancelButton: true,
          cancelButtonText: 'No, Cancel',
          confirmButtonText: 'Yes, delete my account!',
        }).then(res => {
          if(res.isConfirmed) {
            AuthService.deleteMemberInformation().then((response)=> {
              if(response.success) {
                  document.cookie = "ezai_auth_session_cookie=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
                  window.location = config.urlAuth;
                }
              });
            }
          })
      }
    }
  }
</script>