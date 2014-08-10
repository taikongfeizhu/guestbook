//符合AMD规范的写在前面
define(['modernizr', 'jquery', 'underscore', 'template'],
    function (Mod, $,_,template) {
        function AmapPage() {
            this.tap = ("createTouch" in document) ? "touchstart" : "click";
            this.getSpecialfirstBtn = $("#amapSpecialfirst");
            this.getSpecialAllBtn = $("#amapSpecialAll");
            this.getTimeBtn = $("#amapGetTime");
            this.postDataBtn = $("#amapPostData");
            this.loadingTips = $("#res");
        }

        AmapPage.prototype.getCookie = function (name) {
            var r = document.cookie.match("\\b" + name + "=([^;]*)\\b");
            return r ? r[1] : undefined;
        };

        AmapPage.prototype._init = function () {
            this.getData();
        };

        AmapPage.prototype.query=function(url){
            var _this=this;
            var params = {
                queryAddress:url,
                clientversion: "6.4.0"
            };

            $.ajax({
                url: "/amapData.do",
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
        };


        AmapPage.prototype.getData = function () {
            var _this = this;
            _this.getSpecialfirstBtn.on(_this.tap, function () {
                _this.query("specialfirst")
            });

            _this.getSpecialAllBtn.on(_this.tap, function () {
                _this.query("specialall")
            });

            _this.getTimeBtn.on(_this.tap, function () {
                _this.query("curtime")
            });

            _this.postDataBtn.on(_this.tap, function () {

            });
        };

        AmapPage.prototype.render = function () {
            this._init();
        };

        return AmapPage;
    });
