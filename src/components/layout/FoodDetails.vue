<template>
<div class="form">
    <base-form
    @onClickCloseForm="onClickCloseForm"
    @onSubmitClick="onSubmitClick"
    @onSubmitAndAddClick="onSubmitAndAddClick"
    @onCancelClick="onCancelClick">
        <template #submitAndAddBtn>
            <d-button btnText = "Cất và thêm" @click="(e) => onSubmitAndAddClick(e)" :isSmall="true">
                <template #icon>
                    <div class="insert-and-add-icon"></div>
                </template>
            </d-button>
        </template>
        <template #content>
            <div class="content">
            <div class="nav-tab-section">
                <div class="nav-tabs">
                    <div class="tab" :class="{'chose' : currentTab === 'FoodInfoTab'}" @click="changeTab('FoodInfoTab')">Thông tin chung</div>
                    <div class="tab" :class="{'chose' : currentTab === 'FoodHobbyTab'}" @click="changeTab('FoodHobbyTab')">Sở thích phục vụ</div>
                </div>
            </div>
            <div class="food-info-tab" v-show="currentTab == 'FoodInfoTab'">
                <div class="food-info-section">
                    <combo-input
                    name = "FoodName"
                    id="FoodName"
                    :propName="'FoodName'"
                    :labelName = "'Tên món'"
                    :isMandaInput = "true"
                    :isError = "isError.FoodName"
                    :inputValue = "foodInfo.FoodName"
                    :checkFocus = "checkFocus.FoodName"
                    :title="errorMsg.FoodName"
                    @setInputValue="setInputValue"
                    @validateMandaInput = "validateMandaInput"
                    @generateNewCode="generateNewCode"
                    ></combo-input>
                    <combo-input
                    name = "FoodCode"
                    id="FoodCode"
                    :propName="'FoodCode'"
                    :labelName = "'Mã món ăn'"
                    :isMandaInput = "true"
                    :isError = "isError.FoodCode"
                    :inputValue = "foodInfo.FoodCode"
                    :checkFocus = "checkFocus.FoodCode"
                    :title="errorMsg.FoodCode"
                    @setInputValue="setInputValue"
                    @validateMandaInput = "validateMandaInput"
                    ></combo-input>
                    <combo-input
                    name = "FoodGroupName"
                    id="FoodGroupName"
                    :propName="'FoodGroupName'"
                    :labelName = "'Nhóm thực đơn'"
                    :isDropdownInput = "true"
                    :isError = "isError.FoodGroupName"
                    :inputValue = "foodInfo.FoodGroupName"
                    :checkFocus = "checkFocus.FoodGroupName"
                    :title="errorMsg.FoodGroupName"
                    :options="foodGroupNameList"
                    @setInputValue="setInputValue"
                    @validateMandaInput = "validateMandaInput"
                    @setFormState="setIsFormFoodDetail"
                    ></combo-input>
                    <combo-input
                    name = "FoodUnitName"
                    id="FoodUnitName"
                    :propName="'FoodUnitName'"
                    :labelName = "'Đơn vị tính'"
                    :isMandaInput = "true"
                    :isDropdownInput = "true"
                    :isError = "isError.FoodUnitName"
                    :inputValue = "foodInfo.FoodUnitName"
                    :checkFocus = "checkFocus.FoodUnitName"
                    :title="errorMsg.FoodUnitName"
                    :options="foodUnitNameList"
                    @setInputValue="setInputValue"
                    @validateMandaInput = "validateMandaInput"
                    @setFormState="setIsFormFoodDetail"
                    ></combo-input>
                    <combo-input
                    name = "FoodSellPrice"
                    id="FoodSellPrice"
                    :propName="'FoodSellPrice'"
                    :labelName = "'Giá bán'"
                    :isMandaInput = "true"
                    :isError = "isError.FoodSellPrice"
                    :isPriceInput = "true"
                    :inputValue = "foodInfo.FoodSellPrice"
                    :checkFocus = "checkFocus.FoodSellPrice"
                    :title="errorMsg.FoodSellPrice"
                    @setInputValue="setInputValue"
                    @validateMandaInput = "validateMandaInput"
                    ></combo-input>
                    <combo-input
                    name = "FoodMadePrice"
                    id="FoodMadePrice"
                    :propName="'FoodMadePrice'"
                    :labelName = "'Giá vốn'"
                    :isError = "isError.FoodMadePrice"
                    :isPriceInput = "true"
                    :inputValue = "foodInfo.FoodMadePrice"
                    :checkFocus = "checkFocus.FoodMadePrice"
                    :title="errorMsg.FoodMadePrice"
                    @setInputValue="setInputValue"
                    @validateMandaInput = "validateMandaInput"
                    ></combo-input>
                    <combo-input
                    name = "Description"
                    id="Description"
                    :propName="'Description'"
                    :labelName = "'Mô tả'"
                    :isError = "isError.Description"
                    :isDescriptionInput = "true"
                    :inputValue = "foodInfo.Description"
                    :checkFocus = "checkFocus.Description"
                    :title="errorMsg.Description"
                    @setInputValue="setInputValue"
                    @validateMandaInput = "validateMandaInput"
                    ></combo-input>
                    <combo-input
                    name = "FoodPlaceName"
                    id="FoodPlaceName"
                    :propName="'FoodPlaceName'"
                    :labelName = "'Nơi chế biến'"
                    :isDropdownInput = "true"
                    :isError = "isError.FoodPlaceName"
                    :inputValue = "foodInfo.FoodPlaceName"
                    :checkFocus = "checkFocus.FoodPlaceName"
                    :title="errorMsg.FoodPlaceName"
                    :options="foodPlaceNameList"
                    @setInputValue="setInputValue"
                    @validateMandaInput = "validateMandaInput"
                    @setFormState="setIsFormFoodDetail"
                    ></combo-input>
                    <div class="showOnMenu">
                        <the-checkbox></the-checkbox>
                        <p>Không hiển thị trên thực đơn</p>
                    </div>
                </div>
                <div class="food-avatar">
                    <div class="avatar-title">Ảnh đại diện</div>
                    <div class="avatar-section">
                        <div class="image-container">
                            <div class="symbol">
                                <div class="symbol-icon"></div>
                                <p>Biểu tượng</p>
                            </div>
                            <img src="../../assets/img/ImageHandler.png" alt="Food Image"/>
                        </div>
                        <p>Chọn các ảnh có định dạng</p>
                        <p>(.jpj, .jpeg, .png, .gif)</p>
                        <p>Chọn từ thư viện ảnh</p>
                    </div>
                    <div class="buttons-container">
                        <d-button btnText = '....'></d-button>
                        <d-button>
                            <template #icon>
                                <div class="delete-icon"></div>
                            </template>
                        </d-button>
                    </div>
                </div>
            </div>
            <div class="food-hobby-tab" v-show="currentTab === 'FoodHobbyTab'">
                <p>Món ăn: <strong>{{foodInfo.FoodName}}</strong></p>
                <div class="food-hobby-comment">
                    <div class="comment-icon"></div>
                    <div class="comment">
                        <p>Ghi lại sở thích của khách hàng giúp nhân viên phục vụ gọi nhanh order.</p>
                        <p>VD: Không cay/ ít hành/ thêm phomai/ ...</p>
                    </div>
                </div>
                <div class="table-container">
                    <table>
                        <thead>
                            <tr>
                                <th style="width: 65%">Sở thích phục vụ</th>
                                <th style="width: 35%">Thu thêm</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr v-for="(item, index) in foodInfo.FoodHobbyList" 
                            :key="index" 
                            :class="{'tr-selected' : currentHobbyRowSelected == index}">
                                <td style="width: 65%" @click="showTableInput(0, index, 'FoodHobbyName')">{{item.FoodHobbyName}}
                                    <div class="input-section" v-click-outside="(e) => hideTableInput(e, 0, index)">
                                        <input
                                        :name="`FoodHobbyName0${index}`"
                                        v-model="foodInfo.FoodHobbyList[index].FoodHobbyName"
                                        :ref="`FoodHobbyName`"/>
                                        <div class="dropdown-icon" @click="toggleComboboxHobby(index)" v-show="isFoodHobbyInput[0][index]"></div>
                                        <div class="search-icon" v-show="isFoodHobbyInput[0][index]"></div>
                                        <div class="add-icon" v-show="isFoodHobbyInput[0][index]" @click="setIsFormFoodHobby(index, true)"></div>
                                        <base-table-combobox
                                        v-if="isComboboxHobby[index]"
                                        :options="foodHobbyList"
                                        :inputValue="foodInfo.FoodHobbyList[index]"
                                        :indexSelected="index"
                                        :isShow="isComboboxHobby[index]"
                                        @toggleCombobox="toggleComboboxHobby"
                                        @setInputValue="setValueFoodHobbyInput"
                                        />
                                    </div>
                                </td>
                                <td style="width: 35%" @click="showTableInput(1, index, 'FoodHobbyFee')">{{item.FoodHobbyFee}}
                                    <div class="input-section">
                                        <input
                                        :name="`FoodHobbyName1${index}`"
                                        v-model="foodInfo.FoodHobbyList[index].FoodHobbyFee"
                                        :ref="`FoodHobbyFee`"/>
                                    </div>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
                <div class="buttons-container">
                    <d-button btnText="Thêm dòng" :isSmall="true" @click="addFoodHobbyRow()">
                        <template #icon>
                            <div class="add-icon"></div>
                        </template>
                    </d-button>
                    <d-button btnText="Xóa dòng" :isSmall="true" @click="deleteFoodHobbyRow(currentHobbyRowSelected)">
                        <template #icon>
                            <div class="delete-icon"></div>
                        </template>
                    </d-button>
                </div>
            </div>
        </div>
        </template>
        
    </base-form>
    <group-detail-form 
    v-if="isFormFoodGroupName"
    :foodGroupNameList="foodGroupNameList"
    @setIsFormFoodDetail="setIsFormFoodDetail"
    @callAPIDetail="getAPIFoodGroup"
    @setInputValue="setInputValue"
    />
    <unit-detail-form 
    v-if="isFormFoodUnitName"
    :foodUnitNameList="foodUnitNameList"
    @setIsFormFoodDetail="setIsFormFoodDetail"
    @callAPIDetail="getAPIFoodUnit"
    @setInputValue="setInputValue"
    />
    <place-detail-form 
    v-if="isFormFoodPlaceName"
    :foodPlaceNameList="foodPlaceNameList"
    @setIsFormFoodDetail="setIsFormFoodDetail"
    @callAPIDetail="getAPIFoodPlace"
    @setInputValue="setInputValue"
    />
    <hobby-detail-form
    v-if="isFormFoodHobby"
    :foodHobbyList="foodHobbyList"
    :indexSelected="indexFoodHobbySelected"
    @setIsFormFoodDetail="setIsFormFoodDetail"
    @callAPIDetail="getAPIFoodHobby"
    @setInputValue="setValueFoodHobbyInput"
    />
    <modal-alert
        v-if="isAlertOpened"
        :duplicateId="duplicateId"
        :modalType="modalType">
            <template #button-section>
                <d-button v-show="modalType === 'warning'" btnText="Đồng ý" @click="closeAlert()"></d-button>
            </template>
    </modal-alert>
    <modal-alert
    v-if="isModalChange"
    :modalType="modalType">
        <template #button-section>
            <div class="left" v-show="modalType === 'confirm-change'">
                <d-button btnText="Hủy" @click="setIsModalChange(false)"></d-button>
            </div>
            <div class="right" v-show="modalType === 'confirm-change'" style="display: flex;">
                <d-button btnText="Không" @click="(e) => onClickNoModalChange(e)"></d-button>
                <d-button btnText="Có" @click="(e) => onClickYesModalChange(e)" style="margin-left: 10px;"></d-button>
            </div>
        </template>
    </modal-alert>
