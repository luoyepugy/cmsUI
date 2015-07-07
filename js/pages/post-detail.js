
$(function() {

	// 举报弹窗
    $.dialog({
    	button: '.jq-reportBtn',
        content: $('.dialogReport'),
        title: '选择举报原因',
        width: '450px'
    });

    // 添加到收藏夹弹窗
    $.dialog({
    	button: '.jq-collectionBtn',
        content: $('.dialogCollection'),
        title: '添加到收藏夹',
        width: '650px'
    });

    // 回复列表显示举报按钮
    $('.jq-postReply li').hover(function() {
        $(this).find('.jq-reportBtn').removeClass('none');
    }, function() {
        $(this).find('.jq-reportBtn').addClass('none');
    });

    // 回复锚点跳转
    $('.jq-commentAnchor').loadContent({
        insertPosition: 'appoint'
    });

    // 举报弹窗表单初始化
    // $.smite.dialogForm.init({button:'.jq-reportSubmit',valid:function(data){
    //     if(data.username==undefined||data.username==''){
    //         $.smite.tip({content:'用户名不可空', icon:'error'});
    //         return false;
    //     }
    //     if(data.password==undefined||data.password==''){
    //         $.smite.tip({content:'密码不可空', icon:'error'});
    //         return false;
    //     }
    //     if(data.vcode==undefined||data.vcode==''){
    //         $.smite.tip({content:'验证码不可空', icon:'error'});
    //         return false;
    //     }
    //     return true;
    // }});

    // 举报弹窗表单初始化
    // $.smite.dialogForm.init({button:'.jq-reportSubmit',valid:function(data){
    //     if(data.username==undefined||data.username==''){
    //         $.smite.tip({content:'用户名不可空', icon:'error'});
    //         return false;
    //     }
    //     if(data.password==undefined||data.password==''){
    //         $.smite.tip({content:'密码不可空', icon:'error'});
    //         return false;
    //     }
    //     if(data.vcode==undefined||data.vcode==''){
    //         $.smite.tip({content:'验证码不可空', icon:'error'});
    //         return false;
    //     }
    //     return true;
    // }});

});