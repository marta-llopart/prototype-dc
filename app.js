// =========================================================
// DATOS DE EJEMPLO
// Edita estas listas para cambiar lo que se ve en pantalla.
// Las imágenes están en la carpeta img/
// =========================================================
const IMG = {
  logo:      "img/retailer-thumb.png?v=8",
  comet:     "img/flyer-comet.jpg",
  coop:      "img/flyer-coop.jpg",
  unieuro:   "img/flyer-unieuro.jpg",
  loacker:   "img/product-loacker.jpg",
  adventuros:"img/product-adventuros.jpg",
  map1:      "img/map-1.jpg",
  map2:      "img/map-2.jpg",
  offers:    "img/artwork-youroffers.png",
};

// Pestañas de categoría (carouselTabCategories)
const categorieTabs = ["Featured", "Supermarkets", "Discount Stores", "Electronics", "Home & Personal Care",
  "Home Improvement", "Furniture", "Automotive", "Health & Wellness", "Baby & Toys", "Pets",
  "Sports & Fashion", "Banking & Insurance", "Travel", "Restaurants", "Services"];

// Stories (carouselStories): nombre del retailer, logo y estado
// estado = "sponsored-unread" | "sponsored" | "unread" | "read"
const stories = [
  ["MediaWorld", "mediaworld", "sponsored-unread"], ["Conad", "conad", "sponsored-unread"],
  ["Carrefour", "carrefour", "unread"], ["Unieuro", "unieuro", "unread"],
  ["Coop", "coop", "read"], ["Penny", "penny", "read"], ["Euronics", "euronics", "read"],
  ["Pam", "pam", "read"], ["Lidl", "lidl", "read"], ["Esselunga", "esselunga", "read"],
  ["Trony", "trony", "read"], ["Tigotà", "tigota", "read"],
].map(([nome, logo, stato]) => ({ nome, logo: `img/stories/${logo}.png`, stato }));

// Un folleto: imagen, retailer, distancia y etiqueta (tag: "nuovo" | "arrivo" | null)
const f = (img, tag = "nuovo", retailer = "Retailer") => ({ img, tag, retailer, distanza: "978 m" });

// Secciones de la Home, en el mismo orden que el diseño de Figma
const sezioni = [
  { tipo: "carousel", titolo: "Picked for you", icono: "heartFill", link: "See more",
    items: [
      { img: "img/flyer-picked-arcaplanet.jpg", logo: "img/logos/arcaplanet.png", retailer: "Arcaplanet", distanza: "643 m",  tag: "nuovo" },
      { img: "img/flyer-picked-coop.jpg",       logo: "img/logos/coop.png",       retailer: "Coop",       distanza: "978 m",  tag: "nuovo" },
      { img: "img/flyer-picked-lidl.jpg",       logo: "img/logos/lidl.png",       retailer: "Lidl",       distanza: "1.5 km", tag: null },
      { img: "img/flyer-picked-pam.jpg",        logo: "img/logos/pam.png",        retailer: "Pam",        distanza: "1.8 km", tag: null },
      { img: "img/flyer-picked-unieuro.jpg",    logo: "img/logos/unieuro.png",    retailer: "Unieuro",    distanza: "1.5 km", tag: null },
    ] },

  { tipo: "grid", items: Array.from({ length: 20 }, (_, i) => i === 5 ? { pub: true } : f(IMG.unieuro)) },

  { tipo: "carousel2", titolo: "Most popular this week",
    items: Array.from({ length: 8 }, () => f(IMG.unieuro)) },

  { tipo: "carousel", titolo: "Flyer carousel title lorem ipsum", items: Array.from({ length: 5 }, () => f(IMG.unieuro)) },
  { tipo: "carousel", titolo: "Flyer carousel title lorem ipsum", items: Array.from({ length: 5 }, () => f(IMG.unieuro)) },
  { tipo: "carousel", titolo: "Flyer carousel title lorem ipsum", items: Array.from({ length: 5 }, () => f(IMG.unieuro)) },

  { tipo: "carousel", titolo: "Sneak peek deals", link: "See more",
    items: [f(IMG.unieuro), f(IMG.unieuro), f(IMG.unieuro, "arrivo"), f(IMG.unieuro), f(IMG.unieuro)] },

  { tipo: "offerte", titolo: "Your deals" },

  { tipo: "negozi", titolo: "Stores near you",
    items: Array.from({ length: 9 }, (_, i) => ({ nome: "Retailer Name", distanza: "3.2 km", map: i % 2 ? IMG.map2 : IMG.map1 })) },

  { tipo: "carousel", titolo: "New products to try",
    items: [f(IMG.loacker, "nuovo", "Brand"), f(IMG.adventuros, null, "Brand"), f(IMG.loacker, "nuovo", "Brand"), f(IMG.adventuros, null, "Brand")] },

  { tipo: "categorie", titolo: "Explore categories",
    items: [["iperSuper", "Supermarkets"], ["discount", "Discount Stores"], ["elettronica", "Electronics"],
            ["curaCasaCorpo", "Home & Personal Care"], ["bricolage", "Home Improvement"], ["arredamento", "Furniture"]] },
];

