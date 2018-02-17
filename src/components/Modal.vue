<template>
    <!-- Modal -->
    <div class="modal fade" :id="modalId" :class="modalClass" role="dialog" aria-labelledby="myModalLabel">
        <div class="modal-dialog" :class="modalSize" role="document">
            <div class="modal-content">
            <div class="modal-header">
                <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
                <h4 class="modal-title" id="myModalLabel" v-text="title"></h4>
            </div>
            <div class="modal-body">
                <slot name="body"></slot>
            </div>
            <div class="modal-footer">
                <slot name="footer"></slot>
            </div>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        props: {
            modalId: {},
            title: {},
            modalSize: {
                default: ''
            },
            modalClass: {}
        }
    };
</script>

<style lang="less">

</style>