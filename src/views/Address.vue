<template>
    <section class="container address">
        <breadcrumb>
            <template slot="main"><li class="breadcrumb-item">Address</li></template>
        </breadcrumb>
        <Step step="0"></Step>
        <h2>Confirm address</h2>
        <div class="row">
            <div class="col-12 col-sm-6 col-lg-3 mb-3" v-for="(item, index) in listFilter"
                    :key="item.id"
                    @click="checkedIndex = index">
                <div class="card" :class="{ 'border-success': index === checkedIndex, 'text-success': index === checkedIndex }">
                    <div class="card-body">
                        <h5 class="card-title" v-text="item.username"></h5>
                        <p class="card-text street" v-text="item.street"></p>
                        <p class="card-text" v-text="item.postcode"></p>
                        <p class="card-text" v-text="item.mobile"></p>
                        <a href="#" class="card-link" v-if="!item.default" @click="setDefault(item.id)">set default</a>
                        <a href="#" class="card-link" v-if="item.default">default</a>
                        <a href="#" class="card-link float-right" @click="delConfirm(item)"><i class="iconfont icon-shanchu"></i></a>  
                    </div>
                </div>
            </div>

            <button class="col-12 btn btn-default bg-light more" @click="expand"><i class="iconfont icon-up"></i></button>
        </div>
        
        <div class="row mt-3">
            <button class="col-6 col-md-2 btn btn-secondary" @click="$router.go(-1)">PREV</button>
            <button class="col-6 col-md-2 offset-md-8 btn btn-success" :disabled="typeof checkedIndex !== 'number'" @click="next()">NEXT</button>
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
import Step from '~components/Step.vue';
import Breadcrumb from '~components/Breadcrumb.vue';
import api from '@/api/address';
import utils from '@/utils/utils';
import $ from 'jquery';

export default {
    components: { Step, Breadcrumb, Modal },
    data() {
        return {
            limit: 4,
            checkedIndex: null,
            list: [],
            address: {}
        };
    },
    mounted() {
        this.refresh();
    },
    methods: {
        refresh() {
            this.loadList();
            this.$nextTick(() => {
                setTimeout(() => {
                    this.checkedIndex = this.defaultIndex;
                }, 500);
            });
        },
        async loadList() {
            const res = await api.list();

            if (res.err) {
                utils.log(res.err);
            } else {
                this.list = res.data.list;
            }
        },
        delConfirm(item) {
            if (this.list.length <= 1) { return false; }
            $('#deleteModal').modal('show');
            this.address = item;
        },
        expand() {
            if (this.limit === 4) {
                this.limit = this.list.length;
                $('.address .more i').removeClass('icon-down').addClass('icon-up');
            } else {
                this.limit = 4;
                $('.address .more i').removeClass('icon-up').addClass('icon-down');
            }
        },
        setDefault(id) {
            api.setDefault(id).then(() => this.refresh());
        },
        async remove() {
            const res = await api.del(this.address.id);
            if (res.err) {
                console.log(res.err);
            } else {
                $('#deleteModal').modal('hide');
                this.refresh();
            }
        },
        next() {
            this.$router.push({ name: 'order', query: { addressId: this.list[this.checkedIndex].id } });
        }
    },
    computed: {
        listFilter() {
            return this.list.slice(0, this.limit);
        },
        defaultIndex() {
            // this.list.forEach((item, index) => {
            //     if (item.default) { return index; }
            // });
            for (let i = 0; i < this.list.length; i++) {
                if (this.list[i].default) { return i; }
            }
        }
    }
};
</script>

<style lang="less">
.address {
    .street {
        height: 5rem;
    }
}
</style>