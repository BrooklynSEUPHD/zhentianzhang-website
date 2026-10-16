/* ==========================================================================
   data.dog.js — My Lovely Dog 栏目
   原主页没有这部分内容，这里是一套可直接替换的模板：
     · 改 facts 里的 value（留空会显示 —）
     · 改 intro 一句话
     · gallery 里放照片，photo 填 assets/img/dog/ 下的文件名
   页面上会带一枚「模板」小标，替换完内容后把 template 改成 false 即可去掉。
   ========================================================================== */

window.SITE = window.SITE || {};

SITE.DOG = {
  template: false,
  intro: 'The best companion and miracle in my life - SAN QI passed away in the morning on 4th Oct. 2026, love you always.',

  facts: [
    { label: 'Name',          value: 'SAN QI (37)' },
    { label: 'Breed',         value: 'Chinese Puppy' },
    { label: 'Birthday',      value: '7th March (the day we met)' },
    { label: 'Favourite thing', value: 'Petting Belly' }
  ],

  gallery: [
    { date: 'Some day', title: 'A Moment of Dwelling',
      text: "Wondering what's in his mind, maybe just boring?",
      photo: 'assets/img/dog/01.jpg' },
    { date: 'some day', title: 'Fuzzy and Cozzy!',
      text: "Really Good Looking Moment!",
      photo: 'assets/img/dog/02.jpg' },
    { date: 'some day', title: 'Sleeping Puppy',
      text: "Good body ratio, look how long his legs are!!",
      photo: 'assets/img/dog/03.jpg' }
  ]
};
