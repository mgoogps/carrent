function loading(num) {
    try {
        show_loading_bar(num);
    } catch (e) { }
}
function DeviceListDidHeight(height) {
    // $("#allmap").height($("#allmap").parent().height() - 55);
    // $("#allmap").width($("#allmap").parent().width() + 60);

    var offset = new Object();
    offset.top = 460;
    var wh = $(window).height();
    console.log(wh)
    var width = $(window).width();
    console.log(width)
    $("#allmap").height($(window).height());
    if ($("#devicesDIV").length >  0) {
        $("#chat div.ps-container.chat-inner").css({ "max-height": wh }).height(wh);
        var offsetHeight = $("#devicesDIV").parent().offset();
        var maxHeight = wh - offsetHeight.top;
        $("#devicesDIV").css({ "max-height": maxHeight - height }).height(maxHeight - height);
    }
     
    if (width < 1420) {
        $("#spanMonitor").text("");
        $("#spanReport").text("");
        $("#spanManDevice").text("");
        $("#spanStatisticalAnalysis").text("");
    } else {
        try {
             $("#spanMonitor").text(allPage.monitor);
            $("#spanReport").text(allPage.report);
            $("#spanManDevice").text(allPage.manDevice);
            $("#spanStatisticalAnalysis").text(allPage.StatisticalAnalysis);
        } catch (e) {
          //  console.error(e);
        } 
    }
}
$(window).resize(function () {
    DeviceListDidHeight();
});

function ResizeMain() {
    var chatWidth = $("#chat").width();
    if ($("#chat").is(":hidden")) {
        $("#ifrParent").width($("#iframepage").width() - chatWidth);
        $("#iMenu").attr("class", "fa-angle-double-left");
    }
    else {
        $("#ifrParent").width($("#iframepage").width() + chatWidth);
        $("#iMenu").attr("class", "fa-angle-double-right");
    }
}

$(function () {

    $("#edit-profile").on("click", function () {
        if ($("#loginType").val() != 1) {
            editProfile($(this).attr("userid"));
            jQuery('#modal-6').modal('show', { backdrop: 'static' });
        } else {
            editDeviceInfo($("#LoginImeiDeviceID").val());
        }

    });
    $("#allReadonly").on("click", function () {
        ShowBasicModal("确定清除全部？", allReadonly, $("#userid").val());
    });
    $('<audio id="chatAudio">   <source src="/icons/msg.mp3" type="audio/mpeg">   </audio>').appendTo('body');//载入声音文件 
    $("#chkAudio").on("click", function () {
        if ($(this).attr("checked")) {
            $('#chatAudio')[0].play();
        } else {
            $('#chatAudio')[0].pause();
        }
    });
    $("#chkAudio").on("click", function () {
        msgAudio();
    });
    $("#chkLowerMsg").on("click", function () {
        LowerMsg();
    });
    $("a[href=#service]").on("click", function () {
        var html = [];
        html.push("<table> <tbody>");
        html.push(" <tr><td valign=\"middle\" align=\"center\" rowspan=\"7\"><img width=\"101\" border=\"0\" height=\"101\" src=\"icons/service.jpg\"></td><td> </td><td> </td></tr>");
        html.push("<tr><td class=\"title\" width=\"110\" align=\"right\"> " + allPage.cellName + "：</td><td class=\"text\"><span id=\"spanServiceCellName\">谢先生</span></td></tr>");
        html.push("<tr><td class=\"title\" align=\"right\"> " + allPage.phone + "：</td><td class=\"text\"><span id=\"spanServicePhone\"></span></td></tr>");
        html.push("<tr><td class=\"title\" align=\"right\"> " + allPage.primaryEmail + "：</td><td class=\"text\"><span id=\"spanServiceEmail\"></span></td></tr>");
        html.push("<tr><td class=\"title\" align=\"right\"> " + allPage.address + "：</td><td class=\"text\"><span id=\"spanServiceAddress\"></span></td></tr>");
        html.push("</tbody> </table>");
        //title, bodyHtml, showBtnConfirm   广东省东莞市企石镇人民路
        var opts = {
            title: allPage.userType2,
            bodyHtml: html.join(''),
            showBtnConfirm: false
        }
        new loadModalWindows(opts);
    });

    //批量修改SIM流量卡

    $("a[href=#importexcelsim]").on("click", function () {
        var html = [];
        html.push('<input type="file" class="form-control" id="importexcelsim" name="importexcelsim" />');
        var opts = {
            title: "批量修改SIM流量卡号",
            bodyHtml: html.join(''),
            showBtnConfirm: true
        }
        var model = new loadModalWindows(opts);
        model.ConfirmClick(function () {

            $.ajaxFileUpload({
                url: '/AjaxService/AjaxService.ashx?uploadType=importupdatesim&action=upload',//处理图片脚本
                secureuri: false,
                //FileName: "importexcelsim",
                fileElementId: "importexcelsim",//file控件id、name
                dataType: 'json',
                success: function (data, status) {
                    if (data.success) {
                        $("#importexcelsim").val("");
                        toastr.success(data.msg, "提示", opts_success);
                    } else {
                        toastr.warning(data.msg, "提示", opts_waming);
                    }
                },
                error: function (data, status, e) {
                    toastr.warning(data.msg, "提示", opts_waming);
                }
            });
        });
    });

    //$('#chatAudio')[0].play(); //播放声音  
    //DeviceListDidHeight();
});

function alarmTime(uid) {
    var lower = false;
    var liHtml = [];
    if ($("#chkLowerMsg").attr("checked"))
        lower = true;
    var agoAlram = 40;
    $.ajax({
        url: "/api/Monitor/getalarmlist",
        type: 'get',
        dataType: 'json',
        data: { "userid": 7},
        success: function (res) {
            
            if (res.code != 0)
            {
                layer.msg(res.message);
                return;
            }
            var dataList = res.result ;
            $.each(dataList, function (k, v) {
                var i = 0;
                if (i <= agoAlram) {
                    var color = "";
                    if (v.Message == "断电报警") {
                        color = "color:red;";
                    }
                    liHtml.push("<li class=\"active\" style=\"margin-left:0px;\">");
                    liHtml.push("<a href=\"#\" style='cursor:pointer;' onclick=\"MonitorDevice(" + v.DeviceID + ",'" + v.SerialNumber + "'," + v.UserID + ")\" > ");
                    liHtml.push("<span > ");
                    liHtml.push("<p>" + v.UserName + "</p> ");
                    liHtml.push("<strong style=\"" + color + "\">" + v.Message + "</strong> ");
                    liHtml.push("<span title=\"点击监控改设备\" class=\"light small\">- " + (v.DeviceName.length > 0 ? v.DeviceName : v.SerialNumber) + "</span></span> ");
                    liHtml.push("<span class=\"line desc small\">");
                    liHtml.push("报警时间：" + v.Created + "  </span>");
                    liHtml.push(" </a><a title=\"设为已读\" id=\"eid_" + v.ExceptionID + "\" style=\"right:10px; top:26px; position:absolute;font-size:18px;font-weight:bold;cursor:pointer;\" onclick=\"allReadonly(" + v.UserID + "," + v.ExceptionID + ")\">×</a></li>");
                }
            });

            $("#ulAlarm").empty();
            $("#ulAlarm").append(liHtml.join(''));
            if (dataList.length == 0) {
                var html = [];
                html.push("<li class=\"active\">");
                html.push("<a href=\"#\"> ");
                html.push("<span class=\"line\"> ");
                html.push("<strong>没有报警信息</strong> ");
                html.push("<span class=\"light small\"></span></span> ");
                html.push("<span class=\"line desc small\">");
                html.push(" </span> </a> </li>");
                $("#ulAlarm").append(html.join(''));
                $("#spanAlarmCount").text("0");
            } else {
                if ($("#chkAudio").attr("checked"))
                    $('#chatAudio')[0].play(); //播放声音
                if (dataList.length > 100)
                    $("#spanAlarmCount").text("100+");
                else
                    $("#spanAlarmCount").text(dataList.length);
            }

        }
    });

    setTimeout("alarmTime(" + uid + ")", 60000);
}

