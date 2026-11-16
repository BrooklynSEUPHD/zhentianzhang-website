/* ==========================================================================
   app.js — 装配与交互
   横向：栏目切换（地址栏锚点可直接定位到某个栏目）
   纵向：栏目内部滚动，二级子导航跟随高亮
   界面文案一律走 SITE.t()；切换语言时整页重绘，内容保持英文原文。
   ========================================================================== */

(function () {
  const R = SITE.RENDER;
  const esc = R.esc;
  const block = R.block;
  const t = (k, v) => SITE.t(k, v);
  const byIsoDesc = (a, b) => String(b.iso || '').localeCompare(String(a.iso || ''));

  /* ============================ 论文：排序与编号 ============================ */

  /* 稳定编号：按「类型优先」视图给每一篇一个固定标签，切换视图时不变 */
  function labelAll() {
    const pubJ = SITE.PUBLISHED.filter(isJournal);
    const pubC = SITE.PUBLISHED.filter((p) => !isJournal(p));
    const revJ = SITE.IN_REVIEW.filter(isJournal);
    const revC = SITE.IN_REVIEW.filter((p) => !isJournal(p));

    sortCore(pubJ).forEach((p, i) => { p._label = 'J' + (i + 1); });
    sortCore(pubC).forEach((p, i) => { p._label = 'C' + (i + 1); });
    sortCore(revJ).forEach((p, i) => { p._label = 'R' + (i + 1); });
    sortCore(revC).forEach((p, i) => { p._label = 'R' + (revJ.length + i + 1); });
  }

  function isJournal(p) {
    const v = SITE.VENUES[p.venue];
    return v ? v.type === 'journal' : true;
  }

  /* 核心排序：一作 → 非一作；影响因子由高到低；年份由近到远 */
  function sortCore(list) {
    return list.slice().sort((a, b) => {
      const fa = a.self === 0 ? 0 : 1, fb = b.self === 0 ? 0 : 1;
      if (fa !== fb) return fa - fb;
      const ia = (a.metrics && a.metrics.if) || -1, ib = (b.metrics && b.metrics.if) || -1;
      if (ib !== ia) return ib - ia;
      return (b.year || 0) - (a.year || 0);
    });
  }

  function firsts(list) { return list.filter((p) => p.self === 0); }
  function cos(list)    { return list.filter((p) => p.self !== 0); }

  function subhead(text) { return '<h3 class="pub-subhead">' + esc(text) + '</h3>'; }

  /* 视图一：类型优先（journal 在前、conference 在后；各自内一作 → 非一作） */
  function viewByType(list) {
    const j = sortCore(list.filter(isJournal));
    const c = sortCore(list.filter((p) => !isJournal(p)));
    let html = '';
    if (j.length) html += subhead(t('pub.journalArticles') + ' · ' + j.length) + R.pubList(j.map((p) => ({ pub: p, label: p._label })));
    if (c.length) html += subhead(t('pub.conferenceProceedings') + ' · ' + c.length) + R.pubList(c.map((p) => ({ pub: p, label: p._label })));
    return html;
  }

  /* 视图二：作者序优先（一作全部在前，类型其次） */
  function viewByAuthor(list) {
    const jf = sortCore(firsts(list.filter(isJournal)));
    const cf = sortCore(firsts(list.filter((p) => !isJournal(p))));
    const jc = sortCore(cos(list.filter(isJournal)));
    const cc = sortCore(cos(list.filter((p) => !isJournal(p))));
    const seg = (key, arr) => arr.length ? subhead(t(key) + ' · ' + arr.length) + R.pubList(arr.map((p) => ({ pub: p, label: p._label }))) : '';
    return seg('pub.firstAuthorJournal', jf) + seg('pub.firstAuthorConf', cf) +
           seg('pub.coAuthorJournal', jc) + seg('pub.coAuthorConf', cc);
  }

  /* 视图三：按期刊/会议归组，影响因子由高到低 */
  function viewByVenue(list) {
    return R.venueGroupsHtml(list.map((p) => ({ pub: p, label: p._label })));
  }

  const VIEW_KEYS = [
    ['type', 'pub.view.type'],
    ['author', 'pub.view.author'],
    ['venue', 'pub.view.venue']
  ];
  const VIEWS = {
    type:   { fn: viewByType },
    author: { fn: viewByAuthor },
    venue:  { fn: viewByVenue }
  };
  let currentView = 'type';

  function publicationsHtml() {
    const pub = SITE.PUBLISHED, rev = SITE.IN_REVIEW;
    const nJ = pub.filter(isJournal).length, nC = pub.length - nJ;
    const stats =
      '<div class="pub-stats">' +
      '<span class="pub-stat"><b>' + nJ + '</b> ' + esc(t('pub.statJournal')) + '</span>' +
      '<span class="pub-stat"><b>' + nC + '</b> ' + esc(t('pub.statConf')) + '</span>' +
      '<span class="pub-stat"><b>' + rev.length + '</b> ' + esc(t('pub.statReview')) + '</span>' +
      '<span class="pub-stat"><b>' + pub.filter((p) => p.self === 0).length + '</b> ' + esc(t('pub.statFirst')) + '</span>' +
      '</div>';

    const toolbar =
      '<div class="pub-toolbar"><div class="pub-views" role="group" aria-label="' + esc(t('pub.viewAria')) + '">' +
      VIEW_KEYS.map(([k, key]) =>
        '<button type="button" data-view="' + k + '" class="' + (k === currentView ? 'active' : '') + '">' +
        esc(t(key)) + '</button>').join('') +
      '</div><span class="pub-hint" id="pub-hint">' + esc(t('pub.hint', { view: t('pub.view.' + currentView) })) + '</span></div>';

    const section = (open, title, note, list, emptyText) =>
      '<details class="pub-section"' + (open ? ' open' : '') + '><summary>' +
      R.icon('caret', 'caret') + '<h3>' + esc(title) + '</h3>' +
      '<span class="n">' + esc(note) + '</span></summary>' +
      '<div class="pub-wrap">' + (list.length ? VIEWS[currentView].fn(list) : '<p class="muted">' + esc(emptyText) + '</p>') +
      '</div></details>';

    return block('publications', t('pub.title'), t('pub.subNote'),
      toolbar + stats +
      '<div class="pub-sections">' +
      section(true, t('pub.accepted'), pub.length + ' ' + t('pub.entries'), pub, t('pub.empty')) +
      section(true, t('pub.review'), rev.length + ' ' + t('pub.entries'), rev, t('pub.empty')) +
      '</div>');
  }

  /* ============================== 通用块 ============================== */

  /* 论文数量自动统计：加论文不用再改数字 */
  function autoCounts() {
    const pub = SITE.PUBLISHED;
    return {
      entries: pub.length,
      firstAuthored: pub.filter((p) => p.self === 0).length,
      firstIeeeJournal: pub.filter((p) => p.self === 0 && isJournal(p)).length,
      awards: (SITE.AWARDS || []).length
    };
  }

  function metricsHtml(list) {
    const auto = autoCounts();
    return '<div class="metrics">' + list.map((m) => {
      const key = m.key && m.key.indexOf('metric.') === 0 ? m.key : 'metric.' + m.key;
      const value = m.count === 'auto' ? String(auto[m.key] != null ? auto[m.key] : '—') : m.value;
      const label = t(key) + (m.suffix || '');
      return '<article class="metric"><strong>' + esc(value) + '</strong><span>' + esc(label) + '</span></article>';
    }).join('') + '</div>';
  }

  function buttonsHtml(list, cls) {
    return '<div class="link-row' + (cls ? ' ' + cls : '') + '">' + list.map((l) =>
      '<a class="btn' + (l.primary ? ' primary' : '') + '" href="' + esc(l.href) + '"' +
      (String(l.href).indexOf('mailto:') !== 0 ? ' target="_blank" rel="noopener"' : '') + '>' +
      (l.kind === 'mail' ? R.icon('mail') : '') + '<span>' + esc(l.label) + '</span></a>'
    ).join('') + '</div>';
  }

  function subrailHtml(subs) {
    return '<nav class="subrail" aria-label="' + esc(t('nav.academicAria')) + '"><ul>' +
      subs.map(([id, key], i) =>
        '<li><a href="#' + id + '" data-sub="' + id + '" class="' + (i === 0 ? 'active' : '') + '">' + esc(t(key)) + '</a></li>').join('') +
      '</ul></nav>';
  }

  /* ============================== 各栏目 ============================== */

  function renderDog() {
    const d = SITE.DOG;
    let html = '';
    if (d.template) {
      html += '<div class="tpl-note">' + R.icon('sparkle') + t('dog.tplNote') + '</div>';
    }
    html += '<p class="lead">' + esc(d.intro) + '</p>';
    html += '<dl class="facts">' + d.facts.map((f) =>
      '<div class="fact' + (f.value ? '' : ' empty') + '"><dt>' + esc(f.label) + '</dt><dd>' +
      esc(f.value ? f.value : '—') + '</dd></div>').join('') + '</dl>';
    html += '<div style="height:22px"></div>' + R.stories(d.gallery);
    return html;
  }

  /* 当前状态位：自动取 Positions 里 iso 最大的一条，换工作只改 data.academic.js */
  function currentIdentity() {
    const pos = (SITE.POSITIONS || []).slice().sort(byIsoDesc)[0];
    if (pos) return { role: pos.role, org: pos.org, place: pos.place, note: pos.date };
    return SITE.PROFILE.identity;
  }

  function renderProfile() {
    const p = SITE.PROFILE, b = SITE.BRAND;
    const id = currentIdentity();
    /* 首屏：左列姓名、现任状态位、链接与三段式 Biography（两端对齐），右列照片 */
    const hero =
      '<div class="profile-hero">' +
      '<div class="hero-main">' +
      '<h2>' + esc(b.name) + '</h2>' +
      '<p class="who">' + esc(id.role) + ' · ' + esc(id.org) + '</p>' +
      '<div class="affiliation"><span class="dot"></span><div>' +
      '<strong>' + esc(id.role) + '</strong>' +
      '<span>' + esc(id.org) + '</span>' +
      '<span class="since">' + esc(id.place) + ' · ' + esc(id.note) + '</span>' +
      '</div></div>' +
      buttonsHtml(SITE.LINKS) +
      '<div class="bio-block"><p class="bio-title">' + esc(t('profile.bio')) + '</p>' +
      '<div class="bio">' + (p.bio || []).map((x) => '<p>' + esc(x) + '</p>').join('') + '</div></div>' +
      '</div>' +
      '<figure class="portrait"><div class="portrait-media">' +
      R.photo(p.portrait.src, b.name + ' portrait', 'portrait') + '</div>' +
      '<figcaption><strong>' + esc(p.portrait.caption) + '</strong><span>' + esc(p.portrait.note) + '</span></figcaption></figure>' +
      '</div>';

    /* 当前任职与学术服务：四张卡片，数据全部取自 Academic Record，改一处两边同步 */
    const workshops = ((SITE.SERVICE || []).find((g) => /workshop/i.test(g.group || '')) || {}).items || [];
    const workshopItems = workshops.slice().sort((a, b) => String(b.iso || '').localeCompare(String(a.iso || '')))
      .map((s) => ({ role: s.role, venue: s.title, note: s.where, date: s.date }));

    const roleCard = (title, items, numbered) =>
      '<article class="card role-card"><div class="role-card-head"><h3>' + esc(title) + '</h3>' +
      '<span class="role-count">' + items.length + '</span></div>' +
      R.roleList(items, numbered) + '</article>';

    const roles = block('roles', t('profile.roles'), '',
      '<div class="role-grid">' +
      roleCard(t('profile.currentPosition'), [{ role: id.role, org: id.org, area: id.place, date: id.note }], false) +
      roleCard(t('profile.editorship'), SITE.EDITORSHIPS.slice().sort(byIsoDesc), false) +
      roleCard(t('profile.specialIssues'), SITE.SPECIAL_ISSUES.slice().sort(byIsoDesc).map((s) =>
        ({ role: s.role, venue: s.venue, sub: s.title, note: s.note, date: s.date })), false) +
      roleCard(t('profile.workshops'), workshopItems, true) +
      '</div>');

    const glance = block('glance', t('profile.glance'), '', metricsHtml(p.metrics));

    const topics = block('research', t('profile.research'), p.research.length + ' ' + t('metric.themes'),
      '<div class="grid-2">' + p.research.map((r, i) =>
        '<article class="card card-hover topic-card"><span class="idx">' + String(i + 1).padStart(2, '0') + '</span>' +
        '<h3>' + esc(r.title) + '</h3><p>' + esc(r.text) + '</p></article>').join('') + '</div>');

    const contact = block('contact', t('profile.contact'), '',
      '<div class="card"><p class="lead">' + esc(t('profile.contactLead')) + ' <a href="mailto:zhentianzhangzzt@gmail.com">zhentianzhangzzt@gmail.com</a></p>' +
      buttonsHtml(SITE.LINKS) + '</div>');

    return hero + roles + glance + topics + contact;
  }

  function renderNews() {
    const items = SITE.NEWS.slice().sort((a, b) => String(b.iso).localeCompare(String(a.iso)));
    return block('news', t('news.title'), items.length + ' ' + t('news.count'),
      '<div class="news-list">' + items.map((n) =>
        '<article class="news-item reveal"><span class="news-date">' + esc(n.date) + '</span>' +
        '<span class="news-text">' + esc(n.text) + '</span>' +
        (n.tag ? '<span class="chip">' + esc(n.tag) + '</span>' : '') + '</article>').join('') + '</div>');
  }

  function renderAcademic() {
    const subs = [
      ['education', 'sub.education'], ['positions', 'sub.positions'],
      ['editorship', 'sub.editorship'], ['specialissues', 'sub.specialIssues'],
      ['visiting', 'sub.visiting'],
      ['publications', 'sub.publications'],
      ['patents', 'sub.patents'], ['grants', 'sub.grants'], ['awards', 'sub.awards'],
      ['talks', 'sub.talks'], ['mentoring', 'sub.mentoring'], ['service', 'sub.service'],
      ['teaching', 'sub.teaching']
    ];

    const education = block('education', t('sub.education'), '', R.timeline(SITE.EDUCATION.slice().sort(byIsoDesc)));
    const positions = block('positions', t('academic.positions'), '', R.timeline(SITE.POSITIONS.slice().sort(byIsoDesc)));
    const visiting = block('visiting', t('academic.visiting'), '', R.timeline(SITE.VISITING.slice().sort(byIsoDesc)));

    /* 编委：Academic Record 里紧跟任职经历；Personal Profile 也引用同一份数据 */
    const editorships = block('editorship', t('academic.editorship'),
      SITE.EDITORSHIPS.length + ' ' + t(SITE.EDITORSHIPS.length === 1 ? 'academic.roleCountOne' : 'academic.rolesCount'),
      '<div class="card">' + R.roleList(SITE.EDITORSHIPS.slice().sort(byIsoDesc), false) + '</div>');

    /* 客座编委与专刊 */
    const specialIssues = block('specialissues', t('academic.specialIssues'),
      SITE.SPECIAL_ISSUES.length + ' ' + t(SITE.SPECIAL_ISSUES.length === 1 ? 'academic.issueCountOne' : 'academic.issuesCount'),
      '<div class="card">' + R.roleList(SITE.SPECIAL_ISSUES.slice().sort(byIsoDesc).map((s) =>
        ({ role: s.role, venue: s.venue, sub: s.title, note: s.note, date: s.date })), false) + '</div>');

    const publications = publicationsHtml();

    const patents = block('patents', t('academic.patents'), SITE.PATENTS.length + ' ' + t('academic.granted'),
      '<ol class="pub-list">' + SITE.PATENTS.map(R.patentItem).join('') + '</ol>');

    const grants = block('grants', t('academic.grants'), SITE.GRANTS.length + ' ' + t('academic.projects'),
      '<div class="grid-2">' + SITE.GRANTS.slice().sort(byIsoDesc).map((g) =>
        '<article class="card card-hover project-card"><div class="pj-top"><h3>' + esc(g.title) + '</h3>' +
        '<span class="funding">' + esc(g.funding) + '</span></div>' +
        '<div class="project-meta"><span>' + esc(g.role) + '</span><span>' + esc(g.date) + '</span></div>' +
        '<p>' + esc(g.text) + '</p></article>').join('') + '</div>');

    /* 整个 Awards 区块统一连续编号，按时间由新到旧 */
    const awardItems = SITE.AWARDS.slice().sort((a, b) => String(b.iso || '').localeCompare(String(a.iso || '')));
    const awards = block('awards', t('academic.awards'), awardItems.length + ' ' + t('academic.awardsCount'),
      '<ol class="award-list numbered">' + awardItems.map((a, i) =>
        '<li><span class="award-no" aria-hidden="true">[' + (i + 1) + ']</span><div class="award-main">' +
        '<strong>' + esc(a.title) + '</strong>' +
        (a.text ? '<p>' + esc(a.text) + '</p>' : '') + '</div>' +
        '<div class="award-side"><span class="award-date">' + esc(a.date) + '</span>' +
        (a.category ? '<span class="chip">' + esc(a.category) + '</span>' : '') +
        '</div></li>').join('') + '</ol>');

    const talks = block('talks', t('academic.talks'), SITE.TALKS.length + ' ' + t('academic.talksCount'),
      '<ul class="talk-list">' + SITE.TALKS.slice().sort(byIsoDesc).map((tk) =>
        '<li><span class="talk-date">' + esc(tk.date) + '</span><div>' +
        '<span class="talk-kind">' + esc(tk.kind) + '</span>' +
        '<div class="talk-title">&ldquo;' + esc(tk.title) + '&rdquo;</div>' +
        '<div class="talk-where">' + esc(tk.where) + '</div></div></li>').join('') + '</ul>');

    /* 按开始指导的时间由新到旧编号 */
    const mentees = SITE.MENTORING.people.slice().sort((a, b) => String(b.iso || '').localeCompare(String(a.iso || '')));
    const mentoring = block('mentoring', t('academic.mentoring'), mentees.length + ' ' + t('academic.mentees'),
      '<p class="lead" style="margin-bottom:14px">' + esc(SITE.MENTORING.lead) + '</p>' +
      '<div class="card"><ol class="mentee-list numbered">' + mentees.map((m, i) =>
        '<li><span class="mentee-no" aria-hidden="true">[' + (i + 1) + ']</span><div class="mentee-main">' +
        '<div class="mentee-name">' + esc(m.name) + '<span class="mentee-span">' + esc(m.span) + '</span></div>' +
        '<div class="mentee-note">' + esc(m.note) + '</div></div></li>').join('') + '</ol></div>');

    /* numbered 为 true 的分组按 iso 由新到旧编号（如 Workshop Organization） */
    const service = block('service', t('academic.service'), '',
      SITE.SERVICE.map((g) => {
        const items = g.numbered
          ? g.items.slice().sort((a, b) => String(b.iso || '').localeCompare(String(a.iso || '')))
          : g.items;
        const rows = items.map((s, i) =>
          '<li>' + (g.numbered ? '<span class="service-no" aria-hidden="true">[' + (i + 1) + ']</span>' : '') +
          '<div class="service-main"><strong>' + esc(s.role) + '</strong> — ' + esc(s.title) +
          (s.where ? ', ' + esc(s.where) : '') +
          (s.date ? ' <span class="muted">' + esc(s.date) + '</span>' : '') + '</div></li>').join('');
        const tag = g.numbered ? 'ol' : 'ul';
        return '<div class="award-group"><h3>' + esc(g.group) + '</h3>' +
          '<' + tag + ' class="service-list' + (g.numbered ? ' numbered' : '') + '">' + rows + '</' + tag + '></div>';
      }).join(''));

    const teaching = block('teaching', t('academic.teaching'), '', R.timeline(SITE.TEACHING.slice().sort(byIsoDesc)));

    return subrailHtml(subs) + education + positions + editorships + specialIssues + visiting +
           publications + patents + grants + awards + talks + mentoring + service + teaching;
  }

  /* Industrial Experience + Skills + Certificates 合并在这一栏 */
  function renderOther() {
    const d = SITE.OTHER;
    const subs = [['industry', 'sub.industry'], ['skills', 'sub.skills'], ['certificates', 'sub.certificates']];

    /* 工业界经历只列文字，不配图 */
    const industry = block('industry', t('sub.industry'), d.roles.length + ' ' + t('other.rolesCount'),
      '<p class="lead" style="margin-bottom:18px">' + esc(d.industryLead) + '</p>' +
      R.timeline(d.roles.slice().sort(byIsoDesc)));

    const skills = block('skills', t('sub.skills'), '',
      '<p class="lead" style="margin-bottom:14px">' + esc(d.skillsLead) + '</p>' +
      '<div class="card"><ul class="skill-list">' + d.skills.map((s) =>
        '<li><strong>' + esc(s.label) + ':</strong> ' + esc(s.text) + '</li>').join('') + '</ul></div>');

    /* 证书：photo 可选，有就显示（自适应原比例），没有就只显示文字 */
    const certs = block('certificates', t('sub.certificates'), '',
      '<p class="lead" style="margin-bottom:14px">' + esc(d.certLead) + '</p>' +
      '<div class="cert-grid">' + d.certificates.map((c) => {
        const meta = [c.org, c.date].filter(Boolean).join(' · ');
        return '<article class="cert-card">' +
          (c.photo ? '<div class="cert-media">' + R.photo(c.photo, c.name) + '</div>' : '') +
          '<div class="cert-body"><h3>' + esc(c.name) + '</h3>' +
          (meta ? '<p class="cert-meta">' + esc(meta) + '</p>' : '') +
          '</div></article>';
      }).join('') + '</div>');

    return subrailHtml(subs) + industry + skills + certs;
  }

  function renderMoments() {
    return '<p class="lead" style="margin-bottom:18px">' + t('moments.lead') + '</p>' +
      R.stories(SITE.MOMENTS.slice().sort(byIsoDesc));
  }

  /* ============================== 栏目表 ============================== */

  const SECTIONS = [
    { id: 'dog',       icon: 'paw',       render: renderDog },
    { id: 'profile',   icon: 'user',      render: renderProfile },
    { id: 'news',      icon: 'news',      render: renderNews },
    { id: 'academic',  icon: 'cap',       render: renderAcademic },
    { id: 'other',     icon: 'briefcase', render: renderOther },
    { id: 'moments',   icon: 'sparkle',   render: renderMoments }
  ];

  const DEFAULT_SECTION = 'profile';
  let currentSection = DEFAULT_SECTION;

  const sec = (id, part) => t('sec.' + id + '.' + part);

  /* ============================== 装配 ============================== */

  function buildShell() {
    const b = SITE.BRAND;
    document.getElementById('brand-mark').textContent = b.mark;
    document.getElementById('brand-name').textContent = b.name;
    document.getElementById('brand-tagline').textContent = b.tagline;
    document.getElementById('year').textContent = new Date().getFullYear();
    document.getElementById('updated').textContent = b.lastUpdated;
    document.getElementById('footer-name').textContent = b.name;
    document.getElementById('topbar-links').innerHTML =
      '<a class="btn" href="mailto:zhentianzhangzzt@gmail.com">' + R.icon('mail') + '<span>' + esc(t('site.email')) + '</span></a>' +
      '<a class="btn" href="https://scholar.google.com/citations?hl=zh-CN&user=jw9pFj8AAAAJ&view_op=list_works&sortby=pubdate" target="_blank" rel="noopener"><span>Google Scholar</span></a>';

    document.getElementById('rail').innerHTML = SECTIONS.map((s) =>
      '<li class="rail-item" data-section="' + s.id + '"><a class="rail-link" href="#' + s.id + '">' +
      R.icon(s.icon) + '<span class="label">' + esc(sec(s.id, 'label')) + '</span></a></li>').join('');

    document.getElementById('panels').innerHTML = SECTIONS.map((s) =>
      '<section class="panel" id="panel-' + s.id + '" data-panel="' + s.id + '" role="tabpanel" aria-label="' + esc(sec(s.id, 'label')) + '">' +
      '<header class="panel-head"><p class="eyebrow">' + esc(sec(s.id, 'label')) + '</p>' +
      '<h1>' + esc(sec(s.id, 'title')) + '</h1><p class="panel-sub">' + esc(sec(s.id, 'sub')) + '</p>' +
      '<div class="panel-rule"></div></header>' +
      '<div class="panel-body" data-body="' + s.id + '"></div></section>').join('');
  }

  let rendered = {};
  function showSection(id, push) {
    const s = SECTIONS.find((x) => x.id === id) || SECTIONS.find((x) => x.id === DEFAULT_SECTION);
    currentSection = s.id;
    if (!rendered[s.id]) {
      document.querySelector('[data-body="' + s.id + '"]').innerHTML = s.render();
      rendered[s.id] = true;
    }
    document.querySelectorAll('.panel').forEach((p) => p.classList.toggle('active', p.dataset.panel === s.id));
    document.querySelectorAll('.rail-item').forEach((li) => li.classList.toggle('active', li.dataset.section === s.id));
    const active = document.querySelector('.rail-item.active');
    if (active && active.scrollIntoView) active.scrollIntoView({ block: 'nearest', inline: 'center', behavior: 'smooth' });
    if (push !== false && location.hash.slice(1) !== s.id) {
      history.replaceState(null, '', '#' + s.id);
    }
    observeReveals();
    bindSubs();
  }

  /* ------------------------------ 交互 ------------------------------ */

  /* 二级子导航：点击滚动 + 滚动高亮 */
  function bindSubs() {
    document.querySelectorAll('.panel .subrail').forEach((rail) => {
      if (rail.dataset.bound) return;
      rail.dataset.bound = '1';
      rail.addEventListener('click', (e) => {
        const a = e.target.closest('a[data-sub]');
        if (!a) return;
        e.preventDefault();
        const target = document.getElementById(a.dataset.sub);
        if (target) target.scrollIntoView({ behavior: 'smooth', block: 'start' });
        rail.querySelectorAll('a').forEach((x) => x.classList.remove('active'));
        a.classList.add('active');
      });
      const links = Array.from(rail.querySelectorAll('a[data-sub]'));
      const targets = links.map((a) => document.getElementById(a.dataset.sub)).filter(Boolean);
      if (!targets.length) return;
      const io = new IntersectionObserver((entries) => {
        entries.forEach((en) => {
          if (!en.isIntersecting) return;
          links.forEach((a) => a.classList.toggle('active', a.dataset.sub === en.target.id));
        });
      }, { rootMargin: '-45% 0px -50% 0px' });
      targets.forEach((x) => io.observe(x));
    });
  }

  /* 论文排序视图切换 */
  document.addEventListener('click', (e) => {
    const btn = e.target.closest('button[data-view]');
    if (!btn) return;
    currentView = btn.dataset.view;
    document.querySelectorAll('button[data-view]').forEach((x) => x.classList.toggle('active', x === btn));
    const hint = document.getElementById('pub-hint');
    if (hint) hint.textContent = t('pub.hint', { view: t('pub.view.' + currentView) });
    const wrap = document.getElementById('publications');
    if (wrap) {
      const holder = wrap.querySelector('.pub-sections');
      if (holder) {
        const secs = holder.querySelectorAll('.pub-section');
        if (secs[0]) secs[0].querySelector('.pub-wrap').innerHTML = VIEWS[currentView].fn(SITE.PUBLISHED);
        if (secs[1]) secs[1].querySelector('.pub-wrap').innerHTML = VIEWS[currentView].fn(SITE.IN_REVIEW);
        observeReveals();
      }
    }
  });

  /* 中英切换 */
  document.addEventListener('click', (e) => {
    const btn = e.target.closest('button[data-lang-btn]');
    if (!btn) return;
    SITE.setLang(btn.getAttribute('data-lang-btn'));
  });

  /* 图片缺失时露出占位框；加载成功则隐藏占位层（避免透明图透出占位文字） */
  document.addEventListener('error', (e) => {
    const el = e.target;
    if (el && el.tagName === 'IMG') el.classList.add('is-broken');
  }, true);
  document.addEventListener('load', (e) => {
    const el = e.target;
    if (el && el.tagName === 'IMG' && el.parentElement) {
      const ph = el.parentElement.querySelector('.ph');
      if (ph) ph.hidden = true;
    }
  }, true);

  /* 滚动淡入 */
  let io2 = null;
  function observeReveals() {
    if (!('IntersectionObserver' in window)) {
      document.querySelectorAll('.reveal').forEach((el) => el.classList.add('in'));
      return;
    }
    if (!io2) {
      io2 = new IntersectionObserver((entries) => {
        entries.forEach((en) => { if (en.isIntersecting) { en.target.classList.add('in'); io2.unobserve(en.target); } });
      }, { rootMargin: '0px 0px -8% 0px', threshold: .05 });
    }
    document.querySelectorAll('.reveal:not(.in)').forEach((el) => io2.observe(el));
  }

  window.addEventListener('hashchange', () => {
    const id = location.hash.slice(1);
    const known = SECTIONS.some((s) => s.id === id);
    showSection(known ? id : DEFAULT_SECTION, false);
    if (!known) window.scrollTo({ top: 0, behavior: 'smooth' });
  });

  /* 切换语言后：整页重绘，停在原来的栏目 */
  SITE.onLangChange = function () {
    rendered = {};
    buildShell();
    document.title = SITE.BRAND.name + ' · ' + SITE.BRAND.tagline;
    showSection(currentSection, false);
  };

  /* 启动 */
  function init() {
    labelAll();
    SITE.applyStatic();
    buildShell();
    const id = location.hash.slice(1);
    showSection(SECTIONS.some((s) => s.id === id) ? id : DEFAULT_SECTION, false);
  }

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init);
  else init();
})();
