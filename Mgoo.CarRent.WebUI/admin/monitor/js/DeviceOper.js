function UpdateDevice(DeviceID) {
    //alert(DeviceID);
    //$("#ModalShowDeviceDetail").load("ModalShowOfflineDevice.aspx #DivDeviceInfo", function (response, status, xhr) {
    //    $("#ModalShowDeviceDetail").modal('show', { backdrop: 'static' });
    //    GetDeviceInfoBySerialNumber(DeviceID);
    //    $("#btnDeviceInfoSave").on("click", function () {
    //        SaveDevieInfo(DeviceID);
    //    });
    //});
     editDeviceInfo(DeviceID);
}
function editDeviceInfo(DeviceID) {
    var isDisabled = "disabled";
    if ($("#isSuperAdmin").val() == "1") {
        isDisabled = "";
    }
    var html = [];//disabled
    html.push("<div class=\"row\"><div class=\"col-md-6\"><div class=\"form-group\"><label for=\"field-1\" class=\"control-label\">" + allPage.deviceNo + "</label><input type=\"text\" class=\"form-control\" id=\"txtDeviceIMEI\" placeholder=\"" + allPage.deviceNo + "\"  disabled /></div> </div><div class=\"col-md-6\"><div class=\"form-group\"><label for=\"field-1\" class=\"control-label\">" + allPage.hireExpireTime + "</label> <input type=\"text\" class=\"form-control\" id=\"txtDeviceHireExpireDate\" placeholder=\"" + allPage.hireExpireTime + "\" disabled /></div></div></div>");
    html.push("<div class=\"row\"> <div class=\"col-md-6\"><div class=\"form-group\"><label for=\"field-1\" class=\"control-label\">" + allPage.modelName + "</label><input type=\"text\" class=\"form-control\" id=\"txtDeviceModel\" placeholder=\"" + allPage.modelName + "\" disabled /></div></div> <div class=\"col-md-6\"><div class=\"form-group\"><label for=\"field-2\" class=\"control-label\">" + allPage.deliveryTime + "</label><input type=\"text\" class=\"form-control\" id=\"txtDeviceStartDate\" placeholder=\"" + allPage.deliveryTime + "\" disabled></div></div></div>");
    html.push("<div class=\"row\"> <div class=\"col-md-6\"><div class=\"form-group\"><label for=\"field-1\" class=\"control-label\">" + dealerPage.name3 + "</label>  <input type=\"text\" class=\"form-control\" id=\"txtDeviceName\" placeholder=\"" + dealerPage.name3 + "\"/></div></div><div class=\"col-md-6\"><div class=\"form-group\"><label class=\"cbr-inline\" style =\"margin-top:14px;\">" + productUpdatePage.filterLBS + "<input type=\"checkbox\" id=\"checkDeviceLBS\" class=\"cbr\"/></label></div></div> </div>");
    html.push("<div class=\"row\"><div class=\"col-md-6\"><div class=\"form-group\"><label for=\"field-1\" class=\"control-label\">" + allPage.simNo + "</label><input type=\"text\" class=\"form-control\" id=\"txtDevicePhoneNum\" maxlength=\"15\" placeholder=\"" + allPage.simNo + "\" " + isDisabled + " /></div></div><div class=\"col-md-6\"><div class=\"form-group\"><label for=\"field-2\" class=\"control-label\">" + allPage.overspeed + "(" + allPage.kmHour + ")</label><input type=\"text\" class=\"form-control\" id=\"txtSpeedLimit\" placeholder=\"" + allPage.overspeed + "(" + allPage.kmHour + ")\"/></div></div></div>");
    html.push("<div class=\"row\"><div class=\"col-md-6\"><div class=\"form-group\"><label for=\"field-1\" class=\"control-label\">" + allPage.carNum + "</label><input type=\"text\" class=\"form-control\" id=\"txtDeviceCarNum\" placeholder=\"" + allPage.carNum + "\" /></div></div><div class=\"col-md-6\"><div class=\"form-group\"><label for=\"field-2\" class=\"control-label\">" + allPage.cellPhone + "</label><input type=\"text\" class=\"form-control\" id=\"txtDeviceCallPhone\" placeholder=\"" + allPage.cellPhone + "\"/></div></div></div>");
    html.push("<div class=\"row\"> <div class=\"col-md-6\"><div class=\"form-group\"><label for=\"field-1\" class=\"control-label\">" + allPage.cellName + "</label><input type=\"text\" class=\"form-control\" id=\"txtDeviceCarUserName\" placeholder=\"" + allPage.cellName + "\"/></div></div><div class=\"col-md-6\"><div class=\"form-group\"> <label for=\"field-2\" class=\"control-label\">" + productUpdatePage.oilCoefficient + "</label><input type=\"text\" class=\"form-control\" id=\"txtDevice100KM\" placeholder=\"" + productUpdatePage.oilCoefficient + "\"/></div></div></div>");
    html.push("<div class=\"row\"><div class=\"col-md-12\"><div class=\"form-group\"><p>");
    html.push("<label class=\"radio-inline\"><input type=\"radio\" name=\"radioImg\" checked value=\"3\" /><img src=\"icons/carIcon/point-online.gif\" /></label>");
    html.push("<label class=\"radio-inline\"><input type=\"radio\" name=\"radioImg\" value=\"1\" /><img src=\"icons/carIcon/27.gif\" /></label><label class=\"radio-inline\"><input type=\"radio\" name=\"radioImg\" value=\"2\"/>  <img src=\"icons/carIcon/2.png\" /></label><label class=\"radio-inline\"><input type=\"radio\" name=\"radioImg\" value=\"21\"/><img src=\"icons/carIcon/21.png\" /> </label>");
    html.push("<label class=\"radio-inline\"><input type=\"radio\" name=\"radioImg\" value=\"22\"/><img src=\"icons/carIcon/22.png\" /></label><label class=\"radio-inline\"><input type=\"radio\" name=\"radioImg\" value=\"24\"/><img src=\"icons/carIcon/24.png\" /></label><label class=\"radio-inline\"><input type=\"radio\" name=\"radioImg\" value=\"25\"/>   <img src=\"icons/carIcon/25.png\" /></label> <label class=\"radio-inline\"> <input type=\"radio\" name=\"radioImg\" value=\"23\"/>   <img src=\"icons/carIcon/23.png\" /> </label> ");
    html.push("<label class=\"radio-inline\"> <input type=\"radio\" name=\"radioImg\" value=\"26\"/><img src=\"icons/carIcon/26.gif\" /> </label><label class=\"radio-inline\"><input type=\"radio\" name=\"radioImg\" value=\"30\"/><img src=\"icons/carIcon/30.png\" /></label><label class=\"radio-inline\"> <input type=\"radio\" name=\"radioImg\" value=\"31\"/>   <img src=\"icons/carIcon/31.png\" /></label></p> </div></div></div>  ");
    html.push("<div class=\"row\"><div class=\"col-md-6\"><div class=\"form-group\"><label class=\"col-sm-4 control-label\" for=\"field-4\">" + productUpdatePage.photo + "</label><img src=\"\" id=\"imgDeviceCarImg\" imgName=\"\" style=\"width:100px;height:100px;\" /></div> </div><div class=\"col-md-6\"><div class=\"form-group\"><div class=\"col-sm-5\"><input type=\"file\" class=\"form-control\" onchange=\"uploadImg(this)\" id=\"txtDeviceFileImg\" name=\"txtDeviceFileImg\"/></div> </div></div></div> ");
    html.push("<div class=\"row\"><div class=\"col-md-12\"><div class=\"form-group\"><label for=\"field-3\" class=\"control-label\">" + allPage.desc + "</label><textarea class=\"form-control\" cols=\"5\" id=\"txtDeviceDescription\"></textarea></div></div></div> ");
    var opts = {
        title: allPage.deviceInfo , bodyHtml: html.join(''), showBtnConfirm: true
    };
    var modal = new loadModalWindows(opts);
    modal.LoadModal(function () {
      
    });
    modal.ConfirmClick(function () {
        SaveDevieInfo(DeviceID);
    });
    GetDeviceInfoBySerialNumber(DeviceID);
}
function uploadImg()
{
    alert($("#txtDeviceIMEI").val());
    $.ajaxFileUpload({
        url: '/AjaxService/AjaxService.ashx?action=Upload',//处理图片脚本
        secureuri: false,
        fileElementId: "txtDeviceFileImg",//file控件id、name
        dataType: 'json',
        data: { "imei": $("#txtDeviceIMEI").val() },
        success: function (data, status) {
            if (data.success) {
                $("#imgDeviceCarImg").attr("src", data.src).attr("imgName", data.ImgName);
                toastr.success(data.msg, "提示", opts_success);
            } else {
                toastr.warning(data.msg, "提示", opts_waming);
            }
        },
        error: function (data, status, e) {
            toastr.warning(data.msg, "提示", opts_waming);
        }
    });
}


