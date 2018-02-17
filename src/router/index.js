import Vue from 'vue';
import Router from 'vue-router';
import List from '~views/List';
import Cart from '~views/Cart';

Vue.use(Router);

export default new Router({
    routes: [
        {
            path: '/',
            name: 'list',
            component: List
        },
        {
            path: '/cart',
            name: 'cart',
            component: Cart
        }
    ]
});
