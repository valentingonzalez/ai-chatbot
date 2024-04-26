<template>
  <div ref="bubble" :class="`chat-block d-flex mb-3 align-items-start ${collapsed ? 'collapsed' : ''} ${item.self_msg ? 'to' : 'from'}`" v-if="item">
    <AssistantThumbnail :assistant="assistant" v-if="assistant && !item.self_msg" />
    <div class="chat-bubbles w-100 d-flex flex-grow-1 flex-column justify-content-end" :class="item.self_msg ? 'align-items-end' : 'align-items-start'">
      <!-- v-touch:touchhold="showOptions" v-touch:tap="onTap" @dblclick="showOptions"-->
      <div ref="msgContent" class="d-flex align-items-center chat-bubble-wrapper">
        <div v-if="item.error" class="smallest">there was an error sending this message</div>
        <div v-else-if="item.sending && item.self_msg" class="spinner-border spinner-border-xs me-2"></div>
        <div class="d-flex flex-column position-relative mw-100" :class="!item.self_msg ? 'align-items-start' : 'align-items-end'">
          <div class="chat-bubble p-3 position-relative mw-100">
            <template v-if="item.message_type == 'text' || item.message_type == 'intro' || !item.message_type && item.data">
              <div v-if="isJson">
                <img class="mw-100" v-if="JSON.parse(item.data).url" :src="JSON.parse(item.data).url" alt="">
              </div>
              <div class="gen-response d-flex flex-column align-content-start" v-else-if="item.data == 'generating-placeholder'">
                <span>EZ-AI Is Working Hard <span class="ellipsis"></span></span>
                <img class="d-none" src="@/assets/images/popeye_loading.gif">
              </div>
              <div class="gen-response d-flex flex-column align-content-start" v-else-if="item.data == 'generating-error'">
                <span>EZ-AI might be having some trouble with this one. Some humans will look into it, but in the meantime please <a href="#" @click="regenerateIfError">Regenerate</a>.</span>
              </div>
              <!-- Regular Message -->
              <div class="msg d-flex align-items-center" v-else-if="!editing">
                <div v-if="item.isAnswering && item.taskId" class="spinner-border spinner-border-sm me-2"></div>
                <div class="d-flex flex-column flex-grow-1" :style="{ zIndex: showingOptions ? 20 : 0}">
                  <BubbleOptions :collapsedBubble="collapsed" v-if="$route.query.room_id != 'ezai'" :showingRaw="item.lastData" @onEdit="editMessage" :hasCodeBlocks="item.data.includes('```') || item.lastData?.includes('```')" :self="item.self_msg" :showEdit="item.id == $parent.lastMessageId" @callback="optionsCallback" :pinned="item.pinned" />
                  <div ref="msg" class="msg-content" v-for="block in codeBlocks" :key="block.id">
                    <span v-if="item.message_type === 'intro'" :style="`fontSize: ${fontSize}px`">
                      <typeWriter v-if="totalMessages === 1 || typing" :speed="15" :cursor="false" :autoHeight="false" @onStart="typing = true" @onComplete="showButtons = true; typing = false">
                        <span v-html="block.content"></span>
                      </typeWriter>
                      <span v-else v-html="block.content"></span>
                    </span>
                    <span v-else-if="block.type === 'text'" v-html="block.content" :style="`fontSize: ${fontSize}px`"></span>
                    <div v-else class="position-relative mb-1">
                      <div class="position-absolute d-flex align-items-center d-none" style="top: 0; z-index:200; right: 30px;">
                        <button v-if="checkIfHtml(block.content)" class="copy-button btn btn-link text-light btn-sm" @click="addPreview(block)" :class="{ 'disabled': addingPreview == block.id }">
                          <div class="spinner-border spinner-border-sm" v-if="addingPreview == block.id"></div>
                          <svg v-else width="20" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6"><path stroke-linecap="round" stroke-linejoin="round" d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z" /><path stroke-linecap="round" stroke-linejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
                        </button>
                      </div>
                      <CodeEditor ref="codeEditor"  :read_only="true" :wrap_code="true" width="100%" :font_size="`${fontSize - 2}px`" :hide_header="false" :display_language="false" v-model="block.content" />
                    </div>
                  </div>
                </div>
              </div>
              <div v-else-if="editing">
                <TextareaAutosize @keydown.native.esc="editing = false" class="edit-block" ref="editBlock" v-model="editText" />
                <div class="d-flex align-items-center justify-content-end mt-2">
                  <a class="me-2 text-white small text-decoration-none" @click="editing = false" href="#">Cancel</a>
                  <button @click="saveEdited" type="button" class="btn btn-outline-secondary btn-sm small">Send</button>
                </div>
              </div>
              <!-- URLS -->
              <a v-for="(preview, i) in item.urls" :href="preview.url" class="preview p-2 text-dark card mt-2 border-light shadow-sm " :key="`preview-${i}`" target="_blank">
                <div class="d-flex">
                  <div :style="{ backgroundImage: `url(${preview.image})` }" class="thumb"></div>
                  <div class="flex-grow-1 ms-2 overflow-hidden">
                    <div class="description small">{{ preview.title }}</div>
                    <div class="name smaller text-muted text-nowrap">{{ preview.description.substring(0,75) }}</div>
                  </div>
                </div>
              </a>
              <Link class="mt-2" v-for="(link, i) in links" :readonly="true" :link="{ url: link }" :key="`link-${item.id}-${i}`" />
            </template>
            <!-- Audio -->
            <template v-else-if="item.message_type === 'audio'">
              <div v-if="editing">
                <TextareaAutosize @keydown.native.esc="editing = false" class="edit-block" ref="editBlock" v-model="editText" />
                <div class="d-flex align-items-center justify-content-end mt-2">
                  <a class="me-2 text-white small text-decoration-none" @click="editing = false" href="#">Cancel</a>
                  <button @click="saveEdited" type="button" class="btn btn-outline-secondary btn-sm small">Send</button>
                </div>
              </div>
              <div v-else class="d-flex align-items-center audio-frame">
                <button class="me-2 bg-transparent" @click="playPauseAudio">
                  <svg v-if="playingAudio" xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" fill="currentColor"><path fill-rule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zM7 8a1 1 0 012 0v4a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v4a1 1 0 102 0V8a1 1 0 00-1-1z" clip-rule="evenodd" /></svg>
                  <svg v-else xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" fill="currentColor"><path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" clip-rule="evenodd" /></svg>
                </button>
                <div ref="waveform" style="width: 160px;"></div>
                <div class="ms-2">{{ audioTime }}</div>
                <BubbleOptions v-if="item.id == $parent.lastMessageId" :self="item.self_msg" :showEdit="item.id == $parent.lastMessageId" @callback="optionsCallback" :type="'audio'" />
              </div>
            </template>
            <!-- Video -->
            <div v-else-if="item.message_type == 'video'">
              <div v-if="item.data" class="mb-2">{{ item.data }}</div>
              <video controls class="mw-100" :src="item.file_url"></video>
            </div>
            <!-- Image -->
            <div v-else-if="item.message_type == 'image'">
              <div v-if="item.data" class="mb-2">{{ item.data }}</div>
              <img @click="showImageViewer" class="cursor-pointer mw-100" :src="item.file_url" />
            </div>
            <!-- Html -->
            <div v-else-if="item.message_type === 'html'">
              <iframe :srcdoc="item.data"></iframe>
            </div>

            <!-- Suggestions -->
            <div class="suggestions" v-if="(!item.isAnswering || showButtons) && item.buttons && item.buttons.length">
              <ul class="p-0 m-0">
                <transition-group name="fade" tag="li">
                  <li v-for="(s, i) in suggestions" :key="`suggestion-${i}`">
                    <a class="card p-1 ps-1 mt-1 text text-decoration-none fst-italic" href="//#" @click.prevent="addSuggestion(s)">{{ s.title }}</a>
                  </li>
                </transition-group>
              </ul>
            </div>
          </div>
          <div class="d-flex justify-content-between align-items-start gap-2 mt-2 w-100">
            <div class="text-muted" style="font-size: 10px; opacity: .6;">
              <span v-if="edited">Edited </span>
              {{ item.timestamp }}
            </div>
            <div class="options d-flex flex-row align-items-right" :class="{ 'visible' : showingOptions }" v-if="!item.self_msg && item.data != 'generating-placeholder' && $route.query.room_id != 'ezai'">
              <button class="option text-danger me-2"  @click="showDetails" style="z-index: 10" v-if="item.count_embeddings > 0 && !isDeployedApp">
                <svg width="13" height="13" viewBox="0 0 13 13" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M0 13H13V10.0833H3.53086V8.04167H8.50617V5.04167H3.53086V2.91667H13V0H0V13Z" fill="#6B7280"/></svg>
              </button>
              <button class="option text-muted" @click="thumbsUp" style="z-index: 10" :class="{ 'selected': thumb == 2 }">
                <svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M4.08341 6.41669L6.41675 1.16669C6.88088 1.16669 7.326 1.35106 7.65418 1.67925C7.98237 2.00744 8.16675 2.45256 8.16675 2.91669V5.25002H11.4684C11.6375 5.24811 11.805 5.28298 11.9593 5.35223C12.1136 5.42148 12.251 5.52345 12.362 5.65107C12.473 5.77869 12.5549 5.92892 12.602 6.09133C12.6492 6.25375 12.6605 6.42448 12.6351 6.59169L11.8301 11.8417C11.7879 12.1199 11.6466 12.3735 11.4322 12.5557C11.2178 12.7379 10.9448 12.8365 10.6634 12.8334H4.08341M4.08341 6.41669V12.8334M4.08341 6.41669H2.33341C2.024 6.41669 1.72725 6.5396 1.50846 6.7584C1.28966 6.97719 1.16675 7.27393 1.16675 7.58335V11.6667C1.16675 11.9761 1.28966 12.2729 1.50846 12.4916C1.72725 12.7104 2.024 12.8334 2.33341 12.8334H4.08341" stroke="#7F8DA0" stroke-width="1.2" stroke-linecap="round" stroke-linejoin="round"/></svg>
              </button>
              <button class="option text-muted ms-2" @click="thumbsDown" style="z-index: 10" :class="{ 'selected': thumb == 1 }">
                <svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M4.08341 7.58331L6.41675 12.8333C6.88088 12.8333 7.326 12.6489 7.65418 12.3207C7.98237 11.9926 8.16675 11.5474 8.16675 11.0833V8.74998H11.4684C11.6375 8.75189 11.805 8.71702 11.9593 8.64777C12.1136 8.57852 12.251 8.47655 12.362 8.34893C12.473 8.22131 12.5549 8.07108 12.602 7.90867C12.6492 7.74625 12.6605 7.57552 12.6351 7.40831L11.8301 2.15831C11.7879 1.88012 11.6466 1.62654 11.4322 1.44431C11.2178 1.26208 10.9448 1.16347 10.6634 1.16665H4.08341M4.08341 7.58331V1.16665M4.08341 7.58331H2.33341C2.024 7.58331 1.72725 7.4604 1.50846 7.2416C1.28966 7.02281 1.16675 6.72607 1.16675 6.41665V2.33331C1.16675 2.02389 1.28966 1.72715 1.50846 1.50836C1.72725 1.28956 2.024 1.16665 2.33341 1.16665H4.08341" stroke="#7F8DA0" stroke-width="1.2" stroke-linecap="round" stroke-linejoin="round"/></svg>
              </button>
              <button class="option text-muted ms-2" @click="regenerate"  data-bs-toggle="tooltip" title="Regenerate Response" v-if="item.id == $parent.lastDmId" style="z-index: 10" >
                <svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M13 6.2486C12.8166 4.92629 12.2043 3.70109 11.2575 2.76171C10.3107 1.82233 9.08182 1.22089 7.76025 1.05005C6.43869 0.879208 5.09772 1.14843 3.9439 1.81625C2.79009 2.48407 1.88744 3.51344 1.375 4.74579M1 1.74018V4.74579H4M1 7.7514C1.18342 9.07371 1.7957 10.2989 2.74252 11.2383C3.68934 12.1777 4.91818 12.7791 6.23975 12.9499C7.56131 13.1208 8.90228 12.8516 10.0561 12.1837C11.2099 11.5159 12.1126 10.4866 12.625 9.25421M13 12.2598V9.25421H10" stroke="#7F8DA0" stroke-width="1.2" stroke-linecap="round" stroke-linejoin="round"/></svg>
              </button>
            </div>
          </div>
        </div>
      </div>
      <div v-if="item.message_type === 'audio'" style="font-size: 10px; opacity: .6;">
        <div class="text-muted" v-if="item.data">{{ item.data }}</div>
        <div class="text-muted" v-else>
          <TypeWriter :cursor="false">
            Transcribing...
          </TypeWriter>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
  import { EventBus } from '@/main';
  import WaveSurfer from 'wavesurfer.js';
  import CodeEditor from 'simple-code-editor';
  import BubbleOptions from '@/components/messenger/bubble-options';
  import config from '@/api-services/_config';
  import Link from '@/components/link-detector/link';
  import AssistantThumbnail from '@/components/models/thumbnail';

  export default {
    name: 'MessengerBubble',
    components: {
      CodeEditor,
      BubbleOptions,
      Link,
      AssistantThumbnail
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
      },
      totalMessages: {
        default: 0,
      },

    },
    data() {
      return {
        firstLoad: true,
        collapsed: false,
        thumb: parseInt({ ...this.item }.thumb),
        addingPreview: false,
        doubleTap: false,
        wavesurfer: null,
        playingAudio: false,
        urls: null,
        linkPreviews: [],
        audioTime: '0:00',
        loading: true,
        showingOptions: false,
        doubletapping: false,
        copyIndex: false,
        showButtons: false,
        editing: false,
        editText: '',
        typing: false,
        suggestions: [],
      }
    },
    computed: {
      assistants() {
        return this.$store.state.assistants;
      },
      assistant() {
        return this.$store.state.selectedAssistant;
      },
      halfWay() {
        return this.$el.getBoundingClientRect().top + this.$el.getBoundingClientRect().height < window.screen.height / 2;
      },
      codeBlocks() {
        return this.$root.$children[0].extractCodeBlocks(this.item.data).map(e => {

          if(!this.item.self_msg) {
            // Replace [here] and [Read more] with the contiguous (url)
            e.content = e.content.replace(/(?:^|\W)\[here\]\((.*?)\)(?:$|\W)/gm, ` <a href="$1" target="_blank" class="fw-bold">here</a> `);
            e.content = e.content.replace(/(?:^|\W)\[(.*)\]\((.*?)\)(?:$|\W)/gm, ` <a href="$2" target="_blank" class="fw-bold">$1</a> `);
          }
          
          // Replace the URLs with anchor tags
          e.content = e.content.replace(/(?!<a[^>]*>[^<])(((([A-Za-z]{3,9}:(?:\/\/)?)(?:[-;:&=+$,\w]+@)?[A-Za-z0-9.-]+|(?:www\.|[-;:&=+$,\w]+@)[A-Za-z0-9.-]+)((?:\/[+~%/.\w\-_]*)?\??(?:[-+=&;%@.\w_]*)#?(?:[\w]*))?))(?![^<]*<\/a>)/gm, '<a target="_blank" href="$&">$&</a>');
          
          // Try and add protocol when missing on href=""
          e.content = e.content.replace(/(<a\s+(?:[^>]*?\s+)?href=["'])([^ht])/gi, '$1//$2');

          // Now, let's add the ** markup
          e.content = e.content.replace(/\*\*([^*]+)\*\*/g, '<b>$1</b>');
          
          return e;
        });
      },
      links() {
        if(this.item.isAnswering)
          return [];
        let links = this.codeBlocks.filter(e => e.type == 'text').map(e => e.content).join(' ').match(/href="(.*?)"/igm) || [];
        return links.map(e => e.replace('href="', '').replace('"', ''));
      },
      isJson() {
        let json = [];
        try {
         json = JSON.parse(this.item.data);
        } catch(e) {
          return false;
        }
        if(json.length) {
          return false;
        }
        return false;
      },
      isDeployedApp() {
        return config.isDeployedApp;
      }
    },
    destroyed() {
      this.wavesurfer = null;
    },
    async mounted() {
      if(!this.item) return;
      if(this.item.message_type !== 'intro') {
       // this.showButtons = true;
      }
      if(this.item.message_type === 'audio') {
        this.wavesurfer = WaveSurfer.create({
          container: this.$refs.waveform,
          backend: 'MediaElement',
          barWidth: 3.5,
          barRadius: 6,
          height: 28,
          waveColor: '#fff',
          progressColor: '#fff',
          cursorWidth: 0,
          barGap: 3,
        });
        this.wavesurfer.load(this.item.file_url);
        this.wavesurfer.on('finish', () => this.playingAudio = false);
        
        this.wavesurfer.on('ready', () => {
          if(this.wavesurfer) {
            if(this.wavesurfer.getDuration() != Infinity)
              this.audioTime = this.$options.filters.toTimer(Math.round(this.wavesurfer.getDuration().toFixed(1)));
          }
        });
        this.wavesurfer.on('audioprocess', () => {
          if(this.wavesurfer.isPlaying()) {
            this.audioTime = this.$options.filters.toTimer(Math.round(this.wavesurfer.getCurrentTime().toFixed(1)))
          }
        });
      }
      if(this.totalMessages > 1) {
      //  this.showButtons = true;
      }
      if(this.item.buttons && this.item.buttons.length > 0){
        this.addButtonsSlowly();
      }

      if(this.$refs.codeEditor ) {
        this.$refs.codeEditor.forEach((code) => {
          code.$el.querySelector('textarea').addEventListener('copy', (event) => {
            this.copyCode(code.value);
            event.preventDefault(); // Prevent the default copy behavior
          });
        })
      }
    },
    methods: {
      addButtonsSlowly() {
        let index = 0;
        const intervalId = setInterval(() => {
          // If all buttons have been added, clear the interval
          if (!this.item.isAnswering && index === this.item.buttons.length) {
            this.$emit("scrollToBottom");
            clearInterval(intervalId);
          } else if(!this.item.isAnswering) {
            // Add the next button and increment the index
            this.suggestions.push(this.item.buttons[index]);
            this.$emit("scrollToBottom");
            index++;
          }
        }, 400); // Run every 400ms
      },
      showImageViewer() {
        this.$root.$children[0].$refs.imageViewer.show(this.item.file_url);
      },
      regenerate() {
        this.$emit('regenerateMessage', this.item)
      },
      regenerateIfError() {
        EventBus.$emit('regenerateIfError');
      },
      copyText() {
        this.$logActivity({action: 'click', page: this.$route.name, type: 'copyText', ref_id: this.item.id});

        navigator.clipboard.writeText(this.item.data);
        this.$toast('Message copied to the clipboard!');
      },
      checkIfHtml(text) {
        return text.split('\n')[0] == 'html' || '<!DOCTYPE html>';
      },
      showDetails() {
        this.$root.$children[0].showDetailsTab(this.item.id);
      },
      copyCode(block) {
        const code = block;
        const codeLines = code.split('\n');
        const languageLine = codeLines[0];

        // Check if the first line is a language line (e.g., "javascript", "php", etc.)
        const languageLineRegex = /^[a-z]+$/i;
        if(languageLineRegex.test(languageLine)) {
          // Remove the language line and join the remaining lines
          const codeWithoutLanguage = codeLines.slice(1).join('\n');

          // Copy the modified code to the clipboard
          navigator.clipboard.writeText(codeWithoutLanguage);
        } else {
          // Copy the original code to the clipboard
          navigator.clipboard.writeText(code);
        }
      },
      async addPreview(block) {
        this.$logActivity({action: 'click', page: this.$route.name, type: 'addPreview', ref_id: block.id});

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
        this.$logActivity({action: 'click', page: this.$route.name, type: 'thumbsDown', ref_id: this.item.id});

        this.thumb = this.thumb == 1 ? 0 : 1;
        this.$parent.socket.emit('thumbsdown', JSON.stringify({ id: this.item.id, session: config.sessionValue }));
        this.$emit('onFeedback',this.item.id)
      },
      thumbsUp() {
        this.$logActivity({action: 'click', page: this.$route.name, type: 'thumbsUp', ref_id: this.item.id});

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
        if(type === 'pin') {
          this.$emit('onPin', { id: this.item.id, text: this.item.data, value: !this.item.pinned, model_id: this.assistant });
        }
        if(type === 'copy-prompt') {
          EventBus.$emit('pastePrompt', this.item.data);
        }
        if(type === 'download') {
          this.downloadText(this.item.data);
        }
        if(type === 'show-raw') {
          this.$emit('showRaw', this.item);
        }
        if(type == 'copy-text') {
          this.copyText();
        }
        if(type == 'delete') {
          this.$emit('delete',this.item.id);
        }
        if(type == 'collapse') {
          if(!this.collapsed && this.firstLoad) {
            this.$refs.msg && [...this.$refs.msg].forEach(e => {
              e.style.height = `${e.getBoundingClientRect().height}px`;
              //e.style.width = `${e.getBoundingClientRect().width}px`;
              this.firstLoad = false;
            });
          }
          setTimeout(() => {
            this.collapsed = !this.collapsed;
          }, 10);
        }
        if(type == 'add-to-instructions') {
          this.$emit('addToInstructions', this.item.data);
        }
        if(type == 'onEdit') {
          this.editMessage()
        }
      },
      editMessage() {
        let w = this.$refs.msgContent.getBoundingClientRect().width;
        this.editing = true;
        this.editText = this.item.data;
        setTimeout(() => {
        this.$refs.editBlock.$el.style.width = `${w}px`;
        }, 10);
        setTimeout(() => {
          this.$refs.editBlock.$el.focus();
        }, 50);
      },
      saveEdited() {
        this.$emit('editMessage', {id: this.item.id, data: this.editText});
        this.editing = false;
      },
      downloadText(text) {
        this.$logActivity({action: 'click', page: this.$route.name, type: 'downloadText', ref_id: this.item.id});

        const element = document.createElement("a");
        const file = new Blob([text], {type: 'text/plain'});
        element.href = URL.createObjectURL(file);
        const fileName = `ezai_download_${new Date().toISOString().slice(0, 19).replace(/[-T:]/g, "")}.txt`;
        element.download = fileName;
        document.body.appendChild(element);
        element.click();
        document.body.removeChild(element);
      },
      feedback() {
        this.$emit('onFeedback',this.item.id)
      },
    }
  };
</script>


<style lang="scss" scoped>
.chat-block {
  max-width: 100%;
  .chat-bubbles {
    border-radius: 12px;
    &:hover {
      z-index: 10;
    }
    .options {
      border-radius: 30px;
      //position: absolute;
      transition: opacity .2s;
      bottom: -25px;
      right: 2px;
      .option {
        position: relative;
        display: flex;
        align-items: center;
        justify-content: center;
        transition: all .1s;
        &.selected {
          transform: scale(1.2);
          svg * {
            stroke: var(--bs-primary);
          }
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
    .chat-bubble-wrapper {
      z-index: 1;
    }
    .chat-bubble {
      z-index: 100;
      min-width: 140px;
      word-wrap: break-word;
      box-shadow: 0 1px 1px rgba(0,0,0,.2);
      iframe {
        background: #fff;
      }
      &:hover {
        :deep(.bubble-options) {
          opacity: 1;
        }
      }
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
      border-radius: 0 16px 16px;
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

.edit-block {
  border: 1px dashed rgba(255,255,255,.6);
  padding: 5px;
  background: none;
  color: inherit;
}

.msg-content {
  text-overflow: ellipsis;
  overflow: hidden;
  transition: height .2s;
}
.collapsed {
  .msg-content {
    //white-space: nowrap;
    height: 22px !important;
    ~ .msg-content {
      //white-space: normal;
      height: 0 !important;
    }
  }
}

:deep(.code_editor) {
  tab-size: 2;
  .copy_code {
    z-index: 300;
  }
}

.fade-enter-active, .fade-leave-active {
  transition: opacity .5s;
}
.fade-enter, .fade-leave-to {
  opacity: 0;
}

</style>