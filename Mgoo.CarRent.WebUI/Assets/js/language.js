layui.define(['mgajax','layer'], function (exports) {
    var com = layui.mgajax,
        layer = layui.layer,
        lg = { chinese: "zh-cn", english: "en" };

    var curLanguage = com.getStorage("language") || lg.english;
     
    var language = {  }
    if (curLanguage == lg.chinese) {
        language = getZhcn();
    } else {
        language = getEn();
    }
    
    function getEn() {
        var t = {
            user_info: "User Info", change_password: "Change Password", logout: "Sign out" 
        }; 
        return t;
    }
    function getZhcn() {
        var t = {
            user_info: "用户信息", change_password: "修改密码", logout: "退出"
        };
        return t;
    }
    language.setLanguage = function (language_version) { 
        for (var i in lg) { 
            if ( lg[i] == language_version) {
                com.setStorage(language_version, "language");
                return true;
            }
        } 
        layer.msg("不支持该语言");
        return false;
    }
    exports('language', language);
});