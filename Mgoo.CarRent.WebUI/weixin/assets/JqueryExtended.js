
+function () {
    var global = {};
    global.code = {
        china: 86, malaysia: 60
    };
    global.deviceid = 0;
    global.ajax = function (opts) {
        var layerIndex = layer.open({ type: 2 });
      
        var defaul =
            {
                contentType: "application/json",
                type: "GET",
                timeout: 6000,
                dataType:"json",
            }; 
        var _success = opts.success || function () { };
        var _error = opts.error || function () { };
        var _beforeSend = opts.beforeSend || function () { };
        var _complete = opts.complete || function () { };
        var options = $.extend(true, {}, opts);
        options.success = function (res) {
            if (typeof res === 'string') {
                res = JSON.parse(res);
            }
            if (res.code != 0) { 
                console.log(res);
                alert(res.message);
            }
            _success(res);
        }
        options.error = function (a, b, c) {
            //layer.msg('No internet!');
            alert("No internet!");
            _error(a, b, c);
        }
        options.beforeSend = function (XMLHttpRequest) {
            XMLHttpRequest.setRequestHeader("Authorization", "CARRENT@GOOGLE"); 
            //如果返回false则取消本次请求
            _beforeSend(XMLHttpRequest);
        },
        options.complete = function () { 
            layer.close(layerIndex);
            _complete();
        }
        $.ajax(options);
    }
    global.GetQueryString = function (name) {
        var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
        var r = window.location.search.substr(1).match(reg);
        if (r != null) return unescape(r[2]); return null;
    } 
    global.msg = function (msg) {
        layer.open({
            content: msg
            , skin: 'msg'
            , time: 2 //2秒后自动关闭
        });
    }
    global.isNum = function (num) {
        var verification = /^\+?[1-9][0-9]*$/;
        return verification.test(num);
    }
    global.sms = function (phone,callback) {
        if (!this.isNum(phone) || phone.length < 5) {
            alert("phone wrong format.");
            return;
        }
        callback = callback || function () { };
        this.ajax({
            url: "/api/SendSMS",
            data: { phone: global.code.china + phone, type: 2 },
            success: function (res) {
                console.log(res);
                callback(res);
            }
        });
    }
    global.request = function (phone,code,callback) {
        var that = this;
        if (code.length != 6) {
            alert("code error.");
            return;
        }
        if (phone.length < 5 || phone.length > 16 || !global.isNum(phone)) {
            alert("phone error.");
            return;
        }
        var data = { deviceid: this.deviceid, phone:this.code.china + phone, code: code};
        callback = callback || function () { };
        this.ajax({
            url: "/api/devices/CarRequest",
            data: data,
            type:"post",
            success: function (res) {
                callback(res);
            }
        });
    }
    window.global = global;
}();