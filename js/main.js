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

// Current project: Last Letter Club
const projectsGrid = document.querySelector("#projekte .projects-grid");
if (projectsGrid && !projectsGrid.querySelector('[data-project="last-letter-club"]')) {
  const gameCard = document.createElement("article");
  gameCard.className = "project-card reveal";
  gameCard.dataset.project = "last-letter-club";
  gameCard.innerHTML = `
    <div class="project-preview preview--code" aria-hidden="true"><span>3D</span><i></i><i></i><i></i></div>
    <div class="project-card__body">
      <span class="badge badge--active">In Entwicklung</span>
      <h3>Last Letter Club</h3>
      <p>Aktuell entwickle ich ein 3D-Partyspiel für PC, in dem Spieler durch eine Lobby laufen, sich an einen Tisch setzen und schnelle englische Wortketten spielen. Ich baue das Projekt Schritt für Schritt in Godot auf – von Kamera und Spielersteuerung über Rundenlogik und Wortprüfung bis zum später geplanten Multiplayer.</p>
      <ul class="tag-list"><li>Godot 4.7.2</li><li>GDScript</li><li>3D</li><li>Game Development</li><li>Prototyping</li></ul>
    </div>`;

  const firstProject = projectsGrid.querySelector(".project-card");
  if (firstProject) firstProject.insertAdjacentElement("afterend", gameCard);
  else projectsGrid.appendChild(gameCard);
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