</div>
</template>

<script>
import ComboInput from "../element/ComboInput.vue";
import DButton from '../element/DButton.vue'
import TheCheckbox from "../element/TheCheckbox.vue";
import ModalAlert from "./ModalAlert.vue";
import ErrMsgs from "../../js/Resources/ErrMsgs";
import BaseForm from "../element/BaseForm.vue";
import GroupDetailForm from "./GroupDetailForm.vue";
import PlaceDetailForm from "./PlaceDetailForm.vue";
import UnitDetailForm from "./UnitDetailForm.vue";
import HobbyDetailForm from "./HobbyDetailForm.vue";
import BaseTableCombobox from "../element/BaseTableCombobox.vue";
import axios from 'axios'
export default {

    components:{
    ComboInput,
    DButton,
    TheCheckbox,
    ModalAlert,
    BaseForm,
    GroupDetailForm,
    PlaceDetailForm,
    UnitDetailForm,
    HobbyDetailForm,
    BaseTableCombobox
},

    created(){
        this.getAPIFoodCode()
        this.getAPIFoodGroup()
        this.getAPIFoodPlace()
        this.getAPIFoodUnit()
        this.getAPIFoodHobby()

            if(this.editMode === false){
                this.foodInfo = {FoodHobbyList: [{FoodHobbyName: '',FoodHobbyFee: 0}]}
            }
            else if(this.editMode === true){
                axios.get(`http://localhost:5011/api/v1/Foods/${this.foodUpdateId}`).then(res => {
                    this.foodInfo = res.data
                    this.foodUpdateCode = this.foodInfo.FoodCode
                })
            }
            else{
                axios.get(`http://localhost:5011/api/v1/Foods/${this.foodUpdateId}`).then(res => {
                    this.foodInfo = res.data
                    this.foodUpdateCode = this.foodInfo.FoodCode
                })
            }
    },

    methods: {
        //Lấy danh sách code món ăn
        //CreatedBy: NMDUC
        //CreatedDate: 21/8/2022
        getAPIFoodCode(){
            var me = this
            //Khi gọi Api thì đặt lại danh sách id = rỗng
            this.foodCodeList = [];
            //Lưu 1 mảng các id để check trùng
            //Danh sách code món ăn
            try{
                axios.get('http://localhost:5011/api/v1/Foods').then(res => {
                    for(let i = 0; i<res.data.length; i++){
                        if(res.data[i].FoodId){
                            me.foodCodeList.push(res.data[i].FoodCode)
                        }
                    }
                })
            }
            catch(err){
                console.log(err);
            }
        },

        getAPIFoodGroup(){
            var me = this
            //Khi gọi Api thì đặt lại danh sách id = rỗng
            this.foodGroupNameList = [];
            //Lưu 1 mảng các id để check trùng
            //Danh sách nhóm thức ăn
            try{
                axios.get('http://localhost:5011/api/v1/FoodGroups').then(res => {
                    for(let i = 0; i<res.data.length; i++){
                        if(res.data[i].FoodGroupName){
                            me.foodGroupNameList.push(res.data[i].FoodGroupName)
                            this.ConvertFoodGroup = {...this.ConvertFoodGroup, [res.data[i].FoodGroupName]: res.data[i].FoodGroupId}
                        }
                    }
                })
            }
            catch(err){
                console.log(err);
            }
        },

        getAPIFoodUnit(){
            var me = this
            //Khi gọi Api thì đặt lại danh sách id = rỗng
            this.foodUnitNameList = [];
            //Lưu 1 mảng các id để check trùng
            //Danh sách đơn vị tính
            try{
                axios.get('http://localhost:5011/api/v1/FoodUnits').then(res => {
                    for(let i = 0; i<res.data.length; i++){
                        if(res.data[i].FoodUnitName){
                            me.foodUnitNameList.push(res.data[i].FoodUnitName)
                            this.ConvertFoodUnit = {...this.ConvertFoodUnit, [res.data[i].FoodUnitName]: res.data[i].FoodUnitId}
                        }
                    }
                })
            }
            catch(err){
                console.log(err);
            }
        },

        getAPIFoodPlace(){
            var me = this
            //Khi gọi Api thì đặt lại danh sách id = rỗng
            this.foodPlaceNameList = [];
            //Lưu 1 mảng các id để check trùng
            //Danh sách nơi chế biến
            try{
                axios.get('http://localhost:5011/api/v1/FoodPlaces').then(res => {
                    for(let i = 0; i<res.data.length; i++){
                        if(res.data[i].FoodPlaceName){
                            me.foodPlaceNameList.push(res.data[i].FoodPlaceName)
                            this.ConvertFoodPlace = {...this.ConvertFoodPlace, [res.data[i].FoodPlaceName]: res.data[i].FoodPlaceId}
                        }
                    }
                })
            }
            catch(err){
                console.log(err);
            }
        },

        getAPIFoodHobby(){
            var me = this
            //Khi gọi Api thì đặt lại danh sách id = rỗng
            this.foodHobbyList = [];
            //Lưu 1 mảng các id để check trùng
            //Danh sách sở thích phục vụ
            try{
                axios.get('http://localhost:5011/api/v1/FoodHobbys').then(res => {
                    for(let i = 0; i<res.data.length; i++){
                        if(res.data[i].FoodHobbyName){
                            me.foodHobbyList.push({FoodHobbyName: res.data[i].FoodHobbyName, FoodHobbyFee: res.data[i].FoodHobbyFee})
                        }
                    }
                })
            }
            catch(err){
                console.log(err);
            }
        },

        //Khi bấm cất
        //CreatedBy: NMDUC
        //CreatedDate: 17/8/2022
        onSubmitClick(e){
            e.preventDefault();
            //Kiểm tra lỗi
            this.validateForm()
            //Nếu có error
            if (Object.keys(this.errorMsg).length > 0) {
                this.focusInput(Object.keys(this.errorMsg)[0])
                this.currentTab = "FoodInfoTab"
                return
            }
            if (this.checkDuplicate() === false) {
                this.currentTab = "FoodInfoTab"
                return
            }
            this.updateData();
            this.$emit('setFormState', false)
        },

        //Khi bấm cất và thêm
        //CreatedBy: NMDUC
        //CreatedDate: 17/8/2022
        onSubmitAndAddClick(e){
            e.preventDefault();
            //Kiểm tra lỗi
            this.validateForm()
            //Nếu có error
            if (Object.keys(this.errorMsg).length > 0) {
                this.focusInput(Object.keys(this.errorMsg)[0])
                return
            }
            if (this.checkDuplicate() === false) {
                return
            }
            this.updateData();
            this.foodInfo = {FoodHobbyList: []}
        },

        //Khi bấm hủy bỏ
        //CreatedBy: NMDUC
        //CreatedDate: 17/8/2022
        onCancelClick(e){
            e.preventDefault();
            this.$emit('setFormState', false)
        },

        validateForm(){
            const error = {};
            const values = this.foodInfo
            if (!values.FoodName){
                error.FoodName = ErrMsgs.errMsg_FoodName_Null;
                this.isError.FoodName = true;
            }
            else{
                this.isError.FoodName = false;
            }

            if (!values.FoodCode){
                error.FoodCode = ErrMsgs.errMsg_FoodCode_Null;
                this.isError.FoodCode = true;
            }
            else{
                this.isError.FoodCode = false;
            }

            if(values.FoodGroupName && !this.foodGroupNameList.includes(values.FoodGroupName)){
                error.FoodGroupName = ErrMsgs.errMsg_FoodGroupName_Invalid
                this.isError.FoodGroupName = true;
            }
            else{
                this.isError.FoodGroupName = false;
            }

            if(values.foodPlaceName && !this.FoodPlaceNameList.includes(values.FoodPlaceName)){
                error.FoodPlaceName = ErrMsgs.errMsg_FoodPlaceName_Invalid
                this.isError.FoodPlaceName = true;
            }
            else{
                this.isError.FoodPlaceName = false;
            }

            if (!values.FoodUnitName){
                error.FoodUnitName = ErrMsgs.errMsg_FoodUnitName_Null;
                this.isError.FoodUnitName = true;
            }
            else if(!this.foodUnitNameList.includes(values.FoodUnitName)){
                error.FoodUnitName = ErrMsgs.errMsg_FoodUnitName_Invalid
                this.isError.FoodUnitName = true;
            }
            else{
                this.isError.FoodUnitName = false;
            }

            if (!values.FoodSellPrice){
                error.FoodSellPrice = ErrMsgs.errMsg_FoodSellPrice_Null;
                this.isError.FoodSellPrice = true;
            }
            else{
                this.isError.FoodSellPrice = false;
            }
            this.errorMsg = error;
        },

        //Check trùng dữ liệu, nếu trùng hiện cảnh báo(alert)
        // Ngày sửa: 18/8/2022
        // Người sửa: NMDUC
        checkDuplicate(){
        //Nếu đang thực hiện thêm mới
        if (this.editMode === true) {
            if(this.foodCodeList.includes(this.foodInfo.FoodCode) && this.foodInfo.FoodCode !== this.foodUpdateCode){
                this.setIsModalAlert(true);
                this.duplicateId = this.foodInfo.FoodCode;
                this.propFocus = "FoodCode"
                return false;
            }
            return true
            
        }
        else{
            //Nếu dữ liệu trùng
            if (this.foodCodeList.includes(this.foodInfo.FoodCode)) {
                this.setIsModalAlert(true);
                this.duplicateId = this.foodInfo.FoodCode;
                this.propFocus = "FoodCode"
                return false;
            }
            return true;
        }
        },

        updateData(){
            this.isError = {};
            if(this.foodInfo.FoodGroupName){
                this.foodInfo.FoodGroupId = this.ConvertFoodGroup[this.foodInfo.FoodGroupName]
            }
            if(this.foodInfo.FoodUnitName){
                this.foodInfo.FoodUnitId = this.ConvertFoodUnit[this.foodInfo.FoodUnitName]
            }
            if(this.foodInfo.FoodPlaceName){
                this.foodInfo.FoodPlaceId = this.ConvertFoodPlace[this.foodInfo.FoodPlaceName]
            }
            this.foodInfo.FoodHobbyList.forEach((hobby) => {
                if(!hobby.FoodHobbyName || hobby.FoodHobbyName === ""){
                    var indexDelete = this.foodInfo.FoodHobbyList.indexOf(hobby)
                    this.foodInfo.FoodHobbyList = this.foodInfo.FoodHobbyList.filter((item, index) => indexDelete !== index)
                }
                else{
                    if(!hobby.FoodHobbyFee || hobby.FoodHobbyFee === ""){
                        hobby.FoodHobbyFee = 0
                    }
                }
            });
            //Nếu dữ liệu hợp lệ
            if (this.editMode === true) {
                this.$emit('updateFood',this.foodInfo);
            } else {
                this.foodInfo.FoodType = "Món ăn"
                this.$emit('sendFood',this.foodInfo);
            }
        },

        //Đổi tab hiện tại
        //CreatedBy: NMDUC
        //CreatedDate: 17/8/2022
        changeTab(tabName){
            this.currentTab = tabName
        },

        //Đặt giá trị cho combo-input
        //CreatedBy: NMDUC
        //CreatedDate: 17/8/2022
        setInputValue(propName, value){
            this.foodInfo[propName] = value
        },

        //Hiện input để nhập dữ liệu vào table
        //CreatedBy: NMDUC
        //CreatedDate: 17/8/2022
        showTableInput(colNum, index, propName){
            this.currentHobbyRowSelected = index
            this.isFoodHobbyInput[colNum][index] = true;
            this.$nextTick(function(){
                this.$refs[propName][index].select()
            })
        },

        //Ẩn input của table
        //CreatedBy: NMDUC
        //CreatedDate: 17/8/2022
        hideTableInput(event, colNum, index){
            this.isFoodHobbyInput[colNum][index] = false;
        },

        setValueFoodHobbyInput(index, value){
            this.foodInfo.FoodHobbyList[index].FoodHobbyName = value.FoodHobbyName
            this.foodInfo.FoodHobbyList[index].FoodHobbyFee = value.FoodHobbyFee
        },

        //Thêm dòng cho tab sở thích phục vụ
        //CreatedBy: NMDUC
        //CreatedDate: 17/8/2022
        addFoodHobbyRow(){
            this.foodInfo.FoodHobbyList = [...this.foodInfo.FoodHobbyList, {FoodHobbyName: '', FoodHobbyFee: '0'}]
        },

        //Xóa dòng cho tab sở thích phục vụ
        //CreatedBy: NMDUC
        //CreatedDate: 17/8/2022
        deleteFoodHobbyRow(currentIndex){
            this.foodInfo.FoodHobbyList = this.foodInfo.FoodHobbyList.filter((item, index) => index !== currentIndex)
        },

        //Đánh lỗi cho các trường bắt buộc
        //CreatedBy: NMDUC
        //CreatedDate: 17/8/2022
        validateMandaInput(propName, state){
            this.isError[propName] = state
        },

        generateNewCode(foodName){
            foodName = this.validateCodeString(foodName)
            var newCode = ''
            if(!this.foodCodeList.includes(this.getFirstLetter(foodName))){
                newCode = this.getFirstLetter(foodName) 
            }
            else if(!this.foodCodeList.includes(this.getTwoFirstLetter(foodName))){
                newCode = this.getTwoFirstLetter(foodName)
            }
            else{
                newCode = this.getAllLetter(foodName)
            }
            this.foodInfo.FoodCode = newCode
            this.isError.FoodCode = false
        },

        setIsFormFoodDetail(propName, state){
            var str = "isForm" + propName
            this[str] = state
        },

        setIsFormFoodHobby(index, state){
            this.indexFoodHobbySelected = index
            this.isFormFoodHobby = state
        },

        //Mở modal cảnh báo
        //CreatedBy: NMDUC
        //CreatedDate: 17/8/2022
        setIsModalAlert(state){
            this.isAlertOpened = state
        },

        setIsModalChange(state){
            this.isModalChange = state
        },

        onClickCloseForm(){
            this.modalType = 'confirm-change'
            this.setIsModalChange(true)
        },

        onClickNoModalChange(e){
            this.setIsModalChange(false)
            this.onCancelClick(e)
        },

        onClickYesModalChange(e){
            this.setIsModalChange(false)
            this.onSubmitClick(e)
        },

        //Focus vào 1 input cụ thể 
        //param: ref của input muốn focus
        //CreatedBy: NMDUC
        //CreatedDate: 17/8/2022
        focusInput(propName){
            this.checkFocus[propName] = !this.checkFocus[propName]
        },

        toggleComboboxHobby(index){
            this.isComboboxHobby[index] =  !this.isComboboxHobby[index]
        },

        //Đóng modal cảnh báo (alert)
        // Ngày sửa: 13/7/2022
        // Người sửa: NMDUC
        closeAlert(){
            this.setIsModalAlert(false)
            this.focusInput(this.propFocus)
        },

        validateCodeString(str) {
            str = str.replace(/à|á|ạ|ả|ã|â|ầ|ấ|ậ|ẩ|ẫ|ă|ằ|ắ|ặ|ẳ|ẵ/g, "a");
            str = str.replace(/è|é|ẹ|ẻ|ẽ|ê|ề|ế|ệ|ể|ễ/g, "e");
            str = str.replace(/ì|í|ị|ỉ|ĩ/g, "i");
            str = str.replace(/ò|ó|ọ|ỏ|õ|ô|ồ|ố|ộ|ổ|ỗ|ơ|ờ|ớ|ợ|ở|ỡ/g, "o");
            str = str.replace(/ù|ú|ụ|ủ|ũ|ư|ừ|ứ|ự|ử|ữ/g, "u");
            str = str.replace(/ỳ|ý|ỵ|ỷ|ỹ/g, "y");
            str = str.replace(/đ/g, "d");
            str = str.replace(/À|Á|Ạ|Ả|Ã|Â|Ầ|Ấ|Ậ|Ẩ|Ẫ|Ă|Ằ|Ắ|Ặ|Ẳ|Ẵ/g, "A");
            str = str.replace(/È|É|Ẹ|Ẻ|Ẽ|Ê|Ề|Ế|Ệ|Ể|Ễ/g, "E");
            str = str.replace(/Ì|Í|Ị|Ỉ|Ĩ/g, "I");
            str = str.replace(/Ò|Ó|Ọ|Ỏ|Õ|Ô|Ồ|Ố|Ộ|Ổ|Ỗ|Ơ|Ờ|Ớ|Ợ|Ở|Ỡ/g, "O");
            str = str.replace(/Ù|Ú|Ụ|Ủ|Ũ|Ư|Ừ|Ứ|Ự|Ử|Ữ/g, "U");
            str = str.replace(/Ỳ|Ý|Ỵ|Ỷ|Ỹ/g, "Y");
            str = str.replace(/Đ/g, "D");
            str = str.toUpperCase()
            return str;
        },

        getFirstLetter(str){
            var strParts = str.split(' ')
            var newCode = ''
            for(let i = 0; i < strParts.length; i++){
                newCode += strParts[i].toString().substring(0, 1)
            }
            return newCode
        },

        getTwoFirstLetter(str){
            var strParts = str.split(' ')
            var newCode = ''
            for(let i = 0; i < strParts.length; i++){
                newCode += strParts[i].toString().substring(0, 2)
            }
            return newCode
        },

        getAllLetter(str){
            var newCode = ''
            newCode = str.replace(/ /g,'')
            return newCode
        },
        
    },

    data(){
        return{
            isError: {},
            errorMsg: [],
            currentTab: "FoodInfoTab",
            foodInfo: {FoodHobbyList: []},
            isFoodHobbyInput: [[], []],
            currentHobbyRowSelected: 0,
            isAlertOpened: false,
            isModalChange: false,
            checkFocus: {},
            duplicateId: "",
            //Các danh sách lưu để check trùng
            //
            foodCodeList: [],
            foodGroupNameList: [],
            foodPlaceNameList: [],
            foodUnitNameList: [],
            foodHobbyList: [],
            //
            //Các danh sách lưu chuyển từ name => id và ngược lại
            //
            ConvertFoodGroup: {},
            ConvertFoodPlace: {},
            ConvertFoodUnit: {},
            ConvertFoodHobby: {},
            //
            foodUpdateCode: "",
            propFocus: "",
            isComboboxHobby: [],
            modalType: '',
            isFormFoodGroupName: false,
            isFormFoodPlaceName: false,
            isFormFoodUnitName: false,
            isFormFoodHobby: false,
            indexFoodHobbySelected: ''
        }
    },

    props: {
        editMode: Boolean,
        foodUpdateId: String,
    },
}
</script>

