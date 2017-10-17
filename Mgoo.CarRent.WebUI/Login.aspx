<%@ Page Language="C#" AutoEventWireup="true" CodeBehind="Login.aspx.cs" Inherits="Mgoo.CarRent.WebUI.Login" %>

<!DOCTYPE html>
<html xmlns="http://www.w3.org/1999/xhtml" class="login-bg"><head>
    <title>Leasing system</title>

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
    <form method="post">
 

    <div class="aspNetHidden"> 
	 </div>
        <div class="row-fluid login-wrapper">
            <a href="javascript:;">
                <img class="logo" src="Assets/images/logo.png">
            </a> 
            <div class="span4 box">
                <div class="content-wrap">
                    <h6><span id="transmark" style="display: none; width: 0px; height: 0px;"></span>Log in</h6>
                    <input name="txtLoginName" id="txtLoginName" class="span12 " value="admin" placeholder="Account" type="text">
                    <input name="txtLoginPwd" id="txtLoginPwd" class="span12" value="123456" placeholder="Password" type="password">
                    
                    <a href="#" class="forgot">Forget password?</a>
                    <div class="remember">
                        <input id="chkRememberPwd" name="chkRememberPwd" type="checkbox"><label for="chkRememberPwd">Remember the password</label>                        
                    </div>
                    <input name="btnLogin" value="Log in" id="btnLogin" class="layui-btn layui-btn-big layui-btn-normal" style="width: 100%;" type="button" >
                </div>
            </div>

            <div class="span4 no-account">
                <p>No account？</p>
                <a href="Register.aspx"> Registered</a>
            </div>
        </div>              

    </form>  
    <script src="Assets/js/jquery-3.2.1.min.js"></script>
    <script src="Assets/js/jQuery.md5.js"></script> 
    <script src="admin/js/layui/layui.js"></script>
    <script type="text/javascript">
        layui.config({
            base: 'Assets/js/',
            version: "2.0.0"
        }) 
        layui.use(['layer', 'mgajax', 'form'], function () {
     
            var layer = layui.layer;
            var com = layui.mgajax;
            var form = layui.form;
            var $ = layui.jquery;   
            $("#btnLogin").on("click", function () {
                var name = $("#txtLoginName").val();
                var pwd = $("#txtLoginPwd").val(); 
                if (name == "") {
                    layer.tips('Please input Username', '#txtLoginName');
                    return;
                }
                if (pwd == "") {
                    layer.tips('Please input Password', '#txtLoginPwd');
                    return;
                }
                com.login(name, $.md5(pwd));
               
            });
        });
        //layui.use("mgajax");
    </script>

</body> 
</html>