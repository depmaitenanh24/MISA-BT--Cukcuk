<template>
    <ul :class="{'dropdown-form' : isDropdownForm}">
        <li v-for="(option,index) in this.options" :key="index" v-show="isAutocomplete[index]" 
        :class="{'chose': isComboboxSelected[index], 'dropdown-form' : isDropdownForm}" 
        @click="selectCombobox(option, index)">
            {{option}}
        </li>
    </ul>
</template>
<script>
export default {
  created(){
    if(this.isDropdownForm === false){
      this.isAutocomplete = Array(3).fill(true)
    }
  },

  watch:{
    //Khi input bị thay đổi, autocomplete cho input
    inputValue:function(){
      if(this.isDropdownForm === true){
        for (let i = 0; i < this.options.length; i++) {
          //nếu inputValue === option thì hiển thị chọn cho option
          if(this.inputValue === this.options[i]){
            this.isComboboxSelected[i] = true
            break;
          }
        }
        for (let i = 0; i < this.options.length; i++){
          //Nếu option bắt đầu bằng input, hiển thị ra, nếu không ẩn đi
          if(this.options[i].startsWith(this.inputValue)){
            this.isAutocomplete[i] = true
          }
          else{
            this.isAutocomplete[i] = false
          }
        }
        //Nếu không có option nào được hiển thị thì hiển thị tất cả
        if(this.isAutocomplete.filter((value) => value === true).length <= 1){
          this.isAutocomplete = Array(this.options.length).fill(true)
        }
      }
    },

      options: {
        handler: function(){
          for (let i = 0; i < this.options.length; i++){
            this.isAutocomplete[i] = true
          }
        },
        deep: true
      }
    },

    props:{
        options: Array,
        inputValue: {
            type: String,
            default: ""},
        isDropdownForm: Boolean,
        isTableDropdown: Boolean
    },

    methods:{
        //Chọn option
        // Ngày sửa: 1/8/2022
        // Người sửa: NMDUC
        selectCombobox(option,index){
          this.$emit(`toggleCombobox`)
          if(this,this.isDropdownForm === true){
            this.$emit('changeForm')
          }
          this.$emit(`setInputValue`,option)
          for(let i = 0; i < this.options.length; i++){
              this.isComboboxSelected[i] = false
          }
          this.isComboboxSelected[index] = true
        }
    },

    data(){
        return{
            isComboboxSelected: [],
            isAutocomplete: []
        }
    },
}
</script>

<style scoped>
  ul {
      position: absolute;
      max-height: 300px;
      overflow: auto;
      width: 100%;
      top: 30px;
      z-index: 1;
      transition: 0.25s ease;
      font-size: 11px;
      animation: dropdown 0.25s ease;
      border: 1px solid black;
      box-shadow: 0px 0px 3px rgba(0, 0, 0, 0.2);
  }

  ul.dropdown-form{
    top: 22px;
    border: none;
  }

  ul li {
    display: block;
    width: 100%;
    height: 20px;
    list-style: none;
    background: #fff;
    display: flex;
    align-items: center;
    padding: 0px 10px;
    cursor: pointer;
    user-select: none;
  }

  ul li.dropdown-form{
    height: 30px;
    font-size: 13px;
  }

  ul li div {
    margin-right: 16px;
    background: url('../../assets/img/Sprites.64af8f61.svg') no-repeat -1273px -363px;
    width: 14px;
    height: 11px;
  }

  ul li:hover {
    background: #d6e8f6;
  }

  ul li.chose {
    background: #c1ddf1!important;
    cursor: auto!important;
  }
</style>