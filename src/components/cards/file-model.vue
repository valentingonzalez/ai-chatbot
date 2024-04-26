<template>
    <div v-if="file" class="file card flex-row align-items-center px-3 py-2 fs-7 mb-2" :class="{ 'alt': alt }">
      <div class="thumb" :class="{ 'opacity-50': disable }" >
        <div class="icon-badge d-flex">
          <svg v-if="file.file_type == 'youtube'" width="16" height="12" viewBox="0 0 16 12" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M15.6654 1.7491C15.4811 1.06026 14.9397 0.518933 14.2509 0.334541C13.0036 1.0014e-07 7.99997 0 7.99997 0C7.99997 0 2.99637 1.0014e-07 1.74909 0.334541C1.06026 0.518933 0.518933 1.06026 0.334541 1.7491C1.0014e-07 2.99637 0 5.60026 0 5.60026C0 5.60026 1.0014e-07 8.20416 0.334541 9.45145C0.518933 10.1403 1.06026 10.6816 1.74909 10.866C2.99637 11.2005 7.99997 11.2005 7.99997 11.2005C7.99997 11.2005 13.0036 11.2005 14.2509 10.866C14.9397 10.6816 15.4811 10.1403 15.6654 9.45145C16 8.20416 16 5.60026 16 5.60026C16 5.60026 15.9987 2.99637 15.6654 1.7491Z" fill="#FF0000"/><path d="M6.39844 7.9999L10.5552 5.60019L6.39844 3.20044V7.9999Z" fill="white"/></svg>
          <svg v-if="file.file_type == 'instagram'" width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg"><g clip-path="url(#clip0_192_3959)" filter="url(#filter0_d_192_3959)"><path d="M10.0039 1.12109C6.71404 1.12109 5.75189 1.12449 5.56486 1.14C4.88973 1.19612 4.46962 1.30242 4.01194 1.53029C3.65922 1.70544 3.38105 1.90846 3.10651 2.19306C2.60653 2.71208 2.30351 3.3506 2.19381 4.10961C2.14048 4.47808 2.12497 4.55323 2.12182 6.43536C2.1206 7.06273 2.12182 7.8884 2.12182 8.99589C2.12182 12.2831 2.12545 13.2442 2.14121 13.4309C2.19575 14.0879 2.29878 14.5012 2.51696 14.9533C2.93391 15.8187 3.73025 16.4684 4.66841 16.7108C4.99324 16.7944 5.35202 16.8405 5.81261 16.8623C6.00776 16.8708 7.99679 16.8769 9.98703 16.8769C11.9773 16.8769 13.9675 16.8744 14.1578 16.8647C14.6911 16.8396 15.0008 16.7981 15.3432 16.7096C16.2874 16.466 17.0692 15.826 17.4947 14.9484C17.7086 14.5072 17.8171 14.0782 17.8662 13.4555C17.8769 13.3198 17.8813 11.1553 17.8813 8.99382C17.8813 6.83195 17.8765 4.67153 17.8658 4.53578C17.8161 3.90307 17.7076 3.47763 17.4868 3.02795C17.3056 2.65983 17.1044 2.38493 16.8123 2.10385C16.291 1.60593 15.6534 1.30291 14.8937 1.19333C14.5256 1.14012 14.4522 1.12437 12.5687 1.12109H10.0039Z" fill="url(#paint0_radial_192_3959)"/><path d="M10.0039 1.12109C6.71404 1.12109 5.75189 1.12449 5.56486 1.14C4.88973 1.19612 4.46962 1.30242 4.01194 1.53029C3.65922 1.70544 3.38105 1.90846 3.10651 2.19306C2.60653 2.71208 2.30351 3.3506 2.19381 4.10961C2.14048 4.47808 2.12497 4.55323 2.12182 6.43536C2.1206 7.06273 2.12182 7.8884 2.12182 8.99589C2.12182 12.2831 2.12545 13.2442 2.14121 13.4309C2.19575 14.0879 2.29878 14.5012 2.51696 14.9533C2.93391 15.8187 3.73025 16.4684 4.66841 16.7108C4.99324 16.7944 5.35202 16.8405 5.81261 16.8623C6.00776 16.8708 7.99679 16.8769 9.98703 16.8769C11.9773 16.8769 13.9675 16.8744 14.1578 16.8647C14.6911 16.8396 15.0008 16.7981 15.3432 16.7096C16.2874 16.466 17.0692 15.826 17.4947 14.9484C17.7086 14.5072 17.8171 14.0782 17.8662 13.4555C17.8769 13.3198 17.8813 11.1553 17.8813 8.99382C17.8813 6.83195 17.8765 4.67153 17.8658 4.53578C17.8161 3.90307 17.7076 3.47763 17.4868 3.02795C17.3056 2.65983 17.1044 2.38493 16.8123 2.10385C16.291 1.60593 15.6534 1.30291 14.8937 1.19333C14.5256 1.14012 14.4522 1.12437 12.5687 1.12109H10.0039Z" fill="url(#paint1_radial_192_3959)"/><path d="M10.0002 3.18164C8.42017 3.18164 8.22187 3.18855 7.60128 3.21679C6.98191 3.24515 6.55913 3.34321 6.18921 3.48709C5.80655 3.63569 5.48195 3.83447 5.15857 4.15797C4.83494 4.48136 4.63616 4.80596 4.48708 5.18849C4.34284 5.55854 4.24466 5.98143 4.21678 6.60057C4.18902 7.22115 4.18175 7.41957 4.18175 8.99965C4.18175 10.5797 4.18878 10.7774 4.2169 11.398C4.24539 12.0174 4.34344 12.4401 4.4872 12.8101C4.63592 13.1927 4.8347 13.5173 5.15821 13.8407C5.48147 14.1643 5.80607 14.3636 6.18848 14.5122C6.55865 14.6561 6.98155 14.7541 7.6008 14.7825C8.22139 14.8107 8.41956 14.8177 9.99951 14.8177C11.5797 14.8177 11.7774 14.8107 12.398 14.7825C13.0174 14.7541 13.4406 14.6561 13.8108 14.5122C14.1933 14.3636 14.5174 14.1643 14.8407 13.8407C15.1643 13.5173 15.3631 13.1927 15.5122 12.8102C15.6552 12.4401 15.7534 12.0173 15.7825 11.3981C15.8104 10.7775 15.8176 10.5797 15.8176 8.99965C15.8176 7.41957 15.8104 7.22128 15.7825 6.60069C15.7534 5.98131 15.6552 5.55854 15.5122 5.18861C15.3631 4.80595 15.1643 4.48136 14.8407 4.15797C14.5171 3.83435 14.1934 3.63557 13.8104 3.48709C13.4395 3.34321 13.0165 3.24515 12.3971 3.21679C11.7766 3.18855 11.579 3.18164 9.99842 3.18164H10.0002ZM9.47832 4.23009C9.63322 4.22985 9.80607 4.23009 10.0002 4.23009C11.5536 4.23009 11.7378 4.23567 12.3512 4.26355C12.9185 4.28949 13.2263 4.38427 13.4314 4.4639C13.7029 4.56936 13.8965 4.69541 14.1 4.89904C14.3036 5.10267 14.4297 5.29661 14.5354 5.56811C14.615 5.77296 14.7099 6.08083 14.7357 6.64808C14.7636 7.2614 14.7697 7.44563 14.7697 8.99831C14.7697 10.551 14.7636 10.7352 14.7357 11.3485C14.7098 11.9158 14.615 12.2237 14.5354 12.4285C14.4299 12.7 14.3036 12.8933 14.1 13.0969C13.8964 13.3005 13.703 13.4265 13.4314 13.532C13.2266 13.612 12.9185 13.7065 12.3512 13.7325C11.7379 13.7604 11.5536 13.7664 10.0002 13.7664C8.44671 13.7664 8.2626 13.7604 7.64928 13.7325C7.08203 13.7063 6.77416 13.6115 6.56895 13.5319C6.29744 13.4264 6.10351 13.3004 5.89988 13.0967C5.69625 12.8931 5.57019 12.6997 5.4645 12.428C5.38487 12.2232 5.28996 11.9153 5.26414 11.3481C5.23626 10.7347 5.23069 10.5505 5.23069 8.99686C5.23069 7.44321 5.23626 7.25994 5.26414 6.64663C5.29008 6.07937 5.38487 5.7715 5.4645 5.56642C5.56995 5.29491 5.69625 5.10098 5.89988 4.89735C6.10351 4.69372 6.29744 4.56766 6.56895 4.46197C6.77404 4.38197 7.08203 4.28743 7.64928 4.26137C8.18599 4.23712 8.39399 4.22985 9.47832 4.22864V4.23009ZM13.1058 5.19613C12.7204 5.19613 12.4077 5.50848 12.4077 5.89404C12.4077 6.27949 12.7204 6.5922 13.1058 6.5922C13.4913 6.5922 13.804 6.27949 13.804 5.89404C13.804 5.5086 13.4913 5.19588 13.1058 5.19588V5.19613ZM10.0002 6.01186C8.35023 6.01186 7.01245 7.34964 7.01245 8.99965C7.01245 10.6497 8.35023 11.9868 10.0002 11.9868C11.6503 11.9868 12.9875 10.6497 12.9875 8.99965C12.9875 7.34964 11.6503 6.01186 10.0002 6.01186ZM10.0002 7.06031C11.0712 7.06031 11.9396 7.92853 11.9396 8.99965C11.9396 10.0706 11.0712 10.939 10.0002 10.939C8.92912 10.939 8.06091 10.0706 8.06091 8.99965C8.06091 7.92853 8.92912 7.06031 10.0002 7.06031Z" fill="white"/></g><defs><filter id="filter0_d_192_3959" x="0" y="0" width="20" height="19.9995" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB"><feFlood flood-opacity="0" result="BackgroundImageFix"/><feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha"/><feOffset dy="1"/><feGaussianBlur stdDeviation="1"/><feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.05 0"/><feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_192_3959"/><feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow_192_3959" result="shape"/></filter><radialGradient id="paint0_radial_192_3959" cx="0" cy="0" r="1" gradientUnits="userSpaceOnUse" gradientTransform="translate(6.30756 18.0904) rotate(-90) scale(15.6151 14.5273)"><stop stop-color="#FFDD55"/><stop offset="0.1" stop-color="#FFDD55"/><stop offset="0.5" stop-color="#FF543E"/><stop offset="1" stop-color="#C837AB"/></radialGradient><radialGradient id="paint1_radial_192_3959" cx="0" cy="0" r="1" gradientUnits="userSpaceOnUse" gradientTransform="translate(-0.518617 2.25611) rotate(78.6776) scale(6.9801 28.7795)"><stop stop-color="#3771C8"/><stop offset="0.128" stop-color="#3771C8"/><stop offset="1" stop-color="#6600FF" stop-opacity="0"/></radialGradient><clipPath id="clip0_192_3959"><rect width="16" height="15.9995" fill="white" transform="translate(2 1)"/></clipPath></defs></svg>
          <svg v-if="file.file_type == 'facebook'" width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg"><g clip-path="url(#clip0_192_3966)" filter="url(#filter0_d_192_3966)"><path d="M8.68 16.92C4.88 16.24 2 12.96 2 9C2 4.6 5.6 1 10 1C14.4 1 18 4.6 18 9C18 12.96 15.12 16.24 11.32 16.92L10.88 16.56H9.12L8.68 16.92Z" fill="url(#paint0_linear_192_3966)"/><path d="M13.12 11.2401L13.48 9.00012H11.36V7.44012C11.36 6.80012 11.6 6.32012 12.56 6.32012H13.6V4.28012C13.04 4.20012 12.4 4.12012 11.84 4.12012C10 4.12012 8.72 5.24012 8.72 7.24012V9.00012H6.72V11.2401H8.72V16.8801C9.16 16.9601 9.6 17.0001 10.04 17.0001C10.48 17.0001 10.92 16.9601 11.36 16.8801V11.2401H13.12Z" fill="white"/></g><defs><filter id="filter0_d_192_3966" x="0" y="0" width="20" height="20" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB"><feFlood flood-opacity="0" result="BackgroundImageFix"/><feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha"/><feOffset dy="1"/><feGaussianBlur stdDeviation="1"/><feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.05 0"/><feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_192_3966"/><feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow_192_3966" result="shape"/></filter><linearGradient id="paint0_linear_192_3966" x1="10.0004" y1="16.4436" x2="10.0004" y2="0.997053" gradientUnits="userSpaceOnUse"><stop stop-color="#0062E0"/><stop offset="1" stop-color="#19AFFF"/></linearGradient><clipPath id="clip0_192_3966"><rect width="16" height="16" fill="white" transform="translate(2 1)"/></clipPath></defs></svg>
        </div>
        <img class="rounded-1" v-if="file.thumbnail_url" :src="file.thumbnail_url" alt="">
        <img class="rounded-1" v-else :src="placeholder" alt="">
      </div>
      <div class="ms-3 flex-grow-1 overflow-hidden" :class="{'opacity-50': disable }">
        <h6 class="fw-bold mb-0 fs-7 text-truncate">
          <a v-if="file.file_url" :href="file.file_url" target="_blank">{{ file.title || file.file_url }}</a>
          <div v-else>{{ file.title || file.file_url}}</div>
        </h6>
        <div class="text-muted d-none">{{ file.description }}</div>
        <router-link @click="$logActivity({action: 'click', page: $route.name, type: 'showEmbeddings'});" v-if="!alt" class="smaller text-nowrap fw-bold text-info cursor-pointer" :to="`/embeddings/${file.id}`">Embeddings: {{ file.number_of_embeddings }}</router-link>
        <a v-else class="smaller fw-bold text-info cursor-pointer" @click="getModelsForFile(file.id)"> {{ file.models }} Assistant<span v-if="file.models > 1">s</span> </a>
        <span class="small text-muted">
          <em> • {{ file.date_formatted }}</em></span>
      </div>
      <div v-if="file.file_type == 'audio' || file.file_type == 'video' || file.file_type == 'youtube'" class="d-flex" :class="{'opacity-50': disable }">
        <div class="time text-muted me-3 text-nowrap small fw-bold ms-2">
          {{ $parseDuration(file.duration)}}
        </div>
      </div>
      <button class="text-primary" @click="onDelete">
        <svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M5.66663 6.33333V10.3333M8.33329 6.33333V10.3333M1.66663 3.66667H12.3333M11.6666 3.66667L11.0886 11.7613C11.0647 12.0977 10.9142 12.4125 10.6674 12.6424C10.4206 12.8722 10.0959 13 9.75863 13H4.24129C3.90405 13 3.57934 12.8722 3.33255 12.6424C3.08576 12.4125 2.93524 12.0977 2.91129 11.7613L2.33329 3.66667H11.6666ZM8.99996 3.66667V1.66667C8.99996 1.48986 8.92972 1.32029 8.8047 1.19526C8.67967 1.07024 8.5101 1 8.33329 1H5.66663C5.48981 1 5.32025 1.07024 5.19522 1.19526C5.0702 1.32029 4.99996 1.48986 4.99996 1.66667V3.66667H8.99996Z" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></svg>
      </button>
    </div>
  </template>
  
  <script>
    export default {
      name: 'FileModel',
      props: {
        file: {
          default: null,
          required: true
        },
        alt: {
          default: false
        }
      },
      components: {
        //ProgressCircle
      },
      mounted() {
        this.disable = this.file.disable;
      },
      data() {
        return {
          placeholders: {
            csv: 'thumbnail-csv.svg',
            text: 'thumbnail-html.svg',
            document: 'thumbnail-doc.svg',
            pdf: 'thumbnail-pdf.svg',
            audio: 'thumbnail-audio.svg'
          },
          disable: null,
          currentProgress: 0,
          selected: false
        }
      },
      methods:{
        getModelsForFile(id) {
          this.$emit('getModelsForFile', id);
        },
        onDelete() {
          this.$emit('delete', this.file.id);
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
      word-break: break-word;
      position: relative;
      &.alt {
        * {
          white-space: normal;
          word-break: break-word; 
        }
      }
      .percent {
        width: 32px;
        min-width: 32px;
        text-align: right;
      }
      .icon {
        position: relative;
        animation: glowing 2s ease-in-out infinite;
        .ext {
          color: #fff;
          font-size: 7px;
          text-transform: uppercase;
          position: absolute;
          z-index: 2;
          bottom: 7px;
          width: 100%;
          text-align: center;
          font-weight: bold;
          letter-spacing: -.5px;
          margin-left: -0.5px;
        }
      }
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
        width: 32px;
        min-width: 32px;
        height: 32px;
        position: relative;
        .icon-badge {
          position: absolute;
          bottom: -5px;
          right: -5px;
        }
        &:not(.svg) {
          img {
            width: 100%;
            height: 100%;
            object-fit: cover;
          }
        }
        &.svg {
          img {
            width: 100%;
            height: 100%;
            object-fit: contain;
          }
        }
      }
    }

    @keyframes glowing {
      0% {
        box-shadow: 0 0 5px #fff;
      }
      50% {
        box-shadow: 0 0 15px #fff;
      }
      100% {
        box-shadow: 0 0 5px #fff;
      }
    }
  </style>