---
title: Team
nav:
  order: 3
  tooltip: About our team
---

# {% include icon.html icon="fa-solid fa-users" %}Team

<div style="text-align: center;"> We aim to contribute to a safer, more resilient world through research and innovation in extreme hazard mitigation </div>

{% include section.html %}

<div class="team-layout">

<div class="team-pi"> {% include list.html data="members" component="portrait" filter="group == 'PI'" %} </div>

<div class="team-students"> {% include list.html data="members" component="portrait" filter="group == 'Student'" sort="order" %} </div>

<div class="team-alumni">
  <h2>Alumni</h2>

  {% include list.html
    data="members"
    component="portrait"
    filter="group == 'Alumni'"
    sort="order"
  %}
</div>

</div>

<style> .team-layout { display: grid; grid-template-columns: 240px minmax(0, 1fr); gap: 60px; align-items: start; max-width: 950px; margin: 40px auto 0; } .team-pi { min-width: 0; } .team-students { min-width: 0; } /* 교수 목록 */ .team-pi .list { display: grid; grid-template-columns: 1fr; margin: 0; padding: 0; } /* 학생 목록: 오른쪽 2열 */ .team-students .list { display: grid; grid-template-columns: repeat(2, minmax(180px, 1fr)); gap: 40px 30px; margin: 0; padding: 0; } @media (max-width: 800px) { .team-layout { grid-template-columns: 1fr; gap: 50px; } .team-students .list { grid-template-columns: repeat(2, minmax(140px, 1fr)); } } @media (max-width: 520px) { .team-students .list { grid-template-columns: 1fr; } } </style>

{% include section.html background="images/background.jpg" dark=true %}
