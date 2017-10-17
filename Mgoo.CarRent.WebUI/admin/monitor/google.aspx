<%@ Page Language="C#" AutoEventWireup="true" CodeBehind="google.aspx.cs" Inherits="Mgoo.CarRent.WebUI.admin.monitor.google" %>

<!DOCTYPE html>

<html xmlns="http://www.w3.org/1999/xhtml">
<head runat="server">
    <meta charset="utf-8"/> 
	<meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1"/> 
	<meta name="viewport" content="width=device-width, initial-scale=1.0" />
	<meta name="description" content="美谷 美谷科技 GPS 定位 防盗 电子狗" />
	<meta name="author" content="" />
    <meta http-equiv="Pragma" content="no-cache"/>
    <meta http-equiv="Cache-Control" content="no-cache"/>
    <meta http-equiv="Expires" content="0"/>  
    <meta http-equiv="Cache-Control" content="no-transform" />
    <meta http-equiv="Cache-Control" content="no-siteapp" />
	<title>GPS物联监控中心 - 定位监控</title> 
    <script src="js/language02-zh-cn.js"></script>


     <link href="css/fonts/linecons/css/linecons.css" rel="stylesheet" />
	<link rel="stylesheet" href="css/fonts/fontawesome/css/font-awesome.min.css"/>
	<link rel="stylesheet" href="css/bootstrap.css"/> 
	<link rel="stylesheet" href="css/xenon-core.css"/>
	<link rel="stylesheet" href="css/xenon-forms.css"/>
	<link rel="stylesheet" href="css/xenon-components.css"/>
	<link rel="stylesheet" href="css/xenon-skins.css"/>
	<link rel="stylesheet" href="css/custom.css"/> 
    <script src="js/jquery-1.11.1.min.js"></script>

    <link href="js/map/mgoo-style.css" rel="stylesheet" />

   	<link rel="stylesheet" href="js/select2/select2.css"/>
	<link rel="stylesheet" href="js/select2/select2-bootstrap.css"/>
     <script src="js/select2/select2.min.js"></script>
	<%--<link rel="stylesheet" href="js/multiselect/css/multi-select.css"/>--%>

      <!-- Imported scripts on this page -->
    <script src="js/mg_public.js"></script>
	<script src="js/toastr/toastr.min.js"></script> 

    <script src="js/DeviceOper.js"></script>
     
    <style type="text/css">
	   #allmap {width: 100%;height:100%; overflow : hidden;margin:0;font-family:"微软雅黑";}
        body, html {
            overflow-x: auto;
            overflow-y: hidden;
           
        }
        
	</style>  
