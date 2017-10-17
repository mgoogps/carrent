 
    function mgMap(_mapId, _mapType) { 
        this.map = null;
        this.mapId = _mapId;
        this.mapType = _mapType;
        this.MAP_CENTER_LAT = 30.832635;
        this.MAP_CENTER_LNG = 113.901968;
        this.DEFAULT_ZOOM = 6;   //第一次打开地图显示级别
        this.RefreshTime = 15;
        this.InfoWindow; 
        this.isAutoSetZoom = true;
        this.isRefresh = false; //是否显示倒计时跟新控件
        this.TrafficControl = false; //是否默认加载交通流量状态
        this.isLocateMyCity = false; //是否定位到当前城市
        this.onLocateComplete = function (data) { }; //定位成功后回调函数
   /*     this.fullscreenControl=false;*/
        this.onLocateError = function (data) { }; //定位失败后回调函数
        this.panToLocate = false; //加载地图时是否把地图中心设为当前位置
        this.showNavigation = true; //是否显示地图默认的定位按钮 设为false隐藏
       // this.getCurrentPosition = function () { };
        this.AMAP = "AMAP";
        this.BAIDU = "BAIDU";
        this.GOOGLE="GOOGLE";
       
       
    };
    mgMap.prototype.loadMap = function ( ) {    
      	mapperKey= this.mapType;
        var _this = this; 
        switch (_this.mapType) {
            case _this.BAIDU: 	
                // 百度地图API功能  
                _this.map = new BMap.Map(_this.mapId, { enableMapClick: false });    // 创建Map实例
                
                _this.centerAndZoom(116.404, 39.91500, _this.DEFAULT_ZOOM);  // 初始化地图,设置中心点坐标和地图级别
           
                _this.map.enableScrollWheelZoom(true);     //开启鼠标滚轮缩放
                //_this.map.addControl(new BMap.MapTypeControl({ mapTypes: [BMAP_NORMAL_MAP, BMAP_HYBRID_MAP], offset: new BMap.Size(10, 10) }));  //添加 右上角混合 地图
                _this.map.addControl(new BMap.ScaleControl({ anchor: BMAP_ANCHOR_BOTTOM_RIGHT, offset: new BMap.Size(20, 75) }));// 右下角，添加比例尺
                
                _this.map.enableKeyboard();//启用键盘上下左右键移动地图
                _this.map.enableDoubleClickZoom();
                if (_this.TrafficControl) {
                    var ctrl = new BMapLib.TrafficControl({
                        showPanel: false  //是否显示路况提示面板 ,
                        , offset: new BMap.Size(10, 30)
                    });
                    _this.map.addControl(ctrl);
                    ctrl.setAnchor(BMAP_ANCHOR_TOP_RIGHT);
                }
                // 添加带有定位的导航控件
                var navigationControl = new BMap.NavigationControl({ 
                    // 靠左上角位置
                    anchor: BMAP_ANCHOR_BOTTOM_RIGHT,
                   //  LARGE类型
                    type: BMAP_NAVIGATION_CONTROL_LARGE,
                   //  启用显示定位
                    enableGeolocation: false,
                    showZoomInfo: true,
                    offset: new BMap.Size(10, 93)
                });
                _this.map.addControl(navigationControl);
				if(_this.showNavigation)
					_this.navigationControl();
               
                if (_this.isLocateMyCity) {
                    var myCity = new BMap.LocalCity();  //根据ip获取所在城市
                    myCity.get(function (result) {
                        _this.map.setCenter(result.name);
                    });
                }
              
                if (_this.isRefresh) { 
                    // 定义一个控件类,即function
                    function ZoomControl() {
                        // 默认停靠位置和偏移量
                        this.defaultAnchor = BMAP_ANCHOR_TOP_RIGHT;
                        this.defaultOffset = new BMap.Size(10, 1); //(x,y)
                    }

                    // 通过JavaScript的prototype属性继承于BMap.Control
                    ZoomControl.prototype = new BMap.Control();
					
                    // 自定义控件必须实现自己的initialize方法,并且将控件的DOM元素返回
                    // 在本方法中创建个div元素作为控件的容器,并将其添加到地图容器中
                    ZoomControl.prototype.initialize = function (map) {
                        // 创建一个DOM元素
                        var div = document.createElement("div");
                        div.id = "div_refreshTime";
                        // 添加文字说明
                        div.appendChild(document.createTextNode(""));
                        // 设置样式
                        div.style.width = "auto";
                        div.style.cursor = "pointer";
                        div.style.border = "1px solid gray";
                        div.style.backgroundColor = "white";
                        // 添加DOM元素到地图中 
                        map.getContainer().appendChild(div);
                        // 将DOM元素返回 
                        return div;
                    }

                    // 创建控件
                    var myZoomCtrl = new ZoomControl();

                    // 添加到地图当中
                    _this.map.addControl(myZoomCtrl);
                    $("#div_refreshTime").html(" <strong>10秒更新<strong/> <input type='checkbox' id='chkRefresh' checked='true' /> ");
          
                }
                break;
            case _this.AMAP:         
                _this.map = new AMap.Map(_this.mapId, {
                    resizeEnable: true,
                    zoom: _this.DEFAULT_ZOOM,
                    view: new AMap.View2D({
                        center: new AMap.LngLat(116.397428, 39.90923),
                        zoom: 13
                    })
                    // center: [116.397428, 39.90923]
                });
                var tool;
   				 _this.map.plugin(["AMap.ToolBar"], function() {
   				 	tool=new AMap.ToolBar({
   				 	 offset: new AMap.Pixel(10, 150), //相对于基点的偏移位置设置工具条的显示位置
   				 		
   				 	})
          		   _this.map.addControl( tool);
          		   
        		});  
                break; 
               // _this.getGeolocation();
            case _this.GOOGLE:                       

                var docMap = document.getElementById(_this.mapId)
                var myOptions = {
                    zoom: 4,
                    center: new google.maps.LatLng(23.042457, 113.793640),
                    navigationControl: true,
                    scaleControl: true,
                    mapTypeId: google.maps.MapTypeId.ROADMAP,
                    mapTypeControl: true,
                    //mapTypeId: 'HYBRID'
                };
                //23.042457,113.793640
                _this.map = new google.maps.Map(docMap, myOptions);
			
              	/* if (_this.TrafficControl) {			  	 	
			  	 	var trafficLayer  = new google.maps.TrafficLayer();
			  	 	  trafficLayer.setMap(_this.map);
			  	 }*/
			/*	var trafficLayer = new google.maps.TrafficLayer();
				trafficLayer.setMap(_this.map);*/
                break;
        }
    };
	 
    //调整地图显示级别
    mgMap.prototype.setZoom = function (Zoom) {
        var _this = this;
        switch (_this.mapType) {
            case _this.BAIDU: 
                _this.map.setZoom(Zoom);
                break;
            case _this.AMAP:
                _this.map.setZoom(Zoom);
                break;
             case _this.GOOGLE:
             	_this.map.setZoom(Zoom);
             	break;
        }
    };

    mgMap.prototype.panTo = function (lng, lat) {
        var _this = this;
        switch (_this.mapType) {
            case _this.BAIDU:
                var point = new BMap.Point(lng, lat);
                _this.map.panTo(point);
                break;
            case _this.AMAP:            
                _this.map.panTo([lng,lat]);
                break;
            case _this.GOOGLE:
            	_this.map.setCenter(new google.maps.LatLng(lat,lng));
            	break;
        }
    };
    ///设置地图中心
    mgMap.prototype.setCenter = function (lng, lat) {
        var _this = this; 
        switch (_this.mapType) {
            case _this.BAIDU:
                var point = new BMap.Point(lng, lat);
                _this.map.setCenter(point);
                break;
            case _this.AMAP:
                _this.map.panTo([lng, lat]);
                break;
            case _this.GOOGLE:
            	_this.map.setCenter(new google.maps.LatLng(lat,lng));
            	break;
        }
    };

    mgMap.prototype.getCenter = function () {	
        var _this = this;
        switch (_this.mapType) {
            case _this.BAIDU:
                _this.map.getCenter();
                break;
            case _this.AMAP:
                return _this.map.getCenter();
        }
    }
    ///设置地图中心已经级别
    mgMap.prototype.centerAndZoom = function (lng, lat, zoom) {
        var _this = this;
        switch (_this.mapType) {
            case _this.BAIDU:
                var point = new BMap.Point(lng, lat);
                _this.map.centerAndZoom(point, zoom);
                break;
            case _this.AMAP:
                _this.map.setZoomAndCenter(zoom,[lng,lat]); 
                break;
             case _this.GOOGLE:
             	_this.map.setZoom(zoom);
             	break;
                
        }
    }
    ///清除地图上的覆盖物
    mgMap.prototype.clearOverlays = function (opts) {
       	var _this = this;
       	opts = opts || {};
       	opts.clearMarker = opts.clearMarker || [];
        switch (_this.mapType)
        {
            case _this.BAIDU: 
                if (opts && opts.clearAll) { 
                    _this.map.clearOverlays();
                    break;
                }  
             	for (var i =0; i< opts.clearMarker.length; i++) {
             		_this.map.removeOverlay(opts.clearMarker[i]); 
             	} 
                break;
            case _this.AMAP:
                try {
                   if (opts.clearAll) {
                   		_this.map.clearMap();
                   }else{
	                   	var len = opts.clearMarker.length;
	                   	if (len > 0) {
	                   		for (var i=0;i< opts.clearMarker.length;i++) {
		                		_this.map.remove(opts.clearMarker[i]);
		                	} 
	                   	} 	
                   } 
                } catch (e) {
                    console.log("clearOverlays>...",e);
                } 
                break;
            case _this.GOOGLE:
            	for (var i =0; i< opts.clearMarker.length; i++) { 
                 	opts.clearMarker[i].setMap(null);
                }
                break;
        }
    }
    ///画线
    mgMap.prototype.polyLine = function (points, args) {
        var _this=this;
        switch (this.mapType) {
            case _this.BAIDU:
                var line = new BMap.Polyline(points, args);  //定义折线              
                _this.map.addOverlay(line);     //添加折线到地图上  
                return line;
            case _this.AMAP:
            	var polyline = new AMap.Polyline({
			        path: points,          //设置线覆盖物路径			    
			        strokeOpacity: 1,       //线透明度
			        strokeWeight: 3,        //线宽
			        strokeStyle: "solid"  //线样式
			        
    			});
			    polyline.setMap(this.map);
             //   var line = new AMap.Polyline(points);
                return polyline;
             case _this.GOOGLE:
           		var line = new google.maps.Polyline({
           			path: points,
           			strokeColor: "#FF0000",
		　　　　　　　　	strokeOpacity: 1.0,
		　　　　　　　　	strokeWeight: 3
           		});
           		line.setMap(this.map);
           		return line;
        }
    }
    //计算2点之间的距离
    mgMap.prototype.getDistance = function (point1, point2) {
        var _this =this;
        switch (this.mapType) {
            case _this.BAIDU: 
                return this.map.getDistance(point1, point2);
                break;
            case _this.AMAP:            
            	return point1.distance(point2);
                break;
        }
    }

    mgMap.prototype.Point = function(lon,lat) {
        var _this = this;
        switch (_this.mapType) {
            case _this.BAIDU:
                return new BMap.Point(lon,lat);
                break;
            case _this.AMAP:
                return new AMap.LngLat(lon, lat);
                break;
            case _this.GOOGLE:
            	return  new google.maps.LatLng(lat,lon);
            	break;
        }	
    }
	
	
    mgMap.prototype.style = function(style) { 
        try {
           this. map.setMapStyle({ style: style });
        } catch (e) {
            alert(e);
        } 
    }
	//最佳视野
    mgMap.prototype.setFitView = function (points) {
        var _this = this;   
        try {
            switch (this.mapType) {          	
                case _this.AMAP:
                    _this.map.setFitView();
                    break;
                case _this.BAIDU: 
                	_this.map.setViewport(points);　
                    break;
                case _this.GOOGLE:
           	    	var bounds = new google.maps.LatLngBounds(); 
           	    	for (var i=0;i<points.length;i++) {          	    	
           	    	    bounds.extend(points[i].getPosition());
           	    	}
                	_this.map.fitBounds(bounds);
                	break;
            }
        } catch (e) {
            console.log("setFitView>..");
        }  
    }

    mgMap.prototype.setMapType = function (par) {
        var _this = this;
        switch (_this.mapType) {
            case _this.BAIDU:
                //BMAP_HYBRID_MAP 卫星，BMAP_PERSPECTIVE_MAP 2D，BMAP_NORMAL_MAP 普通地图  BMAP_HYBRID_MAP
                _this.map.setMapType(par);
                
                break;
            case _this.AMAP:
                _this.map.plugin(["AMap.MapType"], function () {
                    //地图类型切换
                  
                    var type = new AMap.MapType({
                        defaultType: par[0] == undefined ? 0 : par[0], //  0是普通地图，1是卫星地图
                        showTraffic: par[1] == undefined ? false : par[1] //是否打开 路况 
                       //showRoad: par[2] == undefined ? true : par[2],  //是否打开路网 
                      
                    });
                   // console.log((par[0] == undefined ? 0 : par[0]), (par[1] == undefined ? true : par[1]) );
                    _this.map.addControl(type);
                     $("#" + _this.mapId + " div.amap-maptypecontrol").hide(); //隐藏高德地图自带的切换图标
                });
                
               _this.map.plugin(["AMap.ToolBar"],function(){ 
               
               	//加载工具条
               	var tool = new AMap.ToolBar({
               	
               		locate:false
               		
               	});
               	tool.show();
			    tool.hideRuler();
			    tool.hideDirection();
               _this.map.addControl(tool); 
          
               });
               break;
              case _this.GOOGLE:
             	 _this.map.setMapTypeId(par); 
             	 break;
        }		
    }
 	
 	mgMap.prototype.navigationControl= function(){
 		var _this =this;
 		switch (_this.mapType){
 			case _this.BAIDU:
 				 // 添加定位控件
		        var geolocationControl = new BMap.GeolocationControl({offset: new BMap.Size(10, 55)}   );
		        geolocationControl.addEventListener("locationSuccess", _this.onLocateComplete); //定位成功回调函数
		        geolocationControl.addEventListener("locationError", _this.onLocateError);//定位失败回调函数
		        _this.map.addControl(geolocationControl);
 				break;
			case _this.AMAP:
				
 				break;
 		}			
	}
    
    //获取当前位置
    mgMap.prototype.getGeolocation = function (callback) {
       var _this = this;
        if (!callback) {
        	return;
        }
        var geolocation = null;
        switch (_this.mapType){
        	case _this.BAIDU:
        	 	var geolocation = new BMap.Geolocation();
        		geolocation.getCurrentPosition(function(r){
					if(this.getStatus() == BMAP_STATUS_SUCCESS){
						var point ={lat: r.point.lat,lng:r.point.lng}; 
						callback(point);
					}
					else {
						console.log("百度地图定位失败！");
						alert('failed'+this.getStatus());
						//BMAP_STATUS_SUCCESS	检索成功。对应数值“0”。
						//BMAP_STATUS_CITY_LIST	城市列表。对应数值“1”。
						//BMAP_STATUS_UNKNOWN_LOCATION	位置结果未知。对应数值“2”。
						//BMAP_STATUS_UNKNOWN_ROUTE	导航结果未知。对应数值“3”。
						//BMAP_STATUS_INVALID_KEY	非法密钥。对应数值“4”。
						//BMAP_STATUS_INVALID_REQUEST	非法请求。对应数值“5”。
						//BMAP_STATUS_PERMISSION_DENIED	没有权限。对应数值“6”。(自 1.1 新增)
						//BMAP_STATUS_SERVICE_UNAVAILABLE	服务不可用。对应数值“7”。(自 1.1 新增)
						//BMAP_STATUS_TIMEOUT	超时。对应数值“8”。(自 1.1 新增) 
					}        
				},{enableHighAccuracy: true})
        		break;
        	case _this.AMAP: 
		        _this.map.plugin('AMap.Geolocation', function () {
		            geolocation = new AMap.Geolocation({
		                enableHighAccuracy: true,//是否使用高精度定位，默认:true
		                timeout: 10000,          //超过10秒后停止定位，默认：无穷大
		                maximumAge: 0,           //定位结果缓存0毫秒，默认：0
		                convert: true,           //自动偏移坐标，偏移后的坐标为高德坐标，默认：true
		                showButton: true,        //显示定位按钮，默认：true
		                buttonPosition: 'LB',    //定位按钮停靠位置，默认：'LB'，左下角
		                buttonOffset: new AMap.Pixel(10, 20),//定位按钮与设置的停靠位置的偏移量，默认：Pixel(10, 20)
		                showMarker: true,        //定位成功后在定位到的位置显示点标记，默认：true
		                showCircle: false,        //定位成功后用圆圈表示定位精度范围，默认：true
		                panToLocation: false,     //定位成功后将定位到的位置作为地图中心点，默认：true
		                zoomToAccuracy: true      //定位成功后调整地图视野范围使定位位置及精度范围视野内可见，默认：false
		            });
		            _this.map.addControl(geolocation);
		            AMap.event.addListener(geolocation, 'error', _this.onLocateError);      //返回定位出错信息
		            if (callback) {
		                console.log("callback", callback);
		                AMap.event.addListener(geolocation, 'complete', callback);
		                geolocation.getCurrentPosition();
		                return; 
		            } else {
		                AMap.event.addListener(geolocation, 'complete', _this.onLocateComplete);//返回定位信息
		            }
		            console.log(_this.panToLocate);
		            if (_this.panToLocate) {
		                geolocation.getCurrentPosition();
		            }
		        });
        		break;
        	case _this.GOOGLE:        		
    			if (navigator.geolocation) {
		            navigator.geolocation.getCurrentPosition(function(position) {
		            var pos = {
		              lat: position.coords.latitude,
		              lng: position.coords.longitude
		            };					        
		            _this.map.setCenter(pos);
		          }, function() {
		             handleLocationError(true, _this.infoWindow, map.getCenter());
		          });
		        } else {
		            handleLocationError(false,  _this.infoWindow, map.getCenter());
		        }
        		break;
        } 
    }
	   	    //根据经纬度 解析地址
    mgMap.prototype.Geocoder=function(opts){
		var _this=this;		
		var callback = opts.callback || function (e) { };
		switch (this.mapType) {
		    case _this.BAIDU:   		  
				var geoc=new BMap.Geocoder(); 			
				 geoc.getLocation(opts.point, function(rs){               	
				    var addComp = rs.addressComponents;
				   	var address=addComp.province  + addComp.city + addComp.district + addComp.street + addComp.streetNumber;				
					callback(address);
				 });
		        break;
		    case _this.AMAP:
		    var geocoder ;
		       this.map.plugin(["AMap.Geocoder"], function () {
		    	 geocoder = new AMap.Geocoder(); 
			    	geocoder.getAddress(opts.point, function(status, result) { 			    	
			            callback(result.regeocode.formattedAddress); 
					}); 
				});    
		        break;
		   }   	
   }

    function Marker(options) {
        this.map = options.map;
        this.mapType = options.mapType;
        this.DeviceID = options.DeviceID;
        this.lat = options.lat;
        this.lng = options.lng;
        this.course = options.course || 0;
        this.titleText = options.titleText;
        switch (this.mapType) {
            case "BAIDU":
                if (options.iconId == undefined) {
                    this.iconId = 1; //图标ＩＤ
                } else {
                    this.iconId = options.iconId;
                } if (options.line == undefined) {
                    this.line = "Online";// 是否在线
                } else {
                    this.line = options.line;
                } if (options.course == undefined) {
                    this.course = "0";  //方向
                } else {
                    this.course = options.course;  //方向
                } if (options.lat == undefined || options.lng == undefined) { 
                    return;
                } 
             
                if (options.marker) {
                   this.marker = options.marker;
                }
                //var myIcon = GetBaiduIcon(options.iconId, options.line, options.course); //new BMap.Icon("http://developer.baidu.com/map/jsdemo/img/fox.gif", new BMap.Size(300, 157));
                //var point = new BMap.Point(options.lng, options.lat);
                //this.marker = new BMap.Marker(point, { icon: myIcon });  // 创建标注 
               
              //  if (options.titleText != undefined) { 
                 //   this.setMarkerTitle({ marker: marker, text: options.titleText });
               // }
                //_this.map.addOverlay(marker);
                //marker.addEventListener("click", function (e) {
                    //$("#a_device_" + v["SerialNumber"]).trigger("click");
                    //options.callBack();
                //});
                break;
            case "AMAP":             
                break;
            case "GOOGLE":
            	
            	break;
        }
    }
   
    Marker.prototype.show = function (opts) { 
        var _this = this;
        
        switch (_this.mapType) {
            case "BAIDU": 
                var point = new BMap.Point(_this.lng, _this.lat);
                var myIcon ;
                if (opts.icon) {
                	myIcon = new BMap.Icon(opts.icon,  new BMap.Size(50, 50),{imageOffset: new BMap.Size(14, 18)}); 
                }else{
                	//myIcon = GetBaiduIcon(this.iconId || 1, this.line, this.course); 
                }
                //var myIcon = opts.icon || GetBaiduIcon(this.iconId || 1, this.line, this.course); 
                var marker = new BMap.Marker(point,  { icon: myIcon });  // 创建标注, { icon: myIcon }
                _this.marker = marker;
                _this.map.addOverlay(marker); 
                if (opts.showTitle) {
                    var title = opts && opts.titleText || _this.titleText;
                    _this.setMarkerTitle({ marker: marker, text: title });
                } 
                break;
            case "AMAP":
                var marker = new AMap.Marker({
                    map: _this.map,
                    position: [_this.lng, _this.lat],                  	
                  //  angle :_this.course - 90, //图标倒立
                    offset: new AMap.Pixel(-12, -12), //相对于基点的偏移位置
                    autoRotation:opts.autoRotation,
                    icon: new AMap.Icon({
                         size: new AMap.Size(50, 50),  //图标大小
                          //imageOffset: new AMap.Pixel(0, -30),
                         image: opts.icon || "/images/point.gif", 
                    })
                }); 
               	if(opts.showTitle) 	{
               		 var title = opts && opts.titleText || _this.titleText;
                    _this.setMarkerTitle({ marker: marker, text: title });              		
               	}
                _this.marker = marker;
                break;
            case "GOOGLE":
            	var image={
            		url:opts.icon||"",
            	//	anchor: new google.maps.Point(2, -3)
            	}
            	var title = opts.showTitle == true ?_this.titleText : ""; 
            	var marker = new google.maps.Marker({
		       	 	position: new google.maps.LatLng(_this.lat,_this.lng),
		       	 	icon:image,		  
		       	 	map: _this.map,
		       	 	title: title
    			});
    			 //if (opts.showTitle) {
                 //   var title = opts && opts.titleText || _this.titleText;
                 //   _this.setMarkerTitle({ marker: marker, text: title });
    			 //}
    			
    			_this.marker = marker;
            	break;
        }
    };

    Marker.prototype.addEventListener = function (type,callBack) { 
        var _this = this;
        if (this.mapType == "BAIDU") { 
            this.marker.addEventListener(type, function (e) { 
                callBack(_this,_this.DeviceID);
            });
        } else if (this.mapType == "AMAP"){
            AMap.event.addListener(this.marker, type, function () {
                //  infoWindow.open(map, marker.getPosition());
                callBack(_this,_this.DeviceID);
            });
        }else if(this.mapType == "GOOGLE"){
        	_this.marker.addListener('click', function() { 
			    callBack(_this);
			});
        }
    }
	
    Marker.prototype.getOverlays = function (opts) {
        switch (this.mapType) {
            case "BAIDU":
                if (opts.marker) {
                    this.map.removeOverlay(opts.marker);
                    return;
                }
                var mkrs = this.map.getOverlays();
                for (var i = 0; i < mkrs.length; i++) { 
                    if (mkrs[i].constructor.name == "ic" && !opts.clearAll) {
                        continue;
                    }
                    this.map.removeOverlay(mkrs[i]); 
                }
                //this.map.clearOverlays();
                break;
        }
    }
    Marker.prototype.setMarkerTitle = function (opts) {
    	switch(this.mapType){
    		case "BAIDU":
    			var text = opts.text == undefined ? this.titleText : opts.text;
		        var marker = opts.marker || this.marker;
		        var label = new BMap.Label(text, { offset: new BMap.Size(25, 0) });
		        label.setStyle({
		           /* display: "block",
		            textAlign: "center",
		            width: "152px",
		            lineHeight: "35px",
		          	 border: "0px solid blue",          
		            background: "url(../../images/mapimage/label_bg.png)"*/
		            color : "red",
					fontSize : "12px",
					height : "20px",
					lineHeight : "20px",
					fontFamily:"微软雅黑",
					borderRadius:"5px",
					opacity:"0.8"
		        });
		        marker.setLabel(label);
		        break;
		    case "AMAP":
		    	var text = opts.text == undefined ? this.titleText : opts.text;
		    	var marker = opts.marker || this.marker;
		    	marker.setLabel({//label默认蓝框白底左上角显示，样式className为：amap-marker-label
			        offset: new AMap.Pixel(15, -20),//修改label相对于maker的位置
			        content: text
  				});
		    case "GOOGLE":
		       var text=opts.text;		    	
		       var marker = opts.marker || this.marker;
		       
		        var MarkerLabel=new google.maps.Marker({
		        	text:text,	
		        	color:"red",
		        	border:"5px solid red"
		        });
		        marker.setLabel(MarkerLabel);
		    	break;
    		
    	}
        
    }

    function InfoWindow(opts) { 
        this.mapType = opts.marker.mapType; 
        this.InfoWindow;
        this.DeviceId = opts.DeviceID;
        this.map = opts.map; 
        switch (this.mapType) {
            case "BAIDU":
                break;
            case "AMAP": 
                this.marker = opts.marker.marker;
                break;
            case "GOOGLE":
            	this.InfoWindow = new google.maps.InfoWindow({
				    content: opts.content
				});
            	break;
        } 
    }
    
    InfoWindow.prototype.addInfoWindow = function (opts) {
        var _this = this;
        opts.removeCallback = opts.removeCallback || function(){};
        switch (this.mapType) {
            case "BAIDU":
                opts.map = this.map;
                opts.point = opts.point;
                var myCompOverlay = new ComplexCustomOverlay(opts);
                this.CompOverlay = myCompOverlay;
                this.map.addOverlay(myCompOverlay);
                break;
            case "AMAP":
                _this.InfoWindow = new AMap.InfoWindow({
                	isCustom: false,  //使用自定义窗体
                    content: opts.html,
                    offset: new AMap.Pixel(-1, -13), //相对于基点的偏移位置
        			// offset: new AMap.Pixel(16, -45)
        			 //设置为false禁止平移效果
				    autoMove:false    
                });     
                _this.InfoWindow.open(this.map, this.marker.getPosition());
 
			    _this.InfoWindow.on('close', function(event) {

					opts.removeCallback();
		        });
              
               break;
            case "GOOGLE":
            	this.marker=opts.marker;
          		this.InfoWindow = new google.maps.InfoWindow({
				    content: opts.content
				});
				this.InfoWindow.open(this.map,opts.marker);
                break;
        }
    }
    InfoWindow.prototype.setInfoWindowPixel = function () {
        var _this = this; 
        //this.CompOverlay.setPixel(new BMap.Point(116.407845, 39.914101));
    }
    InfoWindow.prototype.remove = function (opts) {   
	   switch (this.mapType) {
        case "BAIDU":
            document.getElementById("divInfoWindow").parentNode.style.display="none";                  
            break;
        case "AMAP":
            document.getElementById("AmapWindowInfo").parentNode.parentNode.style.display="none"; 
            break;
		}
    }
    InfoWindow.prototype.show=function(opts){
    	switch (this.mapType) {
            case "BAIDU":
                document.getElementById("divInfoWindow").parentNode.style.display="block";   
                break;
            case "AMAP":
               document.getElementById("AmapWindowInfo").parentNode.parentNode.style.display="block";
            
                break;
    		}
    	
    }
     
 	function Circle(opts)
 	{
 		
 		this.map = opts.map;
 		this.mapType = opts.mapType;
 		this.radius = opts.radius;
 		this.point = opts.point;
 		this.geofenceid=null;  
		
 		switch(this.mapType){
 			case "BAIDU":
 				var circle = new BMap.Circle(this.point,this.radius,{fillColor:"red",strokeColor:"red",strokeWeight: 0.3,fillOpacity: 0.3, strokeOpacity: 0.8}); 	
 				/*var circle = new BMap.Circle(this.point,this.radius);*/
 				this.map.addOverlay(circle);
				this.circle = circle;
				break;  
 			case"AMAP": 
 				
 				var circle = new AMap.Circle({
			        center: this.point,// 圆心位置
			        radius: this.radius, //半径
			        strokeColor: "#F33", //线颜色
			        strokeOpacity: 1, //线透明度
			        strokeWeight: 2, //线粗细度
			        fillColor: "#ee2200", //填充颜色
			        fillOpacity: 0.35//填充透明度
  				});
    			circle.setMap(this.map);
    			this.circle = circle;
 				break;
 			case "GOOGLE":
			    this.circle= new google.maps.Circle({
			     	strokeColor:"#FF0000",
			      	strokeOpacity: 0.8,
			      	radius:parseInt(this.radius),
			      	strokeWeight: 1,
			      	fillColor: '#FF0000',
			      	fillOpacity: 0.35,
			      	map: this.map,
			      	center: this.point	
			     
				}); 
 				break;
 		}
 	}
 	//开启圆编辑功能
 	Circle.prototype.enableEditing = function () {
 		var _this = this;
 		switch (_this.mapType){
 			case "BAIDU":
 				_this.circle.enableEditing();
 				break;
 			default:
 				break;
 		}
 	}
 	///关闭圆编辑功能
 	Circle .prototype.disableEditing =function () {
 		var _this = this;
 		switch (_this.mapType){
 			case "BAIDU":
 				_this.circle.disableEditing();
 				break;
 			case"AMAP":
 				break;
 		}
 	}
 	///设置圆形的半径，单位为米。
 	Circle .prototype.setRadius = function (radius) {
 		var _this = this;
 		switch (_this.mapType){
 			case "BAIDU":
 				_this.circle.setRadius(radius);
 				break;
 			case"AMAP":
 				break;
 			case "GOOGLE":
 				_this.circle.setRadius(radius);		
 				break;
 		}
 	}
 	
 	Circle.prototype.getCenter = function () {
 		var _this = this;
 		switch (_this.mapType){
 			case "BAIDU":
 				return	_this.circle.getCenter();  
 			case"AMAP":
 				break;
 			case "GOOGLE":
 				return _this.circle.getCenter();
 		}
 	}
 	
 	Circle.prototype.setCenter = function (point) {
 		var _this = this;
 		switch (_this.mapType){
 			case "BAIDU":
 				_this.circle.setCenter(point);  
 				break;
 			case"AMAP":
 				break;
 			case "GOOGLE":
 				_this.circle.setCenter(point);
 				break;
 		}
 	}
 	
 	Circle.prototype.getRadius = function () {
 		var _this = this;
 		switch (_this.mapType){
 			case "BAIDU":
 				return	_this.circle.getRadius();  
 			case"AMAP":
 				break;
 			case "GOOGLE":
 				return _this.circle.getRadius();
 				break
 		}
 	}
 	//轨迹回放，只支持高德地图
    function MarkerMoving(opts) {
        //polyline, passedPolyline, marker
        this.marker = opts.marker;
        this.map = opts.map;
        this.lineArr = opts.lineArr;
        var callback = opts.callback || function (e) { };
        // 绘制轨迹
        var polyline = new AMap.Polyline({
            map:opts. map,
            path: opts.lineArr,
            strokeColor: "#00A",  //线颜色
            // strokeOpacity: 1,     //线透明度
            strokeWeight: 3,      //线宽
            // strokeStyle: "solid"  //线样式
        });
        //行走过后的线
        var passedPolyline = new AMap.Polyline({
            map: opts.map,
            // path: lineArr,
            strokeColor: "#F00",  //线颜色
            // strokeOpacity: 1,     //线透明度
            strokeWeight: 3,      //线宽
            // strokeStyle: "solid"  //线样式
        });
        this.marker.on("moving", function (e) {
            passedPolyline.setPath(e.passedPath);
            callback(e);
        });
        this.map.setFitView();
    }
    MarkerMoving.prototype.start = function(speed)
    {
    	
        var _this = this;
        speed = speed || 1000; 
       
        _this.marker.moveAlong(_this.lineArr, speed); 
    }
    MarkerMoving.prototype.pause = function () {
        this.marker.pauseMove();
    }
    MarkerMoving.prototype.resume = function () {
        this.marker.resumeMove();
    }
    MarkerMoving.prototype.stop = function () {
        this.marker.stopMove();
    }
    
    function ComplexCustomOverlay(opts) { 
        if (opts.isOnly || opts.isOnly == undefined) {
            var mkrs = opts.map.getOverlays();
            for (var i = 0; i < mkrs.length; i++) {
                if (mkrs[i].constructor.name == "ic") {
                    opts.map.removeOverlay(mkrs[i]);
                } 
            }
            if(document.getElementById("divInfoWindow")!= undefined)
            removeElement(document.getElementById("divInfoWindow")); 
        }
        function removeElement(_element){
	         var _parentElement = _element.parentNode;
	         if(_parentElement){
	                _parentElement.removeChild(_element);
	         }
		}
        this.opts = opts;
        this._point = opts.point;
        this._html = opts.html;
        this._overText = opts.mouseoverText;
       
    }
 
    if (typeof (BMap) != "undefined") {
        ComplexCustomOverlay.prototype = new BMap.Overlay();
        ComplexCustomOverlay.prototype.initialize = function (z_map) {
        	
            this._map = z_map;
            var div = this._div = document.createElement("div");
            div.id = "divInfoWindow";
            div.style.position = "absolute";
            div.style.zIndex = BMap.Overlay.getZIndex(this._point.lat);
         /*   div.style.backgroundColor = "#EFEFEF";*/
            div.style.border = "0px solid #A7C0E0";  
            div.style.color = "#000000";
            div.style.height = this.opts.style.height; 
            div.style.width =  this.opts.style.width;  
           
            div.style.padding = "2px";
            div.style.lineHeight = "20px";
            //div.style.whiteSpace = "nowrap";
            div.style.MozUserSelect = "none";
            div.style.zIndex = 5001;
            div.style.fontSize = "12px"
 
            var span = this._span = document.createElement("span");
            span.style.width = div.style.width;
            span.style.height = div.style.height; 
            div.appendChild(span);
            //span.appendChild(document.createTextNode(this._html));
           
            var close = this._close = document.createElement("a");
            close.style.right = "0px";  
            close.style.top = "-3px";
            close.style.position = "absolute";
            close.style.fontSize = "20px";
            close.style.cursor = "pointer";
            close.style.textDecoration = "none";
            close.title = "关闭";
            close.id = "infoWiindowClose";
            close.onclick = function () {
                div.style.display = "none";
            }
            //兼容移动端浏览器
            close.addEventListener("touchstart", function (e) {
                e.preventDefault();
                div.style.display = "none";
            })
            close.appendChild(document.createTextNode("×"));
            //div.appendChild(close);
    
            var arrow = this._arrow = document.createElement("div");
            arrow.style.background = "url(images/maps/label.png) no-repeat center";
            arrow.style.position = "absolute";
            arrow.style.width = "11px";
            arrow.style.height = "10px";
            arrow.style.top = (this.opts.style.height.replace('px', '') ) +"px";
            arrow.style.left = (this.opts.style.width.replace('px', '') / 2 )+"px";
            arrow.style.overflow = "hidden";
            arrow.style.zIndex = 5002;
            //div.appendChild(arrow);

            //div.onmouseover = function () {
            //    this.style.backgroundColor = "#6BADCA";
            //    this.style.borderColor = "#0000ff";
            //    z_index = this.style.zIndex;
            //    this.style.zIndex = 5000;
            //    this.getElementsByTagName("span")[0].innerHTML = that._overText;
            //    arrow.style.backgroundPosition = "0px -10px";
            //}

            //div.onmouseout = function () {
            //    this.style.backgroundColor = "#EE5D5B";
            //    this.style.borderColor = "#BC3B3A";
            //    this.style.zIndex = z_index;
            //    this.getElementsByTagName("span")[0].innerHTML = that._html;
            //    arrow.style.backgroundPosition = "0px 0px";
            //}
            this.opts.map.getPanes().labelPane.appendChild(div);
            //div.parentNode.appendChild(arrow);
		 
            if (this.opts.class) {
                $(div).addClass(this.opts.class);
            }
            return div;
        }
        ComplexCustomOverlay.prototype.draw = function () {
            var z_map = this._map;
            var pixel = z_map.pointToOverlayPixel(this._point); 
            this._div.style.left = pixel.x - (this.opts.style.width.replace('px', '') / 2) + "px";
            this._div.style.top = pixel.y - (parseInt(this._div.style.height) + 30) + "px";
            var top = (this.opts.style.height.replace('px', '') - 0);;
            var left = (this.opts.style.width.replace('px', '') / 2 - 11); 
         
           // var span = '<span class="mui-icon iconfont icon-daosanjiao" style="position:absolute;z-index:4999;color:#A6A6A6;font-size:20px;top:' + top + 'px;left:' + left + 'px"></span>';
          	 this._span.innerHTML = this.opts.html;  
           // this._span.innerHTML = this.opts.html + span;  
        }
    }
   

    //只用于百度地图
    function GetBaiduIcon(t, s, c) { 
        if (s == "Arrears") {
            s = "Offline";
        }
        var bIcon = new BMap.Icon("/images/map/carIcon/27_0.png", new BMap.Size(12, 20));
        var course = parseFloat(c);
        t = parseInt(t);
        var icon = "";
        if ((course >= 0 && course < 22.5) || (course >= 337.5 && course < 360) || course >= 360) // 0,360
        {
            if (t == 1) {
                if (s == "Offline") {
                    icon = "/images/map/carIcon/offline_27_0.png";
                } else {
                    icon = "/images/map/carIcon/27_0.png";
                }
                bIcon = new BMap.Icon(icon, new BMap.Size(28, 28));
            } else if (t == 2) {
                icon = "/images/map/carIcon/2.png";
                bIcon = new BMap.Icon(icon, new BMap.Size(14, 18));
            } else if (t == 21) {
                if (s == "Offline") {
                    icon = "/images/map/carIcon/offline_27_0.png";
                } else {
                    icon = "/images/map/carIcon/21_0.png";
                }
                bIcon = new BMap.Icon(icon, new BMap.Size(28, 28));
            } else if (t == 22) {
                if (s == "Offline") {
                    icon = "/images/map/carIcon/offline_22_0.png";
                } else {
                    icon = "/images/map/carIcon/22_0.png";
                }
                bIcon = new BMap.Icon(icon, new BMap.Size(28, 28));
            } else if (t == 23) {
                if (s == "Offline") {
                    icon = "/images/map/carIcon/offline_23_0.png";
                } else {
                    icon = "/images/map/carIcon/23_0.png";
                }
                bIcon = new BMap.Icon(icon, new BMap.Size(24, 24));
            } else if (t == 24) {
                if (s == "Offline") {
                    icon = "/images/map/carIcon/offline_24_0.png";
                } else {
                    icon = "/images/map/carIcon/24_0.png";
                }
                bIcon = new BMap.Icon(icon, new BMap.Size(28, 28));
            } else if (t == 25) {
                if (s == "Offline") {
                    icon = "/images/map/carIcon/offline_25_0.png";
                } else {
                    icon = "/images/map/carIcon/25_0.png";
                }
                bIcon = new BMap.Icon(icon, new BMap.Size(28, 28));
            } else if (t == 26) {
                if (s == "Offline") {
                    icon = "/images/map/carIcon/offline_26_0.png";
                } else {
                    icon = "/images/map/carIcon/26_0.png";
                }
                bIcon = new BMap.Icon(icon, new BMap.Size(28, 28));
            }
        }
        else if (course >= 22.5 && course < 67.5) // 45
        {
            if (t == 1) {
                if (s == "Offline") {
                    icon = "/images/map/carIcon/offline_27_45.png";
                } else {
                    icon = "/images/map/carIcon/27_45.png";
                }
                bIcon = new BMap.Icon(icon, new BMap.Size(28, 28));
            } else if (t == 2) {
                icon = "/images/map/carIcon/2.png";
                bIcon = new BMap.Icon(icon, new BMap.Size(14, 18));
            } else if (t == 21) {
                if (s == "Offline") {
                    icon = "/images/map/carIcon/offline_27_45.png";
                } else {
                    icon = "/images/map/carIcon/21_45.png";
                }
                bIcon = new BMap.Icon(icon, new BMap.Size(28, 28));
            } else if (t == 22) {
                if (s == "Offline") {
                    icon = "/images/map/carIcon/offline_22_45.png";
                } else {
                    icon = "/images/map/carIcon/22_45.png";
                }
                bIcon = new BMap.Icon(icon, new BMap.Size(28, 28));
            } else if (t == 23) {
                if (s == "Offline") {
                    icon = "/images/map/carIcon/offline_23_45.png";
                } else {
                    icon = "/images/map/carIcon/23_45.png";
                }
                bIcon = new BMap.Icon(icon, new BMap.Size(24, 24));
            } else if (t == 24) {
                if (s == "Offline") {
                    icon = "/images/map/carIcon/offline_24_45.png";
                } else {
                    icon = "/images/map/carIcon/24_45.png";
                }
                bIcon = new BMap.Icon(icon, new BMap.Size(28, 28));
            } else if (t == 25) {
                if (s == "Offline") {
                    icon = "/images/map/carIcon/offline_25_45.png";
                } else {
                    icon = "/images/map/carIcon/25_45.png";
                }
                bIcon = new BMap.Icon(icon, new BMap.Size(28, 28));
            } else if (t == 26) {
                if (s == "Offline") {
                    icon = "/images/map/carIcon/offline_26_45.png";
                } else {
                    icon = "/images/map/carIcon/26_45.png";
                }
                bIcon = new BMap.Icon(icon, new BMap.Size(28, 28));
            }
        }
        else if (course >= 67.5 && course < 112.5) // 90
        {
            if (t == 1) {
                if (s == "Offline") {
                    icon = "/images/map/carIcon/offline_27_90.png";
                } else {
                    icon = "/images/map/carIcon/27_90.png";
                }
                bIcon = new BMap.Icon(icon, new BMap.Size(28, 28));
            } else if (t == 2) {
                icon = "/images/map/carIcon/2.png";
                bIcon = new BMap.Icon(icon, new BMap.Size(14, 18));
            } else if (t == 21) {
                if (s == "Offline") {
                    icon = "/images/map/carIcon/offline_27_90.png";
                } else {
                    icon = "/images/map/carIcon/21_90.png";
                }
                bIcon = new BMap.Icon(icon, new BMap.Size(28, 28));
            } else if (t == 22) {
                if (s == "Offline") {
                    icon = "/images/map/carIcon/offline_22_90.png";
                } else {
                    icon = "/images/map/carIcon/22_90.png";
                }
                bIcon = new BMap.Icon(icon, new BMap.Size(28, 28));
            } else if (t == 23) {
                if (s == "Offline") {
                    icon = "/images/map/carIcon/offline_23_90.png";
                } else {
                    icon = "/images/map/carIcon/23_90.png";
                }
                bIcon = new BMap.Icon(icon, new BMap.Size(24, 24));
            } else if (t == 24) {
                if (s == "Offline") {
                    icon = "/images/map/carIcon/offline_24_90.png";
                } else {
                    icon = "/images/map/carIcon/24_90.png";
                }
                bIcon = new BMap.Icon(icon, new BMap.Size(28, 28));
            } else if (t == 25) {
                if (s == "Offline") {
                    icon = "/images/map/carIcon/offline_25_90.png";
                } else {
                    icon = "/images/map/carIcon/25_90.png";
                }
                bIcon = new BMap.Icon(icon, new BMap.Size(28, 28));
            } else if (t == 26) {
                if (s == "Offline") {
                    icon = "/images/map/carIcon/offline_26_90.png";
                } else {
                    icon = "/images/map/carIcon/26_90.png";
                }
                bIcon = new BMap.Icon(icon, new BMap.Size(28, 28));
            }
        }
        else if (course >= 112.5 && course < 157.5) //135
        {
            if (t == 1) {
                if (s == "Offline") {
                    icon = "/images/map/carIcon/offline_27_135.png";
                } else {
                    icon = "/images/map/carIcon/27_135.png";
                }
                bIcon = new BMap.Icon(icon, new BMap.Size(28, 28));
            } else if (t == 2) {
                icon = "/images/map/carIcon/2.png";
                bIcon = new BMap.Icon(icon, new BMap.Size(14, 18));
            } else if (t == 21) {
                if (s == "Offline") {
                    icon = "/images/map/carIcon/offline_27_135.png";
                } else {
                    icon = "/images/map/carIcon/21_135.png";
                }
                bIcon = new BMap.Icon(icon, new BMap.Size(28, 28));
            } else if (t == 22) {
                if (s == "Offline") {
                    icon = "/images/map/carIcon/offline_22_135.png";
                } else {
                    icon = "/images/map/carIcon/22_135.png";
                }
                bIcon = new BMap.Icon(icon, new BMap.Size(28, 28));
            } else if (t == 23) {
                if (s == "Offline") {
                    icon = "/images/map/carIcon/offline_23_135.png";
                } else {
                    icon = "/images/map/carIcon/23_135.png";
                }
                bIcon = new BMap.Icon(icon, new BMap.Size(24, 24));
            } else if (t == 24) {
                if (s == "Offline") {
                    icon = "/images/map/carIcon/offline_24_135.png";
                } else {
                    icon = "/images/map/carIcon/24_135.png";
                }
                bIcon = new BMap.Icon(icon, new BMap.Size(28, 28));
            } else if (t == 25) {
                if (s == "Offline") {
                    icon = "/images/map/carIcon/offline_25_135.png";
                } else {
                    icon = "/images/map/carIcon/25_135.png";
                }
                bIcon = new BMap.Icon(icon, new BMap.Size(28, 28));
            } else if (t == 26) {
                if (s == "Offline") {
                    icon = "/images/map/carIcon/offline_26_135.png";
                } else {
                    icon = "/images/map/carIcon/26_135.png";
                }
                bIcon = new BMap.Icon(icon, new BMap.Size(28, 28));
            }
        }
        else if (course >= 157.5 && course < 202.5) //180
        {
            if (t == 1) {
                if (s == "Offline") {
                    icon = "/images/map/carIcon/offline_27_180.png";
                } else {
                    icon = "/images/map/carIcon/27_180.png";
                }
                bIcon = new BMap.Icon(icon, new BMap.Size(28, 28));
            } else if (t == 2) {
                icon = "/images/map/carIcon/2.png";
                bIcon = new BMap.Icon(icon, new BMap.Size(14, 18));
            } else if (t == 21) {
                if (s == "Offline") {
                    icon = "/images/map/carIcon/offline_27_180.png";
                } else {
                    icon = "/images/map/carIcon/21_180.png";
                }
                bIcon = new BMap.Icon(icon, new BMap.Size(28, 28));
            } else if (t == 22) {
                if (s == "Offline") {
                    icon = "/images/map/carIcon/offline_22_180.png";
                } else {
                    icon = "/images/map/carIcon/22_180.png";
                }
                bIcon = new BMap.Icon(icon, new BMap.Size(28, 28));
            } else if (t == 23) {
                if (s == "Offline") {
                    icon = "/images/map/carIcon/offline_23_180.png";
                } else {
                    icon = "/images/map/carIcon/23_180.png";
                }
                bIcon = new BMap.Icon(icon, new BMap.Size(24, 24));
            } else if (t == 24) {
                if (s == "Offline") {
                    icon = "/images/map/carIcon/offline_24_180.png";
                } else {
                    icon = "/images/map/carIcon/24_180.png";
                }
                bIcon = new BMap.Icon(icon, new BMap.Size(28, 28));
            } else if (t == 25) {
                if (s == "Offline") {
                    icon = "/images/map/carIcon/offline_25_180.png";
                } else {
                    icon = "/images/map/carIcon/25_180.png";
                }
                bIcon = new BMap.Icon(icon, new BMap.Size(28, 28));
            } else if (t == 26) {
                if (s == "Offline") {
                    icon = "/images/map/carIcon/offline_26_180.png";
                } else {
                    icon = "/images/map/carIcon/26_180.png";
                }
                bIcon = new BMap.Icon(icon, new BMap.Size(28, 28));
            }
        }
        else if (course >= 202.5 && course < 247.5) //225
        {
            if (t == 1) {
                if (s == "Offline") {
                    icon = "/images/map/carIcon/offline_27_225.png";
                } else {
                    icon = "/images/map/carIcon/27_225.png";
                }
                bIcon = new BMap.Icon(icon, new BMap.Size(28, 28));
            } else if (t == 2) {
                icon = "/images/map/carIcon/2.png";
                bIcon = new BMap.Icon(icon, new BMap.Size(14, 18));
            } else if (t == 21) {
                if (s == "Offline") {
                    icon = "/images/map/carIcon/offline_27_225.png";
                } else {
                    icon = "/images/map/carIcon/21_225.png";
                }
                bIcon = new BMap.Icon(icon, new BMap.Size(28, 28));
            } else if (t == 22) {
                if (s == "Offline") {
                    icon = "/images/map/carIcon/offline_22_225.png";
                } else {
                    icon = "/images/map/carIcon/22_225.png";
                }
                bIcon = new BMap.Icon(icon, new BMap.Size(28, 28));
            } else if (t == 23) {
                if (s == "Offline") {
                    icon = "/images/map/carIcon/offline_23_225.png";
                } else {
                    icon = "/images/map/carIcon/23_225.png";
                }
                bIcon = new BMap.Icon(icon, new BMap.Size(24, 24));
            } else if (t == 24) {
                if (s == "Offline") {
                    icon = "/images/map/carIcon/offline_24_225.png";
                } else {
                    icon = "/images/map/carIcon/24_225.png";
                }
                bIcon = new BMap.Icon(icon, new BMap.Size(28, 28));
            } else if (t == 25) {
                if (s == "Offline") {
                    icon = "/images/map/carIcon/offline_25_225.png";
                } else {
                    icon = "/images/map/carIcon/25_225.png";
                }
                bIcon = new BMap.Icon(icon, new BMap.Size(28, 28));
            } else if (t == 26) {
                if (s == "Offline") {
                    icon = "/images/map/carIcon/offline_26_225.png";
                } else {
                    icon = "/images/map/carIcon/26_225.png";
                }
                bIcon = new BMap.Icon(icon, new BMap.Size(28, 28));
            }
        }
        else if (course >= 247.5 && course < 292.5) //270
        {
            if (t == 1) {
                if (s == "Offline") {
                    icon = "/images/map/carIcon/offline_27_270.png";
                } else {
                    icon = "/images/map/carIcon/27_270.png";
                }
                bIcon = new BMap.Icon(icon, new BMap.Size(28, 28));
            } else if (t == 2) {
                icon = "/images/map/carIcon/2.png";
                bIcon = new BMap.Icon(icon, new BMap.Size(14, 18));
            } else if (t == 21) {
                if (s == "Offline") {
                    icon = "/images/map/carIcon/offline_27_270.png";
                } else {
                    icon = "/images/map/carIcon/21_270.png";
                }
                bIcon = new BMap.Icon(icon, new BMap.Size(28, 28));
            } else if (t == 22) {
                if (s == "Offline") {
                    icon = "/images/map/carIcon/offline_22_270.png";
                } else {
                    icon = "/images/map/carIcon/22_270.png";
                }
                bIcon = new BMap.Icon(icon, new BMap.Size(28, 28));
            } else if (t == 23) {
                if (s == "Offline") {
                    icon = "/images/map/carIcon/offline_23_270.png";
                } else {
                    icon = "/images/map/carIcon/23_270.png";
                }
                bIcon = new BMap.Icon(icon, new BMap.Size(24, 24));
            } else if (t == 24) {
                if (s == "Offline") {
                    icon = "/images/map/carIcon/offline_24_270.png";
                } else {
                    icon = "/images/map/carIcon/24_270.png";
                }
                bIcon = new BMap.Icon(icon, new BMap.Size(28, 28));
            } else if (t == 25) {
                if (s == "Offline") {
                    icon = "/images/map/carIcon/offline_25_270.png";
                } else {
                    icon = "/images/map/carIcon/25_270.png";
                }
                bIcon = new BMap.Icon(icon, new BMap.Size(28, 28));
            } else if (t == 26) {
                if (s == "Offline") {
                    icon = "/images/map/carIcon/offline_26_270.png";
                } else {
                    icon = "/images/map/carIcon/26_270.png";
                }
                bIcon = new BMap.Icon(icon, new BMap.Size(28, 28));
            }
        }
        else if (course >= 292.5 && course < 337.5) //315
        {
            if (t == 1) {
                if (s == "Offline") {
                    icon = "/images/map/carIcon/offline_27_315.png";
                } else {
                    icon = "/images/map/carIcon/27_315.png";
                }
                bIcon = new BMap.Icon(icon, new BMap.Size(28, 28));
            } else if (t == 2) {
                icon = "/images/map/carIcon/2.png";
                bIcon = new BMap.Icon(icon, new BMap.Size(14, 18));
            } else if (t == 21) {
                if (s == "Offline") {
                    icon = "/images/map/carIcon/offline_27_315.png";
                } else {
                    icon = "/images/map/carIcon/21_315.png";
                }
                bIcon = new BMap.Icon(icon, new BMap.Size(28, 28));
            } else if (t == 22) {
                if (s == "Offline") {
                    icon = "/images/map/carIcon/offline_22_315.png";
                } else {
                    icon = "/images/map/carIcon/22_315.png";
                }
                bIcon = new BMap.Icon(icon, new BMap.Size(28, 28));
            } else if (t == 23) {
                if (s == "Offline") {
                    icon = "/images/map/carIcon/offline_23_315.png";
                } else {
                    icon = "/images/map/carIcon/23_315.png";
                }
                bIcon = new BMap.Icon(icon, new BMap.Size(24, 24));
            } else if (t == 24) {
                if (s == "Offline") {
                    icon = "/images/map/carIcon/offline_24_315.png";
                } else {
                    icon = "/images/map/carIcon/24_315.png";
                }
                bIcon = new BMap.Icon(icon, new BMap.Size(28, 28));
            } else if (t == 25) {
                if (s == "Offline") {
                    icon = "/images/map/carIcon/offline_25_315.png";
                } else {
                    icon = "/images/map/carIcon/25_315.png";
                }
                bIcon = new BMap.Icon(icon, new BMap.Size(28, 28));
            } else if (t == 26) {
                if (s == "Offline") {
                    icon = "/images/map/carIcon/offline_26_315.png";
                } else {
                    icon = "/images/map/carIcon/26_315.png";
                }
                bIcon = new BMap.Icon(icon, new BMap.Size(28, 28));
            }
        }
        else {

        }
        if (t == 30) {
            if (s == "Offline") {
                icon = "/images/map/carIcon/offline_30.png";
            } else {
                icon = "/images/map/carIcon/30.png";
            }
            bIcon = new BMap.Icon(icon, new BMap.Size(28, 28));
        } else if (t == 31) {
            if (s == "Offline") {
                icon = "/images/map/carIcon/offline_31.png";
            } else {
                icon = "/images/map/carIcon/31.png";
            }
            bIcon = new BMap.Icon(icon, new BMap.Size(28, 28));
        }

        return bIcon;
    }


    function loadJScript() {

        var script = document.createElement("script");
        script.type = "text/javascript";
        script.src = "http://api.map.baidu.com/api?v=2.0&ak=SAbCayX7PG5UMsqW6d1DZ9K0";
        document.body.appendChild(script);
        console.log(document.body);
    }
   