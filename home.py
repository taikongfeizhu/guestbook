# -*- coding: utf-8 -*-
import logging
import tornado.escape
import tornado.ioloop
import tornado.options
import tornado.web
import tornado.websocket
import os.path
import tornado.autoreload
from tornado.options import define, options
from book.index import *

#自定义部分

define("port", default=8888, help="run on the given port", type=int)
define("debug",default=True,help="Debug Mode",type=bool)

#数据库配置

class Application(tornado.web.Application):
    def __init__(self):
        handlers = [
            (r"/", MainDo),
            (r"/home", MainHandler),
        ]
        settings = dict(
            cookie_secret="61oETzKXQAGaYdkL5gEmGeJJFuYh7EQnp2XdTP1o/Vo=",
            template_path=os.path.join(os.path.dirname(__file__), "templates"),
            static_path=os.path.join(os.path.dirname(__file__), "static"),
            xsrf_cookies=True,
            debug=True
        )
        tornado.web.Application.__init__(self, handlers, **settings)


def main():
    tornado.options.parse_command_line()
    app = Application()
    app.listen(options.port)
    tornado.ioloop.IOLoop.instance().start()

if __name__ == "__main__":
    main()
