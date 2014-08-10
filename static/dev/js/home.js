require(['./common'], function (common) {
    require(["domReady","app/user/homeDo"],function(domReady,homeDo){
        domReady(function(){
            new homeDo().render();
        });
    });
});