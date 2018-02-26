import Vue from 'vue';
import Router from 'vue-router';
import List from '~views/List';
import Cart from '~views/Cart';
import Address from '~views/Address';

Vue.use(Router);

const router = new Router({
    routes: [
        {
            path: '/',
            name: 'list',
            component: List,
            meta: {
                noRequireAuth: true
            }
        },
        {
            path: '/cart',
            name: 'cart',
            component: Cart
        },
        {
            path: '/address',
            name: 'address',
            component: Address
        }
    ]
});

// 拦截器判断
router.beforeEach(async (to, from, next) => {
    if (!to.meta.noRequireAuth) {
        // todo 登陆判断
        // console.log('请先登陆');
        // router.push({name: 'list'});
        next();
    } else {
        next();
    }
});

export default router;
