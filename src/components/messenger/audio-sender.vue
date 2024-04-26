<!-- eslint-disable no-unreachable -->
<template>
  <div class="d-flex align-items-center justify-content-center audio-sender" :class="{ 'recording' : recording, 'locked': locked }" @keydown.esc="cancelRecording">
    <div class="info" :style="{ pointerEvents: recording ? 'all' : 'none' }" v-if="recording">
      <button class="cancel-bt border-0 text-white d-flex align-items-center justify-content-center rounded-circle me-2" @click="cancelRecording">
        <svg width="18" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" /></svg>
      </button>
      <div class="timer d-flex align-items-center">
        {{ timer.str }}
      </div>
    </div>
    <button :class="{ 'recording': recording }" class="d-flex align-items-center justify-content-center rec-btn rounded-circle" :style="{ 'box-shadow': `0 0 0 ${bigWaveSize}px rgba(220, 38, 29, .2)` }" @click="onClick">
      <!-- v-touch:touchhold="onTouchHold" v-touch:end="onTouchEnd" v-touch:moving="onTouchMove" v-touch:start="onTouchStart" v-touch-options="{ touchHoldTolerance: 10 }" -->
      <svg v-if="!locked" width="14" height="19" viewBox="0 0 14 19" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M7 12C8.66 12 9.99 10.66 9.99 9L10 3C10 1.34 8.66 0 7 0C5.34 0 4 1.34 4 3V9C4 10.66 5.34 12 7 12ZM12.3 9C12.3 12 9.76 14.1 7 14.1C4.24 14.1 1.7 12 1.7 9H0C0 12.41 2.72 15.23 6 15.72V19H8V15.72C11.28 15.24 14 12.42 14 9H12.3Z" fill="#9CA3AF"/></svg>
      <svg v-else width="12" style="margin: 1px 0 0 1px" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M11.7801 0.219469C11.5753 0.0154768 11.2701 -0.0542705 10.9978 0.0439756L0.498032 3.79383C0.215288 3.89432 0.019542 4.15456 0.00154231 4.4538C-0.0164573 4.75379 0.145539 5.03503 0.414784 5.17002L3.85421 6.88895L7.33489 4.40355C7.50739 4.28056 7.71964 4.4928 7.59664 4.66529L5.11044 8.14665L6.8294 11.586C6.95765 11.8403 7.2179 12 7.50064 12C7.51639 12 7.53139 11.9993 7.54639 11.9985C7.84638 11.9805 8.10663 11.7855 8.20788 11.502L11.9571 1.00169C12.0538 0.729448 11.9848 0.424211 11.7801 0.219469Z" fill="white"/></svg>
      <div class="big-wave" :style="`transform: scale(${this.bigWaveSize})`"></div>
    </button>
    <div class="lock d-flex text-white bg-primary justify-content-center position-absolute align-items-start pt-2" :style="{ height: lockHeight }">
      <svg width="16" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" d="M16.5 10.5V6.75a4.5 4.5 0 10-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 002.25-2.25v-6.75a2.25 2.25 0 00-2.25-2.25H6.75a2.25 2.25 0 00-2.25 2.25v6.75a2.25 2.25 0 002.25 2.25z" /></svg>
    </div>
  </div>
</template>

<script>

