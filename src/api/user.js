import axios from '@/helper/axios';

const base = '/imooc-shop/user';

const login = params => axios.post(`${base}/login`, params).then(res => res.data);
const logout = params => axios.get(`${base}/logout`).then(res => res.data);
const checklogin = params => axios.get(`${base}/checklogin`).then(res => res.data);

export default {
    login,
    logout,
    checklogin
};
