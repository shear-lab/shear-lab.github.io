// Mobile menu
const toggle = document.querySelector(".nav-toggle");
const nav = document.getElementById("site-nav");
if (toggle && nav) {
  toggle.addEventListener("click", () => {
    const open = nav.classList.toggle("open");
    toggle.setAttribute("aria-expanded", String(open));
  });
}

// Publication search
const search = document.getElementById("pub-search");
if (search) {
  const empty = document.getElementById("pub-empty");
  search.addEventListener("input", () => {
    const q = search.value.trim().toLowerCase();
    let shown = 0;
    document.querySelectorAll(".pub-group").forEach((group) => {
      let any = false;
      group.querySelectorAll(".pub").forEach((li) => {
        const hit = !q || li.dataset.search.includes(q);
        li.hidden = !hit;
        if (hit) { any = true; shown++; }
      });
      group.hidden = !any;
    });
    empty.hidden = shown > 0;
  });
}
