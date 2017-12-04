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
        </div>


        <div class="row list-goods">
            <div v-for="item in goodsList" :key="item.id" class="col-sm-3 col-xs-12">
                <img v-bind:src="item.url" alt="" class="img-responsive">
                <p>{{ item.title }}</p>
            </div>
        </div>
    </div>
</div>
</template>

<script>
    import axios from 'axios';

    export default {
        name: 'list',
        data() {
            return {
                goodsList: [],
                idFiler: [
                    { start: 1, end: 4 },
                    { start: 5, end: 8 },
                    { start: 9, end: 12 }
                ]
            };
        },
        methods: {
            getGoodsList() {
                axios.get('http://jsonplaceholder.typicode.com/photos?albumId=1').then((result) => {
                    for (const item of result.data) {
                        // for (let [index, value] of new Map(result.data.map((value, index) => [index, value]))) {
                        if (item.id > 10) { break; }
                        this.goodsList.push(item);
                    }
                });
            }
        },
        mounted() {
            this.getGoodsList();
        }
    };
</script>

<style lang="less">
@media (min-width: 768px) {
    .list-goods {
        p {
            height: 100px;
        }
    }
}
</style>