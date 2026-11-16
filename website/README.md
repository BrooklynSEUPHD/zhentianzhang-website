# Personal Homepage — Zhentian Zhang

静态个人主页：不需要构建、不依赖任何外部 CDN，解压后把整个目录上传到任意静态服务器即可；本地双击 `index.html` 也能打开。

## 本次更新（v7）

1. **Personal Profile 重新设计**：首屏左列是姓名、现任状态位、联系按钮与 **Biography**，三段式、**两端对齐**（`components.css` 的 `.bio`）；右列是照片。窄屏（≤700px）自动退回左对齐，避免行太短时词距被拉开。
2. **新增「当前任职与学术服务」四张卡片**：现任职位 / 期刊编委 / 客座编委与专刊 / 研讨会组织，一屏罗列，数据全部取自学术履历，改一处两边同步。研讨会按时间由新到旧编号。
3. **Academic Record 新增两个区块**：**Editorship**（紧接 Positions 之后）与 **Guest Editorship & Special Issues**，子导航各加入口。编委与任职分开维护，任职时间线里不再混入编委条目。
4. **数据更新**：新增两篇论文（IEEE TWC 2026 一作、IEEE WCL 2026 Early Access 合作）；引用数改为 751（h-index 15、i10-index 27）；新增一项开放课题（RMB 15,000，2026.9–2027.9）。

## 本次更新（v6）

1. **小狗栏目改名**：导航与标题改为 **My Lovely Puppy**（中文仍为「我的小狗」），在 `i18n.js` 的 `sec.dog.*` 改。
2. **图片全部自适应图框**：照片按**原始比例完整显示、不裁切**（相册、纪念时刻、头像、证书都一样）；只限制最大高度（`base.css` 里的 `--photo-max*` 变量），保证整体版面比例依旧自然。竖图、横图、超宽图、方图都已验证比例不变形。
3. **状态位自动更新**：Personal Profile 下的当前状态自动取 `data.academic.js` 里 `SITE.POSITIONS` 的 `iso` 最新一条（职位 + 单位 + 时间），换工作只改 Positions 一处；`identity` 只作 Positions 为空时的兜底。
4. **Positions 与 Visiting Experience 拆开**：任职放 `SITE.POSITIONS`，访问交流放 `SITE.VISITING`，学术履历里两个独立区块、子导航各自入口。
5. **Awards 统一编号**：整个获奖区按时间由新到旧连续编号 `[1]…[22]`，不再按小类重新编号；同一奖项获奖两次**拆成两条**分别写（如 National Scholarship：Oct. 2025 与 Nov. 2024 各一条、各写证书号）。类别（Paper / Scholarship / Competition / Honour）以小标签显示。获奖总数指标改为自动统计。
6. **Supervision & Mentoring 编号**：按开始指导时间由新到旧编号（`people` 里的 `iso` 字段排序）。
7. **Workshop Organization 编号**：按时间由新到旧编号；Reviewer Service 保持无编号。
8. **Other Things About Me 调整**：Industrial Experience 改为纯文字时间线、不配图；**Certificates 支持配图**（`certificates` 条目加 `photo` 字段，图片放 `assets/img/certificates/`，按原比例显示）；Cambridge Business English Certificate (Higher, C1) 归入 Certificates，不再写在 Languages 里。

## 本次更新（v5）


1. **中英切换（左上角）**：`EN / 中文` 分段按钮。只切换界面文案（导航、栏目名、区块标题、按钮、提示）；论文标题、摘要、获奖名等内容保持英文原文。选择保存在浏览器里，刷新后保持；也可以用 `index.html?lang=zh` 强制指定。
2. **Personal Profile 只放稳定信息**：不再展示「当前职位 · 单位」，改为学位与研究方向这类基本不变的身份数据；当前任职只在 Academic Record › Positions 维护一处。论文数量等指标由脚本从论文数据自动统计，加论文不用改数字。
3. **配色去绿色系**：整体改为冷调石墨蓝（深靛蓝主色 + 青铜点缀），更克制、低饱和。想再调，改 `assets/css/base.css` 顶部的 `--accent` 等变量即可。
4. **Latest News 规范**：一条新闻只讲一件事（同一天获奖 + 入职拆成两条）；期刊／会议名一律写成「全称（缩写）」，如 `IEEE Journal on Selected Areas in Communications (IEEE JSAC)`，不再使用悬停显示全称。
5. **栏目合并**：Industrial Experience、Skills、Certificates 合并为 **Other Things About Me** 一个栏目，内部用小标签分区。
6. **删除易过时信息**：如「16 joint papers co-authored with the UCL hosts to date」这类会因遗漏而失效的计数。
7. **每篇论文的标题都是超链接**：47 篇有正式 DOI 或 arXiv 链接（逐篇核对过）；4 篇暂无正式链接（2 篇刚录用未上线、2 篇在审无预印本），标题暂指向按标题检索页，拿到 DOI 后在数据里补一行即可。

