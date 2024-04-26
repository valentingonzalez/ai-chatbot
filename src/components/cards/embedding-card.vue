<template>
  <div class="d-flex flex-column card p-3 fs-7 mb-3">
      <div v-if="!hideSimilarity" class="d-flex justify-content-between align-items-center mt-1 mb-0">
        <span class="text-muted">Similarity Score: <span>{{item.similarity ? parseFloat(item.similarity * 100).toFixed(1) : 0}}%</span></span>
      </div>
      <div class="mb-1" v-if="editEmbedding == item.id">
        <TextareaAutosize class="small mb-2 w-100 form-control" v-model="embeddingText" />
        <div class="d-flex justify-content-end">
          <button class="btn btn-outline-primary px-3 btn-sm me-2" :disabled="updating" @click="editEmbedding = false">
            Cancel
          </button>
          <button class="btn btn-primary px-3 btn-sm" @click="updateEmbedding" :disabled="updating">
            Update
            <div v-if="updating" class="spinner-border spinner-border-sm ms-2"></div>
          </button>
        </div>
      </div>
      <div v-else class="d-flex justify-content-between align-items-center mt-1 overflow-auto" style="word-break: break-word;">
        <p class="mb-0 small" v-html="embeddingHtml"></p>
      </div>
      <div class="d-flex justify-content-between align-items-center mt-1">
      <div class="text-muted">
        {{item.token_size}} Tokens • ID: {{ item.id }}
      </div>
      <div class="d-flex">
        <a v-if="editEmbedding != item.id" href="#" @click="embeddingText = item.embedding; editEmbedding = item.id" class="text-muted d-flex align-items-center  me-2" >
          <svg class="me-1" width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M15.4142 0.585786C14.6332 -0.195262 13.3668 -0.195262 12.5858 0.585786L5 8.17157V11H7.82842L15.4142 3.41421C16.1953 2.63316 16.1953 1.36683 15.4142 0.585786Z" fill="#6B7280"/><path fill-rule="evenodd" clip-rule="evenodd" d="M0 4C0 2.89543 0.89543 2 2 2H6C6.55228 2 7 2.44772 7 3C7 3.55228 6.55228 4 6 4H2V14H12V10C12 9.44772 12.4477 9 13 9C13.5523 9 14 9.44772 14 10V14C14 15.1046 13.1046 16 12 16H2C0.89543 16 0 15.1046 0 14V4Z" fill="#6B7280"/></svg>
        </a>
        <a href="#" @click="deleteEmbedding(item.id)" class="text-muted d-flex align-items-center" >
          <svg width="20" height="20" viewBox="0 0 20 20" fill="none" stroke-width="1.5" xmlns="http://www.w3.org/2000/svg"><g clip-path="url(#clip0_92_469)"><path d="M3.33325 5.83337H16.6666" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round"/><path d="M8.33325 9.16663V14.1666" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round"/><path d="M11.6667 9.16663V14.1666" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round"/><path d="M4.16675 5.83337L5.00008 15.8334C5.00008 16.2754 5.17568 16.6993 5.48824 17.0119C5.8008 17.3244 6.22472 17.5 6.66675 17.5H13.3334C13.7754 17.5 14.1994 17.3244 14.5119 17.0119C14.8245 16.6993 15.0001 16.2754 15.0001 15.8334L15.8334 5.83337" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round"/><path d="M7.5 5.83333V3.33333C7.5 3.11232 7.5878 2.90036 7.74408 2.74408C7.90036 2.5878 8.11232 2.5 8.33333 2.5H11.6667C11.8877 2.5 12.0996 2.5878 12.2559 2.74408C12.4122 2.90036 12.5 3.11232 12.5 3.33333V5.83333" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round"/></g><defs><clipPath id="clip0_92_469"><rect width="20" height="20" fill="white"/></clipPath></defs></svg>
        </a>
      </div>
    </div>
    <div v-if="item.file" class="file d-flex align-items-center justify-content-between py-2 border-bottom fs-7" >
      <div class="thumb rounded overflow-hidden" :class="{ 'svg': placeholders[item.file_type] }" >
        <a v-if="item.file_type" :href="item.file_url" target="_blank">
          <img v-if="item.thumbnail_url" :src="item.thumbnail_url" alt="">
          <img v-else :src="placeholder" alt="">
        </a>
        <div v-else>
          <img v-if="item.thumbnail_url" :src="item.thumbnail_url" alt="">
          <img v-else :src="placeholder" alt="">
        </div>
      </div>
      <div class="ms-3 flex-grow-1 overflow-y-hidden" >
        <div class="fw-bold mb-0 fs-7 text-truncate ">
          <p class="small text-muted mb-0">File Type: {{ item.file_type }}</p>
          <p v-if="item.file_url" class="text-wrap" >
            <a :href="item.file_url" target="_blank">
              {{ item.file_title || item.file_url }}
            </a>
          </p>
          <p class="text-wrap" v-else> {{ item.file_title || item.file_url }}</p>
        </div>
        <div class="text-muted d-none">{{ item.file_description }}</div>
      </div>
      <div v-if="item.file_type == 'audio' || item.file_type == 'video' || item.file_type == 'youtube'" class="d-flex" >
        <div class="time text-muted me-3 text-nowrap small fw-bold ms-2">
          {{ $parseDuration(item.file_duration)}}
        </div>
      </div>
    </div>
  </div>
