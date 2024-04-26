<template>
  <div class="dropdown">
    <button type="button" class="btn btn-outline-secondary text-capitalize" id="filesFilters" data-bs-toggle="dropdown" aria-expanded="false">
      <svg class="me-2" v-if="currentFilter.order == 'ASC'" width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg"><g clip-path="url(#clip0_1896_22052)"><path d="M3.33325 5H10.8333" stroke="#64748B" stroke-width="1.5" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round"/><path d="M3.33325 10H9.16659" stroke="#64748B" stroke-width="1.5" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round"/><path d="M3.33325 15H9.16659" stroke="#64748B" stroke-width="1.5" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round"/><path d="M12.5 12.5L15 15L17.5 12.5" stroke="#64748B" stroke-width="1.5" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round"/><path d="M15 5V15" stroke="#64748B" stroke-width="1.5" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round"/></g><defs><clipPath id="clip0_1896_22052"><rect width="20" height="20" fill="white"/></clipPath></defs></svg>
      <svg class="me-2" v-else width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg"><g clip-path="url(#clip0_2152_25613)"><path d="M3.33325 15L10.8333 15" stroke="#64748B" stroke-width="1.5" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round"/><path d="M3.33325 10L9.16659 10" stroke="#64748B" stroke-width="1.5" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round"/><path d="M3.33325 5L9.16659 5" stroke="#64748B" stroke-width="1.5" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round"/><path d="M12.5 7.5L15 5L17.5 7.5" stroke="#64748B" stroke-width="1.5" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round"/><path d="M15 15L15 5" stroke="#64748B" stroke-width="1.5" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round"/></g><defs><clipPath id="clip0_2152_25613"><rect width="20" height="20" fill="white" transform="matrix(1 8.74228e-08 8.74228e-08 -1 0 20)"/></clipPath></defs></svg>
      {{ currentFilter.value }}
      <svg class="ms-4 me-n1" width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg"><g opacity="0.8"><path d="M2.625 4.875L6 8.25L9.375 4.875" stroke="#64748B" stroke-width="1.5" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round"/></g></svg>
    </button>
    <ul class="dropdown-menu fs-7" aria-labelledby="filesFilters" role="menu">
      <li v-for="filter in filters" v-bind:key="filter.name">
        <a class="dropdown-item" :class="{'text-primary': filter.name == currentFilter.name}" href="#" @click.prevent="onSortSelect(filter)">
          {{ filter.name }}
        </a>
      </li>
    </ul>
  </div>
</template>


<script>
export default {
  name: 'FileSort',
  data() {
    return {
      models: [],
      filters:[
        { name:'Title: A-Z', order:'ASC', value:'title' },
        { name:'Title: Z-A', order:'DESC', value:'title' },
        { name:'Date: New to Old', order:'DESC', value:'date' },
        { name:'Date: Old to new', order:'ASC', value:'date' }
      ],
      currentFilter: '',
    }
  },
  mounted() {
		if(localStorage.getItem('fileSort')) {
      let filter = JSON.parse(localStorage.getItem('fileSort'));
			this.onSortSelect(filter);
      this.currentFilter = filter;
		}
	},
	methods: {
		onSortSelect(filter) {
      this.currentFilter = filter;
			localStorage.setItem('fileSort', JSON.stringify(filter));
			window.dispatchEvent(new Event('fileSort'));
			this.$emit('onFileSort', filter);
		},
	},
}
</script>

<style scoped lang="scss">
</style>