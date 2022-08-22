<template>
    <div class="input-section">
        <slot name="describe-icon"></slot>
        <input 
        :class="icon"
        @input="(e) => onTypingInput(e)"
        @keydown.prevent.enter="onKeydownEnter()"/>
        <slot name="dropdown-icon"></slot>
    </div>
</template>

<script>
export default {
    props: {
        icon: String
    },

    data(){
        return{
            inputType: this.icon,
        }
    },

    methods: {
        onTypingInput(e){
            console.log(e);
            this.$emit('setInputValue', e.target.value)
        },

        onKeydownEnter(){
            console.log('1');
            this.$emit('onEnterInput')
        }
    }
}
</script>

<style scoped>
    .input-section{
        position: relative;
        height: 22px;
        margin-top: 5px;
    }

    input{
        height: 100%;
        width: 100%;
        outline: none;
        border: 1px solid #ccc;
    }

    input.describe-icon{
        padding: 0 5px 0 25px;
    }

    input.dropdown-icon{
        padding: 0 25px 0 5px;
    }
</style>