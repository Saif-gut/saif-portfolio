"use strict";

document.documentElement.classList.add("js-enabled");

// Mobile menu
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

  mobileMenu.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", closeMobileMenu);
  });

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") {
      closeMobileMenu();
      menuToggle.focus();
    }
  });

  document.addEventListener("click", (event) => {
    if (!mobileMenu.classList.contains("is-open")) return;
    if (!mobileMenu.contains(event.target) && !menuToggle.contains(event.target)) closeMobileMenu();
  });

  window.addEventListener("resize", () => {
    if (window.innerWidth > 960) closeMobileMenu();
  });
}

// Project filters
const projectImages = [
  [".project-media--jarvis", "assets/projects/jarvis/cover.webp", "Vorschau eines lokalen Jarvis Dashboards mit Systemstatus und Aufgaben"],
  [".project-media--bot", "assets/projects/bot/cover.webp", "Technische Vorschau eines Bot-Projekts für Automatisierung und Logik"],
  [".project-media--last-letter", "assets/projects/last-letter-club/cover.webp", "Atmosphärische Spielszene von Last Letter Club mit virtuellem Wortspiel-Tisch"],
  [".project-media--bubble", "assets/projects/bubble-pop/cover.webp", "Bunte Bubble-Pop-Spielwelt mit großen Bubbles und Upgrades"],
  [".project-media--assistant", "assets/projects/ausbildungs-assistent/cover.webp", "Moderne KI-Assistenz-App zur Unterstützung bei der Ausbildungsplatzsuche"],
  [".project-media--java", "assets/projects/java/cover.webp", "Java-Konsolenanwendung einer Lagerverwaltung als Lernprojekt"],
  [".project-media--portfolio", "assets/projects/portfolio/cover.webp", "Dark-Theme-Ansicht einer persönlichen Developer-Portfolio-Website"]
];

projectImages.forEach(([selector, src, alt]) => {
  const media = document.querySelector(selector);
  if (!media) return;
  const image = document.createElement("img");
  image.className = "project-media__image";
  image.src = src;
  image.alt = alt;
  image.loading = "lazy";
  image.decoding = "async";
  image.addEventListener("error", () => image.remove());
  media.prepend(image);
});

const projectFilterButtons = Array.from(document.querySelectorAll(".project-filter__button"));
const projectCards = Array.from(document.querySelectorAll(".project-hub__card"));

projectFilterButtons.forEach((button) => {
  button.addEventListener("click", () => {
    const filter = button.dataset.filter;

    projectFilterButtons.forEach((item) => {
      const isActive = item === button;
      item.classList.toggle("is-active", isActive);
      item.setAttribute("aria-pressed", String(isActive));
    });

    projectCards.forEach((card) => {
      const categories = (card.dataset.category || "").split(" ");
      card.hidden = filter !== "all" && !categories.includes(filter);
    });
  });
});

// Smooth navigation
document.querySelectorAll('a[href^="#"]').forEach((link) => {
  link.addEventListener("click", (event) => {
    const targetId = link.getAttribute("href");
    if (!targetId || targetId === "#") return;
    const target = document.querySelector(targetId);
    if (!target) return;
    event.preventDefault();
    target.scrollIntoView({
      behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches ? "auto" : "smooth",
      block: "start"
    });
    if (history.pushState) history.pushState(null, "", targetId);
  });
});

// Scroll spy
const navigationLinks = Array.from(document.querySelectorAll('.side-nav a[href^="#"], .mobile-menu a[href^="#"]'));
const navigationTargets = new Set(navigationLinks.map((link) => link.getAttribute("href")));
const observedSections = Array.from(document.querySelectorAll("main section[id]")).filter((section) => navigationTargets.has(`#${section.id}`));

function setActiveNavigation(id) {
  navigationLinks.forEach((link) => {
    const active = link.getAttribute("href") === `#${id}`;
    link.classList.toggle("active", active);
    if (active) link.setAttribute("aria-current", "location");
    else link.removeAttribute("aria-current");
  });
}

if ("IntersectionObserver" in window && observedSections.length) {
  const sectionVisibility = new Map();
  const spyObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => sectionVisibility.set(entry.target.id, entry.intersectionRatio));
    const mostVisible = [...sectionVisibility.entries()].sort((a, b) => b[1] - a[1])[0];
    if (mostVisible && mostVisible[1] > 0) setActiveNavigation(mostVisible[0]);
  }, {
    rootMargin: "-20% 0px -58% 0px",
    threshold: [0, .05, .15, .3, .5, .75]
  });
  observedSections.forEach((section) => spyObserver.observe(section));
}

// Scroll animations
const revealItems = document.querySelectorAll(".reveal");
const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

if (reduceMotion || !("IntersectionObserver" in window)) {
  revealItems.forEach((item) => item.classList.add("is-visible"));
} else {
  const revealObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      entry.target.classList.add("is-visible");
      observer.unobserve(entry.target);
    });
  }, { rootMargin: "0px 0px -8%", threshold: .08 });

  revealItems.forEach((item, index) => {
    item.style.transitionDelay = `${Math.min(index % 4, 3) * 45}ms`;
    revealObserver.observe(item);
  });
}

// Current year
const yearElement = document.querySelector("#current-year");
if (yearElement) yearElement.textContent = String(new Date().getFullYear());
