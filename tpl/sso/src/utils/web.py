# -*- coding: utf-8 -*-
"""
    utils.web
    ~~~~~~~~~

    Common function for web.

    :copyright: (c) 2019 by staugur.
    :license: BSD 3-Clause, see LICENSE for more details.
"""

import json
from .tool import logger
from libs.base import CacheBase
from functools import wraps
from flask import g, request, redirect, url_for, abort

cache = CacheBase()

def get_referrer_url():
    """获取上一页地址"""
    if request.referrer and request.referrer.startswith(request.host_url) and request.endpoint and not "api." in request.endpoint:
        url = request.referrer
    else:
        url = None
    return url


def get_redirect_url(endpoint="front.index"):
    """获取重定向地址
    NextUrl: 引导重定向下一步地址
    ReturnUrl: 最终重定向地址
    以上两个不存在时，如果定义了非默认endpoint，则首先返回；否则返回referrer地址，不存在时返回endpoint默认主页
    """
    url = request.args.get('NextUrl') or request.args.get('ReturnUrl')
    if not url:
        if endpoint != "front.index":
            url = url_for(endpoint)
        else:
            url = get_referrer_url() or url_for(endpoint)
    return url


def login_required(f):
    @wraps(f)
    def decorated_function(*args, **kwargs):
        if not g.signin:
            return redirect(url_for('sso.Login'))
        return f(*args, **kwargs)
    return decorated_function


def anonymous_required(f):
    @wraps(f)
    def decorated_function(*args, **kwargs):
        if g.signin:
            return redirect(get_redirect_url())
        return f(*args, **kwargs)
    return decorated_function


def set_userinfo(uid, userinfo, expire=None):
    """ 缓存uid用户信息5min """
    if uid and isinstance(userinfo, dict):
        key = "Public:userinfo:{}".format(uid)
        source = get_userinfo(uid)
        source.update(userinfo)
        if source:
            try:
                cache.set(key, json.dumps(source))
            except Exception as e:
                logger.warn(e, exc_info=True)
            else:
                return True
    return False


def get_userinfo(uid):
    """ 查看缓存中uid对应的用户信息 """
    if uid:
        key = "Public:userinfo:{}".format(uid)
        try:
            data = json.loads(cache.get(key))
        except Exception as e:
            logger.debug(e)
        else:
            return data
    return dict()

