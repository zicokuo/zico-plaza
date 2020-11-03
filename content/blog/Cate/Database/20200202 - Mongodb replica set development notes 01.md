---
title: MongoDb 副本集开发笔记01
enTitle: Mongodb replica set development notes 01
createAt: 2020-02-02 09:11
author: Zico
category: Mongodb
visitable: 1
description: MongoDB集群开发记录,有助于躲坑
enDescription: MongoDB cluster development record, helpful to avoid pits
tags:
 - MongoDB
---

> 分片副本集 开发纪要

## 集群

### 1. 分片寻址离散问题

1. 利用 MongoDB 分片均衡分布机制,使用\_id 作为均片键,可以增加不同范围集合查询和计算效率;

2. 同样利用均衡分布机制,采用时序升序权重较大的索引字段作为片键,可以使频繁查询相同集合进行倾斜存放,让单机性能查找性能提升,优化分片后寻址效率;

### 2. MongoDB 事务提交

Nodejs 中使用批量异步提交 MongoDB 操作，首先得开启 session,操作中传递 session 进去,最后 commit session，如果按 500 个数据记录就需要分片事务提交，那么就得预先储存多个 session，并且通过异步并发运行触发方法进行提交。

`解决方案`

通过批量声明 session 并暂存到数组,然后使用并发 async.parallel 进行提交;

## 查询

### 3. MongoDB Join 表

MongoDB Join 表是通过 aggregate 中\$lookup 方法进行 join 操作，join 后的记录集合会写入到 as 配置的字段中，此时数据集中存在嵌套文档的字段,实体相当于 leftJoin 的一棵树；

`1` lookup 之后，采用 unwind 获得相当于 union right 的集合,然后采用 addFields 把需要的字段添加到结果中；

`2` lookup 之后,直接采用 addFields 把需要的字段添加到结果集中,相当于 union 操作；

## 分片

> MongoDb 分片前需要采用 sh.addShare 添加分片库

`集合分片`

集合分片需要设定分片依赖的关键 key(片键),Mongodb 内部的均衡器(Balancer)将会定期对指定数据集合进行数据调度以达到分片间数据量均匀分布

`均匀分布`

采用默认片键的情况下(\_id),均匀分布的算法是根据\_id 的哈希值进行分簇(chunk),将不同的簇平铺到分片上;

均衡后,实际上数据是以一定量的小集合形式分散在各个分片上,当寻找数据的时候,命中多个分片,即等效并发查库;

若查询区域没有超出簇的寻址范围,实际上有效的查询只在命中范围的分片上,其他分片则会发生空转情况(即使没有数据,也要进行查库,并且获得结果);

## 注意和限制

### 4. Join 表查询

MongoDB 3.6 版本开始,官网已注明`$lookup的from表不允许是分片表`;

由此可见,由于分片查表的集合是通过多片查询结果集合并最终 MergeSet 结合成结果集然后再进行二次排序,这样对于分片的表来说,Join 操作会导致寻找分片上的数据区域无法预测(无法通过计算各个分片分布的片键区域来命中数据);

所以被 Join 的表不能是分片表;

### 5. MapReduce

MongoDB 从 4.2 版本开始,也对 MapReduce 进行了限制,分片表不再支持 MapReduce,并计划在未来的版本中进行废弃,暂时估计是由于集群之后,MapReduce 需要在 MergeSet 之后才能进行,因此在 MapReduce 之前就需要把结果集合全部找出来,然后再迭代,这样无论性能\内存和效率都大打折扣;

### 6. 游标

游标迭代查询对于优化大量数据的查找很有帮助,特别是针对 MongoDB 分片集群;

当 MongoDB 接收到游标任务后,winner plan 会根据 stage 进行多个数据库同步搜索,根据搜索条件,返回符合内容的结果集合的索引并 Merge 暂存到内存中;

MongoDB 根据结果集合的索引(假设是\_id)去先找出最小集合片(101 条记录或小于 4MB 的小片结果集合,又名 batchChunk),返回给游标进行迭代所用,当游标的偏移量(offset)往后移动超过小片结果集合的时候(OverBatch),集群将会继续根据已知的结果集合的索引,继续进行数据读取到内存,但是第二次的小片结果集合并不一定是 101 条,具体需要对集群当前可用资源分配情况而定,如此类推游标将会一片片小型结果集合进行单条同步迭代返回.

使用游标(cursor)的好处是方便对大数量的分片集合进行检索,减少一次性返回大量结果而造成资源和带宽的性能瓶颈;

### 7. foreach + 游标

MongoDB 分片表的迭代查询,可以利用`foreach` + `cursor` 来实现遍历,由于 MongoDB 游标默认有超时设置,需要在使用游标的时候,设置游标不过期(noCursorTimeout)

## 子文档

MongoDB 的 BSON 数据结构,让其能够支持文档嵌套(doc-subDoc);

子文档可以灵活的储存一些关联数据,用于关联查询的效率要比拆分为 2 个表要好;

子文档的操作可以说是寄生于父级文档;
