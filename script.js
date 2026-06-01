const relationshipStart = new Date("2026-04-21T00:00:00-03:00");

const counters = {
  days: document.getElementById("days"),
  hours: document.getElementById("hours"),
  minutes: document.getElementById("minutes"),
  seconds: document.getElementById("seconds"),
};

// Atualiza o contador em tempo real a partir da data de início do namoro.
function updateLoveCounter() {
  const now = new Date();
  const diff = Math.max(0, now - relationshipStart);
  const totalSeconds = Math.floor(diff / 1000);
  const days = Math.floor(totalSeconds / 86400);
  const hours = Math.floor((totalSeconds % 86400) / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);
  const seconds = totalSeconds % 60;

  counters.days.textContent = days.toLocaleString("pt-BR");
  counters.hours.textContent = String(hours).padStart(2, "0");
  counters.minutes.textContent = String(minutes).padStart(2, "0");
  counters.seconds.textContent = String(seconds).padStart(2, "0");
}

updateLoveCounter();
setInterval(updateLoveCounter, 1000);

// Cria corações e pontos de luz discretos no fundo sem poluir o HTML.
function createAmbientDetails() {
  const heartsLayer = document.getElementById("floating-hearts");
  const sparklesLayer = document.getElementById("sparkles");

  for (let index = 0; index < 24; index += 1) {
    const heart = document.createElement("span");
    heart.className = "heart";
    heart.textContent = "♡";
    heart.style.left = `${Math.random() * 100}%`;
    heart.style.setProperty("--size", `${18 + Math.random() * 30}px`);
    heart.style.setProperty("--duration", `${12 + Math.random() * 12}s`);
    heart.style.setProperty("--delay", `${Math.random() * -18}s`);
    heart.style.setProperty("--sway", `${-60 + Math.random() * 120}px`);
    heartsLayer.appendChild(heart);
  }

  for (let index = 0; index < 46; index += 1) {
    const sparkle = document.createElement("span");
    sparkle.className = "sparkle";
    sparkle.style.setProperty("--left", `${Math.random() * 100}%`);
    sparkle.style.setProperty("--top", `${Math.random() * 100}%`);
    sparkle.style.setProperty("--size", `${2 + Math.random() * 4}px`);
    sparkle.style.setProperty("--duration", `${2.4 + Math.random() * 3.8}s`);
    sparkle.style.setProperty("--delay", `${Math.random() * -5}s`);
    sparklesLayer.appendChild(sparkle);
  }
}

createAmbientDetails();

// Revela seções e cards no momento em que entram no campo de visão.
const revealObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
        revealObserver.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.16, rootMargin: "0px 0px -40px 0px" }
);

document.querySelectorAll(".reveal").forEach((element, index) => {
  element.style.transitionDelay = `${Math.min(index % 6, 5) * 70}ms`;
  revealObserver.observe(element);
});

// Parallax leve: suficiente para dar profundidade sem cansar em celulares.
const parallaxItems = [...document.querySelectorAll("[data-parallax]")];

function handleParallax() {
  const viewportCenter = window.innerHeight / 2;

  parallaxItems.forEach((item) => {
    const speed = Number(item.dataset.parallax);
    const rect = item.getBoundingClientRect();
    const distance = rect.top + rect.height / 2 - viewportCenter;
    const offset = distance * speed;
    item.style.transform = `translate3d(0, ${offset}px, 0)`;
  });
}

window.addEventListener("scroll", handleParallax, { passive: true });
window.addEventListener("resize", handleParallax);
handleParallax();

// Player romântico. Depois, basta colocar o caminho do áudio no src do <audio>.
const musicButton = document.getElementById("musicToggle");
const musicText = document.getElementById("musicText");
const loveSong = document.getElementById("loveSong");

musicButton.addEventListener("click", async () => {
  if (!loveSong.getAttribute("src")) {
    musicText.textContent = "Adicione o áudio";
    musicButton.classList.remove("is-playing");
    setTimeout(() => {
      musicText.textContent = "Tocar música";
    }, 1800);
    return;
  }

  if (loveSong.paused) {
    try {
      await loveSong.play();
      musicButton.classList.add("is-playing");
      musicText.textContent = "Pausar música";
    } catch {
      musicText.textContent = "Toque novamente";
    }
  } else {
    loveSong.pause();
    musicButton.classList.remove("is-playing");
    musicText.textContent = "Tocar música";
  }
});

loveSong.addEventListener("ended", () => {
  musicButton.classList.remove("is-playing");
  musicText.textContent = "Tocar música";
});