## 目录结构

```
website/
├── index.html                  页面骨架（含左上角中英切换按钮）
├── assets/
│   ├── css/
│   │   ├── base.css            设计变量（配色在这里改）＋基础排版
│   │   ├── layout.css          页眉 / 栏目条 / 双向页面系统
│   │   ├── components.css      卡片、时间线、新闻、图文等组件
│   │   └── publications.css    论文区样式
│   ├── js/
│   │   ├── i18n.js             界面文案字典（中／英）＋切换逻辑
│   │   ├── data.profile.js     站点信息 ＋ Personal Profile（稳定信息）
│   │   ├── data.news.js        Latest News
│   │   ├── data.publications.js  论文数据（唯一论文维护入口）
│   │   ├── data.academic.js    学术履历（教育/任职/访问/专利/项目/获奖/报告/指导/服务/教学）
│   │   ├── data.other.js       Other Things About Me（工业界＋技能＋证书）
│   │   ├── data.moments.js     Memorable Moments
│   │   ├── data.dog.js         My Lovely Puppy（模板，待填）
│   │   ├── render.js           模板层（标题链接、期刊名拼装都在这里）
│   │   └── app.js              装配与交互
│   └── img/                    照片按栏目分目录，各目录内有说明
└── README.md
```

## 日常维护

### 加一篇论文（`assets/js/data.publications.js`）

1. 在 `PUBLISHED`（已录用）或 `IN_REVIEW`（在审）里复制任意一条，改字段。
2. 标题链接：在条目里加一行 `links: { doi: '10.1109/xxxx.xxxxx' }`（或 `links: { arxiv: 'https://arxiv.org/abs/xxxx.xxxxx' }`）。没有正式链接时不写 `links`，页面会自动给标题挂一个按标题检索的链接。
3. 期刊名显示为「全称（缩写）」，由 `VENUES` 字典统一拼装，新期刊/会议在 `VENUES` 加一行即可。
4. `metrics.if` / `quartile` 只填确认过的数字，不填就不显示。

### 换工作 / 换职位

只改 `data.academic.js` 里 `SITE.POSITIONS`：加一条新经历（`iso` 写最新的年月）。Personal Profile 顶部的状态位会自动跟着最新一条走，页眉页脚都不引用当前单位，无需改动。访问交流（visiting / 短期访学）放 `SITE.VISITING`，与任职分开。

### 加编委 / 加专刊（`data.academic.js`）

- **常任编委**：改 `SITE.EDITORSHIPS`，字段为 `role`（如 `Editor`）、`venue`（刊物全称＋缩写）、`area`（分区/领域，可省）、`date`、`iso`。Academic Record 与 Personal Profile 都读这一份。
- **客座编委 / 专刊**：改 `SITE.SPECIAL_ISSUES`，字段为 `role`、`venue`、`title`（专刊主题）、`note`（可选，如原来的主题名）、`date`、`iso`。
- **任职**仍只放 `SITE.POSITIONS`，不要把编委塞进任职列表。

### 改 Biography（`data.profile.js`）

`SITE.PROFILE.bio` 是一个字符串数组，一项目一段，页面上按两端对齐排版。想让某段更长就加句子，不要用 `<br>` 手动断行。

### 加一条动态（`data.news.js`）

一条只写一件事；期刊／会议名写「全称（缩写）」；`iso` 只用于排序，`date` 是显示文字。

### 切换语言 / 改文案

- 文案在 `assets/js/i18n.js` 的 `SITE.UI` 里，`en` 和 `zh` 各一份同名 key；新增文案两边各写一行。
- 内容（论文、获奖、新闻正文）不翻译，保持英文。

### 照片

把图片放进对应栏目目录（`assets/img/<栏目>/`），文件名见各目录内说明；照片缺失时页面显示带路径提示的占位框，不影响排版。所有照片按**原始比例完整显示、不裁切**，横竖图都可以。My Lovely Puppy 内容替换完，把 `data.dog.js` 的 `template: true` 改为 `false`。

### 加奖项 / 加学生 / 加研讨会

- 奖项：`data.academic.js` 的 `SITE.AWARDS` 是一条扁平列表，加一条带 `iso`（排序用）、`date`（显示）、`title`、`text`、`category` 的条目即可；页面按时间由新到旧自动统一编号，获奖数指标自动更新。同一个奖拿两次就写两条。
- 指导学生：`SITE.MENTORING.people` 加一条带 `iso`（开始指导的年月）的条目，自动倒序编号。
- 研讨会：`SITE.SERVICE` 中 `numbered: true` 的组（Workshop Organization）按 `iso` 倒序自动编号。

## 验证

桌面（1440px）与手机（390px）两档已逐栏目截图验证：无脚本报错、无溢出；中英切换、语言记忆、论文链接、期刊名格式、Biography 两端对齐与四张角色卡片均已核验。
