<template>
  <div class="px-3" v-if="!collapsed">
    <div v-if="!view_archived" class="form-control search d-flex align-items-center px-0">
      <input ref="searchInput" type="search" placeholder="Search Assistant" v-model="search" @input="submitSearch" class="flex-grow-1 ms-1" />
      <div class="dropdown">
        <button type="button" class="me-2" id="assistantsFilters" data-bs-toggle="dropdown" aria-expanded="false">
          <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg"><g clip-path="url(#clip0_2105_15496)"><path d="M10 4.99967C10 5.4417 10.1756 5.86563 10.4882 6.17819C10.8007 6.49075 11.2246 6.66634 11.6667 6.66634C12.1087 6.66634 12.5326 6.49075 12.8452 6.17819C13.1577 5.86563 13.3333 5.4417 13.3333 4.99967C13.3333 4.55765 13.1577 4.13372 12.8452 3.82116C12.5326 3.5086 12.1087 3.33301 11.6667 3.33301C11.2246 3.33301 10.8007 3.5086 10.4882 3.82116C10.1756 4.13372 10 4.55765 10 4.99967Z" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/><path d="M3.33325 5H9.99992" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/><path d="M13.3333 5H16.6666" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/><path d="M5 9.99967C5 10.4417 5.17559 10.8656 5.48816 11.1782C5.80072 11.4907 6.22464 11.6663 6.66667 11.6663C7.10869 11.6663 7.53262 11.4907 7.84518 11.1782C8.15774 10.8656 8.33333 10.4417 8.33333 9.99967C8.33333 9.55765 8.15774 9.13372 7.84518 8.82116C7.53262 8.5086 7.10869 8.33301 6.66667 8.33301C6.22464 8.33301 5.80072 8.5086 5.48816 8.82116C5.17559 9.13372 5 9.55765 5 9.99967Z" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/><path d="M3.33325 10H4.99992" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/><path d="M8.33325 10H16.6666" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/><path d="M12.5 14.9997C12.5 15.4417 12.6756 15.8656 12.9882 16.1782C13.3007 16.4907 13.7246 16.6663 14.1667 16.6663C14.6087 16.6663 15.0326 16.4907 15.3452 16.1782C15.6577 15.8656 15.8333 15.4417 15.8333 14.9997C15.8333 14.5576 15.6577 14.1337 15.3452 13.8212C15.0326 13.5086 14.6087 13.333 14.1667 13.333C13.7246 13.333 13.3007 13.5086 12.9882 13.8212C12.6756 14.1337 12.5 14.5576 12.5 14.9997Z" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/><path d="M3.33325 15H12.4999" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/><path d="M15.8333 15H16.6666" stroke="#0F172A" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></g><defs><clipPath id="clip0_2105_15496"><rect width="20" height="20" fill="white"/></clipPath></defs></svg>
        </button>
        <ul class="dropdown-menu dropdown-menu-end small mt-3 me-n2" aria-labelledby="assistantsFilters" role="menu">
          <li v-for="filter in filters" :key="filter.name">
            <a class="dropdown-item d-flex align-items-center" href="#" @click.prevent="onSortSelect(filter)">
              <div class="flex-grow-1">{{ filter.name }}</div>
              <svg class="ms-4" :class="{ 'invisible': filter.value != $route.query.sort_by }" width="10" height="7" viewBox="0 0 10 7" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M1 3.66667L3.66667 6.33333L9 1" stroke="#0F172A" stroke-width="1.3" stroke-linecap="round" stroke-linejoin="round"/></svg>
            </a>
          </li>
          <li class="border-top mt-1 pt-1">
            <a class="dropdown-item" href="#" @click.prevent="view_archived = 1">
              View Archived
            </a>
          </li>
        </ul>
      </div>
    </div>
    <div class="d-flex align-items-center" v-else>
      <button class="me-3" @click="view_archived = 0">
        <svg width="8" height="15" viewBox="0 0 8 15" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M7 1.5L1 7.5L7 13.5" stroke="#64748B" stroke-width="2" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round"/></svg>
      </button>
      <h6 class="mb-0">Archived Assistants</h6>
    </div>
  </div>
  <div v-else class="px-3">
    <div class="btn btn-outline-secondary mb-2" @click.prevent.stop="showSearch">
      <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg"><g clip-path="url(#clip0_2350_25386)"><path d="M18.332 18.332L14.582 14.582" stroke="#7C7C7C" stroke-width="2" stroke-miterlimit="10" stroke-linecap="square"/><path d="M8.33268 14.9993C12.0146 14.9993 14.9993 12.0146 14.9993 8.33268C14.9993 4.65078 12.0146 1.66602 8.33268 1.66602C4.65078 1.66602 1.66602 4.65078 1.66602 8.33268C1.66602 12.0146 4.65078 14.9993 8.33268 14.9993Z" stroke="#7C7C7C" stroke-width="2" stroke-miterlimit="10" stroke-linecap="square"/><path d="M4.16602 8.33268C4.16602 7.22761 4.605 6.16781 5.3864 5.3864C6.16781 4.605 7.22761 4.16602 8.33268 4.16602" stroke="#7C7C7C" stroke-width="2" stroke-miterlimit="10"/></g><defs><clipPath id="clip0_2350_25386"><rect width="20" height="20" fill="white"/></clipPath></defs></svg>
    </div>
  </div>
</template>

<script>

  export default {
    name: 'AssistantSearch',
    data() {
      return {
        search: this.$route.query.search_assistant || '',
        view_archived: Number(this.$route.query.view_archived) || 0,
        collapsed: localStorage.getItem('collapsedMenu') == 'true' ? true : false,
        filters:[
          { name:'Date: New to Old', value:'new-old' },
          { name:'Date: Old to new', value:'old-new' },
          { name:'Title: A-Z', value:'a-z' },
          { name:'Title: Z-A', value:'z-a' },
        ],
        currentFilter: this.$route.query.sort_by || 'new-old',
      }
    },
    mounted() {
      this.setCollapsed();
      setTimeout(() => {
        this.search = this.$route.query.search_assistant;
        this.view_archived = Number(this.$route.query.view_archived) || 0;
      }, 1000);
      window.addEventListener('toggleMenu', this.setCollapsed);
    },
    methods: {
      onSortSelect(filter) {
        this.currentFilter = filter.value;
        localStorage.setItem('assistantSort', JSON.stringify(filter));
        window.dispatchEvent(new Event('assistantSort'));
      },
      submitSearch() {
        this.$router.push({ query: Object.assign({}, this.$route.query, { search_assistant: this.search }) }).catch(() => {});
      },
      setCollapsed() {
        this.collapsed = localStorage.getItem('collapsedMenu') == 'true' ? true : false;
      },
      showSearch() {
        this.$emit('onTogglePanel');
        setTimeout(() => {
          this.$refs.searchInput.focus();
        }, 300);
      }
    },
    watch: {
      view_archived() {
        this.$router.push({ query: Object.assign({}, this.$route.query, { view_archived: this.view_archived }) }).catch(() => {});
      },
      currentFilter(val) {
        this.$router.push({ query: Object.assign({}, this.$route.query, { sort_by: val }) }).catch(() => {});
        this.$store.dispatch('getAssistants');
      }
    }
}
</script>

<style scoped lang="scss">
.cursor-pointer {
    cursor: pointer;
    user-select: none;
    -moz-user-select: none;
    -webkit-user-select: none;
    -ms-user-select: none;
}
</style>