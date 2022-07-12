# ssr
- ssr：server side renderer
- 目的：减少白屏时间 + seo 
  - 页面的首屏需要等待JavaScript加载和执行完毕才能看到，这样白屏时间肯定比body内部写页面标签的要长一些
  - 搜索引擎的爬虫抓取到你的页面数据后，发现body是空的，也会认为你这个页面是空的，这对于SEO是很不利的
- 核心就是要实现在服务器端解析Vue的组件，直接把渲染结果返回给浏览器。

# @vue/server-renderer
- 用于服务端解析

