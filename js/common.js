
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
})