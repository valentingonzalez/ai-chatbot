<template>
  <div class="wrapper">
    <h3 class="mb-4 fw-bold">Security</h3>
    <div class="lead fw-bold">
      Password
    </div>
    <div class="text-muted mb-3">
      We recommend changing your password regularly to ensure the safety of your account information.
    </div>
    <form @submit.prevent="update">
      <div class="border-bottom border-top py-4">
        <div class="row align-items-center">
          <div class="col-lg-4">
            <label for="oldPassword">Old Password</label>
          </div>
          <div class="col-lg-8">
            <input type="password" class="form-control" id="oldPassword" name="old_password" v-model="oldPassword" />
          </div>
        </div>
      </div>
      <div class="border-bottom py-4">
        <div class="row align-items-center">
          <div class="col-lg-4">
            <label for="password">New Password</label>
          </div>
          <div class="col-lg-8">
            <input type="password" class="form-control" id="password" name="password" v-model="newPassword"/>
          </div>
        </div>
      </div>
      <div class="border-bottom py-4">
        <div class="row align-items-center">
          <div class="col-lg-4">
            <label for="confirmPassword">Confirm Password</label>
          </div>
          <div class="col-lg-8">
            <input type="password" class="form-control" :class="{'is-invalid': !matched}" id="confirmPassword" v-model="confirmPassword"/>
          </div>
        </div>
      </div>
      <div class="d-flex mt-4 justify-content-end">
        <button type="submit" class="btn btn-primary px-5" :disabled="!matched || updating">Update <span class="spinner-border spinner-border-sm" v-if="updating"></span></button>
      </div>
    </form>
  </div>
</template>

<script>
import UserService from '@/api-services/user.service';

  export default {
    name:'userSettingsAccount',
    data() {
      return {
        oldPassword: '',
        newPassword: '',
        confirmPassword: '',
        updating: false,
      }
    },
    computed: {
      matched() {
        return this.confirmPassword == this.newPassword;
      }
    },
    methods: {
      update() {
        this.updating = true;
        UserService.updatePassword({password: this.newPassword, old_password: this.oldPassword, confirm_password: this.confirmPassword}).then((res) => {
          this.updating = false;
          this.$toast(res.error || 'Password updated successfully', res.error ? 'error' : '');
        });
      }
    }
  }
</script>
