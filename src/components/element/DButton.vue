<template>
  <button :class="{'small' : isSmall}" @click="(e) => {e.preventDefault()}">
    <slot name="icon"></slot>
    {{$attrs.btnText}}
  </button>
</template>

<script>
export default {
  props: {
    isSmall: Boolean
  }
}
</script>

<style scoped>
    button{
        background: #fafafa;
        border: 1px solid #ccc;
        height: 25px;
        padding: 0 20px;
        display: flex;
        align-items: center;
        cursor: pointer;
        user-select: none;
        outline: none;
        font-family: Tahoma;
        font-size: 12px;
        text-transform: none;
    }

    .small{
      padding: 0 15px
    }

    button:hover{
        background: #e4f2ea;
        border-color: #0072bc;
    }

    button:disabled{
        background: #fafafa;
        border-color: #ccc;
        opacity: 30%;
    }
</style>