---
title: Koa框架项目协同开发文档
enTitle: Koa General Framework Docs
date: 2019-12-05
author: Zico
category: Koa
visitable: 1
description: 一套用于快速开发Koa框架的协同开发规范
enDescription: A set of collaborative development specifications for rapid development of Koa framework
tags: 
 - NodeJs
 - Helper Docs
---

## 快速使用

* 开发部署

    安装package.json依赖配置

```cmd
npm install
```

* 运行测试

    测试环境采用了nodemon运行,会对当前src下的文件进行变化监听,如有改变会自动重新刷新启动;

    注意 => 对于定时任务的开发调试,请使用单元测试模式,避免不必要的刷新数据操作

```cmd
 npm run dev
```

## 约束与规范

良好的规范和适当的约束是项目开发健康的保证!

* 命名规范

    项目命名遵循小驼峰规则对文件名 / 模块名 / 函数名 / 变量名进行命名;  
    命名内容采用语义化单词,并尽量体现使用的语义;
    命名中尽量不采用复数形式命名,简化语义判断;

* 小驼峰

```javascript
testModel.js    √
TestModel.js    ×
test_model.js   ×
```

* 语义化

```javascript
rowToList.js    √
row2List.js     √
r2l.js          ×
getListingSummaryByBatch()      √
getList()                       ×
```

* 推荐单数

```javascript
/model/userModel.js             √
/models/usersModel.js           ×
```

* 语法规范

    根据约定本项目不采用编译和打包等方式进行开发,所以语法规范需要遵循NodeJs的CommonJS + es6 语法

```javascript
> 声明变量
var a = 1;      ×       //  es5 语法
let a = 1;      √       //  声明局部变量
const a = 1;    √       //  声明静态变量

> 模块引用
const lodash = require('lodash')    √       //  CommonJS
import lodash from 'lodssh'         ×       //  ECMAJS

> await后处理
let a = async function(){           推荐
    return await b();
}
//  async function的结果应该是期望得到一个Promise|any,而错误,应该由外部try catch进行捕获,简化逻辑层级结构

let a = async function(){           不推荐
    return await b().then(res=>res);
}
//  虽然Promise是期望得到的,但某些时候允许采用then进行结果集的预处理,再返回;
//  但不要从外部传入处理过程,会造成callback过于复杂,难以跟踪

let a = async function(){           不推荐
    return await b().catch(err=>err);
}
//  错误应该采用默认行为往外抛出,而非内部处理,此方法不推荐

let a = async function(){           不允许
    return await b().finally()
}
//  由于Promise的finally是es7 的2阶段语法,并非正式语法,不能使用
```

* 配置文档

    配置文档统一采用js格式进行编写,文件名命名中加上config.js后缀,标识为配置文件,配置文件中不包含逻辑过程;

### 架构结构

* 目录结构

    文件结构是遵循最小可运行原则设计,开发文件夹是 src / apps ,根据对应的应用模块进行开发,声明路由后,在Koa实例化后,采用routers方法,配置对应的apps名字即可

```yml
- src
    - core
        - service                               # 服务
        - config                                # 配置
        - dao                                   # 数据操作
        - helper                                # 助手类
        - lib                                   # 内部封装
        - middleware                            # 中间件
        - model                                 # 数据模型
        app.js                                  # Koa实例化入口
        router.js                               # 根路由文件

    - apps
        - demo
            - service                           # 服务
            - config                            # 配置
            - helper                            # 助手
            - model                             # 模块
            router.js                           # 应用路由

    - config                                    # 项目配置
        - db.config.js                          # 数据库配置
        - log.config.js                         # 日志模块配置
        - sys.config.js                         # 系统配置

    - unit                                      # 公用工具
        - kafkaClient.js                        # kafka客户端
        - logger.js                             # 日志工具
        - mongodb.js                            # mongodb封装
        - pm2.js                                # pm2工具
        - redisdb.js                            # redis封装
        - systemPath.js                         # 项目路径工具
        - units.js                              # 其他单体工具

    - logs                                      # 日志文件夹
    - test                                      # 测试文件夹
```
