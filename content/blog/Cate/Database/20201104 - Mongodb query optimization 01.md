---
title: MongoDb 查询优化 01
enTitle: Mongodb query optimization 01
createAt: 2020-11-04 09:11
author: Zico
category: Mongodb
visitable: 1
description: 千万级别MongoDB(集群)使用优化记录
enDescription: Million level MongoDB (cluster) to optimize the use of records
tags:
 - MongoDB
---

## 索引篇

> 在大批量数据查询中,能否利用索引来加快标的数据命中是优化查询效率的关键;

`索引简述`

MongoDB 的索引是采用标记实体数据储存的内存地址映射到实现，查找数据的时候使用索引，相当于利用明细地址去寻找一间餐厅，效率是最好的；

- 优点 - 寻址速度快；
- 缺点 - 索引大小随着数据量和索引字段的值集合增大而变大

`索引大小`

上述观点已经支持，索引的大小与数据量和索引字段的值有关，当数据量增大，单个索引所储存的索引区域内容就会变大；同理，索引字段包含的（不同）值越多，索引所需要记录的储存地址也会变大；

`索引种类`

索引的种类有好几种，这里只针对单列索引进行记录和优化；

- 单列索引
- 多列索引
- 多键索引
- 文本索引
- 2d
- 2dsphere
- hash索引

`索引对比`

![image-20201105090104291](https://raw.githubusercontent.com/zicokuo/zicoPicoGo/master/blog/imgs/20201105092307.png)

<center>图1 - 普通检索</center>

在没有使用索引的情况下，Mongodb的检索策略采用的是Collection scan（集合扫描），这是所有检索方式中最慢的一种，它会遍历当前搜索范围内的所有文档，一条条地去做条件比对；

假设集合数据量为1w条，那么就需要做1w次对比了，查询案例中，耗时2.5s；



![image-20201105092852772](https://raw.githubusercontent.com/zicokuo/zicoPicoGo/master/blog/imgs/20201105092854.png)

<center>图 2 - 加入没有索引的条件</center>

我们加入了一个created_at字段作为搜索条件，用于缩小检索范围，但是created_at字段并没有创建索引，可以从检索策略里看到依然采用的是Collection scan，在1w条数据的检索案例，依旧耗时约2.2s（由于被检索过的数据会进入Mongodb的缓存区域，所以比案例1要快一点）；



![image-20201105093336772](https://raw.githubusercontent.com/zicokuo/zicoPicoGo/master/blog/imgs/20201105093338.png)

![image-20201105093359942](https://raw.githubusercontent.com/zicokuo/zicoPicoGo/master/blog/imgs/20201105093403.png)