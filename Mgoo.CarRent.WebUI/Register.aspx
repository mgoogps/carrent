<%@ Page Language="C#" AutoEventWireup="true" CodeBehind="Register.aspx.cs" Inherits="Mgoo.CarRent.WebUI.Register" %>

<!DOCTYPE html>

<html xmlns="http://www.w3.org/1999/xhtml" class="login-bg">
<head>
    <title></title>
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <!-- bootstrap --> 
    <link href="Assets/css/bootstrap.css" rel="stylesheet" /> 
    <link href="Assets/css/bootstrap-responsive.css" rel="stylesheet" /> 
    <link href="Assets/css/bootstrap-overrides.css" rel="stylesheet" />
    <!-- libraries --> 
    <link href="Assets/css/font-awesome.css" rel="stylesheet" />

    <!-- this page specific styles --> 
    <link href="Assets/css/login/signin.css" rel="stylesheet" />  
    <link href="admin/js/layui/css/layui.css" rel="stylesheet" media="all" />
    <!--[if lt IE 9]>
      <script src="http://apps.bdimg.com/libs/html5shiv/3.6/html5shiv.min.js"></script>
        <script src=" http://apps.bdimg.com/libs/respond.js/1.4.2/respond.min.js"></script>       
    <![endif]-->
    <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
    <style>
        .msg{color:#f00;width:100%; line-height:30px; }
    </style>
</head>
<body>
  <%--   <form method="post"  action="" id="form1" class="layui-form">--%>
        <div class="aspNetHidden">
             <input type="hidden" name="" id="" value="" />
        </div>
        <div class="aspNetHidden">
	        <input type="hidden" name="" id="" value="" />
	        <input type="hidden" name="" id="" value="" />
        </div>
        <div class="row-fluid login-wrapper">
            <a href="index.aspx">
                <img class="logo" src="" />
            </a>
            <div class="span4 box">
                <div class="content-wrap">
                    <h6>Register</h6>
                    <input name="phone" type="text" id="txtMobile" class="span12"  placeholder="please input phone num" />
                    <input name="loginname" type="text" id="txtLoginName" class="span12" lay-verify="Name" placeholder="please input login name" />
                                        <input name="username" type="text" id="txtUserName" class="span12" lay-verify="Name" placeholder="please input username name" />
                    <input name="password" type="password" id="txtLoginPwd" class="span12" lay-verify="Pwd" placeholder="please input login password" />
                    <input name="confirmpwd" type="password" id="txtConfirmPwd" class="span12" lay-verify="RePwd" placeholder="confirm password" />
                    <div class="span12">
                        <input name="code" type="text" id="txtCode" class="span8" lay-verify="Code" style="float:left; margin-left:-8px;" placeholder="please input phone code" />
                        <input type="button" class="layui-btn layui-btn-primary span4" style="height:40px; float:right;margin-right:13px; width:32%" id="btnCode"  value="Get VC" onclick="showtime(30)" />
                    </div>
                         <input type="button" name="register" value="register" id="txtSignUp" class="layui-btn layui-btn-big layui-btn-normal" lay-submit="" style="width: 100%;" />
                </div>
            </div>
        </div>
         <script src="Assets/js/jquery-3.2.1.min.js"></script>
        <script src="admin/js/layui/layui.js"></script>
        <script>
            layui.config({
                base: 'Assets/js/',
                version: "2.0.0"
            })
         
            layui.use(['layer', 'form'], function () {
                var layer = layui.layer
                , form = layui.form;
                //提交注册
                $("#txtSignUp").on('click', function () {
                    var Phone = $("#txtMobile").val();
                    var Loginname = $("#txtLoginName").val();
                    var Password = $("#txtLoginPwd").val();
                    var Confirmpwd = $("#txtConfirmPwd").val();
                    var UserName = $("#txtUserName").val();
                    var Code = $("#txtCode").val();
                    $.ajax({
                        url: "api/Register",
                        type: "post",
                        data: {
                            phone: Phone,
                            loginname: Loginname,
                            password: Password,
                            confirmpwd: Confirmpwd,
                            username:UserName,
                            code:Code
                        },
                        beforeSend: function (request) {
                            request.setRequestHeader("Authorization", "MGOO@AMAP"); //设置头部请求参数值
                        },
                        success: function (res) {
                            layer.msg(res.message);
                            if (res.code == 0) {
                                window.location.href = "Login.aspx";
                            }  
                        }
                    })
                })
            });
            function showtime(t) {
             //   layui.use(['layer', 'form'], function () {
                    var Phone = $("#txtMobile").val();
                    console.log(Phone);
                    if (Phone == null ||Phone=="") {
                        layer.msg("please input phone num");
                        return;
                    }
                    $("#btnCode").removeClass("layui-btn-primary");
                    $("#btnCode").addClass("layui-btn-disabled");
                    $.ajax({
                        url: "api/SendSMS?phone=" + Phone + "&type=1",
                        type: "Get",
                        beforeSend: function (request) {
                            request.setRequestHeader("Authorization", "MGOO@AMAP"); //设置头部请求参数值
                        },
                        success: function (res) {
                            console.log(res);
                            if (res.code == 0) {
                                layer.msg("The verification code has been sent. Please enter it in 20 minutes");
                            }
                        }
                    })
                    for (i = 1; i <= t; i++) {
                        window.setTimeout("update_p(" + i + "," + t + ")", i * 1000);
                    }
             //  })
            }
            function update_p(num, t) {
                if (num == t) {
                    $("#btnCode").val("get VC");
                    $("#btnCode").removeClass("layui-btn-disabled");
                    $("#btnCode").addClass("layui-btn-primary");
                }
                else {
                    printnr = t - num;
                
                    $("#btnCode").val("(" + printnr + ")S Send");
                }
            }
        </script>
<%--    </form>--%>
</body>
</html>
