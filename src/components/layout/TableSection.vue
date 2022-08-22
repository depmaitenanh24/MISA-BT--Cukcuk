<template>
<div class="table-section">
    <div class="tool-bar">
        <tool-bar-button btnText = "Thêm" @click="onClickAddButton()">
            <template #icon>
                <div class="add-icon"></div>
            </template>
        </tool-bar-button>
        <tool-bar-button btnText = "Nhân bản" @click="onClickDuplicateButton()">
            <template #icon>
                <div class="duplicate-icon"></div>
            </template>
        </tool-bar-button>
        <tool-bar-button btnText = "Sửa" @click="onClickUpdateButton()">
            <template #icon>
                <div class="modify-icon"></div>
            </template>
        </tool-bar-button>
        <tool-bar-button btnText = "Xóa" @click="onClickDeleteButton()">
            <template #icon>
                <div class="delete-icon"></div>
            </template>
        </tool-bar-button>
        <div class="barrier"></div>
        <tool-bar-button btnText = "Sắp xếp thứ tự">
            <template #icon>
                <div class="arrange-icon"></div>
            </template>
        </tool-bar-button>
        <div class="barrier"></div>
        <tool-bar-button btnText = "Nạp">
            <template #icon>
                <div class="reload-icon"></div>
            </template>
        </tool-bar-button>
        <tool-bar-button btnText = "Giúp">
            <template #icon>
                <div class="help-icon"></div>
            </template>
        </tool-bar-button>
    </div>
    <div class="table-container">
        <table>
            <thead>
                <tr>
                    <th>Loại món
                        <input-icon 
                        :icon = "'dropdown-icon'"
                        @setInputValue = "setTypeFilterInputValue"
                        @onEnterInput = "onEnterFilterInput">
                            <template #dropdown-icon>
                                <div class="dropdown-container">
                                    <div class="dropdown-icon"></div>
                                </div>
                            </template>
                        </input-icon>
                    </th>
                    <th>Mã món
                        <input-icon 
                        :icon = "'describe-icon'"
                        @setInputValue = "setCodeFilterInputValue"
                        @onEnterInput = "onEnterFilterInput">
                            <template #describe-icon>
                                <div class="icon-container">
                                    <p style="padding-top: 6px;">*</p>
                                </div>
                            </template>
                        </input-icon>
                    </th>
                    <th style="min-width: 250px">Tên món
                    <input-icon 
                    @setInputValue = "setNameFilterInputValue"
                    @onEnterInput = "onEnterFilterInput" 
                    :icon = "'describe-icon'">
                        <template #describe-icon>
                                <div class="icon-container">
                                    <p style="padding-top: 6px;">*</p>
                                </div>
                            </template>
                    </input-icon></th>
                    <th>Nhóm thực đơn
                        <input-icon 
                        :icon = "'describe-icon'"
                        @setInputValue = "setGroupFilterInputValue"
                        @onEnterInput = "onEnterFilterInput" >
                            <template #describe-icon>
                                <div class="icon-container">
                                    <p style="padding-top: 6px;">*</p>
                                </div>
                            </template>
                        </input-icon>
                    </th>
                    <th>Đơn vị tính
                        <input-icon :icon = "'describe-icon'">
                            <template #describe-icon>
                                <div class="icon-container">
                                    <p style="padding-top: 6px;">*</p>
                                </div>
                            </template>
                        </input-icon>
                    </th>
                    <th>Giá bán
                        <input-icon :icon = "'describe-icon'">
                            <template #describe-icon>
                                <div class="icon-container">
                                    <p style="padding-top: 6px;">*</p>
                                </div>
                            </template>
                        </input-icon>
                    </th>
                    <th style="min-width: 200px">Thay đổi theo thời giá
                        <input-icon :icon = "'dropdown-icon'">
                            <template #dropdown-icon>
                                <div class="dropdown-container">
                                    <div class="dropdown-icon"></div>
                                </div>
                            </template>
                        </input-icon>
                    </th>
                    <th style="min-width: 200px">Điều chỉnh giá tự do
                        <input-icon :icon = "'dropdown-icon'">
                            <template #dropdown-icon>
                                <div class="dropdown-container">
                                    <div class="dropdown-icon"></div>
                                </div>
                            </template>
                        </input-icon>
                    </th>
                    <th style="min-width: 200px">Hiển thị trên thực đơn
                        <input-icon :icon = "'dropdown-icon'">
                            <template #dropdown-icon>
                                <div class="dropdown-container">
                                    <div class="dropdown-icon"></div>
                                </div>
                            </template>
                        </input-icon>
                    </th>
                    <th>Ngừng bán
                        <input-icon :icon = "'dropdown-icon'">
                            <template #dropdown-icon>
                                <div class="dropdown-container">
                                    <div class="dropdown-icon"></div>
                                </div>
                            </template>
                        </input-icon>
                    </th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="(item, index) in foodList" 
                :key="index" 
                :class="{'tr-selected' : currentRowSelected.index === index}" 
                @click="setCurrentRowSelected(index, item.FoodId, item.FoodCode)"
                @dblclick="onClickUpdateButton()">
                    <td>{{item.FoodType}}</td>
                    <td>{{item.FoodCode}}</td>
                    <td>{{item.FoodName}}</td>
                    <td>{{item.FoodGroupName}}</td>
                    <td>{{item.FoodUnitName}}</td>
                    <td>{{item.FoodSellPrice}}</td>
                    <td align = "center"><the-checkbox/></td>
                    <td align = "center"><the-checkbox/></td>
                    <td align = "center"><the-checkbox/></td>
                    <td align = "center"><the-checkbox/></td>
                </tr>
            </tbody>
        </table>
    </div>
    <div class="table-footer">
        <div class="left">
            <div 
            class="to-first-page icon-container" 
            :class="{'disabled' : isPreDisabled}"
            @click="onClickFirstPage()">
                <div class="first-page-icon"></div>
            </div>
            <div 
            class="previous-page icon-container" 
            :class="{'disabled' : isPreDisabled}"
            @click="onClickPreviousPage()">
                <div class="pre-icon"></div>
            </div>
            <div class="barrier"></div>
            <p style="margin-right: 10px">Trang</p>
            <input 
            style="margin-right: 5px" 
            v-model="currentPage"
            @keydown.prevent.enter="callPagingAPI()"
            >
            <p style="margin-right: 5px">trên</p>
            <span style="margin-right: 10px">{{pageCount}}</span>
            <div class="barrier"></div>
            <div 
            class="next-page icon-container" 
            :class="{'disabled' : isNextDisabled}"
            @click="onClickNextPage()">
                <div class="next-icon"></div>
            </div>
            <div 
            class="to-last-page icon-container" 
            :class="{'disabled' : isNextDisabled}"
            @click="onClickLastPage()">
                <div class="last-page-icon"></div>
            </div>
            <div class="barrier"></div>
            <div class="refresh icon-container" @click="callPagingAPI()">
                <div class="refresh-icon"></div>
            </div>
            <div class="barrier"></div>
            <div class="input-section">
                <input v-model="pageSize" type="text">
                <base-combobox
                v-show="isPageAmountCombobox"
                name="PageAmount"
                :options="pageAmountOptions"
                :inputValue = "pageSize"
                @setInputValue = "setPagingInputValue"
                @toggleCombobox = "togglePagingCombobox"
                />
                <div class="dropdown" @click="togglePagingCombobox">
                    <div class="dropdown-icon" :class="{'rotate' : isPageAmountCombobox}"></div>
                </div>
            </div>
        </div>
        <div class="right">
            <p>Hiển thị {{recordStart}} - {{recordEnd}} trên {{totalRecord}} kết quả</p>
        </div>
    </div>
    <food-details
    v-if="isFormOpened"
    :editMode = "editMode"
    :foodUpdateId="currentRowSelected.id"
    @setFormState = "setFormState"
    @sendFood="sendFood"
    @updateFood="updateFood"
    />

    <modal-alert 
    v-if="isModalAlert"
    :deleteCode="currentRowSelected.code"
    :modalType="'confirm-delete'"
    >
        <template #button-section>
            <d-button style="margin-right: 10px" btnText="Không" @click="setIsAlertOpened(false)()"></d-button>
            <d-button btnText="Có" @click="deleteData()"></d-button>
        </template>
    </modal-alert>
    
    <loading-screen v-if="isLoading"/>
