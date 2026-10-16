/* ==========================================================================
   i18n.js — 界面文案（中／英）
   --------------------------------------------------------------------------
   只管「固定文本」：导航、栏目名、区块标题、按钮、提示。
   论文标题、摘要、获奖名称等「内容」一律保持英文，不做翻译。

   加一句新文案：在 en 和 zh 里各写一条同名的 key 即可；
   只写了 en 没写 zh 时，中文界面会回退到英文，不会报错。

   用法：
     SITE.t('sec.profile.title')            // 取当前语言文案
     SITE.t('pub.entries', { n: 24 })       // 带占位符 {n}
     SITE.setLang('zh')                     // 切换语言（会触发重绘）
   ========================================================================== */

window.SITE = window.SITE || {};

SITE.UI = {
  /* ---------------------------------- EN ---------------------------------- */
  en: {
    'site.skip': 'Skip to main content',
    'site.lastUpdated': 'Last updated',
    'site.backTop': 'Back to top',
    'site.email': 'Email',
    'site.copyright': 'All rights reserved',
    'site.langSwitch': 'Switch language',

    'sec.dog.label': 'My Lovely Puppy',
    'sec.dog.title': 'My Lovely Puppy',
    'sec.dog.sub': 'The co-author of everyday life.',
    'sec.profile.label': 'Personal Profile',
    'sec.profile.title': 'Personal Profile',
    'sec.profile.sub': 'Who I am, what I work on, and how to reach me.',
    'sec.news.label': 'Latest News',
    'sec.news.title': 'Latest News',
    'sec.news.sub': 'Recent updates, newest first.',
    'sec.academic.label': 'Academic Record',
    'sec.academic.title': 'Academic Record',
    'sec.academic.sub': 'Education, publications, patents, grants, awards, talks and service.',
    'sec.other.label': 'Other Things About Me',
    'sec.other.title': 'Other Things About Me',
    'sec.other.sub': 'Industrial practice, technical skills and certifications.',
    'sec.moments.label': 'Memorable Moments',
    'sec.moments.title': 'Memorable Moments',
    'sec.moments.sub': 'People, places and milestones worth keeping.',

    'nav.academicAria': 'Subsections',

    'sub.education': 'Education',
    'sub.positions': 'Positions',
    'sub.visiting': 'Visiting Experience',
    'sub.publications': 'Publications',
    'sub.patents': 'Patents',
    'sub.grants': 'Grants',
    'sub.awards': 'Awards',
    'sub.talks': 'Talks',
    'sub.mentoring': 'Mentoring',
    'sub.service': 'Service',
    'sub.teaching': 'Teaching',
    'sub.industry': 'Industrial Experience',
    'sub.skills': 'Skills',
    'sub.certificates': 'Certificates',

    'profile.glance': 'At a glance',
    'profile.research': 'Research Interests',
    'profile.contact': 'Contact',
    'profile.contactLead': 'Email:',
    'profile.affiliationNote': 'Current position is maintained under Academic Record · Positions.',

    'metric.entries': 'publications in total',
    'metric.firstAuthored': 'first-authored publications',
    'metric.firstIeeeJournal': 'first-author IEEE journal articles',
    'metric.citations': 'citations',
    'metric.patents': 'granted CN invention patents',
    'metric.awards': 'awards, scholarships & honours',
    'metric.themes': 'themes',

    'news.title': 'Latest News',
    'news.count': 'updates',

    'pub.title': 'Publications',
    'pub.subNote': 'sorted by type, then authorship',
    'pub.view.type': 'Type first',
    'pub.view.author': 'Author order',
    'pub.view.venue': 'Group by journal',
    'pub.viewAria': 'Sorting view',
    'pub.hint': 'Sorting: {view} · bold name = first author · journal names shown as full title (abbreviation)',
    'pub.accepted': 'Accepted & Published',
    'pub.review': 'Under Review & Preprint',
    'pub.entries': 'entries',
    'pub.empty': 'No entries yet.',
    'pub.contribution': 'Contribution',
    'pub.statJournal': 'journal articles',
    'pub.statConf': 'conference papers',
    'pub.statReview': 'manuscripts under review',
    'pub.statFirst': 'first-authored',
    'pub.journalArticles': 'Journal Articles',
    'pub.conferenceProceedings': 'Conference Proceedings',
    'pub.firstAuthorJournal': 'First-author journal articles',
    'pub.firstAuthorConf': 'First-author conference papers',
    'pub.coAuthorJournal': 'Co-authored journal articles',
    'pub.coAuthorConf': 'Co-authored conference papers',
    'pub.papers': 'papers',
    'pub.paper': 'paper',
    'pub.corresponding': '(corresponding author)',

    'academic.positions': 'Positions',
    'academic.visiting': 'Visiting Experience',
    'academic.patents': 'Patents',
    'academic.granted': 'granted',
    'academic.grants': 'Research Grants & Projects',
    'academic.projects': 'projects',
    'academic.awards': 'Awards, Scholarships & Honours',
    'academic.awardsCount': 'awards',
    'academic.talks': 'Invited Talks',
    'academic.talksCount': 'talks',
    'academic.mentoring': 'Supervision & Mentoring',
    'academic.mentees': 'mentees',
    'academic.service': 'Service & Conference Organization',
    'academic.teaching': 'Teaching Experience',

    'other.lead': 'Industrial R&D and engineering practice on the RF and baseband side, together with the technical skills and certifications behind the day-to-day work.',
    'other.industryLead': 'Engineering practice on the RF and baseband side, complementing the theory-driven work in academia.',
    'other.skillsLead': 'Tools and languages used across simulation, testbeds and manuscript preparation.',
    'other.certLead': 'Formal qualifications outside the core research area.',
    'other.rolesCount': 'roles',

    'moments.lead': 'People, places and small milestones worth keeping. Photos go to <code>assets/img/moments/</code>.',

    'dog.tplNote': 'Template content · replace the text in <code>assets/js/data.dog.js</code>, and drop photos into <code>assets/img/dog/</code>',
    'dog.photoHint': 'Photos go to <code>assets/img/dog/</code>.',

    'common.present': 'present'
  },

  /* ---------------------------------- ZH ---------------------------------- */
  zh: {
    'site.skip': '跳到主要内容',
    'site.lastUpdated': '最近更新',
    'site.backTop': '回到顶部',
    'site.email': '邮箱',
    'site.copyright': '版权所有',
    'site.langSwitch': '切换语言',

    'sec.dog.label': '我的小狗',
    'sec.dog.title': '我的小狗',
    'sec.dog.sub': '日常生活的共同作者，我的小狗。',
    'sec.profile.label': '个人简介',
    'sec.profile.title': '个人简介',
    'sec.profile.sub': '我是谁、研究什么、如何联系。',
    'sec.news.label': '最新动态',
    'sec.news.title': '最新动态',
    'sec.news.sub': '最近的更新，由新到旧。',
    'sec.academic.label': '学术履历',
    'sec.academic.title': '学术履历',
    'sec.academic.sub': '教育、论文、专利、项目、获奖、报告与服务。',
    'sec.other.label': '关于我的其他事',
    'sec.other.title': '关于我的其他事',
    'sec.other.sub': '工业界实践、技术技能与资质证书。',
    'sec.moments.label': '值得记住的时刻',
    'sec.moments.title': '值得记住的时刻',
    'sec.moments.sub': '值得留下的人、地点与节点。',

    'nav.academicAria': '子栏目',

    'sub.education': '教育经历',
    'sub.positions': '任职经历',
    'sub.visiting': '访问经历',
    'sub.publications': '论文',
    'sub.patents': '专利',
    'sub.grants': '科研项目',
    'sub.awards': '获奖',
    'sub.talks': '学术报告',
    'sub.mentoring': '指导学生',
    'sub.service': '学术服务',
    'sub.teaching': '教学经历',
    'sub.industry': '工业界经历',
    'sub.skills': '技能',
    'sub.certificates': '证书',

    'profile.glance': '一览',
    'profile.research': '研究兴趣',
    'profile.contact': '联系方式',
    'profile.contactLead': '邮箱：',
    'profile.affiliationNote': '当前任职信息在「学术履历 · 任职经历」中维护。',

    'metric.entries': '篇论文（期刊＋会议）',
    'metric.firstAuthored': '篇一作论文',
    'metric.firstIeeeJournal': '篇一作 IEEE 期刊论文',
    'metric.citations': '次引用',
    'metric.patents': '项已授权中国发明专利',
    'metric.awards': '项奖励与荣誉',
    'metric.themes': '个方向',

    'news.title': '最新动态',
    'news.count': '条更新',

    'pub.title': '论文',
    'pub.subNote': '按类型排序，再按作者序',
    'pub.view.type': '按类型',
    'pub.view.author': '按作者序',
    'pub.view.venue': '按期刊归组',
    'pub.viewAria': '排序方式',
    'pub.hint': '当前排序：{view} · 加粗为一作 · 期刊名以「全称（缩写）」显示',
    'pub.accepted': '已录用与已发表',
    'pub.review': '在审与预印本',
    'pub.entries': '条',
    'pub.empty': '暂无条目。',
    'pub.contribution': '贡献说明',
    'pub.statJournal': '篇期刊论文',
    'pub.statConf': '篇会议论文',
    'pub.statReview': '篇在审稿件',
    'pub.statFirst': '篇一作',
    'pub.journalArticles': '期刊论文',
    'pub.conferenceProceedings': '会议论文',
    'pub.firstAuthorJournal': '一作期刊论文',
    'pub.firstAuthorConf': '一作会议论文',
    'pub.coAuthorJournal': '合作期刊论文',
    'pub.coAuthorConf': '合作会议论文',
    'pub.papers': '篇',
    'pub.paper': '篇',
    'pub.corresponding': '（通讯作者）',

    'academic.positions': '任职经历',
    'academic.visiting': '访问经历',
    'academic.patents': '专利',
    'academic.granted': '项已授权',
    'academic.grants': '科研项目',
    'academic.projects': '个项目',
    'academic.awards': '奖励、奖学金与荣誉',
    'academic.awardsCount': '项',
    'academic.talks': '受邀报告',
    'academic.talksCount': '场报告',
    'academic.mentoring': '指导与培养',
    'academic.mentees': '位学生',
    'academic.service': '学术服务与会议组织',
    'academic.teaching': '教学经历',

    'other.lead': '射频与基带方向的工业研发与工程实践，以及支撑日常工作的技术技能与资质。',
    'other.industryLead': '射频与基带方向的工程实践，与学院里的理论工作互补。',
    'other.skillsLead': '仿真、实验平台与论文写作中常用的工具与语言。',
    'other.certLead': '主研究方向之外的正式资质。',
    'other.rolesCount': '段经历',

    'moments.lead': '值得留下的人、地点与小节点。照片放在 <code>assets/img/moments/</code> 下。',

    'dog.tplNote': '模板内容 · 替换 <code>assets/js/data.dog.js</code> 里的文字，照片放进 <code>assets/img/dog/</code>',
    'dog.photoHint': '照片放在 <code>assets/img/dog/</code> 下。',

    'common.present': '至今'
  }
};

