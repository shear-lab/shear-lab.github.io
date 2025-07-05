---
title: Research
nav:
  order: 1
  tooltip: Published works
---

# {% include icon.html icon="fa-solid fa-microscope" %}Research

Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.

{% include section.html %}

## Highlighted

{% include citation.html lookup="Voxel-based structural monitoring model for building structures using terrestrial laser scanning" style="rich" %}

{% include section.html %}

## IN PROGRESS
{% for cite in site.data.inprogress %}

<div style="display: flex; align-items: center; margin-bottom: 2rem;">
  <img src="{{ '/images/Elsevier.png' | relative_url }}" alt="Elsevier Logo" style="width: 60px; margin-right: 1rem;" />
  <div style="flex: 1;">
    {% include citation.html cite=cite style="rich" %}
  </div>
</div>

{% endfor %}

## All PUBLICATIONS

{% include search-box.html %}

{% include search-info.html %}

{% include list.html data="citations" component="citation" style="rich" %}
