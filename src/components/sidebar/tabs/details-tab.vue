<template>
  <div class="h-100">
    <h4>Embedding Details</h4>
    <div class="text-muted fs-7 mb-2">
      The response was created using information from various embeddings. The confidence score is calculated based on the similarity between your question and the answers in the embeddings.
    </div>
    <div class="d-flex align-items-center justify-content-center" v-if="loading">
      <div class="spinner-border mt-5"></div>
    </div>
    <div class="files overflow-auto" v-else>
      <div class="alert alert-warning text-center" role="alert" v-if="!sortedEmbeddings.length">
        No embeddings have displayed.
      </div>
      <template v-else>
        <EmbeddingCard :item="item" v-for="item in sortedEmbeddings" :key="item.id" @delete="onDelete" />
      </template>
    </div>
    <hr>
    <!-- <h6>Feedback Embeddings for Model: Ai-Chatbot</h6> -->
    <div v-if="eventId">
      <div class="text-muted fs-7 mb-4">
        <button class="btn btn-primary w-100 mb-2" @click="showAddEmbedding = true">
          <svg class="me-2" width="13" height="13" viewBox="0 0 13 13" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M6.5 1.5V11.5" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/><path d="M1.5 6.5H11.5" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>
          Add New Embedding
        </button>
        <p class="small">By providing additional relevant information, you'll improve the AI's understanding and increase the chances of getting a more accurate answer in the future. Keep refining the embeddings to ensure your AI model becomes even more knowledgeable and efficient. 🧠🚀</p>
      </div>
      <div v-if="showAddEmbedding">
        <TextareaAutoresize class="embeddingTextArea mb-2 w-100 form-control" v-model="embeddingText" rows="5" />
        <button class="btn btn-block btn-primary" :disabled="adding" @click="addEmbedding">
          Add Embedding
          <span class="spinner-border spinner-border-sm ms-2" v-if="adding"></span>
        </button>
      </div>
    </div>
  </div>
</template>
  

<script>
import EmbeddingService from '@/api-services/embedding.service';
import EmbeddingCard from '@/components/cards/embedding-card';

export default {
  name: 'DetailsTab',
  components: {
    EmbeddingCard
  },
  data() {
    return {
      showAddEmbedding: false,
      loading: false,
      eventId: null,
      embeddings: [],
      embeddingText: '',
      adding: false
    }
  },
  computed: {
    sortedEmbeddings() {
      return [...this.embeddings].sort((a, b) => b.similarity - a.similarity);
    }
  },
  methods: {
    addEmbedding() {
      if(!this.$store.state.selectedAssistant.id) {
        this.$swal({ title: 'Error', text: 'No Model Selected', icon: 'danger' });
        return;
      }
      this.adding = true;
      EmbeddingService.addEmbedding({ event_id: this.eventId, model_id: this.$store.state.selectedAssistant.id, embedding: this.embeddingText }).then(res => {
        this.adding = false;
        this.embeddingText = '';
        if(res.id) {
          this.$toast('Embedding Added Successfully');
          this.showAddEmbedding = false;
          this.init(this.eventId);
        } else {
          this.$toast(res.error, 'error');
        }
      });
    },
    onDelete(id) {
      this.embeddings = this.embeddings.filter(e => e.id != id)
    },
    init(id) {
      this.loading = true;
      this.eventId = id;
      EmbeddingService.getEmbeddingsForEvent({ event_id: id }).then(res => {
        this.embeddings = res.embeddings
        this.loading = false;
      });
    }
  }
}
</script>

