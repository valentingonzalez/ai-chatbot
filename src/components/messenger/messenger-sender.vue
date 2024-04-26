<!-- eslint-disable no-unreachable -->
<template>
  <div class="w-100 mb-2">
    <div class="sender position-relative">
      <transition name="fadeHeight">
        <div v-if="showOptions && !isDeployedApp">
          <div>
            <div class="d-flex align-items-center w-100">
              <button type="button" class="text-muted me-3 d-none">
                <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M1.5 9H2.33333M9 1.5V2.33333M15.6667 9H16.5M3.66667 3.66667L4.25 4.25M14.3333 3.66667L13.75 4.25" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/><path d="M6.50004 12.3333C5.80043 11.8085 5.28365 11.077 5.0229 10.2423C4.76215 9.40755 4.77065 8.51194 5.04719 7.6823C5.32374 6.85267 5.85431 6.13108 6.56375 5.61974C7.27319 5.10841 8.12553 4.83325 9.00004 4.83325C9.87455 4.83325 10.7269 5.10841 11.4363 5.61974C12.1458 6.13108 12.6763 6.85267 12.9529 7.6823C13.2294 8.51194 13.2379 9.40755 12.9772 10.2423C12.7164 11.077 12.1996 11.8085 11.5 12.3333C11.1747 12.6553 10.9297 13.0495 10.7849 13.4838C10.6402 13.9181 10.5997 14.3804 10.6667 14.8333C10.6667 15.2753 10.4911 15.6992 10.1786 16.0118C9.86599 16.3243 9.44207 16.4999 9.00004 16.4999C8.55801 16.4999 8.13409 16.3243 7.82153 16.0118C7.50897 15.6992 7.33337 15.2753 7.33337 14.8333C7.40042 14.3804 7.35992 13.9181 7.21515 13.4838C7.07038 13.0495 6.8254 12.6553 6.50004 12.3333Z" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/><path d="M7.08337 13.1667H10.9167" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></svg>
              </button>
              <AddSourceCompact  />
            </div>
          </div>
        </div>
      </transition>
      <div class="sender-block p-2 d-flex align-items-center">
        <div class="d-flex align-items-center w-100">
          <div class="d-flex flex-grow-1 align-items-center" v-if="!recordingAudio">
            <small class="d-flex align-items-center badge border border-danger text-danger" v-if="socketStatus == 'disconnected'">
              <svg class="me-2" width="18" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor"><path fill-rule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-8-5a.75.75 0 01.75.75v4.5a.75.75 0 01-1.5 0v-4.5A.75.75 0 0110 5zm0 10a1 1 0 100-2 1 1 0 000 2z" clip-rule="evenodd" /></svg>
              Socket disconnected
            </small>
            <small class="d-flex align-items-center badge border border-danger text-danger" v-else-if="socketStatus == 'reconnecting'">
              <div class="me-2 spinner-border spinner-border-xs"></div>
              Reconnecting
            </small>
            <textarea v-if="!socketStatus" :disabled="(isDeployedApp && !sessionId)" ref="senderTextarea" @paste="onMessage" @keydown="onMessage" @input="onMessage" @keyup.38="pasteLastMessage" v-model="message" class="flex-grow-1" :placeholder="socketStatus || (isDeployedApp && !sessionId) ? '' : 'Enter message'"></textarea>
          </div>
          <button v-if="!recordingAudio && !isDeployedApp" class="me-1 text-muted" @click="toggleOptions">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g opacity="0.8" clip-path="url(#clip0_1950_1395)"><path fill-rule="evenodd" clip-rule="evenodd" d="M3 12C3 13.1819 3.23279 14.3522 3.68508 15.4442C4.13738 16.5361 4.80031 17.5282 5.63604 18.364C6.47177 19.1997 7.46392 19.8626 8.55585 20.3149C9.64778 20.7672 10.8181 21 12 21C13.1819 21 14.3522 20.7672 15.4442 20.3149C16.5361 19.8626 17.5282 19.1997 18.364 18.364C19.1997 17.5282 19.8626 16.5361 20.3149 15.4442C20.7672 14.3522 21 13.1819 21 12C21 10.8181 20.7672 9.64778 20.3149 8.55585C19.8626 7.46392 19.1997 6.47177 18.364 5.63604C17.5282 4.80031 16.5361 4.13738 15.4442 3.68508C14.3522 3.23279 13.1819 3 12 3C10.8181 3 9.64778 3.23279 8.55585 3.68508C7.46392 4.13738 6.47177 4.80031 5.63604 5.63604C4.80031 6.47177 4.13738 7.46392 3.68508 8.55585C3.23279 9.64778 3 10.8181 3 12ZM8.25 12C8.25 11.5858 8.58579 11.25 9 11.25H11.25V9C11.25 8.58579 11.5858 8.25 12 8.25C12.4142 8.25 12.75 8.58579 12.75 9V11.25H15C15.4142 11.25 15.75 11.5858 15.75 12C15.75 12.4142 15.4142 12.75 15 12.75H12.75V15C12.75 15.4142 12.4142 15.75 12 15.75C11.5858 15.75 11.25 15.4142 11.25 15V12.75H9C8.58579 12.75 8.25 12.4142 8.25 12Z" fill="currentColor"/></g><defs><clipPath id="clip0_1950_1395"><rect width="24" height="24" fill="white"/></clipPath></defs></svg>
          </button>
          <AudioSender v-if="!message" ref="audioSender" @onStart="onRecStart" @onStop="onRecStop" @onChunk="audioChunk" @sendAudio="sendAudioMessage" />
        </div>
        <div v-if="isAnswering" class="writing text-muted ms-2"></div>
        <button v-else-if="message" class="d-flex align-items-center justify-content-center text ms-2" @click.prevent="sendMessage" style="width: 20px; height: 20px; margin-right: 2px;">
          <svg width="18" height="18" viewBox="0 0 18 18" fill="none" style="margin: 2px 2px 0 0;" xmlns="http://www.w3.org/2000/svg"><path d="M17.6703 0.329582C17.3632 0.0235823 16.9053 -0.0810427 16.497 0.0663323L0.746972 5.69133C0.322847 5.84208 0.029222 6.23246 0.00222196 6.68133C-0.024778 7.13133 0.218222 7.55321 0.622097 7.75571L5.78135 10.3342L11.0025 6.60596C11.2612 6.42146 11.5796 6.73983 11.3951 6.99858L7.66572 12.2208L10.2442 17.3801C10.4366 17.7615 10.827 18.0011 11.2511 18.0011C11.2747 18.0011 11.2972 18 11.3197 17.9988C11.7697 17.9718 12.1601 17.6793 12.312 17.2541L17.9358 1.50296C18.081 1.09458 17.9775 0.636707 17.6703 0.329582Z" fill="currentColor"/></svg>
        </button>
      </div>
    </div>
  </div>
