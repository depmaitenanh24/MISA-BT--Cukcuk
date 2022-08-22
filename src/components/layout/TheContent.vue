<template>
  <div class="content">
    <div class="content-title">
      <p>Thực đơn</p>
    <d-button btnText = "Phản hồi" :isSmall = "true">
      <template #icon>
        <div class="btnIcon"></div>
      </template>
    </d-button>
    </div>
    <table-section>
      
    </table-section>
  </div>
</template>

<script>
import DButton from "../element/DButton.vue";
import TableSection from "../layout/TableSection.vue";
export default {
  components: {
    DButton,
    TableSection
}
}
</script>

<style scoped>

  .content{
    height: calc(100% - 55px);
    padding: 14px 8px;
  }

  .content-title{
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  .content-title p{
    margin-top: 5px;
    font-size: 22px;
    color: #000;
  }

  .content-title .btnIcon{
    background: url('../../assets/img/viewEmail.png') no-repeat 0 -2px;
    width: 16px;
    height: 13px;
    margin-right: 5px;
  }
</style>