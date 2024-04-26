<template>
  <div id="messengerModule" ref="messenger" class="w-100" style="min-width: 300px;">
    <div id="messenger" class="border-left">
      <!--
        @dragover.stop.prevent="onDragOver" @dragleave.stop.prevent="onDragLeave" @drop.stop.prevent="onDrop"
        <div class="drag-n-drop-overlay position-absolute w-100 h-100 pointer-events-none" v-if="dragover">
        <div class="position-absolute w-100 h-100 d-flex flex-column align-items-center justify-content-center">
          <svg width="42" height="42" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" /></svg>
          <div class="fw-bold mt-2">
            Drop your file to start uploading
          </div>
        </div>
      </div>-->
      <div class="me-2 bg-primary p-3 pb-0" v-if="roomId == 'ezai'">
        <h6>EZAI.io Assistant</h6>
        <p>This chat will show you all system notifications, it will also alert you when files have issues so you can address them.</p>
      </div>
      <div v-else-if="!isDeployedApp" class="d-flex justify-content-between align-items-center px-3 py-2 border-bottom border-top bg-base topbar">
        <div class="d-flex align-items-center" v-if="assistant">
          <AssistantThumbnail :assistant="assistant" />
          <template v-if="assistantName != null">
            <input ref="assistantName" class="form-control small form-control-xs" v-model="assistantName" @keydown.esc="assistantName = null" @keydown.enter="updateAssistantName" />
            <button class="d-flex align-items-center ms-2" @click="updateAssistantName">
              <svg width="20" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6"><path stroke-linecap="round" stroke-linejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
            </button>
          </template>
          <template v-else>
            <div class="text py-2 room-text" data-bs-toggle="tooltip" :title="assistant.name">
              <div class="fw-medium">{{ assistant.name }}</div>
              <div class="smaller text-muted mt-n1" v-if="assistant.description">{{ assistant.description.slice(0, 99) }}{{ assistant.description.length > 99 ? '...' : '' }}</div>
            </div>
          </template>
          <form @submit.prevent="updateTitle" class="d-flex cursor-pointer" v-if="editing == room.id">
            <input type="text" v-model="editText" class="form-control custom-input">
            <div class="d-flex">
              <button type="submit" class="p-1 cursor-pointer" @click.prevent="updateTitle">
                <svg  xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="18" height="18" viewBox="0 0 50 50">
                  <path d="M 41.9375 8.625 C 41.273438 8.648438 40.664063 9 40.3125 9.5625 L 21.5 38.34375 L 9.3125 27.8125 C 8.789063 27.269531 8.003906 27.066406 7.28125 27.292969 C 6.5625 27.515625 6.027344 28.125 5.902344 28.867188 C 5.777344 29.613281 6.078125 30.363281 6.6875 30.8125 L 20.625 42.875 C 21.0625 43.246094 21.640625 43.410156 22.207031 43.328125 C 22.777344 43.242188 23.28125 42.917969 23.59375 42.4375 L 43.6875 11.75 C 44.117188 11.121094 44.152344 10.308594 43.78125 9.644531 C 43.410156 8.984375 42.695313 8.589844 41.9375 8.625 Z"></path>
                </svg>
              </button>
              <button class="p-1 cursor-pointer" @click="cancelEditing"><svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="18" height="18" viewBox="0 0 50 50">
                <path d="M25,2C12.319,2,2,12.319,2,25s10.319,23,23,23s23-10.319,23-23S37.681,2,25,2z M33.71,32.29c0.39,0.39,0.39,1.03,0,1.42	C33.51,33.9,33.26,34,33,34s-0.51-0.1-0.71-0.29L25,26.42l-7.29,7.29C17.51,33.9,17.26,34,17,34s-0.51-0.1-0.71-0.29	c-0.39-0.39-0.39-1.03,0-1.42L23.58,25l-7.29-7.29c-0.39-0.39-0.39-1.03,0-1.42c0.39-0.39,1.03-0.39,1.42,0L25,23.58l7.29-7.29	c0.39-0.39,1.03-0.39,1.42,0c0.39,0.39,0.39,1.03,0,1.42L26.42,25L33.71,32.29z"></path>
              </svg>
              </button>
            </div>
          </form>
        </div>
        <div class="d-flex">
          <PinnedMessages ref="pinnedMessages" />
          <div class="d-flex align-items-center">
            <button type="button" class="ms-3 d-flex align-items-center" @click="toggleSidebar" :class="{ 'rotate-180': collapsedSidebar }" style="transition: transform .2s">
              <svg width="10" height="11" viewBox="0 0 10 11" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M1 1.5L5 5.5L1 9.5" stroke="#8390A2" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/><path d="M9 1.5L9 9.5" stroke="#8390A2" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></svg>
            </button>
          </div>
        </div>
      </div>
      <transition name="fadeHeight">
        <div v-if="notification" class="alert alert-warning m-0 rounded-0 fs-7 d-flex justify-content-between align-items-center py-2">
          <div class="d-flex flex-column">
            <p v-if="notification.title" class="fw-bold mb-0">{{ notification.title }}</p>
            <p class="small text-muted mb-0">{{ notification.description }}</p>
          </div>
          <button @click="notification = false" type="button">
            <svg width="12" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="4" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" /></svg>
          </button>
        </div>
      </transition>
      <div ref="chat" class="chat pt-3 position-relative h-100 d-flex flex-column" :style="{deployBackground : isDeployedApp }"  :class="{ 'withLinks': filteredUrls && filteredUrls.length, 'px-lg-5' : isDeployedApp }">
        <div ref="insideChat">
          <div class="small text-muted mb-1" v-if="typing">{{ typing }}</div>
          <div class="d-flex justify-content-center align-items-center" :class="{ 'loading h-100' : !conversation.length }" v-if="loading" style="min-height: 50px;">
            <div role="status" class="spinner-border text-primary"><span class="visually-hidden">Loading...</span></div>
          </div>
          <MessengerDeploy v-if="showDeployIntroMessage" class="bubble" ref="bubble-deploy" :item="{ sending: false, self_msg: false, message_type: 'text', data: deployObject.message, pre_chat_form: deployObject.pre_chat_form }" />
          <!-- BUBBLES -->
          <div :class="`group group-${group[0].skill_id}`" v-for="(group, i) in groupedConvo" :key="`group-${i}`">
            <div class="tabs d-inline-flex mx-3" v-if="group[0].skill_id != null">
              <div class="tab text-uppercase fw-bold">Skill</div>
              <div class="tab title small">{{ group[0].skill_name }}</div>
            </div>
            <div class="wrapper px-3">
              <MessengerBubble
                v-for="(c, i) in group"
                ref="bubbles"
                class="bubble"
                :class="c.skill_id ? `skill-${c.skill_id}` : ''"
                :item="c"
                :fontSize="fontSize"
                :key="`${c.id}-${i}`"
                :id="`${c.id}`"
                :totalMessages="conversation.length"
                @editMessage="editMessage"
                @onPlay="onPlayAudio"
                @onShowOptions="showOptions"
                @onHideOptions="hideOptions"
                @onSuggestion="addSuggestion"
                @onPin="togglePin"
                @showRaw="showRaw"
                @addToInstructions="addToInstructions"
                @onFeedback="onFeedback"
                @regenerateMessage="regenerate"
                @delete="onDelete"
                @scrollToBottom="scrollBottom"
              />
            </div>
            <div class="tabs d-inline-flex mx-3" v-if="group[0].skill_id != null">
              <div class="tab text-uppercase fw-bold">Finish training</div>
            </div>
          </div>
          
          <div class="px-3">
            <MessengerBubble v-if="waitingResponse"  class="bubble" ref="bubble-placeholder" :item="{ sending: false, self_msg: false, message_type: 'text', data: 'generating-placeholder'}" />
            <MessengerBubble v-if="waitingTooLong" class="bubble" :item="{ sending: false, self_msg: false, message_type: 'text', data: 'generating-error'}" />
            <transition name="fadeHeight">
              <div class="d-flex align-items-center justify-content-center" v-if="isAnswering">
                <button type="button" class="btn btn-secondary small text-uppercase d-flex align-items-center" @click="stopGenerating">
                  <svg class="me-2" width="16" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" d="M18.364 18.364A9 9 0 005.636 5.636m12.728 12.728A9 9 0 015.636 5.636m12.728 12.728L5.636 5.636" /></svg>
                  Stop Generating
                </button>
              </div>
            </transition>
          </div>
          <transition name="fadeHeight">
            <div class="d-flex align-items-center justify-content-between alert alert-info mb-0" v-if="refreshConversation && conversation.length > 0 ">
              <div class="w-50">
                Because you made changes to your AI model mid conversation, <strong>You need to clear conversation, in order for effects to take place</strong>.
              </div>
              <div class="d-flex justify-content-end w-50">
                <button type="button" class="btn btn-outline-secondary me-2" @click="dismissRefreshConversation">
                  Dismiss
                </button>
                <button type="button" class="btn btn-outline-secondary ms-2" @click="deleteConversation">
                  <div class="d-flex align-items-center justify-content-center my-3" v-if="loadingDeleteConversation">
                    <div class="spinner-border spinner-border-sm"></div>
                  </div>
                  <svg class="me-2" width="16" height="18" viewBox="0 0 16 18" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M1.33334 4.83334H14.6667" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/><path d="M6.33334 8.16666V13.1667" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/><path d="M9.66666 8.16666V13.1667" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/><path d="M2.16666 4.83334L2.99999 14.8333C2.99999 15.2754 3.17558 15.6993 3.48815 16.0119C3.80071 16.3244 4.22463 16.5 4.66666 16.5H11.3333C11.7754 16.5 12.1993 16.3244 12.5118 16.0119C12.8244 15.6993 13 15.2754 13 14.8333L13.8333 4.83334" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/><path d="M5.5 4.83333V2.33333C5.5 2.11232 5.5878 1.90036 5.74408 1.74408C5.90036 1.5878 6.11232 1.5 6.33333 1.5H9.66667C9.88768 1.5 10.0996 1.5878 10.2559 1.74408C10.4122 1.90036 10.5 2.11232 10.5 2.33333V4.83333" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></svg>
                  Clear chat
                </button>

                <button type="button" class="btn btn-secondary ms-2" @click="newChat">
                  <div class="d-flex align-items-center justify-content-center my-3" v-if="loadingDeleteConversation">
                    <div class="spinner-border spinner-border-sm"></div>
                  </div>
                  <svg class="me-2" width="16" height="15" viewBox="0 0 16 15" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M0.5 7.5C0.5 8.48491 0.693993 9.46018 1.0709 10.3701C1.44781 11.2801 2.00026 12.1069 2.6967 12.8033C3.39314 13.4997 4.21993 14.0522 5.12987 14.4291C6.03982 14.806 7.01509 15 8 15C8.98491 15 9.96018 14.806 10.8701 14.4291C11.7801 14.0522 12.6069 13.4997 13.3033 12.8033C13.9997 12.1069 14.5522 11.2801 14.9291 10.3701C15.306 9.46018 15.5 8.48491 15.5 7.5C15.5 6.51509 15.306 5.53982 14.9291 4.62987C14.5522 3.71993 13.9997 2.89314 13.3033 2.1967C12.6069 1.50026 11.7801 0.947814 10.8701 0.570904C9.96018 0.193993 8.98491 0 8 0C7.01509 0 6.03982 0.193993 5.12987 0.570904C4.21993 0.947814 3.39314 1.50026 2.6967 2.1967C2.00026 2.89314 1.44781 3.71993 1.0709 4.62987C0.693993 5.53982 0.5 6.51509 0.5 7.5Z" fill="white"/>
                    <path d="M4.36365 7.5H11.6364" stroke="#0F172A" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                    <path d="M8 3.86328V11.136" stroke="#0F172A" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                  </svg>
                  New Chat
                </button>
              </div>
            </div>
          </transition>
        </div>
      </div>
      <div ref="chatFooter" class="p-3 pb-1 pt-0 chat-footer d-flex flex-column align-items-end position-relative" :class="{ 'px-lg-5' : isDeployedApp }">
        <LinkList :links="filteredUrls" @onDelete="onDeleteLink" />
        <div class="files w-100 px-3 py-2 mb-2 border rounded" v-if="files && files.length">
          <div class="info py-1 d-flex align-items-end small fw-bold" v-for="file in files" :key="file.name">
            {{ file.name }}
            <div class="flex-grow-1 mb-1 ms-3">
              <div class="progress" style="height: 4px;">
                <div class="progress-bar bg-primary progress-bar-striped progress-bar-animated" role="progressbar" :aria-valuenow="file.progress" :style="`width: ${file.progress}%`" aria-valuemin="0" aria-valuemax="100"></div>
              </div>
              </div>
          </div>
        </div>
        <div v-if="newMessageAlert" class="newMessage" @click="scrollBottom">
          <svg class="ball text" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M15 13l-3 3m0 0l-3-3m3 3V8m0 13a9 9 0 110-18 9 9 0 010 18z" /></svg>
        </div>
        <MessengerSender ref="sender" @sendMessage="sendMessage" @sendAudio="sendAudio" @detectLinks="detectLinks" :isAnswering="isAnswering" :modelId="modelId" :socketStatus="socketStatus" v-else />
      </div>
      <div class="overlay" @click="hideOptions" :class="{ 'visible' : showingOptions }" ref="overlay"></div>
    </div>
    <FeedbackModal ref="feedbackModal" :eventId="feedbackEventId" style="z-index: 1000000;" />
  </div>
