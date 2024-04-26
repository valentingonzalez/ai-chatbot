<template>
  <div class="d-flex p-2 align-items-center justify-content-between folder-card" v-if="folder">
    <div class="d-flex">
      <div class="folder-square me-4">
        <svg width="34" height="28" viewBox="0 0 34 28" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M1.25 5.25V22.75C1.25 24.683 2.817 26.25 4.75 26.25H29.25C31.183 26.25 32.75 24.683 32.75 22.75V8.75C32.75 6.817 31.183 5.25 29.25 5.25H18.75L15.25 1.75H4.75C2.817 1.75 1.25 3.317 1.25 5.25Z" stroke="#EF4444" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>
      </div>
      <h4 class="mb-0 me-4" v-if="!editing" style="align-self: center;">{{ folder.folder_name }} <code v-if="snippets">({{ snippets?.length }})</code></h4>
      <input v-else-if="editable" type="text" placeholder="New name" v-model="editingName"/>
      <button v-if="editable && !editing" type="button" @click="editing = true">
        <svg width="16" height="17" viewBox="0 0 20 21" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M18.2677 1.73223L18.9748 1.02513L18.9748 1.02513L18.2677 1.73223ZM4.5 19.0355V20.0355C4.76522 20.0355 5.01957 19.9301 5.20711 19.7426L4.5 19.0355ZM1 19.0355H0C0 19.5878 0.447715 20.0355 1 20.0355L1 19.0355ZM1 15.4644L0.292893 14.7573C0.105357 14.9448 0 15.1992 0 15.4644H1ZM15.4393 2.43934C16.0251 1.85355 16.9748 1.85355 17.5606 2.43934L18.9748 1.02513C17.608 -0.341709 15.3919 -0.341709 14.0251 1.02513L15.4393 2.43934ZM17.5606 2.43934C18.1464 3.02513 18.1464 3.97487 17.5606 4.56066L18.9748 5.97487C20.3417 4.60804 20.3417 2.39196 18.9748 1.02513L17.5606 2.43934ZM17.5606 4.56066L3.79289 18.3284L5.20711 19.7426L18.9748 5.97487L17.5606 4.56066ZM4.5 18.0355H1V20.0355H4.5V18.0355ZM14.0251 1.02513L0.292893 14.7573L1.70711 16.1715L15.4393 2.43934L14.0251 1.02513ZM0 15.4644V19.0355H2V15.4644H0ZM12.5251 3.93934L16.0606 7.47487L17.4748 6.06066L13.9393 2.52513L12.5251 3.93934Z" fill="currentColor"/></svg>
      </button>
      <div class="d-flex gap-2" v-else-if="editable">
        <button type="button" @click="changeName">
          <svg  xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="18" height="18" viewBox="0 0 50 50"><path d="M 41.9375 8.625 C 41.273438 8.648438 40.664063 9 40.3125 9.5625 L 21.5 38.34375 L 9.3125 27.8125 C 8.789063 27.269531 8.003906 27.066406 7.28125 27.292969 C 6.5625 27.515625 6.027344 28.125 5.902344 28.867188 C 5.777344 29.613281 6.078125 30.363281 6.6875 30.8125 L 20.625 42.875 C 21.0625 43.246094 21.640625 43.410156 22.207031 43.328125 C 22.777344 43.242188 23.28125 42.917969 23.59375 42.4375 L 43.6875 11.75 C 44.117188 11.121094 44.152344 10.308594 43.78125 9.644531 C 43.410156 8.984375 42.695313 8.589844 41.9375 8.625 Z"></path></svg>
        </button>
        <button type="button" @click="editing = false">
          <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="18" height="18" viewBox="0 0 50 50">  <path d="M25,2C12.319,2,2,12.319,2,25s10.319,23,23,23s23-10.319,23-23S37.681,2,25,2z M33.71,32.29c0.39,0.39,0.39,1.03,0,1.42	C33.51,33.9,33.26,34,33,34s-0.51-0.1-0.71-0.29L25,26.42l-7.29,7.29C17.51,33.9,17.26,34,17,34s-0.51-0.1-0.71-0.29	c-0.39-0.39-0.39-1.03,0-1.42L23.58,25l-7.29-7.29c-0.39-0.39-0.39-1.03,0-1.42c0.39-0.39,1.03-0.39,1.42,0L25,23.58l7.29-7.29	c0.39-0.39,1.03-0.39,1.42,0c0.39,0.39,0.39,1.03,0,1.42L26.42,25L33.71,32.29z"></path></svg>
        </button>
      </div>
    </div>
    <input v-if="selectable" type="checkbox" v-model="selected" @change="onSelected"/>
    <button v-if="deletable" type="button" class="delete-btn" @click="$emit('onDeleteFolder',folder.id)">
      <svg width="16" height="18" viewBox="0 0 16 18" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M10.2833 6.49995L9.995 13.9999M6.005 13.9999L5.71667 6.49995M14.0233 3.82495C14.3083 3.86828 14.5917 3.91411 14.875 3.96328M14.0233 3.82495L13.1333 15.3941C13.097 15.8651 12.8842 16.3051 12.5375 16.626C12.1908 16.9469 11.7358 17.1251 11.2633 17.1249H4.73667C4.26425 17.1251 3.80919 16.9469 3.46248 16.626C3.11578 16.3051 2.90299 15.8651 2.86667 15.3941L1.97667 3.82495M14.0233 3.82495C13.0616 3.67954 12.0948 3.56919 11.125 3.49411M1.97667 3.82495C1.69167 3.86745 1.40833 3.91328 1.125 3.96245M1.97667 3.82495C2.93844 3.67955 3.9052 3.56919 4.875 3.49411M11.125 3.49411V2.73078C11.125 1.74745 10.3667 0.927446 9.38333 0.896613C8.46135 0.867145 7.53865 0.867145 6.61667 0.896613C5.63333 0.927446 4.875 1.74828 4.875 2.73078V3.49411M11.125 3.49411C9.04477 3.33334 6.95523 3.33334 4.875 3.49411" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></svg>
    </button>
  </div>
</template>

<script>
  export default {
    name: 'FolderCard',
    props: {
      folder: {
        default: null,
        required: true
      },
      snippets: {
        default: null,
      },
      deletable: {
        default: false,
      },
      editable: {
        default: false,
      },
      selectable: {
        default: false,
      }
    },
    components: {
    },
    mounted() {
      this.editingName = this.folder.folder_name;
    },
    data() {
      return {
        selected: false,
        editing: false,
        editingName: '',
      }
    },
    methods:{
      onSelected() {
        this.$emit(this.selected ? 'addSelected' : 'removeSelected', this.folder.id)
      },
      changeName(){
        if(!this.editingName.trim()){
          return this.$swal("Please fill the name field","Name should not be empty","warning");
        }
        this.editing = false;
        this.$emit("onChangeFolderName", this.folder.id, this.editingName);
      }
    },
    computed: {
    }
  }
</script>

<style scoped lang="scss">
  .folder-card{
    min-width: 200px;
    border-bottom: 1px solid var(--bs-muted-color);
  }
</style>