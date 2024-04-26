<template>
  <div ref="bubbleDeploy" :class="`chat-block d-flex mb-2 align-items-start ${item.self_msg ? 'to' : 'from'}`" v-if="item && (item.data || (item.buttons && item.buttons.length > 0))">
    <div class="chat-bubbles w-100 d-flex flex-grow-1 flex-column justify-content-end" :class="item.self_msg ? 'align-items-end' : 'align-items-start'">
      <div class="d-flex align-items-center chat-bubble-wrapper mw-100">
        <div class="d-flex flex-column position-relative mw-100" :class="!item.self_msg ? 'align-items-start' : 'align-items-end'">
          <div class="chat-bubble p-3 position-relative mw-100">
            <template v-if="item.message_type == 'text' || !item.message_type && item.data">
              <div v-for="block in codeBlocks" :key="block.id">
                <span :style="`fontSize: ${fontSize}px`">
                  <TypeWriter @onComplete="showEmailInput = true" :cursor="false" :speed="15" >👋 <span v-html="block.content"></span></TypeWriter>
                </span>
              </div>
              <a v-for="(preview, i) in item.urls" :href="preview.url" class="preview p-2 text-dark card mt-2 border-light shadow-sm " :key="`preview-${i}`" target="_blank">
                <div class="d-flex">
                  <div :style="{ backgroundImage: `url(${preview.image})` }" class="thumb"></div>
                  <div class="flex-grow-1 ms-2 overflow-hidden">
                    <div class="description small">{{ preview.title }}</div>
                    <div class="name smaller text-muted text-nowrap">{{ preview.description.substring(0,75) }}</div>
                  </div>
                </div>
              </a>
            </template>
            <!-- Suggestions -->
            <div class="mt-2 fst-italic" v-if="item.buttons && item.buttons.length > 0">Follow Up Questions:</div>
            <div class="suggestions" v-if="item.buttons && item.buttons.length">
              <ul class="p-0 m-0">
                <li v-for="(s, i) in item.buttons" :key="`suggestion-${i}`">
                  <a class="card p-2 ps-3 mt-2 text text-decoration-none" href="#" @click.prevent="addSuggestion(s)">{{ s.title }}</a>
                </li>
              </ul>
            </div>
            <div class="fw-bold py-3 mt-1">
              <div class="form-group" v-if="showEmailInput && emailInputRequired">
                <label>
                  <TypeWriter @onComplete="showEmail = true; showNameInput = true" :cursor="false" :speed="50">
                      Email Address:
                  </TypeWriter>
                </label>
                <input v-if="showEmail" type="email" v-model="user.email" placeholder="email@domain.com" class="form-control" />
              </div>
              <div class="form-group mt-2" v-if="showNameInput && nameInputRequired">
                <label>
                  <TypeWriter @onComplete="showNameFunc" :cursor="false" :speed="50">Full Name:</TypeWriter>
                </label>
                <input v-if="showName" type="text" v-model="user.name" placeholder="Enter Your Name Here" class="form-control" />
              </div>
              <div class="form-group mt-2">
                <button v-if="showSubmit" type="button" @click="submit()" class="btn btn-primary w-100">
                  <span v-if="!submitting">Start Chat</span>
                  <div v-else class="spinner-border spinner-border-sm ms-2"></div>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="text-muted smallest mt-1">
        <span v-if="edited">Edited </span>
        {{ item.timestamp }}
      </div>

    </div>

  </div>
</template>
<script>
import { EventBus } from '@/main';
import config from '@/api-services/_config';
import DeployService from '@/api-services/deploy.service';

