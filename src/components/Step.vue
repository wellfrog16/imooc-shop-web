<template>
    <div class="step container">
        <div class="row">
            <div class="col-sm-3" :class="{ active: +index === 1 }">1</div>
            <div class="col-sm-3" :class="{ active: +index === 2 }">2</div>
            <div class="col-sm-3" :class="{ active: +index === 3 }">3</div>
            <div class="col-sm-3" :class="{ active: +index === 4 }">4</div>
        </div>
    </div>
</template>

<script>
export default {
    props: ['index'],
    data() {
        return {
            x: ''
        };
    }
};
</script>

<style lang="less">
.step {
    .active {
        background-color: #890;
    }
}
</style>