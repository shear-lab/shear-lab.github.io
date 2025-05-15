---
layout: default
title: Home
---

## WHO WE ARE

{% capture text %}
<div style="display: flex; justify-content: space-between; align-items: center; gap: 1rem;">
  <ul class="custom-list" style="margin: 0;">
    <li>LARGE-SCALE EXPERIMENTAL TESTING</li>
    <li>NUMERICAL ANALYSIS</li>
    <li>STRUCTURAL HEALTH MONITORING</li>
    <li>DECISION-MAKING</li>
  </ul>

  <div>
    {%
      include button.html
      link="research"
      text="DETAILS"
      icon="fa-solid fa-arrow-right"
      flip=true
      style="bare"
    %}
  </div>
</div>
{% endcapture %}

{%
  include feature.html
  image="images/Research.jpg"
  link="research"
  title="RESEARCH FOCUS"
  text=text
%}

{% capture text %}

We have diligent, passionate, motivate, and thoughtful team members who are making the world better! 

{%
  include button.html
  link="team"
  text="MEET OUR TEAM"
  icon="fa-solid fa-arrow-right"
  flip=true
  style="bare"
%}

{% endcapture %}

{%
  include feature.html
  image="images/photo.jpg"
  link="team"
  title="TEAM MEMBERS"
  text=text
%}