</template>

<script>
  import moment from 'moment';
  import config from '@/api-services/_config';
  import MessengerBubble from '@/components/messenger/messenger-bubble';
  import { EventBus } from '@/main';
  import ChatService from '@/api-services/chat.service';
  import MessengerDeploy from '@/components/messenger/messenger-deploy';
  import LinkList from '@/components/link-detector/list';
  import FeedbackModal from '@/modals/feedback';
  import InstructionsService from '@/api-services/instructions.service';
  import AssistantThumbnail from '@/components/models/thumbnail';
  import ModelsService from "@/api-services/models.service";
  import MessengerSender from '@/components/messenger/messenger-sender';
  import PinnedMessages from '@/components/messenger/pinned-messages'

  export default {
    name: 'MessengerModule',
    components: {
      MessengerDeploy,
      MessengerBubble,
      MessengerSender,
      LinkList,
      FeedbackModal,
      AssistantThumbnail,
      PinnedMessages
    },
    data() {
      return {
        refreshConversation: false,
        assistantName: null,
        socketStatus: null,
        notification: false,
        audio: null,
        dragover: false,
        recordingAudio: false,
        showAlert: true,
        message: '',
        blockText: '',
        textareaHeight: 28,
        showingOptions: false,
        page: 0,
        conversation: [],
        typing: false,
        loading: true,
        newMessageAlert: false,
        user: {
          user_name: '',
          name: '',
          email: '',
        },
        roomId: null,
        waitingResponse: false,
        waitingTooLong: false,
        waitingTimeout: null,
        modelId: null,
        isAnswering: false,
        oldModelId: '',
        showDeployIntroMessage: null,
        isDeployedApp: false,
        editingId: null,
        urls: [],
        audioSegments: {},
        audioSegmentsPlayed: [],
        audioTimer: null,
        collapsedSidebar: localStorage.getItem('collapsedSidebar') == 'false' ? false : true,
        feedbackEventId: '',
        roomIdChanged : false,
        clearingChat: false,
        editText: '',
        editing: false,
        activeTask: null,
        activeTaskEventId: null,
      }
    },
    computed: {
      root() {
        return this.$root.$children[0];
      },
      deployObject() {
        if(!config.isDeployedApp){
          return {};
        }
        return this.$parent.deployObject;
      },
      deployBackground() {
        if(!this.deployObject || !this.deployObject.settings || !this.deployObject.settings.color){
          return "#F2F5F8";
        }
        return `rgb(${this.lightenColor(this.deployObject.settings.color, 40)})`;
      },
      socket() {
        return this.root.socket;
      },
      fileUploader() {
        return this.root.$refs.fileUploader;
      },
      files() {
        if(!this.fileUploader){
          return [];
        }
        return this.fileUploader.files.filter(e => e.roomId == this.roomId);
      },
      filteredUrls() {
        return this.urls.filter(e => !e.hidden);
      },
      engineId() {
        return this.$store.state.selectedEngine;
      }, 
      fontSize() {
        return this.$store.state.fontSize;
      },
      searchQuery() {
        return this.$route.query.search_room;
      },
      rooms() {
        return this.$store.state.rooms;
      },
      assistants() {
        return this.$store.state.assistants;
      },
      assistant() {
        return this.$store.state.selectedAssistant;
      },
      sessionId() {
        return config.sessionValue;
      },
      lastConvo() {
        return this.conversation.filter(e => e.self_msg).slice(-1)[0];
      },
      groupedConvo() {
        return this.conversation.map(e => ({ ...e, pinned: this.$store.state.pins.some(i => i.event_id == e.id) })).reduce((a, e) => {
          if(a.length && a[a.length - 1][0].skill_id == e.skill_id) {
            a[a.length - 1].push(e);
          } else {
            a.push([e]);
          }
          return a;
        }, []);
      },
      lastDmId() {
        return this.conversation.length ? this.conversation.slice(-1)[0].id : null;
      },
      lastMessageId() {
        return this.lastConvo ? this.lastConvo.id : 0;
      },
      room() {
        if(this.rooms && this.rooms.length && this.roomId && this.roomId != 'ezai') {
          return this.rooms.find(e => e.id == this.roomId) ||{};
        }
        return {};
      }
    },
    async mounted() {
      window.addEventListener('resize', this.onResize);
      this.onResize();
      try {
        if(!this.assistants) await this.$store.dispatch('getAssistants');
        if(!this.selectedAssistant && this.assistants && this.assistants.length) {
          this.$store.commit('selectAssistant', this.assistants.find(e => e.id == localStorage.getItem('selectedModel')) || this.assistants[0]);
        }
        if(!this.rooms) await this.$store.dispatch('getAllRooms', this.searchQuery);
      } catch(error) {
        console.error(`ERROR! ${error}`);
      }
      if(this.$store.state.selectedAssistant && !this.$route.query.room_id && this.assistants && this.assistants.length) {
        let assistant = this.assistants.find(e => e.id == this.$store.state.selectedAssistant);
        if(assistant) {
          this.roomId = assistant.room_id;
        }
      } else {
        this.roomId = this.$route.query.room_id || (this.rooms && this.rooms.length ? this.rooms[0].id : null);
      }

      if(!this.roomId && this.assistants && this.assistants.length){
        this.roomId = this.assistants[0].room_id;
      }

      this.configureDeployApp();
      this.configureEventBus();
      await this.configureSocket();

      this.root.dontScroll(true);
      this.$refs.chat && this.$refs.chat.addEventListener('scroll', this.onScroll);
      this.loading = false;
      if(!config.isDeployedApp && (!this.assistants || this.assistants.length === 0)){
        this.$router.push('/wizard');
      }

    },
    methods: {
      lightenColor(color, percentage) {
        // Convert the RGB color string to an array of values
        const colorValues = color.match(/\d+/g).map(Number);

        // Apply the lighten function to each color value
        const lighterValues = colorValues.map(value => {
          return Math.round(value + (255 - value) * (percentage / 100));
        });

        // Return the updated color values as a string
        return lighterValues.join(', ');
      },
      editAssistantName() {
        this.assistantName = this.assistant.name;
        setTimeout(() => this.$refs.assistantName.focus(), 0);
      },
      updateAssistantName() {
        this.$store.dispatch('updateAssistant', { id: this.assistant.id, name: this.assistantName, title: this.assistantName });
        this.assistantName = null;
      },
      configureDeployApp() {
        this.isDeployedApp = config.isDeployedApp;
        if(this.isDeployedApp) {
          if(!config.sessionValue) {
            this.loading = false;
            this.showDeployIntroMessage = true;
            this.modelId = this.deployObject.model_id
            return;
          }
        }
      },
      cancelEditing() {
        this.editing = null;
        this.editText = '';
      },
      onDeleteLink(link) {
        this.urls.find(e => e.url == link.url).hidden = true;
      },
      toggleSidebar() {
        EventBus.$emit('togglePanel');
        setTimeout(() => this.collapsedSidebar = localStorage.getItem('collapsedSidebar') == 'false' ? false : true, 0);
      },
      async newChat() {
        this.visible = false;
        let memberId = await config.checkSession();
        await ChatService.newChat({ id: memberId }).then(res => {
          this.$store.commit('setRooms', [ ...this.rooms, { id: res.room_id } ]);
          this.selectRoom(res.room_id);
        });
      },
      async configureAudio() {
        this.socket.on('audio', async raw => {
          let data = raw.data;
          let audioIndex = "key" + raw.index.toString();
          let messageId = raw.messageId;
          let final = raw.final;
          let params = { audio: data,played: false, final}
          if(!Object.prototype.hasOwnProperty.call(this.audioSegments, messageId)) {
            this.$set(this.audioSegments, messageId, []);
          }
          this.$set(this.audioSegments[messageId], audioIndex, params);
        });
      },
      configureSocketDisconnect() {
        this.socket.on('disconnect', () => {
          this.socketStatus = 'disconnected';
          this.reconnectSocket();
        });
      },
      reconnectSocket() {
        setTimeout(() => {
          this.socketStatus = 'reconnecting';
          this.socket.connect();
          // Remove the 'disconnect' event listener before calling the function again
          this.socket.off('disconnect');
          this.socket.off('connect');

          // Check if the socket is reconnected
          this.socket.on('connect', () => {
            this.socketStatus = null;
            // Perform any additional actions after reconnecting, if needed
            this.socket.emit('new user', JSON.stringify({ id: config.sessionValue }));

            // Add the 'disconnect' event listener back again
            this.configureSocketDisconnect();
          });

          // If the socket is still disconnected, call the reconnectSocket function again
          this.socket.on('disconnect', () => {
            this.reconnectSocket();
          });
        }, 2000); // Attempt to reconnect every 2 seconds
      },
      async configureSocket() {
        if(!this.socket) return;
        this.socket.emit('new user', JSON.stringify({ id: config.sessionValue }));
        this.allMessagesSocket();
        this.socket.onAny((event, ...args) => {event, args});
        this.socket.on('new alert', async data => {
          if(this.roomId == 'ezai') {
            this.conversation.push({
              self_msg: false,
              data: `${data.title} <br> ${data.description}`,
              message_type: 'text',
              timestamp: moment().format('hh:mm A'),
            });
            this.scrollBottom(true);
            return;
          }
          this.notification = data
        });
        this.socket.on('file progress', async data => EventBus.$emit('fileProgress', data));
        await new Promise(resolve => {
          this.configureSocketNewMessage();
          this.configureAudio();

          // Set up the disconnect event listener
          this.configureSocketDisconnect();
          this.socket.on('new notification', async data => {
            if(data.message == 'NOTIFY_REFRESH_MESSAGE ') {
              this.scrollBottom(true);
            }
          });

          this.socket.on('task start',async data => {


            if(this.roomId !== data.roomId) {
              return;
            }

            this.isAnswering = false;
            this.activeTask = data.taskId;
            this.activeTaskEventId = data.eventId;
            this.clearTimeoutCheck();
            this.conversation.push({
              id: data.eventId,
              self_msg: false,
              data: data.message,
              count_embeddings: data.count_embeddings,
              buttons: data.buttons &&  data.buttons.length ? JSON.parse(data.buttons) : [],
              urls: data.urls && data.urls.length ? JSON.parse(data.urls) : [],
              message_type: "text",
              timestamp: moment().format('hh:mm A'),
              sending: false,
              room_id: this.roomId,
              isAnswering: true,
              taskId: data.taskId,
            });

            this.scrollBottom(true);
          });

          this.socket.on('task update',async data => {
            if(!this.activeTask || !this.activeTaskEventId){
              return;
            }
            this.startTimeoutCheck();

            this.conversation = this.conversation.map(e => {
              if(e.id ===  this.activeTaskEventId) {
                if(data.message){
                  e.data = /```/.test(data.message) && !data.message.match(/```[\s\S]*?```/) ? `${data.message}\`\`\`` : data.message;
                } else if(data.content) {
                  // not sure if we want this since data.content could contain stuff like a JSON response.
                  // The data.content is meant to be passed as input into GPT, like
                  // {role: 'function', content: "..."} and then we send GPT's output to the user.
                  //e.data = data.content.substring(0,75) + "...";
                }
                if(data.status == 'done') {
                  e.isAnswering = false;
                }else if (data.status == 'error'){
                  e.isAnswering = false;
                }
              }
              return e;
            })
          });

          this.socket.on('new message chunk', async data => {
            if(data.message == 'NOTIFY_REFRESH_MESSAGE ') {
              this.scrollBottom(true);
            } else {
              if(this.roomId == data.room_id) {
                let isExist = this.conversation.find(e => e.id == data.id);
                if(isExist) {
                  if(data.message) {
                    this.conversation = this.conversation.map(e => {
                      if(e.id == data.id) {
                        e.data = /```/.test(data.message) && !data.message.match(/```[\s\S]*?```/) ? `${data.message}\`\`\`` : data.message;
                      }
                      return e;
                    })
                  }
                  if(Object.prototype.propertyIsEnumerable.call(data, 'final')) {
                    this.isAnswering = false;
                    EventBus.$emit('stopGenerating',{ id: data.id })
                    this.$set(this.conversation.find(e => e.id == data.id), 'isAnswering', false);
                  }
                } else {
                  this.isAnswering = true;
                  this.conversation.push({
                    id: data.id,
                    self_msg: false,
                    data: data.message,
                    count_embeddings: data.count_embeddings,
                    buttons: data.buttons &&  data.buttons.length ? JSON.parse(data.buttons) : [],
                    urls: data.urls && data.urls.length ? JSON.parse(data.urls) : [],
                    message_type: "text",
                    timestamp: moment().format('hh:mm A'),
                    sending: false,
                    room_id: this.roomId,
                    isAnswering: true
                  });
                  this.scrollBottom(true);
                }
                this.clearTimeoutCheck();
                let chat = document.getElementsByClassName('chat')[0];
                if(chat.scrollHeight - chat.clientHeight - chat.scrollTop < 1)
                  this.scrollBottom(false, false);
              }
            }
          });
          this.socket.on('update id of event', async data => {
            this.conversation = this.conversation.map(e => {
              if(e.id == data.ref_id)
                e.id = data.id
              return e;
            })
          })
          this.socket.on('update text of audio', async raw => {
            this.conversation = this.conversation.map(e => {
              if(e.id == raw.ref_id)
              e.data = raw.text
              return e;
            })
            if(this.conversation.filter(i => i.self_msg).length === 1)
            this.updateTitleRoom(raw.text);
          });
          resolve();
        });
      },
      allMessagesSocket() {
        this.socket.on('all messages', async data => {
          let memberId = await config.checkSession();
          data = JSON.parse(data);
          if(!data.messages.length) {
            if(config.isDeployedApp && this.conversation.length === 0) {
              setTimeout(() => {
                let member = config.getMember();
                const uniqueId = Math.floor(Math.random() * 1000000);
                this.socket.emit('new message', JSON.stringify({
                  ref_id: uniqueId,
                  user: config.sessionValue,
                  message: `[user:${member.memberName} entered chat]`,
                  message_type: 'action',
                  model_id: this.assistant.id,
                  room_id: this.roomId,
                  engine: 1,
                }));
              }, 1000);
            }
            this.loading = false;
            return;
          }
          data.messages.forEach(async e => {
            await this.addBubble(e, memberId)
          });
          setTimeout(() => {
            if(this.page == 0) {
              this.scrollBottom();
            } else {
              this.$refs.chat.scrollTop = this.$refs.insideChat.getBoundingClientRect().height - this.initHeight;
            }
          });
          this.loading = false;
        });
      },
      async addBubble(item, memberId) {
        this.conversation.unshift({
          ...item,
          self_msg: item.member_id == memberId,
          buttons: item.buttons ? JSON.parse(item.buttons) : [],
          urls: item.urls ? JSON.parse(item.urls) : [],
          timestamp: moment(item.date_added).format('hh:mm A'),
          sending: false,
          file_url: item.file_url ?? null,
        });
      },
      configureSocketNewMessage() {
        this.socket.on('new message', async data => {
          if(this.roomId === data.room_id && (!data.message_type || data.message_type !== 'action')) {
            this.conversation.push({
              id: data.id,
              self_msg: false,
              data: data.message,
              buttons: data.buttons && data.buttons.length > 0 ? JSON.parse(data.buttons) : [],
              urls: data.urls && data.urls.length > 0  ? JSON.parse(data.urls) : [],
              message_type: data.message_type ?? 'text',
              timestamp: moment().format('hh:mm A'),
              sending: false
            });
            if(Object.prototype.propertyIsEnumerable.call(data, 'final')) {
              this.clearTimeoutCheck();
            }
            this.scrollBottom();
          }
        });
      },
      scrollToBottom(){
        this.scrollBottom();
      },
      async getMessages() {
        while(!this.socket) {
          await new Promise(resolve => setTimeout(resolve, 1000));
        }
        this.loading = true;
        this.initHeight = Math.max(this.$refs.insideChat.getBoundingClientRect().height, this.$refs.chat.getBoundingClientRect().height);
        this.socket.emit('get all messages', JSON.stringify({ page: this.page, room_id: this.roomId }));
        this.loading = false
      },
      async regenerateIfError() {
        if(this.conversation.length > 1) {
          const item = this.conversation[this.conversation.length - 2];
          this.$logActivity({action: 'click', page: this.$route.name, type: 'regenerateMessageOnError', ref_id: item.id});

          await new Promise(resolve => {
            this.socket.emit('regenerate response', JSON.stringify({
              user: config.sessionValue,
              room_id: this.roomId,
              message: '',
              model_id: this.assistant.id,
              id: item.id,
              engine: this.engineId ?? 1,

            }))
            resolve();
          });

          this.startTimeoutCheck();
          this.scrollBottom(true);
          this.$refs.sender.triggerFocus();
        }
      },
      async regenerate(item) {
        await new Promise(resolve => {
          this.socket.emit('regenerate response', JSON.stringify({
            user: config.sessionValue,
            room_id: this.roomId,
            message: '',
            model_id: this.assistant.id,
            id: item.id,
            engine: this.engineId ?? 1,

          }))
          resolve();
        });
        this.conversation.pop();
        this.startTimeoutCheck();
        this.scrollBottom(true);
        this.$logActivity({action: 'click', page: this.$route.name, type: 'regenerateMessage', ref_id: item.id});
      },
      async updateMessage() {
        const self = this;
        this.conversation = this.conversation.map(e => {
          if(this.editingId == e.id) e.data = self.message;
          return e;
        })
        const msg = this.message;
        this.message = ''
        await new Promise(resolve => {
          this.socket.emit('edit message', JSON.stringify({
            user: config.sessionValue,
            room_id: this.roomId,
            message: msg,
            message_type: 'text',
            model_id: this.assistant.id,
            id: this.editingId,
            engine: this.engineId ?? 1,

          }))
          this.editingId = null;
          resolve();
        });
        this.startTimeoutCheck();
        this.scrollBottom(true);
        this.$refs.sender.triggerFocus();
        this.$logActivity({ action: 'click', page: this.$route.name, type: 'updateMessage', ref_id: this.roomId });
      },
      editMessage(args) {
        this.editingId = args.id;
        this.message = args.data;
        this.updateMessage();
        this.message = '';
      },
      async sendMessage(msg) {
        const roomId = this.roomId;
        const models = [this.assistants.find(e => Object.prototype.hasOwnProperty.call(e, 'room_id') && e.room_id === roomId), ...this.assistants.filter(e => Object.prototype.hasOwnProperty.call(e, 'room_id') && e.room_id !== roomId)];

        this.$store.commit('setAssistants', models);

        this.urls = [];
        if(!this.roomId) {
          await this.newChat();
        }
        if(this.editingId) {
          this.updateMessage();
          return;
        }
        this.$store.commit('setRooms', this.rooms.map(e => ({ ...e, date_added: e.id == this.roomId ? moment().format('YYYY-MM-DD HH:mm:ss') : '' })));

        this.$logActivity({action: 'click', page: this.$route.name, type: 'sendMessage', ref_id: this.roomId});
        if(!this.conversation.filter(i => i.self_msg).length) {
          this.updateTitleRoom(msg);
        }

        const uniqueId = Math.floor(Math.random() * 1000000);

        this.conversation.push({
          id: uniqueId,
          self_msg: true,
          room_id: this.roomId,
          message_type: 'text',
          data: msg,
          timestamp: moment().format('hh:mm A'),
          sending: false
        });
        await new Promise(resolve => {
          this.socket.emit('new message', JSON.stringify({
            ref_id: uniqueId,
            user: config.sessionValue,
            room_id: this.roomId,
            message: msg,
            message_type: 'text',
            model_id: this.assistant.id,
            audio: this.enableAudio,
            engine: this.engineId ?? 1,
          }))
          resolve();
        });
        // eslint-disable-next-line no-unreachable
        this.startTimeoutCheck();
        this.scrollBottom(true);
      },
      sendAudio(args) {
        this.conversation.push({
          id: args.id,
          self_msg: true,
          is_media: true,
          data: '',
          message_type: 'audio',
          timestamp: moment().format('hh:mm A'),
          sending: false,
          file_url: args.audio.audioUrl,
        });
        this.scrollBottom(true);
      },
      startTimeoutCheck(time = 20000) {
        this.clearTimeoutCheck();
        this.waitingResponse = true;
        this.waitingTooLong = false;
        // need to show an error in 5 seconds if waitingResponse is still true
        this.waitingTimeout = setTimeout(() => {
          if(this.waitingResponse) {
            this.waitingTooLong = true;
            this.waitingResponse = false;
          }
        }, time);
      },
      clearTimeoutCheck() {
        this.waitingTimeout && clearTimeout(this.waitingTimeout);
        this.waitingResponse = false;
        this.waitingTooLong = false;
      },
      detectLinks(msg) {
        let arr = msg.match(/https?:\/\/(www\.)?[-a-zA-Z0-9@:%._+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_+.~#?&//=]*)/igm) || [];
        this.urls = arr.map(e => ({ url: e, hidden: false }));
      },
      configureEventBus() {
        EventBus.$on('newChat', this.selectRoom);
        EventBus.$on('regenerateIfError', this.regenerateIfError);
        EventBus.$on('selectRoom', this.selectRoom);
        EventBus.$on('deleteRoom', this.deleteRoom);
        EventBus.$on('useThisSnippet', this.useThisSnippet);
        EventBus.$on('pastePrompt', m => { this.message = m; this.$refs.sender.triggerFocus() });
        EventBus.$on('clearConversation', () => this.conversation = []);
      },
      stopGenerating() {
        this.$logActivity({action: 'click', page: this.$route.name, type: 'stopGenerating', ref_id: this.roomId});

        this.socket.emit('stop generating', JSON.stringify({ id: config.sessionValue, room_id: this.roomId }));
      },
      pasteLastMessage() {
        this.$logActivity({action: 'click', page: this.$route.name, type: 'pasteLastMessage', ref_id: this.roomId});

        this.message = !this.message ? this.conversation.filter(e => e.self_msg).pop().data : this.message;
      },
      showOptions(el) {
        this.showingOptions = el;
      },
      hideOptions() {
        this.showingOptions = false;
      },
      selectRoom(id) {
        if(this.roomId != id) this.roomId = id;
      },
      deleteRoom(id) {
        this.socket.emit('delete room', JSON.stringify({id: config.sessionValue, room_id: id }));
      },
      updateTitleRoom(title) {
        EventBus.$emit('updateTitle',{ room_id: this.roomId, title: title })
        this.socket.emit('update title of room', JSON.stringify({ id: config.sessionValue,room_id: this.roomId, title: title }));
      },
      async togglePin(data) {
        //this.conversation.find(e => e.id == data.id).pinned = data.value;
        this.$logActivity({ action: 'click', page: this.$route.name, type: 'saveSnippet', ref_id: this.roomId });
        if(data.value) {
          this.$toast('Message Pinned!');
          this.$store.dispatch('pinMessage', ({ data: data.text, model_id: this.modelId, event_id: data.id }));
        }
        else {
          this.$toast('Message unpinned!');
          this.$store.dispatch('unpinMessage', ({ event_id: data.id }));
        }
        //this.$refs.pinnedMessages.loadSnippets();
      },
      onPlayAudio() {
        this.$refs.bubbles.forEach(e => e.stopAudio());
      },
      onResize() {
        let targetHeight = `${window.innerHeight - ((window.innerWidth <= 991) ? 67 : 62)}px`;
        if(document.getElementById('messenger')) {
          document.getElementById('messenger').style.height = targetHeight;
          //document.getElementById('messengerHeader').style.top = `${window.visualViewport.offsetTop.toString()}px`;
        }
      },
      onScroll() {
        if(this.page == 0 && this.loading) return;
        if(this.$refs.chat.scrollTop == 0 && this.conversation.length > 2) {
          this.page++;
          this.getMessages();
        }
      },
      scrollBottom(always = false, smooth = true) {
        setTimeout(() => {
          this.newMessageAlert = false;
          if(always || this.page == 0) {
            let elmnt = document.getElementsByClassName('chat')[0];
            if(elmnt){
              elmnt.scrollTo({ top: elmnt.scrollHeight, behavior: smooth ? 'smooth' : 'instant' });
            }
          }
        }, 100);
      },
      onDragOver() {
        this.dragover = true;
      },
      onDragLeave() {
        this.dragover = false;
      },
      async onDrop(evt) {
        this.dragover = false;
        let files = await this.fileUploader.parseFilesArray(evt);
        [...files].forEach(async e => {
          e.roomId = this.roomId;
          let resp = await this.fileUploader.upload(e);
          resp;
        });
      },
      addSuggestion(s) {
        console.log(s);
        this.message = s;
        setTimeout(() => this.sendMessage(s), 100);
        setTimeout(() => this.scrollBottom(), 300);
      },
      useThisSnippet(data) {
        this.message = data.data
      },
      showRaw(item) {
        if(item.lastData) {
          item.data = item.lastData;
          item.lastData = null;
        } else {
          item.lastData = item.data;
          item.data = item.data.split("```").join('');
        }
      },
      async addToInstructions(instruction) {
        this.$logActivity({action: 'click', page: this.$route.name, type: 'addToInstructions', ref_id: this.assistant.id});

        let memberId = await config.checkSession();
        this.saving = true;
        await InstructionsService.add({
          id: memberId,
          instruction: instruction,
          token_size: instruction.split(' ').length - 1,
          model_id: this.assistant.id
        }); 
        EventBus.$emit('selectAssistant', this.assistants.find(e => e.id === this.assistant.id));
      },
      onFeedback(id) {
        this.feedbackEventId = id;
        this.$refs.feedbackModal.show()
      },
      onDelete(id) {
        this.$logActivity({action: 'click', page: this.$route.name, type: 'deleteMessage', ref_id: id});
        this.$swal({
          title: 'Are you sure?',
          text: 'Are you sure, you want to delete this message?',
          icon: 'warning',
          showCancelButton: true
        }).then(async res => {
          if(res.isConfirmed) {
            this.conversation = this.conversation.filter(e => e.id != id);
            await ChatService.delete({room_id: this.roomId, id: id});
            this.$toast('Message deleted successfullly');
          }
        });
      }
    },
    watch: {
      enableAudio() {
        if(this.enableAudio) {
          this.startAudioTimer();
        } else {
          this.stopAudioTImer();
        }
      },
      async roomId(val) {
        this.page = 0;
        this.conversation = [];
        this.$router.push({ query: Object.assign({}, this.$route.query, { room_id: val }) }).catch(() => {});
        if(val != 'ezai') {

          let room = this.rooms.find(e => e.id == this.roomId);
          if(!room || !room.model_id){
            let data = await ModelsService.getModelByRoomId({room_id: this.roomId});
            if(data.modelId) {
              this.modelId = data.modelId;
            }
          } else {
            this.modelId = room && room.model_id ? room.model_id : null;
          }
        }
        this.getMessages();

        this.roomIdChanged = true;
        this.refreshConversation = false;
        this.waitingTooLong = false;
      },
      modelId(val, old) {
        this.oldModelId = old;
        this.roomIdChanged = false;
        //localStorage.setItem('selectedModel', val || '');
        this.$logActivity({action: 'click', page: this.$route.name, type: 'modelIdChanged', ref_id: val});
      },
      message(val) {
        if(val == '') this.editingId = null;
      }
    }
  }
</script>

<style lang="scss" scoped>
  #messenger {
    display: flex;
    flex-direction: column;
    min-height: 0 !important;
    height: 100%;
    position: relative;
    .fs-btn {
      width: 28px;
      min-width: 28px;
      height: 28px;
      border-radius: 4px;
    }
    .overlay {
      position: fixed;
      width: 100%;
      z-index: 2;
      height: 100%;
      background: rgba(0,0,0,.8);
      opacity: 0;
      pointer-events: none;
      transition: opacity .3s;
      &.visible {
        opacity: 1;
        pointer-events: all;
      }
    }
    .drag-n-drop-overlay {
      z-index: 12;
      &::before {
        content: '';
        position: absolute;
        background: var(--bs-body-bg);
        opacity: .7;
        width: 100%;
        height: 100%;
      }
    }
    .suggestions {
      max-width: 80%;
      max-width: 257px;
      min-width: 140px;
      word-wrap: break-word;
      border-radius: 0 20px 20px;
      background: var(--bs-body-bg);
      box-shadow: 0 0 1px rgba(0,0,0,.1);
      ul {
        list-style: none;
      }
    }
    .chat-footer {
      background: var(--bs-chat-bg);
      touch-action: none !important;
      * {
        touch-action: none !important;
      }
    }
    .chat-footer {
      .newMessage {
        left: 50%;
        bottom: 0;
        margin-bottom: 70px;
        position: absolute;
        padding: 20px;
        margin-left: -20px;
        z-index: 10;
          .ball {
          width: 20px;
          border-radius: 20px;
          height: 20px;
          animation: bounce 0.5s;
          animation-direction: alternate;
          animation-timing-function: cubic-bezier(1, 0.1, 1, .5);
          animation-iteration-count: infinite;
        }
      }
      @keyframes bounce {
        from {
          transform: translate3d(0, 0, 0);
        }
        to {
          transform: translate3d(0, 30px, 0);
        }
      }
    }
    .details {
      position: relative;
      border-top: 1px solid rgba(255,255,255,.4);
      .details-info {
        max-height: 0;
        overflow: hidden;
        transition: max-height .3s;
      }
      .details-header-info {
        position: absolute;
        padding-left: 21px;
        width: 100% !important;
        left: -20px;
        opacity: 0;
        transition: all .2s;
        &.visible {
          left: 0;
          opacity: 1;
        }
      }
      button {
        transition: 200ms ease;
      }
      .details-header {
        width: calc(100% - 15px);
      }
      &.details-expanded {
        button {
          transform: rotate(-180deg);
        }
        .details-info {
          max-height: 300px;
        }
      }
    }
    .chat {
      background: var(--bs-chat-bg);
      overflow-y: scroll;
      flex-grow: 1;
      top: 0;
      > *:first-child {
        margin-top: auto;
      }
      &.withLinks {
        padding-bottom: 120px;
      }
    }
    .chat-msg-date {
      text-align: center;
      margin: 30px 0 14px;
    }
    .active-date {
      position: absolute;
      left: 50%;
      bottom: -32px;
      transform: translate(-50%);
      padding: 2px 8px;
      background: rgba(0, 0, 0, 0.7);
      border-radius: 8px;
      transition: opacity 200ms;
      z-index: 3;
      font-size: 0.875rem;
      color: #fff;
    }
    .alert {
      .close-bt {
        position: absolute;
        top: 0;
        right: 0;
      }
    }
    .writing {
      font-size: 30px;
      width: 22px;
      font-weight: bolder;
      &:after {
        content: '\2026';
        -webkit-animation: ellipsis steps(4,end) 900ms infinite;      
        animation: ellipsis steps(4,end) 900ms infinite;
        overflow: hidden;
        display: inline-block;
        width: 0;
      }
    }
    .models-select {
      :deep(.vs__selected) {
        text-transform: capitalize;
      }
      :deep(.vs__dropdown-option) {
        white-space: normal;
        border-bottom: 1px solid var(--bs-border-color);
      }
    }
    .files {
      background: var(--bs-base);
    }
    @keyframes ellipsis {
      to { width: 1.25em; }
    }
    @-webkit-keyframes ellipsis {
      to { width: 1.25em; }
    }
    @media (max-width: 991px) {
      //height: calc(var(--vh, 1vh) * 100) !important;
      position: fixed;
      bottom: 0;
      width: 100%;
      max-height: -webkit-fill-available;
      overflow: auto;
    }
    @media (min-width: 991px) {
      height: calc(var(--vh, 1vh) * 100);
      .loading {
        position: absolute; 
        top: 0;
        left: 0;
        z-index: 8;
        background: var(--bs-card-bg);
        width: 100%;
        height: 100%;
      }
      .chat-footer {
        position: relative;
      }
      .custom-input{
        min-width: 350px;
      }
    }
    .topbar {
      min-height: 55px;
    }
  }
  .group:not(.group-null) {
    margin-bottom: 20px;
    > .wrapper {
      border-top: 2px solid transparent;
      border-bottom: 2px solid transparent;
      padding-top: 20px;
      .title {
        background: #000;
        color: #fff;
        padding: 10px;
        text-align: center;
      }
    }
    > .tabs {
      color: #fff;
      overflow: hidden;
      font-size: 11px;
      margin-bottom: -2px;
      &:first-of-type {
        border-top-left-radius: 4px;
        border-top-right-radius: 4px;
      }
      &:last-of-type {
        top: -2px;
        position: relative;
        border-bottom-left-radius: 4px;
        border-bottom-right-radius: 4px;
      }
      .tab {
        padding: 3px 7px;
        display: flex;
        align-items: center;
        justify-content: center;
      }
    }
    &.group-1 {
      > .wrapper {
        background: var(--bs--group-1-bg);
        border-color: var(--bs--group-1-border);
      }
      .tabs {
        background: var(--bs--group-1-tab);
        .title {
          background: var(--bs--group-1-title);
        }
      }
    }
  }
</style>
