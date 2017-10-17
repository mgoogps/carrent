var timeOut;


function aMoreClick(_this) {
    var id;
    if (zTree_Menu == null) {
        id = $("#userid").val();
    } else {
        id = zTree_Menu.getSelectedNodes()[0].id
    }
    var offset = $(_this).offset();
    var groupid = $(_this).attr("groupid");
    var a_deviceid = $($("a[name=aMore]")[1]).parent().parent().attr("id");  //a_deviceid_IMEI
    var model = $(_this).attr("model");  // $($("a[name=aMore]")[1]).parent().parent().attr("model");
    var modelName = $(_this).attr("modelName");
    var top = 0;
    var DeviceID = $(_this).attr("DeviceID");
    var html = [];
    html.push("<ul id=\"ulMore\" style=\"margin-left:3px;\">");
    html.push("<li><a href=\"#deviceInfo\" id=\"aDeviceInfo\">" + allPage.deviceInfo + "</a></li>");
    html.push("<li><a target=\"_blank\" href=\"Geofences.aspx?id=" + id + "&deviceid=" + DeviceID + "&t=" + new Date().getTime() + "\">" + mapPage.geofence + "</a></li>");
    if ($("#loginType").val() == 0)
        html.push("<li deviceid=\"" + a_deviceid + "\" groupid=\"" + groupid + "\" onmouseleave=\"liGroupMouseleave(this)\" onmouseenter=\"liGroupMouseenter(this)\"><a href=\"#\">" + mapPage.moveToGroup + "</a></li>");
    switch (modelName) {
        case "MG-X21":
        case "MG-X20":
        case "MG-X10":
            if ($("#loginType").val() == 0) {
                html.push("<li><a href=\"#\">" + mapPage.cutOffPetrol + "</a></li>");
                html.push("<li><a href=\"#\">" + mapPage.restorePetrol + "</a></li>");
            }
            html.push("<li><a href=\"#\">" + mapPage.deviceFortify + "</a></li>");
            html.push("<li><a href=\"#\">" + mapPage.deviceDismiss + "</a></li>");
            html.push("<li><a href=\"#\">" + mapPage.uploadTime + "</a></li>");
            break;
        case "MG-300":
            if ($("#loginType").val() == 0) {
                html.push("<li><a href=\"#\">" + mapPage.cutOffPetrol + "</a></li>");
                html.push("<li><a href=\"#\">" + mapPage.restorePetrol + "</a></li>");
            }
            html.push("<li><a href=\"#\">" + mapPage.checkLocation + "</a></li>");
            break;
        case "MG-X81":
            html.push("<li><a href=\"#\">" + mapPage.uploadTime + "</a></li>");
            break;
        case "MG-X83":
            html.push("<li><a href=\"#\">打开GPS时间</a></li>");
            break;
    }
    html.push("<li><a href=\"#\" id=\"aCheckCommand\">" + mapPage.checkCommand + "</a></li>");
    //html.push("<li><a href=\"#\" id=\"aDownloadLocation\">" + mapPage.downloadLocation + "</a></li>");
    //html.push("<li><a href=\"#\">用户POI管理</a></li>");
    html.push("</ul>");
    $("#divMore").empty().append(html.join(''));
    if (($(window).height() - offset.top) < $("#divMore").height())
        top = $("#divMore").height() - 15;

    $("#divMore").css({ "left": offset.left + "px", "top": (offset.top - top) + "px", "background-color": "white" }).show();

    $("#aDeviceInfo").on("click", function () {
        editDeviceInfo(DeviceID);
    });
    $("#aCheckCommand").on("click", function () {
        var html = [];
        html.push("<table cellspacing=\"0\" style=\"color:black;font-size:12px;\" class=\"table table-small-font table-bordered table-striped\" id=\"tbCheckCommand\">");
        html.push("<thead><tr>");
        html.push("<th style=\"width:70px;\">" + allPage.num + "</th>");
        html.push("<th style=\"width:120px;\">" + mapPage.cmdType + "</th>");
        html.push("<th style=\"width:110px;\">" + mapPage.cmdState + "</th>");
        html.push("<th style=\"width:100px;\">" + mapPage.responseText + "</th> ");
        html.push("<th style=\"width:150px;\">" + mapPage.responseTime + "</th>  ");
        html.push("<th style=\"width:150px;\">" + mapPage.sendTime + "</th>");
        html.push("</tr></thead>");
        html.push("<tfoot><tr>");
        html.push("<th>" + allPage.num + "</th>");
        html.push("<th>" + mapPage.cmdType + "</th>");
        html.push("<th>" + mapPage.cmdState + "</th>");
        html.push("<th>" + mapPage.responseText + "</th> ");
        html.push("<th>" + mapPage.responseTime + "</th>  ");
        html.push("<th>" + mapPage.sendTime + "</th>");
        html.push("</tr></tfoot>");
        html.push("<tbody></tbody>");
        html.push("</table>");
        var opts = {
            title: mapPage.checkCommandTitle,
            bodyHtml: html.join('')
        }
        var modal = new loadModalWindows(opts);

        modal.LoadModal(function () {
            modal.changeWidth({ "width": "760px" });
            $.ajax({
                url: "/AjaxService/AjaxService.ashx?action=GetCommandList",
                type: "POST",
                data: { DeviceID: DeviceID },
                dataType: "json",
                success: function (data) {
                    var html = [];
                    $.each(data[""], function (k, v) {
                        var state = "";
                        var responseMsg = "";
                        var responseDate = "";
                        var sendDate = "";
                        if (v.IsResponse == "True") {
                            state = mapPage.deviceResponse;
                            responseMsg = v.ResponseText;
                            responseDate = v.ResponseDate;
                            sendDate = v.sendDate;
                        } else if (v.isSend == "True") {
                            state = mapPage.sendSuccess2;
                            sendDate = v.sendDate;
                        } else {
                            state = mapPage.noSend;
                        }
                        html.push("<tr>");
                        html.push("<td>" + v.num + "</td>");
                        html.push("<td>" + commandNameType(v.CommandName) + "</td>");
                        html.push("<td>" + state + "</td>");
                        html.push("<td>" + responseMsg + "</td>");
                        html.push("<td>" + responseDate + "</td>");
                        html.push("<td>" + sendDate + "</td>");
                        html.push("</tr>");
                    });
                    $("#tbCheckCommand tbody").append(html.join(''));
                },
                error: function () { }
            });
        });
    });

    $("#aDownloadLocation").on("click", function () {

        var date2 = GetCurrentDate();
        $("#DivDownLoadLocation").parent().modal('show', { backdrop: 'static' });
        $("#txtDownLoadGoogleKmlDate").val(date2).on("focus", function () {
            var zindex = $("#DivDownLoadLocation").parent().css("zIndex");
            $("div.datepicker").css("zIndex", zindex + 100);
        });
         
        $("#SelectDevicesList").select2({
            placeholder: allPage.search1,
            allowClear: true
        }).on('select2-open', function () {
            $(this).data('select2').results.addClass('overflow-hidden').perfectScrollbar();
        });

        var zTree = $.fn.zTree.getZTreeObj("treeDemo");
        var userid = zTree.getSelectedNodes()[0].id;

        $.ajax({
            url: "AjaxService/AjaxService.ashx?action=GetDevices",
            data: { "u": userid },
            type: "POST",
            dataType: "text",
            success: function (res) {
                var data = JSON.parse(res);
                var html = [];
                html.push("<option></option>");
                $.each(data, function (k, v) {
                    html.push("<option value=\"" + v["did"] + "\">" + v["DeviceName"] + "</option>");
                });
                $("#SelectDevicesList").empty().append(html.join(''));
                $("#SelectDevicesList").select2("val", DeviceID);
            },
            error: function () {
                //toastr.warning("   失败  ！", "警告", opts_waming);
            }
        });
        $("#btnDownLoadGoogleKml").unbind("click").click(function () {
            var date = $("#txtDownLoadGoogleKmlDate").val(); 
            $.ajax({
                url: "AjaxService/AjaxService.ashx?action=DownLoadGoogleKml",
                data: { "Date": date, "DeviceID": DeviceID },
                type: "POST",
                dataType: "text",
                success: function (res) {

                },
                error: function () {
                    //toastr.warning("   失败  ！", "警告", opts_waming);
                }
            });
        });

    });

    $("#divMore ul>li").on("click", function () {
        $("#ulMore").remove();
        var commandType = "";
        switch ($(this).text()) {
            case mapPage.cutOffPetrol:
                if (modelName == "MG-300") {
                    commandType = "DYD";
                } else {
                    commandType = "S201";
                }
                break;
            case mapPage.restorePetrol:
                if (modelName == "MG-300") {
                    commandType = "HFYD";
                } else {
                    commandType = "S200";
                }
                break;
            case mapPage.deviceFortify:
                commandType = "SCF0";
                break;
            case mapPage.deviceDismiss:
                commandType = "SCF1";
                break;
            case "打开GPS时间":
                commandType = "209CDW";
                break;
            case mapPage.uploadTime:
                commandType = "S7122";
                break;
            case mapPage.checkLocation:
                commandType = "CheckLocation";
                break;
            case "唤醒间隔":
                if (modelName == "MG-X83BF") { 
                    commandType = "83BF";
                } else {
                    commandType = "VTR";
                }
                break;
                //MG-X11D
            case "设防":
                commandType = "X11D,SF";
                break;
            case "撤防":
                commandType = "X11D,CF";
                break;
            case "刹车":
                commandType = "X11D,DY";
                break;
            case "取消刹车":
                commandType = "X11D,TY";
                break;
            case "围栏-开":
                commandType = "X11D,DZWL-ON";
                break;
            case "围栏-关":
                commandType = "X11D,DZWL-OFF";
                break;
        }
        //MG-X21,MG-X20，MG-X10 --  S200/远程恢复油电， S201/远程断油电， SCF1/终端撤防 ， SCF0/终端设防 ， S712/上传间隔
        //MG-300, CheckLocation/查询定位， HFYD/远程恢复油电 ，DYD/远程断油电
        //MG-X81,MG-X50  S712/上传间隔
        //MG-X83 209CDW/打开GPS时间
        if (commandType != "") {
            var html = [];
            html.push("<table style=\"line-height:30px;width:100%;\"><tr><td style=\"text-align:center\">" + dealerPage.name3 + "：</td><td>" + $("font[name=CurrentDeviceName]").text() + "</td></tr>");
            if (commandType == "S7122") {
                html.push("<tr><td style=\"text-align:center\"><label for=\"field-1\" class=\"control-label\" style='width:30%'>" + allPage.type2 + "：</label></td><td><select id=\"selectSCPL\" stlye=\"height:30px;\"><option value=\"S7122\">" + mapPage.setUploadMoveTime + "</option><option value=\"S7123\">" + mapPage.setUploadStopTime + "</option></select></td></tr>");
                html.push("<tr><td style=\"width:30%;text-align:center\">" + mapPage.uploadTime + "：" + "</td><td><input type=\"text\" id=\"txtSetInterval\" maxlength=\"4\" autocomplete=\"off\"  style=\"width:50px;\" /> <label >(" + mapPage.danwei5s + ")</label></td></tr>");
            } else if (commandType == "209CDW") {
                html.push("<tr> <td style=\"text-align:center\"><label for=\"field-1\" class=\"control-label\" style='width:50%'>打开GPS时间：</label></td><td> <input type=\"text\" class=\"form-control\" id=\"txtOpenGPSDate\" style=\"float:left;width:50px; \" maxlength=\"3\" />(5-240分钟)</td> </tr>");
                //  html.push("<tr><td>  </td></tr>");
            } else if (commandType == "VTR") {
                html.push("<tr><td style=\"text-align:center\"><label for=\"selectDailyTime\" class=\"control-label\" style='width:50%'>定时唤醒：</label></td><td>");
                html.push("明天<select id=\"selectDailyTime\" stlye=\"height:30px;width:40px;\"> ");
                for (var i = 1; i <= 24; i++) {
                    html.push("<option value=\"" + i + "\">    &nbsp " + i + ":00</option>");
                }
                html.push("</select>点  <input type='checkbox' onclick='chkEffective(this)' id='chkEffective'/>立即生效 </td></tr>");
                html.push("<tr><td style=\"width:30%;text-align:center\">唤醒间隔：" + "</td><td><input type=\"number\" id=\"txtWakeSetInterval\" oninput=\"if(value.length>3)value=value.slice(0,3)\" style=\"width:50px;\" value='1'/> <label >(1～24)小时</label></td></tr>");
                html.push("<tr><td style=\"width:30%;text-align:center\">工作时间：" + "</td><td><input type=\"number\" id=\"txtWakeWordTime\" oninput=\"if(value.length>3)value=value.slice(0,3)\" style=\"width:50px;\" value='5'/> <label >(5～360)分钟,999表示一直工作</label></td></tr>");
                html.push("<tr><td style=\"width:30%;text-align:center\">快捷指令：</td><td><input type='button' class='btn btn-purple btn-sm' id='btnOn24Hours' value='全天候工作'/><input type=\"button\" class='btn btn-purple btn-sm' id='btnOff24Hours' value='关闭全天候工作' /><input type='button' class='btn btn-purple btn-sm' id='btnCustomize' value='自定义'/> </td></tr>");

            } else if (commandType == "X11D,DZWL-ON") {
                html.push("<tr><td style=\"width:30%;text-align:center\">半径：</td><td> <input type=\"number\" class=\"form-control\" id=\"txtLoginPassword\" value='100'style=\"float:left;width:100px; \" />米</td></tr>");
            } else if (commandType == "83BF") {
                html.push("<tr> <td style=\"text-align:center\"><label for=\"field-1\" class=\"control-label\" style='width:55%'>唤醒间隔：</label></td><td> <input type=\"text\" class=\"form-control\" id=\"txtOpenGPSDate1\" style=\"float:left;width:45px; \" maxlength=\"3\" value='0' />(1-999分钟,0恢复默认)</td> </tr>"); 
            } else {
                html.push("<tr><td style=\"width:30%;text-align:center\">" + allPage.password + "：</td><td> <input type=\"password\" class=\"form-control\" id=\"txtLoginPassword\" style=\"float:left;width:200px; \" /></td></tr>");
                html.push("<tr><td colspan=\"2\" style=\"text-align:center\"> <label for=\"field-1\" class=\"control-label\" id=\"labMessage\" > " + mapPage.sendConfirm + " <font style=\"font-weight:bold\">" + $("#userName").val() + "</font>" + allPage.password + "</label></td></tr>");
            }
            html.push("</table>");
           
            var opts = {
                title: $(this).text(), bodyHtml: html.join(''), showBtnConfirm: true
            };  
            var modal = new loadModalWindows(opts);
            modal.ConfirmClick(function () {
                modal.Disabled();
                var p = null; //$("#txtLoginPassword").is(":hidden") ? $("#txtSetInterval").val() : $("#txtLoginPassword").val();

                if ($("#txtLoginPassword").length > 0) {
                    p = $("#txtLoginPassword").val();
                } else if ($("#txtOpenGPSDate").length > 0) {
                    p = $("#txtOpenGPSDate").val();
                    if (isNaN(p)) {
                        toastr.warning("请输入有效数字", allPage.toastrTitle2, opts_waming); modal.NoDisabled();
                        return;
                    }
                    p = parseInt(p);
                    if (p < 5 || p > 240) {
                        toastr.warning("请输入5-240分钟", allPage.toastrTitle2, opts_waming); modal.NoDisabled();
                        return;
                    }

                } else if ($("#txtWakeSetInterval").length > 0) {

                    var wakeInterval = $("#txtWakeSetInterval").val();
                    if (wakeInterval < 1 || wakeInterval > 240) {
                        toastr.warning("请输入1-240小时", allPage.toastrTitle2, opts_waming); modal.NoDisabled();
                        return;
                    }
                    var WakeWordTime = $("#txtWakeWordTime").val();
                    if ((WakeWordTime < 5 || WakeWordTime > 360) && WakeWordTime != 999) {
                        toastr.warning("请输入5-360分钟", allPage.toastrTitle2, opts_waming); modal.NoDisabled();
                        return;
                    }

                    p = $("#selectDailyTime").val() + "," + wakeInterval + "," + WakeWordTime;


                } else if ($("#txtOpenGPSDate1").length > 0) {
                    var gpsdate = $("#txtOpenGPSDate1").val();
                    if (gpsdate >= 0 && gpsdate < 1000) {
                        p = gpsdate;
                    } else {
                        toastr.warning("请输入1-999分钟", allPage.toastrTitle2, opts_waming); modal.NoDisabled();
                        return;
                    }
                } else {
                    p = $("#txtSetInterval").val();
                    if (isNaN(p)) {
                        toastr.warning("请输入有效的数字", allPage.toastrTitle2, opts_waming); modal.NoDisabled();
                        return;
                    }
                    p = parseInt(p);
                    if (p < 5) {
                        toastr.warning(mapPage.secondsMsg1, allPage.toastrTitle2, opts_waming); modal.NoDisabled();
                        return;
                    } else if (p > 9999) {
                        toastr.warning(mapPage.secondsMsg2, allPage.toastrTitle2, opts_waming); modal.NoDisabled();
                        return;
                    }
                }
                SendCommand(a_deviceid.split('_')[2], DeviceID, commandType, "0", model, $("#userid").val(), p, modal);
            });

            $("#btnOff24Hours").on("click", function () {
                $("#selectDailyTime").attr("disabled", "disabled").append("<option value='-1' selected>无效</option>");
                $("#txtWakeSetInterval").attr("disabled", "disabled");
                $("#txtWakeWordTime").attr("disabled", "disabled").val("005");
                $("#chkEffective").attr("disabled", "disabled");
            });
            $("#btnOn24Hours").on("click", function () {
                $("#selectDailyTime").attr("disabled", "disabled").append("<option value='-1' selected>无效</option>");
                $("#txtWakeSetInterval").attr("disabled", "disabled");
                $("#txtWakeWordTime").attr("disabled", "disabled").val("999");
                $("#chkEffective").attr("disabled", "disabled");
            });
            $("#btnCustomize").on("click", function () {
                $("#selectDailyTime").removeAttr("disabled").find("option:contains(无效)").remove();
                $("#txtWakeSetInterval").removeAttr("disabled");
                $("#txtWakeWordTime").removeAttr("disabled");
                $("#chkEffective").removeAttr("disabled");
            });
        }
    });
}


