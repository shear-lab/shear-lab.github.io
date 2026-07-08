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

<div class="team-layout">

  <!-- Professor -->
  <div class="team-pi">
    {% include list.html
      data="members"
      component="portrait"
      filter="group == 'PI'"
    %}
  </div>

  <!-- Students and Alumni -->
  <div class="team-right">

    <div class="team-students">
      <div class="team-students-list">
        {% include list.html
          data="members"
          component="portrait"
          filter="group == 'Student'"
          sort="order"
        %}
      </div>
    </div>

    <div class="team-alumni">
      <h2>Alumni</h2>

      <div class="team-alumni-list">
        {% include list.html
          data="members"
          component="portrait"
          filter="group == 'Alumni'"
          sort="order"
        %}
      </div>
    </div>

  </div>

</div>

<style>
.team-layout {
  display: grid;
  grid-template-columns: 390px minmax(0, 1fr);
  gap: 60px;
  align-items: start;
  max-width: 1180px;
  margin: 40px auto 0;
}

.team-pi,
.team-right,
.team-students {
  min-width: 0;
}

/* Professor */
.team-pi {
  display: flex;
  justify-content: center;
}

/* Professor portrait container */
.team-pi .portrait {
  width: 350px !important;
  max-width: none !important;
  margin: 0 auto !important;
}

/* Professor portrait image */
.team-pi .portrait-image,
.team-pi .portrait img,
.team-pi img {
  width: 350px !important;
  height: 450px !important;
  max-width: none !important;
  border-radius: 28px !important;
  object-fit: cover !important;
  object-position: center 35% !important;
}

/* Current students: two columns */
.team-students-list {
  display: grid !important;
  grid-template-columns: repeat(2, minmax(180px, 1fr)) !important;
  gap: 40px 30px;
  margin: 0;
  padding: 0;
  width: 100%;
}

/* Student portraits */
.team-students-list .portrait {
  width: 200px !important;
  max-width: none !important;
  margin: 0 auto !important;
}

/* Alumni section */
.team-alumni {
  margin-top: 70px;
}

.team-alumni h2 {
  margin-bottom: 30px;
  text-align: left;
}

/* Alumni: two columns */
.team-alumni-list {
  display: grid !important;
  grid-template-columns: repeat(2, minmax(180px, 1fr)) !important;
  gap: 40px 30px;
  margin: 0;
  padding: 0;
  width: 100%;
}

/* Alumni portraits */
.team-alumni-list .portrait {
  width: 200px !important;
  max-width: none !important;
  margin: 0 auto !important;
}

/* Tablet */
@media (max-width: 800px) {
  .team-layout {
    grid-template-columns: 1fr;
    gap: 50px;
  }

  .team-pi .portrait {
    width: 320px !important;
  }

  .team-pi .portrait-image,
  .team-pi .portrait img,
  .team-pi img {
    width: 320px !important;
    height: 400px !important;
  }

  .team-students-list,
  .team-alumni-list {
    grid-template-columns: repeat(2, minmax(140px, 1fr)) !important;
  }

  .team-students-list .portrait,
  .team-alumni-list .portrait {
    width: 180px !important;
  }
}

/* Mobile */
@media (max-width: 520px) {
  .team-pi .portrait {
    width: 280px !important;
  }

  .team-pi .portrait-image,
  .team-pi .portrait img,
  .team-pi img {
    width: 280px !important;
    height: 350px !important;
  }

  .team-students-list,
  .team-alumni-list {
    grid-template-columns: 1fr !important;
  }

  .team-students-list .portrait,
  .team-alumni-list .portrait {
    width: 200px !important;
  }
}
</style>

{% include section.html background="images/background.jpg" dark=true %}
