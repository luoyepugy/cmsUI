


$(function() {

    // 登录验证提示
    function signin_validate(selector, messages) {
        $('em.error').remove();
        selector.parent().append('<em class="error">' + messages + '</em>');
    }
 
    // 登录表单验证
    $('.jq-signinBtn').click(function() {
        var user_name = $('.jq-userName').val();
        var user_password = $('.jq-userPassword').val();
        var verification_code = $('.jq-code').val();
        var remember = $('input[name="remember"]').prop('checked');
        $('em.error').remove();
        if(user_name == '') {
            signin_validate($('.jq-userName'), '请输入邮箱/手机号！');
        } else if(user_password == '') {
            signin_validate($('.jq-userPassword'), '请输入密码！');
        } else if(verification_code == '') {
            signin_validate($('.jq-code'), '请输入验证码！');
        } else if(user_password.length < 6) {
            signin_validate($('.jq-userPassword'), '密码至少输入6位！');
        } else {
            $.ajax({
                type: "GET", // 此处应用POST
                url: "a",
                dataType: "json",
                data: {
                    "user_name": user_name,
                    "user_password": user_password,
                    "verification_code": verification_code,
                    "remember": remember
                },
                success: function (data) {
                    if(data.status == 1) {         
                        window.location.href = data.url;
                    } else if(data.status == 0) {
                        signin_validate($('.jq-code'), data.msg);
                    }        
                },
                error: function() {
                    signin_validate($('.jq-code'), '加载数据错误！');
                }
            });
        }
    });

    // 放映室鼠标悬停效果
    $('.jq-video-hover').hover(function() {
        $(this).find('.video_hover').fadeIn('400', function() { $(this).removeClass('none'); });
    }, function() {
        $(this).find('.video_hover').fadeOut('400', function() { $(this).addClass('none'); });
    });


    // 换一批
    $('.jq-change').click(function() {
        var url = $(this).data('uri');
        $.ajax({
            type: "POST", // 此处应用POST
            url: url,
            dataType: "json",
            success: function (data) {
                if(data.status == 1) {         
                    $('.portrait_sex').empty().html(data.data);
                } else if(data.status == 0) {
                    alert(data.msg);
                } else if(data.status == 254) {
                    alert('请登录！');
                }       
            },
            error: function() {
                signin_validate($('.jq-code'), '加载数据错误！');
            }
        });
    })

});