function getAlarmList(uid, b, status) {
    var agoAlram = 40;
    var liHtml = [];
    var emHtml = [];
    //var lower=false;
    //if($("#chkLowerMsg").attr("checked"))
    //    lower = true;
    $.ajax({
        url: "AjaxService/AjaxService.ashx?action=alarm",
        type: 'POST',
        dataType: 'json',
        data: { "userid": uid, "status": status, "t": new Date().getTime() },
        success: function (dataList) {
            var i = 0;
            dataList = dataList[""];
            if (b) {
                //if (dataList.length > 100)
                //    $("#spanAlarmCount", parent.document).text("100+");
                //else
                //    $("#spanAlarmCount", parent.document).text(dataList.length);
            } else {
                if (dataList.length > 100)
                    $("#spanAlarmCount").text("100+");
                else
                    $("#spanAlarmCount").text(dataList.length);
            }
            //parent.loading(50); 
            $.each(dataList, function (k, v) {
                if (!b) {
                    if (i <= agoAlram) {
                        var color = "";
                        if (v.Message == "断电报警") {
                            color = "color:red;";
                        }
                        liHtml.push("<li class=\"active\" style=\"margin-left:0px;\">");
                        liHtml.push("<a href=\"#\" style='cursor:default;'> ");
                        liHtml.push("<span > ");
                        liHtml.push("<p>" + v.UserName + "</p> ");
                        liHtml.push("<strong style=\"" + color + "\">" + v.Message + "</strong> ");
                        liHtml.push("<span class=\"light small\">- " + (v.DeviceName.length > 0 ? v.DeviceName : v.SerialNumber) + "</span></span> ");
                        liHtml.push("<span class=\"line desc small\">");
                        liHtml.push("报警时间：" + v.Created + "  </span>");
                        liHtml.push(" </a><a title=\"设为已读\" id=\"eid_" + v.ExceptionID + "\" style=\"right:10px; top:26px; position:absolute;font-size:18px;font-weight:bold;cursor:pointer;\" onclick=\"allReadonly(" + v.UserID + "," + v.ExceptionID + ")\">×</a></li>");
                    }
                }
                i++;
                if (b && ("#EMTable").length > 0) {
                    emHtml.push("<tr>");
                    emHtml.push("<td>" + i + "</td>");
                    emHtml.push("<td>" + v.UserName + "</td>");
                    emHtml.push("<td>" + (v.DeviceName.length > 0 ? v.DeviceName : v.SerialNumber) + "</td>");
                    emHtml.push("<td>" + v.SerialNumber + "</td>");
                    emHtml.push("<td>" + v.Message + "</td>");
                    emHtml.push("<td class=\"center\">" + v.Created + "</td>");
                    emHtml.push("<td class=\"center\">" + v.DeviceUTCTime + "</td>");
                    emHtml.push("<td class=\"center\">" + v.DataText + "</td>");
                    //emHtml.push("<td class=\"center\">" + v.status + "</td>");
                    emHtml.push("</tr>");
                }
            });
            parent.loading(100);
            if (b) {
                //$("#ulAlarm", parent.document).empty();
                //$("#ulAlarm", parent.document).append(liHtml.join(''));
            } else {
                //$("#ulAlarm").empty();
                //$("#ulAlarm").append(liHtml.join(''));
            }
            if ($("#EMTable").length > 0) {
                $("#EMTable tbody").empty();
            }
            $("#EMTable tbody").append(emHtml.join(''));
        }
    });
    // if (status == null)
    //setTimeout("getAlarmList(" + uid + "," + b + "," + status + ")", 60000); 
}



function msgAudio() {
    var play = false;
    if ($("#chkAudio").attr("checked"))
        play = true;
    $.ajax({
        url: "AjaxService/AjaxService.ashx?action=isPlay",
        type: 'POST',
        dataType: 'json',
        data: { "play": play },
        success: function (res) {

        }
    });
}
function LowerMsg() {
    var Lower = false;
    if ($("#chkLowerMsg").attr("checked"))
        Lower = true;
    $.ajax({
        url: "AjaxService/AjaxService.ashx?action=LowerMsg",
        type: 'POST',
        dataType: 'json',
        data: { "LowerMsg": Lower },
        success: function (res) {

        }
    });
}


function showSettingMsgType() {
    var html = [];
    html.push("<div id=\"msgType\">");
    $.ajax({
        url: "AjaxService/AjaxService.ashx?action=GetExceptionType",
        type: "POST",
        data: {},
        dataType: "json",
        error: function (err) { parent.toastrMessage("opts_waming", "查询报警类型失败", allPage.toastrTitle1); },
        success: function (res) {
            var i = 0;
            var count = 0;
            $(res[""]).each(function (k, v) {
                ++i;
                if (i == 1) {
                    html.push("<p>");
                }
                html.push(" <label class=\"checkbox-inline\">  <input type=\"checkbox\" value=\"" + v.NotificationType + "\"/>" + v.Message + "</label>");
                if (i == 4 || count == res[""].length - 1) {
                    html.push("</p>");
                    i = 0;
                }
                count++;
            });
            html.push("</div>");
            html.push("<br /><h4 style=\"width:100%; height:1px;background-color: black;\"/><br />");
            html.push("<span> <p>  <label class=\"checkbox-inline\"> <input type=\"checkbox\" value=\"-1\" id=\"ckFiltersOnlineMsg\"/> 无线设备过滤离线报警 </label>     ");
            html.push("  <label class=\"checkbox-inline\"> <input type=\"checkbox\" value=\"-1\" id=\"ckFiltersOnlineMsg\"/> 无线设备过滤拆除报警 </label>  </p><span/>   ");

            var modal = new loadModalWindows({ title: alarmDetailPage.alarmType, bodyHtml: html.join(''), showBtnConfirm: true });
            modal.LoadModal(function () {
                $.ajax({
                    url: "AjaxService/AjaxService.ashx?action=GetSettingMsgType",
                    type: 'POST',
                    dataType: 'text',
                    data: { "UserID": $("#userid").val() },
                    success: function (res) {
                        if (res != "") {
                            var chk = res.split(',');
                            for (var i = 0; i < chk.length; i++) {
                                $("#" + modal.modalID + " input[value=" + chk[i] + "]").attr("checked", true);
                            }
                            if (chk[chk.length] == "-1") {
                                $("#ckFiltersOnlineMsg").attr("checked", true);
                            }
                        } else {
                            $("#" + modal.modalID + " input[type=checkbox]").attr("checked", true);
                        }
                    }
                });
            });
            modal.ConfirmClick(function () {
                var chk = $("#" + modal.modalID + " div#msgType p input[type=checkbox]:checked");

                var chkVal = [];
                for (var i = 0; i < chk.length; i++) {
                    chkVal.push($(chk[i]).val());
                }
                var ckData = chkVal.join(',');
                if ($("#ckFiltersOnlineMsg").is(":checked")) {
                    ckData += ",-1";
                } else {
                    ckData += ",0";
                }
                $.ajax({
                    url: "AjaxService/AjaxService.ashx?action=SettingMsgType",
                    type: 'POST',
                    dataType: 'json',
                    data: { "MsgID": ckData, "UserID": $("#userid").val() },
                    success: function (res) {
                        if (res.success) {
                            modal.CloseModal();
                            opts_success.positionClass = "toast-top-left";
                            toastr.success(res.msg, allPage.toastrTitle1, opts_success);
                        } else {
                            opts_waming.positionClass = "toast-top-left";
                            toastr.warning(res.msg, allPage.toastrTitle2, opts_waming);
                        }
                    }
                });
            });
        }
    });
}

