<template>
  <div class="d-flex" v-if="!loading">
    <div class="flex-grow-1 bg-base pb-5 overflow-auto">
      <div v-if="published" class="alert alert-success mb-0 py-2 small d-flex justify-content-center align-items-center">
        <svg class="me-2" width="13" height="12" viewBox="0 0 13 12" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M4.5 8L8.5 4" stroke="currentColor" stroke-width="1.3" stroke-linecap="round" stroke-linejoin="round"/><path d="M5.83301 1.99955L6.14167 1.64222C6.76688 1.0171 7.6148 0.665953 8.49891 0.666016C9.38302 0.666078 10.2309 1.01735 10.856 1.64255C11.4811 2.26776 11.8323 3.11568 11.8322 3.99979C11.8321 4.8839 11.4809 5.73177 10.8557 6.35689L10.4997 6.66622" stroke="currentColor" stroke-width="1.3" stroke-linecap="round" stroke-linejoin="round"/><path d="M7.16709 9.99967L6.90242 10.3557C6.26992 10.9811 5.41628 11.3319 4.52675 11.3319C3.63723 11.3319 2.78359 10.9811 2.15109 10.3557C1.83932 10.0474 1.59182 9.68035 1.42289 9.27577C1.25397 8.87118 1.16699 8.43711 1.16699 7.99867C1.16699 7.56024 1.25397 7.12616 1.42289 6.72158C1.59182 6.31699 1.83932 5.94994 2.15109 5.64167L2.50042 5.33301" stroke="currentColor" stroke-width="1.3" stroke-linecap="round" stroke-linejoin="round"/></svg>
        This API is published
      </div>
      <div v-else class="alert alert-danger mb-0 py-2 small d-flex justify-content-center align-items-center">
        <svg class="me-2" width="13" height="13" viewBox="0 0 13 13" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M4.5 8.5L6 7M8 5L8.5 4.5" stroke="currentColor" stroke-width="1.3" stroke-linecap="round" stroke-linejoin="round"/><path d="M5.83301 2.49955L6.14167 2.14222C6.76688 1.5171 7.6148 1.16595 8.49891 1.16602C9.38302 1.16608 10.2309 1.51735 10.856 2.14255C11.4811 2.76776 11.8323 3.61568 11.8322 4.49979C11.8321 5.3839 11.4809 6.23177 10.8557 6.85689L10.4997 7.16622" stroke="currentColor" stroke-width="1.3" stroke-linecap="round" stroke-linejoin="round"/><path d="M1.5 2L11.5 12" stroke="currentColor" stroke-width="1.3" stroke-linecap="round" stroke-linejoin="round"/><path d="M7.16709 10.4997L6.90242 10.8557C6.26992 11.4811 5.41628 11.8319 4.52675 11.8319C3.63723 11.8319 2.78359 11.4811 2.15109 10.8557C1.83932 10.5474 1.59182 10.1804 1.42289 9.77577C1.25397 9.37118 1.16699 8.93711 1.16699 8.49867C1.16699 8.06024 1.25397 7.62616 1.42289 7.22158C1.59182 6.81699 1.83932 6.44994 2.15109 6.14167L2.50042 5.83301" stroke="currentColor" stroke-width="1.3" stroke-linecap="round" stroke-linejoin="round"/></svg>
        This API is not yet published
      </div>
      <div class="p-4 overflow-auto">
        <form @submit.prevent="saveDeploy" :class="{ 'disabled': saving }">
          <div class="mb-4 d-flex justify-content-between">
            <div>
              <nav aria-label="breadcrumb">
                <ol class="breadcrumb">
                  <li class="breadcrumb-item"><router-link to="/deploy">Publish</router-link></li>
                  <li class="breadcrumb-item active" aria-current="page">New</li>
                </ol>
              </nav>
              <h3 class="fw-bold mb-1">API Endpoint</h3>
            </div>
            <button type="submit" class="btn btn-secondary px-3">
              <div class="spinner-border spinner-border-sm me-2" v-if="saving"></div>
              Publish
            </button>
          </div>
          <div class="mb-3">
            <label for="type" class="mb-1">Type</label>
            <div class="d-flex">
              <div class="form-check mb-0 me-3">
                <input class="form-check-input" type="radio" name="method" id="methodPost" value="POST" v-model="deploy.api_type">
                <label class="form-check-label d-block w-100" for="methodPost">POST</label>
              </div>
              <div class="form-check mb-0">
                <input class="form-check-input" type="radio" name="method" id="methodGet" value="GET" v-model="deploy.api_type">
                <label class="form-check-label d-block w-100" for="methodGet">GET</label>
              </div>
            </div>
          </div>
          <div class="mb-3">
            <label for="name" class="mb-1">Name of API</label>
            <input id="name" v-model="deploy.name" type="text" class="form-control" placeholder="Name of API" />
          </div>
          <div class="mb-3">
            <label class="mb-1">API Url</label>
            <div class="d-flex align-items-center">
              <input type="text" class="form-control flex-grow-1" placeholder="domain" v-model="deploy.subdomain" />
              <div class="px-2">.api.ezai.io/</div>
              <input type="text" class="form-control flex-grow-1" placeholder="url" v-model="deploy.endpoint" />
            </div>
          </div>
          <div class="mb-3">
            <label class="mb-1" for="chatName">Select Model</label>
            <v-select :options="models" label="name" :reduce="model => model.id" class="models-select v-select-small flex-grow-1" v-model="deploy.model_id">
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
          <div class="mb-3">
            <div class="form-check form-switch form-switch-sm">
              <input type="checkbox" id="whiteListDomains" class="form-check-input" v-model="whiteListDomains">
              <label class="form-check-label" for="whiteListDomains">
                White List Domains
              </label>
            </div>
            <div class="text-muted small mb-2">
              Pre-chat forms allow you to gather visitor's information before the chat starts.
            </div>
            <template v-if="whiteListDomains">
              <div class="domains">
                <div class="d-flex align-items-center mb-2" v-for="(domain, i) in whiteList" :key="`domain-${i}`">
                  <input type="text" class="form-control flex-grow-1 me-3" v-model="domain.url" />
                  <button type="button" @click="deleteDomain(i)" tabindex="-1">
                    <svg width="10" height="10" viewBox="0 0 10 10" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M9 1L1 9" stroke="#8390A2" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/><path d="M1 1L9 9" stroke="#8390A2" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></svg>
                  </button>
                </div>
              </div>
              <button @click="addDomain" type="button" id="addDomain" class="btn btn-sm fw-bold px-3 btn-outline-secondary">
                <svg class="text-primary me-2" width="18" height="17" viewBox="0 0 18 17" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M0.75 8.4541C0.75 9.53751 0.963392 10.6103 1.37799 11.6112C1.7926 12.6122 2.40029 13.5216 3.16637 14.2877C3.93245 15.0538 4.84193 15.6615 5.84286 16.0761C6.8438 16.4907 7.91659 16.7041 9 16.7041C10.0834 16.7041 11.1562 16.4907 12.1571 16.0761C13.1581 15.6615 14.0675 15.0538 14.8336 14.2877C15.5997 13.5216 16.2074 12.6122 16.622 11.6112C17.0366 10.6103 17.25 9.53751 17.25 8.4541C17.25 7.3707 17.0366 6.2979 16.622 5.29696C16.2074 4.29603 15.5997 3.38655 14.8336 2.62047C14.0675 1.85439 13.1581 1.2467 12.1571 0.832096C11.1562 0.417494 10.0834 0.204102 9 0.204102C7.91659 0.204102 6.8438 0.417494 5.84286 0.832096C4.84193 1.2467 3.93245 1.85439 3.16637 2.62047C2.40029 3.38655 1.7926 4.29603 1.37799 5.29696C0.963392 6.2979 0.75 7.3707 0.75 8.4541Z" fill="currentColor"/><path d="M5 8.4541H13" stroke="white" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/><path d="M9 4.4541V12.4541" stroke="white" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></svg>
                Add Domain
              </button>
            </template>
          </div>
          <div class="mb-3">
            <label for="apiKey" class="mb-1">API Key</label>
            <div class="text-muted small mb-2">
              Pre-chat forms allow you to gather visitor's information before the chat starts.
            </div>
            <div class="input-group mb-3" :class="{ 'disabled': generatingKey }">
              <input v-model="apiKey" readonly id="apiKey" type="text" class="form-control" placeholder="key" aria-label="api key" aria-describedby="regenerate-key" />
              <button @click="generateRandomKey" class="btn btn-outline-secondary fw-bold" type="button" id="regenerate-key">
                <div class="spinner-border spinner-border-sm me-2" v-if="generatingKey"></div>
                Regenerate
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
    <ColumnResize class="sidebar d-none d-lg-flex flex-column border-start overflow-auto" :maxWidth="900" :width="500" :minWidth="500" :direction="'l'">
      <div class="p-3">
        <div class="d-flex justify-content-between align-center mb-2">
          <div class="fw-bold text-secondary me-3">Code Snippet</div>
          <button type="button">
            <svg class="me-1" width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M4 5.50001C4 5.10218 4.15804 4.72065 4.43934 4.43934C4.72065 4.15804 5.10218 4 5.50001 4H11.5C11.8979 4 12.2794 4.15804 12.5607 4.43934C12.842 4.72065 13 5.10218 13 5.50001V11.5C13 11.8979 12.842 12.2794 12.5607 12.5607C12.2794 12.842 11.8979 13 11.5 13H5.50001C5.10218 13 4.72065 12.842 4.43934 12.5607C4.15804 12.2794 4 11.8979 4 11.5V5.50001Z" stroke="#0F172A" stroke-width="1.2" stroke-linecap="round" stroke-linejoin="round"/><path d="M10 4.00001V2.50001C10 2.10218 9.842 1.72065 9.56069 1.43934C9.27939 1.15804 8.89785 1 8.50003 1H2.50001C2.10218 1 1.72065 1.15804 1.43934 1.43934C1.15804 1.72065 1 2.10218 1 2.50001V8.50003C1 8.89785 1.15804 9.27939 1.43934 9.56069C1.72065 9.842 2.10218 10 2.50001 10H4.00001" stroke="#0F172A" stroke-width="1.2" stroke-linecap="round" stroke-linejoin="round"/></svg>
            Copy code
          </button>
        </div>
        <div class="form-control pb-1 mb-3">
          <div class="minitabs d-flex align-items-center mb-2">
            <div class="me-1">
              <input type="radio" id="excurl" value="curl" name="exType" class="d-none" v-model="exType" />
              <label for="excurl">CURL</label>
            </div>
              <div class="me-1">
              <input type="radio" id="expython" value="python" name="exType" class="d-none" v-model="exType" />
              <label for="expython">Python</label>
            </div>
              <div class="me-1">
              <input type="radio" id="exphp" value="php" name="exType" class="d-none" v-model="exType" />
              <label for="exphp">PHP</label>
            </div>
              <div class="me-1">
              <input type="radio" id="exnode" value="node" name="exType" class="d-none" v-model="exType" />
              <label for="exnode">NodeJS</label>
            </div>
          </div>
          <TextareaAutosize rows="3" :value="example" class="w-100 border-0 p-0 bg-transparent text" />
        </div>
        <div class="form-control pb-1">
          <div class="minitabs d-flex align-items-center mb-2">
            <div class="me-1">
              <input type="radio" id="respjson" value="json" name="respType" class="d-none" v-model="respType" />
              <label for="respjson">JSON</label>
            </div>
          </div>
          <TextareaAutosize rows="3" :value="response" class="w-100 border-0 p-0 bg-transparent text" />
        </div>
      </div>
    </ColumnResize>
  </div>
