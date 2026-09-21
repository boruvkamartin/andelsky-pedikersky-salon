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

const certificateDialog = document.querySelector("[data-certificate-dialog]");
const certificateImage = document.querySelector("[data-certificate-image]");
const certificateTitle = document.querySelector("[data-certificate-dialog-title]");
const certificateClose = document.querySelector("[data-certificate-close]");

if (certificateDialog && certificateImage && certificateTitle && certificateClose) {
  document.querySelectorAll("[data-certificate-open]").forEach((card) => {
    card.addEventListener("click", () => {
      const previewImage = card.querySelector("img");
      if (!previewImage) return;

      certificateImage.src = previewImage.currentSrc || previewImage.src;
      certificateImage.alt = previewImage.alt;
      certificateTitle.textContent = card.dataset.certificateTitle || previewImage.alt;
      document.body.classList.add("certificate-open");
      certificateDialog.showModal();
    });
  });

  certificateClose.addEventListener("click", () => certificateDialog.close());

  certificateDialog.addEventListener("click", (event) => {
    if (event.target === certificateDialog) certificateDialog.close();
  });

  certificateDialog.addEventListener("close", () => {
    document.body.classList.remove("certificate-open");
    certificateImage.removeAttribute("src");
    certificateImage.alt = "";
  });
}

const galleryDialog = document.querySelector("[data-gallery-dialog]");
const galleryImage = document.querySelector("[data-gallery-image]");
const galleryTitle = document.querySelector("[data-gallery-dialog-title]");
const galleryClose = document.querySelector("[data-gallery-close]");

if (galleryDialog && galleryImage && galleryTitle && galleryClose) {
  document.querySelectorAll("[data-gallery-open]").forEach((item) => {
    item.addEventListener("click", () => {
      const previewImage = item.querySelector("img");
      if (!previewImage) return;

      galleryImage.src = previewImage.currentSrc || previewImage.src;
      galleryImage.alt = previewImage.alt;
      galleryTitle.textContent = item.dataset.galleryTitle || previewImage.alt;
      document.body.classList.add("certificate-open");
      galleryDialog.showModal();
    });
  });

  galleryClose.addEventListener("click", () => galleryDialog.close());

  galleryDialog.addEventListener("click", (event) => {
    if (event.target === galleryDialog) galleryDialog.close();
  });

  galleryDialog.addEventListener("close", () => {
    document.body.classList.remove("certificate-open");
    galleryImage.removeAttribute("src");
    galleryImage.alt = "";
  });
}
