<template>
  <div id="WizardSignUp" class="min-height-100 d-flex flex-column">
    <div class="step my-4 text" v-for="(q, key, i) in wizard.steps" :key="`q-${i}`">
      <div class="list-num mt-1" v-if="q.completed" :class="{'completed':q.completed, 'in-progress':q.inProgress && !q.completed}"></div>
      <div class="list-num mt-1" v-else :class="{'in-progress':q.inProgress && !q.completed}">{{ i + 1 }}</div>
      <div class="flex-grow-1 ps-3 fs-5 ">{{ q.name }}</div>
      <button @click="selected(q, key)"   :class="`btn btn-md ${q.completed ? 'btn-success' : !q.inProgress ? 'btn-primary' : 'btn-warning'}`">
        {{ q.completed ? 'Completed' : !q.inProgress ? 'Begin' : 'In Progress' }}
      </button>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'WizardSignUp',
    data() {
      return {
        loading:false,
        wizard: {
          steps: {
            user_type: { name: 'Type of User', target: 'user-type', completed: false, inProgress: false },
            model_name : { name: 'Model Name', target: 'model-name', completed: false, inProgress: false },
            website_url : { name: 'Website URL', target: 'website-url', completed: false, inProgress: false },
            model_type : {name: 'Model Type', target: 'model-type', completed: false, inProgress: false},
            upload_documents: { name: 'Upload Documents', target: 'upload-documents', completed: false, inProgress: false },
            website_scraper: { name: 'Website Scraper', target: 'website-scraper', completed: false, inProgress: false },
            upload_video_audio: { name: 'Upload Video/Audio', target: 'upload-video-audio', completed: false, inProgress: false },
            connect_social_profiles: { name: 'Connect social profiles', target: 'connect-social-profiles', completed: false, inProgress: false },
          },
        },
      }
    },
    mounted() {

    },
    methods: {
      async selected(q, key) {
        q, key
        //const formData = makeFormData({section: key});
        /* let response = await fetch('/wizard:index/start-section', { body: formData, method: 'POST' });
        response.json().then(data => {
          if(data.logout) {
            window.location.href = '/member:auth/logged-off';
            return;
          }
          if(data.error) {
            this.$swal('Error', data.error, 'error');
            return;
          }
          //window.location.href = `/creator-sign-up-${q.target}`;
          this.$router.push(`/creator-sign-up-${q.target}`);
        }); */
      },
    }
  }
</script>

