/* ==========================================================================
   data.publications.js — 论文数据（唯一需要改动的论文维护入口）
   --------------------------------------------------------------------------
   如何新增一篇论文：
     1. 在 PUBLISHED（已录用/已发表）或 IN_REVIEW（未录用/在审/预印本）数组里
        复制任意一条，按字段填写即可。
     2. venue 填 VENUES 里的 key（如 'twc'）；新期刊/会议请在 VENUES 里加一项。
     3. authors 是数组，把你自己写成 'Z. Zhang'，self 填它在数组里的序号
        （从 0 开始）；共同一作/通讯用 flags 标注。
     4. metrics 里的 if / quartile 只有确认过才填；不填就不显示，不要猜。
     5. 序号（[J1]）由渲染时自动生成，不用手写。
   ========================================================================== */

window.SITE = window.SITE || {};

/* --------------------------------------------------------------------------
   1. 期刊与会议字典
      name = 全称，abbr = 缩写；页面上统一显示成「全称（缩写）」，
      由 render.js 的 venueText() 负责拼装，新增期刊只要照抄一行。
   -------------------------------------------------------------------------- */
SITE.VENUES = {
  jsac:  { type: 'journal',    name: 'IEEE Journal on Selected Areas in Communications',                     short: 'IEEE J. Sel. Areas Commun.',      abbr: 'IEEE JSAC' },
  jstsp: { type: 'journal',    name: 'IEEE Journal of Selected Topics in Signal Processing',                 short: 'IEEE J. Sel. Top. Signal Process.', abbr: 'IEEE JSTSP' },
  twc:   { type: 'journal',    name: 'IEEE Transactions on Wireless Communications',                         short: 'IEEE Trans. Wireless Commun.',    abbr: 'IEEE TWC' },
  tcom:  { type: 'journal',    name: 'IEEE Transactions on Communications',                                  short: 'IEEE Trans. Commun.',             abbr: 'IEEE TCOM' },
  iotj:  { type: 'journal',    name: 'IEEE Internet of Things Journal',                                      short: 'IEEE Internet Things J.',         abbr: 'IEEE IoT-J' },
  tvt:   { type: 'journal',    name: 'IEEE Transactions on Vehicular Technology',                            short: 'IEEE Trans. Veh. Technol.',       abbr: 'IEEE TVT' },
  wcl:   { type: 'journal',    name: 'IEEE Wireless Communications Letters',                                 short: 'IEEE Wireless Commun. Lett.',     abbr: 'IEEE WCL' },
  cl:    { type: 'journal',    name: 'IEEE Communications Letters',                                          short: 'IEEE Commun. Lett.',              abbr: 'IEEE CL' },

  icicsp:{ type: 'conference', name: 'IEEE International Conference on Information Communication and Signal Processing', short: 'Proc. IEEE ICICSP',       abbr: 'ICICSP' },
  cie:   { type: 'conference', name: 'Electromagnetic Spectrum Academic Conference, Chinese Institute of Electronics', short: 'Proc. CIE EMS Conf.', abbr: 'CIE EMS' },
  ccai:  { type: 'conference', name: 'IEEE International Conference on Computer Communication and Artificial Intelligence', short: 'Proc. IEEE CCAI',     abbr: 'CCAI' },
  wcncw: { type: 'conference', name: 'IEEE Wireless Communications and Networking Conference Workshops',      short: 'Proc. IEEE WCNC Wkshps',         abbr: 'WCNC Wkshps' },
  gcwk:  { type: 'conference', name: 'IEEE Global Communications Conference Workshops',                       short: 'Proc. IEEE GLOBECOM Wkshps',     abbr: 'GLOBECOM Wkshps' },
  vtc:   { type: 'conference', name: 'IEEE Vehicular Technology Conference',                                  short: 'Proc. IEEE VTC',                  abbr: 'IEEE VTC' },
  iccc:  { type: 'conference', name: 'IEEE/CIC International Conference on Communications in China',          short: 'Proc. IEEE/CIC ICCC',            abbr: 'ICCC' },
  wcnc:  { type: 'conference', name: 'IEEE Wireless Communications and Networking Conference',                short: 'Proc. IEEE WCNC',                 abbr: 'IEEE WCNC' },
  spawc: { type: 'conference', name: 'IEEE International Workshop on Signal Processing Advances in Wireless Communications', short: 'Proc. IEEE SPAWC',  abbr: 'IEEE SPAWC' },
  iccw:  { type: 'conference', name: 'IEEE International Conference on Communications Workshops',            short: 'Proc. IEEE ICC Wkshps',          abbr: 'ICC Wkshps' },
  wcsp:  { type: 'conference', name: 'IEEE International Conference on Wireless Communications and Signal Processing', short: 'Proc. IEEE WCSP',            abbr: 'WCSP' },
  ictc:  { type: 'conference', name: 'Information Communication Technologies Conference',                     short: 'Proc. IEEE ICTC',                 abbr: 'ICTC' },
  isac:  { type: 'conference', name: 'IEEE Integrated Sensing and Communication Conference',                       short: 'Proc. ISAC',                      abbr: 'ISAC' },
  apcc:  { type: 'conference', name: 'IEEE Asia-Pacific Conference on Communications',                             short: 'Proc. APCC',                      abbr: 'APCC' }

};