function allReadonly(userid, eid) {

    $.ajax({
        url: "AjaxService/AjaxService.ashx?action=allReadonly",
        type: 'POST',
        dataType: 'json',
        data: { "userid": userid, "ExceptionID": eid },
        success: function (res) {
            if (res.success) {
                opts_success.positionClass = "toast-top-left";
                toastr.success("    操作成功！", allPage.toastrTitle1, opts_success);
                if (eid != null) {
                    $("#spanAlarmCount").text(parseInt($("#spanAlarmCount").text()) - 1);
                    $("#eid_" + eid).parent().remove();
                } else {
                    $("#ulAlarm").empty();
                    $("#ulAlarm", parent.document).empty();
                    $("#spanAlarmCount").text("0");
                    $("#spanAlarmCount", parent.document).text("0");
                }
            } else {
                opts_waming.positionClass = "toast-top-left";
                toastr.warning("  操作失败！", allPage.toastrTitle2, opts_waming);
            }
        }
    });
}

function arr() { //IE8需要加上这段才兼容indexOf
    if (!Array.prototype.indexOf) {
        Array.prototype.indexOf = function (elt /*, from*/) {
            var len = this.length >>> 0;
            var from = Number(arguments[1]) || 0;
            from = (from < 0)
                 ? Math.ceil(from)
                 : Math.floor(from);
            if (from < 0)
                from += len;
            for (; from < len; from++) {
                if (from in this &&
                    this[from] === elt)
                    return from;
            }
            return -1;
        };
    }
}

function editProfile(u) {
    $.ajax({
        url: "AjaxService/AjaxService.ashx?action=GetUserInfoByUserID",
        type: 'POST',
        dataType: 'json',
        data: { "UserID": u },
        success: function (res) {
            res = res[""];
            if (res.length > 0) {
                $("#txtUserName").val(res[0].UserName);
                $("#txtLoginName").val(res[0].LoginName);
                $("#txtContacts").val(res[0].FirstName);
                $("#txtAddress").val(res[0].Address1);
                $("#txtEmail").val(res[0].PrimaryEmail);
                $("#txtPhone").val(res[0].CellPhone);
            }
        }
    });
}
function updateUserInfo(u) {
    var userData = {
        "UserID": u,
        "FirstName": $("#txtContacts").val(),
        "Address1": $("#txtAddress").val(),
        "PrimaryEmail": $("#txtEmail").val(),
        "CellPhone": $("#txtPhone").val(),
        "UserName": $("#txtUserName").val()
    }
    $.ajax({
        url: "AjaxService/AjaxService.ashx?action=UpdateUserInfo",
        type: "POST",
        data: { "data": JSON.stringify(userData)},
        dataType: "json",
        error: function (err) { toastr.warning("    修改信息失败！", allPage.toastrTitle2, opts_waming); },
        success: function (res) {
            if (res.success) {
                toastr.success("    修改信息成功！", allPage.toastrTitle1, opts_waming);
                $("#btnUserInfoClose").trigger("click");
            } else {
                toastr.warning("    修改信息失败！", allPage.toastrTitle2, opts_waming);
            }
            return false;
        }
    });
    return false;
}

function getRemainView(dn, st, et) {
    $.ajax({
        url: "AjaxService/AjaxService.ashx?action=remainview",
        type: 'POST',
        dataType: 'json',
        data: { "u": (dn == "" ? dn : JSON.stringify({ "dn": dn })), "st": st, "et": et },
        error: function (error) {
            parent.toastrMessage("opts_waming", "查询运行总览列表出现错误", allPage.toastrTitle2);
        },
        success: function (res) {
            var data = res[""];
            var i = 0;
            var html = [];
            parent.loading(45);
            $("#RVTable tbody").empty();
            $.each(data, function (k, v) {
                if (v.DeviceName.length == 0)
                    v.DeviceName = v.SerialNumber;
                html.push(" <tr>");
                html.push(" <td style=\"width:50px;\">" + (++i) + "</td>");
                html.push(" <td>" + v.DeviceName + "</td>");
                html.push("	<td>" + v.date + "</td>");
                html.push(" <td>" + v.nowDistance + "</td>");
                html.push(" <td class=\"center\">" + v.warn + "</td>");
                html.push(" <td class=\"center\">" + v.speedlimit + "</td>");
                html.push(" <td class=\"center\">" + v.Stop + "</td>");
                html.push("</tr>");
            });
            parent.loading(75);
            $("#RVTable tbody").append(html.join(''));
            parent.loading(100);
        }
    });
}

function GetDevices(u) {
    $.ajax({
        url: "AjaxService/AjaxService.ashx?action=GetDevices",
        data: { "u": u },
        type: "POST",
        dataType: "text",
        success: function (res) {
            var data = JSON.parse(res);
            var html = [];
            var i = 0;
            $("#example-4 tbody").empty();
            $.each(data, function (k, v) {
                i++;
                html.push(" <tr name=\"" + v.DeviceName + "\">");
                html.push(" <td>" + i + "</td>");
                html.push(" <td>" + v.DeviceName + "</td>");
                html.push(" <td>" + v.IMEI + "</td>");
                html.push(" <td>" + v.phone + "</td>");
                html.push(" <td>" + v.model + "</td>");
                html.push(" <td>" + v.Created + "</td>");
                html.push(" <td>" + v.jh + "</td>");
                html.push(" <td>" + v.dq + "</td>");
                html.push(" <td><a href=\"#\" class=\"btn btn-secondary btn-sm btn-icon icon-left\">  Edit  </a>  <a href=\"#\" class=\"btn btn-danger btn-sm btn-icon icon-left\"> </a>  <a href=\"#\" class=\"btn btn-info btn-sm btn-icon icon-left\"> Profile </a></td>");
                html.push("	</tr>");
            });
            $("#example-4 tbody").append(html.join(''));
        },
        error: function () {
            //toastr.warning("   失败  ！", allPage.toastrTitle2, opts_waming);
        }
    });
}

