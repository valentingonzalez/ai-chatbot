<template>
  <div v-if="loading">
    <div class="text-muted spinner-border spinner-border-xs"></div>
  </div>
  <div class="dropdown" v-else-if="pinnedMessages && pinnedMessages.length">
    <button type="button" class="smaller fw-medium d-flex align-items-center text-muted" id="pinnedMessages" data-bs-toggle="dropdown" aria-expanded="false" data-bs-auto-close="outside">
      <svg class="me-2" width="11" height="13" viewBox="0 0 11 13" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M1.43424 3.42586L3.43424 6.88996L3.61287 9.86603L4.27954 11.0207L10.053 7.6874L9.38638 6.5327L6.89834 4.88996L4.89834 1.42586" stroke="currentColor" stroke-width="1.2" stroke-linecap="round" stroke-linejoin="round"/><path d="M7.1665 9.354L8.83317 12.2408" stroke="currentColor" stroke-width="1.2" stroke-linecap="round" stroke-linejoin="round"/><path d="M0.857178 3.75903L5.47598 1.09237" stroke="currentColor" stroke-width="1.2" stroke-linecap="round" stroke-linejoin="round"/></svg>
      {{ pinnedMessages.length }} Pinned
    </button>
    <div class="dropdown-menu mt-2 dropdown-menu-end fs-7" aria-labelledby="pinnedMessages" role="menu">
      <div class="card mx-2">
        <div v-for="msg in pinnedMessages" class="msg p-2" :key="`pinnedmsg-${msg.id}`">
          <div class="d-flex align-items-center">
            <div class="d-flex flex-grow-1 align-items-center">
              <AssistantThumbnail :assistant="assistant" v-if="assistant" />
              {{ assistant.name }}
            </div>
            <button type="button" class="remove-bt" @click="unpin(msg.id)">
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg"><g clip-path="url(#clip0_1796_32151)"><path d="M12 4L4 12" stroke="#64748B" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/><path d="M4 4L12 12" stroke="#64748B" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></g><defs><clipPath id="clip0_1796_32151"><rect width="16" height="16" fill="white"/></clipPath></defs></svg>
            </button>
          </div>
          <div class="bubble card mt-2 mb-1 p-3">
            {{ msg.data }}
          </div>
          <div v-if="msg.date_added" class="date text-muted" style="font-size: 10px;">{{ parseDate(msg.date_added) }}</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import AssistantThumbnail from '@/components/models/thumbnail';
import moment from 'moment';

export default {
  name: 'PinnedMessages',
  components: {
    AssistantThumbnail
  },
  data() {
    return {
      loading: false
    }
  },
  computed: {
    assistant() {
      return this.$store.state.selectedAssistant;
    },
    pinnedMessages() {
      return this.$store.state.pins;
    }
  },
  methods: {
    unpin(id) {
      this.$store.dispatch('unpinMessage', { snippet_id: id });
      this.$toast('Message unpinned!');
    },
    async loadSnippets() {
      this.loading = true;
      await this.$store.dispatch('getPins', { model_id: this.assistant.id });
      this.loading = false;
    },
    parseDate(date) {
      return moment(date).format('MM/DD/YYYY');
    }
  },
  watch: {
    assistant() {
      this.loadSnippets();
    }
  }
}
</script>

<style scoped lang="scss">
  #pinnedMessages {
    padding: 2px 8px;
    border-radius: 10px;
    &.show {
      background: var(--bs-chat-bg);
    }
  }
  .dropdown-menu {
    > .card {
      background: var(--bs-chat-bg);
      width: 380px;
      max-height: calc(100vh - 190px);
      overflow: auto;
      .msg {
        .remove-bt {
          display: none;
        }
        .bubble {
          border-radius: 0px 16px 16px 16px;
          box-shadow: 0px 1px 0px 0px rgba(17, 21, 35, 0.02);
        }
        &:hover {
          .remove-bt {
            display: block;
          }
        }
      }
    }
  }
</style>