(function () {
  const STORE_KEY = 'site-lang';

  /* 初始语言：URL ?lang= 优先 → 上次选择 → 浏览器语言 → 英文 */
  function detect() {
    const q = new URLSearchParams(location.search).get('lang');
    if (q === 'zh' || q === 'en') return q;
    let saved = null;
    try { saved = localStorage.getItem(STORE_KEY); } catch (e) { /* 隐私模式忽略 */ }
    if (saved === 'zh' || saved === 'en') return saved;
    return /^zh\b/i.test(navigator.language || 'en') ? 'zh' : 'en';
  }

  SITE.LANG = detect();

  /* 取文案，支持 {n} 这类占位符 */
  SITE.t = function (key, vars) {
    const cur = SITE.UI[SITE.LANG] || {};
    const en = SITE.UI.en || {};
    let s = cur[key] != null ? cur[key] : (en[key] != null ? en[key] : key);
    if (vars) {
      Object.keys(vars).forEach((k) => {
        s = s.split('{' + k + '}').join(vars[k]);
      });
    }
    return s;
  };

  /* HTML 里用 data-i18n="key" 标记的元素，由这个函数统一刷新 */
  SITE.applyStatic = function () {
    document.documentElement.lang = SITE.LANG === 'zh' ? 'zh-CN' : 'en';
    document.querySelectorAll('[data-i18n]').forEach((el) => {
      el.textContent = SITE.t(el.getAttribute('data-i18n'));
    });
    document.querySelectorAll('[data-i18n-aria]').forEach((el) => {
      const keys = el.getAttribute('data-i18n-aria').split('|');
      el.setAttribute('aria-label', SITE.t(keys[0]));
    });
    document.querySelectorAll('[data-lang-btn]').forEach((b) => {
      const on = b.getAttribute('data-lang-btn') === SITE.LANG;
      b.classList.toggle('on', on);
      b.setAttribute('aria-pressed', on ? 'true' : 'false');
    });
  };

  /* 切换语言：写入偏好 → 刷新静态文本 → 交给 app.js 重绘栏目 */
  SITE.setLang = function (lang) {
    if (lang !== 'zh' && lang !== 'en') return;
    SITE.LANG = lang;
    try { localStorage.setItem(STORE_KEY, lang); } catch (e) { /* 忽略 */ }
    SITE.applyStatic();
    if (typeof SITE.onLangChange === 'function') SITE.onLangChange(lang);
  };
})();
