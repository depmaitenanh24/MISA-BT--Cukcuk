<template>
  <div class="d-header">
    <div class="d-header-left">
      <input v-model="companyInputValue"/>
      <base-combobox
      v-show="isCompanyCombobox"
      name="Company"
      :options="companyOptions"
      :inputValue="companyInputValue"
      @toggleCombobox = "toggleCompanyCombobox"
      @setInputValue = "setCompanyInputValue"
      />
      <div class="dropdown" @click="toggleCompanyCombobox()">
        <div class="dropdown-icon" :class="{'rotate' : isCompanyCombobox}"></div>
      </div>
      <div class="filter">
        <div class="filter-icon"></div>
      </div>
    </div>
    <div class="d-header-right">
      <div class="input-section">
        <input v-model="languageInputValue"/>
        <base-combobox
        v-show="isLanguageCombobox"
        name="Language"
        :options="languageOptions"
        :inputValue="languageInputValue"
        @setInputValue = "setLanguageInputValue"
        @toggleCombobox = "toggleLanguageCombobox"
        />
        <div class="dropdown" @click="toggleLanguageCombobox">
          <div class="dropdown-icon" :class="{'rotate' : isLanguageCombobox}"></div>
        </div>
      </div>
      <div class="global">
        <img src="../../assets/img/icon-globe.png" alt="globe-img">
      </div>
      <div class="phone">
        <img class="phone-icon" src="../../assets/img/ic_support.svg">
      </div>
      <div class="account-section">
        <div class="avatar">
          <div class="avatar-icon"></div>
        </div>
        <p class="user-name">Đức</p>
        <div class="dropdown">
          <div class="dropdown-icon"></div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import BaseCombobox from "../element/BaseCombobox.vue";
export default {
  components: {
    BaseCombobox,
  },

  data() {
    return {
      companyOptions:["Công ty MISA", "Công ty TNHH", "Nguyễn Minh Đức"],
      companyInputValue: "Công ty MISA",
      languageOptions:["Tiếng Việt", "English", "Nguyễn Minh Đức"],
      languageInputValue: "Tiếng Việt",
      isCompanyCombobox: false,
      isLanguageCombobox: false,
    }
  },

  methods: {
    //Mở combobox công ty
    // Ngày sửa: 1/8/2022
    // Người sửa: NMDUC
    toggleCompanyCombobox(){
      this.isCompanyCombobox = !this.isCompanyCombobox
    },

    //Set giá trị cho combobox công ty
    // Ngày sửa: 1/8/2022
    // Người sửa: NMDUC
    setCompanyInputValue(value){
      this.companyInputValue = value
    },

    //Mở combobox ngôn ngữ
    // Ngày sửa: 1/8/2022
    // Người sửa: NMDUC
    toggleLanguageCombobox(){
      this.isLanguageCombobox = !this.isLanguageCombobox
    },

    //Set giá trị cho combobox ngôn ngữ
    // Ngày sửa: 1/8/2022
    // Người sửa: NMDUC
    setLanguageInputValue(value){
      this.languageInputValue = value
    }
  },
}
</script>

<style scoped>
  .d-header{
    height: 55px;
    width: 100%;
    background: #0973b9;
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 0px 10px;
    user-select: none;
  }

  .d-header input{
    background: #005082;
    border: none;
    outline: none;
    height: 30px;
    color: #fff;
    font-size: 11px;
  }

  .d-header-left{
    position: relative;
  }

  .d-header-left input{
    min-width: 200px;
    padding: 5px 45px 5px 10px;
  }

  .d-header-left .filter{
    position: absolute;
    right: 0;
    top: 0;
    z-index: 1;
    cursor: pointer;
    height: 100%;
    padding: 0 6px;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .d-header .dropdown{
    position: absolute;
    right: 25px;
    top: 0;
    cursor: pointer;
    height: 100%;
    padding: 0 6px;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .d-header .dropdown:hover{
    background: #003f68;
  }

  .d-header-left .filter:hover{
    background: #003f68;
  }

  .d-header-left .filter-icon{
    background: url('../../assets/img/filter-icon.png') no-repeat -5px -6px;
    width: 14px;
    height: 13px;
  }

  .d-header .dropdown-icon{
    background: url('../../assets/img/trigger.png') no-repeat -95px -9px;
    width: 8px;
    height: 4px;
  }

  .d-header-right{
    display: flex;
    align-items: center;
    justify-content: center;
    height: 100%;
  }

  .d-header-right .input-section{
    position: relative;
  }

  .d-header-right input{
    width: 165px;
    min-width: 165px;
    padding: 5px 45px 5px 10px;
  }

  .d-header-right .dropdown{
    right: 0px;
  }

  .d-header-right .global{
    width: 55px;
    height: 100%;
    padding: 13.5px;
    margin-left: 15px;
  }

  .d-header-right img{
    width: 100%;
    height: 100%;
    object-fit: cover;
  }

  .phone{
    height: 100%;
    width: 58px;
  }

    .account-section{
    position: relative;
    display: flex;
    align-items: center;
    justify-content: center;
    margin-left: 50px;
    font-size: 11px;
    color: #fff;
  }


  .avatar{
    width: 30px;
    height: 30px;
    background: #eee;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    padding-right: 2px;
    margin-right: 5px;
  }

  .avatar-icon{
    background: url('../../assets/img/EmployeeImage.png') no-repeat 0 -3px;
    width: 22px;
    height: 20px;
  }

  .user-name{
    margin-right: 100px;
  }
</style>