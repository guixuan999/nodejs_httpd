# 用nodejs搭建简易的HTTP服务器

## 目的

* 学习nodejs相关知识
* 测试一些需要连接服务器的功能，可以自定义服务器返回给客户端的数据格式，例如文本、图片、json文件、xml文件等。

## 安装nodejs

下载地址：https://nodejs.org/en/download/

## 安装python包

$ pip install geoip2
(这个是为了查找http客户端的地理位置)

## 启动Server

```language
$ node index.js
Server has started.
```

## 支持的URL

```language
API
    GET http://localhost:9009
    GET http://localhost:9009/api/hi?firstname=XX&lastname=YY
    GET http://localhost:9009/api/classmates/all?gender=male  (or female)

静态文件
    将静态文件，如html/css/js/jpg..., 放入 static/path/to/file
    就可以通过下面的形式访问文件
    
    GET http://localhost:9009/path/to/file
    
```

## OneNet IoT API example
$ node index.js &

启动OneNet IoT API代理后端
$ python main.py    (python 版本)
或
$  ./onenet_dp      (golang 版本)

浏览器打开 http://<HOST>/dp.html, 点击按钮可取datapoints一次
