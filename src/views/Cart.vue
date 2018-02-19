<template>
    <div class="row cart">
        <h2>My Cart</h2>
        <div class="container-fluid">
            <div class="row header">
                <div class="col-xs-4">ITEMS</div>
                <div class="col-xs-2">PRICE</div>
                <div class="col-xs-2">QUANTITY</div>
                <div class="col-xs-2">SUBTOTAL</div>
                <div class="col-xs-2">REMOVE</div>
            </div>
            <div class="row list" v-for="item in list" :key="item.id">
                <div class="col-xs-4 item">
                    <label class="btn btn-primary">
                        <input type="checkbox" value="one">
                    </label>
                    <img :src="item.photo" width="100" height="100" alt="">
                    <span v-text="item.name"></span>
                </div>
                <div class="col-xs-2 price">{{ item.price }}</div>
                <div class="col-xs-2 quantity">
                    <div class="input-group">
                        <span class="input-group-btn">
                            <button class="btn btn-default" type="button">-</button>
                        </span>
                        <input type="text" class="form-control" v-model="item.count">
                        <span class="input-group-btn">
                            <button class="btn btn-default" type="button">+</button>
                        </span>
                    </div><!-- /input-group -->
                </div>
                <div class="col-xs-2 subtotal">{{ item.price * item.count }}</div>
                <div class="col-xs-2 remove"><span class="glyphicon glyphicon-trash" @click="delConfirm(item.id)"></span></div>
            </div>

            <div class="row total">
                <div class="col-xs-2">Select ALL</div>
                <div class="col-xs-8">PRICE</div>
                <div class="col-xs-2">Check ALL</div>
            </div>
        </div>
        <Modal modal-id="deleteModal" modal-size="modal-sm" title="确认删除">
            <template slot="body">您确认要删除吗？</template>
            <template slot="footer">
                <button type="button" class="btn btn-danger" @click="remove()">删除</button>
                <button type="button" class="btn btn-default" data-dismiss="modal">取消</button>
            </template>
        </Modal>
    </div>
</template>

<script>
import Modal from '~components/Modal.vue';
import api from '@/api/cart';
import $ from 'jquery';

export default {
    components: { Modal },
    data() {
        return {
            currentGoodsId: 0,
            list: []
        };
    },
    created() {
        console.log('判断是否登陆');
    },
    mounted() {
        this.loadList();
    },
    methods: {
        async loadList() {
            const res = await api.list();
            if (res.err) {
                console.log(res.err);
            } else {
                this.list = res.data.list;
            }
        },
        delConfirm(id) {
            $('#deleteModal').modal('show');
            this.currentGoodsId = id;
        },
        async remove() {
            await api.del(this.currentGoodsId);
            $('#deleteModal').modal('hide');
            this.loadList();
        }
    }
};
</script>

<style lang="less">
.cart {
    @height: 120px;

    .list {
        height: @height;
        text-align: center;
        border-bottom: 1px solid grey;

        .item {
            text-align: left;
            img {

            }
        }

        .quantity {

            .input-group {
                width: 120px;
                margin: 40px auto 0 auto;
            }

            input {
                text-align: center;
            }
        }

        .remove {
            font-size: 20px;

            span {
                cursor: pointer;

                &:hover {
                    color: red;
                }
            }
        }
    }
    .header {
        background-color: #888;
        color: #fff;
        text-align: center;
        line-height: 30px;
    }
}

</style>