function GetMileage(dn, yh, st, et, DeviceID, deviceName, SpeedLimit) {
    parent.loading(50);
    var html = [];
    var stopCount = 0;
    var speedLimitCount = 0;
    var rowIndex = 1;
    $.ajax({
        url: "AjaxService/AjaxService.ashx?action=getlushu",
        data: { "DeviceID": DeviceID, "startDate": st + " 00:00:00", "endDate": et + " 23:59:59", "callback": "playBack" },
        dataType: "json",
        type: "POST",
        error: function (error) { },
        success: function (data) {
            var distance = 0;
            data = data[""];
            var tempDate = "";
            var len = data.length;
            var distanceData = [];
            $("#MileageTable tbody").empty();
            for (var i = 0; i < len; i++) {
                if (parseFloat(data[i]["Speed"]) < 10) {
                    continue;
                }
                distanceData.push(data[i]);
            }
            len = distanceData.length;
            for (var i = 0; i < len - 1; i++) {
                var v = distanceData[i];
                var stop = (new Date((distanceData[i + 1]["DeviceUTCTime"].split("."))[0].replace(/-/g, "/")).getTime() - new Date((v["DeviceUTCTime"].split("."))[0].replace(/-/g, "/")).getTime()) / 1000;
                if (stop > 600) {
                    stopCount++;
                }
                var speed = v["Speed"];
                if (SpeedLimit > 0 && speed > SpeedLimit) {
                    speedLimitCount++;
                }
                // var utcDate = v["DeviceUTCTime"].substring(0, 10);
                var myDate = new Date(v["DeviceUTCTime"]);
                utcDate = myDate.getFullYear() + "-" + ((myDate.getMonth() + 1) < 10 ? "0" + (myDate.getMonth() + 1) : (myDate.getMonth() + 1)) + "-" + (myDate.getDate() < 10 ? "0" + myDate.getDate() : myDate.getDate());

                var point = new BMap.Point(parseFloat(v["BaiduLng"]).toFixed(5), parseFloat(v["BaiduLat"]).toFixed(5))
                distance += map.getDistance(point, new BMap.Point(distanceData[i + 1]["BaiduLng"], distanceData[i + 1]["BaiduLat"]));
                if ((tempDate != "" && tempDate != utcDate) || i == len - 2) {
                    if (distance < 1000) distance = 0;
                    var km = MeterToKilometer(distance);
                    km = km.substring(0, km.length - 2);
                    html.push(" <tr>");
                    html.push(" <td>" + rowIndex++ + "</td>");
                    html.push(" <td>" + deviceName + "</td>");
                    html.push(" <td>" + tempDate + "</td>");
                    html.push(" <td>" + km + "</td>");
                    html.push(" <td><span id=\"bj" + (((tempDate.replace('-', '')).replace('-', '')).replace('/', '')).replace('/', '') + "\">0</span> </td>");
                    html.push(" <td>" + speedLimitCount + "</td>");
                    html.push(" <td>" + stopCount + "</td>");
                    html.push(" <td>" + ((yh / 100) * km).toFixed(2) + "</td>");
                    html.push(" </tr>");
                    stopCount = 0;
                    speedLimitCount = 0;
                    distance = 0;
                }
                tempDate = utcDate;
            }
            parent.loading(70);
            $("#MileageTable tbody").append(html.join(''));
            $.ajax({
                url: "AjaxService/AjaxService.ashx?action=getexceptionmessagecount",
                data: { "deviceid": DeviceID, "st": st + " 00:00:00", "et": et + " 23:59:59" },
                dataType: "json",
                type: "POST",
                error: function (error) { },
                success: function (data) {
                    data = data[""];
                    $.each(data, function (k, v) {
                        $("#bj" + (((v.msgDate.replace('-', '')).replace('-', '')).replace('/', '')).replace('/', '')).text(v.msgCount);
                    });
                    parent.loading(100);
                }
            });
        }
    });
    //}
    //  });
}

/// 查询停留详单
function GetStopDetail(dn, st, et) {
    parent.loading(45);
    $.ajax({
        url: "AjaxService/AjaxService.ashx?action=GetSpeedReport",
        type: "POST",
        data: {
            "dn": (dn == "" ? dn : JSON.stringify({ "dn": dn })), "st": st + " 00:00:00", "et": et + " 23:59:59"
        },
        dataType: "json",
        error: function (err) { parent.toastrMessage("opts_waming", "查询停留详单时出错", allPage.toastrTitle1); },
        success: function (res) {
            var data = res[""];
            var html = [];
            $("#SDTable tbody").empty();
            parent.loading(60);
            $.each(data, function (k, v) {
                if (v.DeviceName.length == 0)
                    v.DeviceName = v.SerialNumber;
                html.push(" <tr name=\"" + v.SerialNumber + "\">");
                html.push(" <td>" + v.num + "</td>");
                html.push(" <td>" + v.DeviceName + "</td>");
                html.push(" <td>" + v.st + "</td>");
                html.push(" <td>" + v.et + "</td>");
                v.time = MinuteToHour(v.TimediffMinute);
                html.push(" <td> <a title=\"查看地图\" style=\"cursor:pointer\" onclick='openMap(\"" + v.DeviceName + "\",\"" + v.st + "\",\"" + v.et + "\"," + v.Latitude + "," + v.Longitude + ",\"" + v.time + "\",\"" + v.Address + "\",\"StopDetail\")'>" + parseFloat(v.Latitude).toFixed(5) + "," + parseFloat(v.Longitude).toFixed(5) + " </a> </td>");
                html.push("<td>" + v.Address + "</td>");
                html.push(" <td>" + v.time + "</td>");
                html.push("  </tr>");
            });
            $("#SDTable tbody").append(html.join(''));
            parent.loading(100);
        }
    });
}
/// 查询停留单，跟历史轨迹想似，从轨迹数据算出停留点
function GetSpeedReport(dn, st, et, DeviceName, UserID, Filter) {
    parent.loading(45);
    $.ajax({
        url: "/AjaxService/AjaxService.ashx?action=GetSpeedReportEcharts",
        type: "POST",
        data: {
            "dn": (dn == "" ? dn : JSON.stringify({ "dn": dn })),
            "st": st,
            "et": et,
            "userid": UserID,
            "filter": Filter
        },
        dataType: "json",
        error: function (err) { parent.toastrMessage("opts_waming", "查询停留详单时出错", allPage.toastrTitle1); },
        success: function (res) {
            parent.loading(60);
            var data = res[""];
            var html = [];
            var len = data.length;
            var num = 0;
            var xAxis = [];
            var speed = [];
            $("#SDTable tbody").empty();
            var tData = [];
            for (var j = 0; j < len; j++) {
                var last = data[j];
                xAxis.push(last["DeviceTime"]);
                speed.push(parseInt(last["Speed"]));
                //  if (parseFloat(last["Speed"]) >= 10) {
                tData.push(last);
                // }
            }
            len = tData.length;
            if (et != null) {
                for (var i = 0; i < len; i++) {
                    var last = tData[i];
                    html.push(" <tr name=\"" + last.SerialNumber + "\">");
                    html.push(" <td>" + (++num) + "</td>");
                    html.push(" <td>" + DeviceName + "</td>");
                    html.push(" <td>" + last.startTime + "</td>");
                    html.push(" <td>" + last.endTime + "</td>");
                    html.push(" <td> <a title=\"查看地图\" href=\"javascript:void(0)\" style=\"cursor:pointer\" onclick='openMap(\"" + DeviceName + "\",\"" + last.startTime + "\",\"" + last.endTime + "\"," + last.Latitude + "," + last.Longitude + ",\"" + last.time + "\",\"" + last.Address + "\",\"StopDetail\")'>" + parseFloat(last.Latitude).toFixed(5) + "," + parseFloat(last.Longitude).toFixed(5) + " </a> </td>");
                    GetAddressByLatlng(last.Latitude, last.Longitude, "address" + num);
                    html.push(" <td><span id=\"address" + num + "\">" + last.address + "</span></td>");
                    html.push(" <td>" + last.time + "</td>");
                    html.push(" </tr>");
                }
                $("#SDTable tbody").append(html.join(''));
                html = [];
            }
            if (data.length > 0) {
                if (et == null)
                    loadEcharts(xAxis, speed, [DeviceName]);
            } else {
                parent.toastrMessage("opts_waming", "没有查询到数据。", allPage.toastrTitle1);
            }
            parent.loading(100);
        }
    });
}

function exchangeTime(msecond) {
    var dd, hh, mm, ss;
    dd = Math.round(msecond / 86400 + 0.5) - 1;
    hh = Math.round((msecond - dd * 86400) / 3600 + 0.5) - 1;
    mm = Math.round((msecond - dd * 86400 - hh * 3600) / 60 + 0.5) - 1;
    ss = Math.round(msecond - dd * 86400 - hh * 3600 - mm * 60);
    var strtip = "";
    if (dd > 0) strtip = strtip + dd + "天";
    if (hh > 0) strtip = strtip + hh + "时";
    if (mm > 0) {
        strtip = strtip + mm + "分";
        if (dd > 0) return strtip
    }
    if (ss > 0) strtip = strtip + ss + "秒";
    return strtip
}

