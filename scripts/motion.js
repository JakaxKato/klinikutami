import { animate } from "motion/mini";
import { inView, scroll, stagger } from "motion";

export const reducedMotion = matchMedia("(prefers-reduced-motion: reduce)");
const ease = [0.22, 1, 0.36, 1];
const activeAnimations = new Set();
const menuAnimations = new WeakMap();

function cancelAnimation(animation) {
  if (!animation) return;
  animation.cancel();
  activeAnimations.delete(animation);
}

function play(element, keyframes, options = {}) {
  const animation = animate(element, keyframes, {
    duration: 0.36,
    ease,
    ...options,
  });
  activeAnimations.add(animation);
  animation.then(() => activeAnimations.delete(animation));
  return animation;
}

// Keep menu visibility and focus management in the main site controller.
export function transitionMenu(element, open, complete, instant = false) {
  const previous = menuAnimations.get(element);
  const style = previous ? getComputedStyle(element) : null;
  const fromOpacity = style ? Number(style.opacity) : open ? 0 : 1;
  const fromTransform =
    style?.transform || (open ? "translateY(-8px)" : "translateY(0px)");
  cancelAnimation(previous);
  menuAnimations.delete(element);
  if (reducedMotion.matches || instant) {
    element.style.removeProperty("opacity");
    element.style.removeProperty("transform");
    complete();
    return;
  }
  const animation = play(
    element,
    {
      opacity: [fromOpacity, open ? 1 : 0],
      transform: [fromTransform, open ? "translateY(0px)" : "translateY(-6px)"],
    },
    { duration: open ? 0.22 : 0.16 },
  );
  menuAnimations.set(element, animation);
  animation.then(() => {
    if (menuAnimations.get(element) !== animation) return;
    complete();
    animation.cancel();
    element.style.removeProperty("opacity");
    element.style.removeProperty("transform");
    menuAnimations.delete(element);
  });
}

function setupDisclosures() {
  document
    .querySelectorAll(".service-card, .faq-item, .doctor-details")
    .forEach((details) => {
      const summary = details.querySelector(":scope > summary");
      if (!summary) return;
      const content = summary.nextElementSibling;
      if (!content) return;
      details.classList.add("motion-details");
      let wantedOpen = details.open;
      let currentAnimation;

      details.addEventListener("toggle", () => {
        if (!currentAnimation) wantedOpen = details.open;
      });
      summary.addEventListener("click", (event) => {
        if (reducedMotion.matches) return;
        event.preventDefault();
        wantedOpen = !wantedOpen;

        // Read the current layout before changing open state; measure the target
        // once after exposing the content. No geometry is polled while scrolling.
        const start = details.getBoundingClientRect().height;
        cancelAnimation(currentAnimation);
        const style = getComputedStyle(details);
        const borders =
          parseFloat(style.borderTopWidth) +
          parseFloat(style.borderBottomWidth);
        details.style.height = `${start}px`;
        details.style.overflow = "clip";
        details.open = true;
        const end =
          summary.getBoundingClientRect().height +
          borders +
          (wantedOpen ? content.getBoundingClientRect().height : 0);
        const animation = play(
          details,
          { height: [`${start}px`, `${end}px`] },
          { duration: 0.28 },
        );
        currentAnimation = animation;
        animation.then(() => {
          if (currentAnimation !== animation) return;
          details.open = wantedOpen;
          animation.cancel();
          details.style.removeProperty("height");
          details.style.removeProperty("overflow");
          currentAnimation = undefined;
        });
      });
    });
}

function setupScrollMotion() {
  if (reducedMotion.matches) return () => {};
  const cleanup = [];
  const progress = document.querySelector(".scroll-progress");
  const progressAnimation = animate(
    progress,
    {
      transform: ["scaleX(0)", "scaleX(1)"],
    },
    { ease: "linear", duration: 1 },
  );
  const stopProgress = scroll(progressAnimation);
  // Cancel before detaching: a reduced-motion change can hide this decorative
  // element before Motion releases its timeline. Hidden targets cannot commit styles.
  cleanup.push(() => progressAnimation.cancel());
  cleanup.push(stopProgress);

  // Content is visible before JS and between observations; a reveal never
  // gates access to text, images, keyboard targets or the LCP hero image.
  const targets = document.querySelectorAll(
    "[data-motion-reveal], .service-card, .doctor-card, .schedule-heading, " +
      ".weekly-schedule, .schedule-flyer, .gallery-item, .review-card, " +
      ".faq-heading, .location-details, .location-map, .closing-inner",
  );
  cleanup.push(
    inView(
      targets,
      (element) => {
        if (element.dataset.revealed || reducedMotion.matches) return;
        element.dataset.revealed = "true";
        const animation = play(
          element,
          {
            opacity: [0.65, 1],
            transform: ["translateY(16px)", "translateY(0px)"],
          },
          { duration: 0.48 },
        );
        animation.then(() => animation.cancel());
      },
      { margin: "0px 0px -24px 0px", amount: 0.08 },
    ),
  );
  return () => cleanup.forEach((stop) => stop());
}

export function setupMotion() {
  setupDisclosures();
  let stopScrollMotion = setupScrollMotion();
  if (!reducedMotion.matches && window.scrollY < 80) {
    // Stagger only the small supporting elements, leaving the headline and
    // image visible immediately for a fast initial paint.
    const intro = document.querySelectorAll(
      ".hero-eyebrow, .hero-actions, .hero-address",
    );
    const animation = play(
      intro,
      {
        opacity: [0.8, 1],
        transform: ["translateY(9px)", "translateY(0px)"],
      },
      { duration: 0.42, delay: stagger(0.06) },
    );
    animation.then(() => animation.cancel());
  }
  reducedMotion.addEventListener("change", () => {
    stopScrollMotion();
    if (reducedMotion.matches) {
      activeAnimations.forEach((animation) => animation.complete());
    } else {
      stopScrollMotion = setupScrollMotion();
    }
  });
}