function SendCommand(sn, DeviceID, CommandType, TrueOrFlase, Model, UserID, Pwd, modal) {
    //{SN:a_deviceid.split('_')[2],DeviceID:DeviceID,CommandType:'S201',TrueOrFalse:'0',Model:model,UserID: <%=  Utils.GetSession("UserInfo").UserID  %> ,"pwd":$("#txtLoginPassword").val()}

    $.ajax({
        url: "AjaxService/AjaxService.ashx?action=SendCommand",
        type: "post",
        data: { "data": JSON.stringify({ SN: sn, DeviceID: DeviceID, CommandType: CommandType, TrueOrFalse: TrueOrFlase, Model: Model, UserID: UserID, "pwd": Pwd }) },
        dataType: "json",
        error: function () { modal.NoDisabled(); },
        success: function (reg) {

            if (reg.success) {
                modal.NoDisabled();
                toastr.warning(reg.msg, allPage.toastrTitle1, opts_waming);
                return;
            }
            if (+reg > 3) {
                $("#labMessage").text(mapPage.sendSuccess).parent().parent().parent().show();;
                GetResponse(reg + "", 0, modal);
            } else {
                var msg = "发送成功.";
                if (reg == -1) {
                    msg = mapPage.sendMsg2;
                } else if (reg == 1) {
                    msg = mapPage.sendMsg3;
                } else if (reg == 2) {
                    msg = mapPage.sendMsg4;
                } else if (reg == 3) {
                    msg = mapPage.sendMsg5;
                }

                modal.NoDisabled();
                toastr.success(msg, allPage.toastrTitle1, opts_success);
            }
            //if (reg.success) {
            //    toastr.success(reg.msg, allPage.toastrTitle1, opts_success);
            //    modal.CloseModal();
            //} else {
            //    toastr.warning(reg.msg, allPage.toastrTitle1, opts_waming);
            //    modal.NoDisabled();
            //}
            //$("#labMessage").text(reg.msg);
        }
    });
}

