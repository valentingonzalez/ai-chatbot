<template>
  <div ref="typewriter">
    <div ref="slot">
      <slot></slot>
    </div>
    <div :style="{ width: `${this.width}px` }" v-html="finalText" class="typewriter" :class="{ 'writing': cursor && showCursor }"></div>
  </div>
</template>

<script>

  export default {
    name: 'TypeWriter',
    props: {
      speed: {
        default: 20
      },
      delay: {
        default: 0
      },
      cursor: {
        default: true
      },
      autoHeight: {
        default: true
      }
    },
    data() {
      return {
        text: '',
        typeWriting: '',
        currentChar: 0,
        int: null,
        showCursor: false,
        started: false,
        width: 'auto'
      }
    },
    computed: {
      textArray() {
        let text = this.text.substring(0, 1) == ' ' ? this.text.replace(/^./, "") : this.text;
        let arr = text.split('/(?=<)/g');
        return arr.length > 1 ? arr.flatMap(e => e.split(/(?=>)/g)).filter(e => e).flatMap(e => e[0] == '<' ? e : e.split('')) : arr.flatMap(e => e.split(''));
      },
      lastChar() {
        return this.textArray.length;
      },
      finalText() {
        return this.typeWriting.charAt(this.typeWriting.length - 1) == '<' ? this.typeWriting.slice(0, -1) : this.typeWriting;
      }
    },
    mounted() {
      this.text = this.$refs.slot.innerHTML;
      if(this.autoHeight)
        this.$refs.typewriter.style.height = `${this.$refs.slot.getBoundingClientRect().height}px`;
      this.$refs.slot.remove();
      setTimeout(() => {
        this.started = true;
        this.write();
        this.$parent.$children.forEach(e => {
          if(e != this && e.removeCursor && e.started) {
            e.removeCursor();
          }
        });
        this.showCursor = true;
      }, this.delay);
    },
    methods: {
      removeCursor() {
        this.showCursor = false;
      },
      write() {
        this.$emit('onStart');

        //let speed = this.textArray[this.currentChar].substring(0, 3) == '<br' ? this.speed * 10 : this.speed;
        //let speed = this.textArray[this.currentChar] == '<' || this.textArray[this.currentChar - 1] == '<' ? 0 : this.speed;
        this.int = setTimeout(() => {
          this.typeWriting += this.textArray[this.currentChar];
          this.currentChar++;
          if(this.currentChar == this.lastChar) {
            this.$emit('onComplete');
            return;
          }
          this.write();
        }, this.speed);
      }
    }
  }
</script>
<style scoped lang="scss">
  .typewriter {
    &.writing::after {
      content: '|';
      font-size: inherit;
      animation: blink .7s infinite;
    }
  }
  @keyframes blink {
    0% { opacity: 0 }
    49% { opacity: 0 }
    50% { opacity: 1 }
  }
</style>