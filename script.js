// ====== CONFIGURAÇÃO ======
// Link de checkout (Hotmart, Kiwify, Eduzz, Mercado Pago etc.)
const CHECKOUT_URL = "#";

// ====== Ano no rodapé ======
document.getElementById("year").textContent = new Date().getFullYear();

// ====== Botões de compra ======
// Todos rolam até a oferta; só o botão final leva ao checkout.
const buyBtn = document.getElementById("buyBtn");
buyBtn.addEventListener("click", (e) => {
  if (CHECKOUT_URL !== "#") {
    e.preventDefault();
    window.location.href = CHECKOUT_URL;
  }
});

// ====== Abas de modelos (teclado e mouse) ======
(function tabs() {
  const tabs = [...document.querySelectorAll('[role="tab"]')];
  const panels = tabs.map((t) => document.getElementById(t.getAttribute("aria-controls")));

  function select(index, moveFocus) {
    tabs.forEach((tab, i) => {
      const on = i === index;
      tab.setAttribute("aria-selected", String(on));
      tab.tabIndex = on ? 0 : -1;
      panels[i].hidden = !on; // ao reaparecer, o desenho do molde é traçado de novo
    });
    if (moveFocus) tabs[index].focus();
  }

  tabs.forEach((tab, i) => {
    tab.addEventListener("click", () => select(i, false));
    tab.addEventListener("keydown", (e) => {
      const last = tabs.length - 1;
      let next = null;
      if (e.key === "ArrowDown" || e.key === "ArrowRight") next = i === last ? 0 : i + 1;
      if (e.key === "ArrowUp" || e.key === "ArrowLeft") next = i === 0 ? last : i - 1;
      if (e.key === "Home") next = 0;
      if (e.key === "End") next = last;
      if (next !== null) {
        e.preventDefault();
        select(next, true);
      }
    });
  });
})();

// ====== Botão fixo no celular ======
(function stickyCta() {
  const sticky = document.querySelector(".sticky-cta");
  const offer = document.getElementById("comprar");
  function update() {
    const r = offer.getBoundingClientRect();
    const onOffer = r.top < window.innerHeight * 0.85 && r.bottom > 0;
    sticky.classList.toggle("show", window.scrollY > 520 && !onOffer);
  }
  window.addEventListener("scroll", update, { passive: true });
  update();
})();
