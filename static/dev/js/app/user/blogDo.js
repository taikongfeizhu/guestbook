//符合AMD规范的写在前面
define(['modernizr', 'jquery', 'underscore', 'template',"app/utils/toast","app/utils/submitData"],
    function (Mod, $,_,template,toast,submitData) {
        function BlogPage() {
            this.tap = ("createTouch" in document) ? "touchstart" : "click";
            this.blogGetDataBtn = $("#blogGetData");
            this.blogPostDataBtn = $("#blogPostData");
            this.loadingTips = $("#res");
        }

        BlogPage.prototype.getCookie = function (name) {
            var r = document.cookie.match("\\b" + name + "=([^;]*)\\b");
            return r ? r[1] : undefined;
        };

        BlogPage.prototype._init = function () {
            this.getData();
            //toast.tipsBox({message:'请求测试'}).auto();
        };

        BlogPage.prototype.getData = function () {
            var _this = this;

            _this.blogGetDataBtn.on(_this.tap, function () {
                var params = {
                    name: "黄健",
                    age: 26
                };

                $.ajax({
                    url: "/blogData.do",
                    type: "get",
                    data: params,
                    dataType: "json",
                    success: function (data) {
                        _this.loadingTips.html(JSON.stringify(data));
                    },
                    beforeSend: function () {
                        _this.loadingTips.html("数据请求中...");
                    }
                });
            });

            _this.blogPostDataBtn.on(_this.tap, function () {
                var params = {
                    name: "昌平",
                    age: 26
                };
                params._xsrf = _this.getCookie("_xsrf");
                $.ajax({
                    url: "/blogData.do",
                    type: "post",
                    data: $.param(params),
                    dataType: "json",
                    beforeSend: function (data) {
                        _this.loadingTips.html("数据请求中...");
                    },
                    success: function (data) {
                        _this.loadingTips.html(JSON.stringify(data));
                    }
                });
            });
        };

        BlogPage.prototype.render = function () {
            this._init();
        };

        return BlogPage;
    });
