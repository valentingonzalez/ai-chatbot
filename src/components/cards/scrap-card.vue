<template>
    <div class="py-2 d-flex justify-content-between" :class="{ 'tile': view != 'list', 'flex-row align-items-center': view == 'list' }">
      <div class="py-2 d-flex align-items-center">
        <div class="d-flex gap-2">
          <div v-if="!scrap.error && !loading" class="form-check">
            <input ref="check" type="checkbox" id="select" class="form-check-input" v-model="selected">
            <label class="form-check-label" for="select"></label>
          </div>
          <div class="thumb d-flex align-items-center justify-content-center border cursor-pointer"  @click="$refs.check.click()">
            <svg v-if="scrap.error" width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M10 15C10.5523 15 11 14.5523 11 14C11 13.4477 10.5523 13 10 13C9.44772 13 9 13.4477 9 14C9 14.5523 9.44772 15 10 15Z" fill="#DC2631"/><path d="M10 6.5V11.5" stroke="#DC2631" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/><path d="M2.74104 14.7758L8.97004 3.2078C9.07022 3.02186 9.21887 2.86651 9.40021 2.75823C9.58156 2.64995 9.78883 2.59277 10 2.59277C10.2112 2.59277 10.4185 2.64995 10.5999 2.75823C10.7812 2.86651 10.9299 3.02186 11.03 3.2078L17.259 14.7758C17.3548 14.954 17.4028 15.154 17.3982 15.3563C17.3936 15.5586 17.3367 15.7562 17.2329 15.9299C17.1291 16.1036 16.9821 16.2474 16.8062 16.3473C16.6302 16.4471 16.4314 16.4997 16.229 16.4998H3.77104C3.56871 16.4997 3.36987 16.4471 3.19392 16.3473C3.01797 16.2474 2.87094 16.1036 2.76717 15.9299C2.6634 15.7562 2.60644 15.5586 2.60186 15.3563C2.59728 15.154 2.64523 14.954 2.74104 14.7758Z" stroke="#DC2631" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></svg>
            <img v-else-if="scrap.snapshot && !scrap.error" class="w-100 h-100"  :src="scrap.snapshot" alt="" />
            <div v-else class="text-center p-4 d-flex align-content-center flex-column">
              <div class="spinner-border spinner-border-sm"></div>
            </div>
          </div>
        </div>
        <div class="d-flex flex-column gap-2" @click="$refs.check.click()">
          <small v-if="scrap.error" class="text-danger">{{ scrap.error }}</small>
          <p v-else-if="scrap.title"  class="small fw-bold flex-grow-1 text-truncate" style="text-wrap: wrap;" target="_blank" :class="{ 'px-2': view == 'list' }">
            {{ scrap.title }}
          </p>
          <div v-else-if="!scrap.snapshot" class="small text-muted ms-2">Scraping...</div>
        </div>
      </div>
      <a :href="scrap.url" v-if="scrap.url">
        <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M11 3C10.7348 3 10.4804 3.10536 10.2929 3.29289C10.1053 3.48043 9.99999 3.73478 9.99999 4C9.99999 4.26522 10.1053 4.51957 10.2929 4.70711C10.4804 4.89464 10.7348 5 11 5H13.586L7.29299 11.293C7.19748 11.3852 7.1213 11.4956 7.06889 11.6176C7.01648 11.7396 6.98889 11.8708 6.98774 12.0036C6.98659 12.1364 7.01189 12.2681 7.06217 12.391C7.11245 12.5139 7.1867 12.6255 7.28059 12.7194C7.37449 12.8133 7.48614 12.8875 7.60904 12.9378C7.73193 12.9881 7.86361 13.0134 7.99639 13.0123C8.12917 13.0111 8.26039 12.9835 8.38239 12.9311C8.5044 12.8787 8.61474 12.8025 8.70699 12.707L15 6.414V9C15 9.26522 15.1053 9.51957 15.2929 9.70711C15.4804 9.89464 15.7348 10 16 10C16.2652 10 16.5196 9.89464 16.7071 9.70711C16.8946 9.51957 17 9.26522 17 9V4C17 3.73478 16.8946 3.48043 16.7071 3.29289C16.5196 3.10536 16.2652 3 16 3H11Z" fill="#334155"/><path d="M5 5C4.46957 5 3.96086 5.21071 3.58579 5.58579C3.21071 5.96086 3 6.46957 3 7V15C3 15.5304 3.21071 16.0391 3.58579 16.4142C3.96086 16.7893 4.46957 17 5 17H13C13.5304 17 14.0391 16.7893 14.4142 16.4142C14.7893 16.0391 15 15.5304 15 15V12C15 11.7348 14.8946 11.4804 14.7071 11.2929C14.5196 11.1054 14.2652 11 14 11C13.7348 11 13.4804 11.1054 13.2929 11.2929C13.1054 11.4804 13 11.7348 13 12V15H5V7H8C8.26522 7 8.51957 6.89464 8.70711 6.70711C8.89464 6.51957 9 6.26522 9 6C9 5.73478 8.89464 5.48043 8.70711 5.29289C8.51957 5.10536 8.26522 5 8 5H5Z" fill="#334155"/></svg>
      </a>
    </div>
</template>

<script>
  export default {
    name: 'ScrapCard',
    props: {
      scrap: {
        default: null,
        required: true
      },
      view: {
        default: 'card',
      },
      loading: {
        defualt:false
      }
    },
    components: {
    },
    data() {
      return {
        selected: this.scrap.selected
      }
    },
    mounted() {
      this.selected = this.scrap.selected;
    },
    computed: {
      ext() {
        return this.file.name.split('.').pop();
      }
    },
    watch: {
      selected(val) {
        this.$emit('onSelect', this.scrap.id, val);
      }
    }
  }
</script>

<style scoped lang="scss">
  .card {
    transition: all .2s;
    .thumb {
      height: 40px;
      width: 70px;
      min-width: 70px;
      object-fit: cover;
      border-radius: 4px;
      overflow: hidden;
      img {
        object-fit: cover;
      }
    }
    a {
      color: var(--bs-body-color);
    }
    &:not(.disabled) {
      box-shadow: 0 0 3px rgba(0,0,0,.1);
    }
    &.disabled {
      background: #F3F4F6;
      a {
        color: #6B7280;
      }
    }
    &.tile {
      .thumb {
        height: auto;
        width: 100%;
      }
      .text-truncate {
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: initial;
        display: -webkit-box;
        -webkit-line-clamp: 2;
        -webkit-box-orient: vertical;
        font-size: 13px;
        font-weight: bold;
        height: 34px;
        line-height: 16px;
        margin-top: 4px;
      }
      .form-check {
        position: absolute;
        top: 13px;
        right: 6px;
        transform: scale(1.3);
      }
    }
  }
</style>