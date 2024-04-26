<template>
  <div class="sticky-top" style="top: 20px;">
    <div class="bubble-options px-1 d-flex justify-content-end align-items-center" :class="{ 'self': self }">
      <button v-if="type != 'audio' && showEdit" data-bs-toggle="tooltip" title="Edit" type="button" class="me-1 d-flex align-items-center py-2 text-muted" @click="emitCallback('onEdit')">
        <svg width="15" height="15" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M1 13.7737H4.33333L13.0833 5.02369C13.5254 4.58166 13.7737 3.98214 13.7737 3.35702C13.7737 2.7319 13.5254 2.13238 13.0833 1.69036C12.6413 1.24833 12.0418 1 11.4167 1C10.7915 1 10.192 1.24833 9.75 1.69036L1 10.4404V13.7737Z" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/><path d="M8.91669 2.52368L12.25 5.85702" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></svg>
      </button>
      <template v-if="type != 'audio'">
        <button ref="collapseButton" data-bs-toggle="tooltip" title="Collapse" type="button" class="mx-1 d-flex align-items-center py-2 text-muted" @click="emitCallback('collapse')">
          <svg v-if="!collapsedBubble" width="8" height="16" viewBox="0 0 8 16" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M1 13L4 10L7 13" stroke="currentColor" stroke-width="1.2" stroke-linecap="round" stroke-linejoin="round"/><path d="M4 15V10" stroke="currentColor" stroke-width="1.2" stroke-linecap="round" stroke-linejoin="round"/><path d="M7 3L4 6L1 3" stroke="currentColor" stroke-width="1.2" stroke-linecap="round" stroke-linejoin="round"/><path d="M4 6V1" stroke="currentColor" stroke-width="1.2" stroke-linecap="round" stroke-linejoin="round"/></svg>
          <svg v-else width="8" height="16" viewBox="0 0 8 16" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M1 4L4 1L7 4" stroke="currentColor" stroke-width="1.2" stroke-linecap="round" stroke-linejoin="round"/><path d="M4 6V1" stroke="currentColor" stroke-width="1.2" stroke-linecap="round" stroke-linejoin="round"/><path d="M7 12L4 15L1 12" stroke="currentColor" stroke-width="1.2" stroke-linecap="round" stroke-linejoin="round"/><path d="M4 15V10" stroke="currentColor" stroke-width="1.2" stroke-linecap="round" stroke-linejoin="round"/></svg>
        </button>
        <button data-bs-toggle="tooltip" title="Pin Message" type="button" class="mx-1 d-flex align-items-center text-muted" @click="emitCallback('pin')">
          <svg v-if="!pinned" width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg"><g clip-path="url(#clip0_1796_32186)"><path d="M5.76433 2V6.47047L4.27417 9.45079V10.9409H11.725V9.45079L10.2348 6.47047V2" stroke="#0F172A" stroke-width="1.2" stroke-linecap="round" stroke-linejoin="round"/><path d="M7.99976 10.9409V14.6663" stroke="#0F172A" stroke-width="1.2" stroke-linecap="round" stroke-linejoin="round"/><path d="M5.01953 2L10.9802 2" stroke="#0F172A" stroke-width="1.2" stroke-linecap="round" stroke-linejoin="round"/></g><defs><clipPath id="clip0_1796_32186"><rect width="16" height="16" fill="white"/></clipPath></defs></svg>
          <svg v-else width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg"><g clip-path="url(#clip0_1796_32213)"><path d="M5.76433 2V6.47047L4.27417 9.45079V10.9409H11.725V9.45079L10.2348 6.47047V2" fill="#0F172A"/><path d="M5.76433 2V6.47047L4.27417 9.45079V10.9409H11.725V9.45079L10.2348 6.47047V2" stroke="#0F172A" stroke-width="1.2" stroke-linecap="round" stroke-linejoin="round"/><path d="M7.99976 10.9409V14.6663" stroke="#0F172A" stroke-width="1.2" stroke-linecap="round" stroke-linejoin="round"/><path d="M5.01953 2L10.9802 2" stroke="#0F172A" stroke-width="1.2" stroke-linecap="round" stroke-linejoin="round"/></g><defs><clipPath id="clip0_1796_32213"><rect width="16" height="16" fill="white"/></clipPath></defs></svg>
        </button>
        <button data-bs-toggle="tooltip" title="Copy" type="button" class="mx-1 d-flex align-items-center py-2 text-muted" @click="emitCallback('copy-text')">
          <svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M4 5.49994C4 5.10212 4.15804 4.72059 4.43934 4.43928C4.72065 4.15798 5.10218 3.99994 5.50001 3.99994H11.5C11.8979 3.99994 12.2794 4.15798 12.5607 4.43928C12.842 4.72059 13 5.10212 13 5.49994V11.5C13 11.8978 12.842 12.2793 12.5607 12.5606C12.2794 12.8419 11.8979 13 11.5 13H5.50001C5.10218 13 4.72065 12.8419 4.43934 12.5606C4.15804 12.2793 4 11.8978 4 11.5V5.49994Z" stroke="currentColor" stroke-width="1.2" stroke-linecap="round" stroke-linejoin="round"/><path d="M10 4.00001V2.50001C10 2.10218 9.842 1.72065 9.56069 1.43934C9.27939 1.15804 8.89785 1 8.50003 1H2.50001C2.10218 1 1.72065 1.15804 1.43934 1.43934C1.15804 1.72065 1 2.10218 1 2.50001V8.50003C1 8.89785 1.15804 9.27939 1.43934 9.56069C1.72065 9.842 2.10218 10 2.50001 10H4.00001" stroke="currentColor" stroke-width="1.2" stroke-linecap="round" stroke-linejoin="round"/></svg>
        </button>
      </template>
      <div class="dropdown mx-1">
        <button type="button" data-bs-toggle="dropdown" aria-expanded="false" class="d-flex align-items-center py-2 text-muted">
          <svg width="12" height="4" viewBox="0 0 12 4" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M5.99992 3.16665C6.64425 3.16665 7.16659 2.64431 7.16659 1.99998C7.16659 1.35565 6.64425 0.833313 5.99992 0.833313C5.35559 0.833313 4.83325 1.35565 4.83325 1.99998C4.83325 2.64431 5.35559 3.16665 5.99992 3.16665Z" fill="currentColor"/><path d="M1.62492 3.16665C2.26925 3.16665 2.79159 2.64431 2.79159 1.99998C2.79159 1.35565 2.26925 0.833313 1.62492 0.833313C0.980586 0.833313 0.458252 1.35565 0.458252 1.99998C0.458252 2.64431 0.980586 3.16665 1.62492 3.16665Z" fill="currentColor"/><path d="M10.3749 3.16665C11.0193 3.16665 11.5416 2.64431 11.5416 1.99998C11.5416 1.35565 11.0193 0.833313 10.3749 0.833313C9.73059 0.833313 9.20825 1.35565 9.20825 1.99998C9.20825 2.64431 9.73059 3.16665 10.3749 3.16665Z" fill="currentColor"/></svg>
        </button>
        <ul class="dropdown-menu" role="menu">
          <li v-if="type != 'audio' && !isDeployedApp"  class="cursor-pointer px-3 py-2 d-flex align-items-center" @click="emitCallback('add-to-instructions')">
            <div class="icon me-3">
              <svg width="16" height="15" viewBox="0 0 16 15" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M12.8334 4.33331H1.16675" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/><path d="M1.16675 1H12.8334" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/><path d="M8.66675 7.66669H1.16675" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/><path d="M1.16675 11H6.16675" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/><path d="M12 8.5V13.5" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/><path d="M9.5 11H14.5" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></svg>
            </div>
            <div class="fs-7">Add To Instructions</div>
          </li>
          <li v-if="type != 'audio'"  class="cursor-pointer px-3 py-2 d-flex align-items-center" @click="emitCallback('download')">
            <div class="icon me-3">
              <svg width="16" height="17" viewBox="0 0 16 17" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M1.33325 12.3333V14C1.33325 14.442 1.50885 14.8659 1.82141 15.1785C2.13397 15.4911 2.55789 15.6666 2.99992 15.6666H12.9999C13.4419 15.6666 13.8659 15.4911 14.1784 15.1785C14.491 14.8659 14.6666 14.442 14.6666 14V12.3333" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/><path d="M3.83325 7.33331L7.99992 11.5L12.1666 7.33331" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/><path d="M8 1.5V11.5" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></svg>
            </div>
            <div class="fs-7">Download</div>
          </li>
          <li v-if="hasCodeBlocks" class="cursor-pointer px-3 py-2 d-flex align-items-center" @click="emitCallback('show-raw')">
            <div class="icon me-3">
              <svg width="14" height="18" viewBox="0 0 14 18" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M8.66675 1.5V4.83333C8.66675 5.05435 8.75455 5.26631 8.91083 5.42259C9.06711 5.57887 9.27907 5.66667 9.50008 5.66667H12.8334" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/><path d="M11.1667 16.5H2.83341C2.39139 16.5 1.96746 16.3244 1.6549 16.0118C1.34234 15.6993 1.16675 15.2754 1.16675 14.8333V3.16667C1.16675 2.72464 1.34234 2.30072 1.6549 1.98816C1.96746 1.67559 2.39139 1.5 2.83341 1.5H8.66675L12.8334 5.66667V14.8333C12.8334 15.2754 12.6578 15.6993 12.3453 16.0118C12.0327 16.3244 11.6088 16.5 11.1667 16.5Z" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/><path d="M4.5 13.1667H9.5" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/><path d="M4.5 9.83331H9.5" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></svg>
            </div>
            <div v-if="!showingRaw" class="fs-7">Show Raw Response</div>
            <div v-else class="fs-7">Show Formatted Response</div>
          </li>
          <li class="cursor-pointer px-3 py-2 d-flex align-items-center" @click="emitCallback('delete')">
            <div class="icon me-3">
              <svg data-v-4b0e78fc="" width="16" height="18" viewBox="0 0 16 18" fill="none" xmlns="http://www.w3.org/2000/svg"><path data-v-4b0e78fc="" d="M10.2833 6.49995L9.995 13.9999M6.005 13.9999L5.71667 6.49995M14.0233 3.82495C14.3083 3.86828 14.5917 3.91411 14.875 3.96328M14.0233 3.82495L13.1333 15.3941C13.097 15.8651 12.8842 16.3051 12.5375 16.626C12.1908 16.9469 11.7358 17.1251 11.2633 17.1249H4.73667C4.26425 17.1251 3.80919 16.9469 3.46248 16.626C3.11578 16.3051 2.90299 15.8651 2.86667 15.3941L1.97667 3.82495M14.0233 3.82495C13.0616 3.67954 12.0948 3.56919 11.125 3.49411M1.97667 3.82495C1.69167 3.86745 1.40833 3.91328 1.125 3.96245M1.97667 3.82495C2.93844 3.67955 3.9052 3.56919 4.875 3.49411M11.125 3.49411V2.73078C11.125 1.74745 10.3667 0.927446 9.38333 0.896613C8.46135 0.867145 7.53865 0.867145 6.61667 0.896613C5.63333 0.927446 4.875 1.74828 4.875 2.73078V3.49411M11.125 3.49411C9.04477 3.33334 6.95523 3.33334 4.875 3.49411" stroke="#6B7280" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path></svg>
            </div>
            <div class="fs-7">Delete</div>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
import { Tooltip } from 'bootstrap';
import config from "@/api-services/_config";

export default {
  name: 'BubbleOptions',
  props: {
    self: {
      default: false
    },
    collapsedBubble: {
      default: false
    },
    showingRaw:{
      default: null,
    },
    hasCodeBlocks:{
      default: false,
    },
    showEdit: {
      default: false
    },
    type: {
      default: 'text'
    },
    pinned: {
      default: false
    }
  },
  data() {
    return {
    };
  },
  mounted() {
    [...document.querySelectorAll('[data-bs-toggle="tooltip"]')].forEach(e => {
      let t = new Tooltip(e);
      e.addEventListener('click', () => t.hide());
    });
  },
  computed: {
    isDeployedApp() {
      return config.isDeployedApp;
    },
  },
  methods: {
    emitCallback(type) {
      this.$emit('callback', type);
    }
  },
  watch: {
    collapsedBubble(val) {
      this.$refs.collapseButton.setAttribute('data-bs-original-title', val ? 'Expand' : 'Collapse');
    }
  }
}
</script>

<style scoped lang="scss">
  .sticky-top{
    z-index: calc(var(--vs-dropdown-z-index)-1) !important;
  }
  .bubble-options {
    z-index: 1000;
    height: 24px;
    top: -30px;
    right: -10px;
    border: 1px solid var(--bs-border-color);
    position: absolute;
    background: var(--bs-base);
    opacity: 0;
    transition: opacity .3s;
    border-radius: 4px;
    button {
      color: currentColor;
    }
    .dropdown {
      .dropdown-menu {
        width: 320px;
        li {
          .icon {
            width: 20px;
            min-width: 20px;
            display: flex;
            justify-content: center;
            margin-top: 4px;
          }
          &:hover,
          &:hover .text-muted,
          &:hover svg {
            background: var(--bs-body-bg);
            color: var(--bs-secondary) !important;
          }
        }
      }
    }
  }
</style>