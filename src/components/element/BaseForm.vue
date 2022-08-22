<template>
    <form class="container" :class="{'small-form' : isDetailForm}">
        <div class="header">
            <p>Thêm món</p>
            <div class="icon-container">
                <div class="close-icon" @click="this.$emit('onClickCloseForm')"></div>
            </div>
        </div>
        <slot name="content"></slot>
        <div class="footer">
            <div class="left">
                <d-button btnText = "Giúp" :isSmall="true">
                    <template #icon>
                        <div class="help-icon"></div>
                    </template>
                </d-button>
            </div>
            <div class="right">
                <d-button btnText = "Cất" @click="(e) => this.$emit('onSubmitClick', e)">
                    <template #icon>
                        <div class="insert-icon"></div>
                    </template>
                </d-button>
                <slot name="submitAndAddBtn"></slot>
                <d-button btnText = "Hủy bỏ" @click="(e) => {this.$emit('onCancelClick', e)}" :isSmall="true">
                    <template #icon>
                        <div class="cancel-icon"></div>
                    </template>
                </d-button>
            </div>
        </div>
    </form>

</template>

<script>
import DButton from "./DButton.vue";
export default {
    components:{
        DButton
    },

    props:{
        isDetailForm: Boolean
    }
}
</script>

<style scoped>
    .form {
        width: 100%;
        height: 100vh;
        display: flex;
        align-items: center;
        justify-content: center;
        background: rgba(0, 0, 0, 0.5);
        position: fixed;
        top: 0;
        left: 0;
        z-index: 2;
    }
    
    .container {
        width: 750px;
        padding: 5px;
        background: #0973b9;
        font-size: 13px;
    }

    .container.small-form{
        width: 400px!important;

    }

    /* Header */

    .form .header{
        width: 100%;
        height: 25px;
        background: #0973b9;
        display: flex;
        align-items: center;
        justify-content: space-between;
        color: #fff;
        padding-bottom: 5px;
    }

    .form .icon-container{
        margin-right: 5px;
        cursor: pointer;
    }

    .form .icon-container .close-icon{
        background: url('../../assets/img/tool-sprites.png') no-repeat 0 0;
        width: 16px;
        height: 16px;
    }

    /* form footer */

    .form .footer{
        display: flex;
        align-items: center;
        justify-content: space-between;
        background: #fff;
        padding: 10px 8px;
    }

    .form .footer .right{
        display: flex;
        align-items: center;
    }

    .footer .right button{
        margin-left: 8px;
    }

    .footer .help-icon{
        background: url('../../assets/img/IconSprites/IconSprite.png') no-repeat 0 -1600px;
        width: 15px;
        height: 15px;
        margin-right: 5px;
    }

    .footer .insert-icon{
        background: url('../../assets/img/insert-icon.png') no-repeat 0 0;
        width: 15px;
        height: 15px;
        margin-right: 5px;
    }

    .footer .cancel-icon{
        background: url('../../assets/img/Disable.png') no-repeat 0 0;
        width: 15px;
        height: 15px;
        margin-right: 5px;
    }

</style>