/* --------------------------------------------------------------------------
   2. 已录用 / 已发表（含 to be presented）
      排序规则由渲染层保证：journal 在前 → conference 在后，各自内一作 → 非一作
      同刊内按影响因子由高到低、年份由近到远。此处顺序可随意，不必手动排。
   -------------------------------------------------------------------------- */
SITE.PUBLISHED = [
  /* ---------- Journal · first author ---------- */
  { venue: 'twc', year: 2026,
    authors: ['Z. Zhang', 'K.-K. Wong', 'K. Meng', 'D. Morales-Jimenez', 'H. Jiang', 'C. Masouros', 'H. Shin', 'Z. Zhang'], self: 0,
    title: 'Geometry-structured channel reconstruction for conventional and fluid antenna systems: Bayesian inference and fundamental limits',
    metrics: { if: 10.7, quartile: 'Q1' },
    contribution: 'This paper reveals the fundamental limits of geometry-structured channel reconstruction for multi-path channels with angular sparsity in both conventional and fluid antenna systems, and proposes a bound-approaching approximate message passing (AMP) algorithm.',
    links: { doi: '10.1109/twc.2026.3748177' } },

  { venue: 'jsac', year: 2026,
    authors: ['Z. Zhang', 'K.-K. Wong', 'J. Dang', 'Z. Zhang', 'C.-B. Chae'], self: 0,
    title: 'On fundamental limits for fluid antenna-assisted integrated sensing and communications for unsourced random access',
    detail: 'vol. 44, pp. 136–149',
    metrics: { if: 17.3, quartile: 'Q1' },
    flags: ['ESI Highly Cited Paper', 'Best Poster Award'],
    contribution: 'Developed a FAS-enabled unsourced ISAC random access framework with performance bounds, revealing spatial diversity and asynchronous multiplexing improve scalability, reliability, and sensing resolution.',
    links: { doi: '10.1109/jsac.2025.3608113' } },

  { venue: 'jstsp', year: 2026,
    authors: ['Z. Zhang', 'J. Dang', 'D. Morales-Jimenez', 'H. Jiang', 'Z. Zhang', 'C. Masouros', 'C.-B. Chae'], self: 0,
    title: 'Joint activity detection and channel estimation for fluid antenna system exploiting geographical and angular information',
    detail: 'vol. 20, no. 3, pp. 354–370, Apr.',
    metrics: { if: 13.5, quartile: 'Q1' },
    flags: ['ESI Highly Cited Paper'],
    contribution: 'Developed a geometry-structured EM-AMP framework for FAS channel reconstruction, revealing angular/geographical information improves CSI accuracy, convergence speed, and complexity scalability.',
    links: { doi: '10.1109/jstsp.2026.3673148' } },

  { venue: 'twc', year: 2026,
    authors: ['Z. Zhang', 'C. Masouros', 'K.-K. Wong', 'H. Jiang', 'K. Meng', 'F. Rostami Ghadi', 'M. J. Ahmadi', 'C.-B. Chae'], self: 0,
    title: 'Finite-blocklength ISAC multiple access',
    detail: 'vol. 25, pp. 22669–22686',
    metrics: { if: 10.7, quartile: 'Q1' },
    contribution: 'Characterized finite-blocklength ISAC multiple access performance bounds, revealing energy-efficiency and communication-sensing tradeoffs, decoding/sensing floors, and CD-NOMA robustness under dense access.',
    links: { doi: '10.1109/twc.2026.3727293' } },

  { venue: 'twc', year: 2026,
    authors: ['Z. Zhang', 'K.-K. Wong', 'D. Morales-Jimenez', 'H. Jiang', 'H. Xu', 'C. Masouros', 'Z. Zhang', 'C.-B. Chae'], self: 0,
    title: 'Finite-blocklength fluid antenna systems',
    detail: 'vol. 25, pp. 22148–22164',
    metrics: { if: 10.7, quartile: 'Q1' },
    contribution: 'Developed finite-blocklength FAS analytical tools with EVT, BLER/outage characterizations, and MVTI, revealing superior spatial diversity and energy/spectral/hardware efficiency over multi-FPA systems.',
    links: { doi: '10.1109/twc.2026.3723456' } },

  { venue: 'twc', year: 2026,
    authors: ['Z. Zhang', 'M. J. Ahmadi', 'K.-K. Wong', 'J. Dang', 'Z. Zhang', 'C. Masouros', 'C.-B. Chae'], self: 0,
    title: 'Joint pattern, data and channel estimation for unsourced random access in GMAC and MIMO systems',
    detail: 'vol. 25, pp. 21433–21448',
    metrics: { if: 10.7, quartile: 'Q1' },
    contribution: 'Developed sparse-code URA schemes for massive connectivity with power division and JPDC MIMO reception, improving interference cancellation and false-alarm mitigation without extra overhead.',
    links: { doi: '10.1109/twc.2026.3705749' } },

  { venue: 'twc', year: 2026,
    authors: ['Z. Zhang', 'J. Dang', 'Z. Zhang'], self: 0,
    title: 'Unsourced random access under quasi-static fading channel: A less-is-more strategy',
    detail: 'vol. 25, pp. 3287–3300',
    metrics: { if: 10.7, quartile: 'Q1' },
    contribution: 'Developed a Less-Is-More massive-MIMO URA protocol with sparse-frame pattern embedding, revealing implicit transmission enables strong coding, interference tolerance, and near-bound performance.',
    links: { doi: '10.1109/twc.2025.3603032' } },

  { venue: 'twc', year: 2026,
    authors: ['Z. Zhang', 'B. An', 'K.-K. Wong', 'J. Dang', 'C. Masouros', 'Z. Zhang', 'C.-B. Chae'], self: 0,
    title: 'Coded pattern unsourced random access with analyses on sparse pattern demapper',
    detail: 'vol. 25, pp. 5306–5319',
    metrics: { if: 10.7, quartile: 'Q1' },
    contribution: 'Developed CPMA for finite-blocklength MIMO massive access, characterizing non-bijective demapping limits and revealing sparse-pattern projection enables energy-efficient, bound-approaching performance.',
    links: { doi: '10.1109/twc.2025.3617544' } },

  { venue: 'twc', year: 2024,
    authors: ['Z. Zhang', 'J. Dang', 'Z. Zhang', 'L. Wu', 'B. Zhu', 'Y. Wu'], self: 0,
    title: 'Unsourced random access via random scattering with turbo probabilistic data association detector and treating collision as interference',
    detail: 'vol. 23, no. 12, pp. 17899–17914, Dec.',
    metrics: { if: 10.7, quartile: 'Q1' },
    contribution: 'Developed a random-scattering URA transceiver with CS/CC-LDPC data splitting, turbo MUD, sliding-window decoding, and collision-as-interference resolution, improving convergence/detection accuracy.',
    links: { doi: '10.1109/twc.2024.3466213' } },

  { venue: 'twc', year: 2024,
    authors: ['Z. Zhang', 'J. Dang', 'Z. Zhang', 'L. Wu', 'B. Zhu', 'L. Wang'], self: 0,
    title: 'Pilot-free unsourced random access via dictionary learning and error-correcting codes',
    detail: 'vol. 23, no. 7, pp. 7488–7502, Jul.',
    metrics: { if: 10.7, quartile: 'Q1' },
    contribution: 'Developed a pilot-free URA protocol for massive-access with sparse-frame codebooks, dictionary-learning/ECC reception, and collision resolution, enabling energy-efficient, low-latency practical deployment.',
    links: { doi: '10.1109/twc.2023.3341800' } },

  { venue: 'twc', year: 2024,
    authors: ['Z. Zhang', 'J. Dang', 'Z. Zhang', 'L. Wu', 'B. Zhu'], self: 0,
    title: 'Unsourced random access via random dictionary learning with pilot-free transceiver design',
    detail: 'vol. 23, no. 12, pp. 17884–17898, Dec.',
    metrics: { if: 10.7, quartile: 'Q1' },
    contribution: 'Developed pilot-free Rayleigh-fading random access with concatenated coding, random dictionary learning, joint channel pruning, and SIC, reducing collision/false-alarm errors and characterizing performance bounds.',
    links: { doi: '10.1109/twc.2024.3457611' } },

  { venue: 'iotj', year: 2024,
    authors: ['Z. Zhang', 'J. Dang', 'Y. Qi', 'Z. Zhang', 'L. Wu', 'H. Wang'], self: 0,
    title: 'Efficient ODMA for unsourced random access in MIMO and hybrid massive MIMO',
    detail: 'vol. 11, no. 23, pp. 38846–38860, Dec.',
    metrics: { if: 8.9, quartile: 'Q1' },
    contribution: 'Developed probabilistic ODMA transceivers for hybrid massive-MIMO URA, enabling pilot-free joint pattern/data detection, sparsity-aided low-rank channel estimation, and iterative TIN interference suppression.',
    links: { doi: '10.1109/jiot.2024.3454260' } },

  { venue: 'tvt', year: 2026,
    authors: ['Z. Zhang', 'K.-K. Wong', 'J. Dang', 'Z. Zhang', 'C. Masouros', 'C.-B. Chae'], self: 0,
    title: 'Integrated sensing and communications for unsourced random access via spectrum sharing compressive sensing approach with massive MIMO receiver',
    detail: 'vol. 75, no. 7, pp. 13338–13350, Jul.',
    metrics: { if: 7.1, quartile: 'Q1' },
    contribution: 'Developed SSCS-UNISAC transceiver for overloaded mMTC, using non-orthogonal power/code-domain sensing-communication projection and SIC decoding to approach information-theoretic bounds.',
    links: { doi: '10.1109/tvt.2026.3657304' } },

  { venue: 'tvt', year: 2025,
    authors: ['Z. Zhang', 'J. Dang', 'Z. Zhang', 'L. Wu', 'B. Zhu'], self: 0,
    title: 'Uncoupled unsourced random access: Exploiting geographical diversity of access points',
    detail: 'vol. 74, no. 6, pp. 9882–9887, Jun.',
    metrics: { if: 7.1, quartile: 'Q1' },
    contribution: 'Developed uncoupled cell-free MIMO URA with parity-free concatenated coding, location-aided channel estimation/signal stitching, and SIC, improving restoration without CCS-style overhead.',
    links: { doi: '10.1109/tvt.2025.3531912' } },

  { venue: 'tvt', year: 2025,
    authors: ['Z. Zhang', 'J. Dang', 'Z. Zhang', 'L. Wu', 'B. Zhu'], self: 0,
    title: 'Unsourced random access with uncoupled compressive sensing and forward error correction',
    detail: 'vol. 74, no. 2, pp. 3555–3560, Feb.',
    metrics: { if: 7.1, quartile: 'Q1' },
    contribution: 'Developed Rayleigh-fading URA with uncoupled CS/FEC, AM power-division signaling, and AMP post-variance fusion, boosting efficiency without codebook changes under small-antenna underdetermined MUD.',
    links: { doi: '10.1109/tvt.2024.3471653' } },

  { venue: 'tvt', year: 2025,
    authors: ['Z. Zhang', 'J. Dang', 'Z. Zhang'], self: 0,
    title: 'Probabilistic ODMA receiver with low-complexity algorithm for MIMO unsourced random access',
    detail: 'vol. 74, no. 10, pp. 16556–16561, Oct.',
    metrics: { if: 7.1, quartile: 'Q1' },
    contribution: 'Designed pilot-uncoupled/free MIMO ODMA-URA receivers with AMP-based linear-complexity JPDD, pilot-free matrix-factorization initialization, ambiguity resolution, and 13-dB benchmark gains.',
    links: { doi: '10.1109/tvt.2025.3570708' } },

  { venue: 'wcl', year: 2026,
    authors: ['Z. Zhang', 'Y. Wu', 'K.-K. Wong', 'H. Jiang', 'A. Li'], self: 0,
    title: 'Jointly correlated dual-side fluid antenna system',
    detail: 'vol. 15, pp. 4370–4374',
    metrics: { if: 5.1, quartile: 'Q1' },
    contribution: 'Studied jointly correlated non-separable dual-side FAS ergodic capacity under statistical eigenmode transmission, deriving permanent-based bounds, projected-gradient power allocation, and imperfect CSI.',
    links: { doi: '10.1109/lwc.2026.3710907' } },

  { venue: 'wcl', year: 2026,
    authors: ['Z. Zhang', 'K.-K. Wong', 'D. Morales-Jimenez', 'H. Jiang', 'P. Ramírez-Espinosa', 'C.-B. Chae', 'C. Masouros'], self: 0,
    title: 'Finite-blocklength fluid antenna systems with spatial block-correlation channel model',
    detail: 'vol. 15, pp. 1911–1915',
    flags: ['ESI Highly Cited Paper'],
    metrics: { if: 5.1, quartile: 'Q1' },

    contribution: 'Analyzed finite-blocklength-coded FAS under spatial block-correlation channels, characterizing random-coding limits and diversity gains over fixed-antenna systems via analysis and simulation.',
    links: { doi: '10.1109/lwc.2026.3666168' } },

  { venue: 'wcl', year: 2026,
    authors: ['Z. Zhang', 'K.-K. Wong', 'H. Jiang', 'F. R. Ghadi', 'H. Shin', 'Y. Zhang'], self: 0,
    title: 'Finite-aperture fluid antenna array design: Analysis and algorithm',
    detail: 'vol. 15, pp. 3199–3203',
    metrics: { if: 5.1, quartile: 'Q1' },
    contribution: 'Derived finite-aperture FAA design principles via closed-form geometry-variance CRB and random-spacing PDF, enabling gradient port optimization with 30% CRB and 42.5% MSE reductions.',
    links: { doi: '10.1109/lwc.2026.3685911' } },

  { venue: 'wcl', year: 2026,
    authors: ['Z. Zhang', 'K.-K. Wong', 'H. Jiang', 'C. Masouros', 'C.-B. Chae'], self: 0,
    title: 'Cramér-Rao bounds for activity detection in conventional and fluid antenna systems',
    detail: 'vol. 15, pp. 3059–3063',
    metrics: { if: 5.1, quartile: 'Q1' },
    contribution: 'Developed unified CRB framework for FAS/FPA transmission-activity detection, deriving limit bounds of covariance/coherent closed forms via activity relaxation and RMT, revealing diversity-complexity gains.',
    links: { doi: '10.1109/lwc.2026.3691385' } },

  { venue: 'wcl', year: 2025,
    authors: ['Z. Zhang', 'K.-K. Wong', 'J. Dang', 'Z. Zhang', 'C. Masouros', 'C.-B. Chae'], self: 0,
    title: 'On fundamental limits of slow-fluid antenna multiple access for unsourced random access',
    detail: 'vol. 14, no. 11, pp. 3455–3459, Nov.',
    metrics: { if: 5.1, quartile: 'Q1' },
    contribution: 'Proposed slow-FAMA MIMO URA with closed-form achievable-rate/performance-floor analyses, showing substantial single-/multi-user capacity gains over existing MIMO URA bounds.',
    links: { doi: '10.1109/lwc.2025.3594112' } },

  /* ---------- Journal · co-author ---------- */
  { venue: 'wcl', year: 2026,
    authors: ['K. Zhang', 'Z. Ma', 'L. Zeng', 'H. Jiang', 'Z. Zhang', 'K. K. Wong'], self: 4,
    title: 'Fluid antenna-assisted A2G channels: Second-order statistics under UAV wobble and hardware impairments',
    detail: 'Early Access',
    metrics: { if: 5.1, quartile: 'Q1' },
    /* 投稿时只拿到稿件号 WCL2026-3638，正式 DOI 上线后填到下面这一行即可：
       links: { doi: '10.1109/lwc.2026.xxxxxxx' } */
    links: {} },

  { venue: 'twc', year: 2026,
    authors: ['F. Rostami Ghadi', 'K.-K. Wong', 'F. Javier López-Martínez', 'Z. Zhang', 'H. Shin', 'H. Jiang', 'C. Masouros'], self: 3,
    title: 'Information-theoretic limits of fluid antenna-aided ISAC with representation constraints',
    detail: 'Early Access',
    flags: ['Collaborated work'],
    links: { doi: '10.1109/TWC.2026.3741754'} },
  
  { venue: 'cl', year: 2026,
    authors: ['M. J. Ahmadi', 'Z. Zhang', 'R. F. Schaefer', 'H. Vincent Poor'], self: 1,
    title: 'MAP-Based Task-Oriented Precoding for Multiuser Communication',
    detail: 'vol. 30, pp. 3312–3316',
    flags: ['Collaborated work'],
    links: { doi: '10.1109/lcomm.2026.3735912'} },

  { venue: 'cl', year: 2026,
    authors: ['S. Chen', 'Z. Zhang', 'H. Jiang', 'K.-K. Wong', 'A. Li', 'F. Rostami Ghadi', 'H. Shin'], self: 1,
    title: 'Near-field beamforming and port selection for fluid antenna systems',
    detail: 'vol. 30, pp. 2248–2252',
    flags: ['Mentored work'],
    links: { doi: '10.1109/lcomm.2026.3702003' } },

  { venue: 'wcl', year: 2026,
    authors: ['Y. Wu', 'Z. Zhang', 'H. Jiang', 'K.-K. Wong', 'C.-B. Chae'], self: 1, corresponding: true,
    title: 'Learned-approximate message passing under Karhunen–Loève modeling for fluid antenna systems',
    detail: 'vol. 15, pp. 2719–2723',
    metrics: { if: 5.1, quartile: 'Q1' },
    flags: ['Corresponding author', 'Mentored work'],
    links: { doi: '10.1109/lwc.2026.3682568' } },

  { venue: 'twc', year: 2024,
    authors: ['Y. Qi', 'J. Dang', 'Z. Zhang', 'Z. Zhang', 'L. Wu', 'Y. Wu'], self: 2,
    title: 'FBMC-based massive connectivity with asynchronous transmission in frequency-selective fading channels',
    detail: 'vol. 23, no. 12, pp. 18951–18968, Dec.',
    metrics: { if: 10.7, quartile: 'Q1' },
    links: { doi: '10.1109/twc.2024.3465488' } },

  { venue: 'cl', year: 2024,
    authors: ['J. Dang', 'Z. Zhang', 'Z. Zhang', 'L. Wu', 'B. Zhu'], self: 1,
    title: 'Orthogonal matching non-negative least squares for activity detection in unsourced random access',
    detail: 'vol. 28, no. 5, pp. 1191–1195, May',
    links: { doi: '10.1109/lcomm.2024.3374757' } },

  /* ---------- Conference · first author ---------- */
  { venue: 'isac', year: 2026,
    authors: ['Z. Zhang', 'K. Meng', 'H. Jiang', 'Z. Zhang'], self: 0,
    title: 'Finite-blocklength ISAC multiple access: A source-channel coding perspective',
    detail: 'to be presented, Nov.',
    contribution: 'Developed energy-constrained AP wake-up for cell-free bistatic ISAC with PCRB-guided SCA-SDP optimization, showing sparse clustering and near-bound tracking under tight budgets.' 
    },

  { venue: 'icicsp', year: 2026,
    authors: ['Z. Zhang', 'K. Meng', 'Y. Zhang', 'Z. Zhang', 'H. Jiang', 'L. Liu', 'N. Su', 'T. Liang'], self: 0,
    title: 'Energy-constrained AP wake-up for joint terrestrial-aerial tracking in cell-free bistatic ISAC',
    detail: 'presented, Sep.',
    flags: ['Best Paper Award'],
    contribution: 'Developed energy-constrained AP wake-up for cell-free bistatic ISAC with PCRB-guided SCA-SDP optimization, showing sparse clustering and near-bound tracking under tight budgets.' },

  { venue: 'cie', year: 2026,
    authors: ['Z. Zhang', 'H. Jiang', 'Z. Zhang'], self: 0,
    title: 'Electromagnetic-aware fluid antenna array: Modeling and beamforming',
    detail: 'presented, Jul., in Chinese',
    flags: ['Annual Frontier Science and Technology Paper Award'],
    contribution: 'Developed an EM-aware current-domain FAA beamforming framework, revealing that position-current co-design reduces sidelobes under coupling, power, voltage, and spacing constraints.' },

  { venue: 'ccai', year: 2026,
    authors: ['Z. Zhang', 'C. Masouros', 'K.-K. Wong', 'J. Dang', 'Z. Zhang', 'K. Meng', 'F. R. Ghadi', 'M. J. Ahmadi'], self: 0,
    title: 'Fundamental tradeoffs for ISAC multiple access in finite-blocklength regime',
    detail: 'pp. 552–557, May',
    flags: ['Best Paper Award'],
    contribution: 'Derived FBL ISAC multiple-access tradeoff bounds with codebook-geometry error decomposition, revealing how user cross-correlation constrains communication rate and sensing accuracy.',
    links: { doi: '10.1109/ccai69603.2026.11641918' } },

  { venue: 'wcncw', year: 2026,
    authors: ['Z. Zhang', 'D. Morales-Jimenez', 'H. Jiang', 'C. Masouros'], self: 0,
    title: 'A universal block error rate bound for fluid antenna systems',
    detail: 'Apr.',
    contribution: 'Established a universal FBL-FAS BLER bound with Chernoff-based analysis, showing accurate model-aware and model-free performance benchmarking across FAS architectures.',
    links: { doi: '10.1109/wcncw67598.2026.11555441' } },

  { venue: 'gcwk', year: 2025,
    authors: ['Z. Zhang', 'D. Morales-Jimenez', 'J. Dang', 'Z. Zhang', 'C. Masouros', 'H. Jiang'], self: 0,
    title: 'Low-complexity CSI acquisition exploiting geographical diversity in fluid antenna system',
    detail: 'pp. 308–313, Dec.',
    contribution: 'Developed geography-aided EM-AMP CSI acquisition for FAS, showing improved estimation precision, faster convergence, and lower complexity without prior channel models.',
    links: { doi: '10.1109/gcwkshps68340.2025.11591137' } },

  { venue: 'vtc', year: 2025, venueNote: 'VTC2025-Fall',
    authors: ['Z. Zhang', 'M. J. Ahmadi', 'J. Dang', 'K.-K. Wong', 'Z. Zhang', 'C. Masouros'], self: 0,
    title: 'Sparse code transceiver design for unsourced random access with analytical power division in Gaussian MAC',
    detail: 'pp. 1–5, Oct.',
    contribution: 'Derived an analytical power-division sparse-code transceiver for GMAC URA, showing about 2.8 dB gain without simulation-based power tuning.',
    links: { doi: '10.1109/vtc2025-fall65116.2025.11310294' } },

  { venue: 'iccc', year: 2025,
    authors: ['Z. Zhang', 'J. Dang', 'Z. Zhang'], self: 0,
    title: 'Integrated sensing and communications for unsourced random access: A two-phase approach with slotted transmission',
    detail: 'pp. 1–6, Aug.',
    contribution: 'Developed a two-phase slotted concatenated-code UNISAC protocol, showing 15–30 dB capacity gains and near-bound performance before 1000 active users.',
    links: { doi: '10.1109/iccc65529.2025.11148951' } },

  { venue: 'vtc', year: 2025, venueNote: 'VTC2025-Spring',
    authors: ['Z. Zhang', 'J. Dang', 'K.-K. Wong', 'Z. Zhang', 'C. Masouros'], self: 0,
    title: 'Integrated sensing and communications for unsourced random access: A spectrum sharing compressive sensing approach',
    detail: 'pp. 1–6, Jun.',
    contribution: 'Developed a spectrum-sharing compressive-sensing UNISAC framework, revealing robust massive connectivity with 20–30 dB capacity gains over TDMA and ALOHA.',
    links: { doi: '10.1109/vtc2025-spring65109.2025.11174834' } },

  { venue: 'wcnc', year: 2025,
    authors: ['Z. Zhang', 'J. Dang', 'Z. Zhang'], self: 0,
    title: 'LIM-URA: A less-is-more strategy for quasi-static fading unsourced random access',
    detail: 'pp. 1–6, Mar.',
    contribution: 'Developed the LIM-URA sparse transmission strategy for quasi-static MIMO fading, showing near-bound capacity through energy-concentrated signaling and low-complexity decoding.',
    links: { doi: '10.1109/wcnc61545.2025.10978186' } },

  /* ---------- Conference · co-author ---------- */
  
  { venue: 'apcc', year: 2026,
    authors: ['Y. Zhang', 'R. Jäntti', 'Y. Wang', 'X. Li', 'T. Wu'], self: 1,
    title: 'Low Probability of Target Detection in Wireless Sensing by Harnessing Reconfigurable-antenna based Reflectors',
    detail: 'to be presented',
    flags: ['Collaborated work'],
    // links: { arxiv: 'https://arxiv.org/abs/2606.31139' } 
    },

  { venue: 'spawc', year: 2026,
    authors: ['H. Liang', 'Z. Zhang', 'J. Dang', 'H. Jiang', 'Z. Zhang'], self: 1,
    title: 'Fluid-antenna-aided active user detection with 1D-CNN channel reconstruction for unsourced random access',
    detail: 'to be presented',
    flags: ['Mentored work'],
    links: { arxiv: 'https://arxiv.org/abs/2606.31139' } },

  { venue: 'iccw', year: 2026,
    authors: ['H. Liang', 'Z. Zhang', 'J. Dang', 'H. Jiang', 'Z. Zhang'], self: 1,
    title: 'DoA estimation based on Deep Learning-MUSIC hybrid algorithm with fluid antenna for closely spaced signals',
    detail: 'pp. 1–6, May',
    flags: ['Mentored work'],
    links: { doi: '10.1109/iccworkshops63917.2026.11586648' } },

  { venue: 'wcncw', year: 2026,
    authors: ['H. Liang', 'Z. Zhang', 'J. Dang', 'H. Jiang', 'Z. Zhang'], self: 1,
    title: 'Neural networks-enabled channel reconstruction for fluid antenna systems: A data-driven approach',
    detail: 'pp. 1–6, Apr.',
    flags: ['Mentored work'],
    links: { doi: '10.1109/wcncw67598.2026.11555202' } },

  { venue: 'spawc', year: 2026,
    authors: ['J. Xu', 'Z. Zhang', 'H. Jiang', 'J. Dang', 'Z. Zhang'], self: 1,
    title: 'Fluid antenna-assisted unsourced ISAC massive access',
    detail: 'to be presented',
    flags: ['Mentored work'],
    links: { arxiv: 'https://arxiv.org/abs/2606.29978' } },

  { venue: 'wcncw', year: 2026,
    authors: ['J. Xu', 'Z. Zhang', 'J. Dang', 'H. Jiang', 'Z. Zhang'], self: 1,
    title: 'Fluid antenna-enhanced flexible beamforming',
    detail: 'pp. 1–6, Apr.',
    flags: ['Mentored work'],
    links: { doi: '10.1109/wcncw67598.2026.11555734' } },

  { venue: 'vtc', year: 2025, venueNote: 'VTC2025-Spring',
    authors: ['K. Zhou', 'Z. Zhang', 'J. Dang', 'Q. Sun', 'Z. Zhang'], self: 1,
    title: 'Sparsity-exploiting channel estimation for unsourced random access with Fluid Antenna',
    detail: 'pp. 1–7, Jun.',
    flags: ['Mentored work'],
    links: { doi: '10.1109/vtc2025-spring65109.2025.11174462' } },

  { venue: 'wcsp', year: 2024,
    authors: ['Q. Sun', 'Z. Zhang', 'J. Dang', 'Z. Zhang'], self: 1,
    title: 'Non-negative least squares exploiting multiple measurements in unsourced random access',
    detail: 'pp. 536–542, Oct.',
    flags: ['Mentored work'],
    links: { doi: '10.1109/wcsp62071.2024.10827794' } },

  { venue: 'ictc', year: 2024,
    authors: ['Q. Sun', 'Z. Zhang', 'J. Dang', 'Z. Zhang', 'B. Zhu', 'L. Wu'], self: 1,
    title: 'CSI fingerprint positioning algorithm based on data preprocessing and SVM',
    detail: 'pp. 249–253, May',
    flags: ['Mentored work'],
    links: { doi: '10.1109/ictc61510.2024.10601868' } },
];

