/* ==========================================================================
   render.js — 模板层
   所有 HTML 都由这里的函数生成；改版式改这里，改内容改 data.*.js
   界面文案一律走 SITE.t()，内容（论文标题、摘要、获奖名）保持英文原文。
   ========================================================================== */

window.SITE = window.SITE || {};

(function () {
  const esc = (s) => String(s == null ? '' : s)
    .replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
  const dash = (s) => (s === '' || s == null ? '—' : s);
  const t = (k, v) => (SITE.t ? SITE.t(k, v) : k);

  /* ------------------------------ 图标 ------------------------------ */
  const ICONS = {
    paw: '<circle cx="7.2" cy="9.4" r="1.7" fill="currentColor" stroke="none"/><circle cx="12" cy="7.4" r="1.7" fill="currentColor" stroke="none"/><circle cx="16.8" cy="9.4" r="1.7" fill="currentColor" stroke="none"/><path d="M12 11.2c2.7 0 4.9 2 4.9 4.3 0 1.7-1.4 2.6-3.1 2.6-1 0-1.5-.3-1.8-.3s-.8.3-1.8.3c-1.7 0-3.1-.9-3.1-2.6 0-2.3 2.2-4.3 4.9-4.3Z" fill="currentColor" stroke="none"/>',
    user: '<circle cx="12" cy="8" r="3.6"/><path d="M4.8 20c.6-3.9 3.6-6.2 7.2-6.2s6.6 2.3 7.2 6.2"/>',
    news: '<path d="M4 5.5h11v13H4z"/><path d="M15 8.5h5v9.5a1 1 0 0 1-1 1H6"/><path d="M7 9h5M7 12h5M7 15h3"/>',
    cap: '<path d="M3.5 9.2 12 5.4l8.5 3.8L12 13 3.5 9.2Z"/><path d="M6.6 10.8v4.9c0 1.5 2.4 2.7 5.4 2.7s5.4-1.2 5.4-2.7v-4.9"/><path d="M20 9.5v5.2"/>',
    briefcase: '<rect x="3.2" y="7.2" width="17.6" height="12.6" rx="2.2"/><path d="M8.6 7.2V5.4c0-.9.7-1.6 1.6-1.6h3.6c.9 0 1.6.7 1.6 1.6v1.8"/><path d="M3.2 12.4h17.6"/>',
    sparkle: '<path d="M12 3.6l1.9 5.1 5.1 1.9-5.1 1.9L12 17.6l-1.9-5.1L5 10.6l5.1-1.9L12 3.6Z"/><path d="M18.6 16.4l.8 2.1 2.1.8-2.1.8-.8 2.1-.8-2.1-2.1-.8 2.1-.8.8-2.1Z"/>',
    calendar: '<rect x="4" y="5.5" width="16" height="14" rx="2"/><path d="M4 10h16M9 3.5v4M15 3.5v4"/>',
    pin: '<path d="M12 21s6.5-5.6 6.5-10.2A6.5 6.5 0 0 0 5.5 10.8C5.5 15.4 12 21 12 21Z"/><circle cx="12" cy="10.6" r="2.3"/>',
    people: '<circle cx="9" cy="9" r="3.1"/><path d="M3.6 19.2c.5-3.2 2.7-5.1 5.4-5.1s4.9 1.9 5.4 5.1"/><path d="M15.6 7.2a3.1 3.1 0 0 1 0 6"/><path d="M16.8 14.4c2.1.3 3.6 2 4 4.8"/>',
    image: '<rect x="4" y="5.5" width="16" height="13" rx="2"/><circle cx="9" cy="10.5" r="1.5"/><path d="M6 17.5l4.3-4.2 3 2.8 2-1.7L19 17.5"/>',
    caret: '<path d="M9 5l7 7-7 7"/>',
    mail: '<rect x="3.5" y="5.5" width="17" height="13" rx="2"/><path d="M4.5 7l7.5 6 7.5-6"/>',
    ext: '<path d="M13.5 5.5h5v5"/><path d="M18.5 5.5 11 13"/><path d="M17 14.5v3.2a1.8 1.8 0 0 1-1.8 1.8H6.3a1.8 1.8 0 0 1-1.8-1.8V8.9A1.8 1.8 0 0 1 6.3 7.1h3.2"/>'
  };

  function icon(name, cls) {
    const body = ICONS[name] || '';
    return '<svg class="' + (cls || '') + '" viewBox="0 0 24 24" fill="none" stroke="currentColor" ' +
      'stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">' + body + '</svg>';
  }

  /* --------------------------- 图片 + 占位 --------------------------- */
  function photo(src, alt, variant) {
    const v = variant ? ' is-' + variant : '';
    return '<div class="ph' + v + '">' +
      '<div class="ph-inner">' + icon('image', 'ph-icon') +
      '<div class="ph-title">Drop your photo here</div>' +
      '<div class="ph-path">' + esc(src) + '</div>' +
      '</div></div>' +
      '<img src="' + esc(src) + '" alt="' + esc(alt || '') + '" loading="lazy">';
  }

  /* ---------------------------- 区块骨架 ---------------------------- */
  function block(id, title, countLabel, body) {
    return '<section class="block reveal" id="' + id + '">' +
      '<div class="block-head"><h2>' + esc(title) + '</h2>' +
      (countLabel ? '<span class="count">' + esc(countLabel) + '</span>' : '') +
      '<span class="rule"></span></div>' + body + '</section>';
  }

  function points(list) {
    if (!list || !list.length) return '';
    return '<ul class="tl-points">' + list.map((p) => '<li>' + esc(p) + '</li>').join('') + '</ul>';
  }

  /* ---------------------------- 时间线条目 ---------------------------- */
  function timelineItem(it) {
    return '<article class="tl-item">' +
      '<div class="tl-top"><h3>' + esc(it.org) + '</h3>' +
      (it.place ? '<span class="tl-place">' + esc(it.place) + '</span>' : '') + '</div>' +
      '<div class="tl-meta"><span class="tl-role">' + esc(it.role) + '</span>' +
      '<span class="tl-date">' + esc(it.date) + '</span></div>' +
      points(it.points) + '</article>';
  }

  function timeline(list) {
    return '<div class="timeline">' + list.map(timelineItem).join('') + '</div>';
  }

  /* ------------------------- 图文故事（大图） ------------------------- */
  function storyMeta(it) {
    const bits = [];
    if (it.date)   bits.push('<span>' + icon('calendar') + esc(it.date) + '</span>');
    if (it.place)  bits.push('<span>' + icon('pin') + esc(it.place) + '</span>');
    if (it.people) bits.push('<span>' + icon('people') + esc(it.people) + '</span>');
    return bits.length ? '<div class="story-meta">' + bits.join('') + '</div>' : '';
  }

  function story(it) {
    return '<article class="story reveal">' +
      '<div class="story-figure">' + photo(it.photo, it.title) + '</div>' +
      '<div class="story-body"><h3>' + esc(it.title) + '</h3>' +
      storyMeta(it) +
      (it.text ? '<p>' + esc(it.text) + '</p>' : '') +
      '</div></article>';
  }

  function stories(list) {
    return '<div class="stories">' + list.map(story).join('') + '</div>';
  }

  /* ------------------------------ 徽章 ------------------------------ */
  function badges(pub) {
    const out = [];
    const m = pub.metrics || {};
    if (m.if != null)       out.push('<span class="badge if">IF ' + esc(m.if) + '</span>');
    if (m.quartile)         out.push('<span class="badge q">' + esc(m.quartile) + '</span>');
    (pub.flags || []).forEach((f) => {
      const cls = /esi/i.test(f) ? 'esi' : (/mentor|corresponding/i.test(f) ? 'mentor' : 'award');
      out.push('<span class="badge ' + cls + '">' + esc(f) + '</span>');
    });
    if (pub.state) out.push('<span class="badge state">' + esc(pub.state) + '</span>');
    return out.join('');
  }

  /* --------------------- 论文链接：一处定义，全局复用 ---------------------
     优先级：DOI → arXiv → PDF → Code；都没有就退回「按标题检索」。
     data 里只写 doi 号本身（如 10.1109/twc.2026.3723456），前缀在这里拼。 */
  function resolveLink(pub) {
    const l = pub.links || {};
    if (l.doi)   return { href: 'https://doi.org/' + String(l.doi).replace(/^https?:\/\/(dx\.)?doi\.org\//, ''), kind: 'doi' };
    if (l.arxiv) return { href: l.arxiv, kind: 'arxiv' };
    if (l.pdf)   return { href: l.pdf, kind: 'pdf' };
    return null;
  }

  function titleHref(pub) {
    const r = resolveLink(pub);
    if (r) return r.href;
    return 'https://scholar.google.com/scholar?q=' + encodeURIComponent('"' + pub.title + '"');
  }

  function linkRow(pub) {
    const l = pub.links || {}; const out = [];
    if (l.doi)   out.push('<a href="https://doi.org/' + esc(String(l.doi).replace(/^https?:\/\/(dx\.)?doi\.org\//, '')) + '" target="_blank" rel="noopener">DOI</a>');
    if (l.arxiv) out.push('<a href="' + esc(l.arxiv) + '" target="_blank" rel="noopener">arXiv</a>');
    if (l.pdf)   out.push('<a href="' + esc(l.pdf) + '" target="_blank" rel="noopener">PDF</a>');
    if (l.code)  out.push('<a href="' + esc(l.code) + '" target="_blank" rel="noopener">Code</a>');
    if (!out.length) {
      out.push('<a href="' + esc(titleHref(pub)) + '" target="_blank" rel="noopener" title="Search this title">Search</a>');
    }
    return out.join('');
  }

  /* --------------------- 期刊名：一律「全称（缩写）」 --------------------- */
  function venueText(v) {
    const name = v.name || v.short || v.abbr || '';
    const abbr = v.abbr || '';
    if (name && abbr && name !== abbr) {
      return '<span class="v-full">' + esc(name) + '</span> <span class="v-abbr">(' + esc(abbr) + ')</span>';
    }
    return '<span class="v-full">' + esc(name || abbr) + '</span>';
  }

  /* --------------------------- 论文条目 --------------------------- */
  function authorLine(pub) {
    const me = pub.self;
    const parts = pub.authors.map((a, i) => {
      if (i === me) {
        return '<span class="me">' + esc(a) + '</span>' +
          (pub.corresponding ? ' <span class="corr">' + esc(t('pub.corresponding')) + '</span>' : '');
      }
      return esc(a);
    });
    return parts.join(', ');
  }

  function pubItem(pub, label) {
    const v = SITE.VENUES[pub.venue] || { abbr: pub.venue, short: pub.venue, name: pub.venue, type: 'journal' };
    const isFirst = pub.self === 0;
    const href = titleHref(pub);
    const linked = resolveLink(pub);
    return '<li class="pub-item ' + (isFirst ? 'is-first' : 'is-co') + '">' +
      '<span class="pub-no">[' + esc(label) + ']</span>' +
      '<div class="pub-main">' +
      '<div class="pub-authors">' + authorLine(pub) + '</div>' +
      '<div class="pub-title"><a href="' + esc(href) + '" target="_blank" rel="noopener"' +
      ' title="' + esc(linked ? linked.kind.toUpperCase() : 'Search this title') + '">&ldquo;' + esc(pub.title) + '&rdquo;' +
      icon('ext', 'ext') + '</a></div>' +
      '<div class="pub-venue">' + venueText(v) +
      (pub.venueNote ? ' <span class="v-note">' + esc(pub.venueNote) + '</span>' : '') +
      (pub.detail ? ', <span class="v-detail">' + esc(pub.detail) + '</span>' : '') +
      (pub.year ? ' <span class="v-year">' + esc(pub.year) + '</span>' : '') +
      '</div>' +
      '<div class="pub-tags">' + badges(pub) + linkRow(pub) + '</div>' +
      (pub.contribution ? '<details class="pub-contrib"><summary>' + icon('caret', 'caret') +
        esc(t('pub.contribution')) + '</summary><p>' + esc(pub.contribution) + '</p></details>' : '') +
      '</div></li>';
  }

  function pubList(items) {
    return '<ol class="pub-list">' + items.map((p) => pubItem(p.pub, p.label)).join('') + '</ol>';
  }

  /* ------------------- 期刊/会议归组（按影响因子降序） ------------------- */
  function byVenue(items) {
    const groups = new Map();
    items.forEach((it) => {
      const key = it.pub.venue;
      if (!groups.has(key)) groups.set(key, []);
      groups.get(key).push(it);
    });
    return Array.from(groups.entries()).map(([key, list]) => {
      const v = SITE.VENUES[key] || {};
      const sample = list[0].pub.metrics || {};
      return { key: key, venue: v, items: list, if: sample.if || null, quartile: sample.quartile || '' };
    });
  }

  function venueGroupsHtml(items) {
    const groups = byVenue(items);
    groups.sort((a, b) => {
      if (a.venue.type !== b.venue.type) return a.venue.type === 'journal' ? -1 : 1;
      const ai = a.if || -1, bi = b.if || -1;
      if (bi !== ai) return bi - ai;
      return String(a.venue.abbr).localeCompare(String(b.venue.abbr));
    });
    return groups.map((g) => {
      const n = g.items.length;
      const head = '<div class="venue-head">' +
        '<span class="vh-abbr">' + esc((g.venue.name || g.key) + (g.venue.abbr && g.venue.abbr !== g.venue.name ? ' (' + g.venue.abbr + ')' : '')) + '</span>' +
        (g.if ? '<span class="badge if">IF ' + esc(g.if) + '</span>' : '') +
        (g.quartile ? '<span class="badge q">' + esc(g.quartile) + '</span>' : '') +
        '<span class="vh-n">' + n + ' ' + esc(t(n > 1 ? 'pub.papers' : 'pub.paper')) + '</span>' +
        '</div>';
      return '<div class="venue-group">' + head + pubList(g.items) + '</div>';
    }).join('');
  }

  /* ------------------------------ 专利 ------------------------------ */
  function patentItem(p, i) {
    return '<li class="pub-item patent-item is-co">' +
      '<span class="pub-no">[P' + (i + 1) + ']</span>' +
      '<div class="pub-main">' +
      '<div class="pub-authors">' + authorLine(p) + '</div>' +
      '<div class="pub-title">&ldquo;' + esc(p.title) + '&rdquo;</div>' +
      '<div class="pub-venue"><span class="v-abbr">' + esc(p.no) + '</span>' +
      '<span class="v-detail"> · ' + esc(p.status) + '</span></div>' +
      '<div class="pub-tags"><span class="badge granted">' + esc(p.status) + '</span></div>' +
      (p.contribution ? '<details class="pub-contrib"><summary>' + icon('caret', 'caret') +
        esc(t('pub.contribution')) + '</summary><p>' + esc(p.contribution) + '</p></details>' : '') +
      '</div></li>';
  }

  SITE.RENDER = {
    esc, dash, icon, photo, block, points, timelineItem, timeline,
    story, stories, pubItem, pubList, venueGroupsHtml, patentItem, badges,
    venueText, titleHref, resolveLink
  };
})();
