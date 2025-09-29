gsap.registerPlugin(ScrollTrigger, ScrollToPlugin);

const heroSwiper = new Swiper(".hero__slider.swiper", {
  loop: true,
  effect: "fade",
  fadeEffect: {
    crossFade: true,
  },
  allowTouchMove: false,
  speed: 1000,
  autoplay: {
    delay: 5000,
    disableOnInteraction: false,
  },
  pagination: {
    el: ".swiper-pagination",
    clickable: true,
    renderBullet: function (index, className) {
      let num = index + 1;
      if (num < 10) num = "0" + num;
      return `
      <span class="${className}">
        ${num}
        <span class="bullet-bar">
          <span class="bullet-bar__fill"></span>
        </span>
      </span>
    `;
    },
  },
});
let bulletAnim;

function animateBullet() {
  document.querySelectorAll(".bullet-bar__fill").forEach((fill) => {
    gsap.set(fill, { width: 0 });
  });

  const activeFill = document.querySelector(
    ".swiper-pagination-bullet-active .bullet-bar__fill"
  );
  if (activeFill) {
    bulletAnim = gsap.to(activeFill, {
      width: "100%",
      duration: heroSwiper.params.autoplay.delay / 1000,
      ease: "linear",
    });
  }
}

animateBullet();

heroSwiper.on("slideChange", () => {
  animateBullet();
});

const toggleButton = document.getElementById("toggle");
let isPlaying = true;

toggleButton.addEventListener("click", () => {
  if (isPlaying) {
    heroSwiper.autoplay.pause();
    bulletAnim?.pause();
    toggleButton.classList.remove("btn__pause");
    toggleButton.classList.add("btn__play");
    isPlaying = false;
  } else {
    heroSwiper.autoplay.start();
    bulletAnim?.play();
    toggleButton.classList.remove("btn__play");
    toggleButton.classList.add("btn__pause");
    isPlaying = true;
  }
});

const partnerLogosSwiper = new Swiper(".partner-logos__slider.swiper", {
  loop: true,
  loopedSlides: 20,
  speed: 6000,
  slidesPerView: "auto",
  autoplay: {
    delay: 0,
    disableOnInteraction: false,
  },
  spaceBetween: 60,
  allowTouchMove: false,
});

const solutionSwiper = new Swiper(".solution__slider.swiper", {
  navigation: {
    nextEl: ".solution__slider-btn--next",
    prevEl: ".solution__slider-btn--prev",
  },
  speed: 200,
  loop: false,
  slidesPerView: "auto",
  slidesPerGroup: 1,
  allowTouchMove: true,
  spaceBetween: 16,
  breakpoints: {
    979: {
      slidesPerView: "auto",
      spaceBetween: 30,
    },
  },
});

const partnerSwiper = new Swiper(".partner__slider.swiper", {
  navigation: {
    nextEl: ".partner__slider-btn--next",
    prevEl: ".partner__slider-btn--prev",
  },
  speed: 200,
  loop: false,
  slidesPerView: "3",
  slidesPerGroup: 1,
  allowTouchMove: true,
  spaceBetween: 16,
  breakpoints: {
    979: {
      slidesPerView: "auto",
      spaceBetween: 30,
    },
  },
});

ScrollTrigger.create({
  trigger: ".solution",
  start: "top 80%",
  end: "bottom 80%",
  onEnter: () => {
    gsap.to(".sections-wrapper", {
      backgroundColor: "#171719",
      duration: 0.8,
      ease: "power1.inOut",
    });
  },
  onLeave: () => {},
  onEnterBack: () => {},
  onLeaveBack: () => {
    gsap.to(".sections-wrapper", {
      backgroundColor: "#fff",
      duration: 0.8,
      ease: "power1.inOut",
    });
  },
});

gsap.registerPlugin(ScrollTrigger);

let mm = gsap.matchMedia();
const counters = document.querySelectorAll(".partner__counter");

function setupCounters(numberHeight) {
  counters.forEach((counter, i) => {
    const tape = counter.querySelector(".partner__counter-tape");
    const totalNumbers = tape.children.length;
    const y = -numberHeight * (totalNumbers - 1);

    ScrollTrigger.create({
      trigger: counter.closest(".partner__stats-wrapper"),
      start: "top 80%",
      onEnter: () => {
        gsap.to(tape, {
          y: y,
          duration: 2,
          delay: i * 0.2,
          ease: "power2.out",
        });
      },
    });
  });
}

// 데스크탑
mm.add("(min-width: 979px)", () => {
  setupCounters(95);

  return () => {
    ScrollTrigger.getAll().forEach((st) => st.kill());
  };
});

// 모바일
mm.add("(max-width: 978px)", () => {
  setupCounters(46);

  return () => {
    ScrollTrigger.getAll().forEach((st) => st.kill());
  };
});

const btnHelp = document.querySelector(".btn_help");
const btnTop = document.querySelector(".btn_top");

ScrollTrigger.create({
  trigger: ".get-started",
  start: "bottom bottom",
  end: "bottom bottom",
  onEnter: () => {
    btnHelp.classList.add("hidden");
    btnTop.classList.remove("hidden");
  },
  onLeaveBack: () => {
    btnHelp.classList.remove("hidden");
    btnTop.classList.add("hidden");
  },
});

btnTop.addEventListener("click", () => {
  gsap.to(window, {
    scrollTo: 0,
    duration: 1,
    ease: "power2.out",
    onUpdate: ScrollTrigger.refresh,
  });
});

document.addEventListener("DOMContentLoaded", () => {
  const hamburger = document.querySelector(".header__hamburger");
  const headerMenu = document.querySelector(".header__drawer");
  const closeMenu = document.querySelector(".header__drawer-close");

  hamburger.addEventListener("click", () => {
    headerMenu.classList.toggle("active");
  });
  closeMenu.addEventListener("click", () => {
    headerMenu.classList.remove("active");
  });
});
