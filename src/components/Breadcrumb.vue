<template>
    <div class="row">
        <ol class="breadcrumb">
            <li><router-link to="/">Home</router-link></li>
            <slot name="a"></slot>
        </ol>
    </div>
</template>

<script>
    export default {
        name: 'breadcrumb'
    };
</script>

<style>

</style>