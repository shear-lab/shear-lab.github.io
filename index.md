---
layout: default
title: Home
---
 
## INSIDE THE LAB

{% capture text %}
<div style="margin-top: 1rem; text-align: right;">
  <ul class="custom-list" style="margin: 0;">
    <li>LARGE-SCALE EXPERIMENTAL TESTING</li>
    <li>STEEL/COMPOSITE & HYBRID SYSTEM</li>
    <li>NUMERICAL ANALYSIS</li>
    <li>VISION-BASED SHM</li>
    <li>OPTIMAL DECISION-MAKING</li>
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
  image="images/overall.png"
  link="research"
  title="RESEARCH FOCUS"
  text=text
%}

{% capture text %}
<div>
  <p>
    Meet our dedicated and passionate team — thoughtful minds united by a shared mission to make the world better!
  </p>

  <div style="margin-top: 1rem; text-align: right;">
    {%
      include button.html
      link="team"
      text="MEET OUR TEAM"
      icon="fa-solid fa-arrow-right"
      flip=true
      style="bare"
    %}
  </div>
</div>
{% endcapture %}

{%
  include feature.html
  image="images/photo.jpg"
  link="team"
  title="TEAM MEMBERS"
  text=text
%}
