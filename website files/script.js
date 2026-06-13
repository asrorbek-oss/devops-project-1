// ===== Squad data =====
const players = [
  { num: 1, name: "Utkir Yusupov", pos: "Darvozabon" },
  { num: 4, name: "Sherzod Mirzayev", pos: "Himoyachi" },
  { num: 5, name: "Abbosbek Fayzullayev", pos: "Yarim himoyachi" },
  { num: 7, name: "Eldor Shomurodov", pos: "Hujumchi" },
  { num: 9, name: "Azizbek Turgunboyev", pos: "Hujumchi" },
  { num: 10, name: "Jaloliddin Masharipov", pos: "Yarim himoyachi" },
  { num: 11, name: "Otabek Shukurov", pos: "Himoyachi" },
  { num: 17, name: "Davron Ortiqov", pos: "Darvozabon" },
  { num: 21, name: "Sardor Mirzayev", pos: "Himoyachi" },
  { num: 23, name: "Jasur Yaxshiboyev", pos: "Yarim himoyachi" },
  { num: 30, name: "Marufjon Ergashev", pos: "Hujumchi" },
  { num: 8, name: "Sherzod Karimov", pos: "Yarim himoyachi" },
];

// ===== Matches data =====
const matches = [
  { date: "12 MAR", home: "O'zbekiston", away: "Eron", status: "upcoming", label: "Tez kunda" },
  { date: "25 FEV", home: "O'zbekiston", away: "Qatar", status: "win", label: "G'alaba 2:1" },
  { date: "10 FEV", home: "Saudiya Arabistoni", away: "O'zbekiston", status: "loss", label: "Mag'lubiyat 0:1" },
  { date: "21 YAN", home: "O'zbekiston", away: "Yaponiya", status: "win", label: "G'alaba 3:0" },
];

function renderSquad() {
  const grid = document.getElementById("squadGrid");
  grid.innerHTML = players.map(p => `
    <div class="player-card">
      <div class="player-card__photo">
        <span class="player-card__number">${p.num}</span>
      </div>
      <div class="player-card__body">
        <div class="player-card__name">${p.name}</div>
        <div class="player-card__pos">${p.pos}</div>
      </div>
    </div>
  `).join("");
}

function renderMatches() {
  const list = document.getElementById("matchesList");
  list.innerHTML = matches.map(m => {
    let badgeClass = "match-row__badge--upcoming";
    if (m.status === "win") badgeClass = "match-row__badge--win";
    if (m.status === "loss") badgeClass = "match-row__badge--loss";
    return `
      <div class="match-row">
        <div class="match-row__date">${m.date}</div>
        <div class="match-row__team">${m.home}</div>
        <div class="match-row__vs">VS</div>
        <div class="match-row__team match-row__team--right">${m.away}</div>
        <div class="match-row__badge ${badgeClass}">${m.label}</div>
      </div>
    `;
  }).join("");
}

// ===== Animated counters =====
function animateCounters() {
  const counters = document.querySelectorAll(".stat__num");
  counters.forEach(counter => {
    const target = parseInt(counter.dataset.target, 10);
    let current = 0;
    const step = Math.max(1, Math.ceil(target / 40));
    const update = () => {
      current += step;
      if (current >= target) {
        counter.textContent = target;
      } else {
        counter.textContent = current;
        requestAnimationFrame(update);
      }
    };
    update();
  });
}

// Trigger counters when visible
function initCounterObserver() {
  const statsSection = document.querySelector(".stats");
  if (!statsSection) return;
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        animateCounters();
        observer.disconnect();
      }
    });
  }, { threshold: 0.3 });
  observer.observe(statsSection);
}

// ===== Mobile menu =====
function initBurger() {
  const burger = document.getElementById("burger");
  const nav = document.querySelector(".nav");
  burger.addEventListener("click", () => {
    nav.classList.toggle("nav--open");
    nav.style.display = nav.classList.contains("nav--open") ? "flex" : "none";
    if (nav.classList.contains("nav--open")) {
      nav.style.position = "absolute";
      nav.style.top = "76px";
      nav.style.left = "0";
      nav.style.right = "0";
      nav.style.flexDirection = "column";
      nav.style.background = "#00263a";
      nav.style.padding = "20px 24px";
      nav.style.gap = "16px";
    }
  });
}

document.addEventListener("DOMContentLoaded", () => {
  renderSquad();
  renderMatches();
  initCounterObserver();
  initBurger();
});
