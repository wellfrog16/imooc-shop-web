<template>
<div class="header">
    <nav class="navbar navbar-default navbar-fixed-top">
        <div class="container">
            <!-- Brand and toggle get grouped for better mobile display -->
            <div class="navbar-header">
                <button type="button" class="navbar-toggle collapsed" data-toggle="collapse" data-target="#top-nav" aria-expanded="false">
                    <span class="sr-only">Toggle navigation</span>
                    <span class="icon-bar"></span>
                    <span class="icon-bar"></span>
                    <span class="icon-bar"></span>
                </button>
                <a class="navbar-brand" href="#">Shop</a>
            </div>

            <div class="collapse navbar-collapse" id="top-nav">
                <ul class="nav navbar-nav navbar-right">
                    <li><a href="#" v-text="user.name"></a></li>
                    <li v-if="!user.id" data-toggle="modal" data-target="#myModal"><a href="#">Login</a></li>
                    <li v-if="user.id" @click="logout"><a href="#">Logout</a></li>
                    <li class="dropdown">
                        <a href="#" class="dropdown-toggle" data-toggle="dropdown" role="button" aria-haspopup="true" aria-expanded="false">frog <span class="caret"></span></a>
                        <ul class="dropdown-menu">
                            <li><a href="#">登陆</a></li>
                            <li><a href="#">状态</a></li>
                            <li><a href="#">状态</a></li>
                            <li role="separator" class="divider"></li>
                            <li><a href="#">购物车</a></li>
                        </ul>
                    </li>
                </ul>
            </div>
        </div>
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
import $ from 'jquery';

export default {
    name: 'x-header',
    components: { Modal },
    data() {
        return {
            user: {
                name: '',
                id: 0
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

        this.checklogin();
    },
    methods: {
        async login() {
            // console.log(`username:${this.form.fields.username}, password:${this.form.fields.password}`);

            const info = await api.login({name: this.form.fields.name, password: this.form.fields.password});

            if (info.id) {
                this.user = Object.assign(this.user, info);
                this.loginError = false;
                $('#myModal').modal('hide');
            } else {
                this.loginError = true;
                setTimeout(() => {
                    this.loginError = false;
                }, 2000);
            }
        },
        async logout() {
            const res = await api.logout();

            if (res.logout === 'ok') {
                this.user = {};
                this.$router.push({name: 'list'});
            }
        },
        checklogin() {
            api.checklogin().then((res) => {
                if (res) {
                    this.user = Object.assign(this.user, res);
                }
            });
        }
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