function ExceptionView(st, et, dn) {
    parent.loading(45);
    $.ajax({
        url: "AjaxService/AjaxService.ashx?action=GetException",
        type: "POST",
        data: {
            "st": st, "et": et, "dn": (dn == "" ? dn : JSON.stringify({ "dn": dn }))
        },
        dataType: "json",
        error: function (err) { parent.toastrMessage("opts_waming", "查询报警总览出错", allPage.toastrTitle1); },
        success: function (res) {
            var data = res[""];
            var html = [];
            $("#EVTable tbody").empty();
            var i = 0;
            parent.loading(75);
            $.each(data, function (k, v) {
                if (v.DeviceName.length == 0)
                    v.DeviceName = v.SerialNumber;
                html.push(" <tr name=\"" + v.SerialNumber + "\">");
                html.push(" <td>" + (++i) + "</td>");
                html.push(" <td>" + v.DeviceName + "</td>");
                html.push(" <td>" + v.did + "</td>");
                html.push(" <td>" + v.duand + "</td>");
                html.push(" <td>" + v.zd + "</td>");
                html.push(" <td>" + v.sos + "</td>");
                html.push("  </tr>");
            });
            $("#EVTable tbody").append(html.join(''));
            parent.loading(100);
        }
    });
}

function GetExceptionCount(st, et, dn) {
    parent.loading(45);
    $.ajax({
        url: "AjaxService/AjaxService.ashx?action=ExceptionCount",
        type: "POST",
        data: {
            "st": st, "et": et, "dn": (dn == "" ? dn : JSON.stringify({ "dn": dn }))
        },
        dataType: "json",
        error: function (err) { parent.toastrMessage("opts_waming", "查询报警统计出错", allPage.toastrTitle1); },
        success: function (res) {
            var data = res[""];
            var html = [];
            $("#ECTable tbody").empty();
            var i = 0;
            parent.loading(70);
            $.each(data, function (k, v) {
                if (v.DeviceName.length == 0)
                    v.DeviceName = v.SerialNumber;
                html.push(" <tr name=\"" + v.SerialNumber + "\">");
                html.push(" <td>" + (++i) + "</td>");
                html.push(" <td>" + v.DeviceName + "</td>");
                html.push(" <td>" + v.date + "</td>");
                html.push(" <td>" + v.did + "</td>");
                html.push(" <td>" + v.duand + "</td>");
                html.push(" <td>" + v.zd + "</td>");
                html.push(" <td>" + v.sos + "</td>");
                html.push(" <td>" + v.indzwl + "</td>");
                html.push(" <td>" + v.outdzwl + "</td>");
                html.push(" <td>" + v.wy + "</td>");
                html.push("  </tr>");
            });
            $("#ECTable tbody").append(html.join(''));
            parent.loading(100);
        }
    });
}
function GetExceptionType() {
    $.ajax({
        url: "AjaxService/AjaxService.ashx?action=GetExceptionType",
        type: "POST",
        data: {
        },
        dataType: "json",
        error: function (err) { parent.toastrMessage("opts_waming", "查询报警类型失败", allPage.toastrTitle1); },
        success: function (res) {
            $("#selectExcrptionType").empty().append("<option value=\"0\">-全部-</option>");
            $(res[""]).each(function (k, v) {
                $("#selectExcrptionType").append("<option value=\"" + v.NotificationType + "\">" + v.Message + "</option>");
            });
        }
    });
}
function GetExceptionDetail(st, et, dn, t) {
    parent.loading(40);
    $.ajax({
        url: "AjaxService/AjaxService.ashx?action=getexctptiondetail",
        type: "POST",
        data: {
            "st": st, "et": et, "dn": (dn == "" ? dn : JSON.stringify({ "dn": dn })), "t": t
        },
        dataType: "json",
        error: function (err) {
            parent.toastrMessage("opts_waming", "获取报警详单列表失败", allPage.toastrTitle1);
        },
        success: function (res) {
            var data = res[""];
            var html = [];
            $("#EDTable tbody").empty();
            var i = 0;
            parent.loading(60);
            $.each(data, function (k, v) {
                if (v.DeviceName.length == 0)
                    v.DeviceName = v.SerialNumber;
                html.push(" <tr name=\"" + v.SerialNumber + "\">");
                html.push(" <td>" + (++i) + "</td>");
                html.push(" <td>" + v.DeviceName + "</td>");
                html.push(" <td>" + v.Message + "</td>");
                html.push(" <td>" + v.edate + "</td>");
                html.push(" <td>" + v.ddate + "</td>");
                html.push(" <td> <a title=\"查看地图\" style=\"cursor:pointer\" onclick='openMap(\"" + v.DeviceName + "\",\"" + v.edate + "\",\"" + v.ddate + "\"," + v.BaiduLat + "," + v.BaiduLng + ",\"\",\"" + v.Address + "\",\"ExceptionDetail\" )'>" + parseFloat(v.BaiduLat).toFixed(5) + "," + parseFloat(v.BaiduLng).toFixed(5) + " </a> </td>");
                html.push(" <td> <a title=\"解析地址\" style=\"cursor:pointer\" id=\"row_id" + i + "\" onclick='GetAddress( " + v.BaiduLat + "," + v.BaiduLng + ", \"#row_id" + i + "\")'>" + v.Address + "</a> </td>");
                html.push("  </tr>");
            });
            $("#EDTable tbody").append(html.join(''));
            parent.loading(100);
        }
    });
}
function GetFencesView(st, et, dn) {
    parent.loading(40);
    $.ajax({
        url: "AjaxService/AjaxService.ashx?action=GetFencesView",
        type: "POST",
        data: {
            "st": st, "et": et, "dn": (dn == "" ? dn : JSON.stringify({ "dn": dn }))
        },
        dataType: "json",
        error: function (err) {
            parent.toastrMessage("opts_waming", "查询电子围栏失败", allPage.toastrTitle1);
        },
        success: function (res) {
            var data = res[""];
            var html = [];
            $("#GFDTable tbody").empty();
            var i = 0;
            parent.loading(60);
            $.each(data, function (k, v) {
                if (v.et.length == 0) {
                    return true;
                }
                if (v.DeviceName.length == 0)
                    v.DeviceName = v.SerialNumber;
                html.push(" <tr name=\"" + v.SerialNumber + "\">");
                html.push(" <td>" + (++i) + "</td>");
                html.push(" <td>" + v.DeviceName + "</td>");
                html.push(" <td>" + v.Note + "</td>");
                html.push(" <td>" + v.st + "</td>");
                html.push(" <td>" + v.et + "</td>");
                var time = MinuteToHour(v.TimediffMinute);
                html.push(" <td>" + time + "</td>");
                v.ShowType = "FencesView";
                html.push(" <td> <a title=\"查看地图\" style=\"cursor:pointer\" onclick='openMap(\"" + v.DeviceName + "\",\"" + v.st + "\",\"" + v.et + "\"," + v.BaiduLat + "," + v.BaiduLng + ",\"" + v.time + "\",\"" + (v.Address + "," + v.Note) + "\",\"FencesView\" )'>" + parseFloat(v.BaiduLat).toFixed(5) + "," + parseFloat(v.BaiduLng).toFixed(5) + " </a> </td>");
                html.push(" <td> <a title=\"解析地址\" style=\"cursor:pointer\" id=\"row_id" + i + "\" onclick='GetAddress( " + v.BaiduLat + "," + v.BaiduLng + ", \"#row_id" + i + "\")'>" + v.Address + "</a> </td>");
                html.push("  </tr>");
            });
            $("#GFDTable tbody").append(html.join(''));
            parent.loading(100);
        }
    });
}

