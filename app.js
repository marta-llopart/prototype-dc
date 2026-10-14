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

// Stories: tipo = "sponsored-unread" | "sponsored" | "unread" | "read"
const stories = ["sponsored-unread", "sponsored", "unread", "unread", "read", "read", "read", "read", "read", "read"];

// Un folleto: imagen, retailer, distancia y etiqueta (tag: "nuovo" | "arrivo" | null)
const f = (img, tag = "nuovo", retailer = "Retailer") => ({ img, tag, retailer, distanza: "978 m" });

// Secciones de la Home, en el mismo orden que el diseño de Figma
const sezioni = [
  { tipo: "carousel", titolo: "Picked for you", icono: "heartFill", link: "See more",
    items: [f(IMG.comet, "arrivo"), f(IMG.coop), f(IMG.unieuro), f(IMG.comet), f(IMG.coop)] },

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
      <div class="flyer-card__retailer"><span class="thumb"><img src="${IMG.logo}" alt=""></span>${x.retailer}</div>
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

document.getElementById("stories").innerHTML = stories.map(t => `
  <div class="story ${t.includes("unread") ? "story--unread" : ""} ${t.startsWith("sponsored") ? "story--sponsored" : ""}">
    <div class="story__img"><img src="${IMG.logo}" alt="">${t.startsWith("sponsored") ? BOLT : ""}</div>
    <div class="story__label">Retailer name</div>
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

// Interacciones simples: seleccionar pestañas
const selectable = (sel, cls) => document.querySelectorAll(sel).forEach(el =>
  el.addEventListener("click", e => {
    e.preventDefault();
    document.querySelectorAll(sel).forEach(o => o.classList.remove(cls));
    el.classList.add(cls);
  }));
selectable(".cat-tab", "cat-tab--selected");
selectable(".tab-line", "tab-line--selected");
selectable(".bottom-nav__tab", "bottom-nav__tab--selected");

// Test A/B: abre la página con ?variante=b para ver la versión alternativa
if (new URLSearchParams(location.search).get("variante") === "b") {
  document.body.classList.add("variante-b");
}
