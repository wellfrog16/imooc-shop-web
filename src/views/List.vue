<template>
<div class="row">
    <div class="container-fluid goods">
        <div class="row">
            <div class="col-xs-12 navbar navbar-default">
                <ul class="nav navbar-nav navbar-right">
                    <li><a href="#">测试</a></li>
                    <li class="dropdown">
                        <a href="#" class="dropdown-toggle" data-toggle="dropdown" role="button" aria-haspopup="true" aria-expanded="false">价格 <span class="caret"></span></a>
                        <ul class="dropdown-menu">
                            <li v-for="item in idFiler" :key="item.id">
                                <a href="#">{{ item.start }} - {{ item.end }}</a>
                            </li>
                        </ul>
                    </li>
                    <li><a href="#" @click="sort()">价格 {{ priceState }}</a></li>
                </ul>
            </div>
            <div class="row list-goods">
                <div v-for="item in list" :key="item.id" class="col-sm-3 col-xs-12">
                    <img v-bind:src="item.photo" alt="">
                    <div class="header">
                        <span class="name">{{ item.name }}</span>
                        <span class="price">{{ item.price }}</span>
                    </div>
                </div>
            </div>
            <div v-infinite-scroll="loadMore" infinite-scroll-disabled="busy" infinite-scroll-distance="10">
                {{ loadInfo }}
            </div>
        </div>
    </div>
</div>
</template>

<script>
import api from '@/api/goods';

export default {
    name: 'list',
    data() {
        return {
            total: 0,
            pagesize: 6,
            page: 1,
            sortPrice: 0,
            busy: true,
            loadInfo: '加载中',
            list: [],
            idFiler: [
                { start: 0, end: 2000 },
                { start: 2001, end: 4000 },
                { start: 4001, end: 10000 }
            ]
        };
    },
    created() {
        this.loadList();
    },
    methods: {
        async loadList(flagConcat = false) {
            const { total, list } = await api.list({
                page: this.page,
                pagesize: this.pagesize,
                sortPrice: this.sortPrice
            });
            this.total = total;
            if (flagConcat) {
                this.list = this.list.concat(list);
                this.busy = list.length < this.pagesize;
                this.loadInfo = list.length < this.pagesize ? '没有更多了' : '加载中';
            } else {
                this.list = list;
                this.busy = false;
                this.loadInfo = '加载中';
            }
        },
        sort() {
            if (++this.sortPrice > 1) { this.sortPrice = -1; }
            this.page = 1;
            this.loadList();
        },
        loadMore() {
            this.busy = true;

            setTimeout(() => {
                this.page++;
                this.loadList(true);
            }, 1000);
        }
    },
    computed: {
        priceState() {
            return this.sortPrice === 0 ? '-' : (this.sortPrice === 1 ? '↑' : '↓');
        }
    }
};
</script>

<style lang="less">
.goods {
    .list-goods {
        >div {
            margin-bottom: 20px;
        }
        .header {
            .name { float: left; }
            .price { float: right; }
        }

        img {
            width: 100%;
        }
    }
}
</style>