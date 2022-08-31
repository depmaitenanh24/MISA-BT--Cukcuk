<template>
    <div class="input-section">
        <div class="icon-container" v-if="icon == 'describe-icon'" @click="toggleComboboxInput()">
            <p>{{symbol}}</p>
        </div>
        <input 
        v-model="myValue.value"
        :class="icon"
        @keydown.prevent.enter="onKeydownEnter()"
        @input="ontypingInput()"/>
        <base-icon-combobox
        v-if="isComboboxInput"
        v-show="isCombobox"
        v-click-outside="(e) => onClickOutsideCombobox(e)"
        :options="inputType === 0 ? optionsText : optionsNumber"
        @toggleCombobox="toggleComboboxInput"
        @setInputValue="setInputValue"/>
        <div class="dropdown-container" v-if="icon == 'dropdown-icon'" @click="toggleComboboxInput()">
            <div class="dropdown-icon"></div>
        </div>
    </div>
</template>

<script>
import BaseIconCombobox from "./BaseIconCombobox.vue";
import filterType from "../../js/Enum/filterType";
export default {
    components:{
        BaseIconCombobox
    },

    created(){
        this.myValue.inputType = this.inputType
        this.myValue.colName = this.propName
        if(this.inputType === 0){
            this.symbol = "*"
            this.myValue.filterType = filterType.Contain
        }
        else if(this.inputType === 1){
            this.symbol = "="
            this.myValue.filterType = filterType.EqualTo
        }
        
    },

    methods: {
        //Khi bấm ra ngoài combobox, nếu trước đó combobox đã thả xuống thì ẩn combobox
        //CreatedDate: 23/8/2022
        //CreatedBy: NMDUC
        onClickOutsideCombobox(e){
            console.log(e);
            if(this.isClickDropdownIcon === false){
                this.isCombobox = false
            }
            else{
                this.isClickDropdownIcon = false
            }
        },

        ontypingInput(){
            if(this.inputType === 1){
                this.myValue.value = this.validateMoney(this.myValue.value)
            }
            this.$emit('setIsFilterChange', true, this.myValue)
        },

        //Bắt sự kiện enter tại input để component cha xử lý
        //CreatedDate: 23/8/2022
        //CreatedBy: NMDUC
        onKeydownEnter(){
            if(this.inputType === 1){
                this.myValue.value = this.myValue.value.toString().replaceAll('.', '')
                // this.myValue.value = Number.parseInt(this.myValue.value)
                console.log(this.myValue.value);
            }
            this.$emit('callFilterApi')
        },

        //Hàm setValue cho input và icon bên cạnh gửi vào component combobox
        //CreatedDate: 26/8/2022
        //CreatedBy: NMDUC
        setInputValue(option){
            this.symbol = option.symbol
            this.myValue.filterType = option.enum
            this.$emit('setIsFilterChange', true, this.myValue)
            this.$emit('callFilterApi', this.myValue)
        },

        //Ẩn/hiện combobox
        //CreatedDate: 26/8/2022
        //CreatedBy: NMDUC
        toggleComboboxInput(){
            this.isCombobox = !this.isCombobox
            this.isClickDropdownIcon = true
        },

        //hàm validate tiền
        // Ngày sửa: 26/8/2022
        // Người sửa: NMDUC
        validateMoney(money){
            if(!money && money != 0){
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

    props: {
        icon: String,
        propName: String,
        isComboboxInput: Boolean,
        inputType: Number
    },

    data(){
        return{
            optionsText: [
                {value: 'Chứa', symbol: '*', enum: filterType.Contain},
                {value: 'Bằng', symbol: '=', enum: filterType.Equal},
                {value: 'Bắt đầu bằng', symbol: '+', enum: filterType.StartWith},
                {value: 'Kết thúc bằng', symbol: '-', enum: filterType.EndWith},
                {value: 'Không chứa', symbol: '!', enum: filterType.NotContain},
            ],
            optionsNumber: [
                {value: 'Bằng', symbol: '=', enum: filterType.EqualTo},
                {value: 'Lớn hơn', symbol: '>', enum: filterType.Greater},
                {value: 'Lơn hơn hoặc bằng', symbol: '>=', enum: filterType.GreaterOrEqual},
                {value: 'Nhỏ hơn', symbol: '<', enum: filterType.Less},
                {value: 'Nhỏ hơn hoặc bằng', symbol: '<=', enum: filterType.LessOrEqual},
            ],
            isCombobox: false,
            myValue: {},
            symbol: "",
            isClickDropdownIcon: false
        }
    },
}
</script>

<style scoped>
    .input-section{
        position: relative;
        height: 22px;
        width: 100%;
    }

    input{
        height: 100%;
        width: 100%;
        outline: none;
        border: 1px solid #ccc;
    }

    input.describe-icon{
        padding: 0 5px 0 25px;
    }

    input.dropdown-icon{
        padding: 0 25px 0 5px;
    }

    .input-section .icon-container{
        height: 100%;
        width: 22px;
        position: absolute;
        left: 0;
        top: 0;
        display: flex;
        align-items: center;
        justify-content: center;
        border-right: 2px solid #ccc;
        cursor: pointer;
    }

    .dropdown-container{
        height: 100%;
        width: 22px;
        position: absolute;
        right: 0;
        top: 0;
        display: flex;
        align-items: center;
        justify-content: center;
        border-left: 2px solid #ccc;
        cursor: pointer;
    }

    .dropdown-container .dropdown-icon{
        background: url('../../assets/img/IconSprites/trigger.png') no-repeat -51px -9px;
        width: 8px;
        height: 4px;
    }
</style>