({
    /* node r.js -o build.js
	 */
    appDir: '../',              //相对build.js的当前路径的所属地址
    baseUrl: './js',            //定位到appDir后，找到js脚本相对页面地址的位置
    dir: '../../dist',             //生成的文件地址
    modules: [
        //First set up the common build layer.
        {
            name: 'common'
        },
        {
            //module names are relative to baseUrl/paths config
            name: 'home',
            include: ["domReady","app/user/homeDo"],
            exclude: ['common']
        },
        {
            //module names are relative to baseUrl
            name: 'blog',
            include: ["domReady","app/user/blogDo"],
            exclude: ['common']
        },
        {
            //module names are relative to baseUrl
            name: 'amap',
            include: ["domReady","app/user/amapDo"],
            exclude: ['common']
        }

    ],
    fileExclusionRegExp: /^(r|build)\.js$/,
    optimizeCss: 'standard',
    removeCombined: true,
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
})