function GetCurrentUserDevicesName(select, UserID) {
    var key = "UserID_" + (UserID || "");
    window.top.UserDevicesName = window.top.UserDevicesName || {};
    if (window.top.UserDevicesName && window.top.UserDevicesName[key]) {
        addDoc(window.top.UserDevicesName[key]);
        return;
    }
    $.ajax({
        url: "/AjaxService/AjaxService.ashx?action=GetCurrentUserDevicesName",
        type: "POST",
        data: {
            userid: UserID,
            t: new Date().getTime()
        },
        dataType: "json",
        error: function (err) {
            // parent.toastrMessage("opts_waming", "获取设备名称失败", allPage.toastrTitle1); 
        },
        success: function (res) {
            res = res[""];
            window.top.UserDevicesName[key] = res;
            addDoc(res);
        }
    });
    function addDoc(res) {
        $(select).empty();
        var html = [];
        $.each(res, function (k, v) {
            html.push("<option DeviceID=\"" + v.DeviceID + "\" SpeedLimit=\"" + v.SpeedLimit + "\" value=\"" + v.SerialNumber + "\">" + v.DeviceName + "</option>");
        });
        $(select).append(html.join(''));
    }
}

function GetAddress(lat, lng, obj) {
    var map = new BMap.Map("allmap");
    var point = new BMap.Point(lng, lat);
    map.centerAndZoom(point, 12);
    var geoc = new BMap.Geocoder();
    geoc.getLocation(point, function (rs) {
        var addComp = rs.addressComponents;
        $(obj).parent().text(addComp.province + addComp.city + addComp.district + addComp.street + addComp.streetNumber);
    });
    return false;
}

function openMap(devicename, time1, time2, BaiduLat, BaiduLng, time3, Address, type) {
    //\"" + v.DeviceName + "\",\"" + v.st + "\",\"" + v.et + "\",\"" + v.Latitude + "\",\"" + v.Longitude + "\",\"" + v.time + "\")\">" 
    parent.loadJScript(devicename, time1, time2, BaiduLat, BaiduLng, time3, Address, type);
    $("#ModalShowMap", window.parent.document).modal('show', { backdrop: 'static' });
    return false;
}

function ImportExcel(type, st, et, dn, emtype, yh, uid, otherData) {
    if (!st || !et) {
        layer.alert("请先进行查询.", { icon: 6 });
        return;
    }
    var layerLoad;
    if (layer) {
        layerLoad = layer.msg('正在生成文件，请稍后...', {
            icon: 16
             , shade: 0.3,
            time: 0
        });
    }

    var t = new Date().getTime();
    $.ajax({
        url: "/AjaxService/AjaxService.ashx?action=ImportExcel&t=" + t,
        type: "POST",
        cache: false,
        data: {
            type: type,
            st: st,
            et: et,
            emtype: emtype,
            yh: yh,
            dn: (dn == "" ? dn : JSON.stringify({ "dn": dn })),
            userid: uid,
            otherData: JSON.stringify(otherData)
        },
        dataType: "text",
        error: function (err) {
            parent.toastrMessage("opts_waming", "下载失败", allPage.toastrTitle1);
        },
        success: function (res) {
            res = JSON.parse(res);
            if (res.success) {
                var src = "/AjaxService/Log/" + res.FileName;
                $("#downloadIframe").attr("src", src);
            }
            if (layerLoad) {
                layer.close(layerLoad);
                layerLoad = null;
            }
        },
    });
}

function GetDevicesModel(obj) {
    $.ajax({
        url: "/AjaxService/AjaxService.ashx?action=AllDeviceModel",
        type: "POST",
        dataType: "json",
        error: function (err) {
            // parent.toastrMessage("opts_waming", "查询失败", allPage.toastrTitle1);
        },
        success: function (res) {
            res = res[""];
            var html = [];
            $(obj).empty();
            $.each(res, function (k, v) {
                html.push("<option value=\"" + v.DataValue + "\">" + v.DataText + "</option>");
            });
            $(obj).append(html.join(''));
        }
    });
}

function GetOfflineDevice(uid, model, st, et) {
    show_loading_bar(40);
    $.ajax({
        url: "/AjaxService/AjaxService.ashx?action=GetOfflineDevice",
        type: "POST",
        dataType: "json",
        data: { "uid": uid, "st": st, "et": et, "t": parent.ModelType == undefined ? "0" : parent.ModelType, "model": (model == "" ? model : JSON.stringify({ "model": model })) },
        error: function (err) {

        },
        success: function (res) {
            show_loading_bar(50);
            var html = [];
            $("#OffLineDeviceTable tbody").empty();
            var i = 0;
            $.each(res[""], function (k, v) {
                if (v.DeviceName.length == 0)
                    v.DeviceName = v.SerialNumber;
                html.push(" <tr name=\"" + v.DataText + "\">");
                html.push(" <td>" + (++i) + "</td>");
                html.push(" <td>" + v.DeviceName + "</td>");
                html.push(" <td>" + v.SerialNumber + "</td>");
                html.push(" <td>" + v.DataText + "</td>");
                html.push(" <td>" + v.PhoneNum + "</td>");
                html.push(" <td>" + v.HireExpireDate + "</td>");
                html.push(" <td>" + v.LastCommunication + "</td>");
                html.push(" <td>" + MinuteToHour(v.offTime) + "</td>");
                html.push("  </tr>");
            });
            $("#OffLineDeviceTable tbody").append(html.join(''));
            parent.ModelType = 0;
            show_loading_bar(100);
        }
    });
}

function GetDeviceInfoBySerialNumber(DeviceID) {

    $.ajax({
        url: "/AjaxService/AjaxService.ashx?action=GetDeviceInfoBySerialNumber",
        type: "POST",
        dataType: "json",
        data: { "DeviceID": DeviceID },
        error: function (err) {

        },
        success: function (res) {
            var d = res[""][0];
            $("#txtDeviceIMEI").val(d.SerialNumber);
            $("#txtDeviceHireExpireDate").val(d.HireExpireDate);
            $("#txtDeviceModel").val(d.DataText);
            $("#txtDeviceStartDate").val(d.HireStartDate);
            $("#txtDeviceName").val(d.DeviceName);
            if (d.ServerID == "1")
                $("#checkDeviceLBS").attr("checked", true);
            $("#txtDevicePhoneNum").val(d.PhoneNum);
            $("#txtSpeedLimit").val(d.SpeedLimit);
            $("#txtDeviceCarNum").val(d.CarNum);
            $("#txtDeviceCallPhone").val(d.CellPhone);
            $("#txtDeviceCarUserName").val(d.CarUserName);
            $("#txtDevice100KM").val(d.OILCoefficient);
            $("input[name=radioImg][value=" + d.Icon + "]").attr("checked", true);
            $("#imgDeviceCarImg").attr("src", d.CarImg).attr("imgName", d.CarImg.split('/')[1]);
            $("#txtDeviceDescription").val(d.Description);

        }
    });
}

