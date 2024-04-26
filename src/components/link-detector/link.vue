<template>
  <a class="custom-link me-2 small card flex-row align-items-center text-decoration-none text" :class="{ 'animating': animating, 'compact': compact }" :href="!link.url.includes('//') ? `https://${link.url}` : link.url" target="_blank" v-if="visible">
    <button v-if="!submitting" class="delete-bt text" @click.stop.prevent="deleteLink">
      <svg width="8" height="8" viewBox="0 0 8 8" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M0.999023 7.00061L7.00009 0.999546" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/><path d="M0.999023 0.99939L7.00009 7.00045" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></svg>
    </button>
    <div v-if="!submitted" class="thumb-wrapper overflow-hidden d-flex align-items-center justify-content-center">
      <div v-if="loading" class="spinner-border spinner-border-sm"></div>
      <div v-else-if="thumb" class="w-100 h-100 thumb" :style="{ backgroundImage: `url('data:image/jpg;base64,${thumb}')` }"></div>
    </div>
    <div class="flex-grow-1 d-flex">
      <div class="ps-3 pe-2 py-2 information flex-grow-1 text">
        <div v-if="loading" class="text-placeholder">
          <div class="bg"></div>
        </div>
        <div class="smaller fw-medium">
          {{ title }}
        </div>
        <div class="description smaller text-muted" v-if="!compact && description">
          {{ description }}
        </div>
        <template v-if="!loading && !readonly">
          <template v-if="!submitted">
            <button v-if="!submitting" @click.prevent.stop="submitWebsite" class="text-truncate btn btn-xs btn-outline-secondary small mt-1" :disabled="submitting">
              Add as Data Source
            </button>
            <div v-else-if="submitting" class="spinner-border spinner-border-sm me-2"></div>
          </template>
          <div v-else>Added!</div>
        </template>
      </div>
    </div>
  </a>
</template>

<script>
import { EventBus } from '@/main';
import WebsitesService from '@/api-services/websites.service';

export default {
  name: 'LinkDetector',
  props: {
    link: {
      default: null
    },
    readonly: {
      default: false
    },
    compact: {
      default: false
    }
  },
  data() {
    return {
      thumb: null,
      loading: false,
      animating: false,
      title: '',
      visible: false,
      submitting: false,
      submitted: false,
      description: null,
      controller: new AbortController()
    }
  },
  computed: {
    parsedUrl() {
      return this.link.url.replace(/http(s)?(:)?(\/\/)?|(\/\/)?(www\.)?/g, '').replace(/\/+$/, '')
    },
    models() {
      return this.$store.state.assistants;
    }
  },
  mounted() {
    this.getInfo();
    this.animating = true;
    setTimeout(() => this.animating = false, 1000);
  },
  methods: {
    getInfo() {
      this.loading = true;
      WebsitesService.getWebsitePreview({ url: this.link.url }, this.controller.signal).then(res => {
        this.loading = false;
        this.thumb = res.data;
        this.title = res.title || '';
        this.description = res.description;
        this.visible = this.title || this.description;
      });
    },
    deleteLink() {
      this.visible = false;
      this.$emit('onDelete', this.link);
    },
    submitWebsite() {
      if(!localStorage.getItem('selectedModel')) {
        this.$swal('', 'Please, select a model to add this Data Source', 'warning');
        return;
      }
      this.submitting = true;
      WebsitesService.submitWebsite({ website: this.link.url }).then(res => {
        if(res.success) {
          WebsitesService.checkWebsiteStatus({ file_id: res.id, wait: true }).then(res2 => {
            if(res2.success) {
              WebsitesService.submitLinks({ file_id: res.id, link_ids: [res2.links[0].id], model_id: localStorage.getItem('selectedModel') }).then(() => {
                EventBus.$emit('selectAssistant', this.models.find(e => e.id === localStorage.getItem('selectedModel')));
                this.submitting = false;
                this.submitted = true;
              })
            }
          });
        }
      })
    }
  },
  beforeDestroy() {
    this.controller.abort();
  },
  watch: {
    link(o, n) {
      if(o.url, n.url, o.url != n.url) {
        this.getInfo();
      }
    }
  }
}
</script>

<style lang="scss" scoped>
  .custom-link {
    border: 1px solid var(--bs-sender-border-color);
    position: relative;
    z-index: -1;
    &.compact {
      .information {
        width: 200px;
      }
    }
    .information {
      .description {
        overflow: hidden;
        text-overflow: ellipsis;
        display: -webkit-box;
        -webkit-box-orient: vertical;
        -webkit-line-clamp: 2;
      }
    }
    .thumb-wrapper {
      width: 100px;
      min-width: 100px;
      height: 70px;
      background: var(--bs-chat-bg);
      border-right: 1px solid var(--bs-sender-border-color);
      border-top-left-radius: 5px;
      border-bottom-left-radius: 5px;
      .thumb {
        background-size: cover;
        background-position: center;
      }
    }
    &.animating {
      animation: slideUp .5s;
    }
    
    .text-placeholder {
      width: 30px;
      font-size: 20px;
      font-weight: bold;
      color: #9CA3AF;
      &::after {
        overflow: hidden;
        display: inline-block;
        vertical-align: bottom;
        -webkit-animation: ellipsis steps(4,end) 900ms infinite;
        animation: ellipsis steps(4,end) 900ms infinite;
        content: '\2026';
        width: 0;
      }
    }
  }
  .delete-bt {
    width: 20px;
    height: 20px;
    border-radius: 20px;
    //background: var(--bs-base);
    //border: 1px solid var(--bs-sender-border-color);
    top: 0px;
    right: -2px;
    position: absolute;
    z-index: 1;
    display: flex;
    align-items: center;
    justify-content: center;
  }
  @keyframes slideUp {
    0% { transform: translateY(50px); opacity: 0; }
    100% { transform: translateY(0); opacity: 1; }
  }
  @keyframes ellipsis {
    to { width: 1.25em; }
  }
</style>