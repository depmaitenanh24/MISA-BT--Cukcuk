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
                    :labelName = "'Tên nhóm thực đơn'"
                    :propName="'FoodUnitName'"
                    :isMandaInput = "true"
                    :inputValue = "foodUnit.FoodUnitName"
                    :isError = "isError.FoodUnitName"
                    :checkFocus = "checkFocus.FoodUnitName"
                    :title="errMsg.FoodUnitName"
                    @setInputValue="setInputValue"
                    ></combo-input>
                <combo-input
                    :labelName = "'Diễn giải'"
                    :propName="'Description'"
                    :isDescriptionInput = "true"
                    :inputValue = "foodUnit.Description"
                    :checkFocus = "checkFocus.Description"
                    @setInputValue="setInputValue"
                    ></combo-input>
            </div>
        </template>
    </base-form>
    <modal-alert
        v-if="isAlertOpened"
        :duplicateId="duplicateId"
        :modalType="'warning'">
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

    methods:{
        setInputValue(propName, value){
            this.foodUnit[propName] = value
            
        },

        onClickCloseForm(){
            this.$emit('setIsFormFoodDetail', "FoodUnitName", false)
        },

        async onSubmitClick(){
            this.validateForm()
            if (Object.keys(this.errMsg).length > 0) {
                this.focusInput(Object.keys(this.errMsg)[0])
                return
            }

            if(this.checkDuplicate() === false){
                this.isAlertOpened = true
                this.errMsg.FoodUnitName = ErrMsgs.errMsg_FoodUnitName_Duplicate
                this.isError.FoodUnitName = true
                return
            }
            try{
                var res = await axios.post('http://localhost:5011/api/v1/FoodUnits', this.foodUnit)
                if(res.status === 201){
                    console.log('success');
                }
                
            }
            catch(err){
                console.log(err);
            }
            finally{
                this.$emit('callAPIDetail')
                this.$emit('setIsFormFoodDetail', "FoodUnitName", false)
                this.$emit('setInputValue', 'FoodUnitName', this.foodGroup.FoodUnitName)
            }
            
        },

        checkDuplicate(){
            if(this.foodUnitNameList.includes(this.foodUnit.FoodUnitName)){
                this.duplicateId = this.foodUnit.FoodUnitName
                return false
            }
            else{
                return true
            }
        },

        onCancelClick(){
            this.$emit('setIsFormFoodDetail', "FoodUnitName", false)
        },

        validateForm(){
            const error = {};
            if(!this.foodUnit.FoodUnitName){
                error.FoodUnitName = ErrMsgs.errMsg_FoodUnitName_Null
                this.isError.FoodUnitName = true
            }
            else{
                this.isError.FoodUnitName = false
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

        closeAlert(){
            this.isAlertOpened = false
        }
    },

    data(){
        return{
            isError: {},
            foodUnit: {},
            errMsg: {},
            checkFocus: {},
            isAlertOpened: false,
            duplicateId: "",
        }
    },

    props:{
        foodUnitNameList: Array
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