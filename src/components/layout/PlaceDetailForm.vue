<template>
<div class="form">
    <base-form
    :isDetailForm="true"
    @onClickCloseForm="onClickCloseForm"
    @onSubmitClick="onSubmitClick"
    @onCancelClick="onCancelClick"
    >
        <template #content>
            <div class="content">
                <combo-input
                    :labelName = "'Tên nơi chế biến'"
                    :propName="'FoodPlaceName'"
                    :isMandaInput = "true"
                    :inputValue = "foodPlace.FoodPlaceName"
                    :isError = "isError.FoodPlaceName"
                    :checkFocus = "checkFocus.FoodPlaceName"
                    :title="errMsg.FoodPlaceName"
                    @setInputValue="setInputValue"
                    ></combo-input>
                <combo-input
                    :labelName = "'Diễn giải'"
                    :propName="'Description'"
                    :isDescriptionInput = "true"
                    :inputValue = "foodPlace.Description"
                    :checkFocus = "checkFocus.Description"
                    @setInputValue="setInputValue"
                    ></combo-input>
            </div>
        </template>
    </base-form>
    <modal-alert
        v-if="isAlertOpened"
        :duplicateId="duplicateId"
        :modalType="'invalid'"
        :warningErrorMsg="warningErrorMsg">
            <template #button-section>
                <d-button btnText="Đồng ý" @click="closeAlert()"></d-button>
            </template>
    </modal-alert>
</div>
</template>

<script>
import BaseForm from "../element/BaseForm.vue";
import ComboInput from "../element/ComboInput.vue";
import ErrMsgs from "../../js/Resources/ErrMsgs";
import API_HEADER from "../../js/Resources/Api";
import ModalAlert from "./ModalAlert.vue";
import DButton from "../element/DButton.vue";
import axios from 'axios';
export default {
    components: {
        BaseForm,
        ComboInput,
        ModalAlert,
        DButton
    },

    //Khi khởi tạo, reset lại biến chủ
    // Ngày sửa: 11/8/2022
    // Người sửa: NMDUC
    created(){
        this.foodPlace = {}
    },

    methods:{
        //hàm truyền vào combo-input để set value cho foodPlace
        // Ngày sửa: 13/8/2022
        // Người sửa: NMDUC
        setInputValue(propName, value){
            this.foodPlace[propName] = value
            
        },  

        //Khi bấm đóng form
        // Ngày sửa: 13/8/2022
        // Người sửa: NMDUC
        onClickCloseForm(){
            this.$emit('setIsFormFoodDetail', "FoodPlaceName", false)
        },

        //Khi bấm cất, thực hiện validate và thêm mới
        // Ngày sửa: 13/8/2022
        // Người sửa: NMDUC
        async onSubmitClick(){
            this.validateForm()
            if (Object.keys(this.errMsg).length > 0) {
                this.focusInput(Object.keys(this.errMsg)[0])
                return
            }

            //nếu trùng mở cảnh báo trùng, set title và error
            if(this.checkDuplicate() === false){
                this.isAlertOpened = true
                this.warningErrorMsg = ErrMsgs.errMsg_FoodPlaceName_Duplicate
                this.errMsg.FoodPlaceName = ErrMsgs.errMsg_FoodPlaceName_Duplicate
                this.isError.FoodPlaceName = true
                return
            }
            //nếu dữ liệu hợp lệ để thêm
            try{
                this.$emit('setIsLoading', true)
                var res = await axios.post(`${API_HEADER.Api_header}FoodPlaces`, this.foodPlace)
                if(res.status === 201){
                    this.$emit('showSuccessModal')
                }
                
            }
            catch(err){
                this.$emit('showErrorModal', err)
            }
            //sau khi thêm mới thì gọi lại api của trường nhóm thứ ăn
            //đóng form và gửi value lên component cha để set luôn cho input value vừa thêm
            finally{
                this.$emit('callAPIDetail')
                this.$emit('setIsFormFoodDetail', "FoodPlaceName", false)
                this.$emit('setInputValue', 'FoodPlaceName', this.foodPlace.FoodPlaceName)
                this.$emit('setIsLoading', false)
            }
            
        },

        //check trùng tên nhóm thức ăn dựa vào danh sách gửi từ cha
        // Ngày sửa: 13/8/2022
        // Người sửa: NMDUC
        checkDuplicate(){
            if(this.foodPlaceNameList.includes(this.foodPlace.FoodPlaceName)){
                this.duplicateId = this.foodPlace.FoodPlaceName
                return false
            }
            else{
                return true
            }
        },

        //Khi bấm hủy, đóng form
        // Ngày sửa: 13/8/2022
        // Người sửa: NMDUC
        onCancelClick(){
            this.$emit('setIsFormFoodDetail', "FoodPlaceName", false)
        },

        //validate trống
        // Ngày sửa: 13/8/2022
        // Người sửa: NMDUC
        validateForm(){
            const error = {};
            if(!this.foodPlace.FoodPlaceName){
                error.FoodPlaceName = ErrMsgs.errMsg_FoodPlaceName_Null
                this.isError.FoodPlaceName = true
            }
            else{
                this.isError.FoodPlaceName = false
            }
            this.errMsg = error
        },

        //Focus vào 1 input cụ thể 
        //param: ref của input muốn focus
        //CreatedBy: NMDUC
        //CreatedDate: 17/8/2022
        focusInput(propName){
            this.checkFocus[propName] = !this.checkFocus[propName]
        },

        //đóng modal cảnh báo
        // Ngày sửa: 9/8/2022
        // Người sửa: NMDUC
        closeAlert(){
            this.isAlertOpened = false
        }
    },

    data(){
        return{
            isError: {},
            foodPlace: {},
            errMsg: {},
            checkFocus: {},
            isAlertOpened: false,
            duplicateId: "",
            warningErrorMsg: ""
        }
    },

    props:{
        foodPlaceNameList: Array
    }
}
</script>

<style scoped>
    .form{
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

    .content{
        padding: 10px 8px;
        background: #fff;
    }
</style>