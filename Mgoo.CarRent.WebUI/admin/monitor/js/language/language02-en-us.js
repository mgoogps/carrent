function writePage(msg) {
    //英語
    document.write(msg);
}

var allPage = { tab1: "Moving Overview", tab2: "Alarm Overview", tab3: "Device Statistics", tab4: "Alarm Details", startTime: "From", endTime: "To", search: "Search", num: "No.", deviceName: "Target Name",
    time: "Time", distance: "Mileage (km)", overspeed: "Overspeed", noData: "No data!", lat: "Lat", lng: "Lon", speed: "Speed", address: "Address", speedKM: "km/h", day: "Day", hour: "Hour",
    minute: "Minutes", pleSel: "Please select", date: "Date", plsDeviceMsg: "Please select the target",   moreDevice: "More", msg: "Message", myAccount: "My account", changePass: "Change password",
    tracking: "Tracking", playback: "Playback", monitor: "Monitor", home: "Home", customer: "Customer", report: "Statistics", more: "More",  no: "No.", name: "Name", carNum: "License Plate No.",
    imeiNo: "IMEI No.", activeTime: "Activation time", hireExpireTime: "Expired Time", operation: "Operate",   edit: "Edit", divicesInfo: "Device information", cellName: "Contacts",
    phone: "Tel/Mob", timezone: "Timezone", save: "Save", confirm: "Confirm", updateUserSuccess: "Edit successfully!", updateUserFailed: "Edit failure!", modelName: "Type", state: "Status",
    drection: "Direction", baidu: "Baidu", google: "Google", day: "Day", hour: "Hour", minute: "Minute", stopTime: "Stop time", desc: "Remark", cancel: "Cancel", del: "Delete", delSuccess: "Delete successfully!",
    delFaild: "Delete failure!", accStr: "ACC status", acc0: "Off", acc1: "On", positionType: "Position Type", manDevice: "Device management", type: "Type", acc2: "Unconnected", clear: "Clear", positionTime: "Position time",
    targetName: "Target Name", primaryEmail: "Email", resolve: "Resolve", startStopTime: "Start", endStopTime: "End", status1: "Logged Off", moving: "Moving", stopCar: "Stop",  arrears: "overdue",
    toExcel: "To Excel", distance2: "Mileage", km: "km", m: "M", event: "Event recording", inTime: "Enter time", outTime: "Departure time", moneyCount: "Point",  belongTo: "Membership", updateTime: "Update Time",
    userInfo: " Customer Information ", userType2: "Distributor", changePassword: " Change Password", service: "My Service", clearAll: "Clear all",

    deviceNo: "IMEI Number",   exit: " Exit ",
    selSizeStr: "Check", sizeStr: "records",    device: "Target", purchase: "Purchase ", stock: "Stock",
    mobileWebsite: "Access by mobile", simNo: "SIM Card NO.", expireTime: "Due to",     deviceInfo: "Device Information", 
    dataError: "Data Error!", softFailed: "Error!", password: " Password ",  
    searchNull: "IMEI/Name/Car NO./Name/Account is required!", initPass: "Reset Pwd" , loginAccount: "Login Account", passLengthMsg: " Password must be less than 20 digits ",   userType1: "End User",
     add: "New", information: "Information", deviceType: "Type",  kmHour: "Km/h", devicePhone: "SIM Card NO.",  
    createTime: "Create Time",   deletes: "Delete", cusName: "Customer name",   plsSelUser: "Please select a user!",
     plsSel: "Select", all: "All", online: "Online ", offline: "Offline ", speedLimit: " Speed Limit ",  
    allDistance: "Total mileage",  edit2: "Edit", type2: "Roles",
    deliveryTime: " Activation Time ", cellPhone: "Tel/Mob", view: "View", deviceHireDay: "the points to charge", myDevice: "My Device", StatisticalAnalysis: "Statistical analysis"
};

