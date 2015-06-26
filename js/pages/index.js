
$(function() {

    // 放映室鼠标悬停效果
    $('.jq-video-hover').hover(function() {
        $(this).find('.video_hover').fadeIn('400', function() { $(this).removeClass('none'); });
    }, function() {
        $(this).find('.video_hover').fadeOut('400', function() { $(this).addClass('none'); });
    });


});