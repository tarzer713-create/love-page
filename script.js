// ====== แก้ตรงนี้ให้เป็นเรื่องของเราเอง ======
const CONFIG = {
  herName: "ดอลลี่",    // ชื่อหรือชื่อเล่นของเทอ
  myName: "ชื่อเรา",    // ชื่อของเรา
  contactUrl: "https://line.me/ti/p/~yourid", // ลิงก์ LINE / IG หรือเบอร์โทร (tel:0812345678)
};
// ============================================

document.title = `ถึง${CONFIG.herName}`;
document.querySelectorAll("[data-her]").forEach(el => (el.textContent = CONFIG.herName));
document.querySelectorAll("[data-me]").forEach(el => (el.textContent = CONFIG.myName));

const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
const ICONS = ["💗", "💙", "🎀", "✨", "🍓"];

// ---------- ใส่ตัวการ์ตูนในทุกช่อง [data-mascot] ----------
const tpl = document.getElementById("mascot-tpl");
document.querySelectorAll("[data-mascot]").forEach(slot => {
  const svg = tpl.content.firstElementChild.cloneNode(true);
  svg.dataset.mood = slot.dataset.mood || "sad";
  slot.append(svg);
});
const setMood = (slot, mood) => (slot.querySelector(".mascot").dataset.mood = mood);

// ---------- หัวใจลอยบนหน้าปก ----------
const heartsBox = document.getElementById("hearts");
if (!reduceMotion) {
  for (let i = 0; i < 14; i++) {
    const h = document.createElement("span");
    h.className = "heart";
    h.textContent = ICONS[i % ICONS.length];
    h.style.left = `${Math.random() * 90 + 3}%`;
    h.style.fontSize = `${1 + Math.random() * 0.9}rem`;
    h.style.animationDuration = `${7 + Math.random() * 6}s`;
    h.style.animationDelay = `${-Math.random() * 10}s`;
    heartsBox.append(h);
  }
}

// ---------- เปิดจดหมาย ----------
const rest = document.getElementById("rest");
document.getElementById("open").addEventListener("click", () => {
  rest.hidden = false;
  rest.firstElementChild.scrollIntoView();
});

// ---------- คำตอบของเทอ: ตัวการ์ตูนตอบสนอง ----------
const say = document.getElementById("say");
const askMascot = document.getElementById("ask-mascot");

const ANSWERS = {
  yes: {
    mood: "happy",
    html: () => `ขอบคุณนะที่ให้โอกาสเค้า ทักมาได้เลย: <a href="${CONFIG.contactUrl}">ติดต่อเค้าที่นี่</a> 💙`,
  },
  time: {
    mood: "calm",
    html: () => "ได้เลย ไม่ต้องรีบนะ เค้าจะไม่ตามและไม่กดดัน ถ้าพร้อมเมื่อไหร่ค่อยบอกนะ ☁️",
  },
  no: {
    mood: "sad",
    html: () => "เค้าเข้าใจ และขอบคุณที่อ่านจนจบนะ ขอให้เทอมีความสุขมาก ๆ 🤍",
  },
};

function burst(from) {
  if (reduceMotion) return;
  const r = from.getBoundingClientRect();
  const n = 16;
  for (let i = 0; i < n; i++) {
    const s = document.createElement("span");
    s.className = "burst";
    s.textContent = ICONS[i % ICONS.length];
    s.style.left = `${r.left + r.width / 2}px`;
    s.style.top = `${r.top + r.height / 2}px`;
    const angle = (Math.PI * 2 * i) / n;
    const dist = 80 + Math.random() * 80;
    s.style.setProperty("--dx", `${Math.cos(angle) * dist}px`);
    s.style.setProperty("--dy", `${Math.sin(angle) * dist - 40}px`);
    document.body.append(s);
    setTimeout(() => s.remove(), 1300);
  }
}

document.querySelectorAll("[data-answer]").forEach(btn => {
  btn.addEventListener("click", () => {
    const a = ANSWERS[btn.dataset.answer];
    say.innerHTML = a.html();
    setMood(askMascot, a.mood);
    if (btn.dataset.answer === "yes") burst(btn);
  });
});
