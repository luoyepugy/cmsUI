
$(function() {

    // 登录验证提示
    function signin_validate(selector, messages) {
        $('em.error').remove();
        selector.parent().append('<em class="error">' + messages + '</em>');
    }
    
    // 登录表单验证
    $('.jq-signinBtn').unbind('click').click(function() {
        var name = $('.jq-userName').val();
        var password = $('.jq-userPassword').val();
        var vcode = $('.jq-code').val();
        var remember = $('input[name="remember"]').prop('checked');
        var url = $('.jq-signinForm').attr('action');

        if(name == '') {
            signin_validate($('.jq-userName'), '请输入邮箱/手机号！');
        } else if(password == '') {
            signin_validate($('.jq-userPassword'), '请输入密码！');
        } else if(vcode == '') {
            signin_validate($('.jq-code'), '请输入验证码！');
        } else if(password.length < 6) {
            signin_validate($('.jq-userPassword'), '密码至少输入6位！');
        } else if(name.length < 4 || name.length > 20) {
            signin_validate($('.jq-userName'), '请输入4-20个字符！');
        } else {
            $.ajax({
                type: "POST", // 此处应用POST
                url: url,
                dataType: "json",
                data: {
                    "username": name,
                    "password": password,
                    "vcode": vcode,
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
    
    // 验证码可点击
    $('.loginImgCode').click(function(){
        $(this).attr('src', $(this).attr('src')+'&t='+ (new Date()).valueOf());
    });

    // 放映室鼠标悬停效果
    $('.jq-video-hover').hover(function() {
        $(this).find('.video_hover').fadeIn('400', function() { $(this).removeClass('none'); });
    }, function() {
        $(this).find('.video_hover').fadeOut('400', function() { $(this).addClass('none'); });
    });

       
    // 换一批初始化
    $.smite.common.init({button:'.jq-change',success:function(data){
        if(data.status==1){
            $('.portrait_sex').empty().html( data.data );
        }else if(data.status==254){
            alert('请登录！');
        }else{
            $.smite.tip({content:data.msg,icon:'error'});
        }
    }});

});