<template>
    <label class="checkbox-container">
        <input type="checkbox" name="checkbox">
        <span class="checkmark"></span>
    </label>
</template>

<script>
export default {

}
</script>

<style scoped>
.checkbox-container {
    position: relative;
    cursor: pointer;
    user-select: none;
    display: flex;
    align-items: center;
    justify-content: center;
    width: 15px;
    height: 15px;
}

.checkbox-container input {
    position: absolute;
    opacity: 0;
    cursor: pointer;
}

.checkmark {
    position: relative;
    height: 15px;
    width: 15px;
    background: #fff;
    border-radius: 3px;
    border: 2px solid #bbb;
}

.checkmark:hover {
    background: #bbb;
}

.checkmark:after {
    content: "";
    position: absolute;
    display: none;
}

.checkbox-container input:checked~.checkmark {
    border: 1px solid #ccc;
    background: #f9f9f9;
}

.checkbox-container input:checked~.checkmark:after {
    display: block;
}

.checkmark::after {
    left: 3.5px;
    top: -3px;
    width: 5px;
    height: 12px;
    border: solid #787878;
    border-width: 0 3px 3px 0;
    transform: rotate(45deg);
}
</style>