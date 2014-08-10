requirejs.config({
    baseUrl: '/static/'+WEB_RRESOURCE_DIR+'/js', //默认库寻址地址,相对页面地址
    //路径配置
    paths: {
        /*库依赖*/
        jquery: "lib/jquery",
        domReady: "lib/domReady",
        jqueryCookie:'lib/jquery.cookie',
        jqueryValidate:'lib/jquery.validate',
        bootstrap: "lib/bootstrap.min",
        underscore: 'lib/underscore',
        modernizr: "lib/modernizr.min",
        template: 'lib/arttemplate',
        matrix:"lib/matrix"
    },
    shim: {
        underscore: {
            exports: '_'
        },

        'domReady': {
            exports: "domReady"
        },

        'modernizr': {
            exports: "Mod"
        },

        'template': {
            exports: "template"
        },

        'matrix': {
            exports: "matrix"
        },

        "jqueryCookie":["jquery"],
        "jqueryValidate":["jquery"],
        'bootstrap': ["jquery"]
    }
});