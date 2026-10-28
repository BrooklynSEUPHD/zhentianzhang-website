/* ==========================================================================
   data.news.js — Latest News 栏目
   --------------------------------------------------------------------------
   写法约定：
   · 一条新闻只讲一件事。同一时间有获奖又有入职，就拆成两条。
   · 期刊／会议名一律写成「全称（缩写）」，例如
     IEEE Journal on Selected Areas in Communications (IEEE JSAC)，
     不再用「只有缩写、悬停才看全称」的方式。
   · iso 字段只用于排序（由近到远），不显示在页面上；date 才是显示文字。
   ========================================================================== */

window.SITE = window.SITE || {};

SITE.NEWS = [
  { iso: '2026-10-28', date: 'Oct. 2026', tag: 'Editorship',
    text: 'Became an Editor of IEEE Transactions on Communications (IEEE TCOM), Wireless Communication II area.'},

  { iso: '2026-10-28', date: 'Oct. 2026', tag: 'Special Issue',
    text: 'Serving as a Guest Editor of the IEEE Vehicular Technology Magazine (IEEE VTM) special issue on intelligent antennas for connected, autonomous, and high-mobility systems.'},

  { iso: '2026-10-20', date: 'Oct. 2026', tag: 'Position',
    text: 'Joined the Shenzhen Research Institute, Hong Kong Metropolitan University (HKMU), Hong Kong, China as Research Fellow'},

  { iso: '2026-09-28', date: 'Sep. 2026', tag: 'ESI',
    text: 'The paper published in IEEE Journal of Selected Topics in Signal Processing (JSTSP) was recognized as an ESI Highly Cited Paper' },
  
  { iso: '2026-09-28', date: 'Sep. 2026', tag: 'ESI',
    text: 'The paper published in IEEE Wireless Communications Letters (WCL) was recognized as an ESI Highly Cited Paper' },

  { iso: '2026-09-20', date: 'Sep. 2026', tag: 'Talk',
    text: 'Invited talk at the 9th International Conference on Information Communication and Signal Processing (ICICSP 2026) on energy-constrained AP wake-up for joint terrestrial-aerial tracking.' },

  { iso: '2026-09-19', date: 'Sep. 2026', tag: 'Award',
    text: 'Best Paper Award nomination for the cell-free bistatic ISAC work at the 9th International Conference on Information Communication and Signal Processing (ICICSP 2026).' },
  
  { iso: '2026-07-19', date: 'Jul. 2026', tag: 'Position',
    text: 'Joined the Department of Electrical and Electronic Engineering, The Hong Kong Polytechnic University (HKPolyU) as a Postdoctoral Fellow.' },

  { iso: '2026-07-10', date: 'Jul. 2026', tag: 'Award',
    text: 'Annual Frontier Science and Technology Paper in the Electromagnetic Spectrum Field, Chinese Institute of Electronics.' },

  { iso: '2026-07', date: 'Jul. 2026', tag: 'Paper',
    text: 'The paper published in IEEE Journal on Selected Areas in Communications (IEEE JSAC) was recognized as an ESI Highly Cited Paper in two consecutive rounds.' },

  { iso: '2026-06-20', date: 'Jun. 2026', tag: 'Award',
    text: 'Received the Outstanding Graduate Award (highest tier award) and the Xinghang Distinguished Graduate Researcher title.' },

  { iso: '2026-05-28', date: 'May 2026', tag: 'ESI',
    text: 'The paper published in IEEE Journal on Selected Areas in Communications (IEEE JSAC) was recognized as an ESI Highly Cited Paper' },

  { iso: '2026-05-15', date: 'May 2026', tag: 'Award',
    text: 'Best Paper Award at the 6th International Conference on Computer Communication and Artificial Intelligence (CCAI 2026).' }
];