/* --------------------------------------------------------------------------
   3. 未录用（在审 / 预印本 / 返修中）
   -------------------------------------------------------------------------- */
SITE.IN_REVIEW = [
  { venue: 'twc', year: 2026,
    authors: ['Z. Zhang', 'K.-K. Wong', 'K. Meng', 'D. Morales-Jimenez', 'H. Jiang', 'C. Masouros', 'H. Shin', 'Z. Zhang'], self: 0,
    title: 'Geometry-structured channel reconstruction for conventional and fluid antenna systems: Bayesian inference and fundamental limits',
    detail: 'Major Revision',
    state: 'Major Revision',
    links: { arxiv: 'https://arxiv.org/abs/2606.04001' } },

  { venue: 'twc', year: 2026,
    authors: ['Z. Zhang', 'Y. Wu', 'H. Jiang', 'Z. Chen', 'Z. Zhang'], self: 0,
    title: 'Electromagnetic-aware fluid antenna array',
    detail: 'Major Revision',
    state: 'Major Revision',
    links: { arxiv: 'https://arxiv.org/abs/2607.21375' } },

  { venue: 'twc', year: 2026,
    authors: ['Z. Zhang', 'H. Jiang', 'H. Xu', 'S. Gao', 'Z. Zhang', 'J. Wang'], self: 0,
    title: 'Geometry diversity in fluid antenna arrays: A new degree of freedom for squint-free wideband beamforming',
    detail: 'Under Review',
    state: 'Under Review' },

  { venue: 'tcom', year: 2026,
    authors: ['Z. Zhang', 'H. Hong', 'K.-K. Wong', 'H. Jiang', 'Z. Zhang', 'F. Shu', 'Y. Xu', 'W. Zhang', 'J. Wang'], self: 0,
    title: 'Colored-residual maximum-likelihood detection for fluid antenna systems',
    detail: 'Under Review',
    state: 'Under Review' },

  { venue: 'twc', year: 2026,
    authors: ['Z. Zhang', 'J. Xu', 'K.-K. Wong', 'H. Jiang', 'Z. Zhang', 'H. Shin'], self: 0,
    title: 'Finite-aperture fluid planar array design',
    detail: 'Under Review',
    state: 'Under Review',
    links: { arxiv: 'https://arxiv.org/abs/2605.22040' } },

  { venue: 'tcom', year: 2026,
    authors: ['Z. Zhang', 'H. Jiang', 'K.-K. Wong', 'H. Shin', 'R. Murch'], self: 0,
    title: 'Beyond covariance: Generative spatial correlation modeling and channel interpolation for fluid antenna systems',
    detail: 'Under Review',
    state: 'Under Review',
    links: { arxiv: 'https://arxiv.org/abs/2604.16639' } },

  { venue: 'tcom', year: 2026,
    authors: ['Y. Wu', 'Z. Zhang', 'H. Hong', 'H. Jiang', 'Z. Zhang', 'K.-K. Wong', 'Y. Xu', 'W. Zhang'], self: 1,
    title: 'Learned blockwise port activation for real-time beamforming in fluid antenna arrays',
    detail: 'Under Review',
    state: 'Under Review',
    links: { arxiv: 'https://arxiv.org/abs/2607.25365' } },

  { venue: 'twc', year: 2026,
    authors: ['H. Jiang', 'W. Shi', 'Z. Zhang', 'C.-B. Chae', 'K.-K. Wong', 'H. Shin'], self: 2,
    title: 'Modeling and performance analysis for fluid antenna system enabled UAV near-field communications',
    detail: 'Under Review',
    state: 'Under Review',
    links: { arxiv: 'https://arxiv.org/abs/2608.09179' } },
];
