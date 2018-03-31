<template>
<header class="header">
    <nav class="navbar navbar-light bg-light fixed-top px-0">
        <div class="container">
            <a class="navbar-brand" href="/">SHOP</a>
            <ul class="nav justify-content-end">
                <li class="nav-item" v-if="!user.id" data-toggle="modal" data-target="#loginModal">
                    <a href="#">Login</a>
                </li>
                <li class="nav-item" v-if="user.name">
                    <div class="dropdown show">
                        <a class="dropdown-toggle" href="#" data-toggle="dropdown" v-text="user.name"></a>

                        <div class="dropdown-menu">
                            <a class="dropdown-item" href="#" @click="logout">Logout</a>
                        </div>
                    </div>
                </li>
                <li class="nav-item" v-if="user.id">
                    <router-link class="pl-3 cart" to="/cart">Cart <span class="badge badge-pill badge-info" v-text="count"></span></router-link>
                </li>
            </ul>
        </div>
    </nav>

    <Modal modal-id="loginModal" modal-size="modal-sm" title="登陆">
        <template slot="body">
            <div class="form-group" v-if="loginError">
                <label>登陆失败</label>
            </div>
            <div class="form-group">
                <input type="text" class="form-control" id="username" v-model="form.fields.name" placeholder="用户名">
            </div>
            <div class="form-group">
                <input type="password" class="form-control" v-model="form.fields.password" placeholder="密码">
            </div>
        </template>
        <template slot="footer">
            <button type="button" class="btn btn-default" data-dismiss="modal">取消</button>
            <button type="button" class="btn btn-primary" @click="login()">登入</button>
        </template>
    </Modal>
</header>
</template>

<script>
import Modal from '~components/Modal.vue';
import api from '@/api/user';
import cartApi from '@/api/cart';
import $ from 'jquery';
import { mapState } from 'vuex';

export default {
    name: 'x-header',
    components: { Modal },
    data() {
        return {
            user: {
                id: 0,
                name: ''
            },
            loginError: false,
            form: {
                fields: {
                    name: 'guest',
                    password: '123456'
                }
            }
        };
    },
    mounted() {
        $('#loginModal').on('show.bs.modal', () => {
            // this.form.fields.name = '';
            // this.form.fields.password = '';
        }).on('shown.bs.modal', () => {
            $('#username').focus();
        });

        this.checklogin();
    },
    methods: {
        async login() {
            const res = await api.login({name: this.form.fields.name, password: this.form.fields.password});

            if (res.err) {
                this.loginError = true;
                setTimeout(() => {
                    this.loginError = false;
                }, 2000);
            } else if (res.data.id) {
                this.user.id = res.data.id;
                this.user.name = res.data.name;
                $('#loginModal').modal('hide');

                this.updateCartCount();
            }
        },
        async logout() {
            const res = await api.logout();

            if (res.data.logout) {
                this.user.id = 0;
                this.user.name = '';
                this.$router.push({name: 'list'});
            }
        },
        checklogin() {
            api.checklogin().then(res => {
                if (!res.err) {
                    this.user.id = res.data.id;
                    this.user.name = res.data.name;
                }

                this.updateCartCount();
            });
        },
        updateCartCount() {
            cartApi.count().then(res => this.$store.commit('updateCartCount', res.data.count));
        }
    },
    computed: {
        ...mapState(['count'])
        // count() {
        //     return this.$store.state.count;
        // }
    }
};
</script>

<style lang="less">
.header {
    .cart span {
        position: relative;
        top: -5px;
    }
}
</style>