---
title: 前端标准富文本编辑器 - Quill
enTitle: Frontend standard rich text editor by Quill
date: 2020-11-19
author: Zico
category: Frontend
visitable: 1
description: 用于统一规范前端富文本编辑器,减少html输出差异化,兼容web与flutter
enDescription: It is used to standardize the front-end rich text editor, reduce the difference of HTML output, and is compatible with web and fluent
tags:
 - Frontend
 - RichText
 - Quill
---

# 序

富文本的发展伴随着 WEB 前端的发展已经走过一段时期；

从一开始的纯文本，到xml，再到html，再到混入式开发；

富文本一直承载着信息的多元化活跃在前端；

## 乱

多元化之后则是百花齐放的各种编辑器；

以下富文本编辑器都是比较出名的：

 - TinyMEC - Wordpress旧版本标配编辑器
 - UEditor（百度） - 国内系统标配
 - CkEditor - 经典中的经典
 - WangEditor - 后起之秀
 - KindEditor - 国内商城标配
 - BootstrapWysiwyg - 免费简单
 - Froala - 部分收费

多种编辑器的背后，产生的内容是各有规范，诸如视频播放器换个编辑器就识别不了是常态；

越来越多的差异化存在之后，带来的艰巨的维护任务了；

## 重整

Quill也是一款比较出名的富文本编辑器，Quill提出了一种利用 JSON 结构描述富文本样式的语法 -- Delta ，根据节点，让内容与样式拆分出来，达到规范化；

Delta语法并不需要人工维护，使用Quill内部的转换工具即可实现 `输入` - `代码` - `储存` - `渲染` 4个环节的双向转化；

# Quill

[官网](https://quilljs.com/)

![image-20201119172317059](https://raw.githubusercontent.com/zicokuo/zicoPicoGo/master/blog/imgs/20201119172319.png)

<center>Quill 编辑器界面</center>

## 部署

```javascript
// <link href="https://cdn.quilljs.com/1.2.6/quill.snow.css" rel="stylesheet">
// <script src="https://cdn.quilljs.com/1.2.6/quill.min.js"></script>

var quill = new Quill('#editor', {
  modules: {
    toolbar: '#toolbar'
  },
  theme: 'snow'
});

// Open your browser's developer console to try out the API!
```

也可以采用npm安装

<p class="codepen" data-height="443" data-theme-id="dark" data-default-tab="js,result" data-user="zicokuo" data-slug-hash="VwjOjJQ" style="height: 443px; box-sizing: border-box; display: flex; align-items: center; justify-content: center; border: 2px solid; margin: 1em 0; padding: 1em;" data-pen-title="Quill Playground">
  <span>See the Pen <a href="https://codepen.io/zicokuo/pen/VwjOjJQ">
  Quill Playground</a> by ZicoKuo (<a href="https://codepen.io/zicokuo">@zicokuo</a>)
  on <a href="https://codepen.io">CodePen</a>.</span>
</p>
<script async src="https://static.codepen.io/assets/embed/ei.js"></script>

<center>CodePen 调试</center>

## 配置

```javascript
var toolbarOptions = [
  ['bold', 'italic', 'underline', 'strike'],        // 切换按钮
  ['blockquote', 'code-block'],

  [{ 'header': 1 }, { 'header': 2 }],               // 用户自定义按钮值
  [{ 'list': 'ordered'}, { 'list': 'bullet' }],
  [{ 'script': 'sub'}, { 'script': 'super' }],      // 上标/下标
  [{ 'indent': '-1'}, { 'indent': '+1' }],          // 减少缩进/缩进
  [{ 'direction': 'rtl' }],                         // 文本下划线

  [{ 'size': ['small', false, 'large', 'huge'] }],  // 用户自定义下拉
  [{ 'header': [1, 2, 3, 4, 5, 6, false] }],

  [{ 'color': [] }, { 'background': [] }],          // 主题默认下拉，使用主题提供的值
  [{ 'font': [] }],
  [{ 'align': [] }],

  ['clean']                                         // 清除格式
];

var quill = new Quill('#editor', {
  modules: {
    toolbar: toolbarOptions
  },
  theme: 'snow'
});

 // 配置案例转自 https://www.jianshu.com/p/b237372f15cc
```

![image-20201123133011496](https://raw.githubusercontent.com/zicokuo/zicoPicoGo/master/blog/imgs/20201123133012.png)

<center>完整配置展示图</center>

## Delta

Delta大约是这样子：

```javascript
{
  ops: [
    { insert: 'Gandalf', attributes: { bold: true } },
    { insert: ' the ' },
    { insert: 'Grey', attributes: { color: '#cccccc' } }
  ]
}
```

简单来说，这是一种严谨模式的Json，按顺序记录了文本内容的动作、属性等，方便编译器编译和还原；

Delta的好处在于标准化拆分内容和样式之后，更利于保留内容的一致性；并且可以十分方便的去处html标签隐含的特殊字符、乱码等问题；

### Delta转换HTML

Npm包可以快速实现Delta转HTML

[NPM - DeltaDataToHTML](https://www.npmjs.com/package/quill-delta-to-html)

更多快捷用法可以参考：[NPM - Search for delta](https://www.npmjs.com/search?q=delta)