//Dealer.aspx
var dealerPage = {
    warnTitle: "Alarm Remind", warnSound: "Alarm sound on", username: "Customer Name/Account", hello: "Hello", changePassword: " Change Password", searchDevice: "Target", searchUser: "Customer",
    searchDevice2: "TargetCheck", searchUser2: "CustomerCheck", name: "Name of Customer", belongTo: "Membership", sim: "SIM Card NO.", activeTime: "Activation date", customerName: "Customer name", nowSearch: "Searching...", name2: "Name of Customer",
    name3: "Target Name"
};

//Home.aspx
var homePage = {
    quickSearch: "Search", searchTxt: "IMEI NO./T/Car No.", stage: "Stage", deviceCount: "Target Count", operations: "More", novice: " newbie", quickSale: " Quick Sale ",
    batchSale: " Batch Sale", customer: "Customer", sale: "Sale", customerList: " customer List ", addDevice: "Additional", add: "+new", imeiNullMsg: "Please select the target!", expireTimeNullMsg: "Please select the expired date!",
    saleSuccess: " Success!"
};

var courseName = { dueNorth: "North", northeast: " Northeast ", dueEast: "East", southeast: " Southeast", dueSouth: "South", southwest: "Southwest", dueWest: "West", northwest: "Northwest " };

var reportPage = { title: "Total Moving Statistics", warnCount: "Alarm", stopCount: "Stay" };

var alarmSumPage = { title: "Total Alarm Statistics", lowCount: "Low Battery alarm", cutPowerCount: "Cut-off alarm", vibCount: "Vibration alarm", sosCount: "SOS alarm" }

var overSpeedPage = { continueTime: "Continue Time", speedlimit: "Speed Limit", distancePage: "Mileage Report", overspeedDetail: "Overspeed Details", stopDetail: "Stop Details" };

var alarmIndexPage = { geofenceIn: "Geo-fence In", geofenceOut: "Geo-fence Out", moved: "Displacement", lowBattery: "Low battery Alarm", sos: "SOS Alarm", cutPower: "Cut-off Alarm", vibration: "Vibration Alarm",
    overSpeed: "OverSpeed", offline: "Offline"
};

var runindexPage = { statistics: "Query By", statistics2: "Daily Details", oilCoefficient: "Fuel Consumption Coefficient/100 Kilometers", L: "L", oil: "Fuel Consumption" };

var alarmDetailPage = { alarmTime: "Alarm Time", alarmType: "Alarm Type", alarmCount: "Alarm Statistics", alarmDetail: "Alarm Details" };

var userPage = { warnTitle: "Alarm Overview", warnSound: "Alarm sound on", day7Exp: "7Days Expired", day60Exp: "60Days Expired", alreadyExp: "Expired",
    username: "Name/Account", hello: "Hello", searchDevice: "Target", searchUser: "Customer", exit: "Exit", message: "Message", allDeivce: "All Target", moneyMove: "points for sale", moneyHistory: "points consumer records"
};

var userInfoPage = { myAccount: "My account", changePassword: "Change Password ", userMsg: " Tip: Complete information such as telephone number, contact.", customerName: " Customer Name ",
    account: "Login Account", oldPass: "Existed password", newPass: "New password", confirmPass: "Password Confirmation", passLengthMsg: " Password must be less than 20 digits ", passNull: "Password input cannot be blank!",
    passError: "The two passwords input are different!", changePassSuccess: "Password reset successfully!", changePassError: "Password reset failure!", oldPassError: "Old password error!",
    warnSendMsg: "Additional Alarm Inform Mode", sendEmail: "Email", service: "My Service"
};

var warnMessagePage = { warnMsg: "Alarm message", handle1: "Undealed ", handle2: " handled ", alarmType: "Alarm Type", alarmTime: "Alarm Time" };

var trackingPage = { secondMsg: "Refresh after seconds!" };

var playbackPage = { from: "From", to: "To", play: "Play", pause: "Pause", next: "Continue", fast: "Fast", slow: "Slow", timeMsg: "End Time should be later than Start Time!", nowLoading: "Loading data!",
    playOver: "Finish!", searchNull: "No data!", showLBS: "Show LBS"
};

