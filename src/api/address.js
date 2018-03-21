import axios from '@/helper/axios';

const base = '/imooc-shop/address';

const list = params => axios.get(`${base}`, { params }).then(res => res);
const setDefault = id => axios.put(`${base}/${id}/default`).then(res => res);
const del = id => axios.delete(`${base}/${id}`).then(res => res);

export default {
    list,
    setDefault,
    del
};
