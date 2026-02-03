// ✅ Botón (mensaje)
const btn = document.getElementById("btnSaludo");
const mensaje = document.getElementById("mensaje");

if (btn && mensaje) {
  btn.addEventListener("click", () => {
    mensaje.textContent = "🎯 Promos y cotizaciones por WhatsApp: 5511-7177 ✅";
  });
}

// ✅ Año automático en footer
const anio = document.getElementById("anio");
if (anio) {
  anio.textContent = new Date().getFullYear();
}

// ✅ Catálogo (edítalo con tus precios reales cuando quieras)
const items = [
  {
    categoria: "Portones Automáticos",
    nombre: "Automatización / motor para portón (según modelo)",
    ubicacion: "Guatemala",
    precio: null,
    img: "img/porton-automatico.jpg",
  },
  {
    categoria: "Cortinas Metálicas",
    nombre: "Cortina metálica enrollable (instalación / reparación)",
    ubicacion: "Guatemala",
    precio: null,
    img: "img/cortina-metalica.jpg",
  },
  {
    categoria: "Controles Remotos",
    nombre: "Control remoto para portón (programación incluida)",
    ubicacion: "Guatemala",
    precio: null,
    img: "img/control-remoto.jpg",
  },
  {
    categoria: "Repuestos y Accesorios",
    nombre: "Repuestos y accesorios (sensores, cremalleras, rodamientos, etc.)",
    ubicacion: "Zona 12, Guatemala",
    precio: null,
    img: "img/repuestos-accesorios.jpg",
  },
  {
    categoria: "Servicio técnico",
    nombre: "Servicio técnico (incluye emergencias 24/7)",
    ubicacion: "Zona 12, Guatemala",
    precio: null,
    img: "img/servicio-tecnico.jpg",
  },
  {
    categoria: "Mantenimiento",
    nombre: "Mantenimiento preventivo y correctivo",
    ubicacion: "Guatemala",
    precio: null,
    img: "img/mantenimiento.jpg",
  },
];

// ✅ Elementos del filtro
const grid = document.getElementById("propGrid");
const fBuscar = document.getElementById("fBuscar");
const fCategoria = document.getElementById("fCategoria");
const fMin = document.getElementById("fMin");
const fMax = document.getElementById("fMax");
const btnLimpiar = document.getElementById("btnLimpiar");

function formatQ(n) {
  if (n === null || n === undefined || Number.isNaN(Number(n))) return "Cotizar";
  return "Q " + Number(n).toLocaleString("es-GT");
}

function render(lista) {
  if (!grid) return;

  if (lista.length === 0) {
    grid.innerHTML = `
      <div class="card">
        <div class="card-body">
          <h3>No hay resultados</h3>
          <p class="muted">Prueba cambiando los filtros.</p>
        </div>
      </div>
    `;
    return;
  }

  grid.innerHTML = lista
    .map(
      (p) => `
      <article class="pcard">
        <img src="${p.img}" alt="${p.nombre}">
        <div class="pcard__body">
          <span class="badge">${p.categoria}</span>
          <h3>${p.nombre}</h3>
          <p class="muted">${p.ubicacion}</p>
          <p class="price">${formatQ(p.precio)}</p>

          <a class="btn wa-btn" target="_blank" rel="noopener"
            href="https://wa.me/50255117177?text=${encodeURIComponent(
              "Hola Deacero Guatemala, quiero información sobre: " +
                p.nombre +
                " / " +
                p.ubicacion
            )}">
            Solicitar información
          </a>
        </div>
      </article>
    `
    )
    .join("");
}

function filtrar() {
  const q = (fBuscar?.value || "").toLowerCase().trim();
  const cat = fCategoria?.value || "";
  const min = Number(fMin?.value || 0);
  const max = Number(fMax?.value || 999999999);

  const out = items.filter((p) => {
    const texto = (p.nombre + " " + p.categoria + " " + p.ubicacion).toLowerCase();
    const matchesQ = !q || texto.includes(q);

    const precio = (p.precio === null || p.precio === undefined) ? 0 : Number(p.precio);
    const matchesPrecio = precio >= min && precio <= max;

    return matchesQ && (!cat || p.categoria === cat) && matchesPrecio;
  });

  render(out);
}

// ✅ Eventos
[fBuscar, fCategoria, fMin, fMax].forEach((el) => {
  if (el) el.addEventListener("input", filtrar);
  if (el) el.addEventListener("change", filtrar);
});

if (btnLimpiar) {
  btnLimpiar.addEventListener("click", () => {
    if (fBuscar) fBuscar.value = "";
    if (fCategoria) fCategoria.value = "";
    if (fMin) fMin.value = "";
    if (fMax) fMax.value = "";
    filtrar();
  });
}

// ✅ Inicial
render(items);

// ✅ Formulario: envía a WhatsApp
const form = document.getElementById("contactForm");

if (form) {
  form.addEventListener("submit", (e) => {
    e.preventDefault();

    const nombre = document.getElementById("cNombre")?.value.trim();
    const correo = document.getElementById("cCorreo")?.value.trim();
    const msg = document.getElementById("cMensaje")?.value.trim();

    const texto =
  `Hola, soy ${nombre}.\n` +
  (correo ? `Mi correo es: ${correo}.\n` : "") +
  `Mensaje: ${msg}`;
    const url = `https://wa.me/50255117177?text=${encodeURIComponent(texto)}`;

    window.open(url, "_blank");
  });
}


/* ✅ Scroll suave para el menú */
document.querySelectorAll('a[href^="#"]').forEach(a => {
  a.addEventListener("click", (e) => {
    const id = a.getAttribute("href");
    if (!id || id.length < 2) return;
    const el = document.querySelector(id);
    if (!el) return;
    e.preventDefault();
    const header = document.querySelector(".header");
    const offset = header ? header.offsetHeight + 10 : 80;
    const top = el.getBoundingClientRect().top + window.pageYOffset - offset;
    window.scrollTo({ top, behavior: "smooth" });
  });
});
// 🎬 Videos SOLO al pasar el mouse (Trabajos realizados)
window.addEventListener("DOMContentLoaded", () => {
  document.querySelectorAll(".work-video").forEach((video) => {
    video.addEventListener("mouseenter", () => {
      video.play().catch(() => {});
    });

    video.addEventListener("mouseleave", () => {
      video.pause();
      video.currentTime = 0;
    });

    // 📱 móvil: tap play/pausa
    video.addEventListener("click", () => {
      if (video.paused) video.play().catch(() => {});
      else video.pause();
    });
  });
});