</template>

<script>
  import config from '@/api-services/_config';
  import AudioSender from '@/components/messenger/audio-sender.vue';
  import AddSourceCompact from '@/components/uploader/add-source-compact'

  export default {
    name: 'MessengerSender',
    props: ['socketStatus', 'isAnswering', 'modelId'],
    components: {
      AudioSender,
      AddSourceCompact
    },
    data() {
      return {
        recordingAudio: false,
        message: '',
        showOptions: false,
        timeout: null,
        audioChunksReceived: 0,
        sendAudioTimeoutId: null,
      }
    },
    computed: {
      root() {
        return this.$root.$children[0];
      },
      socket() {
        return this.root.socket;
      },
      sendOnEnter() {
        return this.$store.state.sendOnEnter;
      },
      isDeployedApp() {
        return config.isDeployedApp;
      },
      sessionId() {
        return !this.isDeployedApp ? false : config.sessionValue;
      },
      assistants() {
        return this.$store.state.assistants;
      },
      assistant() {
        return this.$store.state.selectedAssistant
      },
      roomId() {
        return this.$route.query.room_id;
      },
      tokensUsed() {
        return this.$store.state.tokensUsed;
      },
      tokenExceed(){
        switch (this.$store.state.currentPlan) {
          case 'free':
            return 90000 < this.tokensUsed;
          case 'starter':
            return 180000 < this.tokensUsed;
          case 'premium':
            return 465000 < this.tokensUsed;
          case 'enterprise':
            return false;
          default: return false;
        }
      }
    },
    methods: {
      toggleOptions() {
        this.showOptions = !this.showOptions;
      },
      onRecStart(recordingId) {
        this.recordingAudio = true;
        this.audioChunksReceived = 0;
        clearTimeout(this.sendAudioTimeoutId); // reset timer of old audio in case it screwed up
        this.socket.emit('audio-start', { recordingId });
      },
      onRecStop() {
        this.recordingAudio = false;
      },
      async audioChunk(chunk) {
        const d = await this.blobToBase64(chunk.data);
        const ok = await this.socket.emitWithAck('audio-chunk', {
          recordingId: chunk.id,
          data: d,
        });
        if ( ok === 'OK' ) {
          this.audioChunksReceived++;
        }
      },
      cancelAudioMessage(recordingId) {
        this.socket.emit('audio-cancel', { recordingId });
      },
      async sendAudioMessage(audio) {
        const uniqueId = Math.floor(Math.random() * 1000000);
        if(!audio.audioUrl) {
          //this.cancelAudioMessage(audio.id);
          return;
        }

        // we should expect this many audio chunks to have been sent before emitting a new message to the server
        const expectedChunks = audio.expectedChunks;
        let sendAttempts = 10;

        this.$logActivity({action: 'click', page: this.$route.name, type: 'sendAudioMessage', ref_id: this.roomId});
        this.$emit('sendAudio', { audio: audio, id: uniqueId });
        // add a small delay to allow the final audio chunk to send first
        const internalSendAudio = () => {
          if ( this.audioChunksReceived < expectedChunks ) {
            if ( sendAttempts-- > 0 ) {
              this.sendAudioTimeoutId = setTimeout(internalSendAudio, 200);
            } else {
              console.error('timeout waiting for chunks');
            }
            return;
          }
          this.socket.emit('new message', JSON.stringify({
            ref_id: uniqueId,
            user: config.sessionValue,
            recording_id: audio.id,
            message: `[recording:${audio.id}]`,
            message_type: 'audio',
            model_id: this.assistant.id,
            audio: this.enableAudio,
            room_id: this.roomId,
            engine: this.engineId ?? 1,
          }));
        };
        internalSendAudio();

        this.triggerFocus();
      },
      triggerFocus() {
        setTimeout(() => this.$refs.senderTextarea.focus(), 50);
      },
      async onMessage(evt = {}) {
        let textarea = this.$refs.senderTextarea;
        let shiftCond = this.sendOnEnter ? !evt.shiftKey : evt.shiftKey;
        if(evt.keyCode == 13 || evt.keyCode == 0) {
          this.typing = '';
          if(!this.root.isMobile && shiftCond) {
            if(this.message && this.message != '') {
              if(this.editingId)
                this.updateMessage();
              else {
                this.sendMessage();
              }
            }
            evt.preventDefault();
          }
        }
        if(!this.message) {
          textarea.style.minHeight = 'auto';
          //this.$refs.chatFooter.style.minHeight = 'auto';
          return;
        } else {
          this.timeout && clearTimeout(this.timeout);
          this.timeout = setTimeout(() => this.$emit('detectLinks', this.message), 500);
        }
        setTimeout(() => {
          textarea.style.minHeight = '22px';
          let targetHeight = textarea.scrollHeight < 116 ? textarea.scrollHeight : 116;
          if(evt.keyCode == 8) {
            if(targetHeight == 116 && targetHeight == textarea.scrollHeight)
              targetHeight = textarea.scrollHeight - 22;
          }
          textarea.style.minHeight = `${targetHeight}px`;
          /*if(this.$refs.chatFooter && targetHeight > 50)
            this.$refs.chatFooter.style.minHeight = `${targetHeight + (this.urls ? 103 : 58)}px`;
          else
            this.$refs.chatFooter.style.minHeight = 'auto';*/
        }, 100);
      },
      sendMessage() {
        if(this.tokenExceed) {
          return this.$swal({
            title: 'Token Limit Exceeded',
            text: 'To continue, you need to upgrade your plan.',
            icon: 'warning',
            confirmButtonText: 'Upgrade',
            showCancelButton: true,
            cancelButtonText: 'Cancel'
          }).then((result) => {
            if (result.isConfirmed) {
              this.$router.push('/pricing');
            }
          });
        }
        if(!this.message || this.isAnswering) return;
        this.$emit('sendMessage', this.message);
        this.message = '';
        this.$refs.senderTextarea.style.minHeight = 0;
        this.triggerFocus();
      },
      blobToBase64(blob) {
        return new Promise(resolve => {
          const reader = new FileReader();
          reader.onload = () => resolve(reader.result.split(',')[1]);
          reader.readAsDataURL(blob);
        });
      },
    }
  };
</script>
<style lang="scss" scoped>
  .sender {
    min-height: 46px;
    border-radius: 8px;
    border: 1px solid var(--bs-sender-border-color);
    background: var(--bs-sender-bg);
    box-shadow: 0px 1px 2px 0px rgba(0, 0, 0, 0.03);
    .btn {
      height: 33px;
      padding: 0 7px;
      border-radius: 8px !important;
    }
    textarea {
      height: 28px;
      border: none;
      background: none;
      resize: none;
      font-size: 16px;
      color: var(--bs-form-control-color);
    }
  }
</style>