var geofencesPage = { geofence: " Geo-fence ", addGeofence: "Add", geoNameNull: "Geo-fence name cannot be blank!", radius: "R(m)", delGeoConfirm: "Confirm to delete", delGeoConfirm2: "Is this Geo-fence?" ,
    addSuccess: "Add Success!", addFaild: "Add Failed!"
};

var iframeMapPage = { baiduMap: "Baidu Map", googleMap: "Google Map", deviceName: "Target name" };

var userUpdatePage = { account: "Account" };

//map.aspx
var mapPage = { searchInput: "Please input name/IMEI No.", divicesInfo: "Target Info", geofence: "Geo-fence", cutOffPetrol: "Cut off Petrol", restorePetrol: "Restore Petrol ", checkLocation: " Check Location ", checkCommand: " Check Command ",
    sendConfirm: "Please confirm the account before sending command", passNull: "Please input password!", passError: "Password Error!", sendMsg1: "Sending message, please wait…", sendSuccess: "Success! Please wait for response...",
    sendMsg2: "Command null", sendMsg3: "Target not exist ", sendMsg4: "Please make device online first.", sendMsg5: "Send command successfully", responseSuccess: " Respond Successfully!", responseNull: " Response Null!",
    checkLocatoin: " Check Location ", checkCommandTitle: "Check Command", cmdType: "Command Type", cmdState: "Command Status", responseText: "Response Message", responseTime: " Response Time ", sendTime: "Send Time",
    dyd: "Cut off Petrol", hfyd: " Restore Petrol ", deviceResponse: "Device Response", sendSuccess2: "Command has been sent!", noSend: "Command has not been sent", deviceDetailList: " Device Detail List ", addGroup: "Add Group",
    defaultGroup: "Default", moveToGroup: "Group Move", delGroupConfirm: "Delete Confirmation?", downloadLocation: "Tracking Report", deviceFortify: "GPS Fortify", deviceDismiss: "GPS Dismiss", accOn: "ACC ON", accOff: "ACC OFF", fortify: "ARM", dismiss: "DimARM", carOpen: "Door Open", carClose: "Door Close", zdlj: "engine connect", zddk: "engine cut",
    obdChecking: "OBD check", uploadTime: "upload interval", setQinqing: "Set family number", setSOS: "Set SOS number", setZhukong: "Set master number", setPassword: "change password", setAutoFortify: "Auto ARM ON",
    setAutoFortifyClose: "Auto ARM OFF", setCutFortifyAuto: "external power cut engine, auto ARM ON", setCutFortifyAutoClose: "external power cut engine, auto ARM Off", setVIBTime: "Set Shake alarm timespan", setVIBLmd: "Set Shake Sensitivity", setSOSType: "SOS alarm",
    setWeiyiWarn: "Set Move Alarm", setOverspeed: "Set OverSpeed alarm", setSMSGPRS: "SMS/GPRS mode", setJianting: "Monitor", setYccq: "Remote Reboot", setHfcc: "factory reset", setLanguage: "Set language",
    setTimezone: "Set time zone", setXiumian: "Set Sleep Model", setJiantingType: "monitor mode", setDingweiType: "positioning mode", setParam: "data check", setAutoFortifyTime: "Auto ARM time", setAutoDismissTime: "Auto DisARM time",
    setUploadMoveTime: "Move upload frequency", setUploadStopTime: "Rest upload frequency", setYcqd: "remote start", setYcxh: "remote shut down", setGeofence: "GEO-Fence", setOBDUploadTime: "OBD upload interval",
    setOBDCMD: "OBD upload command", setOBDGg: "OBD upload advertisement", setDeviceUploadTime: "Set upload interval", danwei5s: "unit:second, min: 5seconds", obdTab1: "vehicle state", obdTab2: "History data", obdTab3: "OBD command",
    inputCmdStr: "Input command", inputGgStr: "Input advertisement", secondsMsg1: "Interval cann't less than 5 seconds!", secondsMsg2: "Interval cann't more than 9999 seconds!", startTime: "start time", endTime: "end time",
    pidCount: "Fault quantity", pidStr: "Fault description", noGuzhang: "No faults", deetail: "Detail", obdDataTime: "Data Time", obdFdjfh: "engine load", obdFdjsw: "engine coolant temperature", obdDsryxz: "Short time fuel correction",
    obdCsryxz: "Long time fuel correction", obdJqqgjdyl: "manifold absolute pressure", obdFdjzs: "engine speed", obdClsd: "vehicle speed", obdQgdhtqj: "No. 1 cylinder ignition advance Angle", obdJqwd: "air inlet temperature", obdKqll: "Air flow", obdJqmjdwz: "Throttle absolute position",
    obdMILGzd: "Drive distance after MIL (trouble light) on", obdRylsr: "Fuel Qty input", obdDqyl: "barometric pressure", obdKzmkdy: "control module Voltage", obdSsyh: "instantaneous fuel consumption", obdMl: "horsepower", obdZlc: "total distance", obdBglyh: "fuel consumption per hundred kilometers",
    obdDpdy: "Battery voltage", obdGzdm: "Fault code"
};

