import axios from '@/helper/axios';

const base = '/imooc-shop/user';

const login = params => axios.post(`${base}/login`, params).then(res => res);
const logout = params => axios.get(`${base}/logout`).then(res => res);
const checklogin = params => axios.get(`${base}/check-login`).then(res => res);

export default {
    login,
    logout,
    checklogin
};
