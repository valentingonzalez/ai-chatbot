<template>
	<div class="dropdown ">
		<button	type="button" class="button d-flex align-items-center justify-content-center" id="modelsFilters" data-bs-toggle="dropdown" aria-expanded="false">
			<svg width="17" height="13" viewBox="0 0 17 13" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M1.33337 1H8.83337" stroke="currentColor" stroke-width="1.2" stroke-linecap="round" stroke-linejoin="round"/><path d="M1.33337 6H7.16671" stroke="currentColor" stroke-width="1.2" stroke-linecap="round" stroke-linejoin="round"/><path d="M1.33337 11H7.16671" stroke="currentColor" stroke-width="1.2" stroke-linecap="round" stroke-linejoin="round"/><path d="M10.5 9.5L13 12L15.5 9.5" stroke="currentColor" stroke-width="1.2" stroke-linecap="round" stroke-linejoin="round"/><path d="M13 1L13 11" stroke="currentColor" stroke-width="1.2" stroke-linecap="round" stroke-linejoin="round"/></svg>
		</button>
		<ul class="dropdown-menu custom-dropdown-menu fs-7" aria-labelledby="modelsFilters" role="menu">
			<li v-for="filter in filters" v-bind:key="filter.name">
				<a class="dropdown-item" href="#" @click.prevent="onSortSelect(filter)" >{{ filter.name }}</a>
			</li>
		</ul>
	</div>
</template>

<script>
export default {
	name: 'ModelSort',
	data() {
		return {
			filters: [
				{name: 'Title: A-Z', order: 'ASC', value: 'title'},
				{name: 'Title: Z-A', order: 'DESC', value: 'title'},
				{name: 'Date: New to Old', order: 'DESC', value: 'date'},
				{name: 'Date: Old to new', order: 'ASC', value: 'date'},
			],
		};
	},
	computed: {},
	mounted() {
		if(localStorage.getItem('modelSort')) {
			this.onSortSelect(JSON.parse(localStorage.getItem('modelSort')));
		}
	},
	methods: {
		onSortSelect(filter) {
			localStorage.setItem('modelSort', JSON.stringify(filter));
			window.dispatchEvent(new Event('modelSort'));
			this.$emit('onModelSort', filter);
		},
	},
};
</script>

<style scoped lang="scss">
	.button {
		height: 32px;
		width: 32px;
		border-radius: 5px;
		background: var(--bs-base);
	}
	.dropdown-menu.custom-dropdown-menu {
    left: auto !important;
    right: 0 !important;
    transform: translate3d(0px,34px,0px) !important;
  }

</style>
