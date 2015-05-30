
$(function() {

	// 头像效果
    $('.jq-portrait').hover(function() {
        $(this).css('z-index', '2').next('div').removeClass('none');
    }, function() {
        $(this).css('z-index', '1').next('div').addClass('none');
    });
    $('.jq-card').hover(function() {
        $(this).prev('div').css('z-index', '2').end().removeClass('none');
    }, function() {
        $(this).prev('div').css('z-index', '2').end().addClass('none');
    });

    // 顶部导航交互
    $(document).scroll(function() {
    	var top_distance = $(document).scrollTop();
	    console.log(top_distance);
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
    $('.jq-tab-post li').click(function() {
        $(this).parent().find('li').toggleClass('tab_post_current gray_mid');
    });

    $('.jq-tab-orange span').click(function() {
        $(this).parent().find('span').toggleClass('orange');
    });


    // 左侧选项卡菜单点击
    // $('.jq-tabContent').find('ul:first').removeClass('none');
    // $('.jq-tabMenu li').click(function() {
    //     var index = $(this).index();
    //     $('.jq-tabMenu li').removeClass('tab_current');
    //     $(this).addClass('tab_current');
    //     $(this).closest('.jq-tabContent').find('ul').addClass('none');
    //     $(this).closest('.jq-tabContent').find('ul').eq(index).removeClass('none');
    // });

    function tabToggle(menu_selector, current_class) {
        $('.jq-tabContent').find('ul:first').removeClass('none');
        menu_selector.click(function() {
            var index = $(this).index();
            menu_selector.removeClass(current_class);
            $(this).addClass(current_class);
            $('.jq-tabContent').find('ul').addClass('none').eq(index).removeClass('none');
        });
    }

    tabToggle($('.jq-tabMenu-index li'), 'tab_current');
    tabToggle($('.jq-tabMenu li'), 'orange');

})