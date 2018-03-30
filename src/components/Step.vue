<template>
    <div class="row step mb-2">
        <div class="col-3 text-center px-0"
            v-for="(item, index) in steps"
            :key="index">
            <div class="d-none d-sm-block" :class="{ 'text-primary': step >= index, 'text-dark': step < index }">{{ item }}</div>
            <div class="py-1" :class="{ 'bg-primary': step >= index, 'bg-light': step < index }"></div>
        </div>
    </div>
</template>

<script>
export default {
    props: ['step'],
    data() {
        return {
            steps: ['Confirm address', 'View your order', 'Make payment', 'Order confirmation']
        };
    }
};
</script>

<style lang="less">
</style>