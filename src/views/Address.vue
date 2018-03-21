<template>
    <section class="address">
        <Step index="1"></Step>
        <ul class="list row">
            <li v-for="(item, index) in listFilter"
                :key="item.id" class="col-sm-3"
                :class="{ 'active': index === checkedIndex }"
                @click="checkedIndex = index">
                <div class="info" v-text="item.username"></div>
                <div v-if="!item.default" @click="setDefault(item.id)">set default</div>
                <div v-if="item.default">default</div>
                <div @click="remove(item.id)">delete</div>
            </li>
        </ul>
        <div class="more" @click="expand">more</div>
        <a class="btn btn-primary" @click="next()">下一步</a>
    </section>
</template>

<script>
import Step from '~components/Step.vue';
import api from '@/api/address';
import utils from '@/utils/utils';

export default {
    components: { Step },
    data() {
        return {
            limit: 4,
            checkedIndex: 0,
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
                utils.log(res.err);
            } else {
                this.list = res.data.list;
            }
        },
        expand() {
            this.limit = this.limit === this.list.length ? 4 : this.list.length;
        },
        setDefault(id) {
            api.setDefault(id).then(() => this.refresh());
        },
        remove(id) {
            api.del(id).then(() => this.refresh());
        },
        next() {
            this.$router.push({ name: 'order', query: { addressId: this.list[this.checkedIndex].id } });
        }
    },
    computed: {
        listFilter() {
            return this.list.slice(0, this.limit);
        }
    }
};
</script>

<style lang="less">
.address {
    .list {
        li.active {
            border: 1px solid #000;
        }
    }
}
</style>