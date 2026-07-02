const loader = document.querySelector(".loader");
const page = document.querySelector(".page-transition");
const revealElements = document.querySelectorAll(".reveal");
const navLinks = document.querySelectorAll(".nav a");
const currentPage = window.location.pathname.split("/").pop() || "index.html";

window.addEventListener("load", () => {
  if (loader) {
    loader.classList.add("hidden");
  }
});

navLinks.forEach((link) => {
  const href = link.getAttribute("href");

  if (href === currentPage) {
    link.classList.add("active");
  }

  link.addEventListener("click", (event) => {
    const target = link.getAttribute("href");

    if (!target || target.startsWith("#") || target.startsWith("mailto:")) {
      return;
    }

    event.preventDefault();
    if (page) {
      page.classList.add("leaving");
    }

    setTimeout(() => {
      window.location.href = target;
    }, 220);
  });
});

const revealOnScroll = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add("visible");
      revealOnScroll.unobserve(entry.target);
    }
  });
}, {
  threshold: 0.16
});

revealElements.forEach((element) => {
  revealOnScroll.observe(element);
});
