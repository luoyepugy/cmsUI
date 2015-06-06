
$(function() {


	// 登录验证提示
    function form_validate(selector, messages) {
        $('em.error').remove();
        selector.parent().append('<em class="error">' + messages + '</em>');
    }

	// 写信验证
	$('.jq-sendLetter').click(function() {
		var letter_addressee = $('input[name="letter_addressee"]');
		var letter_content = $('.jq-letterContent').val();
		if(letter_addressee.val() == '') {
			form_validate(letter_addressee, '收件人不能为空！');
		} else if(letter_content == '') {
			form_validate($('.jq-letterContent'), '发送内容不能为空！');
		} else {
			$(this).closest('form').submit();
		}
	});

	// 删除消息
	$('.jq-emailList').hover(function() {
		$(this).find('.jq-delete').remove();
		$(this).find('.jq-time').removeClass('mt22').before('<p class="gray_mid jq-delete"><i class="icon-close cursor"></i></p>');
	}, function() {
		$(this).find('.jq-time').addClass('mt22');
		$(this).find('.jq-delete').remove();
	});

	$('.jq-emailList').on('click', '.jq-delete', function() {
		$(this).closest('.jq-emailList').remove();
	});

});
