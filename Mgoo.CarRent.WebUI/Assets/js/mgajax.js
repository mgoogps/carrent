layui.define(['layer'], function (exports) {
    var layer = layui.layer;
    var $ = layui.jquery;
    var com = {
     
        setStorage: function (val, key) {
            key = key || "userinfo";
            val = val || {}; 
            localStorage.setItem(key, JSON.stringify(val));
        },
        getStorage: function (key) {
            key = key || "userinfo";
            var json = localStorage.getItem(key);
            return JSON.parse(json);
        },
        clearStorage: function (key) {
            if (key) {
                localStorage.setItem(key);
            } else {
                localStorage.clear();
            } 
        },
        logout:function () {
            this.clearStorage();
            if (window.top) {
                window.top.location.replace("/Login.aspx");
            } 
            window.location.replace("/Login.aspx");
        },
        login: function (account,password) {
            this.ajax({
                url: "api/login",
                data: { login_name: account, login_password: password, identifies: "CARRENT@GOOGLE" },
                success: function (res) {
                    if (res.code === 0) {
                       
                        com.setStorage(res.result);
                        window.location.replace(res.result.url);
                    } else {
                        layer.msg('Incorrect username or password!');//, { offset: "260px" }
                    }
                }
            });
        },
        ajax: function (opts) {
            var loading = layer.load(1);//,{offset: '280px' }
            if (!opts || !opts.url) {
                return;
            }
            var _success = opts.success || function (a, b) { };
            var _error = opts.error || function (a, b, c) { };
            var _beforeSend = opts.beforeSend || function (a) { };
            var _complete = opts.complete || function (a, b) { };
            var _url = opts.url || "";
            var _type = opts.type || "post";
            var _contentType = opts.contentType || "application/json";
            var _data = opts.data || {};
            var _timeout = opts.timeout == 0 ? 0 : (opts.timeout || 6000);
           
            var _dataType = opts.dataType || "json";

            if (_type == "post") {
               _data = JSON.stringify(_data)
            }
            $.ajax({
                url: _url,
                data: _data,
                type: _type,
                contentType: _contentType,
                timeout: _timeout,
                dataType: _dataType,
                success: function (res) {
                    if (res.code == 4 || res.code == 5) {
                        layer.alert("The user is not logged in!", { icon: 5 }, function (index) {
                            if (window.top) {
                                window.top.location.href = "/login.aspx";
                            } else {
                                window.location.href = "/login.aspx";
                            }
                        });
                    }
                    _success(res);
                },
                error: function (xhr, type, errorThrown) {
                    layer.msg("The network is overtime. Please try again later.");//, { offset: '280px' }
                    _error(xhr, type, errorThrown);
                },
                beforeSend: function (XMLHttpRequest) {

                    XMLHttpRequest.setRequestHeader("Authorization", "CARRENT@GOOGLE");
                    var storage = com.getStorage(); 
                    if (storage) {
                        XMLHttpRequest.setRequestHeader("Token", storage.token);
                    }
                    //如果返回false则取消本次请求
                    _beforeSend(XMLHttpRequest);
                },
                complete: function (XMLHttpRequest, textStatus) {
                    layer.close(loading);
                    _complete(XMLHttpRequest, textStatus);
                }
            });
        }
    }
  
    com.bindselect = function (obj) {
        var _this = this
        var $select = $(obj);
        var text = $select.attr("bind-text");
        var value = $select.attr("bind-value");
        var params = $select.attr("bind-params") || {};
        params = JSON.parse(params);
        if (!text) {
            layer.msg("data-text 不能为空");
        }
        if (!value) {
            layer.msg("data-value 不能为空");
        }
        console.log("value" + value);
        var defaul = { type: "GET", dataType: "json", timeout: 5000, cache: true, confirm: false, loading: true };
        params.success = function (res, options, _this) {
            var result = res.result;
            var html = [];
            //html.push('<option value=""> All </option>');
            for (var i = 0; i < result.length; i++) {
                var d = result[i];
                html.push('<option value="' + d[value] + '">  ' + d[text] + '</option>');
            }
            $select.append(html.join(''));
            layui.form().render('select')
        }
        var options = $.extend({}, defaul, params);
        console.log(options);
       // options.async = false;
        com.ajax(options);
    }

    var sels = $("select[bind-params]");

    for (var i = 0; i < sels.length; i++) {
        com.bindselect(sels[i]);
    }

    com.user = com.getStorage();

    var current = window.location.href;

    console.log(com.user);

    if (com.user == null && !current.endsWith("/Login.aspx")) {
         window.location.href = "../Login.aspx";
    } else if (com.user != null && current.endsWith("/Login.aspx") && com.user.url) {
        window.location.href = com.user.url;
    }
     
    exports('mgajax', com);
});