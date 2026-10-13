// =========================================================
// DATOS DE EJEMPLO
// Edita estas listas para cambiar lo que se ve en pantalla.
// "colore" usa los colores de la paleta del design system.
// =========================================================
const volantini = [
  { negozio: "Esselunga",  distanza: "450 m",  nuovo: true,  colore: "var(--color-red-700)" },
  { negozio: "Coop",       distanza: "978 m",  nuovo: true,  colore: "var(--color-orange-700)" },
  { negozio: "Lidl",       distanza: "1,2 km", nuovo: false, colore: "var(--color-teal-800)" },
  { negozio: "MediaWorld", distanza: "2,4 km", nuovo: false, colore: "var(--color-grey-800)" },
  { negozio: "Carrefour",  distanza: "3,1 km", nuovo: true,  colore: "var(--color-purple-700)" },
];

const negozi = [
  { nome: "Esselunga", distanza: "450 m",  colore: "var(--color-red-700)" },
  { nome: "Conad",     distanza: "1,1 km", colore: "var(--color-orange-800)" },
  { nome: "Ikea",      distanza: "3,2 km", colore: "var(--color-yellow-700)" },
  { nome: "Tigotà",    distanza: "3,8 km", colore: "var(--color-purple-700)" },
  { nome: "Pam",       distanza: "4,5 km", colore: "var(--color-green-800)" },
];

// =========================================================
// PINTAR LA PANTALLA (no hace falta tocar esto)
// =========================================================
const iniziali = nome => nome.slice(0, 2).toUpperCase();

// flyerCard / Size=Default
document.getElementById("flyers").innerHTML = volantini.map(v => `
  <article class="flyer-card">
    <div class="flyer-card__cover" style="background:${v.colore}">${v.negozio}</div>
    <div class="flyer-card__txt">
      <div class="flyer-card__retailer">
        <span class="thumb" style="background:${v.colore}">${iniziali(v.negozio)}</span>
        ${v.negozio}
      </div>
      <div class="flyer-card__meta">
        ${v.distanza}
        ${v.nuovo ? '<span class="tag">Nuovo</span>' : ""}
      </div>
    </div>
  </article>
`).join("");

// cardStore
document.getElementById("stores").innerHTML = negozi.map(n => `
  <article class="store-card">
    <div class="store-card__map"></div>
    <div class="store-card__pin"><span class="thumb" style="background:${n.colore}">${iniziali(n.nome)}</span></div>
    <div class="store-card__txt">
      <div class="store-card__name">${n.nome}</div>
      <div class="store-card__dist">${n.distanza}</div>
    </div>
  </article>
`).join("");

// Chips: al pulsar uno, se marca como activo
document.querySelectorAll(".chip").forEach(chip => {
  chip.addEventListener("click", () => {
    document.querySelectorAll(".chip").forEach(c => c.classList.remove("chip--active"));
    chip.classList.add("chip--active");
  });
});

// Bottom nav: al pulsar una pestaña, se marca como seleccionada
document.querySelectorAll(".bottom-nav__tab").forEach(tab => {
  tab.addEventListener("click", e => {
    e.preventDefault();
    document.querySelectorAll(".bottom-nav__tab").forEach(t => t.classList.remove("bottom-nav__tab--selected"));
    tab.classList.add("bottom-nav__tab--selected");
  });
});

// Test A/B: abre la página con ?variante=b para ver la versión alternativa
if (new URLSearchParams(location.search).get("variante") === "b") {
  document.body.classList.add("variante-b");
}
