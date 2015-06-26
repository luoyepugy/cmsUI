
$(function() {

    function getByteLen(val) {
        var len = 0;
        for (var i = 0; i < val.length; i++) {
             var a = val.charAt(i);
             if (a.match(/[^\x00-\xff]/ig) != null) 
            {
                len += 2;
            }
            else
            {
                len += 1;
            }
        }
        return len;
    }

    $.validator.addMethod('lengthLimit8', function(value, element) {
        return getByteLen(value) < 16 ? true : false;
    }, '昵称必须少于8个字!');

    $.validator.addMethod('lengthLimit15', function(value, element) {
        return getByteLen(value) < 30 ? true : false;
    }, '昵称必须少于15个字!');


	$.validator.setDefaults({
        errorPlacement: function(error, element) { 
            var element = element.closest('p.p').length > 0 ? element.closest('p.p') : element.closest('div.p');
            element.find('.jq-tip').remove();
            error.appendTo(element.append()); 
        },
        onkeyup: false,
        onfocusout: false,
        onsubmit: true,
        errorElement: "em",
        submitHandler: function(form) {
            var obj=$('.jq-submitBtn');
            var params={};
            obj.closest('form').find('input[name],textarea[name],select[name]').each(function(){
                var tagname= $(this).attr('name');
                var key=tagname;   
                var type = $(this).attr('type');              
                if((type=='radio'||type=='checkbox')&&$(this).prop('checked')==false){
                    return;
                } else if(tagname=='') {
                    return;
                } else if(tagname.substr(tagname.length-2,2)=='[]'){
                    key=tagname.substr(0,tagname.length-2);                     
                    if(!params[key])params[key]=[];
                    params[key].push($(this).val());
                } else{                  
                    params[key]=$(this).val();
                }
            });
            $.ajax({
                url:obj.parents('form').attr('action'),
                data:params,
                type:obj.parents('form').attr('method'),
                dataType: 'json',
                success: function(data,sender){
                    if(data.status==1){
                        $.smite.tip({content:data.msg,icon:'success',event:function(){
                            if(data.url) window.location=data.url;
                            window.location.reload();   
                        }});
                    }else if(data.status==254){
                        $.dialogLogin({show: true});        
                    }else{
                        $.smite.tip({content:data.msg,  icon:'error'});
                    }
                },
                error:function(){
                    $.smite.tip({content:'请求遇到异常，请刷新页面重试！', icon:'error'});
                }
            });    
        }
    });


	// 基础设置表单验证
	$('.jq-setting').validate({
		rules: {
            "nickname": { 
                required: true,
                lengthLimit8: true
            }
        },
        messages: {
            "nickname": {
                required: "请输入昵称！"
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

    // 同意条款必须勾选
    $('.jq-agreeCbox').click(function() {
        $('.jq-agreeBtn').children().toggleClass('none');
    });

    // 账号注册表单验证
	$('.jq-register').validate({
        ignore: '',
		rules: {
            "username": { 
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
            }
        },
        messages: {
            "username": {
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

    // 忘记密码表单验证
    $('.jq-forgetPwd').validate({
        rules: {
            "username": { 
                required: true,
                rangelength: [8, 16]
            },
            "vcode": { 
                required: true
            }
        },
        messages: {
            "username": {
                required: "请输入新密码！",
                rangelength: "请输入8-16个字符!"
            },
            "vcode": {
                required: "验证码不能为空！"
            }
        }
    });

    // 创建收藏夹页面分类必选
    $.validator.addMethod('cateLength', function(value, element) {
        return $('.jq-cate').length > 0 ? true : false;
        console.log($('.jq-cate').length);
    }, '请选择分类!');

    // 创建收藏夹页面分类选择
    $('.jq-catChoose li').click(function() {
        $(this).fadeTo(300, .2);
        var input = '<input class="jq-cate" type="hidden" name="" value="" />';
        var name = $(this).data('name');
        var value = $(this).data('value');
        $(this).append(input);
        $(this).find('.jq-cate').attr({'name': name, 'value': value});
    });
    // 创建收藏夹表单
    $('.jq-creatCollection').validate({
        ignore: "",
        rules: {
            "name": { 
                required: true,
                lengthLimit15: true
            },
            "cate": {
                cateLength: true
            }
        },
        messages: {
            "name": {
                required: "请输入收藏夹名称！"
            }
        }

    });

    // 电话号码验证    
    jQuery.validator.addMethod("isPhone", function(value, element) {    
      var tel = /^((145|147)|(15[^4])|(17[6-8])|((13|18)[0-9]))\d{8}$/;    
      return this.optional(element) || (tel.test(value));    
    }, "请输入正确的手机号码格式！");

    // 创建圈子
    $('.jq-creatCirle').validate({
        ignore: "",
        rules: {
            "name": { 
                required: true,
                maxlength: 10
            },
            "intros": {
                required: true
            },
            "phone" : {
                isPhone: true
            }
        },
        messages: {
            "name": {
                required: "请输入圈子名称！",
                maxlength: "昵称必须少于11个字！"
            },
            "intros": {
                required: "请输入圈子介绍！",
            }
        }
    });

});