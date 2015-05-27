
$(function() {

	// 头像效果
    $('.jq-portrait').hover(function() {
        $(this).css('z-index', '2').next('div').removeClass('none');
    }, function() {
        $(this).css('z-index', '1').next('div').addClass('none');
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
    

})