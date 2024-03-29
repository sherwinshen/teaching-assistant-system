# 课堂教学辅助系统开发笔记

# 1、服务器端（含数据库）

> 服务器端使用 Nodejs + Express，数据库使用 MongoDB + Mongoose

- 初始化package.json文件

```sh
$ npm init
```

- 安装ExpressJS

```shell
$ npm install express --save
```

- 运行 Express 应用程序生成器，快速创建一个应用的骨架

```shell
$ npx express-generator
```

- 安装Mongoose

```shell
$ npm install mongoose --save
```

- 连接数据库

```javascript
const mongoose = require('mongoose'), 
const mongoose = require('mongoose');
mongoose.connect('mongodb://127.0.0.1:27017/数据库名字', {useNewUrlParser: true, useUnifiedTopology: true}, function (err) {
    if (err) {
        console.log('Connection Error:' + err)
    } else {
        console.log('Connection success!')
    }
});
```

- 创建Scheme，生成Model，并应用

```javascript
// 举例

// model/teachers.js
const mongoose = require('mongoose'), 
const teacherSchema = new mongoose.Schema({
	// 定义字段
})
module.exports = mongoose.model("Teacher", teacherSchema);

// 操作文件.js
const Teacher = require('./../model/teachers');
Teacher.findOne(param, function (err, doc) {
	if (err) {
		console.log("Error:" + err);
	}
	else {
		console.log("Res:" + res);
	}
});
```

- 启动服务器

```shell
$ DEBUG=projectName:* npm start
```

# 2、前端（教师端+学生端）

> 前端使用 Vuejs + Vuex + axios +ElementUI + MintUI

- 初始化vue项目

```shell
$ npm init webpack teacher
```

- 安装项目所需依赖包

```shell
$ npm i -S mint-ui element-ui vuex
......
```

- 本地启动项目

```shell
$ npm run dev
```

# 3、前后端跨域

- 安装axios

```shell
$ npm install axios
```

- 请求示例

```javascript
// get
axios.get('/user?ID=12345')
  .then(function (response) {
    console.log(response);
  })
  .catch(function (error) {
    console.log(error);
  });
// post
axios.post('/user', {
    firstName: 'Fred',
    lastName: 'Flintstone'
  })
  .then(function (response) {
    console.log(response);
  })
  .catch(function (error) {
    console.log(error);
  });
// 多个请求
function getUserAccount() {
  return axios.get('/user/12345');
}
function getUserPermissions() {
  return axios.get('/user/12345/permissions');
}
axios.all([getUserAccount(), getUserPermissions()])
  .then(axios.spread(function (acct, perms) {
    // 两个请求现在都执行完成
  }));
```

- 跨域设置（本地开发）- config/index.js 文件进行配置

```javascript
module.exports = {
dev: {
  env: require('./dev.env'),
  port: 8080,
  autoOpenBrowser: true,
  assetsSubDirectory: 'static',
  assetsPublicPath: '/',
  proxyTable: {
    '/api': {
      target: 'http://www.abc.com',  //目标接口域名
      changeOrigin: true,  //是否跨域
      pathRewrite: {
        '^/api': '/'   //重写接口，实际请求去掉/api以空字符串代替
      }
    },
  cssSourceMap: false
}
}

// 说明：上述设置就可以将本地8080端口的一个请求代理到了http://www.abc.com这一域名，例如请求 'http://localhost:8080/api/getName' ===> 'http://www.abc.com/getName'
// '/api' 为匹配项，target 为被请求的地址，实际请求地址中不需要'/api'，则利用pathRewrite重写接口，也可以自定义
```

- 跨域设置（生产环境）- 对nginx.conf文件进行配置

```javascript
// 默认配置
location / {
    root   html; #文件根目录
    index  index.html index.htm; #默认起始页
}

// 更改配置
location / {
    root   D:\cross-demo\dist #直接指向vue打包后的文件，也可以方到nginx的html文件夹，就无须更改
    index  index.html index.htm;
}
location /api/ {
        proxy_pass http://localhost:8888/; # 将地址代理到api上
}
// 本地访问 http://localhost:8080/api/getName  ===>  http://localhost:8888/getName

// 常见配置选项
location /api/ {  
    proxy_pass http://localhost:8888/;
    proxy_pass_request_headers on;
    proxy_set_header Connection "";       
    client_max_body_size    30m;
    client_body_buffer_size 128k; 
    proxy_redirect off;
    proxy_connect_timeout   300;
    proxy_send_timeout      300;
    proxy_read_timeout      300;
    proxy_buffer_size       4k;
    proxy_buffers           4 32k;
    proxy_busy_buffers_size 64k;
    proxy_temp_file_write_size 64k;
    proxy_next_upstream http_502 http_504 error invalid_header; 
}
```

参考链接：[前端如何使用proxyTable和nginx解决跨域问题](https://www.cnblogs.com/webhmy/p/9340361.html)

------

如果发现本项目有内容上的错误，欢迎提交 issues 进行指正，相关合作请邮件联系[EnvisionShen@gmail.com](mailto:EnvisionShen@gmail.com)
