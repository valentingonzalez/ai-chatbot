<template>
  <div class="gap-4 justify-content-start mt-n2 mt-md-0">
    <div class="w-100 w-lg-75">
      <TypeWriter :speed="1" @onComplete="showBeforeWeBegin = true">
        <b>🌟 Welcome to EZAI.io! 🌟</b>
        <br>
        This is a quick wizard to creating AI Assistants specifically tailored to you and your business!
        <br><br>
        Steps? 🤔
        <br><br>
         1. Create An Assistant by providing a name, objective & tone.
        <br><br>
         2. Upload any type of file, and the AI Assistant will improve itself to provide accurate and relevant responses to your documents
        <br><br>
         3. Add YouTube videos by simply copying and pasting the url into our Youtube loader
        <br><br>
         4. Paste your Website Url into our Website Scraper and the AI Assistant will extract the contents and learn from it
        <br><br>
        Let's get started and create an AI Assistant that will take you and your business to the next level! 🚀
      </TypeWriter>
    </div>
    <div v-if="showBeforeWeBegin" class="mt-5 flex-column align-items-center d-none d-md-flex">
      <div class="h3 text-muted mb-4">
        <TypeWriter :speed="1"  @onComplete="showButton = true">
          Before we begin, I have a few questions...
        </TypeWriter>
      </div>
      <transition name="fadeHeight">
        <router-link v-if="showButton" to="/wizard/user-type" type="button" class="btn btn-primary fw-bold d-inline-flex align-items-center px-5 mb-2">
          Next
          <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" clip-rule="evenodd" d="M7.29289 14.7071C6.90237 14.3166 6.90237 13.6834 7.29289 13.2929L10.5858 10L7.29289 6.70711C6.90237 6.31658 6.90237 5.68342 7.29289 5.29289C7.68342 4.90237 8.31658 4.90237 8.70711 5.29289L12.7071 9.29289C13.0976 9.68342 13.0976 10.3166 12.7071 10.7071L8.70711 14.7071C8.31658 15.0976 7.68342 15.0976 7.29289 14.7071Z" fill="white"/></svg>
        </router-link>
      </transition>
    </div>


    <footer class="d-flex justify-content-between align-items-center px-4 py-3 border-top d-md-none">
      <div class="small fw-bold text-muted">
        <TypeWriter :speed="20" :delay="3000" @onComplete="showButton = true">
          Let me take you<br>through a quick tour
        </TypeWriter>
      </div>
      <router-link to="/wizard/user-type" type="button" class="btn btn-primary fw-bold d-inline-flex align-items-center small">
        Start 
        <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" clip-rule="evenodd" d="M7.29289 14.7071C6.90237 14.3166 6.90237 13.6834 7.29289 13.2929L10.5858 10L7.29289 6.70711C6.90237 6.31658 6.90237 5.68342 7.29289 5.29289C7.68342 4.90237 8.31658 4.90237 8.70711 5.29289L12.7071 9.29289C13.0976 9.68342 13.0976 10.3166 12.7071 10.7071L8.70711 14.7071C8.31658 15.0976 7.68342 15.0976 7.29289 14.7071Z" fill="white"/></svg>
      </router-link>
    </footer>
  </div>
</template>

<script>
  export default {
    name: 'WizardWelcome',
    data() {
      return {
        showButton: false,
        showBeforeWeBegin: false
      }
    },
    mounted() {
      this.$logActivity({action: 'view', page: this.$route.name, type: 'wizardWelcome'});
    }
  }
</script>


<style scoped lang="scss">
  footer {
    background: var(--bs-navbar-bg);
    position: fixed;
    width: 100%;
    left: 0;
    bottom: 0;
    height: 76px;
  }
</style>
