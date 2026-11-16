/* ==========================================================================
   data.academic.js — Academic Record 栏目（Education / Positions / Patents /
   Grants / Awards / Talks / Mentoring / Service / Teaching / Skills）
   所有列表均按时间由近到远排列；iso 字段用于排序，date 字段用于显示。
   ========================================================================== */

window.SITE = window.SITE || {};

/* ---------------------------- Education ---------------------------------- */
SITE.EDUCATION = [
  { iso: '2026-06', date: 'Sep. 2021 – Jun. 2026',
    org: 'Southeast University (SEU)', place: 'Nanjing, China',
    role: 'Ph.D. in Electronic and Information Engineering',
    points: [
      'Supervisors: Prof. Jian Dang, Prof. Zaichen Zhang.',
      'Transferred to the direct Ph.D. track in Mar. 2023; graduated one year early.'
    ] },
  { iso: '2021-06', date: 'Sep. 2017 – Jun. 2021',
    org: 'Harbin Institute of Technology (HIT)', place: 'Harbin, China',
    role: 'B.Sc. in Communications Engineering' }
];

/* ---------------------------- Positions ----------------------------------
   这里的「最新一条」会自动显示在 Personal Profile 的状态位上（见 app.js），
   所以换工作时只改这里，首页状态不用管。
   注意：只放「任职」，编委与客座编委不在这里，见下面的 EDITORSHIPS / SPECIAL_ISSUES。
   ------------------------------------------------------------------------ */
SITE.POSITIONS = [
  { iso: '2026-10-20', date: '20th Oct. 2026 – present',
    org: 'the Shenzhen Research Institute, Hong Kong Metropolitan University (HKMU)', place: 'Shenzhen, China',
    role: 'Research Fellow',
    points: ['Supervisor: Prof. Kin-Fai (Kenneth) Tong (IEEE Fellow).'] },

  { iso: '2026-07-20', date: '20th Jun. 2026 – 19th Oct. 2026',
    org: 'The Hong Kong Polytechnic University (HKPolyU)', place: 'Hong Kong SAR, China',
    role: 'Postdoctoral Fellow, Department of Electrical and Electronic Engineering',
    points: ['Supervisor: Prof. Liang Liu (IEEE Fellow).'] }
];

/* --------------------------- Editorship ----------------------------------
   期刊编委。Academic Record 里紧接在 Positions 之后，
   同时会在 Personal Profile 的「Current Roles & Service」里列出。
   ------------------------------------------------------------------------ */
SITE.EDITORSHIPS = [
  { iso: '2026-10-28', date: '28th Oct. 2026 – present',
    role: 'Editor',
    venue: 'IEEE Transactions on Communications (IEEE TCOM)',
    area: 'Wireless Communication II' }
];

/* ------------------------- Guest Editorship -------------------------------
   专刊（Special Issue）客座编委。与上面的常任编委分开维护。
   主题名以后若改过，用 note 说明原来的名字，不要直接丢掉。
   ------------------------------------------------------------------------ */
SITE.SPECIAL_ISSUES = [
  { iso: '2027-02-01', date: '1st Feb. 2027 – 15th Sep. 2027',
    role: 'Guest Editor',
    venue: 'IEEE Vehicular Technology Magazine',
    title: 'Fluid Antenna Systems for Future Vehicular Technology',
    // note: 'Originally announced as “Fluid Antenna Systems for Future Vehicular Technology”.' 
  }
];

/* ------------------------ Visiting Experience -----------------------------
   与任职经历分开维护：访问、短期交流都放这里。
   ------------------------------------------------------------------------ */
SITE.VISITING = [
  { iso: '2026-03', date: 'Dec. 2025 – Mar. 2026',
    org: 'University College London (UCL)', place: 'London, United Kingdom',
    role: 'Visiting Researcher, Department of Electronic and Electrical Engineering',
    points: [
      'Hosts: Prof. Christos Masouros (IEEE Fellow), Prof. Kai-Kit Wong (IEEE Fellow).',
      'Focus: Fluid antenna systems, ISAC, signal processing, and fundamental limits.'
    ] }
];

/* ---------------------------- Patents ------------------------------------ */
SITE.PATENTS = [
  { iso: '2024-01', no: 'CN ZL 202410499094.5', status: 'Granted',
    authors: ['J. Dang', 'Z. Zhang', 'Z. Zhang', 'L. Wu', 'B. Zhu', 'L. Wang'], self: 1,
    title: 'A user-label-free random multiple access transmission method',
    contribution: 'Patented a novel transceiver design for MAC-layer random-spreading-sequence access, improving activity detection via sub-frame correlation.' },
  { iso: '2024-01', no: 'CN ZL 202411363397.0', status: 'Granted',
    authors: ['J. Dang', 'Z. Zhang', 'Z. Zhang'], self: 1,
    title: 'A user-label-free common codebook multiple access transmission method approaching the theoretical capacity in the finite-blocklength regime',
    contribution: 'Patented a near-theoretical-limit random access scheme for MIMO systems, featuring a multi-stage sparse-code-driven transceiver with efficient channel estimation and multi-user detection.' }
];

