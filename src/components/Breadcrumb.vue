<template>
<div class="row">
    <ol class="breadcrumb col-12">
        <li class="breadcrumb-item"><router-link to="/">Home</router-link></li>
        <slot name="main"></slot>
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