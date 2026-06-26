"use strict";

const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

/* ── Preloader ── */
window.addEventListener("load", () => {
  const loader = document.getElementById("site-preloader");
  if (loader) {
    loader.classList.add("preloader--hide");
    document.body.classList.remove("preloader-active");
    loader.addEventListener("transitionend", () => loader.remove(), {
      once: true,
    });
  }
});

/* ── Nav pill: mobile toggle ── */
const pill = document.getElementById("pill");
const menuBtn = document.getElementById("menuBtn");
if (menuBtn && pill) {
  menuBtn.addEventListener("click", () => {
    const open = pill.classList.toggle("open");
    menuBtn.setAttribute("aria-expanded", open ? "true" : "false");
  });
}
const navLinks = Array.from(document.querySelectorAll(".nav-links a"));
navLinks.forEach((a) =>
  a.addEventListener("click", () => {
    if (pill) pill.classList.remove("open");
    if (menuBtn) menuBtn.setAttribute("aria-expanded", "false");
  }),
);
document.addEventListener("keydown", (e) => {
  if (e.key === "Escape" && pill) pill.classList.remove("open");
});
document.addEventListener("click", (e) => {
  if (pill && pill.classList.contains("open") && !pill.contains(e.target))
    pill.classList.remove("open");
});
window.addEventListener("resize", () => {
  if (window.innerWidth > 820 && pill) pill.classList.remove("open");
});

/* ── Sliding indicator scrollspy ──
   The glowing pill starts on the brand logo (hero)
   and slides to the matching nav link as sections scroll in.
── */
const indicator = document.getElementById("navIndicator");
const brand = document.querySelector(".brand");

function moveIndicator(target) {
  if (!indicator || !target || !pill) return;
  const pillRect = pill.getBoundingClientRect();
  const targetRect = target.getBoundingClientRect();
  indicator.style.left = targetRect.left - pillRect.left + "px";
  indicator.style.width = targetRect.width + "px";
  if (!indicator.classList.contains("is-ready")) {
    // first call: snap instantly, then enable transitions
    indicator.style.transition = "none";
    requestAnimationFrame(() => {
      indicator.classList.add("is-ready");
      indicator.style.transition = "";
    });
  }
}

const heroSection = document.querySelector("#hero");
const linkSections = navLinks
  .map((a) => document.querySelector(a.getAttribute("href")))
  .filter(Boolean);

const allSections = [heroSection, ...linkSections].filter(Boolean);
const allTargets = [brand, ...navLinks];

function updateActiveSection() {
  // Find the last section whose top is above 40% of the viewport height
  const threshold = window.scrollY + window.innerHeight * 0.4;
  let activeIdx = 0;
  allSections.forEach((section, i) => {
    if (section.offsetTop <= threshold) activeIdx = i;
  });

  moveIndicator(allTargets[activeIdx]);

  navLinks.forEach((l) => l.classList.remove("active"));
  if (activeIdx > 0) navLinks[activeIdx - 1].classList.add("active");
}

// Run on scroll (already throttled with rAF via onScroll, but spy needs its own)
window.addEventListener("scroll", updateActiveSection, { passive: true });

// Initialise after layout is ready
window.addEventListener("load", () => {
  requestAnimationFrame(updateActiveSection);
});

// Recalculate on resize (positions may shift)
window.addEventListener("resize", () => {
  requestAnimationFrame(updateActiveSection);
});

/* ── Reveal on scroll ── */
const animated = document.querySelectorAll("[data-animate]");
if (animated.length) {
  const rev = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("in");
          rev.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.15 },
  );
  animated.forEach((el) => rev.observe(el));
}

/* ── Scroll: condense nav + rotate background disc ── */
const disc = document.querySelector(".bg-disc");
let ticking = false;
function onScroll() {
  if (pill) {
    if (window.scrollY > 40) pill.classList.add("scrolled");
    else pill.classList.remove("scrolled");
  }
  if (reduce || !disc) return;
  if (!ticking) {
    requestAnimationFrame(() => {
      const max = document.documentElement.scrollHeight - window.innerHeight;
      const p = max > 0 ? window.scrollY / max : 0;
      disc.style.setProperty("--r", (p * 22).toFixed(2) + "deg");
      disc.style.setProperty("--py", (p * -40).toFixed(1) + "px");
      disc.style.setProperty("--sc", (1 + p * 0.06).toFixed(3));
      ticking = false;
    });
    ticking = true;
  }
}
window.addEventListener("scroll", onScroll, { passive: true });
onScroll();

/* ── Reduced motion: freeze logo video ── */
if (reduce) {
  const v = document.querySelector(".hero-logo-video");
  if (v) {
    v.removeAttribute("autoplay");
    v.addEventListener("loadedmetadata", () => {
      try {
        v.pause();
        v.currentTime = v.duration;
      } catch (err) {}
    });
  }
}

/* ── Contact form → Netlify ── */
const form = document.querySelector(".contact-form");
if (form) {
  const statusEl = form.querySelector(".form-status");
  const encode = (data) =>
    Object.keys(data)
      .map((k) => encodeURIComponent(k) + "=" + encodeURIComponent(data[k]))
      .join("&");
  form.addEventListener("submit", (e) => {
    e.preventDefault();
    if (statusEl) {
      statusEl.textContent = "در حال ارسال...";
      statusEl.classList.add("is-visible");
    }
    const data = {
      "form-name": "contact",
      name: form.elements["name"].value,
      email: form.elements["email"].value,
      message: form.elements["message"].value,
      "bot-field": form.elements["bot-field"]
        ? form.elements["bot-field"].value
        : "",
    };
    fetch("/", {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: encode(data),
    })
      .then(() => {
        if (statusEl) statusEl.textContent = "پیام شما ارسال شد. ممنون!";
        form.reset();
        window.setTimeout(() => {
          if (statusEl) statusEl.classList.remove("is-visible");
        }, 3500);
      })
      .catch(() => {
        if (statusEl) statusEl.textContent = "خطا شد. دوباره تلاش کنید.";
      });
  });
}
