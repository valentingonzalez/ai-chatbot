<template>
    <div v-if="link" class="card px-3 py-2 flex-row justify-content-between align-items-center" >
      <div class="thumb d-flex align-items-center justify-content-center">
        <img class="w-100" :src="link.thumbnail_url" alt="">
      </div>
      <a :href="link.file_url" class="smaller flex-grow-1 px-2 text-truncate" target="_blank">
        {{ link.file_url }}
      </a>
      <!-- <div class="form-check form-switch ms-4">
        <input type="checkbox" id="authenticator" class="form-check-input" v-model="enabled">
        <label class="form-check-label" for="authenticator"></label>
      </div> -->
    </div>
  </template>
  
  <script>
    export default {
      name: 'YoutubeCard',
      props: {
        link: {
          default: null,
          required: true
        }
      },
      components: {
      },
      data() {
        return {
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
      }
      a {
        color: #2563EB;
      }
      &
      .disabled {
        background: #F3F4F6;
        a {
          color: #6B7280;
        }
      }
    }
  </style>