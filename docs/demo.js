const root = document.documentElement;
const toggle = document.querySelector("#theme-toggle");
const toggleLabel = toggle?.querySelector(".toggle-label");
const storedTheme = localStorage.getItem("medvision-demo-theme");

function applyTheme(theme) {
  root.dataset.theme = theme;
  localStorage.setItem("medvision-demo-theme", theme);
  if (toggle) {
    const isDark = theme === "dark";
    toggle.setAttribute("aria-pressed", String(isDark));
    toggle.setAttribute("aria-label", `Switch to ${isDark ? "light" : "dark"} mode`);
  }
  if (toggleLabel) toggleLabel.textContent = theme === "dark" ? "Dark" : "Light";
}

applyTheme(storedTheme || "dark");
toggle?.addEventListener("click", () => applyTheme(root.dataset.theme === "dark" ? "light" : "dark"));

const reveals = document.querySelectorAll(".reveal");
const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add("is-visible");
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.16 });
reveals.forEach((element) => revealObserver.observe(element));

const canvas = document.querySelector("#particle-field");
const ctx = canvas?.getContext("2d");
const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
let particles = [];
let width = 0;
let height = 0;
let animationFrame = 0;

function resizeCanvas() {
  if (!canvas || !ctx) return;
  const pixelRatio = Math.min(window.devicePixelRatio || 1, 2);
  width = window.innerWidth;
  height = window.innerHeight;
  canvas.width = Math.floor(width * pixelRatio);
  canvas.height = Math.floor(height * pixelRatio);
  canvas.style.width = `${width}px`;
  canvas.style.height = `${height}px`;
  ctx.setTransform(pixelRatio, 0, 0, pixelRatio, 0, 0);
  const count = Math.min(150, Math.max(70, Math.floor(width / 9)));
  particles = Array.from({ length: count }, (_, index) => ({
    x: Math.random() * width,
    y: Math.random() * height,
    radius: Math.random() * 1.7 + 0.35,
    velocity: Math.random() * 0.28 + 0.08,
    alpha: Math.random() * 0.52 + 0.18,
    hue: index % 4 === 0 ? 176 : 199
  }));
}

function drawParticles() {
  if (!ctx) return;
  ctx.clearRect(0, 0, width, height);
  const isLight = root.dataset.theme === "light";
  particles.forEach((particle) => {
    particle.y -= particle.velocity;
    particle.x += Math.sin((particle.y + particle.radius) * 0.008) * 0.12;
    if (particle.y < -8) {
      particle.y = height + 8;
      particle.x = Math.random() * width;
    }
    ctx.beginPath();
    ctx.arc(particle.x, particle.y, particle.radius, 0, Math.PI * 2);
    ctx.fillStyle = isLight
      ? `rgba(3, 105, 161, ${particle.alpha * 0.55})`
      : `hsla(${particle.hue}, 95%, 72%, ${particle.alpha})`;
    ctx.fill();
  });

  for (let i = 0; i < particles.length; i += 1) {
    for (let j = i + 1; j < particles.length; j += 1) {
      const a = particles[i];
      const b = particles[j];
      const dx = a.x - b.x;
      const dy = a.y - b.y;
      const distance = Math.hypot(dx, dy);
      if (distance < 92) {
        ctx.beginPath();
        ctx.moveTo(a.x, a.y);
        ctx.lineTo(b.x, b.y);
        const alpha = (1 - distance / 92) * (isLight ? 0.08 : 0.14);
        ctx.strokeStyle = isLight ? `rgba(3, 105, 161, ${alpha})` : `rgba(111, 255, 233, ${alpha})`;
        ctx.lineWidth = 1;
        ctx.stroke();
      }
    }
  }

  if (!reducedMotion) animationFrame = requestAnimationFrame(drawParticles);
}

if (canvas && ctx) {
  resizeCanvas();
  drawParticles();
  window.addEventListener("resize", () => {
    cancelAnimationFrame(animationFrame);
    resizeCanvas();
    drawParticles();
  }, { passive: true });
}
