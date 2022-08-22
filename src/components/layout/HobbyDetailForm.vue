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
                    :labelName = "'Tên sở thích phục vụ'"
                    :propName="'FoodHobbyName'"
                    :isMandaInput = "true"
                    :inputValue = "foodHobby.FoodHobbyName"
                    :isError = "isError.FoodHobbyName"
                    :checkFocus = "checkFocus.FoodHobbyName"
                    :title="errMsg.FoodHobbyName"
                    @setInputValue="setInputValue"
                    ></combo-input>
                <combo-input
                    :labelName = "'Thu thêm'"
                    :propName="'FoodHobbyFee'"
                    :isDescriptionInput = "true"
                    :inputValue = "foodHobby.FoodHobbyFee"
                    :checkFocus = "checkFocus.FoodHobbyFee"
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
            this.foodHobby[propName] = value
            
        },

        onClickCloseForm(){
            this.$emit('setIsFormFoodDetail', "FoodHobby", false)
        },

        async onSubmitClick(){
            this.validateForm()
            if (Object.keys(this.errMsg).length > 0) {
                this.focusInput(Object.keys(this.errMsg)[0])
                return
            }

            if(this.checkDuplicate() === false){
                this.isAlertOpened = true
                this.errMsg.FoodHobbyName = ErrMsgs.errMsg_FoodHobbyName_Duplicate
                this.isError.FoodHobbyName = true
                return
            }
            try{
                var res = await axios.post('http://localhost:5011/api/v1/FoodHobbys', this.foodHobby)
                if(res.status === 201){
                    console.log('success');
                }
                
            }
            catch(err){
                console.log(err);
            }
            finally{
                this.$emit('callAPIDetail')
                this.$emit('setIsFormFoodDetail', "FoodHobby", false)
                this.$emit('setInputValue', this.indexSelected, this.foodHobby)
            }
            
        },

        checkDuplicate(){
            this.foodHobbyList.forEach(hobby => {
                if(this.foodHobby.FoodHobbyName === hobby.FoodHobbyName && this.foodHobby.FoodHobbyFee === hobby.FoodHobbyFee){
                    return false
                }
            })
            return true
        },

        onCancelClick(){
            this.$emit('setIsFormFoodDetail', "FoodHobby", false)
        },

        validateForm(){
            const error = {};
            if(!this.foodHobby.FoodHobbyName){
                error.FoodHobbyName = ErrMsgs.errMsg_FoodHobbyName_Null
                this.isError.FoodHobbyName = true
            }
            else{
                this.isError.FoodHobbyName = false
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
            foodHobby: {FoodHobbyFee: 0},
            errMsg: {},
            checkFocus: {},
            isAlertOpened: false,
            duplicateId: "",
        }
    },

    props:{
        foodHobbyList: Array,
        indexSelected: Number
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