/* ---------------------------- Grants ------------------------------------- */
SITE.GRANTS = [
  { iso: '2026-09', date: 'Sep. 2026 – Sep. 2027',
    title: 'Integrated Sensing, Communication, and Computation Network Architecture and Protocol Design for 6G Ultra-Massive Access',
    funding: 'RMB 15,000', role: 'Main Contributor · Proposal Writer and Submitter',
    text: 'This project addresses integrated sensing, communication, and computation (ISCC) network architecture and protocol design for 6G ultra-massive access, where conventional identity-centric, grant-based scheduling becomes costly in signaling, energy, and latency. Using unsourced random access (URA) as the enabling approach, it pursues two research directions. The first characterizes the three-way performance limits and scaling laws of ISCC under a per-user energy constraint. The second extracts structural invariants, namely identity-agnosticism and task sufficiency, and uses them to design a unified air interface and an information-value-driven on-demand computation protocol.' },
  { iso: '2025-11', date: 'Nov. 2025 – Oct. 2027',
    title: 'Jiangsu Natural Science Foundation General Program (BK20252003)',
    funding: 'RMB 100,000', role: 'Co-Investigator · Proposal Author',
    text: 'Collaborative optimization theory and key technologies for massive random access in 6G IoT networks. Research focuses on large-scale grant-free access schemes, receiver design, and system-level optimization to support ultra-dense device connectivity in next-generation IoT scenarios.' },
  { iso: '2025-08', date: 'Aug. 2025 – Aug. 2027',
    title: 'Smoke Identification and Permeability Imaging in Pipe Gallery',
    funding: 'RMB 180,000 (approx. EUR 23,000)', role: 'Principal Investigator · Industry-funded',
    text: 'Intelligent smoke detection for utility tunnels and through-smoke imaging for building fires. Developed deep-learning and multimodal fusion methods for early smoke recognition in low-light tunnel environments, and explored vision foundation models for robust smoke-penetrating imaging to improve restoration quality and support emergency rescue.' },
  { iso: '2024-11', date: 'Nov. 2024 – Oct. 2026',
    title: 'MoE Key Laboratory of Complex Electromagnetic Environment Science and Technology Open Fund (B2202402)',
    funding: 'RMB 100,000', role: 'Co-Investigator · Proposal Author',
    text: 'Anti-jamming communication research for RF direct-sampling air-ground networking based on intelligent beam tracking. Investigates adaptive beamforming and beam prediction strategies to enhance link robustness in complex electromagnetic environments for air-ground integrated systems.' },
  { iso: '2024-06', date: 'Jun. 2024 – Jun. 2026',
    title: 'Southeast University Innovation Capability Enhancement Plan (CXJH_SEU 24077)',
    funding: 'RMB 48,000', role: 'Principal Investigator · Proposal Author',
    text: 'Next-generation multiple access for massive random connectivity. Studied scalable transmission structures and receiver optimization for massive-antenna unsourced random access, including sparse frame design, codebook optimization, rate adaptation, and interleaving.' }
];

/* ---------------------------- Awards -------------------------------------
   一整条列表，页面按时间由新到旧统一连续编号；
   同一个奖拿到两次就写成两条（各写各的日期与证书号），不要合并。
   category 只作小标签，不参与编号与排序。
   ------------------------------------------------------------------------ */
