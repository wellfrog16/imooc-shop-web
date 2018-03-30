// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue';
import Vuex from 'vuex';
import App from './App';
import router from './router';
import infiniteScroll from 'vue-infinite-scroll';
import VueLazyload from 'vue-lazyload';
import utils from '@/utils/utils';
import store from '@/store/index';

Vue.filter('currency', utils.currency);

Vue.use(infiniteScroll);
Vue.use(VueLazyload, {
    preLoad: 1.3,
    loading: './static/loading-cylon-red.svg',
    attempt: 1
});
Vue.use(Vuex);

Vue.config.productionTip = false;

/* eslint-disable no-new */
new Vue({
    el: '#app',
    router,
    store,
    template: '<App/>',
    components: { App }
});
