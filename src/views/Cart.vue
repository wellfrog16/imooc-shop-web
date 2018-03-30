<template>
    <section class="container cart">
        <breadcrumb>
            <template slot="main"><li class="breadcrumb-item">Cart</li></template>
        </breadcrumb>
        <h2>My Cart</h2>
        <div class="row bg-primary text-white py-3 d-none d-lg-flex">
            <div class="col-4 text-center">ITEMS</div>
            <div class="col-2 text-right">PRICE</div>
            <div class="col-2 text-center">QUANTITY</div>
            <div class="col-2 text-right">SUBTOTAL</div>
            <div class="col-2 text-center"></div>
        </div>
        <div class="row list flex-row align-items-center pt-3 pb-sm-3 pb-0 border-bottom border-top mb-2 mb-lg-0" v-for="item in list" :key="item.id">
            <div class="col-8 col-lg-4 d-flex flex-row align-items-center item">
                <div class="custom-control custom-checkbox">
                    <input type="checkbox" class="custom-control-input" v-model="item.checked" :id="`checkbox${item.id}`" @click="check(item)">
                    <label class="custom-control-label" :for="`checkbox${item.id}`"> </label>
                </div>
                <img :src="item.photo">
                <span v-text="item.name" class="ml-3 d-none d-sm-block"></span>
            </div>
            <div class="col-4 col-lg-2 text-right price">{{ item.price | currency('￥') }}</div>
            <div class="col-6 offset-6 offset-lg-0 col-lg-2 quantity">
                <div class="input-group">
                    <span class="input-group-btn">
                        <button class="btn btn-secondary" type="button" @click="count(item, -1)">-</button>
                    </span>
                    <input type="text" class="form-control text-center" v-model="item.count">
                    <span class="input-group-btn">
                        <button class="btn btn-secondary" type="button" @click="count(item, 1)">+</button>
                    </span>
                </div><!-- /input-group -->
            </div>
            <div class="col-4 offset-8 offset-lg-0 col-lg-2 subtotal text-right">{{ item.price * item.count | currency('￥') }}</div>
            <div class="col-2 remove text-center d-none d-lg-block"><span class="glyphicon glyphicon-trash" @click="delConfirm(item)"><i class="iconfont icon-shanchu"></i></span></div>
            <div class="col-12 d-block d-sm-none pl-3 py-2 mt-3 bg-light" v-text="item.name"></div>
        </div>

        <div class="row mt-2">
            <div class="col-6 col-md-8 py-2 bg-secondary text-white">
                <div class="custom-control custom-checkbox">
                    <input type="checkbox" class="custom-control-input" value="true" id="checkAll" :checked="flagCheckAll" @click="checkAll()">
                    <label class="custom-control-label" for="checkAll">Select ALL</label>
                </div>
            </div>
            <div class="col-6 col-md-2 py-2 bg-secondary text-white text-right">{{ totalPrice | currency('￥') }}</div>
            <button class="col-12 col-md-2 text-center text-white py-2 btn btn-success" :disabled="totalPrice === 0" @click="$router.push({name: 'address'});">Check ALL</button>
        </div>

        <Modal modal-id="deleteModal" modal-size="modal-sm" title="确认删除">
            <template slot="body">您确认要删除吗？</template>
            <template slot="footer">
                <button type="button" class="btn btn-default" data-dismiss="modal">取消</button>
                <button type="button" class="btn btn-danger" @click="remove()">删除</button>
            </template>
        </Modal>
    </section>
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
    .item img {
        width: 100px;
        height: 100px;
    }

    .quantity {

        .input-group {
            width: 120px;
            margin: 0 auto;
        }
    }

    .remove {
        span {
            cursor: pointer;

            &:hover {
                color: red;
            }
        }
    }
}

@media screen and (max-width: 992px) {
    .cart {
        .price {
            margin-top: -4rem;
        }
        .quantity {
            margin-top: -6rem;

            .input-group {
                width: 120px;
                margin: 0;
                margin-left: auto;
            }
        }
        .subtotal {
            margin-top: -2rem;
        }
    }
}

</style>