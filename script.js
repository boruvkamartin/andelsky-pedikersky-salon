const header = document.querySelector("[data-header]");
const menuButton = document.querySelector(".menu-toggle");
const navigation = document.querySelector(".nav");
const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

document.querySelector("[data-year]").textContent = new Date().getFullYear();

const updateHeader = () => {
  header.classList.toggle("is-scrolled", window.scrollY > 12);
};

const closeMenu = () => {
  menuButton.setAttribute("aria-expanded", "false");
  navigation.classList.remove("is-open");
  document.body.classList.remove("menu-open");
};

menuButton.addEventListener("click", () => {
  const willOpen = menuButton.getAttribute("aria-expanded") !== "true";
  menuButton.setAttribute("aria-expanded", String(willOpen));
  navigation.classList.toggle("is-open", willOpen);
  document.body.classList.toggle("menu-open", willOpen);
});

navigation.querySelectorAll("a").forEach((link) => {
  link.addEventListener("click", closeMenu);
});

window.addEventListener("resize", () => {
  if (window.innerWidth > 980) closeMenu();
});

window.addEventListener("scroll", updateHeader, { passive: true });
updateHeader();

const revealItems = document.querySelectorAll(".reveal");

if (reduceMotion || !("IntersectionObserver" in window)) {
  revealItems.forEach((item) => item.classList.add("is-visible"));
} else {
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        entry.target.classList.add("is-visible");
        observer.unobserve(entry.target);
      });
    },
    { threshold: 0.12, rootMargin: "0px 0px -40px" },
  );

  revealItems.forEach((item) => observer.observe(item));
}
