
(function($) {

	// 成员管理按钮组
	$.adminMember = function(options) {
		var admin = {
			button: '',
			icon_button: ''
		};

		options && $.extend(admin, options);

		$(admin.button).hover(function() {
			$(this).find('.adminBtn').remove();
			$(this).append($('.adminBtn_wrap').html());
			$(this).find(admin.icon_button).removeClass('none');
		}, function() {
			$(this).find('.adminBtn').remove();
		});
	};

})(jQuery);


$(function() {

	$.adminMember({
		button: '.jq-admin',
		icon_button: '.icon-playback-rewind'
	});

	$.adminMember({
		button: '.jq-member',
		icon_button: '.icon-playback-rewind2'
	});

});