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

// Team page: show or hide the PI's education and experience
const piToggle = document.querySelector(".pi-toggle");
const piProfile = document.getElementById("pi-profile");
if (piToggle && piProfile) {
  piToggle.addEventListener("click", () => {
    const open = piProfile.hidden;
    piProfile.hidden = !open;
    piToggle.setAttribute("aria-expanded", String(open));
    piToggle.querySelector("span").textContent = open ? "\u2212" : "+";
    if (open) piProfile.scrollIntoView({ behavior: "smooth", block: "nearest" });
  });
}

// Photos open in a pop-up instead of leaving the page
const zoomLinks = [...document.querySelectorAll("a[data-zoom]")];
if (zoomLinks.length && typeof HTMLDialogElement !== "undefined") {
  const box = document.createElement("dialog");
  box.className = "lightbox";
  box.setAttribute("aria-label", "Enlarged photo");
  box.innerHTML =
    '<button type="button" class="lb-btn lb-close" aria-label="Close">&times;</button>' +
    '<button type="button" class="lb-btn lb-prev" aria-label="Previous photo">&#8249;</button>' +
    '<img alt="">' +
    '<button type="button" class="lb-btn lb-next" aria-label="Next photo">&#8250;</button>';
  document.body.appendChild(box);
  const big = box.querySelector("img");
  const prev = box.querySelector(".lb-prev");
  const next = box.querySelector(".lb-next");
  let group = [];
  let at = 0;
  const show = (i) => {
    at = (i + group.length) % group.length;
    const link = group[at];
    const thumb = link.querySelector("img");
    big.src = link.href;
    big.alt = thumb ? thumb.alt : "";
    prev.hidden = next.hidden = group.length < 2;
  };
  zoomLinks.forEach((link) => {
    link.addEventListener("click", (event) => {
      if (event.metaKey || event.ctrlKey || event.shiftKey || event.button !== 0) return;
      event.preventDefault();
      group = [...link.parentElement.closest("div, section, main").querySelectorAll("a[data-zoom]")];
      show(group.indexOf(link));
      box.showModal();
    });
  });
  prev.addEventListener("click", () => show(at - 1));
  next.addEventListener("click", () => show(at + 1));
  box.querySelector(".lb-close").addEventListener("click", () => box.close());
  box.addEventListener("click", (event) => { if (event.target === box) box.close(); });
  box.addEventListener("keydown", (event) => {
    if (event.key === "ArrowLeft") show(at - 1);
    if (event.key === "ArrowRight") show(at + 1);
  });
  box.addEventListener("close", () => { big.removeAttribute("src"); });
}
