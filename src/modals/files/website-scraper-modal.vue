<template>
  <div class="modal" ref="modal" tabindex="-1">
    <div class="modal-dialog modal-dialog-centered modal-lg">
      <div class="modal-content">
        <div class="modal-header pb-2 flex-column">
          <div class="d-flex w-100 align-items-center">
            <h5 class="modal-title">Website Scraper</h5>
            <button type="button" class="btn-close" data-bs-dismiss="modal" ref="closeModelModal" aria-label="Close" @click="clearScrap"></button>
          </div>
          <div class="w-100 mt-1">
            Simply add your website url below and EZ-AI will automatically scrap the website, extract the links and allow you to select which pages you'd like to include in your A.I Model.
          </div>
        </div>
        <div class="modal-body pt-2">
          <div>
            <label class="fw-medium">Enter URL</label>
            <form class="d-flex" @submit.prevent="submitWebsite">
              <div class="flex-grow-1 flex-column">
                <input :disabled="scraping" v-model="url" id="url" type="text" class="form-control flex-grow-1" placeholder="Enter URL of Website" />
                <!--<div v-if="url" class="d-flex mt-2">
                  <small class="text-muted" style="cursor:pointer;text-decoration: underline;" @click="clearScrap">Clear url</small>
                </div>-->
              </div>
              <div class="ms-1 ms-md-2 d-flex flex-column">
                <button :disabled="processing" v-if="!scraping" type="submit" class="btn btn-secondary px-md-4 justify-content-center">
                  Start
                </button>
                <button v-else type="button" class="btn btn-outline-secondary px-4 justify-content-center" @click.prevent.stop="stopScraping">
                  Stop
                </button>
              </div>
            </form>
            <div class="d-flex align-items-center text-danger fw-bold small mt-3" v-if="error">
              <svg width="16" class="me-1" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2.5" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z" /></svg>
              {{ error }}
            </div>
          </div>
          <!-- v-if="processing || scraping || (scraps && scraps.length)" -->
          <div>
            <div v-if="scraping || processing || filteredScraps.length" class="d-flex justify-content-between align-items-center">
              <div class="d-none">
                <span class="text-primary">Total Links Found: <b>{{ filteredScraps.length }}</b></span>
                <div class="small text-muted"><em>Only 25 Links Allowed Per Website. Contact Support For More.</em></div>
              </div>
              <button @click="cardType = cardType == 'card' ? 'list' : 'card'" class="btn btn-sm d-none btn-outline-primary">
                <svg v-if="cardType == 'list'" class="me-2" width="14" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor"><path fill-rule="evenodd" d="M4.25 2A2.25 2.25 0 002 4.25v2.5A2.25 2.25 0 004.25 9h2.5A2.25 2.25 0 009 6.75v-2.5A2.25 2.25 0 006.75 2h-2.5zm0 9A2.25 2.25 0 002 13.25v2.5A2.25 2.25 0 004.25 18h2.5A2.25 2.25 0 009 15.75v-2.5A2.25 2.25 0 006.75 11h-2.5zm9-9A2.25 2.25 0 0011 4.25v2.5A2.25 2.25 0 0013.25 9h2.5A2.25 2.25 0 0018 6.75v-2.5A2.25 2.25 0 0015.75 2h-2.5zm0 9A2.25 2.25 0 0011 13.25v2.5A2.25 2.25 0 0013.25 18h2.5A2.25 2.25 0 0018 15.75v-2.5A2.25 2.25 0 0015.75 11h-2.5z" clip-rule="evenodd" /></svg>
                <svg v-else class="me-2" width="14" viewBox="0 0 14 10" fill="none" xmlns="http://www.w3.org/2000/svg"><rect x="3" width="11" height="2" rx="1" fill="currentColor"/><rect x="3" y="4" width="11" height="2" rx="1" fill="currentColor"/><rect x="3" y="8" width="11" height="2" rx="1" fill="currentColor"/><rect width="2" height="2" rx="1" fill="currentColor"/><rect y="4" width="2" height="2" rx="1" fill="currentColor"/><rect y="8" width="2" height="2" rx="1" fill="currentColor"/></svg>
                {{ cardType == 'list' ? 'Cards' : 'List' }}
              </button>
            </div>
            <div v-if="scraping || processing" class="mt-2 mb-3">
              <div class="d-flex align-items-center">
                <div class="spinner-border spinner-border-xs me-2"></div>
                <div class="fw-bold">{{ processing ? 'Processing' : 'Analyzing Website' }}</div>
              </div>
              <div class="small" v-if="scraping">This may take a few minutes, please do not close this window.</div>
            </div>
            <div v-if="filteredScrapsPerPage && filteredScrapsPerPage.length" class="d-flex align-items-center border-bottom pb-1 mb-1 mt-3">
              <div class="form-check me-2">
                <input ref="check" type="checkbox" id="select" class="form-check-input" v-model="allSelected" @change="toggleSelectAll" />
                <label class="form-check-label" for="select"></label>
              </div>
              <div class="fw-bold smaller text-uppercase">Links</div>
            </div>
            <div class="row gx-2 scraps" @scroll="handleScroll">
              <div v-for="(scrap) in filteredScrapsPerPage" class="col-12" :class="{'col-sm-6 col-md-4': cardType === 'card'}" :key="`sw-${scrap.id}`">
                <ScrapCard :scrap="scrap" :loading="scraping" :view="cardType" @onSelect="onSelect" :key="`scrap-${scrap.id}-${scrap.selected}`" />
              </div>
            </div>
            <VuePagination :chunksNavigation="'scroll'" class="d-none mt-2" v-model="page" :texts="{ count: '' }" :records="filteredScraps.length" :per-page="perPage" @paginate="() => {}"/>
          </div>
        </div>
        <div class="modal-footer pt-2 pt-md-0 mt-0 justify-content-between justify-content-sm-end" v-if="filteredScraps.length">
          <button type="button" class="m-0 btn px-5 me-2" data-bs-dismiss="modal">Cancel</button>
          <button type="button" class="m-0 btn px-5 btn-secondary" :disabled="!selectedScraps || !selectedScraps.length" @click="addScraps">
            Submit
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import { Modal } from 'bootstrap';
  import ScrapCard from '@/components/cards/scrap-card';
  import ScraperService from '@/api-services/scraper.service';

  export default {
    name: 'WebsiteScraperModal',
    components: {
      ScrapCard
    },
    props: {
      model: null
    },
    data() {
      return {
        cardType: 'list',
        scraping: false,
        processing: false,
        scraps: [],
        url: '',
        search: '',
        int: null,
        fileId: null,
        page: 1,
        perPage: 6,
        error: null,
        allSelected: false
      }
    },
    computed: {
      modal() {
        return new Modal(this.$refs.modal);
      },
      filteredScraps() {
        return this.scraps;
        //return this.scraps.filter(e => e.url.toLowerCase().includes(this.search.toLowerCase()))
      },
      selectedScraps() {
        return this.scraps.filter(e => e.selected).map(e => e.id);
      },
      filteredScrapsPerPage() {
        let start = 0;
        let end = (this.page) * this.perPage;
        return this.filteredScraps.slice(start, end);
      }
    },
    mounted() {
      this.$refs.modal.addEventListener('hidden.bs.modal', this.clearScrap);
    },
    methods: {
      show() {
        this.error = null;
        this.modal.show();
      },
      onSelect(id, value) {
        this.scraps.find(e => e.id == id).selected = value;
      },
      toggleSelectAll() {
        this.scraps = this.scraps.map(scrap => ({ ...scrap, selected: this.allSelected }));
      },
      stopScraping() {
        clearInterval(this.int);
        this.scraping = false;
        this.processing = false;
        this.scraps = this.scraps.filter(e => e.snapshot);
      },
      clearScrap() {
        this.url = '';
        this.scraps = [];
        this.stopScraping();
      },
      handleScroll(event) {
        const { target } = event;
        // Check if scrolled near to bottom
        let bottom = target.scrollHeight - target.scrollTop <= target.clientHeight + 50; // 50px threshold
        if(bottom) {
          this.loadMore();
        }
      },
      loadMore(){
        if(((this.page) * this.perPage) < this.filteredScraps.length){
          this.page++;
        }
      },
      async addScraps() {
        let resp = await ScraperService.submitLinks({link_ids: this.selectedScraps, model_id: this.model.id, file_id: this.fileId});
        if(!resp.success) {
          this.$swal('', "An error has occurred", 'error');
          return;
        }
        this.$emit('onAdd', this.selectedScraps, this.scraps.filter(e => e.selected));
        this.modal.hide();
      },
      async submitWebsite() {
        this.error = null;
        this.scraps = [];
        this.processing = true;
        let resp = await ScraperService.submitWebsite({ website: this.url, model_id: this.model.id });
        if(!resp.success) {
          this.error = resp.error;
          this.scraping = false;
          this.processing = false;
          return;
        }
        this.fileId = resp.id;
        this.processing = false;
        this.scraping = true;
        ScraperService.checkWebsiteStatus({ file_id: resp.id }).then(e => {
          this.scraps = e.links.map(e => ({ ...e, selected: false }));
        });
        this.int = setInterval(() => {
          this.scraping = true;
          ScraperService.checkWebsiteStatus({ file_id: resp.id }).then(elements => {
            this.scraps = this.scraps.map(s => {
              const e = elements.links.find(l => l.id === s.id);
              if(e) {
                const { ...rest } = s;
                return { ...rest, ...e };
              } else {
                return { ...s, selected: Object.prototype.hasOwnProperty.call(s, 'selected') ? s.selected : false };
              }
            });
            console.log(this.scraps);
            const newLinks = elements.links.filter(l => !this.scraps.some(s => s.id === l.id));
            this.scraps = this.scraps.concat(newLinks);
            if(elements.complete) {
              this.stopScraping();
            }
          });
        }, 2000);
      }
    },
  }
</script>
<style scoped lang="scss">
  .scraps {
    max-height: 220px;
    overflow: auto;
  }
  :deep(.VuePagination__pagination) {
    margin-bottom: 0 !important;
  }
  :deep(.VuePagination__count) {
    display: none !important;
  }
  .btn-primary {
    svg {
      color: var(--bs-body-bg);
      fill: #ffffff !important;
    }
  }
</style>