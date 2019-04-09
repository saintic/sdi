## 关于git的使用实践


### 1、 .gitconfig

```bash
$ cat ~/.gitconfig
[user]
    name = Mr.tao
    email = staugur@saintic.com
[color]
    ui = true
[alias]
    st = status
    ci = commit
    co = checkout
    br = branch
    unstage = reset HEAD
    last = log -1
    logs = log --color --graph --pretty=format:'%Cred%h%Creset -%C(yellow)%d%Creset %s %Cgreen(%cr) %C(bold blue)<%an>%Creset' --abbrev-commit
    lg = log --color --pretty=oneline --abbrev-commit
[push]
    default = simple
[core]
    editor = vim
```


### 2、 .gitmessage

```bash
$ cat ~/.gitmessage

#
# head: <type>(<scope>): <subject>
# - type: feat, fix, docs, style, refactor, test, chore, perf
# - scope: can be empty (eg. if the change is a global or difficult to assign to a single component)
# - subject: start with verb (such as 'change'), 50-character line, english
#
# body: 72-character wrapped. This should answer:
# * Why was this change necessary?
# * How does it address the problem?
# * Are there any side effects?
#
# footer: 
# - Include a link to the ticket, if any.
# - BREAKING CHANGE
#

$ git config --global commit.template ~/.gitmessage

$ cat ~/.vimrc 
autocmd Filetype gitcommit setlocal spell textwidth=72
```


### 3、 gpg

```bash
$ gpg --gen-key
$ gpg --list-keys --keyid-format LONG
$ gpg --armor --export Your_GPG_ID
$ git config --global commit.gpgsign true
$ git config --global user.signingkey Your_GPG_ID
```


### 4、 强制提交信息规范的钩子

Please see [commit-msg.py](commit-msg.py "commit-msg.py")

```bash
$ cd GIT-PROJECT
$ wget -O .git/hooks/commit-msg https://satic.io/commit-msg && chmod +x .git/hooks/commit-msg
```


### 5、 开源协议使用规范

BSD 3-Clause License && Link Anti-996 License.

- For reStructuredText:
```reStructuredText
.. image:: https://img.shields.io/badge/link-996.icu-red.svg
   :target: https://996.icu
   :alt: 996.ICU
```

- For Markdown:
```markdown
[![996.ICU](https://img.shields.io/badge/link-996.icu-red.svg)](https://996.icu)
```

- For HTML:
```html
<a href="https://996.icu"><img src="https://img.shields.io/badge/link-996.icu-red.svg"></a>
```
