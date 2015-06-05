
$(function() {

	$.validator.setDefaults({
        errorPlacement: function(error, element) { 
            element.closest('p').find('.jq-tip').remove();
            error.appendTo(element.closest('p').append()); 
        },
        onkeyup: false,
        onfocusout: false,
        onsubmit: true,
        errorElement: "em",
        submitHandler: function(form) { 
            form.submit();       
        }
    });


	// 基础设置表单验证
	$('.jq-setting').validate({
		rules: {
            "nickname": { 
                required: true,
                maxlength: 7
            }
        },
        messages: {
            "nickname": {
                required: "请输入昵称！",
                maxlength: "昵称必须少于8个字！"
            }
        }   
	});
   

    // 修改密码表单验证
	$('.jq-changePwd').validate({
		rules: {
            "old_password": { 
                required: true
            },
            "new_password": { 
                required: true,
                rangelength: [8, 16]
            },
            "check_password": { 
                required: true,
                equalTo: "#new_password"
            },
        },
        messages: {
            "old_password": {
                required: "请输入旧密码！"
            },
            "new_password": {
                required: "请输入新密码！",
                rangelength: "请输入8-16个字符!"
            },
            "check_password": {
                required: "请再次输入新密码！",
                equalTo: "两次密码输入不一致！"
            }
        }
	});


    // 账号注册表单验证
	$('.jq-register').validate({
		rules: {
            "user_name": { 
                required: true
            },
            "nickname": { 
                required: true,
                maxlength: 7
            },
            "password": { 
                required: true,
                minlength: 8
            },
            "check_password": { 
                required: true,
                equalTo: "#password"
            },
        },
        messages: {
            "user_name": {
                required: "请输入用户名！"
            },
            "nickname": {
                required: "请输入昵称！",
                maxlength: "昵称必须少于8个字！"
            },
            "password": {
                required: "请输入密码！",
                minlength: "密码必须至少8个字符！"
            },
            "check_password": {
                required: "请再次输入新密码！",
                equalTo: "两次密码输入不一致！"
            }
        }
	});


	// 重设密码表单验证
	$('.jq-resetPwd').validate({
		rules: {
            "new_password": { 
                required: true,
                rangelength: [8, 16]
            },
            "check_password": { 
                required: true,
                equalTo: "#new_password"
            }
        },
        messages: {
            "new_password": {
                required: "请输入新密码！",
                rangelength: "请输入8-16个字符!"
            },
            "check_password": {
                required: "请再次输入新密码！",
                equalTo: "两次密码输入不一致！"
            }
        }
	});

});