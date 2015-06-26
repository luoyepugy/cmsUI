
$(function() {

    // 实例化编辑器
    var ue = UE.getEditor('content', {
        toolbars: [
            ['simpleupload','insertvideo']
        ],
        textarea: 'content',
        initialFrameHeight: '300',
        pasteplain: true,
        retainOnlyLabelPasted: true,
        allHtmlEnabled: false,
        maximumWords: '1000',
        enableContextMenu: false,
        elementPathEnabled: false,
        autotypese: {
            mergeEmptyline: true, //合并空行
            removeClass: true, //去掉冗余的class
            removeEmptyline: false, //去掉空行
            textAlign: "left", //段落的排版方式，可以是 left，right，center，justify 去掉这个属性表示不执行排版
            imageBlockLine: 'center', //图片的浮动方式，独占一行剧中，左右浮动，默认: center，left，right，none 去掉这个属性表示不执行排版
            pasteFilter: true, //根据规则过滤没事粘贴进来的内容
            clearFontSize: true, //去掉所有的内嵌字号，使用编辑器默认的字号
            clearFontFamily: true, //去掉所有的内嵌字体，使用编辑器默认的字体
            removeEmptyNode: true, // 去掉空节点
            //可以去掉的标签
            removeTagNames: {标签名字: 1
            },
            indent: false, // 行首缩进
            indentValue: '2em', //行首缩进的大小
            bdc2sb: false,
            tobdc: false
        }
    });
    // ue.ready(function() {
    //     var html = ue.getContent();
    //     //获取html内容，返回: <p>hello</p>
    //     // console.log(html);
    //     //获取纯文本内容，返回: hello
    //     // var txt = ue.getContentTxt();
    //     // $('textarea[name="content"]').attr('value', html);
    // });


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

    // 汉字长度限制
    $.validator.addMethod('lengthLimit', function(value, element) {
        return getByteLen(value) < 80 ? true : false;
    }, '昵称必须少于40个字!');


	// 发帖表单验证
	$('.jq-postForm').validate({
        ignore: '',
		rules: {
            "title": { 
                required: true,
                lengthLimit: true
            },
            "content": {
                required: true
            },
            "remind": {
                required: true
            },
            "invite": {
                required: true
            }
        },
        messages: {
            "title": {
                required: "请输入标题！",
                lengthLimit: "昵称必须少于40个字！"
            },
            "remind": {
                required: "提醒谁看为必填项！"
            },
            "invite": {
                required: "邀请谁回答为必填项！"
            },
            "content": {
                required: "请输入内容！"
            }
        },
        errorPlacement: function(error, element) { 
            element.parent().find('.jq-tip').remove();   
            error.appendTo(element.closest('div.p').append()); 
        },
        onkeyup: false,
        onfocusout: false,
        onsubmit: true,
        errorElement: "em",
        submitHandler: function(form) {
            var obj=$('.jq-submitBtn');
            var params={};
            obj.parents('form').find('input[name],textarea[name],select[name]').each(function(){
                var tagname= $(this).attr('name');
                var key=tagname;                    
                  if(($(this).attr('type')=='radio'||$(this).attr('type')=='checkbox')&&$(this).attr('checked')==undefined){
                      return;
                  }                     
                if(tagname.substr(tagname.length-2,2)=='[]'){
                    key=tagname.substr(0,tagname.length-2);                     
                    if(!params[key])params[key]=[];
                    params[key].push($(this).val());    
                }else{                  
                    params[$(this).attr('name')]=$(this).val();
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

});