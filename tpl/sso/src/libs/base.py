# -*- coding: utf-8 -*-
"""
    libs.base
    ~~~~~~~~~

    Base class: dependent services, connection information, and public information.

    :copyright: (c) 2019 by staugur.
    :license: BSD 3-Clause, see LICENSE for more details.
"""

from utils.tool import plugin_logger


class ServiceBase(object):
    """ 所有服务的基类 """

    def __init__(self):
        #设置全局超时时间(如连接超时)
        self.timeout = 2


class PluginBase(ServiceBase):
    """ 插件基类: 提供插件所需要的公共接口与扩展点 """
    
    def __init__(self):
        super(PluginBase, self).__init__()
        self.logger = plugin_logger


class CacheBase(ServiceBase):
    """ 缓存基类: 提供缓存数据功能，使用Flask-PluginKit提供的缓存接口 """

    def __init__(self):
        super(CacheBase, self).__init__()
        self.__cache = self.__redis_cache if hasattr(self, "redis") else self.__local_cache

    @property
    def __local_cache(self):
        from flask_pluginkit import LocalStorage
        return LocalStorage()

    @property
    def __redis_cache(self):
        from config import REDIS
        from flask_pluginkit import RedisStorage
        return RedisStorage(redis_url=REDIS)

    def set(self, key, value, timeout=None):
        return self.__cache.set(key, value)

    def get(self, key):
        return self.__cache.get(key)
