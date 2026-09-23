const glow = document.querySelector(".cursor-glow");
const visual = document.querySelector(".visual-card");

window.addEventListener("pointermove", (e) => {
  glow.style.left = `${e.clientX}px`;
  glow.style.top = `${e.clientY}px`;

  if (window.innerWidth > 800 && visual) {
    const x = (e.clientX / window.innerWidth - 0.5) * 6;
    const y = (e.clientY / window.innerHeight - 0.5) * -6;
    visual.style.transform = `perspective(1000px) rotateY(${x}deg) rotateX(${y}deg)`;
  }
});

document.addEventListener("mouseleave", () => {
  if (visual) visual.style.transform = "";
});

const revealItems = document.querySelectorAll(".service-card, .work-card, .step");
const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.animate(
        [
          { opacity: 0, transform: "translateY(24px)" },
          { opacity: 1, transform: "translateY(0)" }
        ],
        { duration: 650, easing: "cubic-bezier(.2,.7,.2,1)", fill: "forwards" }
      );
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.12 });

revealItems.forEach((item) => observer.observe(item));

document.querySelector(".menu-btn")?.addEventListener("click", () => {
  document.querySelector(".nav-links")?.classList.toggle("open");
});
