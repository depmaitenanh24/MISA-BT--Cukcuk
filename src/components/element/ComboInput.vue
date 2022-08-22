<template>
<div class="combo-container" :class="{'description-input' : isDescriptionInput}">
    <div class="input-section" :class="{'price-input' : isPriceInput, 'description-input' : isDescriptionInput}">
        <div class="label-section">
            <label>{{labelName}}<span v-if="isMandaInput">(*)</span></label>
        </div>
        <div class="input-container" v-click-outside="(e) => onFocusOutInput(e)">
            <div class="icon-container add-container" v-if="isDropdownInput" @click="this.$emit('setFormState', propName, true)">
                <div class="add-icon tool-icon"></div>
            </div>
            <div class="icon-container dropdown-container" v-if="isDropdownInput" @click="toggleCombobox()">
                <div class="dropdown-icon tool-icon"></div>
            </div>
            <input v-if="!isDescriptionInput"
            :class="{'error' : isError}"
            :value="myValue"
            @focusin="this.isFocusingInput = true"
            @input="(e) => onTypingInput(e)"
            ref="input"/>
            <textarea v-if="isDescriptionInput"
            :class="{'error' : isError}"
            :value="myValue"
            @input="(e) => onTypingInput(e)"
            ref="input">
            </textarea>
            <base-combobox 
            v-if="isCombobox"
            :isDropdownForm="true"
            :inputValue="myValue"
            :options="options"
            v-click-outside="(e) => onCLickOutsideCombobox(e)"
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
            this.$refs.input.focus()
        },

        inputValue: function(){
            this.myValue = this.inputValue
        }
    },

    components:{
        BaseCombobox
    },

    methods: {
        onTypingInput(e){
            this.$emit('setInputValue', this.propName, e.target.value)
        },

        onFocusOutInput(e){
            console.log(e);
            if(this.isFocusingInput === true){
                if(this.isMandaInput === true && !this.myValue){
                    this.$emit('validateMandaInput', this.propName, true)
                }
                else if(this.propName === "FoodName"){
                    this.$emit('generateNewCode', this.myValue)
                    this.$emit('validateMandaInput', this.propName, false)
                }
                else{
                    this.$emit('validateMandaInput', this.propName, false)
                }
                this.isFocusingInput = false
            }
            
        },

        setInputValue(value){
            this.myValue = value
            this.$emit('setInputValue', this.propName, value)
        },

        toggleCombobox(){
            this.isClickDropdownIcon = true
            this.isCombobox = !this.isCombobox
        },

        onCLickOutsideCombobox(e){
            console.log(e);
            if (this.isClickDropdownIcon === false) {
                this.isCombobox = false
            }
            else{
                this.isClickDropdownIcon = false
            }
        },

    },

    data(){
        return{
            myValue: "",
            isCombobox: false,
            isClickDropdownIcon: false,
            isFocusingInput: false
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
        checkFocus: Boolean
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