
$(function() {

	// 头像效果
    $('.jq-portrait').hover(function() {
        $(this).next('.user_portrait_card').removeClass('none');
    }, function() {
        $(this).next('.user_portrait_card').addClass('none');
    });

})