// =========================================================
// COMPONENTES (no hace falta tocar esto)
// =========================================================
const TAGS = {
  nuovo:  '<span class="tag tag--green">New</span>',
  arrivo: '<span class="tag tag--purple">Coming soon</span>',
};

// flyerCard — size "small" (132) o "default" (164)
const flyerCard = (x, size = "small") => `
  <article class="flyer-card ${size === "small" ? "flyer-card--small" : ""}">
    <div class="flyer-card__img"><img src="${x.img}" alt="${x.retailer} flyer"></div>
    <div class="flyer-card__txt">
      <div class="flyer-card__retailer"><span class="thumb"><img src="${x.logo || IMG.logo}" alt=""></span>${x.retailer}</div>
      <div class="flyer-card__meta">${x.distanza}${x.tag ? (size === "small" ? TAGS[x.tag] : TAGS[x.tag].replace('tag ', 'tag tag--md ')) : ""}</div>
    </div>
  </article>`;

const pubNative = () => `
  <article class="pub-native">
    <div class="pub-native__card">
      <div class="pub-native__header">Sponsored
        <svg viewBox="0 0 12 12" fill="none" stroke="#1da1f2" stroke-width="1.4"><path d="M3 2.5v7l6-3.5-6-3.5Z"/></svg>
      </div>
      <div class="pub-native__img"></div>
      <div class="pub-native__content">
        <p>Lorem ipsum dolor sit amet</p>
        <button class="btn btn--primary btn--small btn--block">Button Label</button>
      </div>
    </div>
  </article>`;

const storeCard = n => `
  <article class="store-card">
    <div class="store-card__map"><img src="${n.map}" alt=""></div>
    <div class="store-card__pin"><img src="${IMG.logo}" alt=""></div>
    <div class="store-card__txt">
      <div class="store-card__name">${n.nome}</div>
      <div class="store-card__dist">${n.distanza}</div>
    </div>
  </article>`;

const offersCard = (icon, title, body, cta) => `
  <article class="offers-card">
    <div class="offers-card__title"><span class="icon" data-icon="${icon}"></span>${title}</div>
    <div class="offers-card__body">${body}</div>
    <button class="btn btn--primary btn--large btn--block">${cta}</button>
  </article>`;

const sectionTitle = s => `
  <div class="section__title">
    <div class="section__text">
      <h2>${s.icono ? `<span class="icon icon--sm" data-icon="${s.icono}"></span>` : ""}${s.titolo}</h2>
    </div>
    ${s.link ? `<a class="btn btn--ghost btn--small" href="#">${s.link}</a>` : ""}
  </div>`;

const BOLT = '<svg class="story__bolt" viewBox="0 0 20 20"><circle cx="10" cy="10" r="9" fill="#83BE3E" stroke="#E4F1D5" stroke-width="2"/><path d="M5.78 9.7l4.96-5.35c.35-.37.97-.05.86.45l-.9 4.05c-.07.31.17.61.49.61h2.56c.45 0 .67.55.34.86l-5.5 5.19c-.39.36-1-.05-.81-.54l1.42-3.76c.12-.33-.12-.68-.47-.68H6.15c-.44 0-.66-.52-.37-.84Z" fill="#fff"/></svg>';

// =========================================================
// PINTAR LA PANTALLA
// =========================================================
document.getElementById("cat-tabs").innerHTML = categorieTabs
  .map((t, i) => `<button class="cat-tab ${i === 0 ? "cat-tab--selected" : ""}">${t}</button>`).join("");

document.getElementById("stories").innerHTML = stories.map(st => `
  <div class="story ${st.stato.includes("unread") ? "story--unread" : ""} ${st.stato.startsWith("sponsored") ? "story--sponsored" : ""}">
    <div class="story__img"><img src="${st.logo}" alt="${st.nome}">${st.stato.startsWith("sponsored") ? BOLT : ""}</div>
    <div class="story__label">${st.nome}</div>
  </div>`).join("");

