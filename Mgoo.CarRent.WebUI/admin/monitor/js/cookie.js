function setCookie() { //设置cookie 
    var loginCode = $("#username").val(); //获取用户名信息    
    var pwd = $("#passwd").val(); //获取登陆密码信息  
    var language = $("#s2Language").val();
    var checked = $("[name='jzpwd']");//获取“是否记住密码”复选框  
    if ($(checked).attr("checked") == "checked" || $(checked)[0].checked) { //判断是否选中了“记住密码”复选框  
        $.cookie("username", loginCode, { expires: 7 });//调用jquery.cookie.js中的方法设置cookie中的用户名
        $.cookie("passwd", pwd, { expires: 7 });
   
        // $.cookie("pwd", $.base64.encode(pwd));//调用jquery.cookie.js中的方法设置cookie中的登陆密码，并使用base64（jquery.base64.js）进行加密  
    } else {
        // $.cookie("pwd", null);
    }
}
function getCookieByCookieName(name)
{
    return $.cookie(name);
}
function setCookieValue(cookieName,cookieValue)
{ 
    $.cookie(cookieName, cookieValue, { expires: 7 });
}
function getCookie() { //获取cookie  
    var loginCode = $.cookie("username"); //获取cookie中的用户名  
    var pwd = $.cookie("passwd"); //获取cookie中的登陆密码  
    var language = $.cookie("language");;
    if (pwd) {//密码存在的话把“记住用户名和密码”复选框勾选住  
        $("[name='jzpwd']").attr("checked", "true");
    }
    if (loginCode) {//用户名存在的话把用户名填充到用户名文本框  
        $("#username").val(loginCode);
    }
    if (pwd) {//密码存在的话把密码填充到密码文本框  
        // $("#passwd").val($.base64.decode(pwd));
        $("#passwd").val(pwd);
    }
    if (language) {
        console.log(language);
        $("#s2Language").select2("val", "pl");
        //  alert($("#s2Language").val());
    } else {
        console.log("1:" + language);
        $("#s2Language").select2("val", "zh-cn");
    }
}