<style scoped>
    /* Content */

    .form {
        width: 100%;
        height: 100vh;
        display: flex;
        align-items: center;
        justify-content: center;
        background: rgba(0, 0, 0, 0.5);
        position: fixed;
        top: 0;
        left: 0;
        z-index: 2;
    }

    .content{
        padding: 10px 8px;
        background: #fff;
        height: 500px;
        
    }

    .content .nav-tab-section{
        background: #eee;
    }

    .content .nav-tabs{
        display: flex;
        font-size: 13px;
    }

    .content .tab{
        padding: 5px 8px;
        cursor: pointer;
    }

    .tab:hover{
        border-top: 1px solid#0973b9;
        background: #d7e9f4;
    }

    .tab.chose{
        background: #fff;
        border: 1px solid #ccc;
        border-top: 1px solid#0973b9;
        border-bottom: 1px solid#fff;
        color: #0973b9;;
    }

    /* tab thông tin món ăn */

    .food-info-tab{
        margin-top: 15px;
        display: flex;
        justify-content: space-between;
    }

    /* Phần thông tin */

    .food-info-section{
        width: 68%;
    }

    .food-info-section .showOnMenu{
        display: flex;
        align-items: center;
        padding-left: 30%;
        margin-top: 10px;
    }

    .food-info-section .showOnMenu p{
        margin-left: 5px;
    }

    /* Phần hình ảnh */

    .food-avatar{
        width: 30%;
        min-width: 200px;
        height: 240px;
        border: 1px solid #aaa;
        display: flex;
        padding: 12px 8px;
        position: relative;
    }

    .avatar-title{
        position: absolute;
        top: -8px;
        left: 10px;
        background: #fff;
        z-index: 1;
    }

    .avatar-section{
        width: 80%;
        min-width: 160px;
        text-align: center;
    }

    .avatar-section img{
        width: 100%;
        height: 100%;
        object-fit: cover;
    }

    .avatar-section>p{
        margin-top: 5px;
    }

    .avatar-section>p:nth-child(3){
        font-weight: 600;
    }

    .avatar-section>p:nth-child(4){
        color: #026b97;
        margin-top: 10px;
        font: bold 12px/16px tahoma;
    }

    .image-container{
        width: 100%;
        height: 120px;
        position: relative;
    }

    .image-container .symbol{
        position: absolute;
        display: flex;
        align-items: center;
        justify-content: center;
        border: 1px solid #bbb;
        background: #fcfcfc;
        padding: 3px 15px 3px 12px;
        font-size: 12px;
    }

    .image-container .symbol p{
        color: #026b97;
        margin-left: 5px;
    }

    .image-container .symbol .symbol-icon{
        background: url(../../assets/img/selectIconMenu.png) no-repeat 3px center;
        width: 16px;
        height: 16px;
    }

    .food-info-tab .buttons-container{
        margin-left: 5px;
    }

    .food-info-tab .buttons-container button{
        padding: 3px;
        width: 27px;
        display: flex;
        align-items: center;
        justify-content: center;
        margin-bottom: 5px;
    }
    
    .food-info-tab .buttons-container .delete-icon{
        background: url('../../assets/img/IconSprites/IconSprite.png') no-repeat -2px -2683px;
        width: 12px;
        height: 11px;
    }

    /* tab sở thích phục vụ */

    .food-hobby-tab>p{
        margin-top: 10px;
    }

    .food-hobby-comment{
        display: flex;
        margin-top: 5px;
        font-style: italic;
    }

    .comment-icon{
        background: url('../../assets/img/comment-icon.png') no-repeat 0 0;
        width: 32px;
        height: 32px;
        margin-right: 10px;
    }

    .table-container{
        height: 250px;
        position: relative;
        user-select: none;
        overflow-y: auto;
        width: 100%;
        border: 1px solid #ccc;
        margin-top: 10px;
    }

    table{
        width: 100%;
        background: #fff;
        font-size: 13px;
        border-spacing: 0px;
        padding: 0;
    }

    table thead{
        background: #e9ebee;
        position: sticky;
        z-index: 1;
        
    }

    .table-container tr {
        height: 24px;
    }

    .table-container th {
        height: 30px;
        text-align: center;
        min-width: 150px;
        font-weight: normal;
    }

    .table-container td {
        padding: 0 10px;
        position: relative;
        max-width: 469px;
    }

    .table-container tbody tr:hover {
        background: #e3f1f1;
    }

    .table-container .tr-selected {
        background: #c1ddf1;
    }

    .table-container tr:nth-child(even){
        background: #f7f7f7;
    }

    .table-container th:not(:last-child),
    .table-container td:not(:last-child) {
        border-right: 1px solid #c1c1c1;
        border-bottom: 1px solid #c1c1c1;
    }

    .table-container th:last-child{
        border-bottom: 1px solid #c1c1c1;
    }

    .table-container td:last-child{
        border-bottom: 1px solid #c1c1c1;
    }

    .food-hobby-tab .buttons-container{
        display: flex;
        margin-top: 3px;
    }

    .food-hobby-tab tr .input-section{
        width: 100%;
        height: 100%;
        position: absolute;
        top: 0;
        left: 0;
        max-width: 469px;
    }

    .food-hobby-tab tr .input-section input{
        width: 100%;
        height: 100%;
        outline: none;
        border: 1px solid transparent;
        padding: 0 10px;
        max-width: 469px;
        overflow: hidden;
    }

    .food-hobby-tab tr .input-section input:focus{
        border: 1px solid #0973b9;
    }

    .food-hobby-tab tr .input-section .add-icon{
        background: url('../../assets/img/IconSprites/IconSprite.png') no-repeat 0 -48px;
        width: 15px;
        height: 15px;
        position: absolute;
        top: calc(50% - 8px);
        right: 5px;
        cursor: pointer;
    }

    .food-hobby-tab tr .input-section .dropdown-icon{
        background: url('../../assets/img/IconSprites/trigger.png') no-repeat -73px -9px;
        width: 8px;
        height: 4px;
        position: absolute;
        top: calc(50% - 2px);
        right: 31px;
        cursor: pointer;
    }

    .food-hobby-tab .buttons-container button{
        margin-left: 3px;
    }

    .food-hobby-tab .buttons-container button:nth-child(1){
        padding: 0 8px;
    }

    .food-hobby-tab .buttons-container .delete-icon{
        background: url('../../assets/img/IconSprites/IconSprite.png') no-repeat -2px -2683px;
        width: 12px;
        height: 11px;
        margin-right: 5px;
    }

    .food-hobby-tab .buttons-container .add-icon{
        background: url('../../assets/img/IconSprites/IconSprite.png') no-repeat -1px -2648px;
        width: 14px;
        height: 16px;
        margin-right: 5px;
    }

    .footer .right button{
        margin-left: 8px;
    }

    .footer .insert-and-add-icon{
        background: url('../../assets/img/insert-and-add.png') no-repeat 0 0;
        width: 17px;
        height: 15px;
        margin-right: 5px;
    }

</style>