export default {
  name: 'AudioSender',
  data() {
    return {
      recordingId: '',
      recording: false,
      recorder: null,
      analyser: new Uint8Array(128),
      frequencyData: new Uint8Array(128),
      aFrame: null,
      bigWaveSize: 0,
      mouseInitPos: {x: 0, y: 0},
      cancelTextOffset: 0,
      cancelTextOpacity: 1,
      timer: { interval: null, s: 0, m: 0, str: '0:00' },
      locked: false,
      lockHeight: 0
    }
  },
  computed: {
    isMobile() {
      return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
    }
  },
  methods: {
    detectCursorPos(e) {
      this.mouseInitPos = e.x ? { x: e.x, y: e.y } : { x: e.touches[0].clientX, y: e.touches[0].clientY };
    },
    recordAudio() {
      return new Promise(resolve => {
        navigator.mediaDevices.getUserMedia({ audio: true }).then(stream => {
          const mediaRecorder = new MediaRecorder(stream);
          const audioChunks = [];
          mediaRecorder.addEventListener('dataavailable', event => {
            this.$emit('onChunk', {id: this.recordingId, data: event.data});
            audioChunks.push(event.data);
          });
          this.createAnalyzers(stream);
          const start = () => mediaRecorder.start(5000); // 5 second chunks
          const stop = () => new Promise(resolve => {
            mediaRecorder.addEventListener('stop', () => {
              const audioBlob = new Blob(audioChunks, { type: 'audio/mpeg' });
              const audioUrl = URL.createObjectURL(audioBlob);
              const audio = new Audio(audioUrl);
              const play = () => audio.play();
              stream.getTracks().forEach( track => track.stop() );
              resolve({
                audioBlob,
                audioUrl,
                play,
                id: this.recordingId,
                expectedChunks: audioChunks.length,
              });
            });
            mediaRecorder.stop();
          });
          resolve({ start, stop });
        });
      })
    },
    createAnalyzers(stream) {
      let audioContext = new AudioContext();
      let audioSource = audioContext.createMediaStreamSource(stream);
      this.analyser = audioContext.createAnalyser();
      this.analyser.smoothingTimeConstant = 0.8;
      this.analyser.fftSize = 1024;
      audioSource.connect(this.analyser);
      this.animateRecording();
    },
    animateRecording() {
      this.aFrame = requestAnimationFrame(this.animateRecording);
      const array = new Uint8Array(this.analyser.frequencyBinCount);
      this.analyser.getByteFrequencyData(array);
      const arraySum = array.reduce((a, value) => a + value, 0);
      const average = arraySum / array.length;
      this.bigWaveSize = Math.round(average) / 2;
    },
    async startRecording() {
      this.recordingId = this.randomKey();
      this.$emit('onStart', this.recordingId);
      this.recording = true;
      this.recorder = await this.recordAudio();
      let sec = 0;
      this.timer = { interval: null, s: 0, m: 0, str: '0:00' };
      this.timer.interval = setInterval(() => {
        sec++;
        this.timer.str = this.$options.filters.toTimer(sec);
      }, 1000);
      this.recorder.start();
    },
    async stopRecording() {
      if(this.recording) {
        const audio = await this.recorder.stop();
        this.$emit('sendAudio', audio);
      }
      this.reset();
    },
    cancelAudioMessage(id) {
      this.socket.emit('audio-cancel', { id });
    },
    cancelRecording() {
      if(this.recording) {
        this.recorder.stop();
        this.$emit('sendAudio', { id: this.recordingId });
        this.recorder = null;
      }
      this.reset();
    },
    reset() {
      this.touchStarted = false;
      this.locked = false;
      this.cancelTextOffset = 0;
      this.cancelTextOpacity = 1;
      this.lockHeight = 0;
      this.$emit('onStop');
      this.recording = false;
      cancelAnimationFrame(this.aFrame);
      clearInterval(this.timer.interval);
      this.bigWaveSize = 0;
    },
    onClick() {
      this.locked = true;
      if(!this.recording)
        this.startRecording();
      else
        this.stopRecording();
    },
    randomKey() {
      const array = new Uint8Array(8);
      window.crypto.getRandomValues(array);
      let str = '';
      for ( let i = 0; i < array.length; i++ ) {
        str += array[i].toString(16);
      }
      return str;
    }
  }
};
</script>
<style lang="scss" scoped>
.audio-sender {
  position: static;
  box-sizing: content-box;
  height: 100%;
  right: 0;
  width: 30px;
  &.recording {
    width: 100%;
    .info {
      .cancel-text {
        display: flex !important;
      }
      .timer {
        opacity: 1;
      }
      .bg {
        width: 100%;
      }
    }
    .lock {
      opacity: 1;
    }
  }
  &.locked {
    .rec-btn {
      width: 34px;
      height: 34px;
      right: 10px;
    }
    .cancel-bt {
      margin-left: 0;
    }
    .info {
      .cancel-text {
        display: none !important;
      }
    }
    .lock {
      opacity: 0;
    }
  }
}
.info {
  width: 100%;
  height: 100%;
  overflow: hidden;
  display: flex;
  align-items: center;

  left: 10px;
  .bg {
    background: var(--bs-body-bg);
    height: 100%;
    width: 0;

    right: 0;
    z-index: 0;
    transition: width .2s;
  }
  .cancel-text {

    left: 50%;
    transform: translateX(-50%);
    text-align: center;
    display: none !important;
    color: #9CA3AF;
    z-index: 1;
  }
  .cancel-bt {
    width: 34px;
    height: 34px;
    margin-left: -42px;
    transition: margin-left .2s;
    z-index: 1;
    background: #565656;;
  }
  .timer {
    z-index: 1;
    transition: opacity .3s;
    opacity: 0;
    &::before {
      content: '';
      width: 12px;
      height: 12px;
      border-radius: 12px;
      margin-right: 4px;
      display: block;
      background: var(--bs-primary);
    }
  }
}
.waveform {
  width: auto !important;
  height: 32px !important;
}
.rec-btn {
  width: 40px;
  right: 0;
  height: 100%;
  transition: all .1s;
  z-index: 1;
  &.recording {
    width: 72px;
    height: 72px;
    background: var(--bs-primary);
    svg * {
      fill: white;
    }
  }
}
.lock {
  width: 30px;
  height: 30px;
  border-radius: 30px;
  right: 6px;
  opacity: 0;
  transition: opacity .2s;
  bottom: 50px;
}
</style>
