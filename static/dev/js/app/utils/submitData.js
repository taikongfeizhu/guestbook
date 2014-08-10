define(['jquery','app/utils/toast'],function($,toast) {
	return{
        send:function(type,url,data,successs,error,before){
            $.ajax({
                type:type,
                url:url,
                data:data,
                dataType:"json",
                success:successs,
                error:error||function(){toast.tipsBox({message:'页面请求失败'}).auto()},
                beforeSend:before||function(){toast.tipsBox({message:'处理中,请等待...'}).show()}
            });
        }
	}
});