function chkEffective(_this) {


    if ($(_this).attr("checked") == 'checked') {
        $("#txtWakeSetInterval").next().text("(1～240)小时,等于0时唤醒间隔为30分钟");
        $("#selectDailyTime").attr("disabled", "disabled").append("<option value='-1' selected>无效</option>");

    } else {
        $("#selectDailyTime").removeAttr("disabled").find("option:selected").remove();
        $("#txtWakeSetInterval").next().text("(1～24)小时,等于0时唤醒间隔为30分钟");
    }
}

function GetResponse(id, index, modal) {
    var TimeZone = "China Standard Time";
    $.ajax({
        type: "post",
        url: "AjaxService/AjaxService.ashx?action=GetResponse",
        // contentType: "application/json",
        data: { CommandID: id, TimeZones: TimeZone },
        dataType: "text",
        success: function (result) {
            index++;
            var str = result;
            if (str == "" || str == null || str == "null" || str == undefined) {
                if (index == 3) {
                    toastr.warning(mapPage.responseNull, allPage.toastrTitle2, opts_waming);
                    modal.CloseModal();
                } else {
                    setTimeout(function () {
                        GetResponse(id, index, modal);
                    }, 5000);
                }
            } else {
                var cxaStr = mapPage.responseSuccess + str;
                toastr.success(cxaStr, allPage.toastrTitle1, opts_success);
                modal.CloseModal();
            }
        }, error: function (e) {
            toastr.warning(mapPage.responseNull, allPage.toastrTitle2, opts_waming);
        }
    });
}

