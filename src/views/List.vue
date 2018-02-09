<template>
<div class="row">
    <div class="container-fluid">
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
                    <li class="dropdown">
                        <a href="#" class="dropdown-toggle" data-toggle="dropdown" role="button" aria-haspopup="true" aria-expanded="false">排序 <span class="caret"></span></a>
                        <ul class="dropdown-menu">
                            <li><a href="#">默认</a></li>
                            <li><a href="#">价格</a></li>
                        </ul>
                    </li>
                </ul>
            </div>
            <div class="row list-goods">
                <div v-for="item in list" :key="item.id" class="col-sm-3 col-xs-12">
                    <img v-bind:src="item.photo" alt="" class="img-responsive">
                    <div class="header">
                        <span class="name">{{ item.name }}</span>
                        <span class="price">{{ item.price }}</span>
                    </div>
                </div>
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
            pagesize: 10,
            page: 1,
            list: [],
            idFiler: [
                { start: 1, end: 4 },
                { start: 5, end: 8 },
                { start: 9, end: 12 }
            ]
        };
    },
    created() {
        this.loadList(this.page, this.pagesize);
    },
    methods: {
        async loadList(page, pagesize) {
            const { total, list } = await api.list({page, pagesize});
            this.total = total;
            this.list = list;
        }
    }
};
</script>

<style lang="less">
<<<<<<< HEAD
.goods {
=======
@media (min-width: 768px) {
>>>>>>> c9a2f6f4ef8ae7675b4180662c55446053b4085e
    .list-goods {
        .header {
            .name { float: left; }
            .price { float: right; }
        }
    }
}
</style>