function SaveDevieInfo(DeviceID) {
    var msg = "";
    //if ($.trim($("#txtDeviceName").val()) == "") {
    //    toastr.warning("设备名字不能为空！", allPage.toastrTitle2, opts_waming);
    //    return;
    //}
    //if ($.trim($("#txtDevicePhoneNum").val()) == "") {
    //    toastr.warning("设备电话不能为空！", allPage.toastrTitle2, opts_waming);
    //    return;
    //}
    var data = {
        "DeviceName": $("#txtDeviceName").val(), "LBS": $("#checkDeviceLBS").is(':checked'), "DevicePhoneNum": $("#txtDevicePhoneNum").val(), "SpeedLimit": $("#txtSpeedLimit").val(), "DeviceCarNum": $("#txtDeviceCarNum").val(),
        "DeviceCallPhone": $("#txtDeviceCallPhone").val(), "DeviceCarUserName": $("#txtDeviceCarUserName").val(), "Device100KM": $("#txtDevice100KM").val(), "Icon": $("input[name=radioImg]:checked").val(),
        "DeviceDescription": $("#txtDeviceDescription").val(), "DeviceID": DeviceID, "DeviceCarImg": $("#imgDeviceCarImg").attr("imgName")
    };
    $.ajax({
        url: "AjaxService/AjaxService.ashx?action=SaveDeviceInfo",
        type: "POST",
        dataType: "json",
        data: { "UpdateData": JSON.stringify(data) },
        error: function (err) {

        },
        success: function (res) {
            if (res.success) {
                $("#btnModalClose").trigger("click");
                toastr.success(res.msg, allPage.toastrTitle1, opts_success);
            } else {
                toastr.warning(res.msg, allPage.toastrTitle2, opts_waming);
            }
        }
    });
}

function clearAllMeaage() {
    var userID = $("#userid").val();
    $.ajax({
        url: "AjaxService/AjaxService.ashx?action=clearAllMessage",
        type: "post",
        data: { "UserID": userID },
        dataType: "json",
        error: function () { },
        success: function (reg) {
            if (reg.success) {
                toastr.success(reg.msg, allPage.toastrTitle1, opts_success);
                $("#clearAllMessageClose").trigger("click");
                $("#iframepage").attr("src", $("#iframepage").attr("src"));
                alarmTime(userID);
            } else {
                toastr.warning(reg.msg, allPage.toastrTitle1, opts_waming);
            }
        }
    });
}

function UpdatePwd() {
    var html = [];
    html.push("<table style=\"width:100%;\">");
    html.push("<tr><td><label for=\"field-1\" class=\"control-label\" style=\"float:left;\">&nbsp&nbsp 旧密码：</label> </td><td><input type=\"password\" class=\"form-control\" id=\"txtOldPassword\" style=\"float:left;width:200px;\" /> </td></tr> ");
    html.push("<tr><td><label for=\"field-1\" class=\"control-label\" style=\"float:left;\">&nbsp&nbsp 新密码：</label> </td> <td><input type=\"password\" class=\"form-control\" id=\"txtNewPassword\" maxlength=\"15\" style=\"float:left;width:200px; \" /> </td> </tr>");
    html.push("<tr><td><label for=\"field-1\" class=\"control-label\" style=\"float:left;\">确认新密码：</label> </td> <td>   <input type=\"password\" class=\"form-control\" id=\"txtConfirmNewPassword\" maxlength=\"15\" style=\"float:left;width:200px;\" /> </td> </tr>");
    html.push("</table>");
    var opts = {
        title: mapPage.setPassword,
        bodyHtml: html.join(''),
        showBtnConfirm: true
    };
    var modal = new loadModalWindows(opts);
    modal.ConfirmClick(function () {
        var Old = $("#txtOldPassword").val();
        var New = $("#txtNewPassword").val();
        var Confirm = $("#txtConfirmNewPassword").val();
        if (New != Confirm) {
            toastr.warning("两次输入密码不一致", allPage.toastrTitle2, opts_waming);
            return;
        }
        if (New.length < 3) {
            toastr.warning("密码最少为3位数", allPage.toastrTitle2, opts_waming);
            return;
        }
        if (Old == New) {
            toastr.warning("新密码不能跟旧密码一样", allPage.toastrTitle2, opts_waming);
            return;
        }
        $.ajax({
            url: "AjaxService/AjaxService.ashx?action=UpdatePassword",
            type: "post",
            data: { "NewPassword": New, "OldPassword": Old },
            dataType: "json",
            error: function () { },
            success: function (reg) {
                if (reg.success) {
                    toastr.success(reg.msg, allPage.toastrTitle1, opts_success);
                    modal.CloseModal();
                } else {
                    toastr.warning(reg.msg, allPage.toastrTitle1, opts_waming);
                }
            }
        });
    });
}

function SearchBox(id, v) {
    show_loading_bar(25);
    var name = $("#" + id).val();
    if (v == 0) {
        $("#ModalShowDeviceDetail").load("ModalShowOfflineDevice.aspx #DivSearchDevice", function (response, status, xhr) {
            $("#ModalShowDeviceDetail").modal('show', { backdrop: 'static' });
            $("#btnSearchDevices").on("click", function () { SearchBox('txtSearchDeviceName', 0) });
            if (name == "") {
                show_loading_bar(100);
                return
            }
            $("#txtSearchDeviceName").val(name);
            $.ajax({
                url: "AjaxService/AjaxService.ashx?action=SearchDevices",
                type: "post",
                data: { "SearchText": name },
                dataType: "json",
                error: function () { },
                success: function (data) {
                    var html = [];
                    show_loading_bar(60);
                    $("#SearchDevicesTable tbody").empty();
                    $.each(data[""], function (k, v) {
                        html.push("<tr>");
                        html.push("<td>" + v["num"] + "</td>");
                        html.push("<td>" + v["DeviceName"] + "</td>");
                        html.push("<td>" + v["SerialNumber"] + "</td>");
                        html.push("<td>" + v["UserName"] + "</td>");
                        html.push("<td>" + v["PhoneNum"] + "</td>");
                        html.push("<td>" + v["CarUserName"] + "</td>");
                        html.push("<td>" + v["Created"] + "</td>");
                        html.push("<td>" + (v["HireExpireDate"] == "1900/1/1 0:00:00" || v["HireExpireDate"] == "1900-01-01 0:00:00" ? "未激活" : v["HireExpireDate"]) + "</td>");
                        html.push("<td><a href=\"javascript:void(0);\" onclick=\"MonitorDevice(" + v["DeviceID"] + ",'" + v["SerialNumber"] + "'," + v["UserID"] + ",'" + name + "')\">监控</a>|");
                        html.push("<a href=\"javascript:void(0);\" onclick=\"DeviceView(" + v["DeviceID"] + ",'" + v["SerialNumber"] + "'," + v["UserID"] + ",'" + name + "')\">查看</a>|");
                        html.push("<a href=\"javascript:void(0);\" onclick=\"DeviceShiftOrExpire('shift',[{DeviceID:'" + v["DeviceID"] + "',UserName:'" + v["UserName"] + "',IMEI:'" + v["SerialNumber"] + "',DeviceName:'" + v["DeviceName"] + "'}])\">设备转移</a>|");
                        html.push("<a href=\"javascript:void(0);\" onclick=\"UpdateDevice(" + v["DeviceID"] + ")\">修改</a>");
                        html.push("</td></tr>");
                    });
                    $("#SearchDevicesTable tbody").append(html.join(''));
                    show_loading_bar(100);
                }
            });
            $.ajax({
                url: "AjaxService/AjaxService.ashx?action=SearchUsers",
                type: "post",
                data: { "SearchText": name },
                dataType: "json",
                error: function () { },
                success: function (data) {
                    var html = [];
                    show_loading_bar(60);
                    $("#SearchUsersTable tbody").empty();
                    var num = 0;
                    $.each(data[""], function (k, v) {
                        html.push("<tr>");
                        html.push("<td>" + (++num) + "</td>");
                        html.push("<td>" + v["UserName"] + "</td>");
                        html.push("<td>" + v["LoginName"] + "</td>");
                        html.push("<td>" + v["FirstName"] + "</td>");
                        html.push("<td>" + v["CellPhone"] + "</td>");
                        html.push("<td><a href=\"javascript:void(0);\" onclick=\"MonitorUsers('" + v["UserID"] + "','" + name + "')\">监控</a>|<a href=\"javascript:void(0);\" onclick=\"UsersView('" + v["UserID"] + "','" + name + "')\">查看</a></td>");
                        html.push("</tr>");
                    });
                    $("#SearchUsersTable tbody").append(html.join(''));
                    show_loading_bar(100);
                }
            });
        });
    } else {
        $("#ModalShowDeviceDetail").load("ModalShowOfflineDevice.aspx #DivSearchUsers", function (response, status, xhr) {
            $("#ModalShowDeviceDetail").modal('show', { backdrop: 'static' });
            $("#btnSearchUsers").on("click", function () { SearchBox('txtSearchUsers', 1) });
            if (name == "") {
                show_loading_bar(100);
                return
            }
            $("#txtSearchUsers").val(name);
            $.ajax({
                url: "AjaxService/AjaxService.ashx?action=SearchUsers",
                type: "post",
                data: { "SearchText": name },
                dataType: "json",
                error: function () { },
                success: function (data) {
                    var html = [];
                    show_loading_bar(60);
                    $("#DivSearchUsers table tbody").empty();
                    var num = 0;
                    $.each(data[""], function (k, v) {
                        html.push("<tr>");
                        html.push("<td>" + (++num) + "</td>");
                        html.push("<td>" + v["UserName"] + "</td>");
                        html.push("<td>" + v["LoginName"] + "</td>");
                        html.push("<td>" + v["FirstName"] + "</td>");
                        html.push("<td>" + v["CellPhone"] + "</td>");
                        html.push("<td><a href=\"javascript:void(0);\">查看</a>|<a href=\"javascript:void(0);\">定位</a></td>");
                        html.push("</tr>");
                    });
                    $("#DivSearchUsers table tbody").append(html.join(''));
                    show_loading_bar(100);
                }
            });
        });
    }
}

