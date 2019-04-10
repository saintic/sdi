# -*- coding: utf-8 -*-
"""
    main
    ~~~~

    Entrance

    Docstring conventions:
    http://flask.pocoo.org/docs/0.10/styleguide/#docstrings

    Comments:
    http://flask.pocoo.org/docs/0.10/styleguide/#comments

    Cache:
    http://docs.jinkan.org/docs/flask/patterns/caching.html

    :copyright: (c) 2019 by staugur.
    :license: BSD 3-Clause, see LICENSE for more details.
"""

from os import urandom
from flask import request, g, jsonify
from flask_pluginkit import Flask, PluginManager
from version import __version__
from utils.tool import err_logger, access_logger, plugin_logger
from utils.web import get_redirect_url, get_userinfo, set_userinfo
from views.FrontView import FrontBlueprint

__author__ = 'staugur'
__email__ = 'staugur@saintic.com'
__doc__ = 'xxx'
__date__ = 'xxx'

# 初始化定义application
app = Flask(__name__)
app.config.update(
    SECRET_KEY=urandom(24),
    PLUGINKIT_SETUSERINFO_CALLBACK=set_userinfo
)

# 初始化插件管理器
plugin = PluginManager(app, stpl=True, logger=plugin_logger, plugin_packages=["flask_pluginkit_ssoclient"])

# 注册视图包中蓝图
app.register_blueprint(FrontBlueprint)

# 添加模板上下文变量
@app.context_processor
def GlobalTemplateVariables():
    data = {"Version": __version__, "Author": __author__, "Email": __email__, "Doc": __doc__}
    return data


@app.before_request
def before_request():
    # 用户信息
    g.userinfo = get_userinfo(g.uid)
    # 客户端IP地址
    g.ip = request.headers.get('X-Real-Ip', request.remote_addr)
    # 仅是重定向页面快捷定义
    g.redirect_uri = get_redirect_url()


if __name__ == '__main__':
    from config import GLOBAL
    app.run(host=GLOBAL["Host"], port=int(GLOBAL["Port"]), debug=True)
