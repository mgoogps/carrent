 

function GetCoureName(course) {
    var name = "";
    course = parseFloat(course);
    if ((course >= 0 && course < 22.5) || (course >= 337.5 && course < 360)) // 0
    {
        name = courseName.dueNorth;
    }
    else if (course >= 22.5 && course < 67.5) // 45
    {
        name = courseName.northeast ;
    }
    else if (course >= 67.5 && course < 112.5) // 90
    {
        name = courseName.dueEast ;
    }
    else if (course >= 112.5 && course < 157.5) //135
    {
        name =courseName.southeast  ;
    }
    else if (course >= 157.5 && course < 202.5) //180
    {
        name = courseName.dueSouth  ;
    }
    else if (course >= 202.5 && course < 247.5) //225
    {
        name = courseName.southwest  ;
    }
    else if (course >= 247.5 && course < 292.5) //270
    {
        name =courseName.dueWest  ;
    }
    else if (course >= 292.5 && course < 337.5) //315
    {
        name = courseName.northwest ;
    }
    else {
        name = "";
    }
    return name;
}

//只用于百度地图
function GetBaiduIcon(t, s, c) {
    if (s == "Arrears") {
        s = "Offline";
    }
    var bIcon = new BMap.Icon("icons/carIcon/27_0.png", new BMap.Size(12, 20));
    var course = parseFloat(c);
    t = parseInt(t);
    var icon = "";
    if (t == 3 || t == 0) {
        if (s == "Offline") {
            icon = "icons/carIcon/point-offline.gif";
        } else {
            icon = "icons/carIcon/point-online.gif";
        }
        bIcon = new BMap.Icon(icon, new BMap.Size(28, 28));
        return bIcon;
    }
    if ((course >= 0 && course < 22.5) || (course >= 337.5 && course < 360) || course >= 360) // 0,360
    {
        if (t == 1) {
            if (s == "Offline") {
                icon = "icons/carIcon/offline_27_0.png";
            } else {
                icon = "icons/carIcon/27_0.png";
            }
            bIcon = new BMap.Icon(icon, new BMap.Size(28, 28));
        } else if (t == 2) {
            icon = "icons/carIcon/2.png";
            bIcon = new BMap.Icon(icon, new BMap.Size(14, 18));
        } else if (t == 21) {
            if (s == "Offline") {
                icon = "icons/carIcon/offline_27_0.png";
            } else {
                icon = "icons/carIcon/21_0.png";
            }
            bIcon = new BMap.Icon(icon, new BMap.Size(28, 28));
        } else if (t == 22) {
            if (s == "Offline") {
                icon = "icons/carIcon/offline_22_0.png";
            } else {
                icon = "icons/carIcon/22_0.png";
            }
            bIcon = new BMap.Icon(icon, new BMap.Size(28, 28));
        } else if (t == 23) {
            if (s == "Offline") {
                icon = "icons/carIcon/offline_23_0.png";
            } else {
                icon = "icons/carIcon/23_0.png";
            }
            bIcon = new BMap.Icon(icon, new BMap.Size(24, 24));
        } else if (t == 24) {
            if (s == "Offline") {
                icon = "icons/carIcon/offline_24_0.png";
            } else {
                icon = "icons/carIcon/24_0.png";
            }
            bIcon = new BMap.Icon(icon, new BMap.Size(28, 28));
        } else if (t == 25) {
            if (s == "Offline") {
                icon = "icons/carIcon/offline_25_0.png";
            } else {
                icon = "icons/carIcon/25_0.png";
            }
            bIcon = new BMap.Icon(icon, new BMap.Size(28, 28));
        } else if (t == 26) {
            if (s == "Offline") {
                icon = "icons/carIcon/offline_26_0.png";
            } else {
                icon = "icons/carIcon/26_0.png";
            }
            bIcon = new BMap.Icon(icon, new BMap.Size(28, 28));
        }
    }
    else if (course >= 22.5 && course < 67.5) // 45
    {
        if (t == 1) {
            if (s == "Offline") {
                icon = "icons/carIcon/offline_27_45.png";
            } else {
                icon = "icons/carIcon/27_45.png";
            }
            bIcon = new BMap.Icon(icon, new BMap.Size(28, 28));
        } else if (t == 2) {
            icon = "icons/carIcon/2.png";
            bIcon = new BMap.Icon(icon, new BMap.Size(14, 18));
        } else if (t == 21) {
            if (s == "Offline") {
                icon = "icons/carIcon/offline_27_45.png";
            } else {
                icon = "icons/carIcon/21_45.png";
            }
            bIcon = new BMap.Icon(icon, new BMap.Size(28, 28));
        } else if (t == 22) {
            if (s == "Offline") {
                icon = "icons/carIcon/offline_22_45.png";
            } else {
                icon = "icons/carIcon/22_45.png";
            }
            bIcon = new BMap.Icon(icon, new BMap.Size(28, 28));
        } else if (t == 23) {
            if (s == "Offline") {
                icon = "icons/carIcon/offline_23_45.png";
            } else {
                icon = "icons/carIcon/23_45.png";
            }
            bIcon = new BMap.Icon(icon, new BMap.Size(24, 24));
        } else if (t == 24) {
            if (s == "Offline") {
                icon = "icons/carIcon/offline_24_45.png";
            } else {
                icon = "icons/carIcon/24_45.png";
            }
            bIcon = new BMap.Icon(icon, new BMap.Size(28, 28));
        } else if (t == 25) {
            if (s == "Offline") {
                icon = "icons/carIcon/offline_25_45.png";
            } else {
                icon = "icons/carIcon/25_45.png";
            }
            bIcon = new BMap.Icon(icon, new BMap.Size(28, 28));
        } else if (t == 26) {
            if (s == "Offline") {
                icon = "icons/carIcon/offline_26_45.png";
            } else {
                icon = "icons/carIcon/26_45.png";
            }
            bIcon = new BMap.Icon(icon, new BMap.Size(28, 28));
        }
    }
    else if (course >= 67.5 && course < 112.5) // 90
    {
        if (t == 1) {
            if (s == "Offline") {
                icon = "icons/carIcon/offline_27_90.png";
            } else {
                icon = "icons/carIcon/27_90.png";
            }
            bIcon = new BMap.Icon(icon, new BMap.Size(28, 28));
        } else if (t == 2) {
            icon = "icons/carIcon/2.png";
            bIcon = new BMap.Icon(icon, new BMap.Size(14, 18));
        } else if (t == 21) {
            if (s == "Offline") {
                icon = "icons/carIcon/offline_27_90.png";
            } else {
                icon = "icons/carIcon/21_90.png";
            }
            bIcon = new BMap.Icon(icon, new BMap.Size(28, 28));
        } else if (t == 22) {
            if (s == "Offline") {
                icon = "icons/carIcon/offline_22_90.png";
            } else {
                icon = "icons/carIcon/22_90.png";
            }
            bIcon = new BMap.Icon(icon, new BMap.Size(28, 28));
        } else if (t == 23) {
            if (s == "Offline") {
                icon = "icons/carIcon/offline_23_90.png";
            } else {
                icon = "icons/carIcon/23_90.png";
            }
            bIcon = new BMap.Icon(icon, new BMap.Size(24, 24));
        } else if (t == 24) {
            if (s == "Offline") {
                icon = "icons/carIcon/offline_24_90.png";
            } else {
                icon = "icons/carIcon/24_90.png";
            }
            bIcon = new BMap.Icon(icon, new BMap.Size(28, 28));
        } else if (t == 25) {
            if (s == "Offline") {
                icon = "icons/carIcon/offline_25_90.png";
            } else {
                icon = "icons/carIcon/25_90.png";
            }
            bIcon = new BMap.Icon(icon, new BMap.Size(28, 28));
        } else if (t == 26) {
            if (s == "Offline") {
                icon = "icons/carIcon/offline_26_90.png";
            } else {
                icon = "icons/carIcon/26_90.png";
            }
            bIcon = new BMap.Icon(icon, new BMap.Size(28, 28));
        }
    }
    else if (course >= 112.5 && course < 157.5) //135
    {
        if (t == 1) {
            if (s == "Offline") {
                icon = "icons/carIcon/offline_27_135.png";
            } else {
                icon = "icons/carIcon/27_135.png";
            }
            bIcon = new BMap.Icon(icon, new BMap.Size(28, 28));
        } else if (t == 2) {
            icon = "icons/carIcon/2.png";
            bIcon = new BMap.Icon(icon, new BMap.Size(14, 18));
        } else if (t == 21) {
            if (s == "Offline") {
                icon = "icons/carIcon/offline_27_135.png";
            } else {
                icon = "icons/carIcon/21_135.png";
            }
            bIcon = new BMap.Icon(icon, new BMap.Size(28, 28));
        } else if (t == 22) {
            if (s == "Offline") {
                icon = "icons/carIcon/offline_22_135.png";
            } else {
                icon = "icons/carIcon/22_135.png";
            }
            bIcon = new BMap.Icon(icon, new BMap.Size(28, 28));
        } else if (t == 23) {
            if (s == "Offline") {
                icon = "icons/carIcon/offline_23_135.png";
            } else {
                icon = "icons/carIcon/23_135.png";
            }
            bIcon = new BMap.Icon(icon, new BMap.Size(24, 24));
        } else if (t == 24) {
            if (s == "Offline") {
                icon = "icons/carIcon/offline_24_135.png";
            } else {
                icon = "icons/carIcon/24_135.png";
            }
            bIcon = new BMap.Icon(icon, new BMap.Size(28, 28));
        } else if (t == 25) {
            if (s == "Offline") {
                icon = "icons/carIcon/offline_25_135.png";
            } else {
                icon = "icons/carIcon/25_135.png";
            }
            bIcon = new BMap.Icon(icon, new BMap.Size(28, 28));
        } else if (t == 26) {
            if (s == "Offline") {
                icon = "icons/carIcon/offline_26_135.png";
            } else {
                icon = "icons/carIcon/26_135.png";
            }
            bIcon = new BMap.Icon(icon, new BMap.Size(28, 28));
        }
    }
    else if (course >= 157.5 && course < 202.5) //180
    {
        if (t == 1) {
            if (s == "Offline") {
                icon = "icons/carIcon/offline_27_180.png";
            } else {
                icon = "icons/carIcon/27_180.png";
            }
            bIcon = new BMap.Icon(icon, new BMap.Size(28, 28));
        } else if (t == 2) {
            icon = "icons/carIcon/2.png";
            bIcon = new BMap.Icon(icon, new BMap.Size(14, 18));
        } else if (t == 21) {
            if (s == "Offline") {
                icon = "icons/carIcon/offline_27_180.png";
            } else {
                icon = "icons/carIcon/21_180.png";
            }
            bIcon = new BMap.Icon(icon, new BMap.Size(28, 28));
        } else if (t == 22) {
            if (s == "Offline") {
                icon = "icons/carIcon/offline_22_180.png";
            } else {
                icon = "icons/carIcon/22_180.png";
            }
            bIcon = new BMap.Icon(icon, new BMap.Size(28, 28));
        } else if (t == 23) {
            if (s == "Offline") {
                icon = "icons/carIcon/offline_23_180.png";
            } else {
                icon = "icons/carIcon/23_180.png";
            }
            bIcon = new BMap.Icon(icon, new BMap.Size(24, 24));
        } else if (t == 24) {
            if (s == "Offline") {
                icon = "icons/carIcon/offline_24_180.png";
            } else {
                icon = "icons/carIcon/24_180.png";
            }
            bIcon = new BMap.Icon(icon, new BMap.Size(28, 28));
        } else if (t == 25) {
            if (s == "Offline") {
                icon = "icons/carIcon/offline_25_180.png";
            } else {
                icon = "icons/carIcon/25_180.png";
            }
            bIcon = new BMap.Icon(icon, new BMap.Size(28, 28));
        } else if (t == 26) {
            if (s == "Offline") {
                icon = "icons/carIcon/offline_26_180.png";
            } else {
                icon = "icons/carIcon/26_180.png";
            }
            bIcon = new BMap.Icon(icon, new BMap.Size(28, 28));
        }
    }
    else if (course >= 202.5 && course < 247.5) //225
    {
        if (t == 1) {
            if (s == "Offline") {
                icon = "icons/carIcon/offline_27_225.png";
            } else {
                icon = "icons/carIcon/27_225.png";
            }
            bIcon = new BMap.Icon(icon, new BMap.Size(28, 28));
        } else if (t == 2) {
            icon = "icons/carIcon/2.png";
            bIcon = new BMap.Icon(icon, new BMap.Size(14, 18));
        } else if (t == 21) {
            if (s == "Offline") {
                icon = "icons/carIcon/offline_27_225.png";
            } else {
                icon = "icons/carIcon/21_225.png";
            }
            bIcon = new BMap.Icon(icon, new BMap.Size(28, 28));
        } else if (t == 22) {
            if (s == "Offline") {
                icon = "icons/carIcon/offline_22_225.png";
            } else {
                icon = "icons/carIcon/22_225.png";
            }
            bIcon = new BMap.Icon(icon, new BMap.Size(28, 28));
        } else if (t == 23) {
            if (s == "Offline") {
                icon = "icons/carIcon/offline_23_225.png";
            } else {
                icon = "icons/carIcon/23_225.png";
            }
            bIcon = new BMap.Icon(icon, new BMap.Size(24, 24));
        } else if (t == 24) {
            if (s == "Offline") {
                icon = "icons/carIcon/offline_24_225.png";
            } else {
                icon = "icons/carIcon/24_225.png";
            }
            bIcon = new BMap.Icon(icon, new BMap.Size(28, 28));
        } else if (t == 25) {
            if (s == "Offline") {
                icon = "icons/carIcon/offline_25_225.png";
            } else {
                icon = "icons/carIcon/25_225.png";
            }
            bIcon = new BMap.Icon(icon, new BMap.Size(28, 28));
        } else if (t == 26) {
            if (s == "Offline") {
                icon = "icons/carIcon/offline_26_225.png";
            } else {
                icon = "icons/carIcon/26_225.png";
            }
            bIcon = new BMap.Icon(icon, new BMap.Size(28, 28));
        }
    }
    else if (course >= 247.5 && course < 292.5) //270
    {
        if (t == 1) {
            if (s == "Offline") {
                icon = "icons/carIcon/offline_27_270.png";
            } else {
                icon = "icons/carIcon/27_270.png";
            }
            bIcon = new BMap.Icon(icon, new BMap.Size(28, 28));
        } else if (t == 2) {
            icon = "icons/carIcon/2.png";
            bIcon = new BMap.Icon(icon, new BMap.Size(14, 18));
        } else if (t == 21) {
            if (s == "Offline") {
                icon = "icons/carIcon/offline_27_270.png";
            } else {
                icon = "icons/carIcon/21_270.png";
            }
            bIcon = new BMap.Icon(icon, new BMap.Size(28, 28));
        } else if (t == 22) {
            if (s == "Offline") {
                icon = "icons/carIcon/offline_22_270.png";
            } else {
                icon = "icons/carIcon/22_270.png";
            }
            bIcon = new BMap.Icon(icon, new BMap.Size(28, 28));
        } else if (t == 23) {
            if (s == "Offline") {
                icon = "icons/carIcon/offline_23_270.png";
            } else {
                icon = "icons/carIcon/23_270.png";
            }
            bIcon = new BMap.Icon(icon, new BMap.Size(24, 24));
        } else if (t == 24) {
            if (s == "Offline") {
                icon = "icons/carIcon/offline_24_270.png";
            } else {
                icon = "icons/carIcon/24_270.png";
            }
            bIcon = new BMap.Icon(icon, new BMap.Size(28, 28));
        } else if (t == 25) {
            if (s == "Offline") {
                icon = "icons/carIcon/offline_25_270.png";
            } else {
                icon = "icons/carIcon/25_270.png";
            }
            bIcon = new BMap.Icon(icon, new BMap.Size(28, 28));
        } else if (t == 26) {
            if (s == "Offline") {
                icon = "icons/carIcon/offline_26_270.png";
            } else {
                icon = "icons/carIcon/26_270.png";
            }
            bIcon = new BMap.Icon(icon, new BMap.Size(28, 28));
        }
    }
    else if (course >= 292.5 && course < 337.5) //315
    {
        if (t == 1) {
            if (s == "Offline") {
                icon = "icons/carIcon/offline_27_315.png";
            } else {
                icon = "icons/carIcon/27_315.png";
            }
            bIcon = new BMap.Icon(icon, new BMap.Size(28, 28));
        } else if (t == 2) {
            icon = "icons/carIcon/2.png";
            bIcon = new BMap.Icon(icon, new BMap.Size(14, 18));
        } else if (t == 21) {
            if (s == "Offline") {
                icon = "icons/carIcon/offline_27_315.png";
            } else {
                icon = "icons/carIcon/21_315.png";
            }
            bIcon = new BMap.Icon(icon, new BMap.Size(28, 28));
        } else if (t == 22) {
            if (s == "Offline") {
                icon = "icons/carIcon/offline_22_315.png";
            } else {
                icon = "icons/carIcon/22_315.png";
            }
            bIcon = new BMap.Icon(icon, new BMap.Size(28, 28));
        } else if (t == 23) {
            if (s == "Offline") {
                icon = "icons/carIcon/offline_23_315.png";
            } else {
                icon = "icons/carIcon/23_315.png";
            }
            bIcon = new BMap.Icon(icon, new BMap.Size(24, 24));
        } else if (t == 24) {
            if (s == "Offline") {
                icon = "icons/carIcon/offline_24_315.png";
            } else {
                icon = "icons/carIcon/24_315.png";
            }
            bIcon = new BMap.Icon(icon, new BMap.Size(28, 28));
        } else if (t == 25) {
            if (s == "Offline") {
                icon = "icons/carIcon/offline_25_315.png";
            } else {
                icon = "icons/carIcon/25_315.png";
            }
            bIcon = new BMap.Icon(icon, new BMap.Size(28, 28));
        } else if (t == 26) {
            if (s == "Offline") {
                icon = "icons/carIcon/offline_26_315.png";
            } else {
                icon = "icons/carIcon/26_315.png";
            }
            bIcon = new BMap.Icon(icon, new BMap.Size(28, 28));
        }
    }
    else {

    }
    if (t == 30) {
        if (s == "Offline") {
            icon = "icons/carIcon/offline_30.png";
        } else {
            icon = "icons/carIcon/30.png";
        }
        bIcon = new BMap.Icon(icon, new BMap.Size(28, 28));
    } else if (t == 31) {
        if (s == "Offline") {
            icon = "icons/carIcon/offline_31.png";
        } else {
            icon = "icons/carIcon/31.png";
        }
        bIcon = new BMap.Icon(icon, new BMap.Size(28, 28));
    }

    return bIcon;
}

