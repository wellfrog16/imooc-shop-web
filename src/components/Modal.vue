<template>
    <!-- Modal -->
    <div class="modal fade" :id="modalId" :class="modalClass" role="dialog">
        <div class="modal-dialog modal-dialog-centered" :class="modalSize" role="document">
            <div class="modal-content">
                <div class="modal-header">
                    <h4 class="modal-title" id="myModalLabel" v-text="title"></h4>
                    <button type="button" class="close" data-dismiss="modal"><span>&times;</span></button>
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