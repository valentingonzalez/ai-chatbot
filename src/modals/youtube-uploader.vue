<template>
  <div class="modal" ref="modal" tabindex="-1">
    <div class="modal-dialog modal-dialog-centered modal-lg">
      <div class="modal-content">
        <div class="modal-header pb-2 flex-column">
          <div class="d-flex w-100 align-items-center">
            <h5 class="modal-title">Youtube File Uploader</h5>
            <button type="button" class="btn-close" data-bs-dismiss="modal" ref="closeModelModal" aria-label="Close"></button>
          </div>
        </div>
        <div class="modal-body pt-2">
          <div class="mb-3 pb-3 " :class="{ 'border-bottom' : thumbnailUrl }">
            <label for="url" class="mb-2 fw-medium">
              Enter URL of Youtube Video
            </label>
            <form class="d-flex" @submit.prevent="submitLink">
              <input @input="debounceGetThumbnail" v-model="url" id="url" type="text" class="form-control flex-grow-1" placeholder="Enter URL of Youtube Video" />
              <button type="submit" class="btn btn-secondary px-3 ms-2" :disabled="!enableSubmit">
                <div class="spinner-border spinner-border-sm me-2" v-if="scrapping"></div>
                {{ !scrapping ? 'Submit' : 'Submitting' }}
              </button>
            </form>
          </div>
          <div class="d-flex flex-column align-items-center justify-content-center" v-if="thumbnailUrl && url">
            <div class="alert alert-danger" v-if='!videoDetails.caption'>
              The video doesn't have captions available! 😮 They might be turned off or simply not provided. <br>
              To use this video, you'll need to download it from YouTube and then upload it.
            </div>
            <div class="thumb p-3 d-flex flex-column justify-content-end" :style="{ backgroundImage: `url(${thumbnailUrl})` }">
              <div>{{ videoDetails.title }}</div>
              <div>Length: {{ $parseDuration(videoDetails.duration) }}</div>
              <div>By: {{ videoDetails.uploader }}</div>
            </div>
          </div>
          <div class="d-flex align-items-center justify-content-center my-3" v-if="loading">
              <div class="spinner-border spinner-border-sm"></div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import { Modal } from 'bootstrap';
  import YoutubeService from '@/api-services/youtube.service';
  import debounce from 'debounce';

  export default {
    name: 'YoutubeUploaderModal',
    props: {
      model: null
    },
    data() {
      return {
        enableSubmit: false,
        scrapping: false,
        links: [],
        url: '',
        search: '',
        int: null,
        page: 1,
        perPage: 3,
        loading: false,
        thumbnailUrl: '',
        videoDetails: { title: '', length: '', thumbnail: '', uploader: '', duration: 0, description: '' }
      }
    },
    computed: {
      modal() {
        return new Modal(this.$refs.modal);
      },
      filteredLinks() {
        return this.links.filter(e => e.file_url.toLowerCase().includes(this.search.toLowerCase()))
      },
      filteredLinksPerPage() {
        let start = (this.page - 1) * this.perPage;
        let end = (this.page) * this.perPage;
        return this.filteredLinks.slice(start, end);
      }
    },
    mounted() {
      this.getLinks();
      this.$refs.modal.addEventListener('hidden.bs.modal', this.onHide);
    },
    methods: {
      debounceGetThumbnail: debounce(function() { this.getThumbnailUrl(); }, 1000),
      async getThumbnailUrl() {
        this.thumbnailUrl = '';
        this.enableSubmit = false;
        this.videoDetails = { title: '', length: '', thumbnail: '', uploader: '', duration: 0, description: '' };
        if(!this.url) return;
        let res = await YoutubeService.getThumbnailUrl({ link: this.url });
        if(res.error) {
          this.$swal('', 'This is not a valid link! Please provide an actual youtube video link.', 'error');
          return;
        }
        this.thumbnailUrl = res.thumbnail_url
        this.videoDetails.title = res.title;
        this.videoDetails.thumbnail = res.thumbnail_url;
        this.videoDetails.length = res.length;
        this.videoDetails.uploader = res.uploader;
        this.videoDetails.duration = res.duration;
        this.videoDetails.description = res.description;
        this.videoDetails.caption = res.caption;
        if(this.videoDetails.duration && this.videoDetails.caption !== "") {
          this.enableSubmit = true;
        }
      },
      show() {
        this.modal.show();
      },
      onHide() {
        clearInterval(this.int);
      },
      async getLinks() {
        this.loading = true;
        let res = await YoutubeService.getLinks();
        this.loading = false;
        this.links = res.links
      },
      async submitLink() {
        this.scrapping = true;
        let res = await YoutubeService.submitLink({ link: this.url, model_id: this.model.id, ...this.videoDetails });

        if(res.error) {
          this.scrapping = false;
          this.url = '';
          this.$swal('', res.error, 'error');
          return;
        }
        this.$refs.closeModelModal.click();
        this.scrapping = false;
        this.url = '';
        this.$emit('onAdd');
        this.videoDetails = { title: '', length: '', thumbnail: '', uploader: '', duration: 0, description: '' };
      }
    },
  }
</script>

<style scoped lang="scss">
  .thumb {
    width: 300px;
    height: 200px;
    background-size: cover;
  }
  :deep(.VuePagination__count) {
    display: none !important;
  }
</style>