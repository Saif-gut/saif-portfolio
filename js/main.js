"use strict";
// All content and anchors work without JavaScript. Enhance only the navigation.
const menuToggle = document.querySelector(".menu-toggle");
const navigation = document.querySelector(".main-nav");
const mobileViewport = window.matchMedia("(max-width: 800px)");
function closeMenu() {
  if (!menuToggle || !navigation) return;
  menuToggle.setAttribute("aria-expanded", "false");
  navigation.classList.remove("is-open");
}
if (menuToggle && navigation) {
  document.documentElement.classList.add("js-enabled");
  menuToggle.hidden = false;
  menuToggle.addEventListener("click", () => {
    const opening = menuToggle.getAttribute("aria-expanded") !== "true";
    menuToggle.setAttribute("aria-expanded", String(opening));
    navigation.classList.toggle("is-open", opening);
  });
  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape" && navigation.classList.contains("is-open")) {
      closeMenu();
      menuToggle.focus();
    }
  });
  document.addEventListener("click", (event) => {
    if (
      !navigation.contains(event.target) &&
      !menuToggle.contains(event.target)
    )
      closeMenu();
  });
  document.addEventListener("focusin", (event) => {
    if (
      !navigation.contains(event.target) &&
      !menuToggle.contains(event.target)
    )
      closeMenu();
  });
  mobileViewport.addEventListener("change", closeMenu);
}
document.querySelectorAll('a[href^="#"]').forEach((link) => {
  link.addEventListener("click", () => {
    const target = document.getElementById(link.hash.slice(1));
    if (!target) return;
    closeMenu();
    const alreadyFocusable = target.hasAttribute("tabindex");
    if (!alreadyFocusable) target.setAttribute("tabindex", "-1");
    target.focus({ preventScroll: true });
    if (!alreadyFocusable)
      target.addEventListener(
        "blur",
        () => target.removeAttribute("tabindex"),
        { once: true },
      );
  });
});
const navLinks = [...document.querySelectorAll('.main-nav a[href^="#"]')];
const sections = navLinks
  .map((link) => document.getElementById(link.hash.slice(1)))
  .filter(Boolean);
let queued = false;
let activeId;
function updateNavigation() {
  queued = false;
  let active = sections[0]?.id;
  sections.forEach((section) => {
    if (section.getBoundingClientRect().top <= 150) active = section.id;
  });
  if (
    window.scrollY + window.innerHeight >=
    document.documentElement.scrollHeight - 2
  )
    active = sections.at(-1)?.id;
  if (active === activeId) return;
  activeId = active;
  navLinks.forEach((link) => {
    if (link.hash === `#${active}`)
      link.setAttribute("aria-current", "location");
    else link.removeAttribute("aria-current");
  });
}
function queueNavigation() {
  if (queued) return;
  queued = true;
  requestAnimationFrame(updateNavigation);
}
window.addEventListener("scroll", queueNavigation, { passive: true });
window.addEventListener("resize", queueNavigation);
window.addEventListener("load", queueNavigation);
if ("ResizeObserver" in window)
  new ResizeObserver(queueNavigation).observe(document.body);
updateNavigation();
const year = document.getElementById("current-year");
if (year) year.textContent = String(new Date().getFullYear());

// Progressive enhancement: without JavaScript every project and image is visible.
const projects = [...document.querySelectorAll("[data-project]")];
const filters = [...document.querySelectorAll("[data-filter]")];
const projectControls = document.querySelector(".project-controls");
function filterProjects(category) {
  let count = 0;
  projects.forEach((project) => {
    project.hidden = category !== "all" && project.dataset.project !== category;
    project.classList.remove("first-filtered");
    if (!project.hidden) count++;
  });
  filters.forEach((button) =>
    button.setAttribute("aria-pressed", String(button.dataset.filter === category)),
  );
  const compact = document.querySelector(".more-projects");
  if (compact)
    compact.hidden = ![...compact.querySelectorAll("[data-project]")].some(
      (project) => !project.hidden,
    );
  projects.find((project) => !project.hidden)?.classList.add("first-filtered");
  const status = document.querySelector(".filter-status");
  if (status) status.textContent = `${count} ${count === 1 ? "Projekt" : "Projekte"}`;
  queueNavigation();
}
if (projectControls && filters.length) {
  projectControls.hidden = false;
  filters.forEach((button) =>
    button.addEventListener("click", () => filterProjects(button.dataset.filter)),
  );
}

const galleryButtons = [...document.querySelectorAll("[data-view]")];
const galleryScreens = [...document.querySelectorAll("[data-screen]")];
function showScreen(view) {
  galleryScreens.forEach((screen) => {
    screen.hidden = screen.dataset.screen !== view;
  });
  galleryButtons.forEach((button) =>
    button.setAttribute("aria-pressed", String(button.dataset.view === view)),
  );
}
if (galleryButtons.length && galleryScreens.length) {
  document.querySelector(".gallery-tabs").hidden = false;
  showScreen("dashboard");
  galleryButtons.forEach((button) =>
    button.addEventListener("click", () => showScreen(button.dataset.view)),
  );
}

// Direct links to an image/project must also work after a different filter was used.
function revealAnchor(hash) {
  const target = document.getElementById(hash.slice(1));
  if (!target) return;
  if (target.closest("[data-project]")?.hidden) filterProjects("all");
  const screen = target.closest("[data-screen]");
  if (screen?.hidden) showScreen(screen.dataset.screen);
}
document.addEventListener("click", (event) => {
  const link = event.target.closest('a[href^="#"]');
  if (link) revealAnchor(link.hash);
}, true);
window.addEventListener("hashchange", () => revealAnchor(location.hash));
revealAnchor(location.hash);
