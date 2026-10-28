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
  /* Biography：三段式叙述，页面上按「两端对齐」排版。
     第一段：学历与学位；第二段：任职与访问经历；第三段：研究兴趣与主要获奖。
     编委／客座编委／研讨会组织不写在这里 —— 它们在下面的
     「Current Roles & Service」里单独罗列，避免重复维护。 */
  bio: [
    "Zhentian Zhang (Member, IEEE) received the B.Sc. degree in communications engineering from the Harbin Institute of Technology, Harbin, China, in 2021. He received the Ph.D. degree in electronic and information engineering from Southeast University, Nanjing, China, in 2026, graduating one year ahead of schedule as the only one in his cohort to do so. He transitioned to the Ph.D. track in March 2023, and his doctoral studies were supervised by Prof. Jian Dang and Prof. Zaichen Zhang.",
    "From December 2025 to March 2026, he was a Visiting Researcher with the Department of Electronic and Electrical Engineering, University College London, London, U.K., where he worked with Prof. Christos Masouros and Prof. Kai-Kit Wong, both IEEE Fellows. From July 2026 to October 2026, he was a Postdoctoral Fellow with the Department of Electrical and Electronic Engineering, The Hong Kong Polytechnic University, Hong Kong SAR, China, working with Prof. Liang Liu (IEEE Fellow). He is currently a Research Fellow with the Shenzhen Research Institute, Hong Kong Metropolitan University, Shenzhen, China, where he collaborates with Prof. Kin-Fai (Kenneth) Tong (IEEE Fellow).",
    "His research interests include finite-blocklength information theory, massive connectivity, unsourced random access, fluid antenna systems, integrated sensing and communications, Bayesian inference, channel estimation, and beamforming. Dr. Zhang was a recipient of the Annual Frontier Science and Technology Paper Award from the Chinese Institute of Electronics in 2026, the Best Paper Award at ICICSP 2026, the Best Paper Award at CCAI 2026, and the National Scholarship of China in 2024 and 2025."
  ],

  /* 兜底身份：只有 SITE.POSITIONS 为空时才会用到 */
  identity: {
    role: 'Ph.D. in Electronic and Information Engineering',
    org: 'Southeast University',
    place: 'Nanjing, China',
    note: 'Degree awarded 2026 (the only early graduate)'
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
    { value: '751', key: 'metric.citations', suffix: ' · h-index 15 · i10-index 27' },
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