</div>
  
</template>

<script>
import ToolBarButton from "../element/ToolBarButton.vue";
import BaseCombobox from "../element/BaseCombobox.vue";
import TheCheckbox from "../element/TheCheckbox.vue";
import InputIcon from '../element/InputIcon.vue'
import FoodDetails from "./FoodDetails.vue";
import LoadingScreen from "./LoadingScreen.vue";
import ModalAlert from "./ModalAlert.vue";
import DButton from "../element/DButton.vue";
import axios from "axios";
export default {
    async created(){
        this.callPagingAPI()
    },

    watch: {
        currentPage: function(){
            if (this.currentPage === 1) {
                this.isPreDisabled = true
            }
            else{
                this.isPreDisabled = false
            }
            if (this.currentPage === this.pageCount) {
                this.isNextDisabled = true
            }
            else{
                this.isNextDisabled = false
            }
        },

        //Nếu dữ liệu được update thì lấy lại từ database
        // Ngày sửa: 9/7/2022
        // Người sửa: NMDUC
        isTableUpdated: function(){
            if(this.isTableUpdated === true){
                //Lấy data từ API
                this.isLoading = true
                this.callPagingAPI()
                this.isTableUpdated = false
            }
        },
    },

    components: {
        ToolBarButton,
        BaseCombobox,
        TheCheckbox,
        InputIcon,
        FoodDetails,
        LoadingScreen,
        ModalAlert,
        DButton
    },

    methods:{
        //Mở combobox phân trang
        // Ngày sửa: 10/8/2022
        // Người sửa: NMDUC
        togglePagingCombobox(){
            this.isPageAmountCombobox = !this.isPageAmountCombobox
        },

        //Set giá trị cho combobox phân trang
        // Ngày sửa: 10/8/2022
        // Người sửa: NMDUC
        setPagingInputValue(value){
            this.pageSize = value
            this.callPagingAPI()
        },

        //Set giá trị cho tìm kiếm theo nhóm thức ăn
        // Ngày sửa: 15/8/2022
        // Người sửa: NMDUC
        setGroupFilterInputValue(value){
            this.groupFilter = value
        },

        //Set giá trị cho tìm kiếm theo mã thức ăn
        // Ngày sửa: 15/8/2022
        // Người sửa: NMDUC
        setCodeFilterInputValue(value){
            this.codeFilter = value
        },

        //Set giá trị cho tìm kiếm theo tên thức ăn
        // Ngày sửa: 15/8/2022
        // Người sửa: NMDUC
        setNameFilterInputValue(value){
            this.nameFilter = value
        },

        //Set giá trị cho tìm kiếm theo loại thức ăn
        // Ngày sửa: 15/8/2022
        // Người sửa: NMDUC
        setTypeFilterInputValue(value){
            this.typeFilter = value
            
        },

        //Chọn dòng đang được lựa chọn
        // Ngày sửa: 18/8/2022
        // Người sửa: NMDUC
        setCurrentRowSelected(index, foodId, foodCode){
            this.currentRowSelected.index = index
            this.currentRowSelected.id = foodId
            this.currentRowSelected.code = foodCode
        },

        //Khi bấm enter tại các input tìm kiếm
        // Ngày sửa: 15/8/2022
        // Người sửa: NMDUC
        onEnterFilterInput(){
            this.currentPage = 1
            this.pageSize = 25
            this.callPagingAPI()
        },

        //Khi bấm nút về trang 1
        // Ngày sửa: 15/8/2022
        // Người sửa: NMDUC
        onClickFirstPage(){
            this.currentPage = 1
            this.callPagingAPI()
        },

        //Khi bấm nút trang trước
        // Ngày sửa: 15/8/2022
        // Người sửa: NMDUC
        onClickPreviousPage(){
            this.currentPage--
            this.callPagingAPI()
        },

        //Khi bấm nút trang tiếp
        // Ngày sửa: 15/8/2022
        // Người sửa: NMDUC
        onClickNextPage(){
            this.currentPage++
            this.callPagingAPI()
        },

        //Khi bấm nút trang cuối
        // Ngày sửa: 15/8/2022
        // Người sửa: NMDUC
        onClickLastPage(){
            this.currentPage = this.pageCount
            this.callPagingAPI()
        },

        //*Thêm sửa xóa nhân bản

        onClickAddButton(){
            this.isFormOpened = true
            this.editMode = false
        },

        onClickDuplicateButton(){
            this.isFormOpened = true
            this.editMode = 'duplicate'
        },

        onClickUpdateButton(){
            this.isFormOpened = true
            this.editMode = true
        },

        onClickDeleteButton(){
            this.setIsAlertOpened(true)
        },

        ///*

        setFormState(state){
            this.isFormOpened = state
        },

        setIsAlertOpened(state){
            this.isModalAlert = state
        },

        countdownConfirmModal(){
            this.isConfirmModal = true
            setTimeout(() => {
                this.isConfirmModal = false
            },3000)
        },

        //Thêm vào bảng khi thêm mới
        // Ngày sửa: 9/7/2022
        // Người sửa: NMDUC
        async sendFood(newFood){
            
            this.isLoading = true
            //convert dữ liệu đúng định dạng trước khi gửi
            console.log(newFood);
            //Gửi yêu cầu
            try{
                var res = await axios.post("http://localhost:5011/api/v1/Foods", newFood)
            if(res.status === 201){
                this.isUpdateError = false
                this.countdownConfirmModal();
            }
            }
            catch(err){
                console.log(err.response.data.data.errors);
                this.listErrorResponse = err.response.data.data.errors
                this.isConfirmModal = true
                this.isUpdateError = true
            }
            this.isTableUpdated = true

        },

        //Sửa data trong bảng
        // Ngày sửa: 9/7/2022
        // Người sửa: NMDUC
        async updateFood(foodUpdate){
            this.isLoading = true
            //convert dữ liệu đúng định dạng trước khi gửi
            
            //Gửi yêu cầu
            try{
                var res = await axios.put("http://localhost:5011/api/v1/Foods", foodUpdate)
            if(res.status === 201){
                this.isUpdateError = false
                this.countdownConfirmModal();
            }
            }
            catch(err){
                this.isUpdateError = true
                console.log(err);
            }
            this.isTableUpdated = true
        },

        //  Xóa dữ liệu trong bảng
        //  Ngày sửa: 9/7/2022
        //  Người sửa: NMDUC
        async deleteData(){
            this.isLoading = true
            try{
                var res = await axios.delete(`http://localhost:5011/api/v1/Foods?entityId=${this.currentRowSelected.id}`)
            if(res.status === 200){
                this.isUpdateError = false
                this.countdownConfirmModal();
            }
            }catch(err){
                this.isUpdateError = true
            }
            this.isModalAlert = false
            this.isTableUpdated = true
        },

        
        //Gọi API phân trang
        // Ngày sửa: 15/8/2022
        // Người sửa: NMDUC
        async callPagingAPI(){
            this.isLoading = true
            var me = this

            var apiStr = "http://localhost:5011/api/v1/Foods/filter?";
            if(this.currentPage){
                apiStr+= `pageIndex=${this.currentPage}`
            }
            if(this.pageSize){
                apiStr+= `&pageSize=${this.pageSize}`
            }
            if(this.groupFilter){
                apiStr+= `&GroupFilter=${this.groupFilter}`
            }
            if(this.codeFilter){
                apiStr+= `&CodeFilter=${this.codeFilter}`
            }
            if(this.nameFilter){
                apiStr+= `&NameFilter=${this.nameFilter}`
            }
            if(this.typeFilter){
                apiStr+= `&TypeFilter=${this.typeFilter}`
            }
            try{
                var res = await axios.get(apiStr)
                me.foodList = res.data.Data
                this.totalRecord = res.data.TotalRecord
                this.recordStart = res.data.RecordStart
                this.recordEnd = res.data.RecordEnd
                if(this.recordEnd > this.totalRecord){
                    this.recordEnd = this.totalRecord
                }
                this.pageCount = Math.ceil(this.totalRecord / this.pageSize) 
                if (this.currentPage === this.pageCount) {
                    this.isNextDisabled = true
                }
            else{
                this.isNextDisabled = false
            }
            }
            catch(err){
                console.log(err);
            }
            this.currentRowSelected = {index: 0, id: this.foodList[0].FoodId, code: this.foodList[0].FoodCode}
            this.isLoading = false
        },
    },

    data(){
        return{
            foodList: [],
            isFormOpened: false,
            editMode: false,
            totalRecord: 11,
            currentRowSelected: {},
            pageAmountOptions: ['100', '50', '25'],
            pageSize: '25',
            pageCount: 0,
            isPageAmountCombobox: false,
            currentPage: 1,
            filterInput: "",
            recordStart: '',
            recordEnd: '',
            isLoading: false,
            isPreDisabled: true,
            isNextDisabled: false,
            groupFilter: "",
            codeFilter: "",
            nameFilter: "",
            typeFilter: "",
            isModalAlert: false,
            isConfirmModal: false,
            isUpdateError: false,
            isTableUpdated: false
        }
    }
}
</script>

