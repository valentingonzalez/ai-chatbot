<template>
  <div class="card p-1 mb-2 position-relative">
        <button v-if="!folder" type="button" class="add-to-folder-bt" @click="$emit('onOpenAddToFolderModal',item)">
          <svg width="20" height="18" viewBox="0 0 20 16" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M3 15C1.89543 15 1 14.1046 1 13V3C1 1.89543 1.89543 1 3 1H7L9 3H13C14.1046 3 15 3.89543 15 5V6M3 15H17C18.1046 15 19 14.1046 19 13V8C19 6.89543 18.1046 6 17 6H7C5.89543 6 5 6.89543 5 8V13C5 14.1046 4.10457 15 3 15Z" stroke="currentColor" stroke-width="2" stroke-linecap="round"/></svg>
        </button>
        <button v-if="!folder" type="button" class="delete-bt" @click="$emit('onDeleteSnippet',item)">
          <svg width="16" height="18" viewBox="0 0 16 18" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M10.2833 6.49995L9.995 13.9999M6.005 13.9999L5.71667 6.49995M14.0233 3.82495C14.3083 3.86828 14.5917 3.91411 14.875 3.96328M14.0233 3.82495L13.1333 15.3941C13.097 15.8651 12.8842 16.3051 12.5375 16.626C12.1908 16.9469 11.7358 17.1251 11.2633 17.1249H4.73667C4.26425 17.1251 3.80919 16.9469 3.46248 16.626C3.11578 16.3051 2.90299 15.8651 2.86667 15.3941L1.97667 3.82495M14.0233 3.82495C13.0616 3.67954 12.0948 3.56919 11.125 3.49411M1.97667 3.82495C1.69167 3.86745 1.40833 3.91328 1.125 3.96245M1.97667 3.82495C2.93844 3.67955 3.9052 3.56919 4.875 3.49411M11.125 3.49411V2.73078C11.125 1.74745 10.3667 0.927446 9.38333 0.896613C8.46135 0.867145 7.53865 0.867145 6.61667 0.896613C5.63333 0.927446 4.875 1.74828 4.875 2.73078V3.49411M11.125 3.49411C9.04477 3.33334 6.95523 3.33334 4.875 3.49411" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></svg>
        </button>
        <button v-else type="button" class="add-to-folder-bt" @click="$emit('onRemoveFromFolder',item,folder)">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M9 13H15M3 17V7C3 5.89543 3.89543 5 5 5H11L13 7H19C20.1046 7 21 7.89543 21 9V17C21 18.1046 20.1046 19 19 19H5C3.89543 19 3 18.1046 3 17Z" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>
        </button>
        <div class="snippet-body card-body d-flex align-items-start justify-content-between border-bottom pt-4 mb-1">
          <div class="text-muted small fs-7 pe-2">
            <div v-for="data in parsedData(item.data)" :key="`data-${data.id}`">
              <pre class="mb-0" v-if="data.type == 'text'">{{ data.content }}</pre>
              <CodeEditor v-else-if="data.type == 'code'" :read_only="true" :wrap_code="true" width="100%" :font_size="`12px`" :hide_header="false" :display_language="false" v-model="data.content" />
            </div>
          </div>
        </div>
        <div class="d-flex justify-content-end pe-3 pb-2">
          <a href="#" class="fw-bold text-primary small" @click="$emit('onUseThis',item)">Use Snippet</a>
        </div>
      </div>
</template>

<script>
  import CodeEditor from 'simple-code-editor';
  export default {
    name: 'SnippetCard',
    props: {
      item: {
        default: null,
        required: true
      },
      folder: {
        default: null,
      }
    },
    components: {
      CodeEditor,
    },
    mounted() {
    },
    data() {
      return {
      }
    },
    methods:{
      parsedData(data) {
      return this.$root.$children[0].extractCodeBlocks(data);
      },
    },
    computed: {
    }
  }
</script>

<style scoped lang="scss">
    pre {
    white-space: pre-wrap;
  }
  .snippet-body {
    max-height: 270px;
    overflow: auto;
    position: relative;
  }
  .delete-bt {
    position: absolute;
    top: 10px;
    right: 10px;
    z-index: 1;
  }

  .add-to-folder-bt {
    position: absolute;
    top: 10px;
    right: 35px;
    z-index: 1;
  }
</style>