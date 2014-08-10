//符合AMD规范的写在前面
define(['modernizr', 'jquery', 'underscore', 'template'],
    function (Mod, $,_,template) {
        function HomePage() {
            this.tap = ("createTouch" in document) ? "touchstart" : "click";
            this.getDataBtn = $("#getData");
            this.postDataBtn = $("#postData");

        }

        HomePage.prototype.getCookie = function (name) {
            var r = document.cookie.match("\\b" + name + "=([^;]*)\\b");
            return r ? r[1] : undefined;
        };

        HomePage.prototype._init = function () {
            this.getData();
        };

        HomePage.prototype.getData = function () {
            var _this = this;

            _this.getDataBtn.on(_this.tap, function () {
                var params = {
                    name: "testMethod",
                    time: new Date().getTime()
                };

                $.get("/getData.do", params, function (data) {
                    alert(data.name + "--" + data.time);
                }, "json");
            });

            _this.postDataBtn.on(_this.tap, function () {
                var params = {
                    name: "jenking", age: 26, address: "Beijing"
                };
                params._xsrf = _this.getCookie("_xsrf");
                console.log($("input[name*='_xsrf']").val());
                $.ajax({
                    url: "/getData.do",
                    type: "post",
                    data: $.param(params),
                    dataType: "json",
                    success: function (data) {
                        alert(data.name + "---" + data.age + "---" + data.address);
                    }
                });
            });

            $("#delBtn").on(_this.tap,function(){
                var id=$("#entriesId").val();
                var params={
                    id:id
                };
                params._xsrf = _this.getCookie("_xsrf");
                $.post("/deleteData.do",params,function(res){
                    if(res.result){
                        alert(res.msg);
                        location.href="/database";
                    }
                },"json");
            });
        };

        HomePage.prototype.render = function () {
            this._init();
        };

        return HomePage;
    });
