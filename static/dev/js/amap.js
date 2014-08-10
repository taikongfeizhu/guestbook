require(['./common'], function (common) {
    require(["domReady","app/user/amapDo"],function(domReady,amapDo){
        domReady(function(){
            new amapDo().render();
        });
    });
});