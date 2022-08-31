<template>
    <div class="modal alert">
        <div class="modal-container">
            <div class="modal-header">
                <p>CUKCUK - Quản lý nhà hàng</p>
            </div>
            <div class="modal-body">
                <div :class="{'warning-icon' : modalType === 'confirm-delete' || modalType == 'invalid', 'confrim-icon' : modalType === 'confirm-change'}"></div>
                <p v-if="modalType === 'confirm-delete'">Bạn có chắc chắn muốn xóa món &lt;<span>{{deleteCode}}</span>&gt; không? </p>
                <p v-if="modalType === 'confirm-change'">Dữ liệu đã bị thay đổi, bạn có muốn cất không</p>
                <p v-if="modalType === 'invalid'">{{warningErrorMsg}}</p>
            </div>
            <div class="modal-footer" :class="{'footer-change' : modalType === 'confirm-change'}">
                <slot name="button-section"></slot>
            </div>
        </div>
    </div>
</template>
<script>

export default {
    components:{
        
    },

    data(){
        return{
            
        }
        
    },

    props:{
        deleteCode: String,
        modalType:{
            type: String,
            require: false,
            default: 'warning'
        },
        warningErrorMsg: Array
    }
}
</script>
<style scoped>
.modal {
    background: rgba(0, 0, 0, 0.3);
    height: 100%;
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    position: fixed;
    top: 0;
    left: 0;
    z-index: 3;
}

.modal-container {
    padding: 5px;
    background: #0973b9;
    font-size: 13px;
    width: 400px;
    border-radius: 4px;
}

.modal-header{
    height: 25px;
    background: #0973b9;
    color: #fff;
    font-size: 13px;
}

.modal-body{
    background: #fff;
    display: flex;
    padding: 10px;
}

.modal-body .warning-icon {
    background: url('../../assets/img/icon-warning.png') no-repeat 0 0;
    width: 36px;
    height: 30px;
    margin-right: 20px;
}

.modal-body .confrim-icon{
    background: url('../../assets/img/icon-question.png') no-repeat 0 0;
    width: 36px;
    height: 32px;
    margin-right: 20px;
}

.modal-footer {
    padding: 20px 0 0 0;
    display: flex;
    justify-content: flex-end;
    background: #fff;
    padding: 10px;
}

.modal-footer.footer-change{
    justify-content: space-between;
}

button{
    background: linear-gradient(180deg, #f2f2f2, #e0e0e0);
}
</style>