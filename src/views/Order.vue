<template>
    <section class="container order">
        <breadcrumb>
            <template slot="main"><li class="breadcrumb-item">Order</li></template>
        </breadcrumb>
        <Step step="1"></Step>
        <h2>View your order</h2>
        <div class="row bg-primary text-white py-3 d-none d-lg-flex">
            <div class="col-6 text-center">ITEMS</div>
            <div class="col-2 text-right">PRICE</div>
            <div class="col-2 text-center">QUANTITY</div>
            <div class="col-2 text-right">SUBTOTAL</div>
        </div>
        <div class="row list flex-row align-items-center pt-3 pb-sm-3 pb-0 border-bottom border-top mb-2 mb-lg-0" v-for="item in selectedList" :key="item.id">
            <div class="col-8 col-lg-6 d-flex flex-row align-items-center item">
                <img :src="item.photo">
                <span v-text="item.name" class="ml-3 d-none d-sm-block"></span>
            </div>
            <div class="col-4 col-lg-2 text-right price">{{ item.price | currency('￥') }}</div>
            <div class="col-6 offset-6 offset-lg-0 col-lg-2 text-right text-lg-center quantity" v-text="`* ${item.count}`"></div>
            <div class="col-4 offset-8 offset-lg-0 col-lg-2 text-right subtotal">{{ item.price * item.count | currency('￥') }}</div>
            <div class="col-12 d-block d-sm-none pl-3 py-2 mt-3 bg-light" v-text="item.name"></div>
        </div>

        <div class="row total text-right mt-3">
            <div class="col-12">总价: <span>{{ totalPrice | currency('￥') }}</span></div>
            <div class="col-12">配送费: <span>{{ shipping | currency('￥') }}</span></div>
            <div class="col-12">折扣: <span>{{ discount | currency('￥') }}</span></div>
            <div class="col-12">税: <span>{{ tax | currency('￥') }}</span></div>
            <div class="col-12">应付: <span>{{ totalOrder | currency('￥') }}</span></div>
        </div>

        <div class="row mt-3">
            <button class="col-6 col-md-2 btn btn-secondary" @click="$router.go(-1)">PREV</button>
            <button class="col-6 col-md-2 offset-md-8 btn btn-success"  @click="payment()">Payment</button>
        </div>
    </section>
</template>

<script>
import Step from '~components/Step.vue';
import Breadcrumb from '~components/Breadcrumb.vue';
import cartApi from '@/api/cart';
import orderApi from '@/api/order';

export default {
    components: { Step, Breadcrumb },
    data() {
        return {
            shipping: 100,
            discount: 200,
            tax: 50,
            list: []
        };
    },
    mounted() {
        this.refresh();
    },
    methods: {
        refresh() {
            this.loadList();
        },
        async loadList() {
            const res = await cartApi.list();
            if (res.err) {
                console.log(res.err);
            } else {
                this.list = res.data.list;
            }
        },
        payment() {
            // todo 禁用按钮
            orderApi.insert({ addressId: this.$route.query.addressId, discount: this.discount, tax: this.tax, shipping: this.shipping }).then(res => {
                console.log(res.id);
                this.$router.push({ name: 'success', params: { id: res.data.id } });
            });
        }
    },
    computed: {
        selectedList() {
            let list = [];
            for (const item of this.list) {
                if (item.checked) { list.push(item); }
            }
            return list;
        },
        totalPrice() {
            let price = 0;
            for (const item of this.list) {
                if (item.checked) { price += +item.count * parseFloat(item.price); }
            }
            return price;
        },
        totalOrder() {
            return this.totalPrice + this.shipping - this.discount + this.tax;
        }
    }
};
</script>

<style lang="less">
.order {
    .item img {
        width: 100px;
        height: 100px;
    }

    .total span {
        float: right;
        width: 120px;
    }
}

@media screen and (max-width: 992px) {
    .order {
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