SITE.AWARDS = [
  { iso: '2026-09', date: 'Sep. 2026', category: 'Paper',
    title: 'ESI Highly Cited Paper',
    text: 'First author, IEEE Journal of Selected Topics in Signal Processing (JSTSP), Q1, IF 13.5.' },
  { iso: '2026-09', date: 'Sep. 2026', category: 'Paper',
    title: 'ESI Highly Cited Paper',
    text: 'First author, IEEE Wireless Communications Letters (WCL), Q1, IF 5.1.' },
  { iso: '2026-09', date: 'Sep. 2026', category: 'Paper',
    title: 'Best Paper Award',
    text: 'First author, the 9th International Conference on Information Communication and Signal Processing.' },
  { iso: '2026-07', date: 'Jul. 2026', category: 'Paper',
    title: 'Annual Frontier Science and Technology Paper Award in the Electromagnetic Spectrum Field',
    text: 'First author, Chinese Institute of Electronics, Certificate No. CIE-2026EMS-E23.' },
  { iso: '2026-07', date: 'Jul. 2026', category: 'Paper',
    title: 'ESI Highly Cited Paper',
    text: 'First author, IEEE Journal on Selected Areas in Communications (JSAC), Q1, IF 17.3.' },
  { iso: '2026-06', date: 'Jun. 2026', category: 'Paper',
    title: 'Best Poster Award',
    text: 'First author, the 5th Electronic and Information Frontier Academic Conference.' },
  { iso: '2026-06', date: 'Jun. 2026', category: 'Honour',
    title: 'Outstanding Graduate Award', text: '' },
  { iso: '2026-06', date: 'Jun. 2026', category: 'Honour',
    title: 'Xinghang Distinguished Graduate Researcher',
    text: 'One of 11 awardees nationwide, Journal of Electronics and Information Technology.' },
  { iso: '2026-05', date: 'May 2026', category: 'Paper',
    title: 'ESI Highly Cited Paper',
    text: 'First author, IEEE Journal on Selected Areas in Communications (JSAC), Q1, IF 17.3.' },
  { iso: '2026-05', date: 'May 2026', category: 'Paper',
    title: 'Best Paper Award',
    text: 'First author, the 6th International Conference on Computer Communication and Artificial Intelligence.' },
  { iso: '2025-10', date: 'Oct. 2025', category: 'Scholarship',
    title: 'National Scholarship',
    text: 'Ministry of Education of China, top 2%, 20 of 992 Ph.D. students; Certificate No. BSY202503865.' },
  { iso: '2025-09', date: 'Sep. 2025', category: 'Scholarship',
    title: 'First Prize Scholarship',
    text: 'Southeast University, top 10%, 17 of 167 Ph.D. students.' },
  { iso: '2025-09', date: 'Sep. 2025', category: 'Honour',
    title: 'Best Teaching Assistant Award', text: '' },
  { iso: '2025-09', date: 'Sep. 2025', category: 'Honour',
    title: 'Advanced Individual in Academic Innovation',
    text: 'Southeast University, top 1%, 12 of 1,167 graduate students.' },
  { iso: '2025-07', date: 'Jul. 2025', category: 'Competition',
    title: 'National Third Prize, China Graduate Electronics Design Contest',
    text: 'Team leader and first-listed recipient; proposed a low-complexity multiple-access code for the MAC layer and implemented its decoder on an FPGA-driven hardware testbed. Certificate No. GEDC-02250500318.' },
  { iso: '2025-06', date: 'Jun. 2025', category: 'Scholarship',
    title: 'Huawei Scholarship',
    text: 'Southeast University Education Foundation (SEUEF), top 1.5%, 15 of 992 Ph.D. students.' },
  { iso: '2024-11', date: 'Nov. 2024', category: 'Scholarship',
    title: 'National Scholarship',
    text: 'Ministry of Education of China, top 2%, 20 of 992 Ph.D. students; Certificate No. BSY202403983.' },
  { iso: '2024-09', date: 'Sep. 2024', category: 'Scholarship',
    title: 'First Prize Scholarship',
    text: 'Southeast University, top 10%, 17 of 167 Ph.D. students.' },
  { iso: '2024-06', date: 'Jun. 2024', category: 'Honour',
    title: 'Exemplary Reviewer', text: 'Journal of IET Communications.' },
  { iso: '2023-09', date: 'Sep. 2023', category: 'Honour',
    title: 'Best Teaching Assistant Award', text: '' },
  { iso: '2023-01', date: 'Jan. 2023', category: 'Competition',
    title: 'National Second Prize, China Post-Graduate Mathematical Contest in Modeling',
    text: 'Team leader and first-listed recipient; designed and validated localization and tracking algorithms, alongside hardware impairment compensation techniques. Certificate No. A2022200092.' },
  { iso: '2020-12', date: 'Dec. 2020', category: 'Competition',
    title: 'National Second Prize, Chinese Mathematics Competitions for College Students',
    text: 'Individual competition. Certificate No. CMS F20200787.' }
];

