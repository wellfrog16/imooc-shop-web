import axios from '@/helper/axios';

const base = '/imooc-shop/order';

const insert = params => axios.post(`${base}`, params).then(res => res);
const list = () => axios.get(`${base}`).then(res => res);
const del = id => axios.delete(`${base}/${id}`).then(res => res);

export default {
    list,
    insert,
    del
};