function loadModalBasic(d, name, type, tr) { 
    if (type == "ResetPassword") {//充值密码
        var modal = new loadModalWindows({ title: allPage.toastrTitle1, showBtnConfirm: true, bodyHtml: cusPage.confirmInitPassMsg1 + name + cusPage.confirmInitPassMsg2 });
        modal.ConfirmClick(function () {
            ResetPassword(d);
            modal.CloseModal();
        });

    } else if (type == "DeleteDevice") { //删除单个设备
        var html = cusPage.delUserConfirm + ":" + name + cusPage.delDeviceConfirm2 + " </br>  ";
        var modal = new loadModalWindows({ title: allPage.toastrTitle1, showBtnConfirm: true, bodyHtml: html });
        modal.ConfirmClick(function () { 
            DeleteDevice(d)
            modal.CloseModal();
        });
    } else if (type == "DeleteUser") {//删除用户
        var modal = new loadModalWindows({ title: allPage.toastrTitle1, showBtnConfirm: true, bodyHtml: cusPage.delUserConfirm + ":" + name + cusPage.delUserConfirm2 });
        modal.ConfirmClick(function () {
            DeleteUser(d)
            modal.CloseModal();
        });
    } else if (type == "DeleteDevices") { //批量删除设备
        var modal = new loadModalWindows({ title: allPage.toastrTitle1, showBtnConfirm: true, bodyHtml: cusPage.delUserConfirm + cusPage.delDeviceConfirm3 + " </br> " });
        modal.ConfirmClick(function () {
            DeleteDevice(d)
            modal.CloseModal();
        });
    } else if (type == "DestroyDevices") {  //已删除设备页面进行删除
        var html = cusPage.delUserConfirm + ":" + name + cusPage.delDeviceConfirm2 + " </br> <label>删除后无法找回！！！</label>";
        var modal = new loadModalWindows({ title: allPage.toastrTitle1, showBtnConfirm: true, bodyHtml: html });
        modal.ConfirmClick(function () {
            DeleteDevice(d,true,tr)
            modal.CloseModal();
        });
    } else if (type == "RecoveryDevices") { 
        var modal = new loadModalWindows({ title: allPage.toastrTitle1, showBtnConfirm: true, bodyHtml: "恢复后可到该设备所属用户下查看，确定要恢复该设备？  </br> <label><input type=\"checkbox\" id=\"ckDestroy\" checked />是否清空所有数据？</label>" });
        modal.ConfirmClick(function () {
            RecoveryDevices(d, tr);
            modal.CloseModal();
        });
    }
}
function ResetPassword(DeviceID) {
    $.ajax({
        url: "AjaxService/AjaxService.ashx?action=ResetPwd",
        type: 'POST',
        dataType: 'json',
        data: { deviceid: DeviceID },
        success: function (res) {
            loading(100);
            if (res.success) {
                toastr.success(cusPage.initPassSuccess, allPage.toastrTitle1, opts_success);
                return false;
            } else {
                toastr.warning(cusPage.initPassError, allPage.toastrTitle2, opts_waming);
                return true;
            }
        }
    });
}

