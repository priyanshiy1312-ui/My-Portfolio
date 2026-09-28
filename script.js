/* ================= PARTICLE / CONSTELLATION BACKGROUND ================= */
const canvas = document.getElementById("bg-canvas");
const ctx = canvas.getContext("2d");
let particles = [];

function resizeCanvas() {
  canvas.width = window.innerWidth;
  canvas.height = document.body.scrollHeight;
}
resizeCanvas();
window.addEventListener("resize", resizeCanvas);

function createParticles() {
  particles = [];
  const count = Math.floor((canvas.width * canvas.height) / 22000);
  for (let i = 0; i < count; i++) {
    particles.push({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      vx: (Math.random() - 0.5) * 0.25,
      vy: (Math.random() - 0.5) * 0.25,
      r: Math.random() * 1.5 + 0.5,
      color: Math.random() > 0.85 ? "#a855f7" : "#38bdf8",
    });
  }
}
createParticles();
window.addEventListener("resize", createParticles);

function animateParticles() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  for (let p of particles) {
    p.x += p.vx;
    p.y += p.vy;

    if (p.x < 0 || p.x > canvas.width) p.vx *= -1;
    if (p.y < 0 || p.y > canvas.height) p.vy *= -1;

    ctx.beginPath();
    ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
    ctx.fillStyle = p.color;
    ctx.fill();
  }

  const maxDist = 140;
  for (let i = 0; i < particles.length; i++) {
    for (let j = i + 1; j < particles.length; j++) {
      const a = particles[i];
      const b = particles[j];
      const dx = a.x - b.x;
      const dy = a.y - b.y;
      const dist = Math.sqrt(dx * dx + dy * dy);
      if (dist < maxDist) {
        ctx.beginPath();
        ctx.moveTo(a.x, a.y);
        ctx.lineTo(b.x, b.y);
        ctx.strokeStyle = `rgba(56, 189, 248, ${1 - dist / maxDist})`;
        ctx.lineWidth = 0.4;
        ctx.stroke();
      }
    }
  }

  requestAnimationFrame(animateParticles);
}
animateParticles();

/* ================= CURSOR GLOW ================= */
const glow = document.createElement("div");
glow.classList.add("cursor-glow");
document.body.appendChild(glow);

window.addEventListener("mousemove", (e) => {
  glow.style.left = e.clientX + "px";
  glow.style.top = e.clientY + "px";
});

/* ================= SCROLL REVEAL ================= */
const reveals = document.querySelectorAll(
  ".hero-content, .about-card, .stat-card, .skill-card, .project-card, .contact-card"
);

const revealObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("show");
      }
    });
  },
  { threshold: 0.15 }
);

reveals.forEach((item) => {
  item.classList.add("hidden");
  revealObserver.observe(item);
});

/* ================= SKILL BAR ANIMATION ================= */
const skillBars = document.querySelectorAll(".skill-bar");

const skillObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const bar = entry.target;
        bar.style.width = bar.getAttribute("data-width") + "%";
      }
    });
  },
  { threshold: 0.4 }
);

skillBars.forEach((bar) => skillObserver.observe(bar));

/* ================= NAV ACTIVE LINK ON SCROLL ================= */
const sections = document.querySelectorAll("section");
const navLinks = document.querySelectorAll("#nav-links a");

window.addEventListener("scroll", () => {
  let current = "";

  sections.forEach((section) => {
    const sectionTop = section.offsetTop - 150;
    if (window.pageYOffset >= sectionTop) {
      current = section.getAttribute("id");
    }
  });

  navLinks.forEach((link) => {
    link.classList.remove("active");
    if (link.getAttribute("href") === `#${current}`) {
      link.classList.add("active");
    }
  });
});

/* ================= NAVBAR SHRINK ON SCROLL ================= */
const navbar = document.getElementById("navbar");

window.addEventListener("scroll", () => {
  if (window.scrollY > 50) {
    navbar.classList.add("nav-scrolled");
  } else {
    navbar.classList.remove("nav-scrolled");
  }
});

/* ================= 3D TILT ON PROJECT CARDS ================= */
const cards = document.querySelectorAll(".project-card, .skill-card, .stat-card, .about-card");

cards.forEach((card) => {
  card.addEventListener("mousemove", (e) => {
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const rotateX = -(y - rect.height / 2) / 22;
    const rotateY = (x - rect.width / 2) / 22;

    card.style.transform = `
      perspective(1000px)
      rotateX(${rotateX}deg)
      rotateY(${rotateY}deg)
      translateY(-8px)
    `;
  });

  card.addEventListener("mouseleave", () => {
    card.style.transform = "perspective(1000px) rotateX(0) rotateY(0) translateY(0)";
  });
});

/* ================= SMOOTH SCROLL ================= */
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", function (e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute("href"));
    if (target) {
      target.scrollIntoView({ behavior: "smooth" });
    }
  });
});