</template>
  
<script>
  import EmbeddingService from '@/api-services/embedding.service';
  import config from '@/api-services/_config';

  export default {
    name: 'EmbeddingCard',
    props: {
      item: {
        default: null,
        required: true
      },
      hideSimilarity: {
        default: null,
        required: false
      }
    },
    computed: {
      placeholder() {
        return require(`@/assets/images/${this.placeholders[this.item.file_type] ? this.placeholders[this.item.file_type] : 'thumbnail-placeholder.png'}`);
      },
      embeddingHtml() {
        return this.item.embedding.replace(/\\n/g, '<br>').replace(/\n/g, '<br>');
      }
    },
    data() {
      return {
        embeddingText: '',
        editEmbedding: null,
        updating: false,
        placeholders: {
          csv: 'thumbnail-csv.svg',
          document: 'thumbnail-doc.svg',
          pdf: 'thumbnail-pdf.svg',
          audio: 'thumbnail-audio.svg'
        },
      }
    },
    methods: {
      onDelete() {
        this.$emit('onDelete', this.file);
      },
      updateEmbedding() {
        this.$logActivity({action: 'click', page: this.$route.name, type: 'updateEmbedding', ref_id: this.editEmbedding});
        this.updating = true;
        const id = this.editEmbedding;
        this.$set(this.item, 'embedding', this.embeddingText)
        EmbeddingService.updateEmbedding({ embedding_id: id,id: config.memberId,embedding: this.embeddingText }).then(() => {
          this.updating = false;
          this.editEmbedding = null;
          this.$toast('Embedding updated successfullly');
        });
      },
      deleteEmbedding(id) {
        this.$logActivity({action: 'click',page: this.$route.name,type: 'deleteEmbedding', ref_id: id});
        this.$swal({
          title: 'Are you sure?',
          text: 'Are you sure, you want to delete this embedding?',
          icon: 'warning',
          showCancelButton: true
        }).then(res => {
          if(res.isConfirmed) {
            EmbeddingService.deleteEmbedding({embedding_id: id})
            .then(() => {
              this.$emit('delete',id);
              this.$toast('Embedding deleted successfullly');
            })
            .then(() => {
              document.dispatchEvent(new Event('updateFilesWidget'))
              this.$store.dispatch('getAssistants');
              this.$store.dispatch('getAllFiles');
            })
          }
        });
      }
    }
  }
</script>
  

<style scoped lang="scss">
  .file {
    position: relative;
    // overflow: hidden;
    .status {
      position: absolute;
      top: 0;
      right: 0;
      .alert {
        border-top: none !important;
        border-right: none !important;
        border-start-start-radius: 0 !important;
        border-start-end-radius: 0 !important;
        border-end-end-radius: 0 !important;
      }
    }
    .thumb {
      width: 64px;
      min-width: 64px;
      height: 64px;
      &:not(.svg) {
        img {
          width: 100%;
          height: 100%;
          object-fit: cover;
        }
      }
      &.svg {
        padding: 10px;
        img {
          width: 100%;
          height: 100%;
          object-fit: contain;
        }
      }
    }
  }
</style>