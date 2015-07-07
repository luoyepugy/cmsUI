;(function($) {
    $.smite = $.smite || {version: "v1.0.0"};
    $.fn.setmiddle = function() {
        var dl = $(document).scrollLeft(),
            dt = $(document).scrollTop(),
            ww = $(window).width(),
            wh = $(window).height(),
            ow = $(this).width(),
            oh = $(this).height(),
            left = (ww - ow) / 2 + dl,
            top = (oh < 4 * wh / 7 ? wh * 0.382 - oh / 2 : (wh - oh) / 2) + dt;
                
        $(this).css({left:Math.max(left, dl) + 'px',top:Math.max(top, dt) + 'px'});             
        return this;
    };

    $.dialogLogin = function(options) {
        var s={
            show: false,
            id:'',
            content: $('.dialogLogin'),
            title: '登录',
            width: '650px',
            box:'<div class="dialog J_dialog" ><div class="dialog_title"><h4></h4><span class="icon-close"></span></div><div class="dialog_content"></div>' +
                '</div><div class="dialog_bg"></div>',
            close:function(){
                $(this).parents('.J_dialog').hide();
                $('.dialog_bg').css('height', '0');
            },
        };
        options && $.extend(s, options);
        !$('.J_dialog')[0] && $('body').append(s.box).attr('id',s.id);
        
        if(s.show == true) {
            s.content.removeClass('none');
        } else {
            return;
        }
        $('.dialog_bg').css({
            'height': $(document).height()
        });
        $('.J_dialog').css('width', s.width);
        $('.J_dialog .dialog_content').html(s.content);
        $('.J_dialog h4').text(s.title);
        $('.J_dialog').attr('id',s.id);
        $('.J_dialog').show();
        // 点击取消按钮
        $('.J_dialog .icon-close, .J_dialog .jq-cancel, .J_dialog .jq-delete').click(s.close);
        // 点击确认删除按钮
        $('.J_dialog .jq-delete').click(function() {
            obj.closest('li').remove();
            if( !obj.attr('data-uri') ) return;              
            $.getJSON(obj.attr('data-uri'),function(result){
                if(result.status==1){
                    $.smite.tip({content:result.msg,icon:'success'});
                }else if(result.status==254){
                    $.dialogLogin({show: true});
                }else{
                    $.smite.tip({content:result.msg,icon:'error'});
                }
            });
        });
        return $('.J_dialog');
    };


    $.dialog=function(options){
        var s={
            button:'.jq-dialogDelete',
            id:'',
            content: $('.dialogDelete'),
            title: '删除',
            width: '350px',
            box:'<div class="dialog J_dialog" ><div class="dialog_title"><h4></h4><span class="icon-close"></span></div><div class="dialog_content"></div>' +
                '</div><div class="dialog_bg"></div>',
            close:function(){
                $(this).parents('.J_dialog').hide();
                $('.dialog_bg').css('height', '0');
            }
        };
        options && $.extend(s, options);
        $(s.button).on({
            click: function() {
                var obj = $(this);
                !$('.J_dialog')[0] && $('body').append(s.box).attr('id',s.id);
                $('.dialog_bg').css({
                    'height': $(document).height()
                });
                $('.J_dialog').css('width', s.width);
                s.content.removeClass('none');
                $('.J_dialog .dialog_content').html(s.content);
                $('.J_dialog h4').text(s.title);
                $('.J_dialog').attr('id',s.id);
                $('.J_dialog').show();
                // 点击取消按钮
                $('.J_dialog .icon-close, .J_dialog .jq-cancel, .J_dialog .jq-delete').click(s.close);
                // 点击确认删除按钮
                $('.J_dialog .jq-delete').click(function() {
                    obj.closest('li').remove();
                    if( !obj.attr('data-uri') ) return;             
                    $.getJSON(obj.attr('data-uri'),function(result){
                        if(result.status==1){
                            $.smite.tip({content:result.msg,icon:'success'});
                        }else if(result.status==254){
                            $.dialogLogin({show: true});
                        }else{
                            $.smite.tip({content:result.msg,icon:'error'});
                        }
                    });
                });
                return $('.J_dialog');
            }
        });
        
    };

    $.smite.tip = function(options) {
        var settings = {
            content: '',
            icon: 'success',
            time: 2000,
            close: false,
            zindex: 99999,
            event:function(){}
        };
        if(options) {
            $.extend(settings, options);
        }
        if(settings.close){
            $(".tipbox").hide();
            return;
        }
        if(!$('.tipbox')[0]){
            $('body').append('<div class="tipbox"><div class="tip-l"></div><div class="tip-c"></div><div class="tip-r"></div></div>');
            $('.tipbox').css('z-index', parseInt(settings.zindex));
        }
        $('.tipbox').attr('class', 'tipbox tip-' + settings.icon);
        $('.tipbox .tip-c').html(settings.content);
        $('.tipbox').css('z-index', parseInt($('.tipbox').css('z-index'))+1).setmiddle().show();
        
        if(settings.time>0){
            setTimeout(function() {
                $(".tipbox").fadeOut()
                settings.event();
            }, settings.time);
        }
    };

    $.smite.common = {
        settings:{
            button:'.J_ajax',
            success:function(data,sender){
                if(data.status==1){
                    $.smite.tip({content:data.msg,icon:'success',event:function(){
                        if(data.url) window.location=data.url;
                        window.location.reload();   
                    }});
                }else if(data.status==254){
                    $.dialogLogin({show: true});
                    // TGDialogS('userLogin');         
                }else{
                    $.smite.tip({content:data.msg,  icon:'error'});
                }
            }
        },
        init:function(options){
            var s=this.settings;
             if(options){s=$.extend({},s, options);}
            this.ajax(s);
        },
        ajax:function(s){ 
            $(s.button)[0]&& $(s.button).unbind('click').click(function(){
                var sender=$(this);
               $.getJSON($(this).attr('data-uri'),function(data){s.success(data,sender);}); 
            });
        }
    };

    $.smite.dialogForm={
        settings:{
            button:'.jq-dialogSubmit',
            type:'json',
            valid:function(data){
                return true;
            },
            success:function(data){
                if(data.status==1){                 
                    $.smite.tip({content:data.msg, icon:'success',event:function(){                     
                        if(data.url!=undefined&&data.url!=null){
                            window.location=data.url;
                        }else{
                            window.location.reload();
                        }
                    }});
                }else if(data.status==254){
                    $.dialogLogin({show: true});
                }else{ 
                    $.smite.tip({content:data.msg, icon:'error'});
                }
            },
            error:function(){
                $.smite.tip({content:'请求遇到异常，请刷新页面重试！', icon:'error'});
            }
        },
        init:function(options){ 
            var s=this.settings;
            if(options){ s=$.extend({},s, options);}
            this.submitForm(s); 
        },
        submitForm :function(s){ 
            $(s.button).click(function(){
                var obj=$(this);
                var params={};
                obj.parents('form').find('input[name],textarea[name],select[name]').each(function(){
                    var tagname= $(this).attr('name');
                    var key=tagname;                    
                    var type = $(this).attr('type');                 
                    if((type=='radio'||type=='checkbox')&&$(this).prop('checked')==false){
                        return;
                    } else if(tagname=='') {
                        return;
                    } else if(tagname.substr(tagname.length-2,2)=='[]'){
                        key=tagname.substr(0,tagname.length-2);                     
                        if(!params[key])params[key]=[];
                        params[key].push($(this).val());
                    } else{                  
                        params[key]=$(this).val();
                    }
                });
                
                if(!s.valid(params)) return;
                $.ajax({
                    url:obj.parents('form').attr('action'),
                    data:params,
                    type:obj.parents('form').attr('method'),
                    dataType:s.type,
                    success:s.success,
                    error:s.error,
                }); 
            });
            return ;
        }
    };

    $.smite.user={
        settings:{ 
            button: '.J_card',
            layer_html: '<div id="J_card_layer"></div>',
            loading_html: '<p class="loading"></p>'           
        },
        init:function(options){
            // options && $.extend($.smite.form.settings, options);
            // this.timer(); 
            this.card();//名片
            this.like();//赞
            this.join();//加入
            this.comment();
            // this.follow();//关注
            // this.unfollow();
            this.invite(); //邀请
            // this.message();
        },
        card:function(){
            var s=$.smite.user.settings,
                h = null,uid=null,
                n = null;

            $('.jq-portrait').on('mouseover', s.button, function() {   
                $(s.button).closest('.jq-portrait').css('z-index', '0');

                clearTimeout(h);
                clearTimeout(n);

               var p = $(this).offset(),
                    d = $(this).width(),
                    l = p.left-340,
                    q = d / 2 - 8,
                    w = $(window).width();
                    l + 300 > w && (l = l - 300 + d, q = 300 - d / 2 - 8),
                uid = $(this).data('uri');

                $(this).closest('.jq-portrait').css('z-index', '2');
                $('#J_card_layer').css('z-index', '1');

                if(!uid) return !1;  
                $('#J_card_layer').html(s.loading_html);
                
                !$('#J_card_layer')[0] && $('body').append(s.layer_html);
                         
                if(p.left < 344.5) {
                    $('#J_card_layer').attr('class', 'user_portrait_rcard');
                    $('#J_card_layer').css({
                        position: 'absolute',
                        top: (p.top - 122).toString() + "px",
                        left: (p.left + 40).toString() + "px"
                    });

                } else {
                    $('#J_card_layer').attr('class', 'user_portrait_card');
                    $('#J_card_layer').css({
                        position: 'absolute',
                        top: (p.top - 122).toString() + "px",
                        left: l + "px"
                    });
                }
                

                h = setTimeout(function(){
                    clearTimeout(h);
                    $("#J_card_layer").show();
                }, 200);
                $("#J_card_layer").hover(
                    function() {
                        clearTimeout(h);
                        $("#J_card_layer").show();
                    },
                    function() {
                        $("#J_card_layer").hide();
                    }
                );
                    n = setTimeout(function(){
                        $.getJSON(uid, function(result){
                            if(result.status == 1){
                                $("#J_card_layer").html(result.data);
                                clearTimeout(h);
                            }else{
                                clearTimeout(h);
                                clearTimeout(n);
                                $.smite.tip({content:result.msg,  icon:'error'});
                            }
                        });
                    }, 500);
            });
            $('.jq-portrait').on('mouseout', s.button, function() {
                clearTimeout(h);
                clearTimeout(n);
                h = setTimeout(function() {
                    $("#J_card_layer").hide();
                }, 500);
            });
        },
        like:function(){
            $.smite.common.init({button:'.J_parise',success:function(data){ 
                if(data.status==1){
                      var num=  $(this).find('.good_num').data('like').toString();
                       $(this).find('.good_num').text(  (isNaN(num)?0:num) +1);
                      num.length > 3 ? Number(num/1000).toFixed(1) + 'K' : num  ;
                }else if(data.status==254){
                    $.dialogLogin({show: true});
                    // TGDialogS('userLogin');
                }else{
                    $.smite.tip({content:data.msg,  icon:'error'});
                }
            }});
        },
        invite: function() {
            var s={
                button:'.jq-invite',
                wrap: '.jq-statusBtn'
            };
            $(s.wrap).on('click', s.button, function() {
                var status = $(this).data('invite');
                if(status == 0) {
                    $(this).closest(s.wrap).empty().append('<span class="button_lg bg_gray_light">已拒绝</span>');
                } else if(status == 1) {
                    $(this).closest(s.wrap).empty().append('<span class="button_lg bg_gray_light">已接受</span>');
                } else {
                    return false;
                }
                if( !$(this).attr('data-uri') ) return;              
                $.getJSON($(this).attr('data-uri'), function(result){
                    if(result.status==1){
                        $.smite.tip({content:result.msg,icon:'success'});
                    }else if(result.status==254){
                        $.dialogLogin({show: true});
                        // TGDialogS('userLogin');
                    }else{
                        $.smite.tip({content:result.msg,icon:'error'});
                    }
                });
            });
        },
        join:function(){
            var btn= $('.J_join');
            btn.on('click',function(){
                if( !$(this).attr('data-uri') ) return;              
                $.getJSON($(this).attr('data-uri'),function(result){
                    if(result.status==1){
                        $.smite.tip({content:result.msg,icon:'success'});
                    }else if(result.status==254){
                        $.dialogLogin({show: true});
                        // TGDialogS('userLogin');
                    }else{
                        $.smite.tip({content:result.msg,icon:'error'});
                    }
                });
            });
        },
        comment:function(){ 
            var s={
                button:'.jq-confirmComment',
                wrap: '.jq-commentWrap'
            }; 
            $(s.wrap).on('click', s.button, function() {
                var obj=$(this),params={};
                obj.parents('form').find(':input[name],textarea[name],select[name]').each(function(){
                    var tagname= $(this).attr('name'),key=tagname;                  
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
                if( params.content==undefined||params.content.length<10){
                     $.smite.tip({content:'请输入至少10个字的评论',  icon:'error'}); 
                   return;                     
                }              
                $.ajax({
                    url:obj.parents('form').attr('action'),
                    data:params,
                    type:obj.parents('form').attr('method'),
                    dataType:'json',
                    success:function(res){
                        if(res.status==1){
                              $.smite.tip({content: res.msg,  icon:'success',event:function(){
                                    window.location.reload();     
                              }});
                        }else if(res.status==254){     
                              $.dialogLogin({show: true});      
                        }else{
                             $.smite.tip({content:res.msg,  icon:'error'});
                        }
                    }
                });
            });  
        }
    };


    $.smite.form={
        settings:{
            vcode:'.loginImgCode',
            button:'form:submit',
            type:'json',
            valid:function(data){
                return true;
            },
            success:function(data){
                if(data.status==1){                 
                    if(data.re_email!=undefined&&data.re_email!=null){
                        if(data.re_email==undefined||data.re_email==null) return;
                         TGDialogS("emailCheck");
                         $('#mail_msg').html(data.msg);
                        var btnemail=$('#re_email');
                        btnemail.attr('data-uri',data.re_email);
                        btnemail.unbind('click').click(function(){
                            $.getJSON( $(this).attr('data-uri'),function(data){
                                    if(data.status==1){
                                         $.smite.tip({content:'邮件发送成功，请注意查收!', icon:'success'});
                                    }else{
                                        $.smite.tip({content:'邮件发送失败，请核实您的邮箱是否正确，或换其它邮箱重新注册！', icon:'error'});
                                    }
                            });
                        });
                    }else{
                        $.smite.tip({content:data.msg, icon:'success',event:function(){                     
                            if(data.url!=undefined&&data.url!=null){
                                window.location=data.url;
                            }else{
                                window.location.reload();
                            }
                        }});
                    }
                }else if(data.status==254){
                    TGDialogS('userLogin');
                }else{ 
                      $.smite.tip({content:data.msg, icon:'error'});
                }
            },
            error:function(){
                $.smite.tip({content:'请求遇到异常，请刷新页面重试！', icon:'error'});
            }
        },
        init:function(options){ 
            var s=this.settings;
            if(options){ s=$.extend({},s, options);}
            this.verify(s);
            this.login(s);
            this.register(s);  
        },
        verify:function(s){         
            $(s.vcode).unbind('click').click(function(){
                $(this).attr('src', $(this).attr('src')+'&t='+ (new Date()).valueOf()  );
            });
        },
        login:function(s){ 
            $(s.button).click(function(){
                var obj=$(this);
                var params={};
                obj.parents('form').find('input[name],textarea[name],select[name]').each(function(){
                    var tagname= $(this).attr('name');
                    var key=tagname;                    
                    var type = $(this).attr('type');                 
                    if((type=='radio'||type=='checkbox')&&$(this).prop('checked')==false){
                        return;
                    } else if(tagname=='') {
                        return;
                    } else if(tagname.substr(tagname.length-2,2)=='[]'){
                        key=tagname.substr(0,tagname.length-2);                     
                        if(!params[key])params[key]=[];
                        params[key].push($(this).val());
                    } else{                  
                        params[key]=$(this).val();
                    }
                });
                
                 if(!s.valid(params)) return;
                $.ajax({
                    url:obj.parents('form').attr('action'),
                    data:params,
                    type:obj.parents('form').attr('method'),
                    dataType:s.type,
                    success:s.success,
                    error:s.error,
                }); 
            });
            return ;
        },
        register:function(s){ 
            $('.newUser .loginBtn').click(function(){
                var obj=$(this);
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
                 
                    params['agreement']=1;
                    params['repassword']=params['password'];
                    if( params.username==undefined||params.username.length<4){
                       $.smite.tip({content:'请输入至少4位用户名', icon:'error'});
                       return;                     
                    }
                    var reg = /^([a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+((\.[a-zA-Z0-9_-]{2,3}){1,2})$/;
                    if(!reg.test(params.email)){
                     $.smite.tip({content:'请输入正确的邮箱地址', icon:'error'}); return;     
                    }
                    if( params.password==undefined||params.password.length<4){
                         $.smite.tip({content:'请输入至少4位密码', icon:'error'}); return;                     
                    }
                    if( params.vcode==undefined||params.vcode.length!=6){   
                        $.smite.tip({content:'请输入6位验证码', icon:'error'}); return;                       
                    }
                $.ajax({
                    url:obj.parents('form').attr('action'),
                    data:params,
                    type:obj.parents('form').attr('method'),
                    dataType:s.type,
                    success:s.success,
                    error:s.error,
                }); 
            });
            return ;
        }
    };
    
    $.fn.extend({
        // 字符长度限制
        characterLimit: function(options) {
            var defaults = {
                limitLength: 25
            };
            var options = $.extend({}, defaults, options);
            return this.each(function() {
                var obj = $(this),
                    o = options;
                if(obj.text().length > o.limitLength) {
                    obj.text(obj.text().substr(0, o.limitLength) + '...');
                }
            });
        },
        // tab选项卡点击切换不同内容
        tabToggle: function(options) {
            var defaults = {
                tabMenuClass: 'tab_current',
                tabMenu_childTag: 'li',
                tabContent: '.jq-tabContent',
                tabWrap: '.jq-tabWrap'
            };
            var options = $.extend({}, defaults, options);
            return this.each(function() {
                var obj = $(this),
                    o = options,
                    items = $(o.tabMenu_childTag, obj);
                // $(o.tabContent).addClass('none'); // 先将所有选项卡内容块隐藏
                $(o.tabWrap).find(o.tabContent + ':first').removeClass('none');
                items.on({
                    click: function() {
                        var index = $(this).index();
                        items.removeClass(o.tabMenuClass);
                        $(this).addClass(o.tabMenuClass);
                        $(this).closest(o.tabWrap).find(o.tabContent).addClass('none').eq(index).removeClass('none');
                    }
                });

            });
        },
        loadContent: function(options) {
            var defaults = {
                newContent: '.jq-commentInput',
                wrap: '.jq-commentWrap',
                html: '.jq-commentHtml',
                insertPosition: 'appoint',
                appoint: '.jq-commentAppoint'
            };
            var options = $.extend({}, defaults, options);
            return this.each(function() {
                var obj = $(this),
                    o = options;
                obj.on({
                    click: function() {
                        $(o.wrap).find(o.newContent).remove();
                        $(o.newContent).attr('data-id', $(this).data('id'));
                        $(o.newContent).attr('data-pid', $(this).data('pid'));
                        $(this).data('pid');
                        if(o.insertPosition == 'after') {    
                            $(this).closest(o.wrap).after($(o.html).html());
                        } else if(o.insertPosition == 'append') {
                            $(this).closest(o.wrap).append($(o.html).html());
                        } else if(o.insertPosition == 'appoint') {
                            $(this).closest(o.wrap).find(o.appoint).append($(o.html).html());
                        } else {
                            return false;
                        }
                    }
                });
            });
        }
        
    });

    // 高亮样式显示
    $.fn.highLight = function(options) {
        var options = $.extend({}, $.fn.highLight.defaults, options);
        return this.each(function() {
            var obj = $(this),
                o = options,
                items = $(o.childTag, obj);
            items.on({
                click: function() {
                    items.removeClass(o.className);
                    $(this).addClass(o.className);
                }
            })
        });
    };
    $.fn.highLight.defaults = {
        className: 'current',
        childTag: 'li'
    };


})(jQuery);


$(function() {

    // 通用ajax初始化
    $.smite.common.init();
    // 头像卡片初始化
    $.smite.user.init();
    // 弹窗表单初始化，默认是举报弹窗
    $.smite.dialogForm.init();

    // 删除弹窗
    $.dialog({
        button: '.jq-dialogDelete',
        content: $('.dialogDelete')
    });

    // 空间高级设置页面
    $.smite.dialogForm.init({button: '.J_submit'});
    // 添加友情圈子弹窗
    $.smite.dialogForm.init({button: '.jq-addCircleSubmit', valid: function(data) {
        if(data.circleName==undefined||data.circleName=='') {
            $.smite.tip({content:'圈子名不可为空', icon:'error'});
            return false;
        }
        return true;
    }});

    // 登录表单初始化
    $.smite.form.init({button:'.jq-signinBtn',valid:function(data){
        if(data.username==undefined||data.username==''){
            $.smite.tip({content:'用户名不可空', icon:'error'});
            return false;
        }
        if(data.password==undefined||data.password==''){
            $.smite.tip({content:'密码不可空', icon:'error'});
            return false;
        }
        if(data.vcode==undefined||data.vcode==''){
            $.smite.tip({content:'验证码不可空', icon:'error'});
            return false;
        }
        return true;
    }});

    // 换一批初始化
    $.smite.common.init({button:'.jq-change',success:function(data){
        if(data.status==1){
            $('.portrait_sex').empty().html( data.data );
        }else if(data.status==254){
            $.dialogLogin({show: true});
        }else{
            $.smite.tip({content:data.msg,icon:'error'});
        }
    }});

    // 关注
    $.smite.common.init({button: '.J_follow'});
    // 取消关注
    $.smite.common.init({button: '.J_unfollow'});
 
    // 限制字符数
    $('.jq-elimit45').characterLimit({ limitLength: 45 });
    $('.jq-elimit35').characterLimit({ limitLength: 35 });
    $('.jq-elimit25').characterLimit();

    // 条款页面锚点高亮样式显示
    $('.jq-anchor').highLight({childTag: 'a'});

    // 首页选项卡切换
    $('.jq-tabMenu-index').tabToggle();
    // 全部视频选项卡切换
    $('.jq-tabMenu').tabToggle({
        tabMenuClass: 'current',
        tabMenu_childTag: 'a'
    });


    // 快速评论按钮
    $('.jq-commentBtn').loadContent();
    // 取消评论
    $('.jq-commentWrap').on('click', '.jq-cancelComment', function() {
        $(this).closest('.jq-commentInput').remove();
    });


    // 顶部导航交互
    $(document).scroll(function() {
        var top_distance = $(document).scrollTop();
        if(top_distance > 54) {
            $('.jq-top-nav').addClass('fixed_top_nav');
        } else {
            $('.jq-top-nav').removeClass('fixed_top_nav');
        }
    });

    // 顶部导航菜单
    $('.jq-userMenu, .user_menu').hover(function() {
        $('.user_menu').removeClass('none');
        $('.jq-userMenu').addClass('user_attach_hover')
    }, function() {
        $('.user_menu').addClass('none');
        $('.jq-userMenu').removeClass('user_attach_hover')
    });


});