<template>
    <div class="pt-3 mt-5">
        <x-header></x-header>
        <router-view/>
        <x-footer></x-footer>
    </div>
</template>

<script>
import XHeader from '~components/XHeader.vue';
import XFooter from '~components/XFooter.vue';

export default {
    name: 'app',
    components: {
        XHeader, XFooter
    }
};
</script>

<style lang="less">
</style>