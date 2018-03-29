<template>
    <div id="app">
        <x-header></x-header>
        <breadcrumb></breadcrumb>
        <router-view/>
        <x-footer></x-footer>
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
    padding: 4rem 0 20px 0;
}

</style>