<template>
  <button>
    <slot name="icon"></slot>
    {{$attrs.btnText}}
  </button>
</template>

<script>
export default {

}
</script>

<style scoped>
    button{
        border: 1px solid transparent;
        border-radius: 2px;
        height: 22px;
        padding: 2px 4px;
        display: flex;
        align-items: center;
        cursor: pointer;
        user-select: none;
        outline: none;
        font-family: Tahoma;
        font-size: 12px;
        text-transform: none;
        background: transparent;
    }

    button:hover{
        background: #fff;
        border-color: #0072bc;
    }

    button:active{
        background: #ccc;
    }

    button:disabled{
        background: #fafafa;
        border-color: #ccc;
        opacity: 30%;
    }

</style>