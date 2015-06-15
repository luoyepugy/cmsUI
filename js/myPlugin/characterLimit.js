
require.config({
    paths: {
        'jquery': '../plugins/jquery-1.9.1.min'
    }
});

define(['jquery'], function($) {

    // 字符长度限制
    $.fn.characterLimit = function(options) {
        var options = $.extend({}, defaults, options);
        return this.each(function() {
            var obj = $(this),
                o = options;
            if(obj.text().length > o.limitLength) {
                obj.text(obj.text().substr(0, o.limitLength) + '...');
            }
        });
    };

    // 默认参数设置
    $.fn.characterLimit.defaults = {
        limitLength: 25
    };

});

// (function($) {

//     // 字符长度限制
//     $.fn.characterLimit = function(options) {
//         var options = $.extend({}, defaults, options);
//         return this.each(function() {
//             var obj = $(this),
//                 o = options;
//             if(obj.text().length > o.limitLength) {
//                 obj.text(obj.text().substr(0, o.limitLength) + '...');
//             }
//         });
//     };

//     // 默认参数设置
//     $.fn.characterLimit.defaults = {
//         limitLength: 25
//     };

// })(jQuery);