
(function($) {

	$.operation = $.operation || {version: "v1.0.0"};

	$.operation.all = {
 		defaults: {
 			text: '.jq-text',
 			editInput: '.jq-editInput',
 			editBtn: '.jq-edit',
 			confirmBtn: '.jq-confirm',
 			cancelBtn: '.jq-cancel',
 			deleteBtn: '.jq-delete',
 			wrap: '.jq-operation',
 			success: function(data,sender){
 				$(this).closest(o.wrap).children().toggleClass('none');
				$(this).closest(o.wrap).find(o.originText).text(o.newText);
				if(data.status==1){
					$.smite.tip({content:data.msg,icon:'success',event:function(){
						if(data.url) window.location=data.url;
						window.location.reload();	
					}});
				}else if(data.status==254){
					$.dialog();		
				}else{
					$.smite.tip({content:data.msg,  icon:'error'});
				}
			},
			error:function(){
				$.smite.tip({content:'请求遇到异常，请刷新页面重试！', icon:'error'});
			}
 		},
 		init: function(options) {
 			var text = {
 				originText: '',
 			    newText: ''
 			};
 			var o = $.extend(true, this.defaults, options, text);
 			this.edit(o);
 			this.confirm(o);
 			this.cancel(o);
 			this.delete(o);
 		},
 		edit: function(o) {
 			$(o.editBtn).on({
				click: function() {
					o.originText = $(this).closest(o.wrap).find(o.text).text();
					o.originText = $.trim(o.originText);
					$(this).closest(o.wrap).children().toggleClass('none');
					$(this).closest(o.wrap).find(o.editInput).val(o.originText).focus();
				}
			});
 		},
 		confirm: function(o) {
 			$(o.confirmBtn).on({
				click: function() {
					o.newText = $(this).closest(o.wrap).find(o.editInput).val();
					o.newText = $.trim(o.newText);
					if(o.newText == o.originText) {
						$(this).closest(o.wrap).children().toggleClass('none');
					}else if(o.newText == '') {
						$.smite.tip({content:'输入框不能为空！',icon:'error'});
					} else {
						// 发送后台请求
						$.ajax({
							url: $(this).data('uri'),
							dataType: 'json',
							type: 'POST',
							data: { 'newText': o.newText },
							success: o.success,
							error: o.error,
						});
					}	
				}
			});
 		},
 		cancel: function(o) {
			$(o.cancelBtn).on({
				click: function() {
					$(this).closest(o.wrap).children().toggleClass('none');
				}
			});
 		},
 		delete: function(o) {
 			$(o.deleteBtn).on({
				click: function() {
					
				}
			});
 		}
		
 	};

 	$.operation.fastEdit = {
		defaults: {
			editBtn: '.jq-fastEdit',
			editInput: '.jq-fastEditInput',
			wrap: '.jq-operation'
		},
		init: function(options) {
			var text = {
 				originText: '',
 			    newText: ''
 			};
 			var o = $.extend(true, this.defaults, options, text);
			this.edit(o);
			this.confirm(o);
		},
		edit: function(o) {
			$(o.editBtn).on({
				click: function() {
					o.originText = $(this).closest(o.wrap).find(o.editBtn).text();
					o.originText = $.trim(o.originText);
					$(this).closest(o.wrap).children().toggleClass('none');
					$(this).closest(o.wrap).find(o.editInput).val(o.originText).focus();
				}
			});
		},
		confirm: function(o) {
			$(o.editInput).on({
				blur: function() {
					o.newText = $(this).val();
					o.newText = $.trim(o.newText);
					if(o.newText == o.originText) {
						$(this).closest(o.wrap).children().toggleClass('none');
					} else if(o.newText == '') {
						$.smite.tip({content:'输入框不能为空！',icon:'error'});
					} else {
						$(this).closest(o.wrap).children().toggleClass('none');
						$(this).closest(o.wrap).find(o.originText).text(o.newText);
						// 发送后台请求
						$.ajax({
							url: $(this).data('uri'),
							dataType: 'json',
							type: 'POST',
							data: { 'newText': o.newText },
							success: $.operation.all.success,
							error: $.operation.all.error,
						});
					}
				}
			});
		}
 	}


})(jQuery);


$(function() {


	$.operation.all.init();
	$.operation.fastEdit.init();

	// 编辑个人简介
	// $('.jq-editInfo').click(function() {
	// 	$(this).addClass('none');
	// 	$('.jq-infos').children().toggleClass('none');
	// 	var text = $('.jq-textInfos').text();
	// 	$('.jq-infos').find('textarea').val(text);
	// });
	// // 确认编辑简介
	// $('.jq-confirmInfos').click(function() {
	// 	$('.jq-editInfo').removeClass('none');
	// 	$('.jq-infos').children().toggleClass('none');
	// 	var newText = $('.jq-infos').find('textarea').val();
	// 	$('.jq-textInfos').text(newText);
		
	// });
	// // 取消编辑简介
 //    $('.jq-cancelInfos').click(function() {
 //    	$('.jq-editInfo').removeClass('none');
	// 	$('.jq-infos').children().toggleClass('none');
	// });


	// 编辑签名档
	$('.jq-editSign').click(function() {
		$('.jq-sign').children().toggleClass('none');
		$('.jq-signInput').focus();
		var text = $(this).text();
		$('.jq-signInput').val(text);
	});
	// 签名档输入框失去焦点时保存文本
	$('.jq-signInput').blur(function() {
		$('.jq-sign').children().toggleClass('none');
		var newText = $('.jq-signInput').val();
		$('.jq-editSign').text(newText);
	});

});