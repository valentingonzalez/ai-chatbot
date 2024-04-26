/* eslint-disable no-unused-vars */
import Vue from 'vue';
import store from '@/store';
import App from '@/App.vue';
import router from '@/router/index';
import linkify from 'vue-linkify'
import Vue2TouchEvents from 'vue2-touch-events'
import vSelect from 'vue-select'
import ColumnResize from '@/components/column-resize';
import Pagination from 'vue-pagination-2';
import VueSweetalert2 from 'vue-sweetalert2';
import TextareaAutosize from 'vue-textarea-autosize'
import AVPlugin from 'vue-audio-visual'
import TypeWriter from '@/components/type-writer';
import logActivityPlugin from './plugins/logActivity';

let EventBus = new Vue();

Vue.config.productionTip = false;
Vue.use(Vue2TouchEvents);
Vue.use(VueSweetalert2, {
  reverseButtons: true
});
Vue.use(TextareaAutosize);
Vue.use(AVPlugin);
Vue.use(logActivityPlugin);

Vue.component('TypeWriter', TypeWriter);
Vue.component('v-select', vSelect)
Vue.component('ColumnResize', ColumnResize);
Vue.component('VuePagination', Pagination)

Vue.directive('linkified', linkify);
Vue.filter('toTimer', s => `${Math.floor(s / 60)}:${s % 60 < 10 ? `0${s % 60}` : s % 60}`);
require("./functions");

new Vue({
  render: h => h(App),
  router: router,
  store: store,
}).$mount('#app');

export { EventBus };
