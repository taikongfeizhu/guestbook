define(['jquery', 'underscore'],function(zepto,underscore,gmu){
    function dialogBox(element,content,callback){
        var txt=content||"";
        var dialog=$(element).text(txt).dialog({
            autoOpen: false,
            closeBtn: true,
            buttons: {
                '确定': function(){
                    if(callback){
                        callback();
                        this.close();
                    }else{
                        this.close();
                    }
                }
            }
        });
        dialog.dialog('this')._options['_wrap'].addClass('login-dialog');
        return dialog;
    }

    function tipsBox(params){
        var Toast = function(config){
            this.context = config.context==null?$('body'):config.context;//上下文
            this.message = config.message;//显示内容
            this.time = config.time==null?3000:config.time;//持续时间
            this.left = config.left;//距容器左边的距离
            this.offset = config.offset;//距容器下方的距离
            this.timmer=null;
            this.init();
        };
        var msgEntity;
        Toast.prototype = {
            //初始化显示的位置内容等
            init : function(){
                $("#toastMessage").remove();
                //设置消息体
                var msgDIV = new Array();
                msgDIV.push('<div id="toastMessage">');
                msgDIV.push('<span>'+this.message+'</span>');
                msgDIV.push('</div>');
                msgEntity = $(msgDIV.join('')).appendTo(this.context);
                //设置消息样式
                var left = this.left == null ? this.context.width()/2-msgEntity.find('span').width()/2 : this.left;
                var offset = this.bottom == null ? '20px' : this.top;
                msgEntity.addClass("toastStyle");
                msgEntity.css({bottom:offset,'z-index':'999',left:left});
                msgEntity.hide();
            },
            //显示动画
            show :function(){
                msgEntity.show(this.time/2);
            },
            hide:function(){
                msgEntity.hide(this.time/3,function(){
                    $("#toastMessage").remove();
                });
            },
            auto:function(){
                msgEntity.show();
                setTimeout(function(){
                    msgEntity.hide();
                },this.time)
            }
        };
        return new Toast(params);
    }


    return {
        dialogBox:dialogBox,
        tipsBox:tipsBox
    }
});