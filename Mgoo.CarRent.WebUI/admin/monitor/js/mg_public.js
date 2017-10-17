// 普通提示 toastr.info('Are you the 6 fingered man?');
// positionClass 属性有 toast-bottom-left toast-top-full-width toast-bottom-right等值
//警告提示  toastr.warning("Park gate sell they west hard for the.", null, opts_waming);
var opts_waming = {
    "closeButton": true,
    "debug": false,
    "positionClass": "toast-top-right",
    "onclick": null,
    "showDuration": "300",
    "hideDuration": "1000",
    "timeOut": "5000",
    "extendedTimeOut": "1000",
    "showEasing": "swing",
    "hideEasing": "linear",
    "showMethod": "fadeIn",
    "hideMethod": "fadeOut"
};
//错误提示toastr.error("Do to be agreeable conveying oh assurance. Wicket longer admire do barton vanity itself do in it. Preferred to sportsmen it engrossed listening.", "Fanny at wrong table ye in", opts_danger);
var opts_danger = {
    "closeButton": true,
    "debug": false,
    "positionClass": "toast-top-right",
    "onclick": null,
    "showDuration": "300",
    "hideDuration": "1000",
    "timeOut": "5000",
    "extendedTimeOut": "1000",
    "showEasing": "swing",
    "hideEasing": "linear",
    "showMethod": "fadeIn",
    "hideMethod": "fadeOut"
};
//成功提示 toastr.success("So me by marianne admitted speaking.", "This is a title", opts_success);
var opts_success = {
    "closeButton": true,
    "debug": false,
    "positionClass": "toast-top-right",
    "onclick": null,
    "showDuration": "300",
    "hideDuration": "1000",
    "timeOut": "5000",
    "extendedTimeOut": "1000",
    "showEasing": "swing",
    "hideEasing": "linear",
    "showMethod": "fadeIn",
    "hideMethod": "fadeOut"
};
function toastrMessage(type, message, title) { 
    switch (type) {
        case "opts_success":
            toastr.success(message, title, opts_success);
            break;
        case "opts_danger":
            toastr.error(message, title, opts_danger);
            break;
        case "opts_waming":
            toastr.warning(message, title, opts_waming);
            break;
    }
}