var mapPage2 = { searchInput: "Please input name/IMEI No.", divicesInfo: "Target Info", geofence: "Geo-fence", cutOffPetrol: "Cut off Petrol", restorePetrol: "Restore Petrol ", checkLocation: " Check Location ", checkCommand: " Check Command ",
    sendConfirm: "Please confirm the account before sending command", passNull: "Please input password!", passError: "Password Error!", sendMsg1: "Sending message, please wait…", sendSuccess: "Success! Please wait for response...",
    sendMsg2: "Command null", sendMsg3: "Target not exist ", sendMsg4: "Please make device online first.", sendMsg5: "Send command successfully", responseSuccess: " Respond Successfully!", responseNull: " Response Null!",
    checkLocatoin: " Check Location ", checkCommandTitle: "Check Command", cmdType: "Command Type", cmdState: "Command Status", responseText: "Response Message", responseTime: " Response Time ", sendTime: "Send Time",
    dyd: "Cut off Petrol", hfyd: " Restore Petrol ", deviceResponse: "Device Response", sendSuccess2: "Command has been sent!", noSend: "Command has not been sent", deviceDetailList: " Device Detail List ", addGroup: "Add Group",
    defaultGroup: "Default", moveToGroup: "Group Move", delGroupConfirm: "Delete Confirmation?", downloadLocation: "Tracking Report", deviceFortify: "GPS Fortify", deviceDismiss: "GPS Dismiss", accOn: "ACC ON", accOff: "ACC OFF", fortify: "ARM", dismiss: "DimARM", carOpen: "Door Open", carClose: "Door Close", zdlj: "engine connect", zddk: "engine cut",
    obdChecking: "OBD check", uploadTime: "upload interval", setQinqing: "Set family number", setSOS: "Set SOS number", setZhukong: "Set master number", setPassword: "change password", setAutoFortify: "Auto ARM ON",
    setAutoFortifyClose: "Auto ARM OFF", setCutFortifyAuto: "external power cut engine, auto ARM ON", setCutFortifyAutoClose: "external power cut engine, auto ARM Off", setVIBTime: "Set Shake alarm timespan", setVIBLmd: "Set Shake Sensitivity", setSOSType: "SOS alarm",
    setWeiyiWarn: "Set Move Alarm", setOverspeed: "Set OverSpeed alarm", setSMSGPRS: "SMS/GPRS mode", setJianting: "Monitor", setYccq: "Remote Reboot", setHfcc: "factory reset", setLanguage: "Set language",
    setTimezone: "Set time zone", setXiumian: "Set Sleep Model", setJiantingType: "monitor mode", setDingweiType: "positioning mode", setParam: "data check", setAutoFortifyTime: "Auto ARM time", setAutoDismissTime: "Auto DisARM time",
    setUploadMoveTime: "Move upload frequency", setUploadStopTime: "Rest upload frequency", setYcqd: "remote start", setYcxh: "remote shut down", setGeofence: "GEO-Fence", setOBDUploadTime: "OBD upload interval",
    setOBDCMD: "OBD upload command", setOBDGg: "OBD upload advertisement", setDeviceUploadTime: "Set upload interval", danwei5s: "unit:second, min: 5seconds", obdTab1: "vehicle state", obdTab2: "History data", obdTab3: "OBD command",
    inputCmdStr: "Input command", inputGgStr: "Input advertisement", secondsMsg1: "Interval cann't less than 5 seconds!", secondsMsg2: "Interval cann't more than 9999 seconds!", startTime: "start time", endTime: "end time",
    pidCount: "Fault quantity", pidStr: "Fault description", noGuzhang: "No faults", deetail: "Detail", obdDataTime: "Data Time", obdFdjfh: "engine load", obdFdjsw: "engine coolant temperature", obdDsryxz: "Short time fuel correction",
    obdCsryxz: "Long time fuel correction", obdJqqgjdyl: "manifold absolute pressure", obdFdjzs: "engine speed", obdClsd: "vehicle speed", obdQgdhtqj: "No. 1 cylinder ignition advance Angle", obdJqwd: "air inlet temperature", obdKqll: "Air flow", obdJqmjdwz: "Throttle absolute position",
    obdMILGzd: "Drive distance after MIL (trouble light) on", obdRylsr: "Fuel Qty input", obdDqyl: "barometric pressure", obdKzmkdy: "control module Voltage", obdSsyh: "instantaneous fuel consumption", obdMl: "horsepower", obdZlc: "total distance", obdBglyh: "fuel consumption per hundred kilometers",
    obdDpdy: "Battery voltage", obdGzdm: "Fault code"
};

