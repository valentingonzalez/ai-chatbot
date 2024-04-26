<template >
  <div class="d-flex w-100 justify-content-between align-items-center" style="position:relative">
    <button class="w-100" type="button" data-bs-toggle="collapse"
    :data-bs-target="'#' + `folder-${folderName.replace(/ /g, '_')}`" aria-expanded="false"
    :aria-controls="`folder-${folderName.replace(/ /g, '_')}`">
    <div class="d-flex p-2 align-items-center justify-content-between folder-card" >
      <div class="d-flex gap-4">
        <div class="folder-square">
          <svg width="34" height="28" viewBox="0 0 34 28" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M1.25 5.25V22.75C1.25 24.683 2.817 26.25 4.75 26.25H29.25C31.183 26.25 32.75 24.683 32.75 22.75V8.75C32.75 6.817 31.183 5.25 29.25 5.25H18.75L15.25 1.75H4.75C2.817 1.75 1.25 3.317 1.25 5.25Z" stroke="#EF4444" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>
        </div>
        <h4 class="mb-0" style="align-self: center;">{{ folderName }} <code v-if="length"> ({{ length }}) </code></h4>
      </div>
    </div>
  </button>
  <button  type="button" class="delete-btn" @click="$emit('onDeleteFolder',folderName)">
    <svg width="16" height="18" viewBox="0 0 16 18" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M10.2833 6.49995L9.995 13.9999M6.005 13.9999L5.71667 6.49995M14.0233 3.82495C14.3083 3.86828 14.5917 3.91411 14.875 3.96328M14.0233 3.82495L13.1333 15.3941C13.097 15.8651 12.8842 16.3051 12.5375 16.626C12.1908 16.9469 11.7358 17.1251 11.2633 17.1249H4.73667C4.26425 17.1251 3.80919 16.9469 3.46248 16.626C3.11578 16.3051 2.90299 15.8651 2.86667 15.3941L1.97667 3.82495M14.0233 3.82495C13.0616 3.67954 12.0948 3.56919 11.125 3.49411M1.97667 3.82495C1.69167 3.86745 1.40833 3.91328 1.125 3.96245M1.97667 3.82495C2.93844 3.67955 3.9052 3.56919 4.875 3.49411M11.125 3.49411V2.73078C11.125 1.74745 10.3667 0.927446 9.38333 0.896613C8.46135 0.867145 7.53865 0.867145 6.61667 0.896613C5.63333 0.927446 4.875 1.74828 4.875 2.73078V3.49411M11.125 3.49411C9.04477 3.33334 6.95523 3.33334 4.875 3.49411" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></svg>
  </button>
</div>
</template>

<script>
  export default {
    name: 'FavoritesFolderCard',
    props: {
      folderName:{
        required:true,
      },
      length:{
        default: null,
      }
    },
    components: {
    },
    mounted() {
      
    },
    data() {
      return {
      }
    },
    methods:{
    },
    computed: {
    }
  }
</script>

<style scoped lang="scss">
  .folder-card{
    width:100%;
    border-bottom: 1px solid var(--bs-muted-color);
  }

  .delete-btn{
    position:absolute;
    right:25px;
    top:auto;
  }
</style>