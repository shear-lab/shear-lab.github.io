---
layout: default
title: Home
---

## WHO WE ARE

{% capture text %}

LARGE-SCALE EXPERIMENTAL TESTING, NUMERICAL ANALYSIS, STRUCTURAL HEALTH MONITORING, DECISION-MAKING

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
