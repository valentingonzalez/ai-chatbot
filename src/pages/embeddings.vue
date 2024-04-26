<template>
    <div>
      <div class="d-flex justify-content-center align-items-center" :class="{ 'loading h-100' : loading }" v-if="loading" style="min-height: 50px;">
        <div role="status" class="spinner-border text-primary"><span class="visually-hidden">Loading...</span></div>
      </div>
      <div v-else id="files" class="p-3 p-sm-4">
        <div class="mb-2">
          <router-link class="d-flex mb-3 align-items-center text" to="/files">
            <svg width="20" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18" /></svg>
            <div class="small fw-bold ms-2">Go Back</div>
          </router-link>
          <h6 class="fw-bold mb-1">Embeddings For</h6>
          <h4 class="fw-bold">{{ file.title }}</h4>
          <div class="text-muted text muted mb-3 small">
            In order for an A.I model to determine appropriate responses, embeddings play a vital role. These embeddings transform text into a numerical format that the model can comprehend and utilize to make predictions
          </div>
        </div>

        <div class="d-flex flex-column flex-sm-row align-items-stretch justify-content-between align-items-sm-center py-2 mb-2" v-if="!file.archived">
          <input type="text" class="form-control form-control-lg" placeholder="Search" v-model="search" />
          <button class="d-none btn btn-primary text-nowrap justify-content-center fs-7 mt-2 mt-sm-0 ms-0 ms-sm-2" @click="regenerateModal.show()">Regenerate Embeddings</button>
        </div>
        <div class="alert alert-warning" role="alert" v-if="file.status == 'new' && !file.processed_date">
          <svg v-if="false" width="24" height="24" viewBox="0 0 24 24" class="me-1" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M12 2V6" stroke="#FBBF24" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/><path d="M12 18V22" stroke="#FBBF24" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/><path d="M4.93005 4.92969L7.76005 7.75969" stroke="#FBBF24" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/><path d="M16.24 16.2402L19.07 19.0702" stroke="#FBBF24" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/><path d="M2 12H6" stroke="#FBBF24" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/><path d="M18 12H22" stroke="#FBBF24" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/><path d="M4.93005 19.0702L7.76005 16.2402" stroke="#FBBF24" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/><path d="M16.24 7.75969L19.07 4.92969" stroke="#FBBF24" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>
          Your file is currently being regenerated. The page will auto-refresh every <b>5 seconds</b>
        </div>
        <div class="files overflow-auto" v-else-if="filteredEmbeddings.length">
          <EmbeddingCard :item="item" hideSimilarity="true" v-for="item in filteredEmbeddings" :key="item.id" @delete="onDelete" />
        </div>
        <div v-else style="margin-top: 100px;" class="d-flex justify-content-center align-items-center flex-column">
          <svg width="143" height="185" viewBox="0 0 143 185" fill="none" xmlns="http://www.w3.org/2000/svg"><circle cx="71.5" cy="71.5" r="71.5" fill="#F9FAFB"/><rect x="43.4505" y="70.0427" width="70" height="98" rx="7" transform="rotate(2.5 43.4505 70.0427)" fill="#F3F4F6" stroke="#D1D5DB" stroke-width="2"/><rect x="1.83604" y="64.1801" width="74" height="102" rx="9" transform="rotate(-7.5 1.83604 64.1801)" fill="#F3F4F6" stroke="#D1D5DB" stroke-width="2"/><path d="M4.00222 72.9726C3.42552 68.5921 6.50909 64.5735 10.8896 63.9968L66.4105 56.6873C70.791 56.1106 74.8095 59.1942 75.3862 63.5747L77.3441 78.4464L5.96011 87.8442L4.00222 72.9726Z" fill="#E5E7EB"/><rect x="89.8662" y="58.6426" width="3" height="10" rx="1.5" transform="rotate(82.5 89.8662 58.6426)" fill="#D1D5DB"/><rect x="62.4697" y="42.0781" width="3" height="10" rx="1.5" transform="rotate(-7.5 62.4697 42.0781)" fill="#D1D5DB"/><rect x="80.0474" y="44.8066" width="3" height="10" rx="1.5" transform="rotate(37.5 80.0474 44.8066)" fill="#D1D5DB"/><rect x="13.4224" y="90.8965" width="58" height="4" rx="2" transform="rotate(-7.5 13.4224 90.8965)" fill="#D1D5DB"/><rect x="16.0327" y="110.727" width="58" height="4" rx="2" transform="rotate(-7.5 16.0327 110.727)" fill="#D1D5DB"/><rect x="18.6431" y="130.555" width="58" height="4" rx="2" transform="rotate(-7.5 18.6431 130.555)" fill="#D1D5DB"/><rect x="14.4663" y="98.8281" width="21" height="4" rx="2" transform="rotate(-7.5 14.4663 98.8281)" fill="#D1D5DB"/><rect x="17.0771" y="118.658" width="21" height="4" rx="2" transform="rotate(-7.5 17.0771 118.658)" fill="#D1D5DB"/><rect x="19.6875" y="138.486" width="21" height="4" rx="2" transform="rotate(-7.5 19.6875 138.486)" fill="#D1D5DB"/></svg>
          <div class="text-muted" style="min-height: 50px;">
            <p v-if="file.archived">This File Has Been Deleted</p>
            <p v-else>No Embeddings Proccessed Yet!</p>
          </div>
        </div>
      </div>
      <div class="modal" ref="regenerateModalRef">
        <div class="modal-dialog modal-dialog-centered modal-lg">
          <div class="modal-content">
            <div class="modal-header pb-2">
              <h4 class="modal-title">Regenerate Your Embeddings</h4>
              <button type="button" class="btn-close" data-bs-dismiss="modal" ref="regenerateModalRef" aria-label="Close"></button>
            </div>
            <div class="modal-body pt-2 overflow-auto" style="max-height: 500px;">
              <p class="text-muted">Not happy with how your embeddings were grouped? No worries, set the options below and we can automatically re-embed the file!</p>
              <div class="row">
                <div class="col">
                  <label for="sentenceCount">Sentence Count Per Embedding</label>
                  <div class="text-muted">How many sentences would you like for each embedding. <b>Minimum 2</b></div> 
                  <input type="number" min="2" id="sentenceCount" class="form-control mb-2" v-model="sentences" >
                </div>
              </div>
              <div class="row mb-2">
                <div class="col">
                  <label for="min-token">Minimum Token Size Per Embedding</label>
                  <input type="number" min="100" id="min-token" class="form-control"  aria-describedby="minToken" v-model="min_token_size">
                  <small id="minToken" class="form-text text-muted">
                    Minimum 100
                  </small>
                </div>
                <div class="col">
                  <label for="max-token">Maximum Token Size Per Embedding</label>
                  <input type="number" min="100" class="form-control" aria-describedby="maxToken" v-model="max_token_size">
                  <small id="maxToken" class="form-text text-muted">
                    Minimum 100
                  </small>
                </div>
              </div>
            </div>
            <div class="modal-footer pt-2">
              <button type="button" class="btn px-5 btn-secondary me-2" data-bs-dismiss="modal">Cancel</button>
              <button type="button" class="btn px-5 btn-primary" :disabled="regenerating" @click="regenerate" >
                <div class="spinner-border spinner-border-sm me-2" v-if="regenerating"></div>
                  Submit & Regenerate
              </button>
            </div>
            <div class="mb-2 me-4 text-muted fs-6 text-end">May take up to 5 minutes. </div>
          </div>
        </div>
      </div>
    </div>
  </template>
  
