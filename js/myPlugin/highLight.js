
require.config({
    paths: {
        'jquery': '../plugins/jquery-1.9.1.min'
    }
});

define(['jquery'], function($) {

    // 高亮样式显示
    $.fn.highLight = function(options) {
        var options = $.extend({}, $.fn.highLight.defaults, options);
        return this.each(function() {
            var obj = $(this),
                o = options,
                items = $(o.childTag, obj);
            // 对象点击切换高亮元素
            items.on({
                click: function() {
                    items.removeClass(o.className);
                    $(this).addClass(o.className);
                }
            })
        });
    };

    // 默认参数设置
    $.fn.highLight.defaults = {
        className: 'current',
        childTag: 'li'
    };

});


// (function($) {

// 	// 高亮样式显示
//     $.fn.highLight = function(options) {
//         var options = $.extend({}, $.fn.highLight.defaults, options);
//         return this.each(function() {
//             var obj = $(this),
//                 o = options,
//                 items = $(o.childTag, obj);
//             // 对象点击切换高亮元素
//             items.on({
//                 click: function() {
//                     items.removeClass(o.className);
//                     $(this).addClass(o.className);
//                 }
//             })
//         });
//     };

// 	// 默认参数设置
//     $.fn.highLight.defaults = {
//         className: 'current',
//         childTag: 'li'
//     };

// })(jQuery);