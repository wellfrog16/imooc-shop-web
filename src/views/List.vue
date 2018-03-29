<template>
<div class="container goods">
    <breadcrumb>
        <template slot="main"><li class="breadcrumb-item">List</li></template>
    </breadcrumb>
    <div class="row">
        <div class="col-12 text-md-right mb-3 p-2 bg-primary text-light">
            <span class="mr-2">Sort by:</span>
            <a class="text-white" href="#" @click="sort()">Price {{ priceState }}</a>
            <a class="text-white d-block d-md-none float-right" href="#" @click="toggleFilter()">Filter</a>
        </div>
        <div class="col-3 filter bg-light py-2 pl-2 pr-2 py-md-3 pl-md-3 pr-md-0">
            <h4 class="mb-0 p-2">Price</h4>
            <ul class="list-group">
                <li class="list-group-item active" @click="filterPrice(0, 0, 0)">All</li>
                <li class="list-group-item" v-for="(item, index) in idFiler" :key="index" @click="filterPrice(index+1, item.start, item.end)">{{ item.start }} - {{ item.end }}</li>
            </ul>
        </div>
        <div class="col-12 col-md-9 list-goods py-3 bg-light">
            <div class="row">
                <div v-for="item in list" :key="item.id" class="col-12 col-md-6 col-lg-4 mb-4 item">
                    <div class="card flex-md-column flex-row">
                        <img class="card-img-top img-fluid" v-bind:src="item.photo" >
                        <div class="card-body">
                            <h5 class="card-title">{{ item.name }}</h5>
                            <p class="card-text">{{ item.price }}</p>
                            <button class="btn btn-primary float-right float-md-none" @click="addCart(item.id)">加入购物车</button>
                        </div>
                    </div>
                </div>
                <h5 v-infinite-scroll="loadMore" infinite-scroll-disabled="busy" infinite-scroll-distance="10" class="infinite-scroll text-center text-success col-12">
                    {{ loadInfo }}
                </h5>
            </div>
        </div>
    </div>

    <Modal modal-id="cartMessage" modal-size="modal-sm" title="信息">
        <template slot="body">
            加入成功
        </template>
        <template slot="footer">
            <button type="button" class="btn btn-primary" data-dismiss="modal">继续</button>
            <button type="button" class="btn btn-default" @click="goCart()">查看购物车</button>
        </template>
    </Modal>
</div>
</template>

<script>
import Modal from '~components/Modal.vue';
import Breadcrumb from '~components/Breadcrumb.vue';
import goodApi from '@/api/goods';
import cartApi from '@/api/cart';
import $ from 'jquery';
import utils from '@/utils/utils';

export default {
    name: 'list',
    components: { Modal, Breadcrumb },
    data() {
        return {
            total: 0,
            pagesize: 9,
            page: 1,
            sortPrice: 0,
            filter: {
                price: {
                    start: 0,
                    end: 0
                }
            },
            busy: true,
            loadInfo: '',
            list: [],
            idFiler: [
                { start: 0, end: 2000 },
                { start: 2000, end: 4000 },
                { start: 4000, end: 10000 }
            ]
        };
    },
    created() {
        this.refresh();
    },
    methods: {
        async loadList(flagConcat = false) {
            const res = await goodApi.list(this.listParams);

            if (res.err) {
                utils.log(res.err);
            } else {
                const { list, total } = res.data;

                this.total = total;
                if (flagConcat) {
                    this.list = this.list.concat(list);
                    this.busy = list.length < this.pagesize;
                    this.loadInfo = list.length < this.pagesize ? '没有更多了' : '加载中';
                } else {
                    this.list = list;
                    this.$nextTick(() => {
                        setTimeout(() => {
                            this.busy = false;
                            // this.loadInfo = list.length < this.pagesize ? '没有更多了' : '加载中';
                        }, 500);
                    });
                }
            }
        },
        sort() {
            if (++this.sortPrice > 1) { this.sortPrice = -1; }
            this.refresh();
        },
        filterPrice(index, start, end) {
            this.filter.price.start = start;
            this.filter.price.end = end;
            $('.filter .list-group-item').removeClass('active').eq(index).addClass('active');
            this.refresh();
            this.toggleFilter();
        },
        loadMore() {
            this.busy = true;
            this.loadInfo = '加载中';

            setTimeout(() => {
                this.page++;
                this.loadList(true);
            }, 1000);
        },
        async addCart(id) {
            const res = await cartApi.insert(id);
            if (!res.err) {
                this.$store.commit('updateCartCount', 1);
                $('#cartMessage').modal('show');
            } else {
                console.log(res.err);
            }
        },
        goCart() {
            $('#cartMessage').modal('hide');
            this.$router.push({name: 'cart'});
        },
        refresh() {
            this.page = 1;
            this.loadList();
        },
        toggleFilter() {
            if ($(window).width() >= 768) { return; }
            const right = parseInt($('.filter').css('right')) === 0 ? -200 : 0;
            $('.filter').animate({ right });
        }
    },
    computed: {
        priceState() {
            return this.sortPrice === 0 ? '-' : (this.sortPrice === 1 ? '↑' : '↓');
        },
        listParams() {
            let params = {
                page: this.page,
                pagesize: this.pagesize,
                sortPrice: this.sortPrice
            };
            if (this.filter.price.end > 0) {
                params = Object.assign(params, this.filter.price);
            }

            return params;
        }
    }
};
</script>

<style lang="less">
.goods {
    .filter {
        .list-group {
            li {
                cursor: pointer;
            }
        }
    }
}

@media screen and (max-width: 768px) {
    .goods {
        .filter {
            position: fixed;
            top:0;
            right: -200px;
            z-index: 1035;
            background: #FFF;
            padding: 0;
            height: 100%;
            min-width: 200px;

        }

        .item {
            img {
                height: 100%;
                width: 150px;
            }
        }
    }
}
</style>