function DeleteDevice(DeviceID,destroy,tr)
{
    loading(50);
    var ck = $("#ckDestroy").is(':checked');
    if (destroy) {
        ck = destroy;
    } 
    $.ajax({
        url: "AjaxService/AjaxService.ashx?action=DeleteDevice",
        type: 'POST',
        dataType: 'json',
        data: { deviceid: JSON.stringify(DeviceID), Destroy: ck },
        success: function (res) {
            loading(100);
            if (res.success) {
                toastr.success(allPage.delSuccess, allPage.toastrTitle1, opts_success);
                if (tr) { 
                    document.getElementById("iframepage").contentWindow.reload();
                    return;
                } 
                if ($.fn.zTree) {
                    var zTree_Menu = $.fn.zTree.getZTreeObj("treeDemo");
                    $("#iframepage").attr("src", "AllDevices.aspx?u=" + zTree_Menu.getSelectedNodes()[0].id);
                } 
            } else {
                toastr.warning(allPage.delFaild, allPage.toastrTitle2, opts_waming);
            } 
        }
    }); 
}
var ligerTree;
function DeviceShiftOrExpire(_type, arr) {
    //title, bodyHtml, showBtnConfirm
    var html = [];
    var title = "";
    html.push("<form role=\"form\" class=\"form-horizontal\"> ");
    if (_type == "shift") {
        title = cusPage.deviceChange;
        html.push(" <div class=\"form-group-separator\" id=\"field-11\">" + cusPage.cusInfo + "</div>  ");
    } else {
        title = cusPage.updateExpTime;
        html.push(" <div class=\"form-group-separator\" id=\"field-11\">" + allPage.updateTime + "</div>  ");
    }
    html.push("<div class=\"form-group-separator\"></div> ");
    html.push("<div class=\"form-group\"> ");
    if (_type == "shift") {
        html.push("<label class=\"col-sm-2 control-label\" for=\"field-1\" style=\"left:20px;\" id=\"lableTitle\">" + cusPage.toCus + "</label>  ");
        html.push("<div class=\"col-sm-6\" id=\"divShift\"> ");
        html.push(" </div> ");
    } else {
        html.push("<label class=\"col-sm-3 control-label\" for=\"field-1\" style=\"left:25px;\" id=\"lableTitle\">" + moneyPage.msg2 + "</label>  ");
        html.push("<div class=\"col-sm-6\" id=\"divExpire\"> ");
        html.push("<input type=\"text\" style=\"width:60px;\" id=\"txtExpireYears\" value=\"365\" /> ");
        html.push("<label class=\"control-label\" for=\"field-1\">" + moneyPage.day + "</label>  ");
        html.push("<div class=\"btn-group\" style=\"top:4px;\"> ");
        html.push("<button type=\"button\" class=\"btn btn-info btn-xs\" name=\"btnYears\">" + moneyPage.oneYeah + "</button> ");
        html.push("<button type=\"button\" class=\"btn btn-info btn-xs\" name=\"btnYears\">" + moneyPage.twoYeah + "</button> ");
        html.push("<button type=\"button\" class=\"btn btn-info btn-xs\" name=\"btnYears\">" + moneyPage.lifelong + "</button> ");
        html.push("</div>  ");
        html.push("<br /> ");
        html.push("</div> ");
    }

    html.push("</div>  ");
    html.push("<div class=\"form-group-separator\">" + allPage.deviceInfo + "</div>  ");
    html.push("<div class=\"form-group-separator\"></div> ");
    html.push("<div class=\"form-group\"> ");
    html.push("<table class=\"table table-bordered table-striped table-condensed table-hover\" id=\"ShiftTable\"> ");
    html.push("<thead> ");
    html.push("<tr> ");
    html.push("<th>" + allPage.deviceName + "</th> ");
    html.push("<th>" + allPage.imeiNo + "</th> ");
    html.push("<th>" + allPage.belongTo + "</th> ");
    html.push("<th>" + allPage.operation + "</th> ");
    html.push("</tr> ");
    html.push("</thead>  ");
    html.push("<tbody> </tbody></table> ");
    html.push("</div></form>  ");

    var opts = {
        title: cusPage.deviceChange,
        bodyHtml: html.join(''),
        showBtnConfirm: true
    };
    var modal = new loadModalWindows(opts);
    var toUserID = -1;
    modal.LoadModal(function () {
        var ligerObj = new ligerTreeObject();
        ligerObj.getLigerTreeData(function (dataList) {
            var treeData = [];
            $(dataList).each(function (k, v) {
                treeData.push({ id: v["UserID"], pid: v["ParentID"], text: v["UserName"], icon: (v.UserType == 1 ? "js/lib/ligerUI/skins/icons/memeber.gif" : "js/lib/ligerUI/skins/icons/customers.gif") });
            });
            if ($(".l-tree").length > 0) {
                $(".l-tree").remove();
            }
            var ComboBox = $("<input type=\"text\" id=\"ligerTree\" style=\" float:left\" onkeyup=\"ligerTreeSearch()\" placeholder=\"输入名称搜索...\"/> ");
            $("#divShift").append(ComboBox).append("</br>"); //.append("<button class=\"btn btn-purple\" type=\"button\" style=\" margin-left:255px;margin-top:-25px\" >搜索</button>")
            ligerObj.ligerTreeInit(ComboBox, treeData, function (newValue) {
                toUserID = newValue;
            });
        });
        var yyyy = 1;
        $("[name=btnYears]").on("click", function () {
            if ($(this).text() == "一年") {
                yyyy = 1;
            } if ($(this).text() == "二年") {
                yyyy = 2;
            } if ($(this).text() == "终身") {
                yyyy = 10;
            }
            $("#txtExpireYears").val(365 * yyyy);
        });
        DeviceShiftTableList(arr);
    });
    modal.ConfirmClick(function () {
        modal.Disabled(); 
        var trs = $("#ShiftTable tbody tr");
        if (trs.length == 0) {
            modal.NoDisabled(); 
            return;
        }
        var days = $("#txtExpireYears").val();
        if ($("#txtExpireYears").length > 0 && isNaN(days)) {
            modal.NoDisabled();
            toastr.warning(moneyPage.msg5, allPage.toastrTitle2, opts_waming);
            return;
        }
        var devices = [];
        for (var i = 0; i < trs.length; i++) {
            devices.push({ "DeviceID": $(trs).eq(i).find("td").eq(0).text() });
        }
        if (_type == "shift" && toUserID < 1) {
            toastr.success(allPage.plsSelUser, allPage.toastrTitle2, opts_waming);
            return;
        }
        $.ajax({
            url: "AjaxService/AjaxService.ashx?action=DeviceShiftOrExpire",
            type: 'POST',
            dataType: 'json',
            data: { "devices": JSON.stringify(devices), "day": days, "toUserID": toUserID, "operType": _type },
            success: function (res) {
                if (res.success) {
                    toastr.success(res.msg, allPage.toastrTitle1, opts_success);
                    modal.CloseModal();
                    $("#iframepage").attr("src", $("#iframepage").attr("src"));
                } else {
                    toastr.warning(res.msg, allPage.toastrTitle1, opts_waming);
                    modal.NoDisabled();
                }
            },
            error: function () { modal.NoDisabled(); alert("_type:ajax.error"); }
        });
    });
}
 
