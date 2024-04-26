<template>
    <div >
      <div class="w-100 w-lg-75" >
        <h1 class="fw-bold text-center">
          <TypeWriter @onComplete="showSteps = true">
            Do you have a website?
          </TypeWriter>
        </h1>
        <TypeWriter :speed="2" v-if="showSteps" class="mb-4" @onComplete="showText = true">
          To train your AI model using your own website or any website you'd like the model to be knowledgeable about, follow these simple steps: <br>
          1️⃣ Copy the URL of the website you want to use. <br>
          2️⃣ Paste the URL into the provided field below. <br>
          3️⃣ Select all the relevant links present on that specific URL that you want to include in the model. <br>
          🙌 And that's it! By following these steps, you're ensuring your model is well-informed and able to provide accurate insights based on the chosen website content.
        </TypeWriter>
        <TypeWriter :speed="2" class="mt-4" v-if="showText" @onComplete="showWebsite = true">
          By sharing your website 🌐, EZ-AI can better understand your needs and provide tailored solutions for your business. 🎯
        </TypeWriter>
      </div>
      <div class="d-flex flex-column form w-100 mt-3" style="margin-bottom:4rem !important"  v-if="showWebsite">
        <label for="model-name" class="form-label h4">Enter URL</label>
        <input @blur="addHTTP" placeholder="Website Url" type="text" class="form-control form-control-lg" id="model-name" v-model="website_url">
      </div>
      <div v-if="showWarning" class="alert alert-warning mt-1">
        This does not appear to be a valid url, please try again.
      </div>
    </div>
  </template>
  
  <script>
  import WizardService from '@/api-services/wizard.service';
  export default {
    name: 'WizardWebsiteUrl',
    props: {
      skippable: { default: false }
    },
    data() {
      return {
        website_url: '',
        showText: false,
        showSteps: false,
        showWarning: false,
        showWebsite: false,
      }
    },
    computed:{
      validated_website_url(){
        return this.website_url.split('https://').join('').trim();
      }
    },
    mounted() {
      this.$logActivity({action: 'view', page: this.$route.name, type: 'website'});

      this.website_url = this.$store.state.wizard.website_url || this.website_url;
    },
    methods: {
      addHTTP() {
        this.$logActivity({action: 'click', page: this.$route.name, type: 'addWebsite'});
        this.showWarning = false;
        if(!/^https*:\/\//.test(this.website_url)) {
            this.website_url = `https://${this.website_url}`;
          }
      },
      async next(to) {
        this.$logActivity({action: 'click', page: this.$route.name, type: 'next'});
        if(!this.validated_website_url) {
          this.$swal('', 'Please, add a website URL to continue', 'error');
          return;
        }
        await WizardService.saveWebsite({ website_url: this.website_url, id: this.$store.state.wizard.id });
        this.$store.commit('updateWizard', { website_url: this.website_url });
        this.$router.push(to);
      },
      skip(to) {
        this.$logActivity({action: 'click', page: this.$route.name, type: 'skip'});
        this.$router.push(to);
      }
    },
  }
  </script>