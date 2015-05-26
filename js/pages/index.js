
$(function() {

    // 登录表单验证
    $('.jq-signin').validate({
        ignore: "",
        rules: {
            "user_name": {
                required: true
            },
            "user_password": {
                required: true
            },
            "verification_code": {
                required: true
            }
        },
        messages: {
            "user_name": {
                required: "请输入用户名/邮箱！"
            },
            "user_password": {
                required: "请输入密码！"
            },
            "verification_code": {
                required: "请输入验证码！"
            }
        },
        errorPlacement: function(error, element) { 
            error.appendTo(element.parent('p')); 
        },
        errorElement: "em",
        onkeyup: true,
        submitHandler: function(form) {  
            form.submit();
        }
    });
    
    // 推荐关注的人
    $('.jq-user').hover(function() {

    }, function() {

    });

    // 放映室鼠标悬停效果
    $('.jq-video-hover').hover(function() {
        $(this).find('.video_hover').fadeIn('400', function() { $(this).removeClass('none'); });
    }, function() {
        $(this).find('.video_hover').fadeOut('400', function() { $(this).addClass('none'); });
    });

});