<style scoped>
    .table-section{
        width: 100%;
        border: 1px solid #ccc;
        height: calc(100% - 40px);
        margin-top: 14px;
        overflow: hidden;
    }

    .tool-bar{
        height: 27px;
        display: flex;
        align-items: center;
        justify-content: flex-start;
        padding: 1px;
        background-image: linear-gradient(180deg, #f8f8f8, #e3e4e6);
    }

    .tool-bar .add-icon{
        background: url('../../assets/img/IconSprites/IconSprite.png') no-repeat -1px -2648px;
        width: 14px;
        height: 16px;
        margin-right: 4px;
    }

    .tool-bar .duplicate-icon{
        background: url('../../assets/img/IconSprites/IconSprite.png') no-repeat -1px -1888px;
        width: 14px;
        height: 15px;
        margin-right: 4px;
    }

    .tool-bar .modify-icon{
        background: url('../../assets/img/IconSprites/IconSprite.png') no-repeat 0 -1872px;
        width: 15px;
        height: 15px;
        margin-right: 4px;
    }

    .tool-bar .delete-icon{
        background: url('../../assets/img/IconSprites/IconSprite.png') no-repeat -2px -2683px;
        width: 12px;
        height: 11px;
        margin-right: 4px;
    }

    .tool-bar .arrange-icon{
        background: url('../../assets/img/IconSprites/item-order.png') no-repeat 0 0;
        width: 20px;
        height: 13px;
        margin-right: 4px;
    }

    .tool-bar .reload-icon{
        background: url('../../assets/img/IconSprites/IconSprite.png') no-repeat 0 -2586px;
        width: 16px;
        height: 13px;
        margin-right: 4px;
    }

    .tool-bar .help-icon{
        background: url('../../assets/img/IconSprites/IconSprite.png') no-repeat 0 -1600px;
        width: 16px;
        height: 16px;
        margin-right: 4px;
    }

    .tool-bar button{
        margin-right: 5px;
    }

    /* Bảng */

    .table-container{
        height: calc(100% - 54px);
        /* height: 100% - paddingtop(15px) - thanh tool(30px) - (margin bảng -> thanh tool)(10px) - footer(40px) - paddingbottom(5px) */
        position: relative;
        overflow: auto;
        user-select: none;
    }

    table{
        width: 100%;
        background: #fff;
        font-size: 13px;
        border: 1px solid #bbb;
        border-spacing: 0;
        padding: 0;
    }

    table thead{
        background: #e9ebee;
        position: sticky;
        top: 0.5px;
        z-index: 1;
        
    }

    .table-container tr {
        height: 24px;
        position: relative;
    }

    .table-container th {
        height: 50px;
        text-align: center;
        min-width: 150px;
        font-weight: normal;
        padding: 7px 2px 0 2px;
    }

    .table-container th .icon-container{
        height: 100%;
        width: 22px;
        position: absolute;
        left: 0;
        top: 0;
        display: flex;
        align-items: center;
        justify-content: center;
        border-right: 2px solid #ccc;
        cursor: pointer;
    }

    .table-container th .dropdown-container{
        height: 100%;
        width: 22px;
        position: absolute;
        right: 0;
        top: 0;
        display: flex;
        align-items: center;
        justify-content: center;
        border-left: 2px solid #ccc;
    }

    .table-container th .dropdown-icon{
        background: url('../../assets/img/IconSprites/trigger.png') no-repeat -51px -9px;
        width: 8px;
        height: 4px;
    }

    .table-container td {
        padding: 0 10px;
    }

    .table-container tbody tr:hover {
        background: #e3f1f1;
    }

    .table-container .tr-selected {
       background: #c1ddf1!important;
    }

    .table-container tr:nth-child(even){
        background: #f7f7f7;
    }

    .table-container th,
    .table-container td {
        outline: 1px solid #ccc;
        border: none;
        outline-offset: -1px;
    }

    /* footer */

    .table-footer{
        height: 26px;
        display: flex;
        font-size: 13px;
        align-items: center;
        justify-content: space-between;
        user-select: none;
    }

    .table-footer .left{
        display: flex;
        align-items: center;
        height: 100%;
    }

    .table-footer .right p {
        margin-right: 10px;
    }

    .table-footer .icon-container{
        padding: 3px;
        margin-right: 10px;
        cursor: pointer;
    }

    .table-footer .icon-container.disabled{
        opacity: 0.5;
        pointer-events: none;
    }

    .table-footer .first-page-icon{
        background: url('../../assets/img/IconSprites/page-first.png') no-repeat 0 0;
        width: 16px;
        height: 16px;
    }

    .table-footer .pre-icon{
        background: url('../../assets/img/IconSprites/page-prev.png') no-repeat 0 0;
        width: 16px;
        height: 16px;
    }

    .barrier{
        width: 0.5px;
        height: 50%;
        background: #ccc;
        margin-right: 10px;
    }

    .table-footer .next-icon{
        background: url('../../assets/img/IconSprites/page-next.png') no-repeat 0 0;
        width: 16px;
        height: 16px;
    }

    .table-footer .last-page-icon{
        background: url('../../assets/img/IconSprites/page-last.png') no-repeat 0 0;
        width: 16px;
        height: 16px;
    }

    .table-footer .refresh-icon{
        background: url('../../assets/img/IconSprites/refresh.png') no-repeat 0 0;
        width: 16px;
        height: 16px;
    }

    .table-footer .input-section{
        position: relative;
        width: 60px;
        margin-left: 30px;
    }

    .table-footer input{
        outline: none;
        height: 26px;
        font-size: 11px;
        border-width: 1px;
        border-style: solid;
        border-color: #c1c1c1 #d9d9d9 #d9d9d9;
    }

    .table-footer .input-section ul{
        top: -60px;
        border: none;
        animation: go-up 0.25s ease;
    }

    .table-footer .left>input{
        width: 38px;
        padding: 3px 5px;
    }

    .table-footer .input-section input{
        width: 100%;
        padding: 3px 20px 3px 5px;
        background: #eee;
    }

    .table-footer .dropdown{
        position: absolute;
        right: 0px;
        top: 0;
        cursor: pointer;
        height: 100%;
        padding: 0 6px;
        display: flex;
        align-items: center;
        justify-content: center;
        background: #fff;
        border-width: 1px;
        border-style: solid;
        border-color: #c1c1c1 #d9d9d9 #d9d9d9;
    }

    .table-footer .dropdown:hover{
        background: #ccc;
    }

    .table-footer .dropdown-icon{
        background: url('../../assets/img/IconSprites/trigger.png') no-repeat -51px -9px;
        width: 8px;
        height: 4px;
    }

    
</style>