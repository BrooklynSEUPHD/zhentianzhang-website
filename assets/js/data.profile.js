/* ==========================================================================
   data.profile.js — 站点基本信息 + Personal Profile 栏目
   --------------------------------------------------------------------------
   维护原则：这一页只放「不会频繁变动」的身份信息。
   · 状态位（当前职位 + 单位）不用在这里写 —— 它自动取 data.academic.js
     里 SITE.POSITIONS 的最新一条（iso 最大的那条），换工作时只改那一处；
     下面的 identity 只是 SITE.POSITIONS 为空时的兜底。
   · metrics 里 count: 'auto' 的项由脚本自动统计（见 app.js），不用手动改数字。
   ========================================================================== */

window.SITE = window.SITE || {};

/* 站点级：只放不易变动的信息 */
SITE.BRAND = {
  name: 'Zhentian Zhang',
  nameZh: '张震天',
  mark: 'ZZT',
  tagline: 'Wireless Communications · Statistical Signal Processing · 6G and beyond Systems',
  lastUpdated: 'Oct. 2026'
};

SITE.LINKS = [
  { label: 'Email',         href: 'mailto:zhentianzhangzzt@gmail.com', kind: 'mail' },
  { label: 'Google Scholar',href: 'https://scholar.google.com/citations?hl=zh-CN&user=jw9pFj8AAAAJ&view_op=list_works&sortby=pubdate' },
  { label: 'ORCID',         href: 'https://orcid.org/0009-0002-2611-5546' },
  { label: 'GitHub',        href: 'https://github.com/BrooklynSEUPHD' },
  { label: 'IEEE Xplore',   href: 'https://ieeexplore.ieee.org/author/37089238856' }
];

/* --------------------------------------------------------------------------
   Personal Profile 栏目
   -------------------------------------------------------------------------- */
SITE.PROFILE = {
  intro: 'I am a researcher in wireless communications and statistical signal processing, working across the theory-to-hardware chain: from electromagnetic-aware modelling, finite-blocklength information theory and fundamental-limit analysis, to algorithm design, RF system testbeds and industrial 5G/Wi-Fi practice.',

  /* 兜底身份：只有 SITE.POSITIONS 为空时才会用到 */
  identity: {
    role: 'Ph.D. in Electronic and Information Engineering',
    org: 'Southeast University',
    place: 'Nanjing, China',
    note: 'Degree awarded 2026 (the only eary graduate)'
  },

  portrait: {
    src: 'assets/img/profile/portrait.jpg',
    caption: 'Research themes',
    note: 'Finite-blocklength theory · Unsourced Random Access (URA) · Fluid antenna systems · ISAC'
  },

  /* count: 'auto' 的项由 app.js 自动统计（key 见 i18n.js 的 metric.*）；
     留着 value 的项是外部指标，隔一段时间手动更新一次即可。 */
  metrics: [
    { count: 'auto', key: 'entries' },
    { count: 'auto', key: 'firstAuthored' },
    { count: 'auto', key: 'firstIeeeJournal' },
    { count: 'auto', key: 'awards' },
    { value: '739', key: 'metric.citations', suffix: ' · h-index 15 · i10-index 25' },
    { value: '2',   key: 'metric.patents' }
  ],

  research: [
    { title: 'Finite-blocklength information theory',
      text: 'Performance limits, random-coding bounds, energy-efficiency and reliability analysis for short-packet wireless systems.' },
    { title: 'Massive connectivity and Unsourced Random Access (URA)',
      text: 'Unsourced random access, grant-free access, activity detection, sparse-code transceivers and multi-user detection.' },
    { title: 'Fluid antenna systems (FAS)',
      text: 'Electromagnetic-aware modelling, fluid/finite-aperture arrays, channel reconstruction, beamforming and port selection.' },
    { title: 'Integrated sensing and communications (ISAC)',
      text: 'ISAC multiple access, spectrum sharing, source-channel coding perspectives, sensing-communication tradeoffs.' },
    { title: 'Statistical signal processing',
      text: 'Bayesian inference, approximate message passing, channel estimation, detection, beam tracking and RF-aware algorithm design.' }
  ]
};