function MeterToKilometer(Meter)
{
    Meter = parseFloat(Meter);
    if (Meter < 1000) {
        return Meter.toFixed(2) + allPage.m;
    }
    return (Meter / 1000).toFixed(2) + allPage.km;
}

function MinuteToHour(mi,split) {
    try { 
        if (split != undefined && split != "") { 
            if (mi <= 0)
                return "1" + allPage.minute;
            if (mi <= 60) {
                return parseInt(mi) + allPage.minute;
            }
            var day = parseInt(mi / 60 / 24);
            var h = parseInt(mi / 60 % 24);
            var m = parseInt(mi % 60);
            mi = "";
            if (day > 0) {
                return day + allPage.day;
            }
            if (h > 0) {
                return h + allPage.hour;
            }
            if (m > 0) {
                return parseFloat(m) + allPage.minute;
            } 
        } 
        if (mi <= 0)
            return "1" + allPage.minute;
        if (mi <= 60) { 
            return parseInt(mi) + allPage.minute;
        } 
        var day = parseInt(mi / 60 / 24);
        var h = parseInt(mi / 60 % 24);
        var m = parseInt(mi % 60);
        mi = "";
        if (day > 0) {
            mi = day + allPage.day;
        } if (h > 0) {
            mi += h + allPage.hour;
        } if (m > 0) {
            mi += parseFloat(m) + allPage.minute;
        } 
        return mi;
    } catch (e) {
        console.log(e);
    }
}
//返回分钟数
function DateDiffMi(start, end) {
    try {
        start = start.replace(/-/g, '/');
        end = end.replace(/-/g, '/');
        var a = new Date(start);
        a = a.getTime();
        var b = new Date(end);
        b = b.getTime();
        var ticksspan = b - a;
        return ticksspan / 60 / 1000;  //返回分钟数

    } catch (e) {

    }
}
function DateDiff(start, end) {
    try {
        start = start.replace(/-/g, '/');
        end = end.replace(/-/g, '/');
        var a = new Date(start);
        a = a.getTime();
        var b = new Date(end);
        b = b.getTime();
        var ticksspan = b - a;
        //return ticksspan / 60 / 1000          //返回分钟数
        return ticksspan / 60 / 1000 / 24 / 60; //返回天
    } catch (e) {

    }
}
//获取当前时间
function GetCurrentDate() {
    var date = new Date(+new Date() + 8 * 3600 * 1000).toISOString().replace(/T/g, ' ').replace(/\.[\d]{3}Z/, '')
    return date;
}

