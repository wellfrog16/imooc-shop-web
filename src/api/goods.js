import axios from '@/helper/axios';

const base = '/imooc-shop/goods';

const list = params => axios.get(`${base}`, { params }).then(res => res.data);

export default {
    list
};