function DeviceShiftTableList(arr)
{
    var html = [];
    for (var i = 0; i < arr.length; i++) {
        var obj = arr[i];
        html.push(" <tr>");
        html.push("<td style=\"display:none;\">" + obj.DeviceID + "</td>");
        html.push("<td>" + obj.DeviceName + "</td>");
        html.push("<td>" + obj.IMEI + "</td>")
        html.push("<td>" + obj.UserName + "</td>")
        html.push("<td><a href=\"#\">" + allPage.deletes + "</a></td>");
        html.push(" </tr>");
    }
    $("#ShiftTable tbody").append(html.join(''));
    $("#ShiftTable tbody a").on("click", function () { 
        $(this).parent().parent().remove();
    }); 
}

function ShiftUsers(arr)
{
    var html = [];
    html.push("<form role=\"form\" class=\"form-horizontal\"> ");
    html.push(" <div class=\"form-group-separator\" id=\"field-11\">" + cusPage.cusInfo + "</div>  ");
    html.push("<div class=\"form-group-separator\"></div> ");
    html.push("<div class=\"form-group\"> ");
    html.push("<label class=\"col-sm-2 control-label\" for=\"field-1\" style=\"left:20px;\" id=\"lableTitle\">" + cusPage.toCus + "</label>  ");
    html.push("<div class=\"col-sm-6\" id=\"divShift\"> ");
    html.push("<input type=\"text\" id=\"ligerTree\" style=\" float:left\" onkeyup=\"ligerTreeSearch()\" placeholder=\"输入名称搜索...\"/>");
    html.push(" </div> </div> "); 
    html.push("<div class=\"form-group-separator\">" + allPage.deviceInfo + "</div>  ");
    html.push("<div class=\"form-group-separator\"></div> ");
    html.push("<div class=\"form-group\"> ");
    html.push("<table class=\"table table-bordered table-striped table-condensed table-hover\" id=\"ShiftUserTable\"> ");
    html.push("<thead> ");
    html.push("<tr> ");
    html.push("<th>客户名</th> ");
    html.push("<th>登录名</th> ");
    html.push("<th>类型</th> ");
    html.push("<th>操作</th> ");
    html.push("</tr> ");
    html.push("</thead>  ");
    html.push("<tbody> ");
    for (var i = 0; i < arr.length; i++) {
        var obj = arr[i];
        html.push(" <tr>");
        html.push("<td style=\"display:none;\">" + obj.UserID + "</td>");
        html.push("<td>" + obj.UserName + "</td>");
        html.push("<td>" + obj.LoginName + "</td>")
        html.push("<td>" + obj.UserType + "</td>")
        html.push("<td><a href=\"#\">" + allPage.deletes + "</a></td>");
        html.push(" </tr>");
    }
    html.push(" </tbody></table> ");
    html.push("</div></form>  ");
   
    var opts = {
        title: cusPage.usersChange,
        bodyHtml: html.join(''),
        showBtnConfirm: true
    };
    var modal = new loadModalWindows(opts);
    var toUserID = -1;
    modal.LoadModal(function () {

        var ligerObj = new ligerTreeObject();
        ligerObj.getLigerTreeData(function (dataList) {
            var treeData = [];
            $(dataList).each(function (k, v) {
                treeData.push({ id: v["UserID"], pid: v["ParentID"], text: v["UserName"], icon: (v.UserType == 1 ? "js/lib/ligerUI/skins/icons/memeber.gif" : "js/lib/ligerUI/skins/icons/customers.gif") });
            });
            if ($(".l-tree").length > 0) {
                $(".l-tree").remove();
            }
            var ComboBox = $("<input type=\"text\" id=\"ligerTree\" style=\" float:left\" onkeyup=\"ligerTreeSearch()\" placeholder=\"输入名称搜索...\"/> ");
            $("#divShift").append(ComboBox).append("</br>"); //.append("<button class=\"btn btn-purple\" type=\"button\" style=\" margin-left:255px;margin-top:-25px\" >搜索</button>")
            ligerObj.ligerTreeInit(ComboBox, treeData, function (newValue) {
                toUserID = newValue;
            });
        }); 
        $("#ShiftUserTable tbody a").on("click", function () {
            $(this).parent().parent().remove();
        });
       
        //this.ligerObj = ligerObj;
    });
    modal.ConfirmClick(function () {
        modal.Disabled(); 
        var trs = $("#ShiftUserTable tbody tr");
        if (trs.length == 0) {
            modal.NoDisabled();
            return;
        } 
        var userids = [];
        for (var i = 0; i < trs.length; i++) {
            userids.push({ "UserID": $(trs).eq(i).find("td").eq(0).text() });
        }
        if ( toUserID < 1) {
            toastr.success(allPage.plsSelUser, allPage.toastrTitle2, opts_waming);
            return;
        } 
        $.ajax({
            url: "AjaxService/AjaxService.ashx?action=shiftusers",
            type: 'POST',
            dataType: 'json',
            data: { "UserID": JSON.stringify(userids), "toUserID": toUserID },
            success: function (res) {
                if (res.success) {
                    toastr.success(res.msg, allPage.toastrTitle1, opts_success);
                    modal.CloseModal();
                    $("#iframepage").attr("src", $("#iframepage").attr("src"));
                    location.reload();
                   // var treeObj = $.fn.zTree.getZTreeObj("treeDemo");
                   //  treeObj.reAsyncChildNodes(null, "refresh");
                } else {
                    toastr.warning(res.msg, allPage.toastrTitle1, opts_waming);
                    modal.NoDisabled();
                }
            },
            error: function () { modal.NoDisabled(); alert("_type:ajax.error"); }
        });
    });
}

