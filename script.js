/* ================= AUDIO ================= */
const bgMusic = new Audio("https://files.catbox.moe/gm8fkv.mp3");
bgMusic.loop = true;
bgMusic.volume = 0.4;
bgMusic.muted = true;
bgMusic.preload = "auto";

const tearSound = new Audio(
  "https://cdn.pixabay.com/audio/2022/03/15/audio_4aef7c6f63.mp3"
);
tearSound.preload = "auto";

let musicStarted = false;
function startMusic() {
  if (musicStarted) return;
  musicStarted = true;

  bgMusic.play()
    .then(() => {
      bgMusic.muted = false;
    })
    .catch(() => {});
}

/* ================= DATA ================= */
const moneyGifts = [
  "2.000đ","5.000đ","10.000đ","20.000đ","50.000đ","100.000đ"
];

const wishes = [
  "Chúc năm mới an khang thịnh vượng 🌸",
  "Tiền vô như nước, lộc đầy tay 💰",
  "Vạn sự như ý – Tỷ sự như mơ ✨",
  "Sức khỏe dồi dào, gia đình hạnh phúc ❤️",
  "Học giỏi – Thành công – May mắn 🍀",
  "Công việc hanh thông, tiền tài tấn tới 🚀",
  "Xuân sang phú quý, Tết đến bình an 🧧",
  "Một năm mới tràn đầy năng lượng ⚡",
  "Mở bao là cười, cả năm là vui 😄",
  "May mắn gõ cửa, cơ hội đầy nhà 🍀"
];

/* ===== TỈ LỆ ===== */
const RATE_WISH = 0.8;

function randomGift(){
  if (Math.random() < RATE_WISH) {
    return {
      type: "wish",
      text: wishes[Math.floor(Math.random() * wishes.length)]
    };
  }
  return {
    type: "money",
    text: moneyGifts[Math.floor(Math.random() * moneyGifts.length)]
  };
}

/* ================= ELEMENT ================= */
const envs = document.querySelectorAll(".envelope");
const statusEl = document.getElementById("status");
const resetBtn = document.getElementById("resetBtn");

let opened = false;

/* ================= CLICK ENVELOPE ================= */
envs.forEach(env => {
  env.addEventListener("click", () => {
    startMusic();

    if (opened) return;
    opened = true;

    statusEl.textContent = "🧧 Đang mở phong bao…";

    env.classList.add("center","shake");
    envs.forEach(e => e !== env && e.classList.add("fade"));

    setTimeout(() => {
      env.classList.remove("shake");
      openEnvelope(env);
    }, 650);
  });
});

/* ================= OPEN ================= */
function openEnvelope(env){
  tearSound.currentTime = 0;
  tearSound.play().catch(()=>{});

  const gift = randomGift();
  const giftEl = env.querySelector(".gift");

  // 🔥 PHÂN LOẠI CÂU CHÚC / TIỀN
  giftEl.textContent = gift.text;
  giftEl.classList.remove("wish","money");
  giftEl.classList.add(gift.type);

  env.classList.add("opened");

  statusEl.textContent =
    gift.type === "money"
      ? "🎉 Chúc mừng bạn nhận được"
      : "🎊 Một lời chúc dành cho bạn";

  firework(env);
  resetBtn.classList.add("show");
}

/* ================= FIREWORK ================= */
function firework(el){
  const r = el.getBoundingClientRect();
  for(let i = 0; i < 48; i++){
    const f = document.createElement("div");
    f.className = "firework";
    f.style.left = r.left + r.width / 2 + "px";
    f.style.top  = r.top  + r.height / 2 + "px";
    f.style.setProperty("--x", (Math.random() * 420 - 210) + "px");
    f.style.setProperty("--y", (Math.random() * 420 - 210) + "px");
    document.body.appendChild(f);
    setTimeout(() => f.remove(), 1200);
  }
}

/* ================= RESET ================= */
resetBtn.addEventListener("click", () => {
  opened = false;
  statusEl.textContent = "Vuốt hoặc chạm để chọn 1 phong bao";
  resetBtn.classList.remove("show");

  envs.forEach(env => {
    env.classList.remove("opened","fade","center","shake");
    const giftEl = env.querySelector(".gift");
    giftEl.textContent = "";
    giftEl.classList.remove("wish","money");
    env.style.transform = "";
  });
});

/* ================= HOA ĐÀO RƠI ================= */
const petalsBox = document.querySelector(".petals");

function createPetal(){
  if (!petalsBox) return;

  const p = document.createElement("div");
  p.className = "petal";

  const size = Math.random() * 14 + 10;
  p.style.width = size + "px";
  p.style.height = size + "px";
  p.style.left = Math.random() * 100 + "%";

  const fall = Math.random() * 6 + 6;
  p.style.animationDuration =
    `${fall}s, ${Math.random()*4+3}s, ${Math.random()*6+4}s`;

  petalsBox.appendChild(p);
  setTimeout(() => p.remove(), fall * 1000);
}
setInterval(createPetal, 220);

/* ================= KIM TUYẾN ================= */
const confettiBox = document.getElementById("confettiBox");

function createConfetti(){
  if (!confettiBox) return;

  const c = document.createElement("div");
  c.className = "confetti";
  c.style.left = Math.random() * 100 + "%";
  c.style.animationDuration =
    (Math.random() * 4 + 5) + "s, " + (Math.random() * 2 + 2) + "s";

  confettiBox.appendChild(c);
  setTimeout(() => c.remove(), 9000);
}
setInterval(createConfetti, 160);
