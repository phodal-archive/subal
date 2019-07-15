# 领域事件

```
domain: 博客
  event: 博客已创建
  event: 博客已发布
  event: 博客已删除
  command: 编辑博客
domain: 事件
  event: 事件已发布
domain: 订阅
  event: 订阅已更新
```

# 路由

Role: User

| Page         | Route       |
|--------------|-------------|
| Home         | `/`         |
| Blog List    | `/blog`     | 
| Blog Detail  | `/blog/:id` |
| Blog Comment | `/blog/:id/comment` |
| Blog Comment Detail | `/blog/:id/comment/:commentId` |
| Blog Search  | `/search`   |

Role: Admin

| Page                   | Route       |
|------------------------|-------------|
| Admin Home             | `/admin/` |
| Admin Settings         | `/admin/settings` |
| Admin Page             | `/admin/page` |
| Admin Page Change      | `/admin/page/:id/change` |
| Admin BlogPost         | `/admin/blog/` |
| Admin BlogPost View    | `/admin/blog/:id` |
| Admin BlogPost Change  | `/admin/blog/:id/change` |
| Admin Comment          | `/admin/comment/` |
| Admin Comment Manage   | `/admin/comment/:id/change` |

Non-Functional

| Page         | Route          |
|--------------|----------------|
| Sitemaps     | `/sitemap.xml` |
| RSS          | `/sitemap.xml` |
| AMP          | `/amp`         |

# 用户行为  / 用户故事地图

抽象行为 DSL

```
Home: link('博客', top20-left20) -> List
List: card('博客 1', center) -> Detail

``` 

布局 DSL

```
top,bottom, center, left, right

百分比
```


# 基础组件

## 识别复用粒度

代码重复很糟糕，但是过度复用也糟糕


# 业务组件


