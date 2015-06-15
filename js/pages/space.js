
$(function() {
 	
	
 	$.smite.common.init({button:'.jq-change',success:function(data){
        if(data.status==1){
            $('.portrait_sex').empty().html( data.data );
        }else if(data.status==254){
            $.dialog();
        }else{
            $.smite.tip({content:data.msg,icon:'error'});
        }
    }});

    
	// 编辑个人简介
	$('.jq-editInfo').click(function() {
		$(this).addClass('none');
		$('.jq-infos').children().toggleClass('none');
		var text = $('.jq-textInfos').text();
		$('.jq-infos').find('textarea').val(text);
	});
	// 确认编辑简介
	$('.jq-confirmInfos').click(function() {
		$('.jq-editInfo').removeClass('none');
		$('.jq-infos').children().toggleClass('none');
		var newText = $('.jq-infos').find('textarea').val();
		$('.jq-textInfos').text(newText);
	});
	// 取消编辑简介
    $('.jq-cancelInfos').click(function() {
    	$('.jq-editInfo').removeClass('none');
		$('.jq-infos').children().toggleClass('none');
	});


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