export default {
  name: 'MessengerDeploy',
  components: {
  },
  props: {
    fontSize: {
      default: 14,
    },
    item: {
      default: null
    },
    edited: {
      default: null
    }
  },
  data() {
    return {
      thumb: parseInt({...this.item}.thumb),
      addingPreview: false,
      doubleTap: false,
      wavesurfer: null,
      playingAudio: false,
      urls: null,
      showEmail: false,
      showName: false,
      showSubmit: false,
      linkPreviews: [],
      audioTime: '0:00',
      showEmailInput: false,
      showNameInput: false,
      loading: true,
      showingOptions: false,
      doubletapping: false,
      copyIndex: false,
      submitting: false,
      user: {
        email: "",
        name: "",
      },
      nameInputRequired: true,
      emailInputRequired: true,
    }
  },
  computed: {
    halfWay() {
      return this.$el.getBoundingClientRect().top + this.$el.getBoundingClientRect().height < window.screen.height / 2;
    },
    codeBlocks() {
      return this.$root.$children[0].extractCodeBlocks(this.item.data);
    },
    isJson() {
      let  json = [];
      try {
        json = JSON.parse(this.item.data);
      } catch (e) {
        return false;
      }
      if(json.length > 1) {
        return false;
      }
      return false;
    }
  },
  destroyed() {
    this.wavesurfer = null;
  },
  async mounted() {
    if(!this.item) return;
    if(!this.showNameInput){
      this.showSubmit = true;
    }
    this.buildChatForm();

  },
  methods: {
    buildChatForm(){
      let array = JSON.parse(this.item.pre_chat_form);
      
      for(let i = 0; i < array.length; i++) {
        if(array[i].type === 'email') {
          this.emailInputRequired = array[i].required;
        } else if(array[i].type === 'name') {
          this.nameInputRequired = array[i].required;
        }
      }
    },
    showNameFunc() {
      this.showName = true;
      setTimeout(() => {
        this.showSubmit = true;
      },500);
    },
    async submit() {
      if((!this.user.email && this.emailInputRequired) || (!this.user.name && this.nameInputRequired)) return;

      this.submitting = true;
      let response = await DeployService.createMember(this.user.email, this.user.name, config.deployKey);
      this.submitting = false;
      if(response.success === 0) {
        this.$swal('Error', response.error, 'error');
        return;
      }
      if(!response.session || !response.member_id) {
        this.$swal('Error', 'Something Went Wrong! Refresh Page', 'error');
        return;
      }

      window.location.href = `/?token=${response.session}`;
    },
    copyText(text) {
      navigator.clipboard.writeText(text);
      this.$toast('Message copied to the clipboard!');
    },
    showDetails() {
      this.$root.$children[0].showDetailsTab(this.item.id);
    },
    async addPreview(block) {
      this.addingPreview = block.id;
      await this.$root.$children[0].addPreview(block.content);
      this.addingPreview = null;
    },
    codeCopy(code, index) {
      const textarea = document.createElement('textarea');
      this.copyIndex = index;
      textarea.value = code;
      document.body.appendChild(textarea);
      textarea.select();
      document.execCommand('copy');
      document.body.removeChild(textarea);
      // Show a success message
      setTimeout(()=>{
        this.copyIndex = false;
      },1500);
    },
    onTap() {
      if(this.doubletapping && !this.showingOptions) {
        this.showOptions();
      }
      this.doubletapping = true;
      setTimeout(() => {
        this.doubletapping = false;
      }, 300);
    },
    showOptions() {
      if(!this.item.self_msg) {
        this.showingOptions = true;
        this.$emit('onShowOptions', this);
      }
    },
    hideOptions() {
      this.showingOptions = false;
    },
    thumbsDown() {
      this.thumb = this.thumb == 1 ? 0 : 1;
      this.$parent.socket.emit('thumbsdown', JSON.stringify({ id: this.item.id, session: config.sessionValue }));
    },
    thumbsUp() {
      this.thumb = this.thumb == 2 ? 0 : 2;
      this.$parent.socket.emit('thumbsup', JSON.stringify({ id: this.item.id, session: config.sessionValue }));
    },
    getLinkPreviews(urls) {
      if(!urls) return;
      urls.forEach(async (e) => {
        let url = { title: e.title, sku: e.sku, url: e.url, description: e.description.substring(0,75) }
        this.linkPreviews.push(url);
      });
    },
    playPauseAudio() {
      if(!this.playingAudio) {
        this.$emit('onPlay');
      }
      this.wavesurfer.playPause();
      this.playingAudio = this.wavesurfer.isPlaying();
    },
    stopAudio() {
      if(this.wavesurfer) {
        this.wavesurfer.pause();
        this.playingAudio = this.wavesurfer.isPlaying();
      }
    },
    addSuggestion(s) {
      this.$emit('onSuggestion', s.title)
    },
    optionsCallback(type) {
      if(type == 'pin') {
        this.$emit('pin',{ id: this.item.id,text: this.item.data });
      }
      if(type == 'copy-prompt') {
        EventBus.$emit('pastePrompt', this.item.data);
      }
    }
  }
};
</script>