<script>

  import FilesService from '@/api-services/files.service';
  import EmbeddingService from '@/api-services/embedding.service';
  import EmbeddingCard from '@/components/cards/embedding-card';
  import { Modal } from 'bootstrap';

  import config from '@/api-services/_config';
  export default {
    name: 'EmbeddingsModule',
    components: {
      EmbeddingCard
    },
    data() {
      return {
        file: [],
        file_id: this.$route.params.id,
        embeddings: [],
        embeddingText: '',
        editEmbedding: null,
        updating: false,
        loading: true,
        search: '',
        regenerating: false,
        min_token_size: 0,
        max_token_size: 0,
        sentences: 0,
        refreshTime: null
      }
    },
    computed: {
      root() {
        return this.$root.$children[0];
      },
      filteredEmbeddings() {
        let text = this.search.toLowerCase();
        return text ? this.embeddings.filter(e => e.embedding.toLowerCase().includes(text)) : this.embeddings;
      },
      regenerateModal() {
        return new Modal(this.$refs.regenerateModalRef);
      },
    },
    async mounted() {
      this.loading = true;
      await this.getFile();
      await this.getEmbeddings();
      this.loading = false;
    },
    beforeDestroy() {
      clearTimeout(this.refreshTime);
      this.refreshTime = null;
    },
    methods: {
      checkForEmbeddings() {
        this.refreshTime = setTimeout(window.location.reload(), 5000);
      },
      regenerate() {
        this.regenerating = true;
        EmbeddingService.regenerate({
          file_id: this.file_id,
          max_token_size: parseInt(this.max_token_size),
          min_token_size: parseInt(this.min_token_size),
          sentences: parseInt(this.sentences)
        }).then(res => {
          this.regenerating = false;
          if(res.error) {
            this.$toast(res.error, 'error');
            return;
          }
          this.$toast('Embeddings regenerating successfully');
          this.regenerateModal.hide();
          this.file.status = 'new'
          this.file.processed_date = null;
          this.checkForEmbeddings();
        });
      },
      async getFile() {
        return await FilesService.getFile(this.file_id).then(res => {
          if(res.error) {
            this.$swal('Error', res.error);
            return;
          }
          this.file = res.file;
          if(!this.file.title) {
            let re = /(?:\.([^.]+))?$/;
            this.file.title = this.file.id + '_' + this.file.date_added + '.' + re.exec(this.file.file_url)[1];
          }
          if(this.file && this.file.status == 'new' && !this.file.processed_date)
            this.checkForEmbeddings();
        });
      },
      async getEmbeddings() {
        return await EmbeddingService.getEmbeddings({ file_id: this.file_id, id: config.memberId }).then(res => {
          this.embeddings = res.embeddings
        });
      },
      onDelete(id) {
        this.embeddings = this.embeddings.filter(e => e.id != id)
      },
    },
    watch: {
      async '$route.params.id'(val) {
        this.file_id = val;
        this.loading = true;
        await this.getFile();
        await this.getEmbeddings();
        this.loading = false
      }
    }
  }
</script>

<style lang="scss" scoped>
  .embeddingTextArea {
      resize: auto;
  }
</style>
