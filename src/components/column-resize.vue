<template>
  <div ref="column" class="column" :style="{ width: `${width}px`, minWidth: `${minWidth}px` }">
    <slot />
    <div v-if="!disabled" :class="`resizer resizer-${direction}`" @mousedown="start"></div>
  </div>
</template>

<script>

export default {
  name: 'ColumnResize',
  props: {
    width: {
      type: Number,
      default: 0
    },
    minWidth: {
      type: Number,
      default: 0
    },
    maxWidth: {
      type: Number,
      default: 100000
    },
    direction: {
      type: String,
      default: 'r'
    },
    disabled: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      resizing: false,
      original_width: 0,
      original_x: 0,
      original_mouse_x: 0,
      prev_x: 0
    };
  },
  methods: {
    start(e) {
      this.originalWidth = Number(this.$refs.column.style.width.replace('px',''));
      this.original_width = parseFloat(getComputedStyle(this.$refs.column, null).getPropertyValue('width').replace('px', ''));
      this.original_x = this.$refs.column.getBoundingClientRect().left;
      this.original_mouse_x = e.pageX;
      document.body.classList.add('no-select');
      window.addEventListener('mousemove', this.startResizing);
      window.addEventListener('mouseup', this.stopResizing);
      this.$emit('onMousedown');
    },
    stopResizing() {
      document.body.classList.remove('no-select');
      window.removeEventListener('mousemove', this.startResizing)
    },
    startResizing(e) {
      if(this.direction == 'r') {
        const width = this.original_width + (e.pageX - this.original_mouse_x);
        if(width > this.minWidth && width < this.maxWidth) {
          this.$refs.column.style.minWidth = `${width}px`;
        } else {
          if(width < 180) {
            this.stopResizing();
            this.$emit('onCollapse');
          }
        }
      }
      else if(this.direction == 'l') {
        let preWidth = this.$refs.column.style.minWidth;
        const width = this.original_width - (e.pageX - this.original_mouse_x);
        if(width > this.minWidth && width < this.maxWidth) {
          this.$refs.column.style.minWidth = `${width}px`;
          if(Math.round(this.$refs.column.getBoundingClientRect().left + width) > window.innerWidth) {
            this.$refs.column.style.minWidth = preWidth;
          }
        }
      }
    }
  }
}
</script>

<style scoped lang="scss">
  .column {
    position: relative;
    .resizer {
      width: 20px;
      height: 100%;
      position: absolute;
      top: 0;
      right: -10px;
      z-index: 10;
      cursor: e-resize;
      &::after {
        content: '';
        width: 1px;
        height: 100%;
        position: absolute;
        left: 9px;
        //background: #c2c2c2;
      }
      &.resizer-l {
        right: auto;
        left: -10px;
        cursor: w-resize;
      }
    }
  }
</style>
<style>
  body.no-select * {
    user-select: none;
    -o-user-select: none;
    -moz-user-select: none;
    -khtml-user-select: none;
    -webkit-user-select: none;
    -ms-user-select: none;
  }
</style>