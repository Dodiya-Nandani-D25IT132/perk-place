// js/slider.js
document.addEventListener("DOMContentLoaded", function () {
  // ----- CONFIG -----
  const images = [
    "img/about-bg2.jpg",
    "img/img6.jpg",
    "img/imggg5.jpg",
    "img/img3.jpg",
    "img/home5.jpg"
  ];
  const AUTO_DELAY = 5000; // ms

  // ----- ELEMENTS -----
  const hero = document.querySelector(".hero");
  const prevBtn = document.querySelector(".slider-btn.prev");
  const nextBtn = document.querySelector(".slider-btn.next");

  // create dots container
  const dotsContainer = document.createElement("div");
  dotsContainer.className = "slider-dots";
  hero.appendChild(dotsContainer);

  // preload images
  images.forEach(src => {
    const img = new Image();
    img.src = src;
  });

  // state
  let current = 0;
  let intervalId = null;
  const dots = [];

  // ---- create dots dynamically ----
  images.forEach((_, idx) => {
    const dot = document.createElement("button");
    dot.type = "button";
    dot.setAttribute("aria-label", `Go to slide ${idx + 1}`);
    dot.dataset.index = idx;
    dot.addEventListener("click", (e) => {
      goTo(idx);
      resetAutoplay();
    });
    dotsContainer.appendChild(dot);
    dots.push(dot);
  });

  function updateUI() {
    // update background
    hero.style.backgroundImage = `url("${images[current]}")`;

    // active dot
    dots.forEach((d, i) => {
      if (i === current) {
        d.classList.add("active");
        d.setAttribute("aria-current", "true");
      } else {
        d.classList.remove("active");
        d.removeAttribute("aria-current");
      }
    });
  }

  function prev() {
    current = (current - 1 + images.length) % images.length;
    updateUI();
  }
  function next() {
    current = (current + 1) % images.length;
    updateUI();
  }
  function goTo(i) {
    current = (i + images.length) % images.length;
    updateUI();
  }

  function startAutoplay() {
    if (intervalId) clearInterval(intervalId);
    intervalId = setInterval(() => {
      next();
    }, AUTO_DELAY);
  }
  function stopAutoplay() {
    if (intervalId) {
      clearInterval(intervalId);
      intervalId = null;
    }
  }
  function resetAutoplay() {
    stopAutoplay();
    startAutoplay();
  }

  // tie buttons
  if (prevBtn) {
    prevBtn.addEventListener("click", function (e) {
      e.preventDefault();
      prev();
      resetAutoplay();
    });
  }
  if (nextBtn) {
    nextBtn.addEventListener("click", function (e) {
      e.preventDefault();
      next();
      resetAutoplay();
    });
  }

  // keyboard left/right support
  document.addEventListener("keydown", (e) => {
    if (e.key === "ArrowLeft") {
      prev();
      resetAutoplay();
    } else if (e.key === "ArrowRight") {
      next();
      resetAutoplay();
    }
  });

  // init
  updateUI();
  startAutoplay();
});
