<template>
    <div v-if="file" class="file card flex-row align-items-center p-3 fs-7 bg-light mb-1">
        <div class="status">
            <div v-if="disable && !hide_disable" class="alert alert-danger smaller px-2 py-0 mb-0">
                Disabled
            </div>
            <div v-else-if="!file.completed" class="alert alert-warning small px-2 py-0 mb-0 d-flex gap-1">
              <div class="percent me-2">{{ file.progress }}%</div>
              <div class="spinner me-2" v-if="false">
                <ProgressCircle :completed-steps="file.progress" :total-steps="100" :diameter="20" :circle-width="2" start-color="var(--bs-primary)" stop-color="var(--bs-primary)" circle-color="transparent" />
              </div>
            </div>
            <div v-else class="alert alert-success small px-2 py-0 mb-0">
                Completed
            </div>
        </div>
        <div class="thumb rounded overflow-hidden"
            :class="{ 'svg': this.placeholders[this.file.file_type], 'opacity-50': disable }">
            <img v-if="file.thumbnail_url" :src="file.thumbnail_url" alt="">
            <img v-else :src="placeholder" alt="">
        </div>
        <div class="ms-3 flex-grow-1 overflow-hidden" :class="{ 'opacity-50': disable }">
            <h6 class="fw-bold mb-0 fs-7 text-truncate">
                <a v-if="file.file_url" :href="file.file_url" target="_blank">
                    {{ file.title || file.file_url }}
                </a>
                <div v-else>
                    {{ file.title || file.file_url }}
                </div>
            </h6>
            <div class="text-muted d-none">{{ file.description }}</div>
            <a class="smaller fw-bold text-info cursor-pointer" @click="getModelsForFile(file.id)"> {{ file.models }} Assistant • </a>
          <span>{{ file.date_formatted }} • </span>
          <span>{{ file.id }}</span>
        </div>

        <a href="#" @click="viewEmbeddings(file.id)" class="d-flex align-items-center btn btn-outline-primary btn-sm ">
          Embeddings ({{ file.number_of_embeddings }})
        </a>
    </div>
</template>
  
<script>
// import FileService from '@/api-services/files.service';

export default {
    name: 'FilePageCard',
    props: {
        file: {
            default: null,
            required: true
        },
        hide_disable:{
          default: null,
        }
    },
    components: {
    },
    mounted() {
        this.disable = this.file.disable;
    },
    data() {
        return {
            placeholders: {
                csv: 'thumbnail-csv.svg',
                document: 'thumbnail-doc.svg',
                pdf: 'thumbnail-pdf.svg',
                audio: 'thumbnail-audio.svg'
            },
            disable: null
        }
    },
    methods: {
        viewEmbeddings(id) {
            this.$router.push('/embeddings/'+id);
        },
        getModelsForFile(id) {
            this.$emit('getModelsForFile',id)
        }
    },
    computed: {
        placeholder() {
            return require(`@/assets/images/${this.placeholders[this.file.file_type] ? this.placeholders[this.file.file_type] : 'thumbnail-placeholder.png'}`);
        }
    }
}
</script>
  
<style scoped lang="scss">
.file {
    position: relative;

    // overflow: hidden;
    .status {
        position: absolute;
        top: 0;
        right: 0;

        .alert {
            border-top: none !important;
            border-right: none !important;
            border-start-start-radius: 0 !important;
            border-start-end-radius: 0 !important;
            border-end-end-radius: 0 !important;
        }
    }

    .thumb {
        width: 64px;
        min-width: 64px;
        height: 64px;

        &:not(.svg) {
            img {
                width: 100%;
                height: 100%;
                object-fit: cover;
            }
        }

        &.svg {
            padding: 10px;

            img {
                width: 100%;
                height: 100%;
                object-fit: contain;
            }
        }
    }
}</style>