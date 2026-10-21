/* ==========================================================================
   data.other.js — Other Things About Me 栏目
   --------------------------------------------------------------------------
   把原来分散的 Industrial Experience、Skills、Certificate 三处合在一起：
     · roles        工业界经历（按时间由近到远，iso 只用于排序）—— 不配图
     · skills       技能与语言（语言类证书请放到 certificates，别写在这里）
     · certificates 资质证书 —— photo 可选，填 assets/img/certificates/ 下的
                    文件名；没有 photo 就只显示文字，缺文件时显示占位框。
   points 为空数组时就不渲染要点列表，可自行补充具体职责与产出。
   ========================================================================== */

window.SITE = window.SITE || {};

SITE.OTHER = {
  industryLead: 'Industrial R&D and engineering practice on the RF and baseband side, complementing the theory-driven work in academia.',
  skillsLead: 'Tools and languages used across simulation, testbeds and manuscript preparation.',
  certLead: 'Formal qualifications outside the core research area.',

  /* ---------------- 工业界经历（不配图） ---------------- */
  roles: [
    { iso: '2025-11', date: 'Sep. 2025 – Nov. 2025',
      org: 'Huawei Technologies', place: 'Nanjing, China',
      role: 'Algorithm Engineer Intern, Wi-Fi LAN',
      points: [] },
    { iso: '2023-08', date: 'Jul. 2023 – Aug. 2023',
      org: 'Huawei Technologies', place: 'Shanghai, China',
      role: 'Algorithm Intern, 5G Network',
      points: [] }
  ],

  /* ---------------- 技能与语言 ---------------- */
  skills: [
    { label: 'Programming', text: 'MATLAB (primary), Python.' },
    { label: 'Languages',   text: 'English (IELTS 7.0); Chinese (native).' }
  ],

  /* ---------------- 资质证书（可选配图） ---------------- */
  certificates: [
    // { name: 'Cambridge Business English Certificate (Higher, C1)',
    //   org: 'Cambridge Assessment English', date: '',
    //   photo: 'assets/img/certificates/cambridge-bec-higher.jpg' },
    { name: 'Cambridge Business English Certificate (Higher, C1)',
      org: 'Cambridge English', date: 'Nov 2023' },
    { name: 'Accounting Professional Qualification (Junior)',
      org: "Ministry of Finance of the People's Republic of China", date: 'May 2023' },
    { name: 'Certified Translator and Interpreter (CATTI) Level 3 (Translator)',
      org: "Ministry of Human Resources and Social Security of the People's Republic of China", date: "Nov 2019"
     }
  ]
};