function liGroupMouseleave(obj) {
    clearTimeout(timeOut);
    if ($(obj).text() == mapPage.moveToGroup) {
        $("#ulGroup").hide();
    } else {
        $("#ulGroup").show();
    }
}


function liGroupMouseenter(obj) {
    clearTimeout(timeOut);
    var liOffset = $(obj).offset();
    $("#ulGroup").css({ "left": (liOffset.left + 50) + "px", "top": (liOffset.top + 5) + "px" }).empty();
    for (var i = 0; i < $("[name=aGroup]").length; i++) {
        var groupid = $($("[name=aGroup]")[i]).attr("id").split('_')[1];
        $("#ulGroup").append("<li style=\"margin-left: 0px;\"><a href=\"#\" currentGroupid=\"" + $(obj).attr("groupid") + "\" deviceid=\"" + $(obj).attr("deviceid") + "\" groupid=\"" + groupid + "\" onclick=\"liGroupClick(this)\">" + $($("[name=aGroup]")[i]).text() + "</a></li>");
    }
    $("#ulGroup").show();
}


function aGroupMouseenter(_this) {
    if ($(_this).children("em").first().text() == mapPage.defaultGroup) {
        return false;
    }
    var groupid = $(_this).attr("id").split('_')[1];

    if ($("[name=aEdit_" + groupid + "]").length <= 0 && $("#txtGroup_" + groupid).length <= 0) {
        $(_this).append("<span class=\"label-white pull-right\" type='delete' name=\"aEdit_" + groupid + "\" style=\"margin-right:-5px;\" onclick=\"DeletedGroup(this)\">" + allPage.deletes + "</span>"+
            "<span type='edit' class=\"label-white pull-right\" name=\"aEdit_" + groupid + "\" style=\"margin-right:10px;\" onclick=\"EditGroup(this)\">" + allPage.edit2 + "</span>");
    }
}

