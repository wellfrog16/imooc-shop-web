<template>
<div class="container">
    <div class="row">
        <div class="container-fluid goods">
            <div class="row">
                <div class="col-xs-12 navbar navbar-default">
                    <ul class="nav navbar-nav navbar-right">
                        <li><a href="#">Sort</a></li>
                        <li><a href="#" @click="sort()">价格 {{ priceState }}</a></li>
                    </ul>
                </div>
                <div class="row">
                    <div class="col-sm-3 filter">
                        <div class="panel panel-info">
                            <div class="panel-heading">Price</div>
                            <ul class="list-group">
                                <li class="list-group-item selected" @click="filterPrice(0, 0, 0)">All</li>
                                <li class="list-group-item" v-for="(item, index) in idFiler" :key="index" @click="filterPrice(index+1, item.start, item.end)">{{ item.start }} - {{ item.end }}</li>
                            </ul>
                        </div>
                    </div>
                    <div class="col-sm-9 list-goods">
                        <div class="row">
                            <div v-for="item in list" :key="item.id" class="col-sm-4 col-xs-12">
                                <img v-bind:src="item.photo" alt="">
                                <div class="header">
                                    <span class="name">{{ item.name }}</span>
                                    <span class="price">{{ item.price }}</span>
                                </div>
                                <div class="button" @click="addCart(item.id)">加入购物车</div>
                            </div>
                        </div>
                    </div>
                </div>
                <div v-infinite-scroll="loadMore" infinite-scroll-disabled="busy" infinite-scroll-distance="10" class="infinite-scroll">
                    {{ loadInfo }}
                </div>
            </div>
        </div>

        <Modal modal-id="cartMessage" modal-size="modal-sm" title="信息">
            <template slot="body">
                加入成功
            </template>
            <template slot="footer">
                <button type="button" class="btn btn-default" data-dismiss="modal">继续</button>
                <button type="button" class="btn btn-default" @click="goCart()">查看购物车</button>
            </template>
        </Modal>
    </div>
</div>
</template>

<script>
import Modal from '~components/Modal.vue';
import goodApi from '@/api/goods';
import cartApi from '@/api/cart';
import $ from 'jquery';
import utils from '@/utils/utils';

export default {
    name: 'list',
    components: { Modal },
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
            loadInfo: '加载中',
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
                            this.loadInfo = '加载中';
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
            $('.filter .list-group-item').removeClass('selected').eq(index).addClass('selected');
            this.refresh();
        },
        loadMore() {
            this.busy = true;

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
        .selected {
            border-left: 5px solid red;
        }
    }
    .list-goods {
        .row>div {
            margin-bottom: 30px;
            // border: 1px solid goldenrod;
            // padding: 10px;
        }
        .header {
            line-height: 40px;

            .name { float: left; }
            .price { float: right; }
        }

        .button {
            clear: both;
            border: 1px solid grey;
            text-align: center;
            line-height: 40px;
            cursor: pointer;

            &:hover {
                color: orangered;
                border: 1px solid orangered;
            }
        }

        img {
            width: 100%;
        }
    }

    .infinite-scroll {
        height: 100px;
        text-align: center;
    }
}
</style>