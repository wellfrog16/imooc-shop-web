import axios from '@/helper/axios';

const base = '/imooc-shop/cart';

const insert = id => axios.post(`${base}`, { goodsId: id }).then(res => res);
const list = () => axios.get(`${base}`).then(res => res);
const del = id => axios.delete(`${base}/${id}`).then(res => res);
const update = param => axios.put(`${base}`, param).then(res => res);
const checkAll = param => axios.put(`${base}/checkAll`, param).then(res => res);
const count = () => axios.get(`${base}/count`).then(res => res);

export default {
    list,
    insert,
    del,
    update,
    checkAll,
    count
};
