const menuButton = document.querySelector(".menu-toggle");
const mobileMenu = document.querySelector("#mobile-menu");

function closeMenu(returnFocus = false) {
  mobileMenu.hidden = true;
  menuButton.setAttribute("aria-expanded", "false");
  menuButton.setAttribute("aria-label", "Buka menu navigasi");
  if (returnFocus) menuButton.focus();
}

menuButton.addEventListener("click", () => {
  const open = menuButton.getAttribute("aria-expanded") === "true";
  mobileMenu.hidden = open;
  menuButton.setAttribute("aria-expanded", String(!open));
  menuButton.setAttribute(
    "aria-label",
    open ? "Buka menu navigasi" : "Tutup menu navigasi",
  );
});
mobileMenu.addEventListener("click", (event) => {
  if (event.target.closest("a")) closeMenu();
});
document.addEventListener("keydown", (event) => {
  if (event.key === "Escape" && !mobileMenu.hidden) closeMenu(true);
});
document.addEventListener("click", (event) => {
  if (!mobileMenu.hidden && !event.target.closest(".site-header")) closeMenu();
});
matchMedia("(min-width: 1200px)").addEventListener("change", (event) => {
  if (event.matches) closeMenu();
});

const filters = document.querySelector(".schedule-filters");
const doctorSelect = document.querySelector("#schedule-doctor");
const daySelect = document.querySelector("#schedule-day");
const schedules = [...document.querySelectorAll(".schedule-card")];

function filterSchedule() {
  let visible = 0;
  for (const card of schedules) {
    const matchesDoctor =
      doctorSelect.value === "all" ||
      doctorSelect.value === card.dataset.doctor;
    const matchesDay =
      daySelect.value === "all" || daySelect.value === card.dataset.day;
    card.hidden = !(matchesDoctor && matchesDay);
    if (!card.hidden) visible++;
  }
  document.querySelector("#schedule-count").textContent =
    `Menampilkan ${visible} jadwal praktik`;
  document.querySelector("#schedule-empty").hidden = visible !== 0;
}
filters.addEventListener("change", filterSchedule);
filters.addEventListener("submit", (event) => event.preventDefault());
filters.addEventListener("reset", () => {
  // Reset fires before the browser restores the select values.
  requestAnimationFrame(filterSchedule);
});

const header = document.querySelector(".site-header");
const sentinel = document.querySelector(".hero");
new IntersectionObserver(
  ([entry]) => {
    header.classList.toggle("is-scrolled", !entry.isIntersecting);
  },
  { rootMargin: "-100px 0px 0px 0px" },
).observe(sentinel);

const loadMap = document.querySelector("#load-map");
loadMap.addEventListener("click", () => {
  const frame = document.querySelector(".map-panel iframe");
  const status = document.querySelector("#map-status");
  loadMap.disabled = true;
  status.textContent = "Memuat peta Google Maps…";
  const timeout = setTimeout(() => {
    status.textContent =
      "Peta belum termuat. Gunakan tautan Google Maps di bawah.";
    loadMap.disabled = false;
  }, 10000);
  frame.addEventListener(
    "load",
    () => {
      clearTimeout(timeout);
      frame.hidden = false;
      status.textContent = "";
    },
    { once: true },
  );
  frame.src = frame.dataset.src;
});