///恢复已删除的设备
function RecoveryDevices(deviceidData,tr)
{
    var ck = $("#ckDestroy").is(':checked');
    loading(50);
    $.ajax({
        url: "AjaxService/AjaxService.ashx?action=RecoveryDevices",
        type: 'POST',
        dataType: 'json',
        data: { data: JSON.stringify(deviceidData), isClaerAll: ck },
        success: function (res) {
            loading(100);
            if (res.success) {
                toastr.success(res.msg, allPage.toastrTitle1, opts_success);
                $(tr).parent().parent().remove();
            } else {
                toastr.warning(res.msg, allPage.toastrTitle2, opts_waming);
            }
        }
    });
}

function UpdateUserInfo(obj)
{
    $("#ModalShowDeviceDetail").load("ModalShowOfflineDevice.aspx #DivDeviceUpdateUserInfo", function (response, status, xhr) {
        $("#ModalShowDeviceDetail").modal('show', { backdrop: 'static' });
        var _UserID = $(obj).parent().parent().attr("UserID");
        $.ajax({
            url: "AjaxService/AjaxService.ashx?action=GetUserInfoByUserid",
            type: 'POST',
            dataType: 'json',
            data: { UserID: _UserID },
            success: function (res) {
                res = res[""]; 
                if (res.length > 0) { 
                    $("#txtDeviceUserName").val(res[0].UserName);
                    $("#txtDeviceLoginName").val(res[0].LoginName);
                    $("#txtDeviceContacts").val(res[0].FirstName);
                    $("#txtDeviceAddress").val(res[0].Address1); 
                    $("input[name=UserTypeDevice][value=" + res[0].UserType + "]").attr("checked", 'checked'); 
                    $("#txtDevicePhone").val(res[0].CellPhone);
                   
                }
            },
            error: function () { }
        });

        $("#btnDeviceSaveUserInfo").on("click", function () {
            var UserInfoData = {
                UserID: _UserID,
                UserName: $("#txtDeviceUserName").val(), 
                FirstName: $("#txtDeviceContacts").val( ),
                Address1: $("#txtDeviceAddress").val( ),
                UserType: $("input[name=UserTypeDevice]:checked").val(),
                CellPhone: $("#txtDevicePhone").val()
            } 
            $.ajax({
                url: "AjaxService/AjaxService.ashx?action=UpdateUserInfo",
                type: 'POST',
                dataType: 'json',
                data: { data: JSON.stringify(UserInfoData)},
                success: function (res) {
                    if (res.success) {
                        toastr.success("    修改信息成功！", allPage.toastrTitle1, opts_waming);
                        $("#btnDeviceUserInfoClose").trigger("click");
                    } else {
                        toastr.warning("    修改信息失败！", allPage.toastrTitle2, opts_waming);
                    }
                },
                error: function () { }
            });
        });
    });
    
    
}

