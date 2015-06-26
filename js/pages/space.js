
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
            _originText: '',
            _newText: '',
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
            },
            complete: function() {
                $(this).closest(o.wrap).children().toggleClass('none');
                $(this).closest(o.wrap).find(o._originText).text(o._newText);
            }
         },
        init: function(options) {
            var o = $.extend({}, this.defaults, options);
            this.edit(o);
            this.confirm(o);
            this.cancel(o);
            this.delete(o);
            this.fastEdit(o);
        },
        edit: function(o) {
            $(o.editBtn).on({
                click: function() {
                    o._originText = $(this).closest(o.wrap).find(o.text).text();
                    o._originText = $.trim(o._originText);
                    $(this).closest(o.wrap).children().toggleClass('none');
                    $(this).closest(o.wrap).find(o.editInput).val(o._originText).focus();
                }
            });
        },
        confirm: function(o) {
            $(o.confirmBtn).on({
                click: function() {
                    var obj = $(this);
                    o._newText = $(this).closest(o.wrap).find(o.editInput).val();
                    o._newText = $.trim(o._newText);
                    if(o._newText == o._originText) {
                        $(this).closest(o.wrap).children().toggleClass('none');
                    }else if(o._newText == '') {
                        $.smite.tip({content:'输入框不能为空！',icon:'error'});
                    } else {
                        var params={};
                        obj.closest(o.wrap).find('input[name],textarea[name]').each(function(){
                            var tagname= $(this).attr('name');
                            var key=tagname;                                 
                            params[$(this).attr('name')]=$(this).val();
                        });
                        // 发送后台请求
                        $.ajax({
                            url: $(this).data('uri'),
                            dataType: 'json',
                            type: 'POST',
                            data: params,
                            success: o.success,
                            error: o.error
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
        },
        fastEdit: function(o) {
            var s = {
                editBtn: '.jq-fastEdit',
                editInput: '.jq-fastEditInput'
             };
            $(s.editBtn).on({
                click: function() {
                    o._originText = $(this).closest(o.wrap).find(s.editBtn).text();
                    o._originText = $.trim(o._originText);
                    $(this).closest(o.wrap).children().toggleClass('none');
                    $(this).closest(o.wrap).find(s.editInput).val(o._originText).focus();
                }
            });
            $(s.editInput).on({
                blur: function() {
                    var obj = $(this);
                    o._newText = $(this).closest(o.wrap).find(s.editInput).val();
                    o._newText = $.trim(o._newText);
                    if(o._newText == o._originText) {
                        $(this).closest(o.wrap).children().toggleClass('none');
                    }else if(o._newText == '') {
                        $.smite.tip({content:'输入框不能为空！',icon:'error'});
                    } else {
                        var params={};
                        obj.closest(o.wrap).find('input[name],textarea[name]').each(function(){
                            var tagname= $(this).attr('name');
                            var key=tagname;                                 
                            params[$(this).attr('name')]=$(this).val();
                        });
                        // 发送后台请求
                        $.ajax({
                            url: $(this).data('uri'),
                            dataType: 'json',
                            type: 'POST',
                            data: params,
                            success: o.success,
                            error: o.error
                        });
                    }   
                }
            });
        }
        
    };


})(jQuery);


$(function() {

    $.operation.all.init();

    // 编辑个人简介
    // $('.jq-editInfo').click(function() {
    //  $(this).addClass('none');
    //  $('.jq-infos').children().toggleClass('none');
    //  var text = $('.jq-textInfos').text();
    //  $('.jq-infos').find('textarea').val(text);
    // });
    // // 确认编辑简介
    // $('.jq-confirmInfos').click(function() {
    //  $('.jq-editInfo').removeClass('none');
    //  $('.jq-infos').children().toggleClass('none');
    //  var _newText = $('.jq-infos').find('textarea').val();
    //  $('.jq-textInfos').text(_newText);
        
    // });
    // // 取消编辑简介
 //    $('.jq-cancelInfos').click(function() {
 //     $('.jq-editInfo').removeClass('none');
    //  $('.jq-infos').children().toggleClass('none');
    // });


    // 编辑签名档
    // $('.jq-editSign').click(function() {
    //  $('.jq-sign').children().toggleClass('none');
    //  $('.jq-signInput').focus();
    //  var text = $(this).text();
    //  $('.jq-signInput').val(text);
    // });
    // // 签名档输入框失去焦点时保存文本
    // $('.jq-signInput').blur(function() {
    //  $('.jq-sign').children().toggleClass('none');
    //  var _newText = $('.jq-signInput').val();
    //  $('.jq-editSign').text(_newText);
    // });

});