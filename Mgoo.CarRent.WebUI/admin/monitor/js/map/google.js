var CurrentSelectDevice = null;
var isAutoSetZoom = true;
var z_index = 0;
var temp = "";
var lastDeviceID = 0;
var lastDeviceName = "";
var DeviceTitleArray = new Array();
var main = {
     time : 0,
    tempIsPostBack : 0,
    zTreeInit: function  () {
     var setting = {
            view: {
                showLine: false,
                showIcon: true,
                selectedMulti: false,
                dblClickExpand: false,
                addDiyDom: this.addDiyDom
            },
            data: {
                simpleData: {
                    enable: true
                }
            },
            callback: {
                beforeClick: this.beforeClick
            }
        };
     var zNodes = new Array();
     $.ajax({
         url: "/api/Monitor/GetUserList",
         type: 'POST',
         dataType: 'json',
         data: {},
         success: function (res) {
             var i = 0;
             if (res.code != 0) {
                 layer.msg("没查询到数据");
                 return;
             }
             var dataList = res.result;
             $(dataList).each(function (k, v) {
                 zNodes[i] = { id: v["UserID"], pId: v["ParentID"], name: v["UserName"], icon: (v.UserType == 1 ? "js/lib/ligerUI/skins/icons/memeber.gif" : "js/lib/ligerUI/skins/icons/customers.gif") };
                 i++;
             });
             var treeObj = $("#treeDemo");
             zTree = $.fn.zTree.init(treeObj, setting, zNodes);
             zTree_Menu = $.fn.zTree.getZTreeObj("treeDemo");
             treeObj.addClass("showIcon");
             if ($("#txtAppointUserID").val()) {
                 curMenu = zTree_Menu.getNodeByParam("id", $("#txtAppointUserID").val(), null);
                 zTree_Menu.selectNode(curMenu);
                 //setting.callback.beforeClick = beforeClick; 
                 main.beforeClick($("#txtAppointUserID").val(), curMenu);
                 $("#txtAppointUserID").val("");
             } else {

                 curMenu = zTree_Menu.getNodes()[0];
                 zTree_Menu.selectNode(curMenu);
                 zTree_Menu.expandNode(curMenu);
             }
            main. RefreshTime();
         }
     });

    }
    , addDiyDom: function (treeId, treeNode) {
        var spaceWidth = 5;
        var switchObj = $("#" + treeNode.tId + "_switch"),
        icoObj = $("#" + treeNode.tId + "_ico");
        switchObj.remove();
        icoObj.before(switchObj);
        if (treeNode.level > 1) {
            var spaceStr = "<span style='display: inline-block;width:" + (spaceWidth * treeNode.level) + "px'></span>";
            switchObj.before(spaceStr);
        }
    }
    , beforeClick: function (treeId, treeNode) {
        var data = {};
        if (treeNode != null) {
            data.userid = treeNode.id;
            if (treeNode.icon.indexOf("customers") > 0) {
                //经销商
                $("#chkLowerDevice").parent().hide();
            } else {
                //用户
                $("#chkLowerDevice").parent().show();
            }
        } else {
            data.imei = treeId;
        }
        if ($("#chkLowerDevice").length && $("#chkLowerDevice").attr("checked") == "checked") {
            data.LowerDevice = "true";
        }
       
        $.ajax({
            url: "/api/Monitor/GetDevicesList",
            type: "get",
            dataType: "json",
            data: data,
            error: function (error) {
                // jQuery('#modal-4').modal('show', { backdrop: 'static' });
            },
            success: function (res) { 
                if ((treeNode != null && treeId == "treeDemo") || treeId == 1 || treeId == -1 || treeId == 0 || treeNode == null) {
                    main.addDeviceList(res.result, treeId);
                }
            }
        });
        return true;
    }
    , addDeviceList: function (data, isPostBack) {
        if (isPostBack != "0") {
            main.addDeviceLi(data, isPostBack);

           main. GetGroup();

            if (isPostBack == "0") { //自动刷新 
                var deviceLenth = $("a[line]").length; //当前页面有多少台
                var dataLength = data.length; // 返回多少台
                if (deviceLenth != dataLength) {
                    $("#devicesDIV").html("");
                    main.addDeviceLi(data, isPostBack);
                } else {
                    main.refreshDeviceLi(data);
                }
            }
            if (isFlag) {
                menuClick(currentLineStatus, 2);
            }
            $("#btnDeviceAll").text(allPage.all + "(" + $("a[line]").length + ")");
            $("#btnDeviceOnline").text(allPage.online + "(" + $("a[line=online]").length + ")");
            $("#btnDeviceOffline").text(allPage.offline + "(" + $("a[line=offline]").length + ")");
            $("#btnDeviceNotActive").text(allPage.status1 + "(" + $("a[line=notactive]").length + ")");

            main.addMarker(data, isPostBack);
        }
    }
    , RefreshTime: function (loginType, imei) {
        if (this.time < 0) {
            if (loginType == 1) {
                //IMEI账号登录
                this.beforeClick(imei, null);
            } else {
                if (zTree != null && zTree.getSelectedNodes().length > 0) {

                    if (this.tempIsPostBack == 0) {
                       this. beforeClick(1, zTree.getSelectedNodes()[0]);
                       this.tempIsPostBack = 1;
                    }
                    else {
                        this.beforeClick(0, zTree.getSelectedNodes()[0]);
                    }
                }
            }
            this.time = 10;
        }
        $("#div_refreshTime").text(" " + this.time + trackingPage.secondMsg);
        this.time--;
        if (loginType == 1) {
            setTimeout("main.RefreshTime('" + loginType + "'," + imei + ")", 1000);
        }
        else {
            setTimeout("main.RefreshTime()", 1000);
        }
    }
    , addDeviceLi: function (data, isPostBack) {
        isFlag = false;
        $("#s2example-1").empty().append("<option></option> ");
        $("#devicesDIV").html("").parent().scrollTop(0);
        var groupList = new Array();
        var i = 0;
        for (var j = data.length - 1; j >= 0 ; j--) {
            v = data[j];
            var deviceName = "";
            
            if (groupList.indexOf(v["GroupID"]) < 0) {  //设备列表分组
                var groupName = v["GroupID"] == -1 ? mapPage.defaultGroup : v["GroupName"]
                $("#devicesDIV").append(" <a href='#' name='aGroup' onmouseenter=\"main.aGroupMouseenter(this)\" onmouseleave=\"main.aGroupMouseleave(this)\" id='groupid_" + v["GroupID"] + "' style='padding-left:20px;font-size:12px;font-weight:bold;'> <em class='mrfz' onclick='devicesGroupClick(" + v["GroupID"] + ")'>" + groupName + "</em> </a>");
                $("#s2example-1").append("<optgroup id=\"optgroup_" + v["GroupID"] + "\" label=\"" + groupName + "\"> 	</optgroup>");
                groupList[i] = v["GroupID"]; i++;
            }
            deviceName = v["DeviceName"];
            if (deviceName.length <= 0)
                deviceName = v["SerialNumber"];
            var status = "", line = "offline";
            var speed = "<span class='label-purple pull-right spanSize' style=\"color:#7720CF;\">" + allPage.stopCar + "-" + MinuteToHour(v["StopTime"], "M") + "</span>";
            if (v["Speed"] > 7) {
                speed = " <span class='label-secondary pull-right spanSize ' style=\"color:#68B828;\">" + allPage.moving + "-" + v["Speed"] + "</span>";
            }
         
            if (v.Status == "" || v.Status == 0) { 
                line = "notactive";
                speed = " <span class='label-secondary pull-right spanSize' style=\"color:#4F4F4F;\">" + allPage.status1 + "</span>";
            }
            var statusSpan = "class='user-status is-offline'";
            if (v["Status"] != "" && parseInt(v["Status"]) < v.OffLineMi) { //超过20分钟算离线

                status = "color:#02A00A;"; line = "online";
                statusSpan = "class='user-status is-online'";
            }
            if (v["Status"] != "" && parseInt(v["Status"]) > v.OffLineMi) {
                status = "color:#4F4F4F";
                speed = "<span class='label-secondary pull-right spanSize' style=\"color:#777777;\" OfflineTime=\"" + v["OfflineTime"] + "\">" + allPage.offline + "-" + MinuteToHour(v["OfflineTime"], "M") + "</span>";
            }
            var hire = DateDiff(GetCurrentDate(), v.HireExpireDate);
            var aTitle = "";
            if (hire <= 7 && hire > 0) {
                status = "color:#F6A418"; aTitle = " title='还有" + parseInt(hire) + "天过期'";
            }
            if (deviceName != "") {
               
                $("#groupid_" + v["GroupID"]).after("<a href='#' id='a_device_" + v["SerialNumber"] + "' index='"+j+"' " + aTitle + " name='device_" + v["GroupID"] + "' line='" + line + "' style='padding-left:30px;width:100%;" + status + "'><span " + statusSpan + "></span><em>" + deviceName + "</em> " + speed + " </a>   ");
                $("#optgroup_" + v["GroupID"]).append("<option value=\"" + v["SerialNumber"] + "\">" + deviceName + "/" + v["SerialNumber"] + "</option>");
                
                $("#a_device_" + v.SerialNumber).on("click", function () {
                  
                    var vv = data[ $(this).attr("index")]
                    main.deviceListOnClick(this, vv);
                });
            }
        } 
        if (groupList.length == 0 || $("#groupid_-1").length == 0) {
            $("#devicesDIV").prepend("<a href='#' name='aGroup' id='groupid_-1' style='padding-left:20px;font-size:12px;font-weight:bold;'><em class='mrfz'>" + mapPage.defaultGroup + "</em><em>(0)</em></a>");
        }
        for (var i = 0; i < groupList.length; i++) {
            $("#groupid_" + groupList[i]).append("<em onclick='devicesGroupClick(" + groupList[i] + ")'>(" + $("[name=device_" + groupList[i] + "]").length + ")</em>");
        }
        if ($("#txtImei").val() != "") {
            main.menuClick(1, $("#btnDeviceOnline"), -2);
        } else {
            main.menuClick(currentLineStatus, $("#btnDeviceOnline"), isPostBack);
        }
    }
    , refreshDeviceLi: function (data) {
        $.each(data, function (k, v) {
            var line = "";
            var color = "";
            var status = "";
            if (v["Speed"] > 7) {
                $("#a_device_" + v["SerialNumber"] + " span:eq(1)").text(allPage.moving + "-" + v["Speed"]).removeClass().addClass("label-secondary pull-right spanSize"); //.tr:first
            }
            if (v["Speed"] < 7 && v["Status"] != "") {
                if (v["StopTime"] > 1)
                    $("#a_device_" + v["SerialNumber"] + " span:eq(1)").text(allPage.stopCar + "-" + MinuteToHour(v["StopTime"], "M")).removeClass().addClass("label-purple pull-right spanSize");
                else
                    $("#a_device_" + v["SerialNumber"] + " span:eq(1)").text(allPage.stopCar).removeClass().addClass("label-purple pull-right spanSize");
                color = "#7720CF";
            }
            if (v["Status"] == "") {
                line = "notactive";
                color = "#4F4F4F";
                $("#a_device_" + v["SerialNumber"] + " span:eq(1)").text(allPage.status1).removeClass().addClass("label-secondary pull-right spanSize");
            }
            if (v["Status"] != "" && parseInt(v["Status"]) < v.OffLineMi) {
                status = "#02A00A"; line = "online";
                $("#a_device_" + v["SerialNumber"] + " span:eq(0)").removeClass().addClass("user-status is-online");
            }
            if (v["Status"] != "" && parseInt(v["Status"]) > v.OffLineMi) {
                line = "offline";
                color = "#777777"; status = "#4F4F4F";
                $("#a_device_" + v["SerialNumber"] + " span:eq(0)").removeClass().addClass("user-status is-offline");
                $("#a_device_" + v["SerialNumber"] + " span:eq(1)").attr("OfflineTime", v["OfflineTime"]).text(allPage.offline + "-" + MinuteToHour(v["OfflineTime"], "M")).removeClass().addClass("label-secondary pull-right spanSize");
            }
            var hire = DateDiff(GetCurrentDate(), v.HireExpireDate);
            $("#a_device_" + v["SerialNumber"]).attr("line", line);
            $("#a_device_" + v["SerialNumber"] + " span:eq(1)").css("color", color);
            if (hire <= 7 && hire > 0) {
                status = "color:#F6A418";
            }
            $("#a_device_" + v["SerialNumber"] + " em:eq(0)").css("color", status);
            if (currentLineStatus != 1)
                isFlag = true;
        });

    }
    , addMarker: function (data, isPostBack) {
        if (isPostBack != 0) {
            mgoo.clearOverlays();
        }
        var len = data.length;
        var markers = [];
        var ii = 0;
        for (var i = 0; i < len; i++) {
            var ii = i;
            var v = data[i];
            var lat = v.Lat, lng = v.Lng;
            if (lat == 0 || lat == -1) {
                continue;
            }
            v.DeviceName = v.DeviceName || v.SerialNumber;
            
            var marker = new Marker({ map: mgoo.map, lat: lat, lng: lng, course: v.Course, DeviceID: v.DeviceID, mapType: mgoo.mapType, titleText: v.DeviceName });
            var opts = {
                icon: "icons/carIcon/point-online.gif",
                showTitle:true
            };
            marker.show(opts);
           
            var a_device_id = "a_device_" + v.SerialNumber;
            marker.i = i;
            marker.addEventListener("click", function (m) {
               
                $("#a_device_" + data[m.i].SerialNumber).trigger("click");
            });
          
            if (CurrentSelectDevice != null && CurrentSelectDevice == "a_device_" + v.SerialNumber) {
                isAutoSetZoom = false;
                $("#a_device_" + v.SerialNumber).triggerHandler("click");
            }
            markers.push(marker.marker);
            DeviceTitleArray[v.DeviceID] = new PopupMarker({
                position: new google.maps.LatLng(v.Lat, v.Lng),
                map: mgoo.map,
                icon: "js/map/images/1px.png",
                text: v.DeviceName || v.SerialNumber,
                showpop: true,
                id: v.DeviceID
            });
        }
        
        mgoo.setFitView(markers); 
    }
    , menuClick: function (obj, btn, isPostBack)
    {
        currentLineStatus = obj;

        if (isPostBack == -1) {
            return;
        }
        $("[name=btnDeviceStatus]").css("background-color", "#FFFFFF");
        var line = "";
        var offlineCount = $("a[line=offline]").length;
        var onlineCount = $("a[line=online]").length;
        var notactiveCount = $("a[line=notactive]").length;
        var allcount = $("a[line]").length;
        //console.log("离线：" + offlineCount + "，在线：" + onlineCount + "，未激活：" + notactiveCount + ",allcount：" + allcount);
        var showHideTime;
        if (allcount < 200) {
            showHideTime = 1000
        }
        switch (currentLineStatus) {
            case 2:
                $("a[line=offline]").hide(showHideTime);
                $("a[line=online]").show(showHideTime);
                $("a[line=notactive]").hide(showHideTime);
                $("#btnDeviceOnline").css("background-color", "#CCCCCC");
                line = "=online";
                break;
            case 3:
                $("a[line=offline]").show(showHideTime);
                $("a[line=online]").hide(showHideTime);
                $("a[line=notactive]").hide(showHideTime);
                $("#btnDeviceOffline").css("background-color", "#CCCCCC");
                var groups = $("[name=aGroup]");
                for (var i = 0; i < groups.length; i++) {
                    var groupid = $(groups[i]).attr("id").split('_')[1];
                    var offline = $("a[name=device_" + groupid + "][line=offline]");
                    for (var j = 0; j < offline.length; j++) {
                        for (var k = j; k < offline.length ; k++) {
                            if (parseFloat($(offline[j]).find("span").eq(1).attr("OfflineTime")) < parseFloat($(offline[k]).find("span").eq(1).attr("OfflineTime"))) {
                               main. swapRow(groupid, j, k);
                                offline = $("a[name=device_" + groupid + "][line=offline]");
                            }
                        }
                    }
                }
                line = "=offline";
                break;
            case 4:
                $("a[line=notactive]").show(showHideTime);
                $("a[line=offline]").hide(showHideTime);
                $("a[line=online]").hide(showHideTime);
                $("#btnDeviceNotActive").css("background-color", "#CCCCCC");
                line = "=notactive";
                break;
            case 1:
                if (isPostBack != -2) {
                    var zTree = $.fn.zTree.getZTreeObj("treeDemo");
                    if (zTree != null && zTree.getSelectedNodes().length > 0) {
                        main.beforeClick(-1, zTree.getSelectedNodes()[0]);
                    }
                    $("#btnDeviceAll").css("background-color", "#CCCCCC");
                    line = "";
                }
                break;
            default:
                break;
        }
        var groups = $("[name=aGroup]");
        for (var i = 0; i < groups.length; i++) {
            var groupid = $(groups[i]).attr("id").split('_')[1];
            $(groups[i]).find("em").eq(1).text("(" + $("a[name=device_" + groupid + "][line" + line + "]").length + ")");
        }
    }
    , devicesGroupClick: function (GroupID) {
        var showHideTime;
        var allcount = $("a[line]").length;
        if (allcount < 200) {
            showHideTime = 1000
        }
        if (currentLineStatus == "3") {
            if ($("[name=device_" + GroupID + "][line=offline]").is(":hidden"))
                $("[name=device_" + GroupID + "][line=offline]").show(showHideTime);
            else {
                $("[name=device_" + GroupID + "][line=offline]").hide(showHideTime);
            }
        } else if (currentLineStatus == "2") {
            if ($("[name=device_" + GroupID + "][line=online]").is(":hidden"))
                $("[name=device_" + GroupID + "][line=online]").show(showHideTime);
            else {
                $("[name=device_" + GroupID + "][line=online]").hide(showHideTime);
            }
        } else if (currentLineStatus == "4") {
            if ($("[name=device_" + GroupID + "][line=notactive]").is(":hidden"))
                $("[name=device_" + GroupID + "][line=notactive]").show(showHideTime);
            else {
                $("[name=device_" + GroupID + "][line=notactive]").hide(showHideTime);
            }
        } else {
            if ($("[name=device_" + GroupID + "]").is(":hidden")) {
                $("[name=device_" + GroupID + "]").show(showHideTime);
            } else {
                $("[name=device_" + GroupID + "]").hide(showHideTime);
            }
        }

    }
    , GetGroup: function () {
        var zTree = $.fn.zTree.getZTreeObj("treeDemo");
        if (zTree != null && zTree.getSelectedNodes().length <= 0)
            return;
        $.ajax({
            url: "/api/Monitor/GetGroupsList",
            type: "get",
            dataType: "json",
            data: { "userid": zTree.getSelectedNodes()[0].id },
            error: function (err) { },
            success: function (res) {
                res = res.result;
                $.each(res, function (k, v) {
                    if ($("#groupid_" + v["GroupID"]).length <= 0) {
                        $("#devicesDIV").append(" <a href='#' name='aGroup' onmouseenter=\"main.aGroupMouseenter(this)\" onmouseleave=\"main.aGroupMouseleave(this)\" id='groupid_" + v["GroupID"] + "' style='padding-left:20px;font-size:12px;font-weight:bold;'> <em class='mrfz' onclick='devicesGroupClick(" + v["GroupID"] + ")'>" + v["GroupName"] + "</em> </a>");
                        $("#groupid_" + v["GroupID"]).append("<em onclick='devicesGroupClick(" + v["GroupID"] + ")'>(" + $("[name=device_" + v["GroupID"] + "]").length + ")</em>");
                    }
                });
            }
        });
    }
    , AddDeviceGps: function  () {
        $("#ModalShowDeviceDetail").load("ModalShowOfflineDevice.aspx #DivAddDevicesGPS", function (response, status, xhr) {
            $("#ModalShowDeviceDetail").modal('show', { backdrop: 'static' });
            $("#tabAddDevicesGPSTable tbody").empty();
            $("#selAddDevicesGpsDeviceList").select2({
                placeholder: allPage.search1,
                allowClear: true
            }).on('select2-open', function () {
                // Adding Custom Scrollbar
                $(this).data('select2').results.addClass('overflow-hidden').perfectScrollbar();
            }).change(function () {
                //console.log($(this).val())
                var text = $("#selAddDevicesGpsDeviceList option:selected").text().split('/');
                var devicename = text[0];
                var imei = text[1];
                if (imei && devicename)
                    $("#tabAddDevicesGPSTable tbody").append("<tr><td>" + imei + "</td><td>" + devicename + "</td><td onclick='javascript:$(this).parent().remove();'>移除</td></tr>");
            });
            $("#selAddDevicesGpsDeviceList").empty().html($("#s2example-1").html());
        });
    }
    , AddDevicesGpsBtnSave: function  () {
        var tbody = $("#tabAddDevicesGPSTable tbody tr");
        var data = [];
        for (var i = 0; i < tbody.length; i++) {
            var obj = {};
            obj.imei = $(tbody[i]).find("td").eq(0).text();
            data.push(obj);
        }
        var ajaxData = {};
        ajaxData.carnum = $("#txtAddDeviceCarNum").val();
        ajaxData.carusername = $("#txtAddDeviceCarUser").val();
        ajaxData.cellphone = $("#txtAddDeviceCarPhone").val();
        ajaxData.description = $("#txtAddDeviceDescription").val() || "";
        ajaxData.devicelist = JSON.stringify(data);
        $.ajax({
            url: "/AjaxService/AjaxService.ashx?action=adddevicegps",
            type: "POST",
            dataType: "json",
            data: ajaxData,
            error: function (err) { },
            success: function (res) {
                if (res.success) {
                    $("#btnAddDevicesGPSClose").trigger("click");
                    toastr.success("添加成功.", "提示", opts_success);
                } else {
                    toastr.warning(res.msg, "提示", opts_success);
                }
            }
        });

    }
    , swapRow: function (groupid, i, k) {
        var offline = $("a[name=device_" + groupid + "][line=offline]");
        $(offline[k]).insertBefore(offline[i]);
        $(offline[i]).insertAfter(offline[k]);
    }
    , liGroupClick: function (obj) {
        if ($(obj).attr("groupid") == $(obj).attr("currentGroupid")) {
            return;
        }

        var toGroupID = $(obj).attr("groupid");
        var formGroupID = $(obj).attr("currentGroupid");
        var serialnumber = $(obj).attr("deviceid").split("_")[2];
        $.ajax({
            url: "AjaxService/AjaxService.ashx?action=UpdateDeviceGroupID",
            type: "post",
            data: { "toGroupID": toGroupID, "SerialNumber": serialnumber },
            dataType: "json",
            error: function () { },
            success: function (reg) {
                if (reg.success) {
                    toastr.success(reg.msg, "提示", opts_success);
                    $("#divMore").hide(); $("#ulGroup").hide();
                    beforeClick(1, zTree_Menu.getSelectedNodes()[0])
                } else {
                    toastr.warning(reg.msg, "提示", opts_waming);
                }
            }
        });
    }
    , aGroupMouseenter: function (_this) {
        if ($(_this).children("em").first().text() == mapPage.defaultGroup) {
            return false;
        }
        var groupid = $(_this).attr("id").split('_')[1];

        if ($("[name=aEdit_" + groupid + "]").length <= 0 && $("#txtGroup_" + groupid).length <= 0) {
            $(_this).append("<span class=\"label-white pull-right\" type='delete' name=\"aEdit_" + groupid + "\" style=\"margin-right:-5px;\" onclick=\"main.DeletedGroup(this)\">" + allPage.deletes + "</span>" +
                "<span type='edit' class=\"label-white pull-right\" name=\"aEdit_" + groupid + "\" style=\"margin-right:10px;\" onclick=\"main.EditGroup(this)\">" + allPage.edit2 + "</span>");
        }
    }
    , aGroupMouseleave: function (_this) {
        var groupid = $(_this).attr("id").split('_')[1];
        if ($("[name=aEdit_" + groupid + "]").length > 0) {
            $("[name=aEdit_" + groupid + "]").remove();
        }
    }
    , DeletedGroup: function (_this) {
        var groupid = $(_this).parent().attr("id").split('_')[1];
        $.ajax({
            url: "AjaxService/AjaxService.ashx?action=delGroup",
            type: 'POST',
            dataType: 'json',
            data: { "GroupID": groupid },
            error: function (res) { toastr.warning(res.msg, "提示", opts_waming); },
            success: function (res) {
                if (res.success) {
                    $("#groupid_" + groupid).remove();
                    toastr.success(res.msg, "提示", opts_success);
                } else
                    toastr.warning(res.msg, "提示", opts_waming);
            }
        });
    }

    , EditGroup: function (_this) {
        var groupid = $(_this).parent().attr("id").split('_')[1];
        $("[name=aEdit_" + groupid + "]").remove();
        if ($("#groupid_" + groupid + " em:eq(0)").text() == "") {
            return;
        }
        $("#groupid_" + groupid + " em:eq(0)").html("<input type='text' id=\"txtGroup_" + groupid + "\" value='" + $("#groupid_" + groupid + " em:eq(0)").text() + "' style='width:100px;'/>");
        $("#txtGroup_" + groupid).focus().on("focus", function () { return; });

        $("#txtGroup_" + groupid).on("blur", function () {
            var val = $.trim($(this).val());
            if (val.length < 1 || val.length > 15) {
                return;
            }
            $.ajax({
                url: "AjaxService/AjaxService.ashx?action=updateGroup",
                type: 'POST',
                dataType: 'json',
                data: { "GroupID": groupid, "GroupName": val },
                error: function (res) { toastr.warning(res.msg, "提示", opts_waming); },
                success: function (res) {
                    if (res.success) {
                        toastr.success(res.msg, "提示", opts_success);
                    } else
                        toastr.warning(res.msg, "提示", opts_waming);
                    $("#txtGroup_" + groupid).remove();
                    $("#groupid_" + groupid + " em:eq(0)").html(val)
                }
            });
        });
    }

    , deviceListOnClick: function (obj, v){
        var id, groupid = 0;
        if (zTree_Menu == null) {
            id = $("#userid").val();
        } else {
            id = zTree_Menu.getSelectedNodes()[0].id;
            groupid = obj.name.split('_')[1];
        }
        if ($("[name=snumber_" + v["SerialNumber"] + "]") != null && $("[name=snumber_" + v["SerialNumber"] + "]").length <= 0) {
            if (temp != "") {
                $("em[name=snumber_" + temp + "]").parent().css("background-color", "#FFFFFF");
                $("em[name=snumber_" + temp + "]").prev().remove();
                $("em[name=snumber_" + temp + "]").remove();
            }
            temp = v["SerialNumber"];
            if (obj != null) {
                $(obj).css("background-color", "#DBEAF9").show(100).append("</br><em id='more_" + obj.name + "' name='snumber_" + v["SerialNumber"] + "' style = 'white-space:nowrap;'></br>&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp" +
                     "<a href=\"Tracking.aspx?id=" + id + "&deviceid=" + v["DeviceID"] + "&t=" + new Date().getTime() + "\" target=\"_blank\">" + allPage.tracking + "</a>" +
                     "<a href=\"PlayBack.aspx?id=" + id + "&deviceid=" + v["DeviceID"] + "&t=" + new Date().getTime() + "\" target=\"_blank\">&nbsp&nbsp" + allPage.playback + "</a>" +
                     "<a name=\"aMore\" onclick=\"aMoreClick(this)\" DeviceID=\"" + v["DeviceID"] + "\" model='" + v["Model"] + "' modelName=\"" + v["DataText"] + "\" groupid=\"" + groupid + "\"  href=\"javascript:;\">&nbsp&nbsp" + allPage.more + "▼</a> </em> ");
                CurrentSelectDevice = $(obj).attr("id");
            }
        }
        if (v["Lng"] == "" || v["Lat"] == "") {
            //toastr.warning(v["SerialNumber"] + "," + allPage.status1 + "！", allPage.toastrTitle2, opts_waming);
            layer.msg(v["SerialNumber"] + "," + allPage.status1+"!");
            return;
        }
        var point = mgoo.Point(v.Lng, v.Lat); //new BMap.Point(v["Lng"], v["Lat"]);
        if (isAutoSetZoom) {
            // map.centerAndZoom(point, 18);
            //mgoo.centerAndZoom(v.Lng,v.Lat,20);
        }
        isAutoSetZoom = true;
        var datacontext = v["DataContext"].split('-');
        var Context = "";
        switch (v["DataText"]) {
            case "MG-X80'":
            case "MG-X83":
            case "MG-X81":
            case "MG-X82":
                if (datacontext[4] != undefined && datacontext[4] != null && datacontext[4] != "")
                    Context += yiwen201405.battery + "：" + datacontext[4] + "%";
                break;
            case "MG-X83A":
                if (datacontext[4]) {
                    var blue = "正常";
                    var son = "连接";
                    if (datacontext[2] != "1") {
                        blue = "<font color='red'>关闭</font>";
                    }
                    if (datacontext[3] != "1") {
                        son = "<font color='red'>断开</font>";
                    }
                    Context = "电池电量:" + datacontext[4] + "%" + ",蓝牙:" + blue + ",子机:" + son;
                }
                break;
            case "MG-X11D":
                if (datacontext.length >= 4) {
                    if (datacontext[1] == 0) {
                        Context += mapPage.dismiss + "&nbsp&nbsp";
                    } else if (datacontext[1] == 1) {
                        Context += mapPage.fortify + "&nbsp&nbsp";
                    }
                    if (datacontext[2] == 0) {
                        Context += "未刹车&nbsp&nbsp";
                    } else if (datacontext[2] == 1) {
                        Context += "已刹车&nbsp&nbsp";
                    }
                    if (datacontext[3] == "1") {
                        zhudian = mapPage.zdlj + "&nbsp&nbsp";
                    } else if (datacontext[3] == "0") {
                        var date = DateDiffMi(v["StopStartUtcDate"], GetCurrentDate());
                        var mi = MinuteToHour(date);
                        zhudian = "<font style=\"color:red;\">" + mapPage.zddk + "</font>" + mi + "&nbsp&nbsp";
                    }
                    var DeviceID = v["DeviceID"];
                    var SpanID = 'spanFence' + DeviceID;

                    Context += "<span id='" + SpanID + "'></span>&nbsp&nbsp";

                    Context += zhudian;
                }
                break;
            default:
                if (datacontext.length >= 4) {
                    if (datacontext[0] == 0)
                        Context += "ACC" + allPage.acc0 + "&nbsp&nbsp";
                    else if (datacontext[0] == 1)
                        Context += "ACC" + allPage.acc1 + "&nbsp&nbsp";
                    if (datacontext[1] == 0) {
                        Context += mapPage.dismiss + "&nbsp&nbsp";
                    } else if (datacontext[1] == 1) {
                        Context += mapPage.fortify + "&nbsp&nbsp";
                    }
                    if (datacontext[3] == "1") {
                        zhudian = mapPage.zdlj + "&nbsp&nbsp";
                    } else if (datacontext[3] == "0") {
                        var date = DateDiffMi(v["StopStartUtcDate"], GetCurrentDate());
                        var mi = MinuteToHour(date);
                        zhudian = "<font style=\"color:red;\">" + mapPage.zddk + "</font>" + mi + "&nbsp&nbsp";
                    }
                    Context += zhudian;
                }
                break;
        }
        var pt = mgoo.Point(v.Lng, v.Lat);// new BMap.Point(v["BaiduLng"], v["BaiduLat"]);
        var online = null;
        var showText = [];
        if (v["Status"] != "" && parseInt(v["Status"]) > v.OffLineMi) {
            online = allPage.offline;
            showText.push("<span style=\" padding-top:5px;\"><font name=\"CurrentDeviceName\" style=\"font-weight:bold;font-size:13px;color:#4F4F4F;\">&nbsp&nbsp" + v["DeviceName"] + " (" + online + ")" + "</font></span>");
        }
        if (v["Status"] != "" && parseInt(v["Status"]) < v.OffLineMi) {
            online = allPage.online;
            showText.push("<br /> <span style=\" padding-top:5px;\"><font name=\"CurrentDeviceName\" style=\"font-weight:bold;font-size:13px;color:#16722A;\">&nbsp&nbsp" + v["DeviceName"] + " (" + online + ")" + "</font></span>");
        }

        showText.push("<p style=\"background-color:red;height:1px;width:100%;\"></p>");
        var hire = DateDiff(GetCurrentDate(), v.HireExpireDate);
        var imei = v["SerialNumber"];
        if (hire <= 30 && hire > 0) {  //过期设备显示
            imei += "(<font style=\"color:red;\">" + parseInt(hire) + "天后过期</font>)";
        } else if (hire <= 0) {
            imei += "(<font style=\"color:red;\">已过期" + +parseInt(Math.abs(hire)) + "天</font>)";
        }
        showText.push("&nbsp&nbsp" + allPage.imeiNo + "：" + imei + "  &nbsp&nbsp");

        var stoptime = "";
        //"方向:" + GetCoureName(v["Course"])  +
        showText.push(stoptime + "<br /> &nbsp&nbsp")
        if (Context != "") {
            showText.push(Context + "<br /> &nbsp&nbsp");
        }
        if (online == allPage.offline) {
            showText.push(mapPage.LastOnlineTime + "：" + v["LastCommunication"] + "</br>&nbsp&nbsp");
            showText.push(allPage.positionTime + "：" + v["DeviceUtcDate"] + "</br>&nbsp&nbsp");
        }
        else {
            showText.push(allPage.positionTime + "：" + "<font style=\"color:blue;\">" + v["DeviceUtcDate"] + "</br>&nbsp&nbsp" + "</font>");
        }
        if (v["Speed"] > 7) {
            showText.push(allPage.state + ":" + allPage.moving + "" + "，" + allPage.speed + ":" + v["Speed"] + allPage.speedKM);
        } else {
            if (online == allPage.offline) {
                showText.push(allPage.state + ":" + allPage.offline + "-" + MinuteToHour(v["OfflineTime"]));
            } else {
                showText.push(allPage.state + ":" + allPage.stopCar);
                if (v["StopTime"] > 2) {
                    showText.push("," + allPage.stopTime + "：" + MinuteToHour(v["StopTime"]));
                }
            }
        }

        if (v["DataType"] != "") {
            showText.push("<br />&nbsp&nbsp" + allPage.positionType + "：" + (v["DataType"] == 2 ? "LBS" : "BDS/GPS"));
        }
        showText.push("<br /> &nbsp&nbsp" + allPage.LatLng + "：" + parseFloat(v["Lat"]).toFixed(5) + "," + parseFloat(v["Lng"]).toFixed(5));
        showText.push("<br /> &nbsp&nbsp" + allPage.address + "：<a href=\"javascript:void(0)\" title=\"点击复制地址\" id=\"Copy_A\" data-clipboard-target=\"Copy_A\"></a> ");
        showText.push("<span style=\"position:absolute;bottom:0px;font-size:12px;font-weight:bold;color:red;\">");
        showText.push("<a href=\"Tracking.aspx?id=" + id + "&deviceid=" + v["DeviceID"] + "&t=" + new Date().getTime() + "\" target=\"_blank\">" + allPage.tracking + "-" + mapPage.streetView + "&nbsp</a> ");
        showText.push("<a href=\"PlayBack.aspx?id=" + id + "&deviceid=" + v["DeviceID"] + "&t=" + new Date().getTime() + "\" target=\"_blank\">" + allPage.playback + "&nbsp</a> ");
        showText.push("<a href=\"Geofences.aspx?id=" + id + "&deviceid=" + v["DeviceID"] + "&t=" + new Date().getTime() + "\" target=\"_blank\">" + mapPage.geofence + "&nbsp</a>");
        showText.push("<a href=\"#\" name=\"aMore\" onclick=\"aMoreClick(this)\" DeviceID=\"" + v["DeviceID"] + "\"  model='" + v["Model"] + "' modelName=\"" + v["DataText"] + "\" groupid=\"" + groupid + "\" href=\"javascript:\">" + allPage.more + "▼</a> ");
        showText.push("</span>");

        if (lastDeviceID != 0) { 
            DeviceTitleArray[lastDeviceID].setZIndex(10);
            DeviceTitleArray[lastDeviceID].update({ text: lastDeviceName });
        } 
        var ct = new google.maps.LatLng(v.Lat, v.Lng);
        //console.log(showText.join(''));
        var showHtml = []; 
       
        showHtml.push(" DeviceName:" + v.DeviceName);
        showHtml.push("<br />  SerialNumber:" + v.SerialNumber);
        showHtml.push("<br />  DateTime:" + v.LastCommunication);
        showHtml.push("<br />  Status:" + (online == null ? "Not Enabled" : online));
        showHtml.push("<br />  Speed:" + v.Speed + "km/h");
      
      
        var obj = { "position": ct, "text": showHtml.join(''), icon: "js/map/images/1px.png" };
        DeviceTitleArray[v.DeviceID].update(obj);
        DeviceTitleArray[v.DeviceID].setZIndex(100);
        //DeviceTitleArray[v.DeviceID] = new PopupMarker({
        //    position: ct,
        //    map:mgoo.map,
        //    icon: "js/map/images/1px.png",
        //    text: showText.join(''),//" <span> 1233333333333333123123123</span><span> 2222222222</span>",
        //    showpop: true,
        //    id: v.SerialNumber
        //});
      
        lastDeviceName = v.DeviceName;
        lastDeviceID = v.DeviceID;
        //console.log(v.DeviceID,v.DeviceName);
        mgoo.panTo(v.Lng,v.Lat);
    }

};
 
var currentLineStatus = 2;
var isFlag = false;
 

function dragChat(id) {
    try {
        var item = document.getElementById(id);
        item.style.cursor = "w-resize";
        var to_x;
        item.onmousedown = function () {
            document.onmousemove = function (e) {
                var e = e || window.event;
                var mouse_x = e.pageX;
                var max_width = 600;
                var min_width = 280;
                to_x = Math.min(max_width, mouse_x);
                to_x = Math.max(min_width, to_x);
                document.getElementById("chat").style.width = to_x + "px";
             
            };
        };
        document.onmouseup = function () {
            if (to_x) {
                localStorage.setItem("chatWidth", to_x);
            }
            document.onmousemove = null;
        }
        var cw = localStorage.getItem("chatWidth");
        
        if (cw) {
            document.getElementById("chat").style.width = cw + "px";
        } else {
           document.getElementById("chat").style.width = 280 + "px";
        }
    } catch (e) {

    }
}