/**
 ** 加法函数，用来得到精确的加法结果
 ** 说明：javascript的加法结果会有误差，在两个浮点数相加的时候会比较明显。这个函数返回较为精确的加法结果。
 ** 调用：accAdd(arg1,arg2)
 ** 返回值：arg1加上arg2的精确结果
 **/
function accAdd(arg1, arg2) {
    var r1, r2, m, c;
    try {
        r1 = arg1.toString().split(".")[1].length;
    }
    catch (e) {
        r1 = 0;
    }
    try {
        r2 = arg2.toString().split(".")[1].length;
    }
    catch (e) {
        r2 = 0;
    }
    c = Math.abs(r1 - r2);
    m = Math.pow(10, Math.max(r1, r2));
    if (c > 0) {
        var cm = Math.pow(10, c);
        if (r1 > r2) {
            arg1 = Number(arg1.toString().replace(".", ""));
            arg2 = Number(arg2.toString().replace(".", "")) * cm;
        } else {
            arg1 = Number(arg1.toString().replace(".", "")) * cm;
            arg2 = Number(arg2.toString().replace(".", ""));
        }
    } else {
        arg1 = Number(arg1.toString().replace(".", ""));
        arg2 = Number(arg2.toString().replace(".", ""));
    }
    return (arg1 + arg2) / m;
}

//给Number类型增加一个add方法，调用起来更加方便。
Number.prototype.add = function (arg) {
    return accAdd(arg, this);
};

/**
 ** 减法函数，用来得到精确的减法结果
 ** 说明：javascript的减法结果会有误差，在两个浮点数相减的时候会比较明显。这个函数返回较为精确的减法结果。
 ** 调用：accSub(arg1,arg2)
 ** 返回值：arg1加上arg2的精确结果
 **/
function accSub(arg1, arg2) {
    var r1, r2, m, n;
    try {
        r1 = arg1.toString().split(".")[1].length;
    }
    catch (e) {
        r1 = 0;
    }
    try {
        r2 = arg2.toString().split(".")[1].length;
    }
    catch (e) {
        r2 = 0;
    }
    m = Math.pow(10, Math.max(r1, r2)); //last modify by deeka //动态控制精度长度
    n = (r1 >= r2) ? r1 : r2;
    return ((arg1 * m - arg2 * m) / m).toFixed(n);
}

// 给Number类型增加一个mul方法，调用起来更加方便。
Number.prototype.sub = function (arg) {
    return accMul(arg, this);
};
 

