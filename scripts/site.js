import { reducedMotion, setupMotion, transitionMenu } from "./motion.js";

const menuButton = document.querySelector(".menu-toggle");
const mobileMenu = document.querySelector("#mobile-menu");
let menuOpen = false;

function setMenu(open, returnFocus = false, instant = false) {
  menuOpen = open;
  if (open) mobileMenu.hidden = false;
  mobileMenu.inert = !open;
  menuButton.setAttribute("aria-expanded", String(open));
  menuButton.setAttribute(
    "aria-label",
    open ? "Tutup menu navigasi" : "Buka menu navigasi",
  );
  if (returnFocus || (!open && mobileMenu.contains(document.activeElement)))
    menuButton.focus();
  transitionMenu(
    mobileMenu,
    open,
    () => {
      mobileMenu.hidden = !menuOpen;
    },
    instant,
  );
}

function closeMenu(returnFocus = false, instant = false) {
  if (menuOpen || !mobileMenu.hidden) setMenu(false, returnFocus, instant);
}

menuButton.addEventListener("click", () => {
  setMenu(!menuOpen);
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
  if (event.matches) closeMenu(false, true);
});
reducedMotion.addEventListener("change", () => {
  if (reducedMotion.matches) setMenu(menuOpen, false, true);
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

setupMotion();
