---
layout: default
title: Home 
---
    
## INSIDE THE LAB 

<section id="inside-the-lab">

{% capture text %}
<div style="margin-top: 1rem; text-align: right;">
  <ul class="custom-list" style="margin: 0;">
    <li>Steel & hybrid structural systems</li>
    <li>Earthquakes</li>
    <li>Numerical analysis</li>
    <li>Vision & AI-driven SHM</li>
    <li>MOEAs&nbsp;based&nbsp;optimization&nbsp;and&nbsp;decision-making</li>
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
  image="images/Overall_research.png"
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

</section>