document.getElementById("sections").innerHTML = sezioni.map(s => {
  switch (s.tipo) {
    case "carousel":
      return `<section class="section">${sectionTitle(s)}<div class="carousel">${s.items.map(x => flyerCard(x)).join("")}</div></section>`;
    case "carousel2":
      return `<section class="section">${sectionTitle(s)}<div class="carousel carousel--two-rows">${s.items.map(x => flyerCard(x)).join("")}</div></section>`;
    case "grid":
      return `<section class="section"><div class="flyer-grid">${s.items.map(x => x.pub ? pubNative() : flyerCard(x, "default")).join("")}</div></section>`;
    case "negozi":
      return `<section class="section">${sectionTitle(s)}<div class="carousel">${s.items.map(storeCard).join("")}</div></section>`;
    case "offerte":
      return `<section class="section">${sectionTitle(s)}
        <div class="offers">
          <img class="offers__art" src="${IMG.offers}" alt="">
          ${offersCard("myListFill", "My savings list", "<p>Create your shopping list and see how much you save on everything you buy</p>", "Get started")}
          ${offersCard("heartFill", "My favorite stores", "<p>Never miss a deal from your favorite stores! Save them and stay up to date on their latest flyers</p>", "Get started")}
          ${offersCard("mobile", "My location", "<strong>Get a personalized experience</strong><p>Share your <b>exact location</b> so we can show you the deals closest to you.</p>", "Go now")}
        </div></section>`;
    case "categorie":
      return `<section class="section">${sectionTitle(s)}<div class="menu-list">${s.items.map(([ic, t]) => `
        <a class="menu-item" href="#">
          <span class="menu-item__text"><span class="icon" data-icon="${ic}"></span>${t}</span>
          <span class="menu-item__chevron"><span class="icon" data-icon="chevronRight"></span></span>
        </a>`).join("")}</div></section>`;
  }
}).join("") + '<div style="height:24px"></div>';

// =========================================================
// + SAVINGS — contenido de la pestaña "+ Savings"
// Edita esta lista para cambiar las publicaciones.
// img: null = publicación sin imagen · saved: true = guardada (marcador rojo)
// =========================================================
const savingsTabs = [["Saved", "bookmark"], ["All"], ["Coupons"], ["Cashback"], ["Contests"], ["Free gift"]];

const post = (nome, data, tipo, valore, testo, img = null, saved = false) => ({ nome, data, tipo, valore, testo, img, saved });
const savingsPosts = [
  post("Claudio A.",      "15/07/26", "Cashback", "€9.99 refund",   "Coccolino Wonder wash 2+1"),
  post("Francesco Rossi", "15/07/26", "Cashback", "50% refund",     "Cashback Sanremo Air Wick", "airwick"),
  post("Giulia Bardelli", "14/07/26", "Cashback", "Request refund", "A SUMMER OF GARNIER MICELLAR CASHBACK", null, true),
  post("Elio Bencini",    "13/07/26", "Cashback", "€20.00 refund",  "CashBack SodaStream"),
  post("Sara Colombo",    "12/07/26", "Cashback", "€15.00 refund",  "Get rewarded for your wellness choice - Cashback", "meclon"),
  post("Matteo Luna",     "12/07/26", "Cashback", "€10.00 refund",  "CASHBACK NIVEA FACE 2026 - Try Luminous' anti-dark-spot effectiveness"),
  post("Davide Russo",    "10/07/26", "Cashback", "€2.69 refund",   "SCOTTI TRY ME FOR FREE", "scotti"),
  post("Luca Romano",     "09/07/26", "Cashback", "100% refund",    "COMPEED TRY ME FOR FREE", "compeed"),
  post("Tom",             "19/06/26", "Coupons",  "€1.50 off",      "€1.50 coupons on Cameo Ristorante Grandissima pizza.", "cameo", true),
  post("Marco Fabri",     "12/06/26", "Contests", "Win €30,000",    "Nescafé Dolce Gusto contest", "nescafe"),
];

