<template>
  <div class="body">
    <nav-bar></nav-bar>
    <div class="d-right-container">
      <the-header/>
      <the-content/>
    </div>
  </div>
</template>

<script>
import NavBar from "../components/layout/NavBar.vue";
import TheHeader from "../components/layout/TheHeader.vue";
import TheContent from "../components/layout/TheContent.vue";
export default {
    components: {
        NavBar,
        TheHeader,
        TheContent
    }
}
</script>
<style scoped>
  @import url(../css/general.css);
  .body{
    width: 100%;
    height: 100vh;
    display: flex;
    user-select: none;
  }

  .d-right-container{
    width: calc(100% - 200px);
    height: 100%;
    min-width: 700px;
  }


</style>