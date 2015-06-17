
$(function() {

    // 实例化编辑器
    var ue = UE.getEditor('content', {
        toolbars: [
            ['simpleupload', 'insertimage','insertvideo']
        ],
        initialFrameHeight: '300',
        pasteplain: true,
        retainOnlyLabelPasted: true,
        maximumWords: '500',
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
        var html = ue.getContent();
        //获取html内容，返回: <p>hello</p>
        console.log(html);
        //获取纯文本内容，返回: hello
        // var txt = ue.getContentTxt();
        $('textarea[name="content"]').attr('value', html);
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




    $.validator.addMethod('lengthLimit', function(value, element) {
        return getByteLen(value) < 80 ? true : false;
    }, '昵称必须少于8个字!');


	// 基础设置表单验证
	$('.jq-postForm').validate({
        ignore: '',
		rules: {
            "title": { 
                required: true,
                lengthLimit: true
            },
            "content": {
                required: true
            }
        },
        messages: {
            "title": {
                required: "请输入标题！",
                lengthLimit: "昵称必须少于40个字！"
            },
            "content": {
                required: "请输入内容！"
            }
        },
        errorPlacement: function(error, element) { 
            element.parent().find('.jq-tip').remove();
            error.appendTo(element.parent().append()); 
        },
        onkeyup: false,
        onfocusout: false,
        onsubmit: true,
        errorElement: "em",
        submitHandler: function(form) { 
            form.submit();       
        } 
	});

    // $('.jq-submit').click(function() {
    //     var title = $('input[name="title"]').val();
    //     var content = ue.getContent();
    //     var remind = $('input[name="remind"]').val();
    //     var invite = $('input[name="invite"]').val();
        
    //     $.ajax({
    //         url:obj.parents('form').attr('action'),
    //         data:params,
    //         type:obj.parents('form').attr('method'),
    //         dataType:s.type,
    //         success: function() {
    //             form.submit();
    //         },
    //         error: function() {

    //         }
    //     }); 
    // });

});