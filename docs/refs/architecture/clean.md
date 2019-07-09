# 铺垫

## RESTful 的微服务 API

```
/api/blog/:id
/api/comment/:id
```

对应的 Controller 可能是 BlogController, CommentController

传统的 Angular 应用，使用提 BlogService，在 Service 里进行 HTTP 管理

## 全功能团队

 - 找到应用的前端代码，怎么快速找？
 - 找到对应的后端代码，
 - 前后端模型对应


# 领域映射

Controller -> Repository -> Usecase -> Component

Controller -> Output <- Input <- Repository

Service


# 垂直  + 水平 分层

# usecase 作为逻辑层/防腐层

Usecase 的复用率极低，项目会因而急剧的增加类和重复代码。

 - 业务逻辑处理
 - 返回数据管理
 - 输入参数管理

RESTful 开头 GET/POST/DELETE/PUT

UPDATE / SEARCH

Entities vs Use Cases 对比：https://crosp.net/blog/software-architecture/clean-architecture-part-2-the-clean-architecture/

Usecase 太重：https://stackoverflow.com/questions/43191985/android-clean-architecture-usecase-for-each-method-of-repository

# usecase + repository vs services

# 模型管理

 - Request Model / Response Model
 - Response Entity
 - ViewModel /  Component Model


# 目录结构

 - presentation
 - shared
 - pages
 - features
 - domain
 - core

# Clean 吗？

不 Clean。

表单验证，Reactive-Form

# 下一步

代码生成 Angular Schematics，根据 URL 命名

问题：https://news.ycombinator.com/item?id=14686726

