import axios from '@/helper/axios';

const base = '/imooc-shop/cart';

const add = id => axios.post(`${base}/${id}`).then(res => res.data);

export default {
    add
};
