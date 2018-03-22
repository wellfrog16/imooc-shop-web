<template>
    <div class="success">
        <Step index="4"></Step>
        <div v-text="order.id"></div>
        <div v-text="order.totalOrder"></div>
    </div>
</template>

<script>
import Step from '~components/Step.vue';
import api from '@/api/order';

export default {
    components: { Step },
    data() {
        return {
            order: {}
        };
    },
    mounted() {
        this.loadDetail();
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