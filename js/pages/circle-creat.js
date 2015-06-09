
$(function() {


    // 电话号码验证    
    jQuery.validator.addMethod("isPhone", function(value, element) {    
      var tel = /^((145|147)|(15[^4])|(17[6-8])|((13|18)[0-9]))\d{8}$/;    
      return this.optional(element) || (tel.test(value));    
    }, "请输入正确的手机号码格式！");

	// 创建圈子
	$('.jq-creatCirle').validate({
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
        },
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

});