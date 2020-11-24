---
title: NodeJs 开发工具笔记 01
enTitle: NodeJs Dev Tool notes 01
date: 2020-11-03
author: Zico
category: NodeJs
visitable: 1
description: 为了快速开展 NodeJs 工作而做的记录
enDescription: Records made in order to quickly start the work of NodeJs
tags:
 - NodeJs
slug: mongodb

---
## Yarn

[yarn](https://yarn.bootcss.com/)

由于npm的各种问题，在团队协作过程和项目部署等过程中，屡屡出错，最终我们还是选择了有那么一丁点门槛低Yarn作为我们整个团队的NodeJS Package管理工具，以统一使用；

### 安装

安装方法<https://yarn.bootcss.com/docs/install/#centos-stable>

### 使用

#### 初始化一个新项目

$ yarn init

#### 添加依赖包

$ yarn add [package]
$ yarn add [package]@[version]
$ yarn add [package]@[tag]

> 将依赖项添加到不同依赖项类别中
> 分别添加到 devDependencies、peerDependencies
> 和 optionalDependencies 类别中

$ yarn add [package] --dev
$ yarn add [package] --peer
$ yarn add [package] --optional

#### 升级依赖包

$ yarn upgrade [package]
$ yarn upgrade [package]@[version]
$ yarn upgrade [package]@[tag]

#### 移除依赖包

$ yarn remove [package]

#### 安装项目的全部依赖

$ yarn

`or`

$ yarn install
yarn 常用命令

## nvm

[nvm](https://github.com/nvm-sh/nvm)

nvm是一款可以方便切换NodeJS多个版本的工具，方便游走于不同时期的项目开发中

[中文手册](https://titangene.github.io/article/nvm.html)

## nrm

[官网](https://www.npmjs.com/package/nrm)

nrm是一款可以方便切换npm or yarn 不同源的工具，自带几个官方配置了可以说是分贴心

### 安装

$ npm install -g nrm

使用

### 列出源表

```doc
$ nrm ls


 npm -----  <https://registry.npmjs.org/>
  yarn ----- <https://registry.yarnpkg.com>
  cnpm ----  <http://r.cnpmjs.org/>
  taobao --  <https://registry.npm.taobao.org/>
  nj ------  <https://registry.nodejitsu.com/>
  skimdb -- <https://skimdb.npmjs.com/registry>
```

### 切换使用源

```doc
//switch registry to cnpm
$ nrm use cnpm  

    Registry has been set to: http://r.cnpmjs.org/
```

### 测试源速度

$ nrm test
  npm ---- 315ms

```dos
  yarn --- 360ms
  cnpm --- 689ms
  taobao - 2089ms
  nj ----- Fetch Error
  npmMirror  2867ms
  edunpm - 891ms
```
