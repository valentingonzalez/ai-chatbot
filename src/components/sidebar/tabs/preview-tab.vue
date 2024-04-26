<template>
    <div class="h-100">
      <div v-if="!editing">
        <h4>Previews</h4>
        <div class="text-muted fs-7 mb-4">
          When the AI generates HTML code, you can view a preview of the HTML within this tab. To preview the HTML, click on the eye icon that appears when the HTML code is created.
        </div>
        <div class="d-flex align-items-center justify-content-center" v-if="loading">
          <div class="spinner-border mt-5"></div>
        </div>
        <div class="alert alert-warning text-center p-2 fs-7 fw-bold d-flex flex-column gap-1 align-content-center" v-if="filteredPreviews.length === 0">
          <span>No Previews Saved</span>
          <button class="d-none btn btn-outline-primary w-50 mt-3 align-content-center text-center">Generate an Example</button>
        </div>
        <div v-if="!filteredPreviews" class="alert alert-warning text-center p-2 fs-7 fw-bold">
          Preview any HTML here by clicking on the Eye icon on a Code Block
        </div>
        <div class="preview-block card mb-3" v-for="preview in filteredPreviews" :key="preview.id">
          <div>
            <div class="d-flex justify-content-between px-3">
              <div class="d-flex py-2">
                <svg class="me-2 mt-1" width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" clip-rule="evenodd" d="M6.83897 0.804C6.88426 0.57739 7.00664 0.373461 7.18531 0.226887C7.36397 0.0803122 7.58788 0.000139564 7.81897 0H10.179C10.4101 0.000139564 10.634 0.0803122 10.8126 0.226887C10.9913 0.373461 11.1137 0.57739 11.159 0.804L11.49 2.456C12.1884 2.72219 12.8397 3.09863 13.419 3.571L15.017 3.031C15.2359 2.95702 15.4736 2.96112 15.6898 3.04261C15.906 3.1241 16.0874 3.27795 16.203 3.478L17.383 5.522C17.4986 5.72209 17.5414 5.95607 17.504 6.18413C17.4667 6.4122 17.3514 6.62029 17.178 6.773L15.911 7.886C16.0291 8.62397 16.0291 9.37603 15.911 10.114L17.178 11.227C17.3514 11.3795 17.4666 11.5874 17.5042 11.8152C17.5417 12.0431 17.4992 12.2769 17.384 12.477L16.204 14.522C16.0883 14.7223 15.9068 14.8763 15.6904 14.9578C15.474 15.0393 15.236 15.0432 15.017 14.969L13.419 14.429C12.8397 14.9014 12.1884 15.2778 11.49 15.544L11.16 17.196C11.1147 17.4226 10.9923 17.6265 10.8136 17.7731C10.635 17.9197 10.4111 17.9999 10.18 18H7.81897C7.58788 17.9999 7.36397 17.9197 7.18531 17.7731C7.00664 17.6265 6.88426 17.4226 6.83897 17.196L6.50797 15.544C5.80951 15.2778 5.15825 14.9014 4.57897 14.429L2.98097 14.969C2.76208 15.043 2.52432 15.0389 2.30811 14.9574C2.0919 14.8759 1.91058 14.7221 1.79497 14.522L0.614969 12.478C0.499317 12.2779 0.45654 12.0439 0.493913 11.8159C0.531287 11.5878 0.646503 11.3797 0.819969 11.227L2.08697 10.113C1.96898 9.37535 1.96898 8.62364 2.08697 7.886L0.819969 6.773C0.646583 6.62047 0.53133 6.41264 0.49378 6.18478C0.456229 5.95693 0.498696 5.7231 0.613969 5.523L1.79397 3.478C1.90962 3.27773 2.09111 3.12373 2.30753 3.04223C2.52396 2.96073 2.76195 2.95676 2.98097 3.031L4.57897 3.571C5.15855 3.09854 5.81016 2.72209 6.50897 2.456L6.83897 0.804ZM8.99897 12C9.79462 12 10.5577 11.6839 11.1203 11.1213C11.6829 10.5587 11.999 9.79565 11.999 9C11.999 8.20435 11.6829 7.44129 11.1203 6.87868C10.5577 6.31607 9.79462 6 8.99897 6C8.20332 6 7.44026 6.31607 6.87765 6.87868C6.31504 7.44129 5.99897 8.20435 5.99897 9C5.99897 9.79565 6.31504 10.5587 6.87765 11.1213C7.44026 11.6839 8.20332 12 8.99897 12Z" fill="#D1D5DB"/></svg>
                <div>
                  HTML
                  <div class="smaller">Last Used Date: Today</div>
                </div>
              </div>
              <button @click="disablePreview(preview.id)">
                <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg"><g clip-path="url(#clip0_92_469)"><path d="M3.33325 5.83337H16.6666" stroke="currentColor" stroke-width="1.2" stroke-linecap="round" stroke-linejoin="round"/><path d="M8.33325 9.16663V14.1666" stroke="currentColor" stroke-width="1.2" stroke-linecap="round" stroke-linejoin="round"/><path d="M11.6667 9.16663V14.1666" stroke="currentColor" stroke-width="1.2" stroke-linecap="round" stroke-linejoin="round"/><path d="M4.16675 5.83337L5.00008 15.8334C5.00008 16.2754 5.17568 16.6993 5.48824 17.0119C5.8008 17.3244 6.22472 17.5 6.66675 17.5H13.3334C13.7754 17.5 14.1994 17.3244 14.5119 17.0119C14.8245 16.6993 15.0001 16.2754 15.0001 15.8334L15.8334 5.83337" stroke="currentColor" stroke-width="1.2" stroke-linecap="round" stroke-linejoin="round"/><path d="M7.5 5.83333V3.33333C7.5 3.11232 7.5878 2.90036 7.74408 2.74408C7.90036 2.5878 8.11232 2.5 8.33333 2.5H11.6667C11.8877 2.5 12.0996 2.5878 12.2559 2.74408C12.4122 2.90036 12.5 3.11232 12.5 3.33333V5.83333" stroke="currentColor" stroke-width="1.2" stroke-linecap="round" stroke-linejoin="round"/></g><defs><clipPath id="clip0_92_469"><rect width="20" height="20" fill="white"/></clipPath></defs></svg>
              </button>
            </div>
            <div class="content">
              <div class="row g-0">
                <div class="col-6">
                  <CodeEditor :read_only="true" class="block bg-transparent" :wrap_code="true" width="100%" font_size="11px" :hide_header="true" v-model="preview.preview" />
                </div>
                <div class="col-6">
                  <div class="snapshot bg-white h-100">
                    <img v-if="preview.snapshot" class="w-100 h-100" :src="preview.snapshot" />
                    <div v-else class="d-flex flex-column text-center gap-2 text-center p-5  card" style="background: ghostwhite">
                      <div class="ps-3">
                        <div class="spinner-border spinner-border-sm ms-2 align-content-center text-center"></div>
                      </div>
                      Rendering Preview
                    </div>
                  </div>
                  
                </div>
              </div>
            </div>
            <div class="d-flex py-2 px-3 justify-content-end">
              <button type="button" class="btn btn-secondary btn-sm px-4" @click="editPreview(preview)">
                View & Edit Code
              </button>
            </div>
          </div>
        </div>
      </div>
      <template v-else>
        <a href="#" class="text-primary text-uppercase d-inline-flex align-items-center fs-7" @click="onBack">
          <svg class="me-3" width="9" height="16" viewBox="0 0 9 16" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M8 15L1 8L8 1" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>
          Go back to Previews
        </a>
        <div class="d-flex justify-content-center border-top border-bottom py-3 mt-3">
          <ul class="nav justify-content-center p-1 flex-nowrap">
            <li class="nav-item">
              <button ref="btn" class="nav-link w-100 justify-content-center text-muted fw-sbold active" id="preview-tab" data-bs-toggle="tab" data-bs-target="#preview" type="button" role="tab" aria-controls="preview" aria-selected="true">
                <svg class="me-2" width="13" height="10" viewBox="0 0 13 10" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M1 5.125C1 5.125 3.25 1 6.625 1C10 1 12.25 5.125 12.25 5.125C12.25 5.125 10 9.25 6.625 9.25C3.25 9.25 1 5.125 1 5.125Z" stroke="currentColor" stroke-width="1.2" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round"/><path d="M6.625 7.125C7.72957 7.125 8.625 6.22957 8.625 5.125C8.625 4.02043 7.72957 3.125 6.625 3.125C5.52043 3.125 4.625 4.02043 4.625 5.125C4.625 6.22957 5.52043 7.125 6.625 7.125Z" fill="currentColor"/></svg>
                Preview
              </button>
            </li>
            <li class="nav-item ms-2">
              <button ref="btn" class="nav-link w-100 justify-content-center text-muted fw-sbold" id="html-tab" data-bs-toggle="tab" data-bs-target="#html" type="button" role="tab" aria-controls="html" aria-selected="false">
                <svg class="me-2" width="12" height="8" viewBox="0 0 12 8" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M3.75 1L0.75 4L3.75 7" stroke="currentColor" stroke-width="1.2" stroke-linecap="round" stroke-linejoin="round"/><path d="M8.25 7L11.25 4L8.25 1" stroke="currentColor" stroke-width="1.2" stroke-linecap="round" stroke-linejoin="round"/></svg>
                HTML
              </button>
            </li>
          </ul>
        </div>
        <div class="tab-content flex-grow-1 d-flex flex-column h-100" id="myTabContent">
          <div class="tab-pane flex-grow-1 active show mt-4" id="preview" role="tabpanel" aria-labelledby="preview-tab">
            <iframe :srcdoc="editing.preview" class="w-100 h-100 iframe"></iframe>
          </div>
          <div class="tab-pane flex-grow-1" id="html" role="tabpanel" aria-labelledby="html-tab">
            <div class="d-flex justify-content-end mb-3 bg-body mx-n4 px-4 py-2 border-bottom">
              <button type="button" class="btn btn-secondary btn-sm ms-2" @click="resetPreview">
                <svg class="me-2" width="14" height="13" viewBox="0 0 14 13" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M9.68095 4.73196H13.0089L10.8883 2.60996C10.2055 1.92721 9.35509 1.43622 8.42242 1.18636C7.48976 0.936505 6.50775 0.936578 5.57513 1.18658C4.6425 1.43657 3.79212 1.92768 3.10948 2.61054C2.42684 3.29339 1.93599 4.14392 1.68628 5.07663M0.988948 11.596V8.26796M0.988948 8.26796H4.31695M0.988948 8.26796L3.10895 10.39C3.79169 11.0727 4.64214 11.5637 5.57481 11.8136C6.50747 12.0634 7.48948 12.0633 8.4221 11.8133C9.35473 11.5633 10.2051 11.0722 10.8877 10.3894C11.5704 9.70653 12.0612 8.856 12.3109 7.92329M13.0089 1.40396V4.73063" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></svg>
                Reset
              </button>
              <button type="button" class="btn btn-primary btn-sm ms-2" @click="saveEditedPreview">
                <div class="spinner-border spinner-border-sm me-2" v-if="savingCode"></div>
                Save code
              </button>
            </div>
            <CodeEditor :wrap_code="true" width="100%" font_size="13px" :hide_header="true" v-model="editing.preview" />
          </div>
        </div>
      </template>
    </div>
</template>
  

<script>
import CodeEditor from 'simple-code-editor';
import PreviewService from '@/api-services/preview.service';

export default {
  name: 'PreviewTab',
  components: {
    CodeEditor
  },
  data() {
    return {
      code: null,
      previews: [],
      editing: false,
      savingCode: false,
      loading: false
    }
  },
  computed: {
    completeHTML() {
      return `${this.code.html}<style>${this.code.css}</style>`;
    },
    filteredPreviews() {
      return this.previews ? this.previews.filter(e => !e.disabled) : [];
    }
  },
  async mounted() {
    this.loading = true;
    let ret = await PreviewService.getPreviews();
    this.previews = ret.data;
    if(this.previews) {
      let prev = this.previews.find(e => e.id == localStorage.getItem('editingPreview'));
      if(prev) {
        this.editPreview(prev);
      } else {
        localStorage.removeItem('editingPreview');
      }
    }

    this.loading = false;
  },
  methods: {
    onBack() {
      this.editing = null;
      localStorage.removeItem('editingPreview');
    },
    editPreview(preview) {
      localStorage.setItem('editingPreview', preview.id);
      this.editing = { ...preview, original: preview.preview };
    },
    resetPreview() {
      this.editing.preview = this.editing.original;
    },
    async addPreview(code) {
      let saveresp = await PreviewService.savePreview({ preview: code });
      this.loading = true;
      if(!saveresp.exists) {
        let prevresp = await PreviewService.getPreview(saveresp.id);
        this.previews.unshift(prevresp.data);
      }
      this.editPreview(this.previews.find(e => e.id == saveresp.id));
      this.loading = false;
    },
    async savePreview() {
      await PreviewService.savePreview({ preview: this.completeHTML});
    },
    async saveEditedPreview() {
      this.$logActivity({action: 'click', page: this.$route.name, type: 'previewSaveCode', ref_id: this.editing.id});

      this.savingCode = true;
      let resp = await PreviewService.saveAndEditPreview({ preview: this.editing.preview, id: this.editing.id });
      this.previews = this.previews.map(e => e.id == resp.updated.id ? resp.updated : e);
      //this.editing = null;
      this.savingCode = false;
      this.$toast('Code Successfully Saved!');
    },
    disablePreview(id) {
      PreviewService.disable(id);
      this.previews = this.previews.filter(e => id != e.id);
    }
  }
}
</script>

<style scoped lang="scss">
  .preview-block {
    background: #374151;
    color: #D1D5DB;
    .content {
      background: #111827;
      [class*=col] {
        max-height: 200px;
        overflow: hidden;
      }
      .snapshot img {
        object-fit: cover;
        object-position: center 0;
      }
      .block {
        overflow: hidden;
      }
    }
  }
  :deep(.block.code_editor) {
    code {
      padding: 8px 12px !important;
      background: none !important;
    }
  }
</style>