<style lang="scss" scoped>
.chat-block {
  max-width: 100%;
  .chat-bubbles {
    border-radius: 12px;
    .options {
      border-radius: 30px;
      position: absolute;
      opacity: 0;
      transition: opacity .2s;
      bottom: -15px;
      .option {
        position: relative;
        background: var(--bs-body-bg);
        width: 30px;
        height: 30px;
        border-radius: 30px;
        display: flex;
        align-items: center;
        justify-content: center;
        box-shadow: 2px 2px 2px rgba(0,0,0,.2);
        transition: all .1s;
        &.selected {
          background: #6F6DE0;
          color: #ffffff !important;
          transform: scale(1.2);
        }
        &:nth-child(2) {
          transition-delay: .05s;
        }
      }
      &.visible {
        opacity: 1;
        pointer-events: all;
        .option {
          top: 0;
        }
      }
    }

    .suggestions {
      ul {
        list-style: none;
      }
    }

    /* override options */
    .options {
      opacity: 1 !important;
      pointer-events: all !important;
      z-index: 3;
      top: auto !important;
      transform: scale(.9);
      right: 0;
      .option {
        box-shadow: 1.5px 1.5px 5px rgba(0,0,0,.2);
      }
    }
    .chat-bubble {
      min-width: 140px;
      word-wrap: break-word;
      box-shadow: 0 1px 1px rgba(0,0,0,.2);
      :deep(*) {
        overflow-wrap: break-word;
        word-wrap: break-word;
        -ms-word-break: break-all;
        word-break: break-all;
        word-break: break-word;
        -ms-hyphens: auto;
        -moz-hyphens: auto;
        -webkit-hyphens: auto;
        hyphens: auto;
      }
      .gen-response {
        display: flex;
        align-items: center;
        justify-content: center;
        .ellipsis {
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
      .msg {
        white-space: pre-wrap;
      }
      .chat-reaction {
        position: absolute;
        bottom: -10px;
        right: -13px;
        width: 24px;
        height: 24px;
        border-radius: 24px;
        box-shadow: 1px 1px 2px rgba(0,0,0,.2);
        display: flex;
        align-items: center;
        justify-content: center;
        background: var(--bs-body-bg);
      }
      :deep(a) {
        text-decoration: underline;
      }
    }
  }
  &.from {
    .chat-bubble {
      border-radius: 0 20px 20px;
      background: var(--bs-body-bg);
    }
  }
  &.to {
    .chat-bubble {
      background: var(--bs-chat-bubble-bg);
      border: 1px solid var(--bs-chat-bubble-bg);
      color: #fff;
      border-radius: 16px 0 16px 16px;
      .msg {
        :deep(a) {
          color: #fff !important;
        }
      }
    }
    .chat-reaction {
      left: -13px;
      right: auto;
      box-shadow: 2px 2px 2px rgba(0,0,0,.2);
    }
  }
}
.preview {
  text-decoration: none !important;
  .thumb {
    border-radius: 6px;
    width: 40px;
    min-width: 40px;
    height: 40px;
    min-height: 40px;
    background-size: cover;
  }
  .description {
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 2;
  }
  .name {
    overflow: hidden;
    text-overflow: ellipsis;
  }
}
.audio-frame {
  margin: -5px 0;
}

@keyframes ellipsis {
  to {
    width: 1.25em;
  }
}
@-webkit-keyframes ellipsis {
  to {
    width: 1.25em;
  }
}

:deep(.code_editor) {
  tab-size: 2;
  .copy_code {
    z-index: 300;
  }
}
</style>