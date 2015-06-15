
require.config({
    paths: {
        'jquery': '../plugins/jquery-1.9.1.min'
    }
});

define(['jquery'], function($) {

    // tab选项卡点击切换不同内容
    $.fn.tabToggle = function(options) {
        var options = $.extend({}, $.fn.tabToggle.defaults, options);
        return this.each(function() {
            var obj = $(this),
                o = options,
                items = $(o.tabMenu_childTag, obj);
            // $(o.tabContent).addClass('none'); // 先将所有选项卡内容块隐藏
            $(o.tabWrap).find(o.tabContent + ':first').removeClass('none'); // 再将所有第一个选项卡内容块隐藏
            items.on({
                click: function() {
                    var index = $(this).index();
                    items.removeClass(o.tabMenuClass);
                    $(this).addClass(o.tabMenuClass);
                    $(this).closest(o.tabWrap).find(o.tabContent).addClass('none').eq(index).removeClass('none');
                }
            });

        });
    };

    // 默认参数设置
    $.fn.tabToggle.defaults = {
        tabMenuClass: 'tab_current',
        tabMenu_childTag: 'li',
        tabContent: '.jq-tabContent',
        tabWrap: '.jq-tabWrap'
    };

});

// (function($) {

//     // tab选项卡点击切换不同内容
//     $.fn.tabToggle = function(options) {
//         var options = $.extend({}, $.fn.tabToggle.defaults, options);
//         return this.each(function() {
//             var obj = $(this),
//                 o = options,
//                 items = $(o.tabMenu_childTag, obj);
//             // $(o.tabContent).addClass('none'); // 先将所有选项卡内容块隐藏
//             $(o.tabWrap).find(o.tabContent + ':first').removeClass('none'); // 再将所有第一个选项卡内容块隐藏
//             items.on({
//                 click: function() {
//                     var index = $(this).index();
//                     items.removeClass(o.tabMenuClass);
//                     $(this).addClass(o.tabMenuClass);
//                     $(this).closest(o.tabWrap).find(o.tabContent).addClass('none').eq(index).removeClass('none');
//                 }
//             });

//         });
//     };

//     // 默认参数设置
//     $.fn.tabToggle.defaults = {
//         tabMenuClass: 'tab_current',
//         tabMenu_childTag: 'li',
//         tabContent: '.jq-tabContent',
//         tabWrap: '.jq-tabWrap'
//     };

// })(jQuery);