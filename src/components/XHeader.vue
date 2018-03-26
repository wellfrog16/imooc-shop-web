<template>
<div class="header">

    <nav class="navbar navbar-expand-lg navbar-light bg-light fixed-top justify-content-end">
        <!-- <div class="container"> -->
            <a class="navbar-brand" href="#">SHOP</a>
            <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarColor01" aria-controls="navbarColor01" aria-expanded="false" aria-label="Toggle navigation">
                <span class="navbar-toggler-icon"></span>
            </button>

            <div class="collapse navbar-collapse" id="navbarColor01">
                <ul class="navbar-nav mr-auto">
                    <li class="nav-item active">
                        <a class="nav-link" href="#">Home <span class="sr-only">(current)</span></a>
                    </li>
                    <li class="nav-item">
                        <a class="nav-link" v-text="user.name"></a>
                    </li>
                    <li class="nav-item" v-if="!user.id" data-toggle="modal" data-target="#myModal">
                        <a class="nav-link" href="#">Login</a>
                    </li>
                    <li class="nav-item" v-if="user.id" @click="logout">
                        <a class="nav-link" href="#">Logout</a>
                    </li>
                    <li class="nav-item" v-if="user.id">
                        <router-link class="nav-link" to="/cart">Cart <span class="badge badge-pill badge-success" v-text="count"></span></router-link>
                    </li>
                <!-- <li class="nav-item"><a href="#" v-text="user.name"></a></li>
                <li class="nav-item" v-if="!user.id" data-toggle="modal" data-target="#myModal"><a href="#">Login</a></li> -->
                <!-- <li class="nav-item" v-if="user.id" @click="logout"><a href="#">Logout</a></li>
                <li class="nav-item" v-if="user.id"><router-link to="/cart">Cart <span class="badge">5</span></router-link></li> -->
                </ul>
            </div>
        <!-- </div> -->
    </nav>

    <Modal modal-id="myModal" modal-size="modal-sm" title="登陆">
        <template slot="body">
            <div class="form-group" v-if="loginError">
                <label>登陆失败</label>
            </div>
            <div class="form-group">
                <label>用户名</label>
                <input type="text" class="form-control" id="username" v-model="form.fields.name" placeholder="用户名">
            </div>
            <div class="form-group">
                <label>密码</label>
                <input type="password" class="form-control" v-model="form.fields.password" placeholder="密码">
            </div>
        </template>
        <template slot="footer">
            <button type="button" class="btn btn-default" data-dismiss="modal">取消</button>
            <button type="button" class="btn btn-info" @click="login()">登入</button>
        </template>
    </Modal>
</div>
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
                    name: '',
                    password: ''
                }
            }
        };
    },
    mounted() {
        $('#myModal').on('show.bs.modal', () => {
            this.form.fields.name = '';
            this.form.fields.password = '';
        }).on('shown.bs.modal', () => {
            $('#username').focus();
        });

        cartApi.count().then(res => {
            this.$store.commit('updateCartCount', res.data.count);
        });

        this.checklogin();
    },
    methods: {
        async login() {
            // console.log(`username:${this.form.fields.username}, password:${this.form.fields.password}`);

            const res = await api.login({name: this.form.fields.name, password: this.form.fields.password});

            if (res.err) {
                this.loginError = true;
                setTimeout(() => {
                    this.loginError = false;
                }, 2000);
            } else if (res.data.id) {
                this.user.id = res.data.id;
                this.user.name = res.data.name;
                $('#myModal').modal('hide');
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
            });
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
    .modal-dialog {
        margin-top: 30vh;
    }
}
</style>