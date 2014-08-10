# -*- coding: utf-8 -*-
__author__ = 'Administrator'
import logging
import tornado.escape
import tornado.ioloop
import tornado.options
import tornado.web
import tornado.websocket
import os.path
import uuid
import urllib
import urlparse
import tornado.autoreload
import allGlobal

class BaseHandler(tornado.web.RequestHandler):
    @property
    def db(self):
        return self.application.db

class MainHandler(BaseHandler):
    @staticmethod
    def add(x, y):
        return (x * y)

    def get(self):
        messages = ["httplib2", "loggin", "urllib", "urlparse"]
        data = {'title': 'from tornado', 'base': 'python2.7', 'author': 'jenking.wong'}
        num = [6, 2]
        self.render("home.html", title="welcome tornado", messages=messages, info=data, add=self.add, num=num,
                    WEB_RRESOURCE_DIR=allGlobal.WEB_RRESOURCE_DIR)

class AjaxHandler(BaseHandler):
    def post(self):
        name = self.get_argument("name")
        age = self.get_argument("age")
        address = self.get_argument("address")

        res = {
            'name': name,
            'age': age,
            'address': address
        }

        data = '[{"name":"huangjian","age":26},{"name":"jian","age":27}]'
        json = tornado.escape.json_decode(data)
        for v in json:
            logging.info(">> " + v["name"])

        self.write(tornado.escape.json_encode(res))

    def get(self):
        name = self.get_argument("name")
        time = self.get_argument("time")
        logging.info(name)
        res = {
            'name': name,
            'time': time
        }
        self.write(tornado.escape.json_encode(res))


class MainDo(BaseHandler):
    def get(self, *args, **kwargs):
        self.render("index.html",title="hello hj",message="hello",WEB_RRESOURCE_DIR=allGlobal.WEB_RRESOURCE_DIR)


    def post(self, *args, **kwargs):
        pass





