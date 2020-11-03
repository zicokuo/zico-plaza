---
title: Midway框架使用手册01
enTitle: Midway notes 01
createAt: 2020-11-03
author: Zico
category: Midway
visitable: 1
description: Midway框架是一款由阿里内部长期锤炼到上层Egg IoC框架，拥抱控制反响（依赖注入）的特点，让各个应用层解耦
enDescription: The Midway framework is an Egg IoC framework that has been tempered from within Alibaba for a long time. It embraces the characteristics of control response (dependency injection) and decouples each application layer
tags: 
 - NodeJs
 - Framework
 - Midway
 - backend
---

[Midway官方文档](https://midwayjs.org/midway/guide.html)

Midway框架是一款由阿里内部长期锤炼到上层Egg IoC框架，拥抱控制反响（依赖注入）的特点，让各个应用层解耦，目前拥有2种开发版本：Serverless 和 SaaS；

## 注入解耦

在Midway中，一个注入以来的例子如下：

```typescript
// src/app/service/LoggerService.ts
@provide('logger')
export class LoggerService{

 @inject()
 ctx : Context

 constructor(){
  ctx.logger = this;
  console.log('Logger is ready);
 }

log(){
  console.log(`Logger log ： `,...arguments)
  }
}

// src/app.ts
modules.exports = app => {
 app.beforeStart = () => {
  app.logger = app.applicationContext.getAsync('logger');
  }
}

// src/controller/test.ts
export TestController {
 index(){
   const {ctx} = this;
  ctx.logger.log('Controller Test is OK')
 }
}
```

这是很简单的一个Logger实现服务类，过程如下：

1. 通过provide方法为LoggerService正名为logger，存放于全局注入容器（container）中，并通过inject注入一个ctx（Context）然后给ctx绑定自身作为logger实例存在；

2. 在app的beforeStart生命周期中，通过app.appcationContext.getAsync获得对应名字的Class（app.applicationContext相当于全局注入容器了），getAsync默认会调用Class的construct方法；

3. 最终我们就可以在ctx上使用logger了；
