"use strict";

const mobileNavButton = document.querySelector(".header-mobile-nav");
const navList = document.querySelector(".horizontal-list");
const primaryNav = document.getElementById("primary-navigation"); // عنصر والد منو

if (mobileNavButton && navList && primaryNav) {
  const toggleMenu = (open) => {
    // باز/بسته کردن کلاس is-open روی ul
    navList.classList.toggle("is-open", open);
    // باز/بسته کردن کلاس is-active روی دکمه همبرگری
    mobileNavButton.classList.toggle("is-active", open);
    // تنظیم وضعیت aria-expanded برای دسترس‌پذیری
    mobileNavButton.setAttribute("aria-expanded", open ? "true" : "false");

    if (open) {
      // تمرکز روی اولین لینک هنگام باز شدن برای دسترس‌پذیری
      const firstLink = navList.querySelector("a");
      if (firstLink) firstLink.focus();
    }
  };

  // 1. منطق اصلی باز و بسته شدن منو با کلیک روی همبرگری
  mobileNavButton.addEventListener("click", (e) => {
    e.preventDefault();
    // اگر منو باز باشد، آن را ببند؛ اگر بسته باشد، آن را باز کن
    toggleMenu(!navList.classList.contains("is-open"));
  });

  // 2. بستن منو با کلیک روی لینک (فقط در موبایل)
  const navLinks = navList.querySelectorAll("a");
  navLinks.forEach((link) => {
    link.addEventListener("click", () => {
      if (window.innerWidth <= 767) {
        toggleMenu(false);
      }
    });
  });

  // 3. بستن منو با کلید Esc (فقط وقتی منو باز است)
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && navList.classList.contains("is-open")) {
      toggleMenu(false);
    }
  });

  // 4. بستن منو هنگام تغییر اندازه صفحه (از موبایل به دسکتاپ)
  window.addEventListener("resize", () => {
    if (window.innerWidth > 767) {
      toggleMenu(false);
    }
  });

  // 5. بستن منو با کلیک بیرون از منو (فقط در موبایل)
  document.addEventListener("click", (e) => {
    // اگر کلیک در داخل منو یا روی دکمه همبرگری نباشد
    const isClickInside =
      primaryNav.contains(e.target) || mobileNavButton.contains(e.target);
    if (
      !isClickInside &&
      navList.classList.contains("is-open") &&
      window.innerWidth <= 767
    ) {
      toggleMenu(false);
    }
  });
}
