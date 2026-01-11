/* ================================
   CLEAN PRAYER TIMES SCRIPT (FINAL WORKING)
   - Loads today/tomorrow from your JSON
   - Updates clock + background
   - Sends WhatsApp message + 2 links (clickable)
==================================*/

// ---------- Elements ----------
const currentTimeID = document.getElementById("currentTime");
const currentDate_ID = document.getElementById("currentDate");

const tomorrowButton = document.getElementById("tomorrowButton");
const whatsappButton = document.getElementById("whatsapp");

// Prayer time cells
const fajrAdhan_timing = document.getElementById("fajr-adhan");
const fajrIqama_timing = document.getElementById("fajr-iqama");
const sunrise_timing   = document.getElementById("sunrise-time");

const duhrAdhan_timing = document.getElementById("duhr-adhan");
const duhrIqama_timing = document.getElementById("duhr-iqama");

const asrAdhan_timing  = document.getElementById("asr-adhan");
const asrIqama_timing  = document.getElementById("asr-iqama");

const maghribAdhan_timing = document.getElementById("maghrib-adhan");
const maghribIqama_timing = document.getElementById("maghrib-iqama");

const ishaAdhan_timing = document.getElementById("isha-adhan");
const ishaIqama_timing = document.getElementById("isha-iqama");

// ---------- State ----------
let showNextDay = false;     // false=today, true=tomorrow
let selectedPrayer = null;   // current object for WhatsApp

// ---------- Helpers ----------
function pad2(n) {
  return n < 10 ? `0${n}` : `${n}`;
}

function toYYYYMMDD(dateObj) {
  const y = dateObj.getFullYear();
  const m = pad2(dateObj.getMonth() + 1);
  const d = pad2(dateObj.getDate());
  return `${y}-${m}-${d}`;
}

function formatNiceDate(dateObj) {
  const months = ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];
  const days   = ["Sun","Mon","Tues","Wed","Thur","Fri","Sat"];
  return `${days[dateObj.getDay()]}, ${months[dateObj.getMonth()]} ${dateObj.getDate()}, ${dateObj.getFullYear()}`;
}

// ---------- Clock ----------
function updateCurrentTime() {
  const now = new Date();
  if (showNextDay) now.setDate(now.getDate() + 1);

  currentTimeID.textContent = now
    .toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })
    .toUpperCase();

  currentDate_ID.textContent = now.toLocaleDateString("en-US");
}

// ---------- Background ----------
function updateBackgroundBasedOnTime() {
  const hour = new Date().getHours(); // 0-23

  if (hour >= 6 && hour < 17) {
    document.body.style.background = "url('./Images/bgMain.jpg') center/cover no-repeat";
  } else if (hour >= 17 && hour < 20) {
    document.body.style.background = "url('./Images/bgAsr.jpg') center/cover no-repeat";
  } else {
    document.body.style.background = "url('./Images/bgNight.jpg') center/cover no-repeat";
  }
}

// ---------- Render to table ----------
function renderPrayer(p) {
  sunrise_timing.textContent = p?.Sunrise ?? "--";

  fajrAdhan_timing.textContent = p?.FajrAthan ?? "--";
  fajrIqama_timing.textContent = p?.FajrIqama ?? "--";

  duhrAdhan_timing.textContent = p?.DuhrAthan ?? "--";
  duhrIqama_timing.textContent = p?.DuhrIqama ?? "--";

  asrAdhan_timing.textContent  = p?.AsrAthan ?? "--";
  asrIqama_timing.textContent  = p?.AsrIqama ?? "--";

  maghribAdhan_timing.textContent = p?.MaghribAthan ?? "--";
  maghribIqama_timing.textContent = p?.MaghribIqama ?? "--";

  ishaAdhan_timing.textContent = p?.IshaAthan ?? "--";
  ishaIqama_timing.textContent = p?.IshaIqama ?? "--";
}

// ---------- Load prayer by date ----------
async function loadPrayerFor(dateObj) {
  const targetDate = toYYYYMMDD(dateObj);

  const res = await fetch("./Json/CompleteTimes26.json");
  if (!res.ok) throw new Error("Cannot load JSON file");

  const all = await res.json();
  const found = all.find(x => x.Date === targetDate);

  selectedPrayer = found || null;
  renderPrayer(found || null);
}

// ---------- Toggle Next Day ----------
async function toggleNextDay() {
  showNextDay = !showNextDay;

  if (showNextDay) {
    tomorrowButton.innerHTML = 'Current Day <i class="fa-solid fa-arrow-down"></i>';
    tomorrowButton.style.backgroundColor = "#00712E";
    whatsappButton.classList.add("hide");

    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    await loadPrayerFor(tomorrow);
  } else {
    tomorrowButton.innerHTML = 'Next Day <i class="fa-solid fa-arrow-right"></i>';
    tomorrowButton.style.backgroundColor = "";
    whatsappButton.classList.remove("hide");

    const today = new Date();
    await loadPrayerFor(today);
  }

  updateCurrentTime();
}

// ---------- WhatsApp (FINAL FULL VERSION) ----------
whatsappButton.addEventListener("click", () => {
  if (!selectedPrayer) return;

  const dateObj = new Date();
  if (showNextDay) dateObj.setDate(dateObj.getDate() + 1);

  const msg = `
📢 Assalamu Alaikum Everyone
🕌 Masjid Al-Berr – Windsor

📅 Date: ${formatNiceDate(dateObj)}

➡️ الفجر | Fajr
Adhan: ${selectedPrayer.FajrAthan}
Iqama: ${selectedPrayer.FajrIqama}

➡️ الظهر | Duhr
Adhan: ${selectedPrayer.DuhrAthan}
Iqama: ${selectedPrayer.DuhrIqama}

➡️ العصر | Asr
Adhan: ${selectedPrayer.AsrAthan}
Iqama: ${selectedPrayer.AsrIqama}

➡️ المغرب | Maghrib
Adhan: ${selectedPrayer.MaghribAthan}
Iqama: ${selectedPrayer.MaghribIqama}

➡️ العشاء | Isha
Adhan: ${selectedPrayer.IshaAthan}
Iqama: ${selectedPrayer.IshaIqama}

━━━━━━━━━━━━━━
🔗 Useful Links | روابط مهمة

🕌 Prayer Times | مواقيت الصلاة  
https://masjidalbercom.github.io/PrayerTimes/

🌐 Website | الموقع الإلكتروني  
https://masjidalber.com/

💳 Donation | للتبرع  
https://ca.mohid.co/on/windsor/abm/masjid/online/donation
━━━━━━━━━━━━━━

May Allah accept your prayers 🤲
  `.trim();

  // Works on desktop & mobile
  window.open(`https://wa.me/?text=${encodeURIComponent(msg)}`, "_blank");

  // If you want WhatsApp app only, use this instead:
  // window.open(`whatsapp://send?text=${encodeURIComponent(msg)}`, "_blank");
});


// ---------- Events ----------
tomorrowButton.addEventListener("click", toggleNextDay);

// ---------- INIT ----------
(async function init() {
  await loadPrayerFor(new Date());

  updateCurrentTime();
  setInterval(updateCurrentTime, 1000);

  updateBackgroundBasedOnTime();
  setInterval(updateBackgroundBasedOnTime, 60 * 1000);
})();