// communityCard
const communityCard = p => `
  <article class="community-card" data-tipo="${p.tipo}" data-saved="${p.saved}">
    <div class="community-card__header">
      <img class="community-card__avatar" src="img/savings/avatar.png" alt="">
      <div class="community-card__who"><span class="community-card__name">${p.nome}</span><span class="community-card__date">${p.data}</span></div>
    </div>
    ${p.img ? `<div class="community-card__img"><img src="img/savings/${p.img}.jpg" alt=""></div>` : ""}
    <div class="community-card__desc">
      <span class="tag tag--pink">${p.tipo}</span>
      <span class="community-card__value">${p.valore}</span>
      <div class="community-card__text"><p>${p.testo}</p><a href="#">Details</a></div>
    </div>
    <div class="community-card__footer">
      <div class="community-card__actions">
        <button class="community-card__action"><span class="selection-box"><span class="icon" data-icon="like"></span></span>15</button>
        <button class="community-card__action"><span class="selection-box"><span class="icon" data-icon="send"></span></span>6</button>
      </div>
      <button class="community-card__save ${p.saved ? "community-card__save--on" : ""}" aria-label="Save">
        <span class="selection-box"><span class="icon" data-icon="${p.saved ? "bookmarkFill" : "bookmark"}"></span></span>
      </button>
    </div>
  </article>`;

document.getElementById("view-savings").innerHTML = `
  <div class="savings">
    <div class="cat-tabs savings__tabs">${savingsTabs.map(([t, ic]) =>
      `<button class="cat-tab ${t === "All" ? "cat-tab--selected" : ""}" data-filter="${t}" aria-pressed="${t === "All"}">${ic ? `<span class="icon icon--sm" data-icon="${ic}"></span>` : ""}${t}</button>`).join("")}</div>
    <div class="savings__sort">Sort by:
      <button class="btn btn--ghost btn--small">Most recent <span class="icon icon--sm" data-icon="expandMore"></span></button>
    </div>
    <div class="savings__cards">${savingsPosts.map(communityCard).join("")}</div>
    <p class="savings__empty" hidden>No posts here yet.</p>
  </div>`;

// Cambiar entre "For you" y "+ Savings" en la misma pantalla
document.querySelectorAll(".tab-line").forEach(tab => tab.addEventListener("click", () => {
  document.querySelectorAll(".tab-line").forEach(t => t.classList.toggle("tab-line--selected", t === tab));
  const view = tab.dataset.view;
  document.getElementById("view-home").hidden = view !== "home";
  document.getElementById("view-savings").hidden = view !== "savings";
  window.scrollTo(0, 0);
}));

// FILTROS de + Savings
// All = todos · Saved = solo guardados (marcador rojo) · resto = posts cuyo badge coincide con el chip
let filtroActivo = "All";
const applySavingsFilter = () => {
  let visibili = 0;
  document.querySelectorAll("#view-savings .community-card").forEach(card => {
    const show = filtroActivo === "All"
      || (filtroActivo === "Saved" ? card.dataset.saved === "true" : card.dataset.tipo === filtroActivo);
    card.hidden = !show;
    if (show) visibili++;
  });
  document.querySelector(".savings__empty").hidden = visibili > 0;
};
document.querySelectorAll("#view-savings [data-filter]").forEach(chip => chip.addEventListener("click", () => {
  filtroActivo = chip.dataset.filter;
  document.querySelectorAll("#view-savings [data-filter]").forEach(c => {
    c.classList.toggle("cat-tab--selected", c === chip);
    c.setAttribute("aria-pressed", c === chip);
  });
  applySavingsFilter();
}));

// Guardar / quitar de guardados al pulsar el marcador
document.querySelectorAll(".community-card__save").forEach(b => b.addEventListener("click", () => {
  const on = b.classList.toggle("community-card__save--on");
  b.closest(".community-card").dataset.saved = on;
  b.querySelector(".icon").innerHTML = `<svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">${ICONS[on ? "bookmarkFill" : "bookmark"]}</svg>`;
  if (filtroActivo === "Saved") applySavingsFilter(); // si quitas uno estando en Saved, desaparece
}));

// Interacciones simples: seleccionar pestañas
const selectable = (sel, cls) => document.querySelectorAll(sel).forEach(el =>
  el.addEventListener("click", e => {
    e.preventDefault();
    el.parentElement.querySelectorAll(sel).forEach(o => o.classList.remove(cls)); // solo dentro de su grupo
    el.classList.add(cls);
  }));
selectable("#cat-tabs .cat-tab", "cat-tab--selected");
selectable(".bottom-nav__tab", "bottom-nav__tab--selected");

// Test A/B: abre la página con ?variante=b para ver la versión alternativa
if (new URLSearchParams(location.search).get("variante") === "b") {
  document.body.classList.add("variante-b");
}
