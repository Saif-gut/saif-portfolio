"use strict";

document.documentElement.classList.add("js-enabled");
const menuToggle = document.querySelector(".menu-toggle");
const mobileMenu = document.querySelector(".mobile-menu");

function closeMobileMenu() {
  if (!menuToggle || !mobileMenu) return;
  menuToggle.setAttribute("aria-expanded", "false");
  menuToggle.setAttribute("aria-label", "Menü öffnen");
  mobileMenu.classList.remove("is-open");
}

if (menuToggle && mobileMenu) {
  menuToggle.addEventListener("click", () => {
    const willOpen = menuToggle.getAttribute("aria-expanded") !== "true";
    menuToggle.setAttribute("aria-expanded", String(willOpen));
    menuToggle.setAttribute("aria-label", willOpen ? "Menü schließen" : "Menü öffnen");
    mobileMenu.classList.toggle("is-open", willOpen);
  });
  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape" && mobileMenu.classList.contains("is-open")) {
      closeMobileMenu();
      menuToggle.focus();
    }
  });
  document.addEventListener("click", (event) => {
    if (!mobileMenu.contains(event.target) && !menuToggle.contains(event.target)) closeMobileMenu();
  });
  window.matchMedia("(min-width: 961px)").addEventListener("change", (event) => {
    if (event.matches) closeMobileMenu();
  });
}

// Native anchors preserve browser history and work without JavaScript.
document.querySelectorAll('a[href^="#"]').forEach((link) => {
  link.addEventListener("click", () => {
    const target = document.getElementById(link.getAttribute("href").slice(1));
    if (!target) return;
    if (mobileMenu?.contains(link)) closeMobileMenu();
    target.setAttribute("tabindex", "-1");
    target.focus({ preventScroll: true });
    target.addEventListener("blur", () => target.removeAttribute("tabindex"), { once: true });
  });
});

const filterGroup = document.querySelector(".project-filter");
const filterButtons = Array.from(document.querySelectorAll(".project-filter__button"));
const projectCards = Array.from(document.querySelectorAll(".project-hub__card"));
const projectCount = document.querySelector("#project-count");
if (filterGroup) filterGroup.hidden = false;

filterButtons.forEach((button) => {
  button.addEventListener("click", () => {
    const filter = button.dataset.filter;
    filterButtons.forEach((item) => {
      const active = item === button;
      item.classList.toggle("is-active", active);
      item.setAttribute("aria-pressed", String(active));
    });
    let visibleCount = 0;
    projectCards.forEach((card) => {
      card.hidden = filter !== "all" && !card.dataset.category.split(" ").includes(filter);
      if (!card.hidden) visibleCount++;
    });
    if (projectCount) projectCount.textContent = `${visibleCount} ${visibleCount === 1 ? "Projekt" : "Projekte"} angezeigt.`;
  });
});

// Section starts keep long sections active while scrolling through them.
const navigationLinks = Array.from(document.querySelectorAll('.side-nav a[href^="#"], .mobile-menu a[href^="#"]'));
const sectionIds = [...new Set(navigationLinks.map((link) => link.hash.slice(1)))];
const navigationSections = sectionIds.map((id) => document.getElementById(id)).filter(Boolean);
let scrollQueued = false;
let currentSection = "";

function updateNavigation() {
  scrollQueued = false;
  const offset = window.innerWidth <= 960 ? 130 : 100;
  let active = navigationSections[0]?.id;
  navigationSections.forEach((section) => {
    if (section.getBoundingClientRect().top <= offset) active = section.id;
  });
  if (window.scrollY + window.innerHeight >= document.documentElement.scrollHeight - 2) active = navigationSections.at(-1)?.id;
  if (active === currentSection) return;
  currentSection = active;
  navigationLinks.forEach((link) => {
    const isActive = link.hash === `#${active}`;
    link.classList.toggle("active", isActive);
    if (isActive) link.setAttribute("aria-current", "location");
    else link.removeAttribute("aria-current");
  });
}

function queueNavigationUpdate() {
  if (scrollQueued) return;
  scrollQueued = true;
  requestAnimationFrame(updateNavigation);
}
window.addEventListener("scroll", queueNavigationUpdate, { passive: true });
window.addEventListener("resize", queueNavigationUpdate);
window.addEventListener("load", updateNavigation);
if ("ResizeObserver" in window) new ResizeObserver(queueNavigationUpdate).observe(document.body);
updateNavigation();

const yearElement = document.querySelector("#current-year");
if (yearElement) yearElement.textContent = String(new Date().getFullYear());
