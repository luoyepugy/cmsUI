
$(function() {

    // 头像效果
    $('.jq-portrait').hover(function() {
        $('.loading').remove();
        $(this).css('z-index', '2').next('div').removeClass('none');
        $(this).next('.jq-card').append('<p class="loading"><img src="images/loading.gif" /></p>');
    }, function() {
        $(this).css('z-index', '1').next('div').addClass('none');
    });
    $('.jq-card').hover(function() {
        $(this).prev('div').css('z-index', '2').end().removeClass('none');
    }, function() {
        $(this).prev('div').css('z-index', '1').end().addClass('none');
    });


    // 顶部导航交互
    $(document).scroll(function() {
        var top_distance = $(document).scrollTop();
        if(top_distance > 54) {
            $('.jq-top-nav').addClass('fixed_top_nav');
        } else {
            $('.jq-top-nav').removeClass('fixed_top_nav');
        }
    });


    // 字符限制
    function characterLimit (selector, len) {
        selector.each(function() {
            var text = $(this).text();
            if(text.length > len) {
                $(this).text(text.substr(0, len) + '...');
            }
        });
    }
    characterLimit($('.jq-elimit25'), 25);
    characterLimit($('.jq-elimit35'), 35);
    characterLimit($('.jq-elimit45'), 45);
    

    // 水平选项卡点击后样式变化
    $('.jq-tab-post a').click(function() {
        $(this).parent().find('a').toggleClass('tab_post_current gray_mid');
    });

    $('.jq-tab-orange a').click(function() {
        $(this).parent().find('a').toggleClass('orange');
    });

    // 用户协议右侧锚点链接
    $('.jq-anchor a').click(function() {
        $('.jq-anchor a').removeClass('current');
        $(this).addClass('current');
    });


    // tab选项卡点击切换不同内容
    function tabToggle(menu_selector, current_class) {
        $('.jq-tabWrap').find('.jq-tabContent:first').removeClass('none');
        menu_selector.click(function() {
            var index = $(this).index();
            menu_selector.removeClass(current_class);
            $(this).addClass(current_class);
            $(this).closest('.jq-tabWrap').find('.jq-tabContent').addClass('none').eq(index).removeClass('none');
        });
    }
    tabToggle($('.jq-tabMenu-index li'), 'tab_current');
    tabToggle($('.jq-tabMenu a'), 'orange');
    tabToggle($('.jq-tabMenu-video a'), 'tab_post_current');

    // 快速评论按钮
    $('.jq-commentBtn').click(function() {
        $(this).parent().next('.jq-comment').remove();
        $(this).parent().after($('.jq-commentInput').html());
        $(this).parent().next('.jq-comment').removeClass('none');
    });
    // 确认评论
    $('.jq-commentWrap').on('click', '.jq-confirmComment', function() {
        $(this).closest('.jq-comment').remove();
        var commentText = $(this).closest('.jq-comment').find('textarea').val();
    });
    // 取消评论
    $('.jq-commentWrap').on('click', '.jq-cancelComment', function() {
        $(this).closest('.jq-comment').remove();
    });


    // 顶部导航菜单
    $('.jq-userMenu, .user_menu').hover(function() {
        $('.user_menu').removeClass('none');
        $('.jq-userMenu').addClass('user_attach_hover')
    }, function() {
        $('.user_menu').addClass('none');
        $('.jq-userMenu').removeClass('user_attach_hover')
    });

})