/* ---------------------------- Talks -------------------------------------- */
SITE.TALKS = [
  { iso: '2026-09-20', date: 'Sep. 20, 2026', kind: 'Invited Talk',
    title: 'Finite-Blocklength ISAC Multiple Access: Limits, Tradeoffs, and Practical Design',
    where: 'the 9th International Conference on Information Communication and Signal Processing' },
  { iso: '2026-06-15', date: 'Jun. 15, 2026', kind: 'Invited Presentation',
    title: 'Finite-Blocklength Massive Connectivity',
    where: 'Xinghang Programme Final Competition, Wuhan, China (host: Journal of Electronics and Information Technology)' },
  { iso: '2026-04-01', date: 'Apr. 1, 2026', kind: 'Invited Seminar',
    title: 'Finite-Blocklength Fluid Antenna System (FBL-FAS): Theory and Applications',
    where: 'Wireless Valley, Nanjing, China (host: Southeast University)' },
  { iso: '2025-12-09', date: 'Dec. 9, 2025', kind: 'Invited Seminar',
    title: 'Unsourced Random Access (URA) for Quasi-Static MIMO: From Analysis to Implementation',
    where: 'Institute for Communication Systems (ICS) Seminar, University of Surrey, Guildford, UK (host: Prof. Pei Xiao, Dr. Ahmed Elzanaty)' },
  { iso: '2025-11-03', date: 'Nov. 3–6, 2025', kind: 'Invited Seminar',
    title: 'Finite-Blocklength Fluid Antenna Systems: Theory and Application',
    where: 'WiNOW 2025, IEEE ComSoc UK and Ireland Chapter, virtual' }
];

/* ---------------------------- Mentoring ---------------------------------- */
SITE.MENTORING = {
  lead: 'Throughout the Ph.D. and since then, I have mentored 7 junior researchers, working with them on research direction, simulation development, result interpretation, and manuscript preparation. This has yielded 11 publications with the mentee as first author and myself as second or corresponding author.',
  /* iso = 指导开始的年月，页面按它从新到旧排序并编号 */
  people: [
    { iso: '2025-09', name: 'Haoyu Liang',  span: 'Ph.D., 2025–present', note: 'IEEE ICC Workshops 2026; IEEE WCNC Workshops 2026.' },
    { iso: '2025-09', name: 'Wangqi Shi',   span: 'Ph.D., 2025–present', note: 'IEEE Trans. Wireless Commun. (minor revision, R2).' },
    { iso: '2024-09', name: 'Yuanhui Wu',   span: 'MSc, 2024–present',   note: 'IEEE Wireless Commun. Lett., 2026 (corresponding author); IEEE Trans. Commun., under review.' },
    { iso: '2024-09', name: 'Sen Chen',     span: 'MSc, 2024–present',   note: 'IEEE Commun. Lett., 2026.' },
    { iso: '2022-09', name: 'Jingyuan Xu',  span: 'BSc thesis student, 2022–2026; MSc from Sep. 2026', note: 'IEEE SPAWC 2026; IEEE WCNC 2026 Workshops.' },
    { iso: '2022-09', name: 'Keru Zhou',    span: 'MSc, 2022–2026',      note: 'IEEE VTC2025-Spring.' },
    { iso: '2022-09', name: 'Qianqian Sun', span: 'MSc, 2022–2025',      note: 'IEEE ICTC 2024; WCSP 2024. Awarded the Southeast University Zhishan Scholarship and Southeast University Merit Graduate Student twice.' }
  ]
};

/* ---------------------------- Service ------------------------------------ */
SITE.SERVICE = [
  { group: 'Workshop Organization', numbered: true, items: [
    { iso: '2027-05', role: 'General Co-chair', title: 'Workshop on Fluid Antenna System (FAS) for 6G, IEEE ICC 2027', where: 'Washington, DC, USA', date: 'May 30 – Jun. 3, 2027' },
    { iso: '2027-04', role: 'General Co-chair', title: 'Workshop on Fluid Antenna System (FAS) for 6G, IEEE WCNC 2027', where: 'Panama', date: 'Apr. 5–8, 2027' },
    { iso: '2026-12', role: 'General Co-chair', title: 'Workshop on Fluid Antenna System (FAS) for 6G, IEEE Ucom 2026', where: 'Hong Kong SAR, China', date: 'Dec. 16–18, 2026' }
  ] },
  { group: 'Reviewer Service', items: [
    { role: '60+', title: 'reviewing assignments.', where: '', date: '' },
    { role: 'Reviewer', title: 'for premier venues including IEEE JSAC, IEEE Transactions on Wireless Communications, IEEE Wireless Communications Letters, IEEE Communications Letters, IEEE Wireless Communications Magazine, IEEE ICC, IEEE Globecom, IEEE WCNC, and related venues.', where: '', date: '' }
  ] }
];

/* ---------------------------- Teaching ----------------------------------- */
SITE.TEACHING = [
  { iso: '2025-09', date: 'Feb. 2023 – Sep. 2025',
    org: 'Southeast University', place: 'Nanjing, China',
    role: 'Teaching Assistant, Academic English Writing, Graduate School',
    points: [
      'Provided instructional support to over 373 students in three academic years.',
      'Best Teaching Assistant Award, awarded twice in Sep. 2023 and Sep. 2025.'
    ] }
];
