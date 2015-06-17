
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
        title: '添加到收藏夹'
    });

});