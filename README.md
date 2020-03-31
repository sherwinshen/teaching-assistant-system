# 简介

本系统主要包含三大部分：教师端前台项目、学生端前台项目、后台接口项目。

>  开发环境 macOS 10.13.4  nodejs 8.9.3  Mongodb 3.4.2
>



## 技术栈

后台 : nodejs + express 

前台 : vue2.0 + Element-ui + Mint-UI + vuex + vue-router + axios + es6/7 

数据库 : mongodb + mongoose 



## 本地运行

1、启动mongodb服务和连接数据库

2、进入项目目录

- 进入server目录，启动服务器：node bin/www
- 进入teacher或student目录，启动前端：npm run dev
  - 教师端访问：http://localhost:8080
  - 学生端访问：http://localhost:8082



## 系统演示

点击[课堂教学辅助系统-演示视频](https://www.bilibili.com/video/BV1c64y1u7be/)进行查看，时长03:08。



## 功能列表

<img src='pic.png'>



## 开发说明

详见[课堂教学辅助系统-开发笔记](开发笔记.md)，当前项目代码结构的逻辑性存在一定缺陷，更清晰的项目结构可参考[Vue项目结构](https://github.com/MrEnvision/Front-end_learning_project/tree/master/vueProjectStructure)。



## 参考资料

开源项目：[基于 vue + element-ui 的后台管理系统](https://github.com/bailicangdu/vue2-manage)   [基于 vue2 + vuex 构建一个具有 45 个页面的大型单页面应用](https://github.com/bailicangdu/vue2-elm)

博客笔记：

- [node.js模块--formidable - CSDN博客](https://blog.csdn.net/charlene0824/article/details/51234394)
- [Node.js利用js-xlsx处理Excel文件的方法详解](http://www.jb51.net/article/117901.htm)
- [实例讲解遗传算法——基于遗传算法的自动组卷系统【实践篇】 - artwl - 博客园](http://www.cnblogs.com/artwl/archive/2011/05/20/2052262.html)
- [遗传算法在自动组卷中的应用 - CSDN博客](https://blog.csdn.net/qq_25237663/article/details/51742621)
- [node.js-formidable实现上传与下载文件 - 前轮 - SegmentFault 思否](https://segmentfault.com/a/1190000004057022)
- [nodejs中的中间件—Multer - CSDN博客](http://blog.csdn.net/charlene0824/article/details/51154059)
- [vue+element-ui的简洁导入导出功能 - 个人文章 - SegmentFault 思否](https://segmentfault.com/a/1190000012526934)
- [手摸手，带你用vue撸后台 系列二(登录权限篇) - CSDN博客](http://blog.csdn.net/qq_26562641/article/details/78291956)
- [Node读写Excel文件探究实践 | Aotu.io「凹凸实验室」](https://aotu.io/notes/2016/04/07/node-excel/)
- [前后端分手大师——MVVM 模式 - DOM哥 - 博客园](https://www.cnblogs.com/iovec/p/7840228.html)
- [Web应用系统的安全性设计](https://wenku.baidu.com/view/4a36d23984254b35effd3425.html)
- [Vue 爬坑之路（八）—— 使用 Echarts 创建图表 - WiseWrong - 博客园](https://www.cnblogs.com/wisewrong/p/6558001.html)
- [把nodejs项目部署到阿里云](https://blog.csdn.net/chenlinIT/article/details/73343793)



------

注1：由于本项目为毕业设计，为保证个人权益，暂时不共享服务端后台的相关代码。

注2：本项目仅供学习使用，项目中所使用的所有图标图片等相关版权为设计者所有。