var downloadLocation = { download: "Download", help: "Help", step: "Steps", step1: "1.Select the Targets.", step2: "2.Enter date.", step3: "3.Click 'Download'.",
    msg1: "Note：If you get a 'No Data!' That means there is no valid data for your tracker in this certain period.", msg2: "Tracking download format is Google KML, e.g.:'file name.kml'. ",
    msg3: "Double click KML file to open it after installing Google Earth", msg4: "KML Track File will display the track with dynamical red line on google maps .", msg5: "Tips:Download Google Earth Click", here: "here",
    msg6: "You can download the track file for a certain period through the function 'download Track file'。Type of track file 'KML Track File' AND 'KML Anchor File'"
};

var cusPage = { updateExpTime: "Update Expired Time", updateError: "Edit failure!" };

var moneyPage = { moveToAccount: "the login account to transfer into", moveToUser: "the username to transfer into", moveCount: "the points to transfer into", check: "detect", noLoginName: "this name does not exist!", inputLoginNameIn: "please test the login name!",
    inputLoginNameOut: "please test the login name!", noMoveSelf: "can not transfer to oneself!", moneyLack: "the point is not enough!", moneyError: "fail to transfer!", moveSuccess: "transfer the points successfully, the current points is:", inputMoneyMsg: "please input the points!",
    uToUser: "for the user", money: "point", user: "user", moveMoneyMsg1: "the points been transferred ", give: "for", moneyMsg2: "charge for the device, the total points used", day: "day", msg1: "1 point for 1 day", oneYeah: "one year", twoYeah: "two years",
    lifelong: "lifelong", msg2: "Extend the maturity time", msg3: "the device is charged successfully!", msg4: "the points is not enough, please charge!!", msg5: "days must be greater then 0!", pointManagement: "points management"
};
var productUpdatePage = { oilCoefficient: "Fuel/100km", updateIcon: "Icon", carNumMsg1: "Car NO. is too long!", sccuess: "Update Success!", faild: "Update Failed!", isExistMsg: "Car NO. has existed， pls try another!", filterLBS: "filter LBS", photo: "Photo" };