function DeleteUser(uid)
{ 
    $.ajax({
        url: "AjaxService/AjaxService.ashx?action=DeleteUser",
        type: 'POST',
        dataType: 'json',
        data: { UserID: uid },
        success: function (res) {
            loading(100);
            if (res.success) {
                toastr.success(res.msg, allPage.toastrTitle1, opts_success); 
                $("#iframepage").attr("src", "AllDevices.aspx?u=" + zTree_Menu.getSelectedNodes()[0].id);
            } else {
                toastr.warning(res.msg, allPage.toastrTitle1, opts_waming);
            }

        }
    });
}

function addUsers(parentUserID,parentUserName)
{
    $("#ModalShowDeviceDetail").load("ModalShowOfflineDevice.aspx #DivAddUsers", function (response, status, xhr) {
        $("#ModalShowDeviceDetail").modal('show', { backdrop: 'static' });
        $("#txtParentUserName").val(parentUserName); 
        // alert($("#txtNewLoginName").val());
        $("#benAddUsersSave").on("click", function () {
            var err = 0;
            err += check("txtNewUserName", 20, "名称不能为空且不能超过20个长度");
            err += check("txtNewLoginName", 20, "登录名不能为空且不能超过20个长度");
            err += check("txtNewUserPassword", 20, "密码不能为空且不能超过20个长度");
            if (err > 0) { 
                return;
            }
            if ($("#txtNewUserPassword").val() != $("#txtNewUserPassword1").val()) {
                toastr.warning("两次输入的密码不一致，请重新输入", allPage.toastrTitle1, opts_waming); return;
            }
            var addUserType = $("input[name=cbrAddUserType]:checked").val();
            $.ajax({
                url: "AjaxService/AjaxService.ashx?action=addUsers",
                type: 'POST',
                dataType: 'json',
                data: {
                    ParentUserID: parentUserID, UserName: $("#txtNewUserName").val(), LoginName: $("#txtNewLoginName").val(), Password: $("#txtNewUserPassword").val(), UserType: addUserType,
                    Phone: $("#txtNewPhone").val(), Address: $("#txtNewAddress").val(), Contacts: $("#txtNewContacts").val()
                },
                success: function (res) {
                    if (res.success) {
                        toastr.success(res.msg, allPage.toastrTitle1, opts_success);
                        window.location.href = "Devices.aspx?userid=" + parentUserID;
                    } else {
                        toastr.warning(res.msg, allPage.toastrTitle1, opts_waming);
                    } 
                }
            });
        }); 
    });
}
function check(id,length,msg)
{
    if ($("#" + id).val() == "" || $("#" + id).val().length > length) {
        toastr.warning(msg, allPage.toastrTitle1, opts_waming);
        return 1;
    } else {
        return 0;
    }
}

