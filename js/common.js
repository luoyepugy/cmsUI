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


    $.dialog=function(options){
        var s={
            button: '.jq-dialogLoginBtn',
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

        $(s.button).on({
            click: function() {
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
                $('.J_dialog .icon-close').click(s.close);
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
                    $.dialog();
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


    $.smite.user={
        settings:{ 
            button: '.J_card',
            layer_html: '<div id="J_card_layer" class="user_portrait_card"></div>',
            loading_html: '<p class="loading"></p>'           
        },
        init:function(options){
            // options && $.extend($.smite.form.settings, options);
            // this.timer(); 
            this.card();//名片
            this.like();//赞
            this.join();//加入
            // this.comment();
            this.follow();//关注
            // this.unfollow();
            // this.message();
        },
        card:function(){
            var s=$.smite.user.settings,
                h = null,uid=null,
                n = null;

            $('.portrait_sex').on('mouseover', s.button, function() {   
                $(s.button).closest('.user_portrait').css('z-index', '0');

                clearTimeout(h);
                clearTimeout(n);

               var p = $(this).offset(),
                    d = $(this).width(),
                    l = p.left-340,
                    q = d / 2 - 8,
                    w = $(window).width();
                    l + 300 > w && (l = l - 300 + d, q = 300 - d / 2 - 8),
                uid = $(this).data('uri');
                
                $(this).closest('.user_portrait').css('z-index', '2');
                $('#J_card_layer').css('z-index', '1');

                if(!uid) return !1;  
                $('#J_card_layer').html(s.loading_html);
                
                !$('#J_card_layer')[0] && $('body').append(s.layer_html);
                         

                $('#J_card_layer').css({
                    position: 'absolute',
                    top: (p.top - 122).toString() + "px",
                    left: l + "px"
                });

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
            $('.portrait_sex').on('mouseout', s.button, function() {
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
                    $.dialog();
                    // TGDialogS('userLogin');
                }else{
                    $.smite.tip({content:data.msg,  icon:'error'});
                }
            }});
        },
        follow:function(){
            var btn= $('.J_follow');
            btn.on('click',function(){
                if( !$(this).attr('data-uri') ) return;              
                $.getJSON($(this).attr('data-uri'),function(result){
                    if(result.status==1){
                        $.smite.tip({content:result.msg,icon:'success'});
                    }else if(result.status==254){
                        $.dialog();
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
                        $.dialog();
                        // TGDialogS('userLogin');
                    }else{
                        $.smite.tip({content:result.msg,icon:'error'});
                    }
                });
            });
        },
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

    // 头像卡片初始化
    $.smite.user.init();

    // 登录弹窗
    $.dialog({
        content: $('.dialogLogin'),
        title: '登录'
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
    $('.jq-commentBtn').click(function() {
        $(this).parent().next('.jq-comment').remove();
        $(this).parent().after($('.jq-commentInput').html());
        $(this).parent().next('.jq-comment').removeClass('none');
    });
    // 确认评论
    $('.jq-commentWrap').on('click', '.jq-confirmComment', function() {
        $(this).closest('.jq-comment').remove();
        var commentText = $(this).closest('.jq-comment').find('textarea').val();
    });
    // 取消评论
    $('.jq-commentWrap').on('click', '.jq-cancelComment', function() {
        $(this).closest('.jq-comment').remove();
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