</head>
<body class="page-body right-sidebar chat-open" > 
 	<div class="page-container" style="background-color:#FFFFFF;min-width:810px; "><!-- add class "sidebar-collapsed" to close sidebar by default, "chat-visible" to make chat appear always -->
	 
	 		<div class="main-content" >
             
			<!-- User Info, Notifications and Menu Bar -->
           <div id="allmap" style="left:0px;top:0px; position: absolute; bottom:0px; "></div>  
                 
	 </div>
 
		<!-- start: Chat Section  class="scrollable" -->
        <div id="chat" >
            <div id="dragChat" style="background-color:#A8A8A8;width:2px;height:100%;float:right;margin-right:-2px;"></div> 
            <div class="chat-inner ps-container" style="width: 100%; overflow: no-display;">
                <h2 class="chat-header">
                    <%--<a href="#" class="chat-close" data-toggle="chat" id="aChatClose">
                        <i class="fa-plus-circle rotate-45deg"></i>
                    </a>--%>
                    <script type="text/javascript">writePage(homePage.customerList)
                    </script>
                    <span class="badge badge-success is-hidden"></span>
                </h2>
                <div class="chat-group" style="max-height: 250px;width:100%">
                    <div style="max-height: 250px; overflow-x: hidden; overflow-y: scroll;">
                        <ul id="treeDemo" class="ztree" style=""></ul>
                    </div>
                </div>
                <div class="form-group"style="width: 100%;">
                    <script type="text/javascript">
                        jQuery(document).ready(function ($) {
                            dragChat("dragChat");
                            $("#s2example-1").select2({
                                placeholder: allPage.search1,
                                allowClear: true
                            }).on('select2-open', function () {
                                // Adding Custom Scrollbar
                                $(this).data('select2').results.addClass('overflow-hidden').perfectScrollbar();
                            }).change(function () {
                                $("#a_device_" + $(this).val()).trigger("click");
                            });
                        });
                    </script>
                    <select class="form-control" id="s2example-1">
                        <option></option>
                    </select>
                </div>
                <div class="form-group" style="width: 100%; text-align: center;">
                    <div class="btn-group" style="width: 100%; text-align: center;">
                        <button type="button" class="btn btn-white btn-xs" name="btnDeviceStatus" id="btnDeviceAll" style="height: 30px; width: 25%;" onclick="main.menuClick(1,this)">
                            <script type="text/javascript">writePage(allPage.all)
                            </script>
                            (0)</button>
                        <button type="button" class="btn btn-white btn-xs" name="btnDeviceStatus" id="btnDeviceOnline" style="height: 30px; width: 25%;" onclick="main.menuClick(2,this)">
                            <script type="text/javascript">writePage(allPage.online)
                            </script>
                            (0)</button>
                        <button type="button" class="btn btn-white btn-xs" name="btnDeviceStatus" id="btnDeviceOffline" style="height: 30px; width: 25%;" onclick="main.menuClick(3,this)">
                            <script type="text/javascript">writePage(allPage.offline)
                            </script>
                            (0)</button>
                        <button type="button" class="btn btn-white btn-xs" name="btnDeviceStatus" id="btnDeviceNotActive" style="height: 30px; width: 25%;" onclick="main.menuClick(4,this)">
                            <script type="text/javascript">writePage(allPage.status1)
                            </script>
                            (0)</button>
                    </div>
                </div>

                <div class="chat-group" style="margin-top: -10px; text-align: right; border-bottom: 1px solid #0C56AF">
                    <button type="button" class="btn btn-orange btn-xs" style="margin-left: 0px;" onclick="AddDeviceGps()">新装车辆</button>
                    <!--  添加分组  -->
                    <input type="text" style="width: 120px; margin-top: -15px; margin-left: 2px; display: none;" id="txtGroupName" />
                    <button class="btn btn-success btn-xs" style="display: none;" onclick="main.btnGroup(2)" id="btnGroupSubmit">
                        <script type="text/javascript">
                            writePage(allPage.confirm);
                        </script>
                    </button>
                    <button class="btn btn-primary btn-xs" style="display: none;" id="btnGroupClose" onclick="main.btnGroup(3)">
                        <script type="text/javascript">
                            writePage(allPage.cancel);
                        </script>
                    </button>
                    <button class="btn btn-orange btn-xs" id="btnAddGroup" onclick="main.btnGroup(1)">
                        <script type="text/javascript">
                            writePage(mapPage.addGroup);
                        </script>
                    </button>
                    <!--  添加分组结束  -->
                    <label style="display: none;">
                        <input type="checkbox" id="chkLowerDevice" value="" />下属设备
                    </label>
                </div>

                <div class="chat-group " style="margin-top: 0px; margin-bottom: 0px; padding-top: 0px; padding-left: 0px; padding-bottom: 0px; padding-right: 0px; bottom: 0px;max-height:300px;overflow-y:auto">
                    <div class="chat-group" style="height: 100%; margin-top: 0px; overflow: auto;" id="devicesDIV"></div>
                </div>
            </div>


        </div>
		<!-- end: Chat Section  scrollable-->
 
    
	</div>

  
    <div class="modal fade" id="ModalShowDeviceDetail"> </div>
    <div id="divMore" style="display:none;width:120px;height:auto;left:0px;top:0px;position:absolute;background-color:white;z-index:50002;" onmouseenter="main.ulMouseenter(this)" onmouseleave="main.ulMouseleave(this)" ></div>
    <ul id="ulGroup" onmouseenter="main.liGroupMouseleave(this)" style="display:none;left:0px;top:0px;position:absolute;background-color:#DBEAF9;z-index:50013;" ></ul>
    
    <link href="js/zTree_v3/css/zTreeStyle/zTreeStyle.css" rel="stylesheet" /> 
    <link href="js/zTree_v3/css/zTree.css" rel="stylesheet" />

    <script src="js/zTree_v3/js/jquery.ztree.core-3.5.js"></script> 

      <script src="js/CoureName.js"></script>

    <script src="js/layer/layer.js"></script>
    <script src="../../Assets/js/map.js"></script>
    <script async defer src="https://maps.googleapis.com/maps/api/js?key=AIzaSyCamnlWckhzlXouCA50LbKPsimIVnbFitQ&callback=initMap"></script>

     
    <script src="js/map/google.js"></script>
    <script type="text/javascript">

        function initMap() {
            mgoo = new mgMap("allmap", "GOOGLE");
            mgoo.loadMap();

           
        }
        $(function () {
           main.zTreeInit();
        });
       
     
    </script>
</body>
</html>
