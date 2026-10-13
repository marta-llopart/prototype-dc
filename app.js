// =========================================================
// DATOS DE EJEMPLO
// Edita estas listas para cambiar lo que se ve en pantalla.
// =========================================================
const volantini = [
  { negozio: "Esselunga", scadenza: "Fino al 20 ott", colore: "#d62828" },
  { negozio: "Coop",      scadenza: "Fino al 22 ott", colore: "#e63946" },
  { negozio: "Lidl",      scadenza: "Fino al 19 ott", colore: "#1d4ed8" },
  { negozio: "MediaWorld",scadenza: "Fino al 27 ott", colore: "#111827" },
  { negozio: "Carrefour", scadenza: "Fino al 25 ott", colore: "#2563eb" },
];

const negozi = ["Esselunga", "Coop", "Lidl", "Conad", "Ikea", "Tigotà", "Pam", "Eurospin"];

// =========================================================
// PINTAR LA PANTALLA (no hace falta tocar esto)
// =========================================================
document.getElementById("flyers").innerHTML = volantini.map(v => `
  <article class="flyer">
    <div class="flyer__cover" style="background:${v.colore}">${v.negozio}</div>
    <div class="flyer__info">
      <div class="flyer__store">${v.negozio}</div>
      <div class="flyer__date">${v.scadenza}</div>
    </div>
  </article>
`).join("");

document.getElementById("stores").innerHTML = negozi.map(n => `
  <div class="store">
    <div class="store__logo">${n.slice(0, 2).toUpperCase()}</div>
    ${n}
  </div>
`).join("");

// Chips: al pulsar uno, se marca como activo
document.querySelectorAll(".chip").forEach(chip => {
  chip.addEventListener("click", () => {
    document.querySelectorAll(".chip").forEach(c => c.classList.remove("chip--active"));
    chip.classList.add("chip--active");
  });
});

// Test A/B: abre la página con ?variante=b para ver la versión alternativa
if (new URLSearchParams(location.search).get("variante") === "b") {
  document.body.classList.add("variante-b");
}
