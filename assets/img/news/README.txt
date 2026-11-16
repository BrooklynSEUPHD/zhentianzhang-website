Latest News — 配图放在本目录

新闻默认纯文字；需要在某条动态旁配图时：
  1. 图片放进本目录
  2. 在 assets/js/data.news.js 对应条目加 photo: 'assets/img/news/xxx.jpg'
  3. 在 render.js 的 story 模板里启用该字段
新增动态只改 data.news.js，iso 字段决定排序（由近到远）
