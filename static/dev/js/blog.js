require(['./common'], function (common) {
    require(["domReady","app/user/blogDo"],function(domReady,blogDo){
        domReady(function(){
            new blogDo().render();
        });
    });
});