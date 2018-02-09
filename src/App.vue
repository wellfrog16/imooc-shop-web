<template>
    <div id="app">
        <div class="container">
            <x-header></x-header>
            <breadcrumb>
                <li slot="a"><a href="#">Test</a></li>
            </breadcrumb>
            <router-view/>
            <x-footer></x-footer>
        </div>
    </div>
</template>

<script>
import Breadcrumb from '~components/Breadcrumb.vue';
import XHeader from '~components/XHeader.vue';
import XFooter from '~components/XFooter.vue';

export default {
    name: 'app',
    components: {
        XHeader, XFooter, Breadcrumb
    }
};
</script>

<style lang="less">
body {
    padding: 50px 0 20px 0;
}

</style>