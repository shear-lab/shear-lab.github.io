---
layout: default
title: Home
---

## WHO WE ARE

{% capture text %}
<ul class="custom-list">
  <li>LARGE-SCALE EXPERIMENTAL TESTING</li>
  <li>NUMERICAL ANALYSIS</li>
  <li>STRUCTURAL HEALTH MONITORING</li>
  <li>DECISION-MAKING</li>
</ul>

{%
  include button.html
  link="research"
  text="DETAILS"
  icon="fa-solid fa-arrow-right"
  flip=true
  style="bare"
%}
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
