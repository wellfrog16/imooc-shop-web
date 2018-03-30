<template>
    <section class="container success">
        <breadcrumb>
            <template slot="main"><li class="breadcrumb-item">Cart</li></template>
        </breadcrumb>
        <Step step="3"></Step>
        <h2>Order confirmation</h2>
        <h3 class="my-5 text-center">Congratulations!<br>Your order is under processing!</h3>
        <h5 class="my-5 text-center">Order Id : <span class="text-danger">{{ order.id }}</span>, Order total <span class="text-danger">{{ order.totalOrder | currency('￥') }}</span></h5>

        <Modal modal-id="successModal" modal-size="modal-sm" title="支付成功">
            <template slot="body">您已完成订单</template>
            <template slot="footer">
                <button type="button" class="btn btn-success" data-dismiss="modal">确定</button>
            </template>
        </Modal>
    </section>
</template>

<script>
import Modal from '~components/Modal.vue';
import Step from '~components/Step.vue';
import Breadcrumb from '~components/Breadcrumb.vue';
import api from '@/api/order';
import $ from 'jquery';

export default {
    components: { Step, Breadcrumb, Modal },
    data() {
        return {
            order: {}
        };
    },
    mounted() {
        this.loadDetail();
        $('#successModal').modal('show');
    },
    methods: {
        async loadDetail() {
            const res = await api.detail(this.$route.params.id);
            if (res.err) {
                console.log(res.err);
            } else {
                this.order = res.data;
            }
        }
    }
};
</script>

<style lang="less">

</style>