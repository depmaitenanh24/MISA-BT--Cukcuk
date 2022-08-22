<template>
  <div class="d-nav-bar">
    <div class="d-title">
        <div class="d-dropdown-title">
            <div class="dropdown-title-icon"></div>
        </div>
        <div class="d-title-text">
            <div class="title-icon"></div>
        </div>
    </div>
    <ul>
        <li class="menu">
            <div class="list-icon menu"></div>
            <p>Thực đơn</p>
        </li>
    </ul>
  </div>
</template>

<script>
export default {

}
</script>

<style scoped>
    .d-nav-bar{
        height: 100vh;
        min-width: 230px;
        background: #0973b9;
    }

    .d-title {
    width: 100%;
    height: 51px;
    display: flex;
    padding: 12px 16px;
    align-items: center;
    }

    .d-dropdown-title{
        margin-right: 10px;
    }

    .dropdown-title-icon {
        background: url('../../assets/img/icon-left-header.png') no-repeat -1px -2px;
        width: 20px;
        height: 17px;
    }

    .title-icon{
        background: url('../../assets/img/logo-text.png') no-repeat 0 0;
        width: 116px;
        height: 21px;
    }

    li{
        display: flex;
        height: 43px;
        justify-content: flex-start;
        align-items: center;
        font-size: 13px;
        cursor: pointer;
        padding: 12px 16px;
        color: #fff;
    }

    li:hover{
        background: #0199fc;
    }

    .list-icon{
        margin-right: 10px;
    }

    .list-icon.menu{
        background: url('../../assets/img/Sprites.64af8f61.svg') no-repeat -254px -1589px;
        width: 14px;
        height: 17px;
    }

</style>