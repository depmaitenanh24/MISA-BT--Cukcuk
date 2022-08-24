<template>
    <transition name="drop">
        <div class="confirm-modal" :class="{'error-modal' : isUpdateError}" v-if="isConfirmModal">
            <div class="modal-body">
                <div class="confirm-icon" :class="{'error-modal' : isUpdateError}"></div>
                <p v-show="!isUpdateError">{{successMsg}}</p>
                <p v-show="isUpdateError" v-for="(res, index) in listErrorResponse" :key="index">{{res}}</p>
            </div>
            <div class="modal-footer" v-show="isUpdateError">
                <d-button btnText = "Đóng" @click="closeIsConfirmModal()"></d-button>
            </div>
            <div class="timer" :class="[!isUpdateError? 'countdown' : 'error-modal']"></div>
        </div>
    </transition>
</template>

<script>
import DButton from "./DButton.vue";
export default {
    props: {
        isUpdateError: Boolean,
        isConfirmModal: Boolean,
        listErrorResponse: Array,
        successMsg: String
    },

    components: {
        DButton
    }
}
</script>

<style scoped>
    .confirm-modal {
        position: fixed;
        width: 300px;
        top: 30px;
        left: calc(50% - 150px);
        background: #fff;
        border: 1px solid rgba(1, 145, 96, 0.3);
        z-index: 10;
    }

    .drop-enter-active {
        animation: show-up 0.5s;
    }

    .drop-leave-active {
        animation: show-up 0.5s reverse;
    }

    .confirm-modal .modal-body {
        display: flex;
        padding: 20px;
        align-items: center;
        justify-content: center;
    }

    .confirm-modal.error-modal {
        border-top: 1px solid rgba(255, 71, 71, 0.3);
        border-left: 1px solid rgba(255, 71, 71, 0.3);
        border-right: 1px solid rgba(255, 71, 71, 0.3);
    }

    .confirm-modal .modal-footer {
        margin: 10px 0px;
        display: flex;
        align-items: center;
        justify-content: center;
    }

    .confirm-modal .modal-footer button {
        height: 30px;
        font-size: 11px;
    }

    .confirm-modal .timer {
        height: 2px;
        width: 100%;
    }

    .confirm-modal .countdown {
        background-color: #019160;
        animation: countdown 3s ease;
    }

    .confirm-modal .timer.error-modal {
        background-color: #ff4747;
    }

    .confirm-modal .confirm-icon {
        background: url('../../assets/img/Sprites.64af8f61.svg') no-repeat -706px -146px;
        width: 20px;
        height: 20px;
        margin-right: 15px;
    }

    .confirm-modal .confirm-icon.error-modal {
        background: url('../../assets/img/Sprites.64af8f61.svg') no-repeat -762px -146px;
        width: 20px;
        height: 20px;
        margin-right: 15px;
    }

    @keyframes countdown {
        from {
            width: 100%;
        }
        to {
            width: 0;
        }
    }

    @keyframes show-up {
        0% {
            transform: translateY(-300px);
        }
        90% {
            transform: translateY(20px);
        }
        100% {
            transform: translateY(0px);
        }
    }
</style>