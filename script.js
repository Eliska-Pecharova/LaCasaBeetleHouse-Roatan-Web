/* LANGUAGE-SWITCH */
// Detect user's browser language
const userLang = navigator.language || navigator.userLanguage;

// If language starts with "en", redirect to English version
if (userLang.startsWith("en")) {
  window.location.href = "index-en.html";
}

// Highlight active language link in the switcher
const langLinks = document.querySelectorAll(".language-switch a");
langLinks.forEach((link) => {
  if (window.location.href.includes(link.getAttribute("href"))) {
    link.classList.add("active");
  }
});

/* NAVIGATION TOGGLE AND SECTION SCROLL */
// Toggle mobile navigation menu
const menuIcon = document.getElementById("menu-icon");
const navList = document.getElementById("nav-list");

menuIcon.addEventListener("click", () => {
  navList.classList.toggle("active");
});

// Smooth scroll down when hovering over scroll indicator
const scrollIndicator = document.querySelector(".scroll-indicator");

scrollIndicator.addEventListener("mouseenter", () => {
  let currentScroll = window.scrollY;
  const targetScroll = window.innerHeight;
  const step = 20;

  const interval = setInterval(() => {
    currentScroll += step;
    window.scrollTo(0, currentScroll);

    if (currentScroll >= targetScroll) {
      clearInterval(interval);
    }
  }, 10);
});

/* ABOUT SECTION GALLERY */
const images = [
  "images/house.jpg",
  "images/terase.jpg",
  "images/bedroom1.jpg",
  "images/bed1view.jpg",
  "images/kitchen1.jpg",
  "images/kitchen2.jpg",
  "images/kitchen3.jpg",
  "images/bathroom.jpg",
  "images/bedroom2.jpg",
  "images/bed2view.jpg",
  "images/bed2viewout.jpg",
  "images/pool.jpg",
  "images/garden1.jpg",
  "images/garden2.jpg",
  "images/auto.jpg",
];

const galleryContainer = document.querySelector(".gallery-scroll");
const visibleCount = 5;
let galleryIndex = 0;

const lightbox = document.getElementById("lightbox");
const lightboxImg = document.getElementById("lightbox-img");
let lightboxIndex = 0;

if (galleryContainer && lightbox && lightboxImg) {
  // Render visible images in gallery
  function renderGallery() {
    galleryContainer.innerHTML = "";
    const start = galleryIndex;
    const end = Math.min(galleryIndex + visibleCount, images.length);

    for (let i = start; i < end; i++) {
      const img = document.createElement("img");
      img.src = images[i];
      img.alt = `Foto ${i + 1}`;
      img.className =
        "w-full h-auto object-cover rounded-lg shadow-md cursor-pointer transition duration-300 transform hover:scale-[1.02]";
      img.onclick = () => openLightbox(i);
      galleryContainer.appendChild(img);
    }
  }

  // Scroll gallery left/right
  function scrollGallery(direction) {
    const maxIndex = images.length - visibleCount;

    if (direction === 1 && galleryIndex < maxIndex) {
      galleryIndex = Math.min(maxIndex, galleryIndex + visibleCount);
    } else if (direction === -1 && galleryIndex > 0) {
      galleryIndex = Math.max(0, galleryIndex - visibleCount);
    } else if (direction === -1 && galleryIndex === 0) {
      galleryIndex = maxIndex;
    } else if (direction === 1 && galleryIndex >= maxIndex) {
      galleryIndex = 0;
    }

    renderGallery();
  }

  // Open lightbox with selected image
  function openLightbox(index) {
    lightboxIndex = index;
    lightboxImg.src = images[lightboxIndex];
    lightbox.style.display = "flex";
  }

  // Close lightbox
  function closeLightbox() {
    lightbox.style.display = "none";
  }

  // Navigate lightbox left/right
  function navigateLightbox(direction) {
    lightboxIndex = (lightboxIndex + direction + images.length) % images.length;
    lightboxImg.src = images[lightboxIndex];
  }

  // Initial gallery render
  renderGallery();

  // Expose gallery functions globally for HTML buttons
  window.scrollGallery = scrollGallery;
  window.closeLightbox = closeLightbox;
  window.navigateLightbox = navigateLightbox;
}

/* ARROW UP BUTTON */
// Show "arrow up" button when user scrolls down
const arrowUp = document.getElementById("arrowUp");

window.addEventListener("scroll", () => {
  if (window.scrollY > 600) {
    arrowUp.classList.add("show");
  } else {
    arrowUp.classList.remove("show");
  }
});
