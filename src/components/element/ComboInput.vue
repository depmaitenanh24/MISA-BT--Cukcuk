<template>
<div class="combo-container" :class="{'description-input' : isDescriptionInput}">
    <div class="input-section" :class="{'price-input' : isPriceInput, 'description-input' : isDescriptionInput}">
        <div class="label-section">
            <label>{{labelName}}<span v-if="isMandaInput">(*)</span></label>
        </div>
        <div class="input-container">
            <div class="icon-container add-container" v-if="isDropdownInput" @click="this.$emit('setFormState', propName, true)">
                <div class="add-icon tool-icon"></div>
            </div>
            <div class="icon-container dropdown-container" v-if="isDropdownInput" @click="toggleCombobox()">
                <div class="dropdown-icon tool-icon"></div>
            </div>
            <input v-if="!isDescriptionInput"
            :class="{'error' : isError, 'number-input' : isNumberInput}"
            :value="myValue"
            @focusout="onFocusOutInput()"
            @input="(e) => onTypingInput(e)"
            ref="input"/>
            <textarea v-if="isDescriptionInput"
            :class="{'error' : isError}"
            :value="myValue"
            @focusin="onFocusingInput"
            @focusout="onFocusOutInput()"
            @input="(e) => onTypingInput(e)"
            ref="input">
            </textarea>
            <base-combobox 
            v-if="isDropdownInput"
            v-show="isCombobox"
            :isDropdownForm="true"
            :inputValue="myValue"
            :options="options"
            v-click-outside="(e) => onCLickOutsideCombobox(e)"
            @changeForm="changeForm"
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

        //Khi g?? v??o ?? input th?? g???i data v??? component cha: FoodDetails
        //CreatedDate: 23/8/2022
        //CreatedBy: NMDUC
        onTypingInput(e){
            this.myValue = e.target.value
            if(this.isNumberInput){
                this.myValue = this.validateMoney(this.myValue)
            }
            this.openCombobox()
            this.$emit('changeForm')
            this.$emit('setInputValue', this.propName, this.myValue)
        },

        //Khi focus ra kh???i ?? input th?? validate n???u ????y l?? input b???t bu???c, sinh m?? m???i n???u ????y l?? input t??n m??n
        //CreatedDate: 23/8/2022
        //CreatedBy: NMDUC
        onFocusOutInput(){
            if(this.myValue && this.isString === true){
                this.myValue = this.myValue.trim()
                this.$emit('setInputValue', this.propName, this.myValue)
            }
            if((this.isMandaInput === true && (!this.myValue || this.myValue === ""))){
                this.$emit('validateMandaInput', this.propName, true, 'Null')
            }
            else{
                this.$emit('validateMandaInput', this.propName, false, ' ')
            }
            if(this.propName === "FoodName" && (this.myValue || this.myValue !== "")){
                this.$emit('generateNewCode', this.myValue)
            }
            this.isFocusingInput = false
            
        },

        //H??m ?????t value cho input c???a component n??y g???i v??o component con: base-combobox 
        //CreatedDate: 23/8/2022
        //CreatedBy: NMDUC
        setInputValue(value){
            this.myValue = value
            this.$emit('setInputValue', this.propName, value)
            this.$emit('setErrorInput', this.propName, false)
        },

        //????ng/m??? combobox, ?????t bi???n ph??? = true n???u ??ang click v??o dropdown-icon
        //CreatedDate: 23/8/2022
        //CreatedBy: NMDUC
        toggleCombobox(){
            this.isClickDropdownIcon = true
            this.isCombobox = !this.isCombobox
        },
        
        //m??? combobox, ?????t bi???n ph??? = true 
        //CreatedDate: 23/8/2022
        //CreatedBy: NMDUC
        openCombobox(){
            this.isClickDropdownIcon = true
            this.isCombobox = true
        },

        //Click ra ngo??i combobox, check bi???n ph??? isClickDropdownIcon
        //n???u bi???n ph??? = true t???c l?? ??ang click v??o dropdown icon, v???y th?? kh??ng ????ng combobox v?? set l???i bi???n ph??? = false
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

        //thay ?????i form set isFormchange = true
        //CreatedBy: NMDUC
        //CreatedDate: 21/8/2022
        changeForm(){
            this.$emit('changeForm')
        },

        //h??m validate ti???n
        // Ng??y s???a: 13/7/2022
        // Ng?????i s???a: NMDUC
        validateMoney(money){
            if(!money && money !== 0){
                return
            }
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

    input.number-input{
        text-align: right;
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
        top: 0;
        width: 20px;
        height: 100%;
        display: flex;
        align-items: center;
        justify-content: center;
    }

    .icon-container.dropdown-container:hover{
        background: #c9c9c9;
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