function newImeiBatchSearch() {
    var SingletonModal;
    function getModal() { 
        if (SingletonModal == undefined) {
            var html = [];
            html.push('<textarea class="form-control" id="txtImeis" rows="10" cols="30" placeholder="请输入IMEI号，如有多个一行一个。"></textarea> ');
            SingletonModal = new loadModalWindows({
                title: allPage.ImeiBatchSearch, showBtnConfirm: true, bodyHtml: html.join(''), cache: true
            }); 
        }
        return SingletonModal;
    }
    return getModal();
}
 
///按IMEI号批量查询
function searchImeiBatch(uid) {
    $("#newImeiBatchSearch").modal('show', { backdrop: 'static' });
    $("#btnModalSearchConfirm").attr("userid", uid);
}

function ModalSearchConfirm() {
    var uid = $("#btnModalSearchConfirm").attr("userid");
    var type = $("#searchtab li.active").attr("value");
    $.ajax({
        url: "AjaxService/AjaxService.ashx?action=ImeiBatch",
        type: 'POST',
        dataType: 'text',
        data: { Imeis: JSON.stringify({ type: type, imeis: $("#txtImeis").val() }), userid: uid },
        success: function (res) {
            $("#btnModalSearchClose").trigger("click");
            $("#iframepage").attr("src", "AllDevices.aspx?u=" + uid);
        }
    });
}

