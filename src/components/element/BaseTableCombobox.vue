<template>
    <ul :class="{'dropdown-form' : isDropdownForm}" :style="{top: rectCalculate.y + 'px', left: rectCalculate.x + 'px'}">
        <li class="header">
            <div class="header header-name">Sở thích</div>
            <div class="header header-fee">Thu thêm</div>
        </li>
        <li v-for="(option,index) in this.optionFilter" 
        :key="index" 
        :class="{'chose': isComboboxSelected[index]}" 
        @click="(e) => selectCombobox(e, option, index)">
            <div class="content hobby-name">{{option.FoodHobbyName}}</div>
            <div class="content hobby-fee">{{option.FoodHobbyFee}}</div>
        </li>
    </ul>
</template>
<script>
export default {
  //Khi inputValue thay đổi thì lọc dữ iệu
    computed:{
      optionFilter(){
        if(this.inputValue && this.inputValue.FoodHobbyName){
          var filterOptions = this.options.filter((x)=>x.FoodHobbyName.startsWith(this.inputValue.FoodHobbyName));
          if(filterOptions.length > 0){
            return filterOptions
          }
          else{
            return this.options
          }
        }else{
          return this.options;
        }
      }
    },  

    props:{
        options: Array,
        inputValue: Object,
        indexSelected: Number,
        isShow: Boolean,
        rectCalculate: Object
    },

    methods:{
        //Chọn option
        // Ngày sửa: 1/8/2022
        // Người sửa: NMDUC
        selectCombobox(e, option,index){
            this.$emit('toggleCombobox',e, this.indexSelected)
            this.$emit(`setInputValue`, 'FoodHobbyName', this.indexSelected, option)
            for(let i = 0; i < this.options.length; i++){
              this.isComboboxSelected[i] = false
            }
            this.isComboboxSelected[index] = true
        },
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
      position: fixed;
      max-height: 150px;
      overflow: auto;
      width: 400px;
      top: 24px;
      z-index: 1;
      transition: 0.25s ease;
      font-size: 11px;
      animation: dropdown 0.25s ease;
      border: none;
      box-shadow: 0px 0px 3px rgba(0, 0, 0, 0.2);
  }

  ul li {
    display: block;
    width: 100%;
    height: 30px;
    font-size: 12px;
    list-style: none;
    background: #fff;
    display: flex;
    align-items: center;
    cursor: pointer;
    user-select: none;
  }

  ul li div{
    border-right: 1px solid #ccc;
    border-bottom: 1px solid #ccc;
    height: 100%;
    padding: 0 10px;
  }

  div.header{
    display: flex;
    align-items: center;
    justify-content: center;
    font-weight: bold;
    background: #eee;
    cursor: auto;
  }

  div.content{
    display: flex;
    align-items: center;
    justify-content: flex-start;
  }

  .header.header-name{
    width: 65%;
  }

  .header.header-fee{
    width: 35%;
  }

  .content.hobby-name{
    width: 65%;
  }

  .content.hobby-fee{
    width: 35%;
    justify-content: flex-end;
  }

  ul li:hover {
    background: #d6e8f6;
  }

  ul li.chose {
    background: #c1ddf1!important;
    cursor: auto!important;
  }
</style>