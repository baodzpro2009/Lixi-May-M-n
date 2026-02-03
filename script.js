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
function startMusic(){
  if(musicStarted) return;
  musicStarted = true;
  bgMusic.play().then(()=> bgMusic.muted = false).catch(()=>{});
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

const RATE_WISH = 0.8;

function randomGift(){
  return Math.random() < RATE_WISH
    ? { type:"wish", text:wishes[Math.floor(Math.random()*wishes.length)] }
    : { type:"money", text:moneyGifts[Math.floor(Math.random()*moneyGifts.length)] };
}

/* ================= ELEMENT ================= */
const envs = document.querySelectorAll(".envelope");
const envelopesBox = document.querySelector(".envelopes");
const statusEl = document.getElementById("status");

/* ================= CLICK ================= */
envs.forEach(env=>{
  env.addEventListener("click", ()=>{
    startMusic();

    // đã mở thì bỏ qua
    if(env.classList.contains("opened")) return;

    // bỏ trạng thái done nếu còn mở
    envelopesBox.classList.remove("done");

    // bỏ focus của bao khác
    envs.forEach(e=>e.classList.remove("focus"));

    // focus bao được chọn
    env.classList.add("focus");
    statusEl.textContent = "🧧 Đang mở phong bao…";

    setTimeout(()=>{
      openEnvelope(env);
    }, 900);
  });
});

/* ================= OPEN ================= */
function openEnvelope(env){
  tearSound.currentTime = 0;
  tearSound.play().catch(()=>{});

  const gift = randomGift();
  const giftEl = env.querySelector(".gift");

  giftEl.textContent = gift.text;
  giftEl.classList.remove("wish","money");
  giftEl.classList.add(gift.type);

  env.classList.add("opened");

  statusEl.textContent =
    gift.type === "money"
      ? "🎉 Chúc mừng bạn nhận được"
      : "🎊 Một lời chúc dành cho bạn";

  fireworkCenter();

  checkDone(); // ⭐ kiểm tra đã mở hết chưa
}

/* ================= KIỂM TRA MỞ HẾT ================= */
function checkDone(){
  const openedCount = document.querySelectorAll(".envelope.opened").length;

  if(openedCount === envs.length){
    setTimeout(()=>{
      // trả tất cả về layout ban đầu
      envs.forEach(e=>e.classList.remove("focus"));
      envelopesBox.classList.add("done");

      statusEl.textContent = "🎊 Bạn đã mở hết phong bao – Chúc năm mới phát tài!";
    }, 600);
  }
}

/* ================= FIREWORK (GIỮA MÀN HÌNH) ================= */
function fireworkCenter(){
  for(let i=0;i<16;i++){
    const f = document.createElement("div");
    f.className = "firework";
    f.style.setProperty("--x", Math.random()*300-150 + "px");
    f.style.setProperty("--y", Math.random()*300-150 + "px");
    document.body.appendChild(f);
    setTimeout(()=>f.remove(),1200);
  }
}

/* ================= HOA ĐÀO ================= */
const petalsBox = document.querySelector(".petals");

function createPetal(){
  if(!petalsBox) return;
  const p = document.createElement("div");
  p.className = "petal";
  const size = Math.random()*14+10;
  p.style.width = size+"px";
  p.style.height = size+"px";
  p.style.left = Math.random()*100+"%";
  const fall = Math.random()*6+6;
  p.style.animationDuration =
    `${fall}s, ${Math.random()*4+3}s, ${Math.random()*6+4}s`;
  petalsBox.appendChild(p);
  setTimeout(()=>p.remove(),fall*1000);
}
setInterval(createPetal,220);

/* ================= CONFETTI ================= */
const confettiBox = document.getElementById("confettiBox");

function createConfetti(){
  if(!confettiBox) return;
  const c = document.createElement("div");
  c.className = "confetti";
  c.style.left = Math.random()*100+"%";
  c.style.animationDuration =
    (Math.random()*4+5)+"s,"+(Math.random()*2+2)+"s";
  confettiBox.appendChild(c);
  setTimeout(()=>c.remove(),9000);
}
setInterval(createConfetti,160);