var yiwen201405 = { fsManger: "4S management", battery: "Battery Level", realCar: "Real-time Vehicle Condition", obdData: "OBD Record", oilInfo: "Fuel Information", carBaoyang: "Vehicle Maintenance", carBaoyangSet: "Mileage Maintenance Set",
    carBaoxian: "Vehicle Insurance", carNianshen: "Vehicle Annual Inspection", userData: "User Data", maintainCar: "Maintain Vehicle", fsSet: "4S store set up", baoyangData: "Maintenance data input", baoyangItem: "Maintenance items",
    baoyangPrice: "Maintenance price", baoyangDate: "Maintenance date", maintenanceofmiles: "Maintenance of miles(km)", repairShop: "Repair shop", notes: "Notes", fuelInput: "Fuel charge data input", restFuel: "Rest fuel capacity (Liter)",
    lastrefuel: "Last refuel mileage (km)", fuelMsg: "Total mileage at this refuel time minus the total mileage last refuel time", automatic: "Automatic calculation", fuelDate: "Refuel time", oilLabel: "Oil label",
    refuelLiter: "Refuel(Liter)", unitPrice: "Unit price/liter ", refuelAddress: "Refuel address", fsInfoSet: "4S store information set up", fsName: "4S store name", fsZuchePhone: "4S car rental service call", fsSalePhone: "4S second-hand car sales call",
    fsSOSPhone: "4S rescue call", fsDaijiaPhone: "4S designated driver call", fsBaoxianPhone: "4S risk call", fsUsername: "4S store contact person", fsPhone: "Contact phone number", fsCarSalePhone: "Sales line", fsServicePhone: "Server line",
    location: "Location", about: "About", carByInterval: "Vehicle maintenance interval tip Settings", byIntervalMileage: "Maintenance interval mileage", byLastMileage: "Mileage when platform remind last time", byMsg2: "Device on “no-enabled” status on platform, total mileage setting invalid",
    byMsg3: "Tips: old car need to transfer on platform, or does not maintain with stipulated mileage, or with wrong data, can correct it Manually by “mileage when platform remind last time ”and “Total  mileage”", byMsg4: "Maintenance reminder interval must over 500km!", dayDistance: "Day mileage",
    dayOil: "Day mileage", baoxianCompany: "Insurance company", baoxianNo: "Car insurance policy number", baoxianStart: "Policy effective date", baoxianEnd: "Policy due date", baoxianUsername: "Insurance adjuster's name", baoxianUserPhone: "Insurance adjuster's tel number",
    baoxianDetail: "Policy details", baoxianDesc: "Policy other instruction", displayType: "Display method", detailList: "Detailed list", dailyCount: "Daily count", monthlyCount: "Monthly count", yearlyCount: "Yearly count",
    nianshenDate: "Annual inspection time", nextNianshenDate: "Next annual inspection time", addRefuel: "Add new refuel record", baoyangList: "List of vehicle need Maintenance", byMsg6: "Show Vehicle to next maintenance within 500 kilometers", msg1: "Please fill item mark “*”",
    baoyangMsg7: "Are you sure to delete this maintenance information?", baoyangAllPrice: "Maintenance total value", lastRest: "Last rest (L)", userL: "The use of(L)", moveDistance: "Mileage ", oilMsg1: "Average fuel consumption/100KM (liters)",
    kilometerPrice: "Cost per kilometer", oilMsg2: "Input date", baoyangInterval: "Maintenance interval Mileage (KM)", lastBaoyang: "Last remind Mileage (km)", nextBaoyang: "Next Maintenance Mileage (km)", nowDistance: "Get now distance", addBaoyang: "Add new maintenance record", luruDate: "Input date",
    price: "Price"
};

var yiwen201407 = { singleMileage: "single mileage", fuel_consumption: "one way fuel consumption", engineSpeed: "one way engine speed", max_speed: "one way max speed", hard_acceleration_times: "hard acceleration times",
    engine_running_time: "engine running time", distance_after_fault_lights: "driving distance after fault lights", fuel_level: "fuel level", single_idle_fuel_consumption2: "single idle fuel consumption",
    average_fuel_consumption: "average fuel consumption", fuel_consumption: "total fuel consumption", mileage_after_install: "mileage after install", hot_start_time: "hot start time", the_current_speed: "hunderd fuel under the current speed",
    singel_driving_time: "singel driving time", singel_idle_time: "singel idle time", resolved_failure_code: "Uncertain fault code", Unresolved_failure_code: "identified failure code", second: "seconds", times: "times", examRecord: "Exam record"
};