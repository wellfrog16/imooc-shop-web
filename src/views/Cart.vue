<template>
    <div class="container cart">
        <breadcrumb>
            <template slot="main"><li class="breadcrumb-item">List</li></template>
        </breadcrumb>
        <h2>My Cart</h2>
        <div class="row bg-primary text-white py-3">
            <div class="col-4 text-center">ITEMS</div>
            <div class="col-2">PRICE</div>
            <div class="col-2">QUANTITY</div>
            <div class="col-2">SUBTOTAL</div>
            <div class="col-2">REMOVE</div>
        </div>
        <div class="row list" v-for="item in list" :key="item.id">
            <div class="col-4 item d-flex flex-column align-content-center">
                <div class="custom-control custom-checkbox">
                    <input type="checkbox" class="custom-control-input" v-model="item.checked" :id="`checkbox${item.id}`" @click="check(item)">
                    <label class="custom-control-label" :for="`checkbox${item.id}`"><img :src="item.photo" width="100" height="100" alt=""></label>
                </div>
                <div v-text="item.name"></div>
            </div>
            <div class="col-2 price">{{ item.price }}</div>
            <div class="col-2 quantity">
                <div class="input-group">
                    <span class="input-group-btn">
                        <button class="btn btn-default" type="button" @click="count(item, -1)">-</button>
                    </span>
                    <input type="text" class="form-control" v-model="item.count">
                    <span class="input-group-btn">
                        <button class="btn btn-default" type="button" @click="count(item, 1)">+</button>
                    </span>
                </div><!-- /input-group -->
            </div>
            <div class="col-2 subtotal">{{ item.price * item.count }}</div>
            <div class="col-2 remove"><span class="glyphicon glyphicon-trash" @click="delConfirm(item)">remove</span></div>
        </div>

        <div class="row total">
            <div class="col-xs-2">
                <label class="btn btn-primary">
                    <input type="checkbox" value="true" id="checkAll" :checked="flagCheckAll" @click="checkAll()">
                </label>
                Select ALL
            </div>
            <div class="col-xs-2 col-xs-offset-6">{{ totalPrice | currency('￥') }}</div>
            <div class="col-xs-2" @click="$router.push({name: 'address'});">Check ALL</div>
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
import Breadcrumb from '~components/Breadcrumb.vue';
import api from '@/api/cart';
import $ from 'jquery';
// import utils from '@/utils/utils';

export default {
    components: { Modal, Breadcrumb },
    data() {
        return {
            goods: { },
            list: []
        };
    },
    created() {
        console.log('判断是否登陆');
    },
    mounted() {
        this.loadList();
    },
    // filters: {
    //     currency: utils.currency
    // },
    methods: {
        async loadList() {
            const res = await api.list();
            if (res.err) {
                console.log(res.err);
            } else {
                this.list = res.data.list;
            }
        },
        delConfirm(item) {
            $('#deleteModal').modal('show');
            this.goods = item;
        },
        async remove() {
            const res = await api.del(this.goods.id);
            if (res.err) {
                console.log(res.err);
            } else {
                this.$store.commit('updateCartCount', -this.goods.count);
                $('#deleteModal').modal('hide');
                this.loadList();
            }
        },
        count(item, num) {
            if (!(item.count === 1 && num < 0)) {
                item.count += num;
                this.$store.commit('updateCartCount', num);
                this.save(item);
            }
        },
        check(item) {
            item.checked = !item.checked;
            this.save(item);
        },
        checkAll() {
            const flag = !this.flagCheckAll;
            for (const item of this.list) {
                item.checked = flag;
            }

            api.checkAll({checked: flag});
        },
        save(item) {
            this.goods.id = item.id;
            this.goods.checked = item.checked;
            this.goods.count = item.count;

            api.update(this.goods);
        }
    },
    computed: {
        // 当前全选状态
        flagCheckAll() {
            for (const item of this.list) {
                if (!item.checked) { return false; }
            }
            return true;
        },
        totalPrice() {
            let price = 0;
            for (const item of this.list) {
                if (item.checked) { price += +item.count * parseFloat(item.price); }
            }
            return price;
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