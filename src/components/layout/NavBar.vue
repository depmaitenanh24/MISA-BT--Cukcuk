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
        <li class="menu selected">
            <div class="list-icon menu"></div>
            <p>Thực đơn</p>
        </li>
        <li class="menu">
            <div class="list-icon report"></div>
            <p>Báo cáo</p>
        </li>
        <li class="menu">
            <div class="list-icon purchase"></div>
            <p>Mua hàng</p>
        </li>
        <li class="menu">
            <div class="list-icon inventory"></div>
            <p>Kho</p>
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
        height: 100%;
        min-width: 230px;
        background: #0973b9;
    }

    .d-title {
    width: 100%;
    height: 55px;
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
        height: 40px;
        justify-content: flex-start;
        align-items: center;
        font-size: 13px;
        cursor: pointer;
        padding: 12px 16px;
        color: #fff;
    }

    li:hover{
        background: #eb7728;
    }

    li.selected{
        background: #0199fc;
    }

    .list-icon{
        margin-right: 10px;
    }

    .list-icon.menu{
        background: url('../../assets/img/vector-smart-object.png') no-repeat 0 0;
        width: 24px;
        height: 24px;
    }

    .list-icon.report{
        background: url('../../assets/img/iconMenu.png') no-repeat no-repeat -3px -194px;
        width: 24px;
        height: 19px;
    }

    .list-icon.purchase{
        background: url('../../assets/img/iconMenu.png') no-repeat -1px -377px;
        width: 24px;
        height: 19px;
    }

    .list-icon.inventory{
        background: url('../../assets/img/iconMenu.png') no-repeat -4px -40px;
        width: 24px;
        height: 20px;
    }

</style>