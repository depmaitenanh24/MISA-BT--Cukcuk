const ErrorMessage = Object.freeze({
    errMsg_FoodCode_Null: "Mã món ăn không được để trống",
    errMsg_FoodName_Null: "Tên món ăn không được để trống",
    errMsg_FoodUnitName_Null: "Tên đơn vị không được để trống",
    errMsg_FoodSellPrice_Null: "Giá bán không được để trống",
    errMsg_FoodUnitName_Invalid: "Tên đơn vị không có trong danh mục",
    errMsg_FoodPlaceName_Invalid: "Tên nơi chế biến không có trong danh mục",
    errMsg_FoodGroupName_Null: "Tên nhóm thực đơn không được để trống",
    errMsg_FoodPlaceName_Null: "Tên nơi chế biến không được để trống",
    errMsg_FoodHobbyName_Null: "Tên sở thích phục vụ không được để trống",
    errMsg_FoodGroupName_Duplicate: "Tên nhóm thực đơn đã tồn tại trong hệ thống",
    errMsg_FoodUnitName_Duplicate: "Tên đơn vị đã tồn tại trong hệ thống",
    errMsg_FoodPlaceName_Duplicate: "Tên nơi chế biến đã tồn tại trong hệ thống",
    errMsg_FoodHobbyName_Duplicate: "Sở thích phục vụ đã tồn tại trong hệ thống",
    errMsg_FoodGroupName_Invalid: "Tên nhóm thức ăn không có trong danh mục",
    errMsg_FoodHobbyList_Duplicate: "Sở thích phục vụ không được trùng",
    errMsg_FoodHobbyList_Invalid: "Tên sở thích phục vụ không được trống khi có thu thêm",
    errMsg_Image_Null: "Ảnh không được trống",
    errMsg_Image_Invalid: "Ảnh không đúng định dạng",
    errMsg_Image_Overload: "Ảnh không được vượt quá kích thước cho phép",
    errMsg_FoodCode_Duplicate: (code) => {
        return `Mã <${code}> đã tồn tại trong hệ thống`
    }
})

export default ErrorMessage;