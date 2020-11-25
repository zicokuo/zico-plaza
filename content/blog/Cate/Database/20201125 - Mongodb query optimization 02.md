---
title: MongoDb 查询优化 02
enTitle: Mongodb query optimization 02
date: 2020-11-25 09:00
author: Zico
category: Mongodb
visitable: 1
description: 千万级别MongoDB(集群)使用优化记录02
enDescription: Million level MongoDB (cluster) to optimize the use of records 02
tags:
 - MongoDB
---

## 工具

工欲善其事，必先利其器；在使用 MongoDB 的过程中，我使用过 4 款数据库工具：

### 1. Navicat Premium 15

![image-20201125162745251](https://raw.githubusercontent.com/zicokuo/zicoPicoGo/master/blog/imgs/20201125162746.png)

Navicat Premium 是有名的数据库管理工具，简单直接的界面、左右结构、对数据库兼容性好是其卖点；

![image-20201125162906975](https://raw.githubusercontent.com/zicokuo/zicoPicoGo/master/blog/imgs/20201125162908.png)

<center>Navicat 运行界面</center>

Navicat Premium从12.1版本开始支持Mongodb数据库管理，但是对集群的支持还有所欠妥，根据使用经验，暂时的Premium版本对Mongodb的功能设计还是单机版，更优的使用体验及需要安装Navicat Mongodb专版了；

此处提出一个问题，在使用集群的时候，由于查询的实质是Cursor，但是集群的Cursor是一个集合体，这样Navicat Premium在处理查询Cursor会出现分片数据结果合并问题，导致Cursor报错，查询结果也停留在第一片区返回的数据集合，并非完整集合；

其次，Navicat对Mongodb的搜索决策并不关心，所以较难是使用Navicat进行检索优化校准；



### 2. Metabase

![image-20201125163434918](https://raw.githubusercontent.com/zicokuo/zicoPicoGo/master/blog/imgs/20201125163436.png)

<center>MetaBase v0.3</center>

MetaBase 是一款综合了数据查询管理和BI功能的软件，实际功能更偏向数据展示，通过类似PowerBI的功能，我们可以设定一些SQL，让MetaBase执行以查找需要的数据集合，并绑定图表直观的输出到web界面上；

MetaBase是可以独立部署和运行，通过dockers就可以方便部署；

MetaBase支持多种数据库连接，如下图：

![image-20201125163813415](https://raw.githubusercontent.com/zicokuo/zicoPicoGo/master/blog/imgs/20201125163814.png)

<center>MetaBase 支持的数据库驱动</center>

在MetaBase与Mongodb的实际使用过程中发现，MetaBase通过统一的查询规范来实现各种数据库之间的查询动作，从而能够让前端的BI图表都有统一的使用体现，但是这种大一统的做法，多少会带来兼容的差异；

在使用MetaBase对Mongodb进行数据周期性统计汇总并生成报表的过程中发现，统一的查询换来的是效率低下的检索策略，甚至有些根据时期进行GroupUp的搜索功能，在Mongodb中连使用指定索引的入口都没有，从而导致检索模式大多数仍未ItemScan，数据展示十分缓慢；

MetaBase还是偏向于实现图表功能，所以可以利用临时表或者只读表的机制，让MetaBase直接获取需要展示的数据，可以大量的提高查询效率；



### 3. Mongodb Compass

MongodbCompass是Mongodb官方出品的一款管理工具，也是官方在维护的；

Compass功能校对简单和易用，满足一般使用场景；

![image-20201125164457089](https://raw.githubusercontent.com/zicokuo/zicoPicoGo/master/blog/imgs/20201125164459.png)

<center>Mongodb Compass</center>

我在使用MongodbCompass的过程中，有过一段相当愉快的使用体验；

基于查询性能，Compass完全对标Cursor并对其进行了大量的查询优化，例如适量增加limit，缓存换页等；

基于策略，Compass比较完整展示了Explain Plan，较为清晰明细的展现了优胜策略的内容和结构；

![image-20201125164815384](https://raw.githubusercontent.com/zicokuo/zicoPicoGo/master/blog/imgs/20201125164816.png)

<center>优胜策略的执行示意图</center>

通过策略面板，我们可以调整查询策略、分析效率耗时、查找集群运行过程中的蛛丝马迹，MongodbCompass确实是一款不错的工具；





### 4. dbKoda



使用过MongodbCompass之后，还是挑出了些骨头的，例如检索过程界面过于臃肿、数据导出导入比较麻烦、网络响应比较慢等等问题；后来一位同事向我推荐了dbKoda，一款十分良心的开源Mongodb工具；

[dbKoda](https://www.dbkoda.com/)

![dbKoda界面](https://raw.githubusercontent.com/zicokuo/zicoPicoGo/master/blog/imgs/20201125165449.jpeg)

<center>dbKoda界面</center>

由于是开源实用性还是不错的，查询效率紧贴MongodbCompass，而且支持CursorNot timeOut（大批量数据查询不超时）和allowDiskUse（磁盘排序），对大批量数据查询支持较好。

dbKoda同样支持查询优胜策略的分析和展示



### 5. Studio 3T



