## 项目规范

- 我的博客：https://blog.saintic.com

- 文档地址：http://docs.saintic.com

- 仓库地址：https://github.com/staugur && https://github.com/saintic

- 项目模板：

    - [sso模板及规范](tpl/sso)
        * 相关Web类程序大多基于[Flask-PluginKit](https://github.com/staugur/Flask-PluginKit)
        * 相关认证服务(注册、统一登录与注销、用户设置与资料)均基于[Passport](https://github.com/staugur/passport)
        * 程序源代码目录均为`src`，入口文件均为`src/main.py`，配置文件均为`src/config.py`
        * 配置文件中MYSQL段格式 `mysql://host:port:user:password:database`，其他参数默认即可
        * 配置文件中REDIS段格式`redis://[:password]@host:port/db`，若无密码请省略`[:password]`
        * 配置文件中文档未提及的参数请参考文件内部注释
        * 配置方法均采用“先环境变量-后默认值”的方式，使用os.getenv函数，请自行了解此函数
        * 生产环境启动脚本`src/online_gunicorn.sh`

    - simple [暂未整理]


## Git规范

- [关于git的相关配置（gpg、gitmessage、hook）](git.md)


## 提交问题

* 提交问题：[issues](http://satic.io/n "封存仓库请在此提交issue")

* 加入Q群：[`577543189`](https://jq.qq.com/?_wv=1027&k=5aZyCMV)

* 收邮件：[staugur@saintic.com](mailto:staugur@saintic.com)