</template>
  
<script>
  import DeployService from '@/api-services/deploy.service';

  export default {
    name: 'DeployNewEndpoint',
    props: ['id'],
    data() {
      return {
        loading: true,
        saving: false,
        published: false,
        domainTemplate: {
          url: ''
        },
        whiteList: [],
        exType: 'curl',
        respType: 'json',
        apiKey: '',
        deploy: {
          name: '',
          api_type: 'POST',
          subdomain: '',
          endpoint: '',
          model_id: '',
          domains: ''
        },
        whiteListDomains: false,
        generatingKey: true
      }
    },
    computed: {
      example() {
        return `<script>
  var name = prompt("Enter your name:");
  var message = "Hello, " + name + "! Welcome to our website!";
  alert(message);
<\/script>` /* eslint-disable-line */
      },
      response() {
        return `{
  “id”: “dfjimkf3”
  "prompt": “”,
  "completion": “”,
  “token_usage”: 10
}`;
      },
      models() {
        return this.$store.state.assistants || [];
      }
    },
    async mounted() {
      this.loading = true;
      this.generateRandomKey();
      let res = await DeployService.getDeployById({ deploy_id: this.id });
      this.deploy = {
        ...res.deploy,
        api_type: res.deploy.api_type || this.deploy.api_type, 
        subdomain: res.deploy.subdomain || this.deploy.subdomain,
        endpoint: res.deploy.endpoint || this.deploy.endpoint
      };
      this.whiteListDomains = this.deploy.domains ? true : false;
      this.loading = false;
    },
    methods: {
      async saveDeploy() {
        this.saving = true;
        await DeployService.saveDeployApi({
          ...this.deploy,
          deploy_id: this.id,
          domains: this.whiteListDomains ? this.whiteList.map(e => e.url).join(',') : ''
        });
        this.$store.commit('updateDeploy', { ...this.deploy, deploy_id: this.id });
        this.$router.push('/deploy/list');
      },
      generateRandomString(length, randomString="") {
        randomString += Math.random().toString(20).substr(2, length);
        if(randomString.length > length) return randomString.slice(0, length);
        return this.generateRandomString(length, randomString);
      },
      generateRandomKey() {
        this.generatingKey = true;
        DeployService.generateApiKey({ deploy_id: this.id }).then(res => {
          this.apiKey = res.key;
          this.generatingKey = false;
        })
      },
      addDomain() {
        this.whiteList.push({ ...this.domainTemplate });
      },
      deleteDomain(i) {
        this.$delete(this.whiteList, i);
      },
    }
  }
</script>
  
<style lang="scss" scoped>
  .minitabs {
    font-size: 12px;
    color: #6B7280;
    label {
      padding: 2px 5px;
      cursor: pointer;
    }
    input:checked + label {
      background: #E2E8F0;
      color: #0F172A;
      border-radius: 4px;
      cursor: default;
      font-weight: bold;
    }
  }
  .alert {
    border-radius: 0;
    border: none;
    &-danger {
      color: rgba(220, 38, 49, 1);
      background: rgba(220, 38, 49, .05);
    }
    &-success {
      color: rgba(66, 176, 117, 1);
      background: rgba(66, 176, 117, .05);
    }
  }
</style>
