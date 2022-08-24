<template>
<div class="combo-container" :class="{'description-input' : isDescriptionInput}">
    <div class="input-section" :class="{'price-input' : isPriceInput, 'description-input' : isDescriptionInput}">
        <div class="label-section">
            <label>{{labelName}}<span v-if="isMandaInput">(*)</span></label>
        </div>
        <div class="input-container" v-click-outside="onFocusOutInput">
            <div class="icon-container add-container" v-if="isDropdownInput" @click="this.$emit('setFormState', propName, true)">
                <div class="add-icon tool-icon"></div>
            </div>
            <div class="icon-container dropdown-container" v-if="isDropdownInput" @click="toggleCombobox()">
                <div class="dropdown-icon tool-icon"></div>
            </div>
            <input v-if="!isDescriptionInput"
            :class="{'error' : isError}"
            :value="myValue"
            @focusin="onFocusingInput"
            @input="(e) => onTypingInput(e)"
            ref="input"/>
            <textarea v-if="isDescriptionInput"
            :class="{'error' : isError}"
            :value="myValue"
            @focusin="onFocusingInput"
            @input="(e) => onTypingInput(e)"
            ref="input">
            </textarea>
            <base-combobox 
            v-if="isCombobox"
            :isDropdownForm="true"
            :inputValue="myValue"
            :options="options"
            v-click-outside="(e) => onCLickOutsideCombobox(e)"
            @changeForm="changeForm"
            @focusout="onFocusOutInput(e)"
            @setInputValue="setInputValue"
            @toggleCombobox="toggleCombobox"
            />
        </div>
    </div>
    <div v-if="isError" class="warning">
        <div class="warning-icon"></div>
    </div>
</div>
</template>

<script>
import BaseCombobox from "../element/BaseCombobox.vue";
export default {
    watch:{
        checkFocus: function(){
            this.$nextTick(() => {
                this.$refs.input.focus()
            })
        },

        inputValue: function(){
            this.myValue = this.inputValue
        }
    },

    components:{
        BaseCombobox
    },

    methods: {
        //Khi focus vào input đặt biến = true để bắt clickoutside thì phải focus trước
        //CreatedDate: 23/8/2022
        //CreatedBy: NMDUC
        onFocusingInput(){
            this.isFocusingInput = true
        },

        //Khi gõ vào ô input thì gửi data về component cha: FoodDetails
        //CreatedDate: 23/8/2022
        //CreatedBy: NMDUC
        onTypingInput(e){
            this.myValue = e.target.value
            if(this.isNumberInput){
                this.myValue = this.validateMoney(this.myValue)
            }
            this.$emit('changeForm')
            this.$emit('setInputValue', this.propName, this.myValue)
        },

        //Khi focus ra khỏi ô input thì validate nếu đây là input bắt buộc, sinh mã mới nếu đây là input tên món
        //CreatedDate: 23/8/2022
        //CreatedBy: NMDUC
        onFocusOutInput(){
            if(this.myValue && this.isString === true){
                this.myValue = this.myValue.trim()
                this.$emit('setInputValue', this.propName, this.myValue)
            }
            if(this.isFocusingInput === true){
                if((this.isMandaInput === true && (!this.myValue || this.myValue === ""))){
                    this.$emit('validateMandaInput', this.propName, true, 'Null')
                }
                else if(this.propName === "FoodName"){
                    this.$emit('generateNewCode', this.myValue)
                }
                else if(this.options && this.myValue && !this.options.includes(this.myValue)){
                    this.$emit('validateMandaInput', this.propName, true, 'Invalid')
                }
                else{
                    this.$emit('validateMandaInput', this.propName, false, '')
                }
                this.isFocusingInput = false
            }
            
        },

        //Hàm đặt value cho input của component này gửi vào component con: base-combobox 
        //CreatedDate: 23/8/2022
        //CreatedBy: NMDUC
        setInputValue(value){
            this.myValue = value
            this.$emit('setInputValue', this.propName, value)
        },

        //đóng/mở combobox, đặt biến phụ = true nếu đang click vào dropdown-icon
        //CreatedDate: 23/8/2022
        //CreatedBy: NMDUC
        toggleCombobox(){
            this.isClickDropdownIcon = true
            this.isCombobox = !this.isCombobox
        },

        //Click ra ngoài combobox, check biến phụ isClickDropdownIcon
        //nếu biến phụ = true tức là đang click vào dropdown icon, vậy thì không đóng combobox và set lại biến phụ = false
        //CreatedDate: 23/8/2022
        //CreatedBy: NMDUC
        onCLickOutsideCombobox(e){
            console.log(e);
            if (this.isClickDropdownIcon === false) {
                this.isCombobox = false
            }
            else{
                this.isClickDropdownIcon = false
            }
        },

        //thay đổi form set isFormchange = true
        //CreatedBy: NMDUC
        //CreatedDate: 21/8/2022
        changeForm(){
            this.$emit('changeForm')
        },

        //hàm validate tiền
        // Ngày sửa: 13/7/2022
        // Người sửa: NMDUC
        validateMoney(money){
            if (typeof money === 'number') {
                money = Math.round(money);
            }
            return money
                .toString()
                .replace(/\D/g, "")
                .replace(/\B(?=(\d{3})+(?!\d))/g, ".");
                }
        },

    data(){
        return{
            myValue: "",
            isCombobox: false,
            isClickDropdownIcon: false,
            isFocusingInput: false,
        }
    },

    props: {
        labelName: {
            type: String,
            require: true,
            default: "false"},
        propName: {
            type: String,
            require: true,},
        inputValue: {
            type: String,
            default: ""},
        isMandaInput: {
            type: Boolean,
            require: false,
            default: false},
        isDropdownInput: {
            type: Boolean,
            require: false,
            default: false},
        isError: {
            type: Boolean,
            require: false,
            default: false},
        isPriceInput: {
            type: Boolean,
            require: false,
            default: false},
        isDescriptionInput: {
            type: Boolean,
            require: false,
            default: false
        },
        options: Array,
        checkFocus: Boolean,
        isString: Boolean,
        isNumberInput: Boolean,
        listCheck: Array
    },
}
</script>

