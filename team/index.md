---
title: Team
nav:
  order: 3
  tooltip: About our team
---

# {% include icon.html icon="fa-solid fa-users" %}Team

<div style="text-align: center;">
  We aim to contribute to a safer, more resilient world through research and innovation in extreme hazard mitigation
</div>

{% include section.html %}

{% include list.html data="members" component="portrait" filter="role == 'pi'" %}
{% include list.html data="members" component="portrait" filter="role != 'pi'" %}

{% include section.html background="images/background.jpg" dark=true %}

<!-- {% include section.html %} -->

<!-- {% capture content %} -->

<!-- {% include figure.html image="images/photo.jpg" %} -->
<!-- {% include figure.html image="images/photo.jpg" %} -->
<!-- {% include figure.html image="images/photo.jpg" %} -->

<!-- {% endcapture %} -->

<!-- {% include grid.html style="square" content=content %} -->
