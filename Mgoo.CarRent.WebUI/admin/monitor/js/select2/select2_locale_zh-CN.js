/**
 * Select2 Chinese translation
 */
(function ($) {
    "use strict";
    $.fn.select2.locales['zh-CN'] = {
        formatNoMatches: function () { return "没有找到匹配�?; },
        formatInputTooShort: function (input, min) { var n = min - input.length; return "请再输入" + n + "个字�?;},
        formatInputTooLong: function (input, max) { var n = input.length - max; return "请删�? + n + "个字�?;},
        formatSelectionTooBig: function (limit) { return "你只能选择最�? + limit + "�?; },
        formatLoadMore: function (pageNumber) { return "加载结果中�?; },
        formatSearching: function () { return "搜索中�?; }
    };

    $.extend($.fn.select2.defaults, $.fn.select2.locales['zh-CN']);
})(jQuery);