function ligerTreeObject() { 
    this.UserID;
}
ligerTreeObject.prototype.getLigerTreeData = function (callback) {
    callback = callback || function () { }; 
    if (window.top.StorageTree) { 
        callback(window.top.StorageTree)
        return ;
    }
   
    $.ajax({
        url: "/AjaxService/AjaxService.ashx?action=getTree",
        type: 'POST',
        dataType: 'json',
        data: {},
        success: function (dataList) {
            window.top.StorageTree = dataList[""];
            callback(dataList[""]);
        }
    });
}
ligerTreeObject.prototype.ligerTreeInit = function (comboBox, treeData,callback)
{
    $(comboBox).attr("autocomplete","off");
    callback = callback || function () { };
    var _this = this;
    ligerTree = $(comboBox).ligerComboBox({
        width: 250,
        hideOnLoseFocus: false,
        resize: true,
        selectBoxWidth: 300,
        selectBoxHeight: 400,
        valueField: 'text',
        treeLeafOnly: false,
        onSelected: function (newvalue) {
            var manager = $(".l-tree").ligerGetTreeManager();
            var note = manager.getSelected();
            _this.UserID = note.data.id;
            callback(note.data.id);
        },
        tree: { data: treeData, checkbox: false, idFieldName: 'id', parentIDFieldName: 'pid', isExpand: 2, treeLine: true } //（ parentIcon父节点图标  ，childIcon子节点图标） or iconFieldName 图标字段名 ;isExpand展开到第几级
    });
    //l-box-select-inner  下拉树的容器 class
    $(comboBox).attr("readonly", false);
    $(".l-tree").css({ "width": "100%" });
    $(".l-box-select-inner").css({ "height": "200px" });
    $(".l-tree .l-tree-icon-none img").css({ "width": "16px", "height": "16px", "margin": "3px" });
} 
ligerTreeObject.prototype.onChange = function (callback) {
    callback = callback || function () { };
    callback(this.UserID);
}
ligerTreeObject.prototype.getSelectUserID = function () {
    return this.UserID;
}
var AllpId = [];
function foo(node,hideText)
{ 
    var tree = node.children("li"); 
    for (var i = tree.length-1; i >= 0 ; i--) {
         var treeNode = $(tree[i]);
         var nodeText = $(treeNode).children("div").children("span").text(); 
        // if (nodeText.toLowerCase().indexOf(hideText.toLowerCase()) < 0) {
             //if ($(treeNode).children("ul").children("li").length == 0) {
                // $(treeNode).hide(); 
            // }
        // }
         if (nodeText.toLowerCase().indexOf(hideText.toLowerCase()) >= 0) {
             AllpId.push($(treeNode).attr("id"));
             ligerTreeGetParentID(treeNode);
         } 
         if ($(treeNode).children("ul").children("li").length > 0) {
             foo($(treeNode).children("ul"), hideText)
         } 
     }

}

function ligerTreeAllShow(node)
{
    var tree = node.children("li"); 
    for (var i = 0; i < tree.length; i++) {
        var treeNode = $(tree[i]); 
        $(treeNode).show(); 
        if ($(treeNode).children("ul").children("li").length > 0) {
            ligerTreeAllShow($(treeNode).children("ul"))
        }
    }
}
var timeout;
function ligerTreeSearch() {
    if (timeout) {
        clearTimeout(timeout);
    }
    timeout = setTimeout(function () {
        var tree = $(".l-box-select-inner").children("ul");
        //展开所有节点
        $(".l-tree").ligerTree().expandAll();
        $(".l-trigger-icon").on("click", function () {
            ligerTreeAllShow(tree);
        });
        var searchText = $("#ligerTree").val();

        if (searchText != "") {
            ligerTreeAllShow(tree)
            foo(tree, searchText);
            if (AllpId.length > 0) {
                var t = $(".l-box-select-inner").find("li");
                for (var i = 0; i < t.length; i++) {
                    if (AllpId.indexOf($(t[i]).attr("id")) < 0) {
                        $(t[i]).hide();
                    }
                }
            }
            AllpId = [];
        } else {
            ligerTreeAllShow(tree);
        }
    }, 400);
}

function ligerTreeGetParentID(node)
{
    var pId = $(node).parent().parent().attr("id"); 
    if ($(node).parent().parent().attr("outlinelevel")>1) {
        ligerTreeGetParentID($(node).parent().parent());
    }
    if (AllpId.indexOf(pId) < 0) {
        AllpId.push(pId);
    }
    
}
