<template>
    <div class="row">
        <ol class="breadcrumb">
            <li><a href="/">Home</a></li>
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