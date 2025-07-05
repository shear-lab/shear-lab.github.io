---
title: Research
nav:
  order: 1
  tooltip: Published works
---

<h1 markdown="0">{% include icon.html icon="fa-solid fa-microscope" %} Research</h1>

## Highlighted

{% include citation.html lookup="Voxel-based structural monitoring model for building structures using terrestrial laser scanning" style="rich" %}

{% include section.html %}

## IN PROGRESS
{% for cite in site.data.inprogress %}

{% include citation.html cite=cite style="rich" %}

{% endfor %}

## All PUBLICATIONS

{% include search-box.html %}

{% include search-info.html %}

{% include list.html data="citations" component="citation" style="rich" %}
