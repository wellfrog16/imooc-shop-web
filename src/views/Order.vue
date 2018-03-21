<template>
    <div class="order">
        <Step index="2"></Step>
        <h2>My Cart</h2>
        <div class="container-fluid">
            <div class="row header">
                <div class="col-xs-4">ITEMS</div>
                <div class="col-xs-2">PRICE</div>
                <div class="col-xs-2">QUANTITY</div>
                <div class="col-xs-2">SUBTOTAL</div>
                <div class="col-xs-2">REMOVE</div>
            </div>
            <div class="row list" v-for="item in selectedList" :key="item.id">
                <div class="col-xs-4 item">
                    <img :src="item.photo" width="100" height="100" alt="">
                    <span v-text="item.name"></span>
                </div>
                <div class="col-xs-2 price">{{ item.price }}</div>
                <div class="col-xs-2 quantity">
                    <div class="input-group">
                        <input type="text" class="form-control" v-model="item.count">
                    </div><!-- /input-group -->
                </div>
                <div class="col-xs-2 subtotal">{{ item.price * item.count }}</div>
            </div>

            <div class="row total">
                <div class="col-xs-2">
                </div>
                <div class="col-xs-2 col-xs-offset-6"></div>
                <div class="col-xs-2"></div>
            </div>
        </div>

        <div>
            <div>总价:{{ totalPrice }}</div>
            <div>配送费: {{ shipping }}</div>
            <div>折扣: {{ discount }}</div>
            <div>税: {{ tax }}</div>
            <div>应付:{{ totalOrder }}</div>
        </div>

        <a class="btn btn-primary">下一步</a>
    </div>
</template>

<script>
import Step from '~components/Step.vue';
import api from '@/api/cart';

export default {
    components: { Step },
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
            const res = await api.list();
            if (res.err) {
                console.log(res.err);
            } else {
                this.list = res.data.list;
            }
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

<style>

</style>