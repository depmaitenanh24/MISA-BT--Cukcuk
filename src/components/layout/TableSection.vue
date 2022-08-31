<template>
<div class="table-section">
    <modal-success
    :listErrorResponse="listErrorResponse"
    :isUpdateError="isUpdateError"
    :isConfirmModal="isConfirmModal"
    :successMsg="successMsg"
    @setIsConfirmModal="setIsConfirmModal"
    />
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
        <tool-bar-button btnText = "Nạp" @click="callPagingAPI()">
            <template #icon>
                <div class="reload-icon"></div>
            </template>
        </tool-bar-button>
        <tool-bar-button btnText = "Giúp">
            <template #icon>
                <div class="help-icon"></div>
            </template>
        </tool-bar-button>
        <tool-bar-button btnText = "Xuất khẩu" @click="onExportClick()">
            <template #icon>
                <div class="export-icon"></div>
            </template>
        </tool-bar-button>
    </div>
    <div class="table-container">
        <table>
            <thead>
                <tr>
                    <th>
                        <div class="header-text-container" @click="setSortBy('FoodType')">
                            Loại món
                            <div class="sort-icon-container" v-if="sortBy === 'FoodType'">
                                <div class="sort-asc-icon" v-if="sortType === 'ASC'"></div>
                                <div class="sort-desc-icon" v-if="sortType === 'DESC'"></div>
                            </div>
                        </div>
                        <input-icon 
                        :icon = "'describe-icon'"
                        :propName = "'FoodType'"
                        :isComboboxInput="true"
                        :inputType="0"
                        @callFilterApi = "callFilterApi"
                        @setIsFilterChange="setIsFilterChange">
                        </input-icon>
                    </th>
                    <th style="min-width: 200px">
                        <div class="header-text-container" @click="setSortBy('FoodCode')">
                            Mã món
                            <div class="sort-icon-container" v-if="sortBy === 'FoodCode'">
                                <div class="sort-asc-icon" v-if="sortType === 'ASC'"></div>
                                <div class="sort-desc-icon" v-if="sortType === 'DESC'"></div>
                            </div>
                        </div>
                        <input-icon 
                        :icon = "'describe-icon'"
                        :propName = "'FoodCode'"
                        :isComboboxInput="true"
                        :inputType="0"
                        @callFilterApi = "callFilterApi"
                        @setIsFilterChange="setIsFilterChange">
                        </input-icon>
                    </th>
                    <th style="min-width: 250px">
                        <div class="header-text-container" @click="setSortBy('FoodName')">
                            Tên món
                            <div class="sort-icon-container" v-if="sortBy === 'FoodName'">
                                <div class="sort-asc-icon" v-if="sortType === 'ASC'"></div>
                                <div class="sort-desc-icon" v-if="sortType === 'DESC'"></div>
                            </div>
                        </div>
                        <input-icon 
                        :isComboboxInput="true"
                        :icon = "'describe-icon'"
                        :propName = "'FoodName'"
                        :inputType="0"
                        @callFilterApi = "callFilterApi"
                        @setIsFilterChange="setIsFilterChange" 
                        >
                        </input-icon>
                    </th>
                    <th>
                        <div class="header-text-container" @click="setSortBy('FoodGroupName')">
                            Nhóm thực đơn
                            <div class="sort-icon-container" v-if="sortBy === 'FoodGroupName'">
                                <div class="sort-asc-icon" v-if="sortType === 'ASC'"></div>
                                <div class="sort-desc-icon" v-if="sortType === 'DESC'"></div>
                            </div>
                        </div>
                        <input-icon 
                        :icon = "'describe-icon'"
                        :isComboboxInput="true"
                        :propName = "'FoodGroupName'"
                        :inputType="0"
                        @callFilterApi = "callFilterApi" 
                        @setIsFilterChange="setIsFilterChange">
                        </input-icon>
                    </th>
                    <th>
                        <div class="header-text-container" @click="setSortBy('FoodUnitName')">
                            Đơn vị tính
                            <div class="sort-icon-container" v-if="sortBy === 'FoodUnitName'">
                                <div class="sort-asc-icon" v-if="sortType === 'ASC'"></div>
                                <div class="sort-desc-icon" v-if="sortType === 'DESC'"></div>
                            </div>
                        </div>
                        <input-icon 
                        :icon = "'describe-icon'"
                        :isComboboxInput="true"
                        :inputType="0"
                        :propName = "'FoodUnitName'"
                        @callFilterApi = "callFilterApi"
                        @setIsFilterChange="setIsFilterChange" 
                        >
                        </input-icon>
                    </th>
                    <th>
                        <div class="header-text-container" @click="setSortBy('FoodSellPrice')">
                            Giá bán
                            <div class="sort-icon-container" v-if="sortBy === 'FoodSellPrice'">
                                <div class="sort-asc-icon" v-if="sortType === 'ASC'"></div>
                                <div class="sort-desc-icon" v-if="sortType === 'DESC'"></div>
                            </div>
                        </div>
                        <input-icon 
                        :icon = "'describe-icon'"
                        :isComboboxInput="true"
                        :inputType="1"
                        :propName = "'FoodSellPrice'"
                        @callFilterApi = "callFilterApi" 
                        @setIsFilterChange="setIsFilterChange" 
                        >
                        </input-icon>
                    </th>
                    <th style="min-width: 200px">
                        <div class="header-text-container" @click="setSortBy('FoodSellPrice')">
                            Thay đổi theo thời giá
                        </div>
                        <input-icon :icon = "'dropdown-icon'">
                        </input-icon>
                    </th>
                    <th style="min-width: 200px">  
                        <div class="header-text-container" @click="setSortBy('FoodSellPrice')">
                            Điều chỉnh giá tự do 
                        </div>
                        <input-icon :icon = "'dropdown-icon'">
                        </input-icon>
                    </th>
                    <th style="min-width: 200px">
                        <div class="header-text-container" @click="setSortBy('FoodSellPrice')">
                            Hiển thị trên thực đơn
                        </div>
                        <input-icon :icon = "'dropdown-icon'">
                        </input-icon>
                    </th>
                    <th>
                        <div class="header-text-container" @click="setSortBy('FoodSellPrice')">
                            Ngừng bán
                        </div>
                        <input-icon :icon = "'dropdown-icon'">
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
    @setEditMode="setEditMode"
    @setIsLoading="setIsLoading"
    @showSuccessModal="showSuccessModal"
    @showErrorModal="showErrorModal"
    />

    <modal-alert 
    v-if="isModalAlert"
    :deleteCode="currentRowSelected.code"
    :modalType="'confirm-delete'"
    >
        <template #button-section>
            <d-button style="margin-right: 10px" btnText="Không" @click="setIsAlertOpened(false)"></d-button>
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
import ModalSuccess from "../element/ModalSuccess.vue";
import SuccessMsg from "../../js/Resources/SuccessMsg";
import API_HEADER from "../../js/Resources/Api";
import axios from "axios";
export default {
    async created(){
        this.callPagingAPI()
    },

    //Mỗi khi currentPage thay đổi, check xem nó có phải đang ở trang đầu hoặc cuối không
    // Ngày sửa: 9/8/2022
    // Người sửa: NMDUC
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
        // Ngày sửa: 9/8/2022
        // Người sửa: NMDUC
        isTableUpdated: function(){
            if(this.isTableUpdated === true){
                //Lấy data từ API
                this.callPagingAPI()
                this.isTableUpdated = false
                //Tắt màn hình tải trang khi gọi xong
                this.isLoading = true
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
        DButton,
        ModalSuccess
    },

    methods:{

        // export dữ liệu từ file excel
        // Ngày sửa: 29/8/2022
        // Người sửa: NMDUC
        onExportClick(){
            try{
                axios({
                    url: `${API_HEADER.Api_header}Foods/export`,
                    method: 'GET',
                    responseType: 'blob',
                }).then((response) => {
                    var fileURL = window.URL.createObjectURL(new Blob([response.data]));
                    var fileLink = document.createElement('a');
                    fileLink.href = fileURL;
                    fileLink.setAttribute('download', 'DanhSachMonAn.xlsx');
                    document.body.appendChild(fileLink);
                    fileLink.click();
                });
            }
            catch(err){
                console.log(err);
            }
        },

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
       
        //Chọn dòng đang được lựa chọn, dòng sẽ có màu xanh đậm
        // Ngày sửa: 18/8/2022
        // Người sửa: NMDUC
        setCurrentRowSelected(index, foodId, foodCode){
            this.currentRowSelected.index = index
            this.currentRowSelected.id = foodId
            this.currentRowSelected.code = foodCode
        },

        // gọi api phân trang khi thêm vào 1 trường filter rồi ấn enter hoặc chọn cách lọc
        // Ngày sửa: 15/8/2022
        // Người sửa: NMDUC
        callFilterApi(){
            this.currentPage = 1
            this.pageSize = 25
            this.filterObjects.forEach((object) => {
                if(object.inputType === 1){
                    object.value = object.value.toString().replace('.', '')
                }
            })
            if(this.isFilterChange === true){
                this.callPagingAPI()
            }
        },
        
        // set giá trị cho biến isFilter change để kiểm tra các input có sự thay đỏi thì mới gọi API
        // Ngày sửa: 15/8/2022
        // Người sửa: NMDUC
        setIsFilterChange(state, value){
            this.isFilterChange = state
            this.filterObjects = this.filterObjects.filter(item => item.colName !== value.colName)
            this.filterObjects.push(value)
        },

        setSortBy(propName){
            this.sortBy = propName
            if(!this.sortType){
                this.sortType = 'ASC'
            }
            else if(this.sortType === 'ASC'){
                this.sortType = 'DESC'
            }
            else{
                this.sortType = 'ASC'
            }
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

        //Khi bấm nút thêm trên thanh công cụ
        // Ngày sửa: 15/8/2022
        // Người sửa: NMDUC
        onClickAddButton(){
            this.isFormOpened = true
            this.editMode = false
        },

        //Khi bấm nút nhân bản trên thanh công cụ
        // Ngày sửa: 15/8/2022
        // Người sửa: NMDUC
        onClickDuplicateButton(){
            this.isFormOpened = true
            this.editMode = 'duplicate'
        },

        //Khi bấm nút sửa trên thanh công cụ, mở form sửa dòng hiện tại
        // Ngày sửa: 15/8/2022
        // Người sửa: NMDUC
        onClickUpdateButton(){
            this.isFormOpened = true
            this.editMode = true
        },

        //Khi bấm xóa thêm trên thanh công cụ, mở modal xóa dòng
        // Ngày sửa: 15/8/2022
        // Người sửa: NMDUC
        onClickDeleteButton(){
            this.setIsAlertOpened(true)
        },

        ///*

        //đóng/ mở form dựa theo state
        // Ngày sửa: 15/8/2022
        // Người sửa: NMDUC
        setFormState(state){
            this.isFormOpened = state
        },

        //đóng/ mở modal cảnh báo dựa theo state
        // Ngày sửa: 15/8/2022
        // Người sửa: NMDUC
        setIsAlertOpened(state){
            this.isModalAlert = state
        },

        //Hàm set giá trị cho editMode (Gửi vào trong form)
        // Ngày sửa: 15/8/2022
        // Người sửa: NMDUC
        setEditMode(state){
            this.editMode = state
        },

        //hàm set giá trị cho biến isLoading (đưa vào trong component form nhỏ)
        // Ngày sửa: 15/8/2022
        // Người sửa: NMDUC
        setIsLoading(state){
            this.isLoading = state
        },

        //hàm hiển thị modal success (đưa vào trong component form nhỏ)
        // Ngày sửa: 15/8/2022
        // Người sửa: NMDUC
        showSuccessModal(){
            this.isUpdateError = false
            this.countdownConfirmModal();
        },

        //hàm hiển thị modal error khi gọi api (đưa vào trong component form nhỏ)
        // Ngày sửa: 15/8/2022
        // Người sửa: NMDUC
        showErrorModal(err){
            console.log(err);
            this.isUpdateError = true
            this.listErrorResponse = err.response.data.data.errors
            this.isConfirmModal = true
        },

        // Mở/Đóng modal-success, truyền vào trong modal
        // Ngày sửa: 15/8/2022
        // Người sửa: NMDUC
        setIsConfirmModal(state){
            this.isConfirmModal = state
        },

        //đếm ngược cho mdal thêm mới thành công
        // Ngày sửa: 15/8/2022
        // Người sửa: NMDUC
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
            //hiện màn hình tải trang
            this.isLoading = true
            //Gửi yêu cầu
            try{
                var res = await axios.post(`${API_HEADER.Api_header}Foods`, newFood)
            if(res.status === 201){
                this.isUpdateError = false
                this.countdownConfirmModal();
            }
            }
            catch(err){
                this.listErrorResponse = err.response.data.data.errors
                this.isConfirmModal = true
                this.isUpdateError = true
            }
            //khi biến này thay đổi sẽ gọi lại api phân trang và ẩn màn hình tải trang sau đó
            this.isTableUpdated = true

        },

        //Sửa data trong bảng
        // Ngày sửa: 9/7/2022
        // Người sửa: NMDUC
        async updateFood(foodUpdate){
            //hiện màn hình tải trang
            this.isLoading = true
            //Gửi yêu cầu
            try{
                var res = await axios.put(`${API_HEADER.Api_header}Foods`, foodUpdate)
            if(res.status === 201){
                this.isUpdateError = false
                this.countdownConfirmModal();
            }
            }
            catch(err){
                console.log(err);
                this.listErrorResponse = err.response.data.data.errors
                this.isConfirmModal = true
                this.isUpdateError = true
            }
            //khi biến này thay đổi sẽ gọi lại api phân trang và ẩn màn hình tải trang sau đó
            this.isTableUpdated = true
        },

        //  Xóa dữ liệu trong bảng
        //  Ngày sửa: 9/7/2022
        //  Người sửa: NMDUC
        async deleteData(){
            this.isLoading = true
            try{
                var res = await axios.delete(`${API_HEADER.Api_header}Foods?entityId=${this.currentRowSelected.id}`)
            if(res.status === 200){
                this.isUpdateError = false
                this.countdownConfirmModal();
            }
            }catch(err){
                this.isUpdateError = true
            }
            this.isModalAlert = false
            //khi biến này thay đổi sẽ gọi lại api phân trang và ẩn màn hình tải trang sau đó
            this.isTableUpdated = true
        },

        //Gọi API phân trang
        // Ngày sửa: 15/8/2022
        // Người sửa: NMDUC
        async callPagingAPI(){
            this.isLoading = true
            var me = this

            var apiStr = `${API_HEADER.Api_header}Foods/filter?`;
            //Hoàn thanhd api dựa vào tham số truyền vào
            if(this.currentPage){
                apiStr+= `pageIndex=${this.currentPage}`
            }
            if(this.pageSize){
                apiStr+= `&pageSize=${this.pageSize}`
            }
            if(this.sortBy){
                apiStr+= `&sortBy=${this.sortBy}`
            }
            if(this.sortType){
                apiStr+= `&sortType=${this.sortType}`
            }
            try{
                console.log(apiStr, this.filterObjects);
                var res = await axios.post(apiStr, this.filterObjects)
                me.foodList = res.data.Data
                //set tổng số bản ghi, bản ghi hiển thị
                this.totalRecord = res.data.TotalRecord
                this.recordStart = res.data.RecordStart
                this.recordEnd = res.data.RecordEnd
                //nếu bản ghi cuối cùng > tổng số bản ghi, set bản ghi cuối là số bản ghi
                if(this.recordEnd > this.totalRecord){
                    this.recordEnd = this.totalRecord
                }
                //tổng số trang = tổng số bản ghi / số bản ghi 1 trang + 1 
                this.pageCount = Math.ceil(this.totalRecord / this.pageSize) 
                //sau khi gọi api, nếu trang hiện tại = tổng số tảng thì disable chức năng next
                if (this.currentPage === this.pageCount) {
                    this.isNextDisabled = true
                }
                //nếu không thì enable trở lại
                else{
                    this.isNextDisabled = false
                }
                //nếu trang hiện tại đang > tổng số trang thì gọi lại api đến trang cuối
                if (this.currentPage > this.pageCount) {
                    this.currentPage = this.pageCount
                    this.callPagingAPI()
                }
            }
            catch(err){
                console.log(err);
            }
            //khi có dữ liệu thì focus vào dòng đầu tiên của bảng
            if(this.foodList[0]){
                this.currentRowSelected = {index: 0, id: this.foodList[0].FoodId, code: this.foodList[0].FoodCode}
            }
            this.foodList.forEach(food => {
                food.FoodSellPrice = this.validateMoney(food.FoodSellPrice)
                food.FoodMakePrice = this.validateMoney(food.FoodMakePrice)
            })
            
            this.isFilterChange = false
            this.isLoading = false
        },

        //hàm validate tiền
        // Ngày sửa: 26/8/2022
        // Người sửa: NMDUC
        validateMoney(money){
            if(!money && money != 0){
                return
            }
            if (typeof money === 'number') {
                money = Math.round(money);
            }
            //validate cả phần thập phân
            // if (typeof money === 'number') {
            //     money = money.toString()
            //     if(money.includes('.')){
            //         money = money.split('.')
            //         var intPart = money[0].toString()
            //                             .replace(/\D/g, "")
            //                             .replace(/\B(?=(\d{3})+(?!\d))/g, ".");
            //         var decPart = money[1]
            //         return intPart + ',' + decPart
            //     }
            // }
            return money
                .toString()
                .replace(/\D/g, "")
                .replace(/\B(?=(\d{3})+(?!\d))/g, ".");
        }
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
            //Bộ lọc gửi về backend để phân trang
            groupFilter: "",
            codeFilter: "",
            nameFilter: "",
            typeFilter: "",
            //
            isModalAlert: false,
            isConfirmModal: false,
            isUpdateError: false,
            isTableUpdated: false,
            listErrorResponse: [],
            successMsg: SuccessMsg.success_Msg,
            filterObjects: [], 
            sortBy: "",
            sortType: "",
            isFilterChange: false
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

    .tool-bar .export-icon{
        background: url('https://cdn2-new.cukcuk.vn/QLNH/resources/Image/excel_97_24.png');
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
        height: 60px;
        text-align: center;
        min-width: 150px;
        font-weight: normal;
        padding: 0px 2px;
    }

    th .header-text-container{
        height: 38px;
        display: flex;
        align-items: center;
        justify-content: center;
    }

    th .sort-icon-container{
        margin-left: 5px;
    }

    th .sort-asc-icon{
        background: url('../../assets/img/sort_asc.png') no-repeat -3px -2px;
        width: 10px;
        height: 12px;
    }

    th .sort-desc-icon{
        background: url('../../assets/img/sort_desc.png') no-repeat -3px -2px;
        width: 10px;
        height: 12px;
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