function aGroupMouseleave(_this) {
    var groupid = $(_this).attr("id").split('_')[1];
    if ($("[name=aEdit_" + groupid + "]").length > 0) {
        $("[name=aEdit_" + groupid + "]").remove();
    }
}

function DeletedGroup(_this) {
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

function EditGroup(_this) {
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

function liGroupClick(obj) {
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

function ulMouseenter(obj) {
    $("#ulGroup").hide();
    clearTimeout(timeOut);
}
function ulMouseleave(obj) {
    timeOut = setTimeout(function () { $("#divMore").hide(); $("#ulGroup").hide(); }, 500);
}


function commandNameType(commandName) {
    if (commandName == "CheckLocation" || commandName == "Q001") {
        commandName = mapPage.checkLocation;
    } else if (commandName == "HFYD" || commandName == "C001OFF" || commandName == "BP040" || commandName == "41140" || commandName == "S200") {
        commandName = mapPage.hfyd;
    } else if (commandName == "DYD" || commandName == "C001ON" || commandName == "BP030" || commandName == "41141" || commandName == "S201") {
        commandName = mapPage.dyd;
    } else if (commandName == "BP020" || commandName == "41201" || commandName == "SCF0") {
        commandName = mapPage.deviceFortify;
    } else if (commandName == "BP021" || commandName == "41200" || commandName == "SCF1") {
        commandName = mapPage.deviceDismiss;
    } else if (commandName == "BP05" || commandName == "S7102") {
        commandName = mapPage.setQinqing;
    } else if (commandName == "BP11") {
        commandName = mapPage.setSOS;
    } else if (commandName == "BP120") {
        commandName = "监听开启";
    } else if (commandName == "BP121") {
        commandName = "监听关闭";
    } else if (commandName == "BP07") {
        commandName = "上传间隔";
    } else if (commandName == "BP13") {
        commandName = "下发文字";
    } else if (commandName == "S7101") {
        commandName = mapPage.setZhukong;
    } else if (commandName == "S7103") {
        commandName = mapPage.setPassword;
    } else if (commandName == "S7106111") {
        commandName = mapPage.setAutoFortify;
    } else if (commandName == "S7106000") {
        commandName = mapPage.setAutoFortifyClose;
    } else if (commandName == "S7107111") {
        commandName = mapPage.setCutFortifyAuto;
    } else if (commandName == "S7107000") {
        commandName = mapPage.setCutFortifyAutoClose;
    } else if (commandName == "S7108") {
        commandName = mapPage.setVIBTime;
    } else if (commandName == "S7109") {
        commandName = mapPage.setVIBLmd;
    } else if (commandName == "S7109SOS") {
        commandName = mapPage.setSOSType;
    } else if (commandName == "S7110") {
        commandName = mapPage.setWeiyiWarn;
    } else if (commandName == "S7111") {
        commandName = mapPage.setOverspeed;
    } else if (commandName == "S7112") {
        commandName = mapPage.setSMSGPRS;
    } else if (commandName == "R8") {
        commandName = mapPage.setJianting;
    } else if (commandName == "R1") {
        commandName = mapPage.setYccq;
    } else if (commandName == "S7113") {
        commandName = mapPage.setHfcc;
    } else if (commandName == "S7114") {
        commandName = mapPage.setLanguage;
    } else if (commandName == "S7115") {
        commandName = mapPage.setTimezone;
    } else if (commandName == "S7116") {
        commandName = mapPage.setXiumian;
    } else if (commandName == "S71171") {
        commandName = mapPage.setJiantingType;
    } else if (commandName == "S71170") {
        commandName = mapPage.setDingweiType;
    } else if (commandName == "S7118" || commandName == "S7119") {
        commandName = mapPage.setParam;
    } else if (commandName == "S7120") {
        commandName = mapPage.setAutoFortifyTime;
    } else if (commandName == "S7121") {
        commandName = mapPage.setAutoDismissTime;
    } else if (commandName == "S7122") {
        commandName = mapPage.setUploadMoveTime;
    } else if (commandName == "S7123") {
        commandName = mapPage.setUploadStopTime;
    } else if (commandName == "S7124") {
        commandName = mapPage.setYcqd;
    } else if (commandName == "S7125") {
        commandName = mapPage.setYcxh;
    } else if (commandName == "S21") {
        commandName = mapPage.setGeofence;
    } else if (commandName == "S7130") {
        commandName = mapPage.setOBDUploadTime;
    } else if (commandName == "I7") {
        commandName = mapPage.setOBDCMD;
    } else if (commandName == "I8") {
        commandName = mapPage.setOBDGg;
    } else if (commandName == "S82") {
        commandName = "透传";
    } else if (commandName == "I7D") {
        commandName = "透传里程";
    } else if (commandName == "I7T") {
        commandName = "透传排量";
    }
    return commandName;
}

function devicesGroupClick(GroupID) {
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

function swapRow(groupid, i, k) {
    var offline = $("a[name=device_" + groupid + "][line=offline]");
    $(offline[k]).insertBefore(offline[i]);
    $(offline[i]).insertAfter(offline[k]);
}


function menuClick(obj, btn, isPostBack) {
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
                            swapRow(groupid, j, k);
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
                    beforeClick(-1, zTree.getSelectedNodes()[0]);
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

function btnGroup(t) {
    if (t == 2) {
        var zTree = $.fn.zTree.getZTreeObj("treeDemo");
        if (zTree != null && zTree.getSelectedNodes().length <= 0)
            return false;
        if ($("#txtGroupName").val().length == 0 || $("#txtGroupName").val().length > 25)
            return false;

        $.ajax({
            url: "AjaxService/AjaxService.ashx?action=newGroup",
            type: "POST",
            dataType: "json",
            data: { "groupName": $("#txtGroupName").val(), "userid": zTree.getSelectedNodes()[0].id },
            success: function (res) {
                if (res.success) {
                    $("#devicesDIV").append("<a href='#' name='aGroup' id='groupid_" + res.gid + "' style='padding-left:20px;font-size:12px;font-weight:bold;'> <em>" + $("#txtGroupName").val() + "</em><em>(0)</em></a>");
                    toastr.success("添加分组成功", "提示", opts_success);
                    $("#txtGroupName").val("");

                } else {
                    toastr.warning("添加分组失败", "提示", opts_waming);
                }
            },
            error: function () { toastr.warning("添加分组失败", "警告", opts_waming); }
        });
    }
    $("#txtGroupName,#btnGroupSubmit,#btnGroupClose,#btnAddGroup").slideToggle(10);
}
var time = 0;
var tempIsPostBack = 0;
function RefreshTime(loginType, imei) {

    if (time < 0) {
        if (loginType == 1) {
            //IMEI账号登录
            beforeClick(imei, null);
        } else {
            if (zTree != null && zTree.getSelectedNodes().length > 0) {

                if (tempIsPostBack == 0) {
                    beforeClick(1, zTree.getSelectedNodes()[0]);
                    tempIsPostBack = 1;
                }
                else {
                    beforeClick(0, zTree.getSelectedNodes()[0]);
                }
            }
        }
        time = 10;
    }
    $("#div_refreshTime").text(" " + time + trackingPage.secondMsg);
    time--; 
    if (loginType == 1) {
        setTimeout("RefreshTime('" + loginType + "'," + imei + ")", 1000);
    }
    else {
        setTimeout("RefreshTime()", 1000);
    }
}

function GetGroup() {
    var zTree = $.fn.zTree.getZTreeObj("treeDemo");
    if (zTree != null && zTree.getSelectedNodes().length <= 0)
        return;
    $.ajax({
        url: "/AjaxService/AjaxService.ashx?action=GetGroups",
        type: "POST",
        dataType: "json",
        data: { "uid": zTree.getSelectedNodes()[0].id },
        error: function (err) { },
        success: function (res) {
            res = res[""];
            $.each(res, function (k, v) {
                if ($("#groupid_" + v["GroupID"]).length <= 0) {
                    $("#devicesDIV").append(" <a href='#' name='aGroup' onmouseenter=\"aGroupMouseenter(this)\" onmouseleave=\"aGroupMouseleave(this)\" id='groupid_" + v["GroupID"] + "' style='padding-left:20px;font-size:12px;font-weight:bold;'> <em class='mrfz' onclick='devicesGroupClick(" + v["GroupID"] + ")'>" + v["GroupName"] + "</em> </a>");
                    $("#groupid_" + v["GroupID"]).append("<em onclick='devicesGroupClick(" + v["GroupID"] + ")'>(" + $("[name=device_" + v["GroupID"] + "]").length + ")</em>");
                }
            });
        }
    });
}

function addDeviceLi(data, isPostBack) {
    isFlag = false;
    $("#s2example-1").empty().append("<option></option> ");
    $("#devicesDIV").html("").parent().scrollTop(0);
    var groupList = new Array();
    var i = 0;
    for (var j = data.length - 1; j >= 0 ; j--) {
        v = data[j];
        var deviceName = "";
        arr();
        if (groupList.indexOf(v["GroupID"]) < 0) {  //设备列表分组
            var groupName = v["GroupID"] == -1 ? mapPage.defaultGroup : v["GroupName"]
            $("#devicesDIV").append(" <a href='#' name='aGroup' onmouseenter=\"aGroupMouseenter(this)\" onmouseleave=\"aGroupMouseleave(this)\" id='groupid_" + v["GroupID"] + "' style='padding-left:20px;font-size:12px;font-weight:bold;'> <em class='mrfz' onclick='devicesGroupClick(" + v["GroupID"] + ")'>" + groupName + "</em> </a>");
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
        if (v["status"] == "") {
            line = "notactive";
            speed = " <span class='label-secondary pull-right spanSize' style=\"color:#4F4F4F;\">" + allPage.status1 + "</span>";
        }
        var statusSpan = "class='user-status is-offline'";
        if (v["status"] != "" && parseInt(v["status"]) < v.offLineMi) { //超过20分钟算离线

            status = "color:#02A00A;"; line = "online";
            statusSpan = "class='user-status is-online'";
        }
        if (v["status"] != "" && parseInt(v["status"]) > v.offLineMi) {
            status = "color:#4F4F4F";
            speed = "<span class='label-secondary pull-right spanSize' style=\"color:#777777;\" OfflineTime=\"" + v["OfflineTime"] + "\">" + allPage.offline + "-" + MinuteToHour(v["OfflineTime"], "M") + "</span>";
        }
        var hire = DateDiff(GetCurrentDate(), v.HireExpireDate);
        var aTitle = "";
        if (hire <= 7 && hire > 0) {
            status = "color:#F6A418"; aTitle = " title='还有" + parseInt(hire) + "天过期'";
        }
        if (deviceName != "") {
            $("#groupid_" + v["GroupID"]).after("<a href='#' id='a_device_" + v["SerialNumber"] + "' " + aTitle + " name='device_" + v["GroupID"] + "' line='" + line + "' style='padding-left:30px;width:100%;" + status + "'><span " + statusSpan + "></span><em>" + deviceName + "</em> " + speed + " </a>   ");
            $("#optgroup_" + v["GroupID"]).append("<option value=\"" + v["SerialNumber"] + "\">" + deviceName + "/" + v["SerialNumber"] + "</option>");
        }
    }//);
    if (groupList.length == 0 || $("#groupid_-1").length == 0) {
        $("#devicesDIV").prepend("<a href='#' name='aGroup' id='groupid_-1' style='padding-left:20px;font-size:12px;font-weight:bold;'><em class='mrfz'>" + mapPage.defaultGroup + "</em><em>(0)</em></a>");
    }
    for (var i = 0; i < groupList.length; i++) {
        $("#groupid_" + groupList[i]).append("<em onclick='devicesGroupClick(" + groupList[i] + ")'>(" + $("[name=device_" + groupList[i] + "]").length + ")</em>");
    }
    if ($("#txtImei").val() != "") {
        menuClick(1, $("#btnDeviceOnline"), -2);
    } else {
        menuClick(currentLineStatus, $("#btnDeviceOnline"), isPostBack);
    }
}

function refreshDeviceLi(data) {
    $.each(data, function (k, v) {
        var line = "";
        var color = "";
        var status = "";
        if (v["Speed"] > 7) {
            $("#a_device_" + v["SerialNumber"] + " span:eq(1)").text(allPage.moving + "-" + v["Speed"]).removeClass().addClass("label-secondary pull-right spanSize"); //.tr:first
        }
        if (v["Speed"] < 7 && v["status"] != "") {
            if (v["StopTime"] > 1)
                $("#a_device_" + v["SerialNumber"] + " span:eq(1)").text(allPage.stopCar + "-" + MinuteToHour(v["StopTime"], "M")).removeClass().addClass("label-purple pull-right spanSize");
            else
                $("#a_device_" + v["SerialNumber"] + " span:eq(1)").text(allPage.stopCar).removeClass().addClass("label-purple pull-right spanSize");
            color = "#7720CF";
        }
        if (v["status"] == "") {
            line = "notactive";
            color = "#4F4F4F";
            $("#a_device_" + v["SerialNumber"] + " span:eq(1)").text(allPage.status1).removeClass().addClass("label-secondary pull-right spanSize");
        }
        if (v["status"] != "" && parseInt(v["status"]) < v.offLineMi) {
            status = "#02A00A"; line = "online";
            $("#a_device_" + v["SerialNumber"] + " span:eq(0)").removeClass().addClass("user-status is-online");
        }
        if (v["status"] != "" && parseInt(v["status"]) > v.offLineMi) {
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

function AddDeviceGps() {

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
function AddDevicesGpsBtnSave() {
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
                // document.getElementById("divMainContent").style.left = to_x + "px";
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
        }
    } catch (e) {

    }
}

function ComplexCustomOverlay(point, text, mouseoverText) {
    this._point = point;
    this._text = text;
    this._overText = mouseoverText;
}
ComplexCustomOverlay.prototype = new BMap.Overlay();
ComplexCustomOverlay.prototype.initialize = function (z_map) {
    this._map = z_map;
    var div = this._div = document.createElement("div");
    div.style.position = "absolute";
    div.style.zIndex = BMap.Overlay.getZIndex(this._point.lat);
    div.style.backgroundColor = "#EFEFEF";
    div.style.border = "1px solid #D5592E";
    div.style.color = "#000000";
    div.style.height = "227px";
    div.style.width = "240px";
    div.style.padding = "2px";
    div.style.lineHeight = "20px";
    // div.style.whiteSpace = "nowrap";
    div.style.MozUserSelect = "none";
    div.style.zIndex = 5001;
    div.style.fontSize = "12px"
    var span = this._span = document.createElement("span");
    div.appendChild(span);
    //span.appendChild(document.createTextNode(this._text)); 
    // span.style.whiteSpace = "pre-wrap";
    span.style.display = "block";  // span.style. display ="display:inline-block"; 
    span.style.width = "238px";
    span.style.height = "100%";
    span.innerHTML = this._text;
    var that = this;
    var lable = this._lable = document.createElement("lable");
    lable.style.right = "0px";
    lable.style.top = "0px";
    lable.style.position = "absolute";
    lable.style.fontSize = "30px";
    lable.style.cursor = "pointer";
    lable.onclick = function () {
        div.style.display = "none";
        CurrentSelectDevice = null;
    }
    lable.appendChild(document.createTextNode("×"));
    div.appendChild(lable);
    if (v["CarImg"] != "") {
        var img = this._img = document.createElement("img");
        img.src = "Upload/" + v["CarImg"];
        img.style.width = "100px";
        img.style.height = "110px";
        img.style.top = "25px";
        img.style.left = span.style.width;
        img.style.position = "absolute";
        div.style.width = ($(span).width() + $(img).width() + 3) + "px";

        div.appendChild(img);
    }
    var arrow = this._arrow = document.createElement("div");
    arrow.style.background = "url(icons/label.png) no-repeat";
    arrow.style.position = "absolute";
    arrow.style.width = "11px";
    arrow.style.height = "10px";
    arrow.style.top = "150px";
    arrow.style.left = "10px";
    arrow.style.overflow = "hidden";
    div.appendChild(arrow);
    map.getPanes().labelPane.appendChild(div);
    return div;
}
ComplexCustomOverlay.prototype.draw = function () {
    var z_map = this._map;
    var pixel = z_map.pointToOverlayPixel(this._point);
    this._div.style.left = pixel.x - parseInt(this._arrow.style.left) + "px";
    this._arrow.style.top = parseInt(this._div.style.height) - 1 + "px";
    this._div.style.top = pixel.y - (parseInt(this._div.style.height) + 15) + "px";
}