<style scoped>

    .combo-container{
        display: flex;
        align-items: center;
        margin-bottom: 5px;
        width: 100%;
        height: 22px;
        position: relative;
    }

    .input-section{
        width: 100%;
        height: 100%;
        position: relative;
        min-width: 270px;
        display: flex;
        align-items: center;
    }

    .label-section{
        width: 30%;
        min-width: 148px;
        height: 100%;
        display: flex;
        align-items: center;
    }

    .input-container{
        width: 70%;
        height: 100%;
        position: relative;
    }

    .price-input{
        width: 25%;
    }

    .input-section.description-input .label-section{
        align-items: flex-start;
    }

    .description-input{
        height: 66px;
    }

    input{
        width: 100%;
        height: 100%;
        outline: none;
        border: 1px solid #c1c1c1;
        padding: 0 5px;
        font-size: 12px;
    }

    .input-section.description-input textarea{
        resize: none;
        width: 100%;
        height: 100%;
        outline: none;
        border: 1px solid #c1c1c1;
        padding: 3px 5px;
        font-size: 12px;
    }

    input:focus{
        border: 1px solid #0973b9;
    }

    .input-section.description-input textarea:focus{
        border: 1px solid #0973b9;
    }

    .icon-container{
        position: absolute;
        top: calc(50% - 8px);
        width: 16px;
        height: 16px;
        display: flex;
        align-items: center;
        justify-content: center;
    }

    .icon-container.add-container{
        right: 5px;
        cursor: pointer;
    }

    .icon-container.dropdown-container{
        right: 29px;
        cursor: pointer;
    }

    .add-icon{
        background: url('../../assets/img/IconSprites/IconSprite.png') no-repeat 0 -48px;
        width: 15px;
        height: 15px;
    }

    .dropdown-icon{
        background: url('../../assets/img/IconSprites/trigger.png') no-repeat -73px -9px;
        width: 8px;
        height: 4px;
    }

    span{
        color: red;
        margin-left: 5px;
    }

    .warning{
        margin-left: 5px;
    }

    .warning .warning-icon{
        background: url(../../assets/img/exclamation.png) no-repeat 0 0;
        width: 16px;
        height: 16px;
    }

    .error{
        border: 1px solid #e04742;
    }
</style>