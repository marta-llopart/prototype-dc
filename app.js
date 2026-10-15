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

// Folletos de los retailers favoritos (bloque "Your favorites" de la Home)
const favoriti = [
  { img: "img/flyer-picked-lidl.jpg", logo: "img/logos/lidl.png", retailer: "Lidl", distanza: "978 m",  tag: null },
  { img: "img/flyer-picked-coop.jpg", logo: "img/logos/coop.png", retailer: "Coop", distanza: "1.5 km", tag: "nuovo" },
  { img: "img/flyer-fav-coop-2.jpg",  logo: "img/logos/coop.png", retailer: "Coop", distanza: "1.5 km", tag: "scade" },
  { img: "img/flyer-fav-coop-3.jpg",  logo: "img/logos/coop.png", retailer: "Coop", distanza: "1.5 km", tag: null },
];

// Secciones de la Home, en el mismo orden que el diseño de Figma
const sezioni = [
  // Figma 46:4888 — "Your favourites". "Discover more" lleva a la página Favorites
  { tipo: "carousel", titolo: "Your favorites", icono: "heartFill", link: "Discover more", goto: "favorites",
    items: favoriti },

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
  scade:  '<span class="tag tag--orange">-2 days</span>',
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
    ${s.link ? `<a class="btn btn--ghost btn--small" href="#" ${s.goto ? `data-goto="${s.goto}"` : ""}>${s.link}</a>` : ""}
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
document.querySelectorAll(".tab-line[data-view]").forEach(tab => tab.addEventListener("click", () => {
  document.querySelectorAll(".tab-line[data-view]").forEach(t => t.classList.toggle("tab-line--selected", t === tab));
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


// =========================================================
// FAVORITES — página de tiendas favoritas (Figma "FAVORITES_Stores")
// Edita esta lista para cambiar las tiendas.
// flyers: [] = la tienda no tiene folletos (se ve el aviso con la campana)
// notifications: true = notificaciones activadas (botón "Turn off notifications")
// tag: "nuovo" (New) | "scade" (-2 days) | null
// =========================================================
const favoriteStores = [
  { nome: "Lidl", logo: "img/logos/lidl.png", notifications: false, flyers: [
    { img: "img/favorites/lidl-1.jpg", distanza: "978 m", tag: null },
  ] },
  { nome: "Coop", logo: "img/logos/coop.png", notifications: true, flyers: [
    { img: "img/favorites/coop-1.jpg", distanza: "1.5 km", tag: "nuovo" },
    { img: "img/favorites/coop-2.jpg", distanza: "1.5 km", tag: "scade" },
    { img: "img/favorites/coop-3.jpg", distanza: "1.5 km", tag: null },
  ] },
  { nome: "Bimbo Store", logo: "img/favorites/logo-bimbostore.png", notifications: false, flyers: [] },
];

const FAV_TAGS = { ...TAGS, scade: '<span class="tag tag--orange">-2 days</span>' };

// flyerCard sin nombre de retailer (Size=Small, como en Favorites)
const favFlyerCard = (x, nome) => `
  <article class="flyer-card flyer-card--small flyer-card--compact">
    <div class="flyer-card__img"><img src="${x.img}" alt="${nome} flyer"></div>
    <div class="flyer-card__txt"><div class="flyer-card__meta">${x.distanza}${x.tag ? FAV_TAGS[x.tag] : ""}</div></div>
  </article>`;

const notifButton = on => on
  ? '<button class="btn btn--secondary btn--small btn--block fav-notif" data-on="true">Turn off notifications</button>'
  : '<button class="btn btn--primary btn--small btn--block fav-notif" data-on="false">Turn on notifications</button>';

const favoriteStore = st => `
  <section class="fav-store">
    <div class="fav-store__header">
      <div class="fav-store__retailer"><span class="thumb thumb--lg"><img src="${st.logo}" alt=""></span><h2>${st.nome}</h2></div>
      <button class="selection-box fav-store__heart" aria-label="Remove from favorites" aria-pressed="true"><span class="icon" data-icon="heartFill"></span></button>
    </div>
    ${st.flyers.length
      ? `<div class="carousel fav-store__carousel">${st.flyers.map(x => favFlyerCard(x, st.nome)).join("")}</div>${notifButton(st.notifications)}`
      : `<div class="notice">
          <img class="notice__art" src="img/favorites/artwork-notifications.png" alt="">
          <p>There is currently no content available from ${st.nome}. Turn on NOTIFICATIONS to be alerted when new offers are posted.</p>
          ${notifButton(st.notifications)}
        </div>`}
  </section>`;

// Búsquedas guardadas (pestaña "Searches", Figma "FAVORITES_Searches")
// lines = líneas grises debajo de la ciudad (precio, tiendas, marcas)
const favoriteSearches = [
  { nome: "Coffee", citta: "Bologna", lines: ["€1.50 - €4.50", "Aldi, Carrefour, Coop", "Illy, Lavazza, Nescafé"] },
  { nome: "Milk",   citta: "Bologna", lines: ["Starting at €1.00", "Aldi, Conad, Coop, Esselunga"] },
];

// cardFavoriteSearch
const searchCard = x => `
  <article class="search-card">
    <div class="search-card__title"><h2>${x.nome}</h2>
      <button class="btn-icon search-card__delete" aria-label="Delete search"><span class="icon" data-icon="bin"></span></button>
    </div>
    <div class="search-card__content"><strong>${x.citta}</strong>${x.lines.map(l => `<p>${l}</p>`).join("")}</div>
  </article>`;

document.getElementById("view-favorites").innerHTML = `
  <div class="favorites" data-panel="stores">${favoriteStores.map(favoriteStore).join('<hr class="divider">')}</div>
  <div class="favorites" data-panel="searches" hidden>
    <div class="banner-notif">
      <div class="banner-notif__text">
        <p>If you want to stay up to date on your searches, turn on notifications.</p>
        <button class="btn btn--primary btn--small btn--block banner-notif__cta">Turn on notifications</button>
      </div>
      <div class="banner-notif__art">
        <button class="btn-icon banner-notif__close" aria-label="Close"><span class="icon" data-icon="closeCircular"></span></button>
        <img src="img/favorites/artwork-enable-notifications.png" width="115" height="115" alt="">
      </div>
    </div>
    <div class="search-cards">${favoriteSearches.map(searchCard).join("")}</div>
    <p class="savings__empty" id="searches-empty" hidden>You have no saved searches yet.</p>
  </div>`;

// Pestañas Stores / Searches
document.querySelectorAll("[data-favtab]").forEach(tab => tab.addEventListener("click", () => {
  document.querySelectorAll("[data-favtab]").forEach(t => t.classList.toggle("tab-line--selected", t === tab));
  document.querySelectorAll("#view-favorites [data-panel]").forEach(p => p.hidden = p.dataset.panel !== tab.dataset.favtab);
  window.scrollTo(0, 0);
}));

// Banner: la X lo cierra; al activar las notificaciones también desaparece
document.querySelectorAll(".banner-notif__close, .banner-notif__cta").forEach(b =>
  b.addEventListener("click", () => b.closest(".banner-notif").hidden = true));

// Papelera: borra la búsqueda y actualiza el número de la pestaña
document.querySelectorAll(".search-card__delete").forEach(b => b.addEventListener("click", () => {
  b.closest(".search-card").remove();
  const n = document.querySelectorAll(".search-card").length;
  const badge = document.getElementById("searches-count");
  badge.textContent = n;
  badge.hidden = n === 0;
  document.getElementById("searches-empty").hidden = n > 0;
}));

// Activar / desactivar notificaciones
document.querySelectorAll(".fav-notif").forEach(b => b.addEventListener("click", () => {
  const on = b.dataset.on !== "true";
  b.dataset.on = on;
  b.textContent = on ? "Turn off notifications" : "Turn on notifications";
  b.classList.toggle("btn--primary", !on);
  b.classList.toggle("btn--secondary", on);
}));

// Quitar / volver a poner en favoritos (corazón lleno ↔ vacío)
document.querySelectorAll(".fav-store__heart").forEach(b => b.addEventListener("click", () => {
  const on = b.getAttribute("aria-pressed") !== "true";
  b.setAttribute("aria-pressed", on);
  b.setAttribute("aria-label", on ? "Remove from favorites" : "Add to favorites");
  b.querySelector(".icon").innerHTML = `<svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">${ICONS[on ? "heartFill" : "heart"]}</svg>`;
}));

// =========================================================
// MY CARDS — tarjetas de fidelización (Figma "Partial state (6) grid", 28:3364)
// Cada tarjeta: logo sobre el color de la marca, o solo el nombre (gradiente)
// =========================================================
const loyaltyCards = [
  { nome: "Conad", logo: "img/cards/conad.png", colore: "#ffffff" },
  { nome: "Coop", logo: "img/cards/coop.png", colore: "#e30613",
    // Detalle de la tarjeta (Figma "Card detail", 28:3175)
    dettaglio: {
      barcode: "img/cards/barcode.png", codice: "2 985 002 624 219",
      mappa: "img/cards/coop-store-map.png", indirizzo: "Via M. E. Lepido, 184 - Bologna", distanza: "420 m",
      orario: "until 21:00",
      // Horario semanal (Figma "dropdownTimeTable" abierto, 50:8961). null = cerrado. "oggi" = día en negrita
      settimana: [
        ["Monday", "08:00 / 13:00 - 15:00 / 21:00"], ["Tuesday", "08:00 / 13:00 - 15:00 / 21:00"],
        ["Wednesday", "08:00 / 13:00 - 15:00 / 21:00"], ["Thursday", "08:00 / 13:00 - 15:00 / 21:00"],
        ["Friday", "08:00 / 13:00 - 15:00 / 21:00"], ["Saturday", "08:00 / 13:00 - 15:00 / 21:00"],
        ["Sunday", null],
      ],
      oggi: 0,
      volantini: ["img/cards/coop-flyer-1.jpg", "img/cards/coop-flyer-2.jpg"],
    } },
  { nome: "Corte Isolani Club" },
  { nome: "Decathlon", logo: "img/cards/decathlon.png", colore: "#1482c2" },
  { nome: "IKEA Family", logo: "img/cards/ikea-family.png", colore: "#f08b06" },
  { nome: "Lidl", logo: "img/cards/lidl.png", colore: "#103278" },
];
const loyaltyCard = c => c.logo
  ? `<button class="loyalty-card" style="background:${c.colore}" aria-label="${c.nome}"><img src="${c.logo}" alt="${c.nome}"></button>`
  : `<button class="loyalty-card loyalty-card--text"><span>${c.nome}</span></button>`;
document.getElementById("view-cards").innerHTML = `
  <div class="cards">
    <div class="cards__title">
      <h1>Loyalty cards</h1>
      <p>Tab <strong>Add card</strong> and find yours among more than 500 stores.</p>
    </div>
    <div class="cards__list">${loyaltyCards.map(loyaltyCard).join("")}</div>
  </div>
  <button class="btn btn--large btn--primary btn-floating">+ Add a card</button>`;

// Detalle de cada tarjeta que tenga "dettaglio" (de momento solo Coop)
const statusBar = document.querySelector(".status-bar").outerHTML;
const cardDetail = (c, i) => `
  <section class="card-detail" data-detail="${i}" hidden>
    <div class="card-detail__bg" style="background:${c.colore}"></div>
    <header class="card-detail__header">
      ${statusBar}
      <div class="top-bar">
        <button class="btn-icon top-bar__left" data-close-detail aria-label="Back"><span class="icon" data-icon="arrowBack"></span></button>
        <h1 class="top-bar__heading">${c.nome}</h1>
        <button class="btn-icon top-bar__right" aria-label="More options"><span class="icon" data-icon="moreCircular"></span></button>
      </div>
    </header>
    <div class="card-detail__content">
      <div class="barcode-card">
        <img src="${c.dettaglio.barcode}" alt="Barcode">
        <p>${c.dettaglio.codice}</p>
      </div>
      <div>
        <nav class="tabs tabs--full">
          <button class="tab-line tab-line--selected" data-cardtab="stores">Stores &amp; offers</button>
          <button class="tab-line" data-cardtab="info">Info</button>
        </nav>
        <div class="store-panel" data-cardpanel="stores">
          <div class="store-panel__top">
            <div class="store-info">
              <img src="${c.dettaglio.mappa}" alt="">
              <div class="store-info__text">
                <p>${c.dettaglio.indirizzo}</p>
                <strong>${c.dettaglio.distanza}</strong>
              </div>
              <button class="btn-icon" aria-label="Directions"><span class="icon" data-icon="direction"></span></button>
            </div>
            <div class="timetable">
              <div class="timetable__header">
                <div class="timetable__status"><span class="icon" data-icon="time"></span><strong>OPEN</strong>${c.dettaglio.orario}</div>
                <button class="btn-icon btn-icon--sm timetable__toggle" aria-label="Opening hours" aria-expanded="false"><span class="icon icon--sm" data-icon="expandMore"></span></button>
              </div>
              <ul class="timetable__week" hidden>${c.dettaglio.settimana.map(([giorno, ore], g) => `
                <li class="${ore ? "" : "is-closed"} ${g === c.dettaglio.oggi ? "is-today" : ""}"><span>${giorno}</span><span>${ore || "Closed"}</span></li>`).join("")}
              </ul>
            </div>
          </div>
          <hr class="divider">
          <div class="store-panel__flyers">${c.dettaglio.volantini.map(v => `<img src="${v}" alt="${c.nome} flyer">`).join("")}</div>
        </div>
        <!-- Pestaña Info (Figma 57:9018): nombre, fotos de la tarjeta (FRONT / BACK) y nota -->
        <div class="info-panel" data-cardpanel="info" hidden>
          <strong>${c.nome}</strong>
          <hr class="divider">
          <div class="info-panel__photos">
            <button class="photo-card"><span class="icon icon--lg" data-icon="camera"></span>FRONT</button>
            <button class="photo-card"><span class="icon icon--lg" data-icon="camera"></span>BACK</button>
          </div>
          <hr class="divider">
          <input class="info-panel__note" type="text" placeholder="Add a note..." aria-label="Note">
        </div>
      </div>
    </div>
    <div class="card-detail__home"></div>
  </section>`;
document.getElementById("card-details").innerHTML = loyaltyCards.map((c, i) => c.dettaglio ? cardDetail(c, i) : "").join("");

// Abrir: slide in de derecha a izquierda · Cerrar (flecha atrás): sale hacia la derecha
const openDetail = i => {
  const d = document.querySelector(`.card-detail[data-detail="${i}"]`);
  if (!d) return; // tarjeta sin detalle todavía
  d.hidden = false; d.scrollTop = 0;
  d.querySelector('[data-cardtab="stores"]').click();
  d.getBoundingClientRect(); // fuerza el punto de partida para que se vea la animación
  d.classList.add("is-open");
  document.body.style.overflow = "hidden";
};
const closeDetail = d => {
  d.classList.remove("is-open");
  d.addEventListener("transitionend", () => { d.hidden = true; }, { once: true });
  document.body.style.overflow = "";
};
document.querySelectorAll(".loyalty-card").forEach((b, i) => b.addEventListener("click", () => openDetail(i)));
// Pestañas del detalle: "Stores & offers" ↔ "Info"
document.querySelectorAll("[data-cardtab]").forEach(tab => tab.addEventListener("click", () => {
  const d = tab.closest(".card-detail");
  d.querySelectorAll("[data-cardtab]").forEach(t => t.classList.toggle("tab-line--selected", t === tab));
  d.querySelectorAll("[data-cardpanel]").forEach(p => p.hidden = p.dataset.cardpanel !== tab.dataset.cardtab);
}));

// Flecha del horario: despliega / pliega la semana completa
document.querySelectorAll(".timetable__toggle").forEach(b => b.addEventListener("click", () => {
  const open = b.getAttribute("aria-expanded") !== "true";
  b.setAttribute("aria-expanded", open);
  b.closest(".timetable").querySelector(".timetable__week").hidden = !open;
}));
document.querySelectorAll("[data-close-detail]").forEach(b => b.addEventListener("click", () => closeDetail(b.closest(".card-detail"))));

// =========================================================
// BOTTOM NAV — cambiar de página (Home ↔ Favorites ↔ My cards)
// =========================================================
const showPage = page => {
  const home = page === "home";
  document.querySelectorAll(".bottom-nav__tab").forEach(t => t.classList.toggle("bottom-nav__tab--selected", t.dataset.page === page));
  document.querySelector(".phone").dataset.page = page;
  document.getElementById("header-home").hidden = !home;
  document.getElementById("header-favorites").hidden = page !== "favorites";
  document.getElementById("view-favorites").hidden = page !== "favorites";
  document.getElementById("view-cards").hidden = page !== "cards";
  // En la Home se vuelve a la pestaña que estaba seleccionada ("For you" o "+ Savings")
  const view = document.querySelector(".tab-line--selected[data-view]").dataset.view;
  document.getElementById("view-home").hidden = !(home && view === "home");
  document.getElementById("view-savings").hidden = !(home && view === "savings");
  window.scrollTo(0, 0);
};
document.querySelectorAll(".bottom-nav__tab").forEach(tab => tab.addEventListener("click", e => {
  e.preventDefault();
  if (tab.dataset.page) showPage(tab.dataset.page); // My list y Profile todavía no tienen página
}));

// Enlaces que llevan a otra página (p. ej. "Discover more" → Favorites, la misma página que la pestaña del bottom bar)
document.querySelectorAll("[data-goto]").forEach(a => a.addEventListener("click", e => {
  e.preventDefault();
  showPage(a.dataset.goto);
}));

// Test A/B: abre la página con ?variante=b para ver la versión alternativa
if (new URLSearchParams(location.search).get("variante") === "b") {
  document.body.classList.add("variante-b");
}
