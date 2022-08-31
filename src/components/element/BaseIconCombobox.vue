<template>
    <ul>
        <li v-for="(option,index) in this.options" :key="index"  
        :class="{'chose': isComboboxSelected[index]}" 
        @click="selectCombobox(option, index)">
            <span>{{option.symbol}}</span>{{option.value}}
        </li>
    </ul>
</template>
<script>
export default {
    created(){
      for (let i = 0; i < this.options.length; i++) {
        if(this.inputValue === this.options[i]){
          this.isComboboxSelected[i] = true
          break;
        }
      }
    },

    watch:{
      inputValue:function(){
          for (let i = 0; i < this.options.length; i++) {
            if(this.inputValue === this.options[i]){
              this.isComboboxSelected[i] = true
              break;
            }
          }
        },
    },

    props:{
        options: Array,
        inputValue: {
            type: String,
            default: ""},
    },

    methods:{
        //Chọn option
        // Ngày sửa: 1/8/2022
        // Người sửa: NMDUC
        selectCombobox(option,index){
          this.$emit(`toggleCombobox`)
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
      top: 23px;
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

  span{
    width: 10px;
    margin-right: 8px;
  }
</style>