function MonitorDevice(DeviceID, imei, UserID, searchText) {
    window.location.href = "main.aspx?imei=" + imei + "&userid=" + UserID + "&search=" + (searchText == undefined ? "" : searchText);
}
function DeviceView(DeviceID, imei, UserID, searchText) {
    window.location.href = "Devices.aspx?imei=" + imei + "&userid=" + UserID + "&search=" + searchText;
}
function MonitorUsers(UserID, searchText) {
    window.location.href = "main.aspx?userid=" + UserID + "&search=" + searchText;;
}
function UsersView(UserID, searchText) {
    window.location.href = "Devices.aspx?userid=" + UserID + "&search=" + searchText;;
}

function ShowBasicModal(text, callback, userid) {
    $("#ModalShowDeviceDetail").load("ModalShowOfflineDevice.aspx #BasicModal", function (response, status, xhr) {
        $("#ModalShowDeviceDetail").modal('show', { backdrop: 'static' });
        $(".modal-body").text(text);
        $("#btnConfirm").on("click", function () {
            //arguments ; 参数的数组
            callback(userid);
        });
        // $("#BasicModal .btn.btn-white").on("click", function () {  });
    });
}

function GetAddressByLatlng(lat, lng, id, callback) {
    if (lat == -1.0 && lng == -1.0) {
        return "未知.";
    }
    callback = callback || function () { };
    var CacheKey = "key_" + lat + lng;
    window.addressCache = window.addressCache || {};
    if (window.addressCache[CacheKey]) {
        if (id) {
            $("#" + id).text(window.addressCache[CacheKey]);
        }
        callback(window.addressCache[CacheKey]);
        return window.addressCache[CacheKey] || "";
    }

    $.ajax({
        url: "/AjaxService/AjaxService.ashx?action=getaddressbylatlng",
        type: "post",
        data: { "lat": lat, "lng": lng },
        dataType: "text",
        error: function () { },
        success: function (address) {
            window.addressCache[CacheKey] = address;
            callback(address);
            if (id != undefined)
                $("#" + id).text(address);

            return address;
        }
    });
}


function loadModalWindows(_opts) {
    //title, bodyHtml, showBtnConfirm 
    this.modalID = "modalForms";

    if (_opts.cache) {
        this.modalID = this.modalID + $("#modalForms").length;
    } else {
        if ($("#modalForms").length > 0)
            $("#modalForms").remove();
    }
    this.modalID = "modalForms";
    if ($("#" + this.modalID).length > 0)
        $("#" + this.modalID).remove();
    var html = [];
    html.push(" <div class=\"modal fade\" id=\"" + this.modalID + "\">");
    html.push("<div class=\"modal-dialog\" id=\"dialog\">");
    html.push("<div class=\"modal-content\">");
    html.push("<div class=\"modal-header\">");
    html.push("<button type=\"button\" class=\"close\" data-dismiss=\"modal\" aria-hidden=\"true\">&times;</button>");
    html.push("<h4 class=\"modal-title\" style=\"font-weight:bold;color:#808080;\">" + _opts.title + "</h4>");
    html.push("</div>");
    html.push("<div class=\"modal-body\"> ");

    html.push(_opts.bodyHtml);

    html.push("</div>");
    html.push("<div class=\"modal-footer\">");
    if (_opts.showBtnConfirm)

        html.push("<button type=\"button\" class=\"btn btn-info\" id=\"btnModalConfirm\">" + allPage.confirm + "</button>");
    html.push("<button type=\"button\" class=\"btn btn-white\" data-dismiss=\"modal\" id=\"btnModalClose\" >" + allPage.cancel + "</button>");
    html.push("</div></div></div></div> ");

    $("body").append(html.join(''));
    $("#" + this.modalID + "").modal('show', { backdrop: 'static' });
}
loadModalWindows.prototype.CloseModal = function () {
    $("#btnModalClose").trigger("click");
}
loadModalWindows.prototype.LoadModal = function (callback) {
    callback();
}
loadModalWindows.prototype.ConfirmClick = function (callback) {

    $("#btnModalConfirm").unbind("click").click(function () {
        try {
            callback();
        } catch (e) {
        }

    });
}
loadModalWindows.prototype.NoDisabled = function () {
    $("#btnModalConfirm").removeClass("disabled");
}
loadModalWindows.prototype.Disabled = function () {
    $("#btnModalConfirm").addClass("disabled");
}
loadModalWindows.prototype.changeWidth = function (css) {
    $("#dialog").css(css);
}

function ggPoints() {

    // 百度地图API功能
    //GPS坐标
    var x = 114.00431666666666666667;
    var y = 23.06568000000000000000;
    var ggPoint = new BMap.Point(x, y);

    //地图初始化
    var bm = new BMap.Map("allmap");
    bm.centerAndZoom(ggPoint, 15);
    bm.addControl(new BMap.NavigationControl());

    //添加gps marker和label
    var markergg = new BMap.Marker(ggPoint);
    bm.addOverlay(markergg); //添加GPS marker
    var labelgg = new BMap.Label("未转换的GPS坐标（错误）", { offset: new BMap.Size(20, -10) });
    markergg.setLabel(labelgg); //添加GPS label

    //坐标转换完之后的回调函数
    translateCallback = function (data) {
        if (data.status === 0) {
            var marker = new BMap.Marker(data.points[0]);
            bm.addOverlay(marker);
            var label = new BMap.Label("转换后的百度坐标（正确）", { offset: new BMap.Size(20, -10) });
            marker.setLabel(label); //添加百度label
            bm.setCenter(data.points[0]);
        }
    }

    setTimeout(function () {
        var convertor = new BMap.Convertor();
        var pointArr = [];
        pointArr.push(ggPoint);
        convertor.translate(pointArr, 1, 5, translateCallback)
    }, 1000);
}