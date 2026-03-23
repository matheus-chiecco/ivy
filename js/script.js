function updateLoveTime() {
  const startDate = new Date(2023, 4, 13, 0, 0, 0);
  const now = new Date();

  const diff = now - startDate;
  const totalSeconds = Math.floor(diff / 1000);
  const totalMinutes = Math.floor(totalSeconds / 60);
  const totalHours = Math.floor(totalMinutes / 60);
  const totalDays = Math.floor(totalHours / 24);

  const years = Math.floor(totalDays / 365);
  const remainingDaysAfterYears = totalDays % 365;
  const months = Math.floor(remainingDaysAfterYears / 30);
  const days = remainingDaysAfterYears % 30;

  document.getElementById("years").innerText = years;
  document.getElementById("months").innerText = months;
  document.getElementById("days").innerText = days;
  document.getElementById("hours").innerText = totalHours % 24;
  document.getElementById("minutes").innerText = totalMinutes % 60;
  document.getElementById("seconds").innerText = totalSeconds % 60;
}

setInterval(updateLoveTime, 1000);
updateLoveTime();

const heartsContainer = document.getElementById("heartsContainer");

function createFloatingHeart() {
  if (!heartsContainer) return;

  const heart = document.createElement("div");
  heart.classList.add("floating-heart");

  const emojis = ["💖", "💕", "💗", "💞", "❤️"];
  heart.innerText = emojis[Math.floor(Math.random() * emojis.length)];

  heart.style.left = Math.random() * 100 + "vw";
  heart.style.animationDuration = (4 + Math.random() * 4) + "s";
  heart.style.fontSize = (14 + Math.random() * 18) + "px";

  heartsContainer.appendChild(heart);

  setTimeout(() => {
    heart.remove();
  }, 8000);
}

setInterval(createFloatingHeart, 900);

function createHeartBurst(qtd) {
  for (let i = 0; i < qtd; i++) {
    setTimeout(createFloatingHeart, i * 120);
  }
}

function getTodayInBrazil() {
  const formatter = new Intl.DateTimeFormat("en-US", {
    timeZone: "America/Sao_Paulo",
    weekday: "short"
  });

  const dayName = formatter.format(new Date()).toLowerCase();

  const map = {
    sun: 0,
    mon: 1,
    tue: 2,
    wed: 3,
    thu: 4,
    fri: 5,
    sat: 6
  };

  return map[dayName];
}

function openEnvelopeCard(cardId, allowedDay, element) {
  const today = getTodayInBrazil();
  const lockMessage = document.getElementById("lockMessage");

  if (today !== allowedDay) {
    if (lockMessage) {
      lockMessage.classList.remove("hidden");
      lockMessage.innerText = "Essa cartinha é pro dia certo, meu amor 💌";
    }

    element.classList.add("locked");
    setTimeout(() => {
      element.classList.remove("locked");
    }, 400);
    return;
  }

  if (lockMessage) {
    lockMessage.classList.add("hidden");
  }

  document.querySelectorAll(".day-envelope").forEach(item => {
    if (item !== element) {
      item.classList.remove("open");
    }
  });

  element.classList.toggle("open");
  createHeartBurst(8);
}