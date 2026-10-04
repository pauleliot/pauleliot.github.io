/* Rendu des listes, filtres, lecteur vidéo et petites animations.
   Normalement pas besoin de modifier ce fichier : éditez js/data.js. */
(function () {
  const BASE = document.body.dataset.base || "";

  const esc = (s) => String(s ?? "").replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));
  const thumb = (p) =>
    p.image ? BASE + p.image : p.youtube ? `https://i.ytimg.com/vi/${p.youtube}/hqdefault.jpg` : "";
  const embed = (p) =>
    p.instagram || `https://www.youtube-nocookie.com/embed/${p.youtube}?autoplay=1&rel=0`;

  /* ---------- Cartes projets ---------- */
  const media = (p) => {
    const img = thumb(p);
    return `
      <div class="card-media">
        ${img ? `<img src="${esc(img)}" alt="" loading="lazy">` : `<div class="ph">${p.instagram ? "Instagram" : esc(p.type)}</div>`}
        <span class="play" aria-hidden="true"></span>
      </div>`;
  };
  const meta = (p) => [p.type, p.annee].filter(Boolean).map(esc).join(" · ");
  // Lien vers la page du projet, ou bouton qui ouvre la vidéo
  const wrap = (p, cls, inner) =>
    p.page
      ? `<a class="${cls} reveal" href="${esc(BASE + p.page)}">${inner}</a>`
      : `<button class="${cls} reveal" type="button" data-play="${PROJETS.indexOf(p)}">${inner}</button>`;

  function projectCard(p) {
    return wrap(p, "card", `
      ${media(p)}
      <div class="card-meta">${meta(p)}</div>
      <h3>${esc(p.titre)}</h3>
      <p>${esc(p.resume)}</p>`);
  }

  // Grande ligne horizontale (projets à la une, empilés verticalement)
  function projectRow(p, n, total) {
    return wrap(p, "feat", `
      ${media(p)}
      <div class="feat-body">
        <span class="feat-num">${String(n).padStart(2, "0")} / ${String(total).padStart(2, "0")}</span>
        <div class="card-meta">${meta(p)}</div>
        <h3>${esc(p.titre)}</h3>
        <p>${esc(p.resume)}</p>
        <span class="link-arrow">${p.page ? "Voir le projet" : "Regarder"}</span>
      </div>`);
  }

  document.querySelectorAll("[data-projets]").forEach((el) => {
    const list = PROJETS.filter((p) => el.dataset.projets !== "avant" || p.avant);
    el.innerHTML = el.dataset.layout === "rows"
      ? list.map((p, i) => projectRow(p, i + 1, list.length)).join("")
      : list.map(projectCard).join("");
  });

  /* ---------- Page Projets : triés par catégorie ---------- */
  const groupes = document.querySelector("[data-groupes]");
  if (groupes) {
    const cats = Object.keys(CATEGORIES).filter((c) => PROJETS.some((p) => p.categorie === c));
    const count = (c) => PROJETS.filter((p) => p.categorie === c).length;
    groupes.innerHTML = cats.map((c) => `
      <div class="group" id="${c}">
        <div class="group-head reveal">
          <h2>${esc(CATEGORIES[c])}</h2>
          <span class="count">${count(c)} projet${count(c) > 1 ? "s" : ""}</span>
        </div>
        <div class="grid">${PROJETS.filter((p) => p.categorie === c).map(projectCard).join("")}</div>
      </div>`).join("");
    const jump = document.querySelector("[data-jump]");
    if (jump) jump.innerHTML = cats.map((c) => `<a class="filter" href="#${c}">${esc(CATEGORIES[c])}<span class="count">${count(c)}</span></a>`).join("");
  }

  /* ---------- Plugins (rectangles horizontaux avec aperçu) ---------- */
  document.querySelectorAll("[data-plugins]").forEach((el) => {
    el.innerHTML = PLUGINS.map((p) => {
      const href = p.page ? BASE + p.page : p.lien;
      const tag = href ? "a" : "div";
      const apercu = p.apercu || "images/plugins/apercu-exemple.svg";
      return `
      <${tag} class="plugin reveal"${href ? ` href="${esc(href)}"${p.lien && !p.page ? ' target="_blank" rel="noopener"' : ""}` : ""}>
        <img class="plugin-shot" src="${esc(BASE + apercu)}" alt="" loading="lazy">
        <div class="plugin-body">
          <div class="plugin-meta">
            ${p.statut ? `<span class="status">${esc(p.statut)}</span>` : ""}
            ${(p.logiciels || []).map((l) => `<span class="tag${/^(windows|macos|mac|linux)$/i.test(l) ? " platform" : ""}">${esc(l)}</span>`).join("")}
          </div>
          <div class="plugin-title">
            <div class="plugin-icon">${p.logo ? `<span class="plugin-logo" style="--logo:url('${esc(new URL(BASE + p.logo, location.href).href)}')"></span>` : esc(p.initiale || p.nom[0])}</div>
            <h3>${esc(p.nom)}</h3>
          </div>
          <p class="pitch">${esc(p.accroche)}</p>
          ${p.prix ? `<span class="price">${esc(p.prix)}</span>` : href ? `<span class="link-arrow">Découvrir</span>` : ""}
        </div>
      </${tag}>`;
    }).join("");
  });
  /* ---------- Démo vidéo au survol des fonctionnalités (pages plugin) ---------- */
  document.querySelectorAll(".tcard[data-video]").forEach((card) => {
    const demo = document.createElement("div");
    demo.className = "tdemo";
    demo.innerHTML = `
      <video muted loop playsinline preload="none" poster="${esc(BASE)}images/plugins/apercu-exemple.svg"></video>
      <span class="tdemo-tag">Démo</span>
      <span class="tdemo-title">${esc(card.querySelector("h3")?.textContent)}</span>`;
    card.appendChild(demo);
    const v = demo.querySelector("video");
    v.addEventListener("error", () => demo.classList.add("missing"), true);
    let loaded = false;
    card.addEventListener("mouseenter", () => {
      if (!loaded) { v.src = card.dataset.video; loaded = true; }
      v.play().catch(() => demo.classList.add("missing"));
    });
    card.addEventListener("mouseleave", () => { v.pause(); v.currentTime = 0; });
  });

  /* ---------- Démo de courbes animée (page Sori) ---------- */
  document.querySelectorAll("[data-curve-lab]").forEach((lab) => {
    const PRESETS = [
      ["Cubic", ".65, 0, .35, 1"], ["Ease Out", "0, 0, .58, 1"], ["Back", ".68, -.6, .32, 1.6"],
      ["Expo", ".87, 0, .13, 1"], ["Ease In", ".42, 0, 1, 1"], ["Ease", ".25, .1, .25, 1"],
    ];
    const X = (x) => 20 + x * 160, Y = (y) => 170 - y * 120;
    const q = (s) => lab.querySelector(s);
    const set = (el, a) => Object.entries(a).forEach(([k, v]) => el.setAttribute(k, v));
    let pts = [[20, 170], [20, 170], [180, 50], [180, 50]];
    function show([name, b]) {
      const [x1, y1, x2, y2] = b.split(",").map(Number);
      pts = [[20, 170], [X(x1), Y(y1)], [X(x2), Y(y2)], [180, 50]];
      q("[data-curve]").setAttribute("d", `M20 170 C${X(x1)} ${Y(y1)} ${X(x2)} ${Y(y2)} 180 50`);
      set(q("[data-h1]"), { x2: X(x1), y2: Y(y1) });
      set(q("[data-h2]"), { x2: X(x2), y2: Y(y2) });
      set(q("[data-k1]"), { cx: X(x1), cy: Y(y1) });
      set(q("[data-k2]"), { cx: X(x2), cy: Y(y2) });
      if (q("[data-lab-value]")) q("[data-lab-value]").textContent = b;
      q("[data-lab-name]").textContent = name;
    }
    // point qui parcourt la courbe
    const dot = q("[data-dot]");
    const bez = (u, i) => {
      const v = 1 - u;
      return v * v * v * pts[0][i] + 3 * v * v * u * pts[1][i] + 3 * v * u * u * pts[2][i] + u * u * u * pts[3][i];
    };
    const reduce = matchMedia("(prefers-reduced-motion: reduce)").matches;
    let n = 0;
    show(PRESETS[0]);
    if (reduce) return;
    setInterval(() => show(PRESETS[++n % PRESETS.length]), 2800);
    const start = performance.now();
    (function tick(now) {
      const u = (((now - start) / 1400) % 2 + 2) % 2;
      const t = u > 1 ? 2 - u : u;
      set(dot, { cx: bez(t, 0), cy: bez(t, 1) });
      requestAnimationFrame(tick);
    })(start);
  });
  /* Onglets : un clic dans la liste change la démo affichée */
  document.querySelectorAll("[data-demo-tabs]").forEach((box) => {
    box.addEventListener("click", (e) => {
      const tab = e.target.closest(".demo-tab");
      if (!tab) return;
      box.querySelectorAll(".demo-tab").forEach((t) => {
        const on = t === tab;
        t.classList.toggle("active", on);
        t.setAttribute("aria-selected", on);
        document.getElementById(t.getAttribute("aria-controls")).classList.toggle("active", on);
      });
    });
  });

  /* Démo « valeur ou vitesse » : bascule entre les deux vues à chaque balayage */
  document.querySelectorAll(".vs-demo").forEach((el) => {
    if (matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    setInterval(() => el.classList.toggle("speed"), 2600);
  });

  /* ---------- Lien « suivant » discret en bas de chaque page ---------- */
  (function () {
    const footer = document.querySelector("footer");
    if (!footer) return;
    const path = decodeURIComponent(location.pathname).replace(/\\/g, "/");
    const file = path.split("/").pop() || "index.html";
    const cycle = (list, label) => {
      const i = list.findIndex((x) => path.endsWith(x.page));
      if (i === -1 || list.length < 2) return null;
      const n = list[(i + 1) % list.length];
      return { label, titre: n.titre || n.nom, href: BASE + n.page };
    };
    let next = null;
    if (path.includes("/projets/")) next = cycle(PROJETS.filter((p) => p.page), "Projet suivant");
    else if (path.includes("/plugins/")) next = cycle(PLUGINS.filter((p) => p.page), "Plugin suivant");
    else {
      const tabs = [
        { page: "index.html", titre: "Accueil" },
        { page: "projets.html", titre: "Projets" },
        { page: "plugins.html", titre: "Plugins" },
      ];
      const i = Math.max(0, tabs.findIndex((t) => t.page === file));
      const n = tabs[(i + 1) % tabs.length];
      next = { label: "Suivant", titre: n.titre, href: BASE + n.page };
    }
    if (!next) return;
    const a = document.createElement("a");
    a.className = "next-mini";
    a.href = next.href;
    a.innerHTML = `<span>${esc(next.label)}</span><b>${esc(next.titre)}</b><i aria-hidden="true">→</i>`;
    const wrap = document.createElement("div");
    wrap.className = "container next-mini-wrap";
    wrap.appendChild(a);
    footer.parentNode.insertBefore(wrap, footer);
  })();

  /* ---------- Parcours : la ligne se remplit au défilement ---------- */
  document.querySelectorAll("[data-timeline]").forEach((tl) => {
    const items = [...tl.querySelectorAll(".tl-item")];
    const update = () => {
      const r = tl.getBoundingClientRect();
      const mid = innerHeight * 0.6;
      const p = Math.min(1, Math.max(0, (mid - r.top) / r.height));
      tl.style.setProperty("--p", p.toFixed(3));
      items.forEach((it) => it.classList.toggle("on", it.querySelector(".tl-dot").getBoundingClientRect().top < mid));
    };
    addEventListener("scroll", update, { passive: true });
    addEventListener("resize", update);
    update();
  });

  /* ---------- Lecteur vidéo ---------- */
  const modal = document.createElement("div");
  modal.className = "modal";
  modal.innerHTML = `<button class="modal-close" aria-label="Fermer">×</button>
    <div class="modal-box"><div class="video"><iframe allow="autoplay; encrypted-media; fullscreen; picture-in-picture" allowfullscreen></iframe></div><div class="modal-title"></div></div>`;
  document.body.appendChild(modal);
  const frame = modal.querySelector("iframe");
  const box = modal.querySelector(".modal-box");
  const close = () => { modal.classList.remove("open"); frame.src = "about:blank"; document.body.style.overflow = ""; };
  modal.addEventListener("click", (e) => { if (e.target === modal || e.target.closest(".modal-close")) close(); });
  document.addEventListener("keydown", (e) => { if (e.key === "Escape") close(); });
  document.addEventListener("click", (e) => {
    const b = e.target.closest("[data-play]");
    if (!b) return;
    const p = PROJETS[+b.dataset.play];
    const vertical = p.categorie === "vertical";
    box.classList.toggle("vertical", vertical);
    box.querySelector(".video").classList.toggle("vertical", vertical);
    frame.src = embed(p);
    modal.querySelector(".modal-title").textContent = p.titre;
    modal.classList.add("open");
    document.body.style.overflow = "hidden";
  });

  /* ---------- Navigation ---------- */
  const nav = document.querySelector(".nav");
  const onScroll = () => nav && nav.classList.toggle("scrolled", scrollY > 20);
  addEventListener("scroll", onScroll, { passive: true });
  onScroll();
  document.querySelector(".nav-toggle")?.addEventListener("click", () => nav.classList.toggle("open"));

  /* ---------- Apparition au scroll ---------- */
  const io = new IntersectionObserver((entries) => {
    entries.forEach((en) => { if (en.isIntersecting) { en.target.classList.add("in"); io.unobserve(en.target); } });
  }, { threshold: 0.12 });
  document.querySelectorAll(".reveal").forEach((el) => io.observe(el));

  document.querySelectorAll("[data-year]").forEach((el) => (el.textContent = new Date().getFullYear()));
})();
