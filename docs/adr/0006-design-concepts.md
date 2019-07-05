# 6. Design Concepts

日期: 2019-07-03

## 状态

2019-07-03 提议

## 背景

Inception 0 架构设计流程（需要一个更好的名字）

OPM => 事件 -> 过程 -> 状态（操作数）

过程：由业务 -> 组件，自底向下设计

1. 确认系统的形式与功能
   1. 确认系统路由（规则）/ 页面映射
2. 识别系统中的组件及其关系 / 隔离组件间的关系
   1. 具备形式与功能的组件
   2. 确定如何将系统初步分解为恰当的实体
   3. 用整体思维找出系统中的潜在组件
   4. 集中注意力，找系统中的重要组件
   5. 为组件创建抽象，或从组件中发现抽象
   6. 定义组件的边界，并与外围环境隔开
3. 确认组件之间的关系 
4. 确认系统中的基础组件

#### 组件设计原则

1. 组件之间可以联动，但是不能绑定
2. 组件之间的联动，由父级组件来控制

### 前端层次分解，分为：

1. 面向后端接口的 usecase 设计
2. 面向 UX 的设计系统设计
3. 面向业务的业务组件开发

#### usecase 设计：面向资源的 usecase 生成 

GET/POST/PUT/DELETE /blog

```
get-blog-by-id(s).usecase.ts
delete-blog-by-id(s).usecase.ts
update-blog-by-id(s).usecase.ts
get-blogs
create-blog
```

方式： Angular Schematics

#### 面向用户体验的页面生成 

方式：Components Code / Storybook / Sketch to DSL

YAML 示例：

表单类型

```
form: -> form fields -> input
                     -> checkbox
                     -> dropdown
                     -> select
                     -> radio
                     -> submit
                     -> toggle
      complex fields -> date picker
                     -> slidder
```

组件类型

```
card:
list -> item
item -> card
```

Hypertext -> Virtualdom 

#### 基于 JSON 的布局生成器

#### 面向前端的模型管理

1. 模型优化与类型检索
2. 重复模型管理

#### 基于组件的统一语言设计


#### 状态机管理的组件设计

empty -> loading -> success -> error -> more -> reloading

#### 独立于框架的组件

#### 组件化架构图生成

#### 基于工厂模式的表单校验

通用表单模式

#### DSL 形式的状态管理 or 状态管理生成 DSL 

#### 注解即用户文档

#### usecase 契约测试


#### Usecase 生成使用文档

#### 路由封装

路由即文档策略，中心化路由，生成页面调用关系。

示例：

Page blabla
Click blabla Button
Navto blabla Page

```
routeService.from('HomePage').goto('DetailPage')
```

## 决策

在这里补充上决策信息...

## 后果

在这里记录结果...
