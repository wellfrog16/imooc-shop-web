<template>
    <div class="row">
        <div class="col-lg-12">
            <ol class="breadcrumb">
                <li class="breadcrumb-item"><router-link to="/">Home</router-link></li>
                <slot name="a"></slot>
            </ol>
        </div>
    </div>
</template>

<script>
    export default {
        name: 'breadcrumb'
    };
</script>

<style>

</style>