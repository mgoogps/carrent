function filter(treeId, parentNode, childNodes) {

    if (!childNodes) return null;
    for (var i = 0, l = childNodes.length; i < l; i++) {
        childNodes[i].name = childNodes[i].name.replace(/\.n/g, '.');
    }
    return childNodes;
}

function addDiyDom(treeId, treeNode) {
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

function beforeClick(treeId, treeNode) {
    var data = {};
    if (treeNode != null) {
        data.UserID = treeNode.id;
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
                addDeviceList(res.result, treeId); 
            }
        }
    });
    return true;
}

function LoginTypeImei(imei) {
    $.ajax({
        url: "AjaxService/AjaxService.ashx?action=getDevicesByUserID",
        type: "POST",
        dataType: "json",
        data: { imei: imei },
        error: function (error) {
            //jQuery('#modal-4').modal('show', { backdrop: 'static' });
        },
        success: function (dataList) {
            addMarker(dataList);
        }
    });
}
