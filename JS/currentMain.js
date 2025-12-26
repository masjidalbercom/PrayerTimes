// Get the HTML elements
const currentTimeID = document.getElementById("currentTime");
const currentDate_ID = document.getElementById("currentDate");
const tomorrowButton = document.getElementById("tomorrowButton");
const tomorrowButton_iconElement = tomorrowButton.querySelector("i");
const whatsappButton = document.getElementById("whatsapp");
const tomorrowPrayerTimes = document.getElementById("tomorrowPrayerTimes");
const todayPrayerTimes = document.getElementById("todayPrayerTimes");

// Prayer Labels
const fajrAdhan_label = document.getElementById("fair-prayer");
const fajrAdhan_timing = document.getElementById("fajr-adhan");
const fajrIqama_timing = document.getElementById("fajr-iqama");
const sunrise_timing = document.getElementById("sunrise-time");
const duhrAdhan_timing = document.getElementById("duhr-adhan");
const duhrIqama_timing = document.getElementById("duhr-iqama");
const ishaBox = document.getElementById("ishaBox");

const asrAdhan_timing = document.getElementById("asr-adhan");
const asrIqama_timing = document.getElementById("asr-iqama");

const maghribAdhan_timing = document.getElementById("maghrib-adhan");
const maghribIqama_timing = document.getElementById("maghrib-iqama");

const ishaAdhan_timing = document.getElementById("isha-adhan");
const ishaIqama_timing = document.getElementById("isha-iqama");

let out = "";

// Prayer times
let sunriseTime;
let fajrAdhan;
let fajrIqama;
let dhuhrAdhan;
let dhuhrIqama;
let asrAdhan;
let asrIqama;
let maghrebAdhan;
let maghrebIqama;
let ishaAdhan;
let ishaIqama;

// Get the current date
const currentDate = new Date();

// Array for months and days of the week
const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
const daysOfWeek = ["Sun", "Mon", "Tues", "Wed", "Thur", "Fri", "Sat"];

// Get current year, month, day, and day of the week
const currentYear = currentDate.getFullYear();
const month = months[currentDate.getMonth()]; // Get the month as a short name
const day = currentDate.getDate(); // Get the day
const year = currentDate.getFullYear(); // Get the year
const dayOfWeek = daysOfWeek[currentDate.getDay()]; // Get the day of the week
let formattedDate = ` ${dayOfWeek}, ${month} ${day}, ${year}`;

// You can now use these values as needed, for example:
// console.log(`Today is ${dayOfWeek}, ${month} ${day}, ${year}`);

setInterval(updateCurrentTime(false), 1000);

// Add event listener to the next day button
tomorrowButton.addEventListener("click", getTomorrowPrayerTimes);
let clickCount = 1;

// Function to fetch and display tomorrow's prayer times
async function getTomorrowPrayerTimes() {
  try {
    clickCount++;
    if (clickCount % 2 == 0) {
      tomorrowButton_iconElement.classList.remove("fa-arrow-right");
      tomorrowButton_iconElement.classList.add("fa-arrow-down");
      tomorrowButton.innerHTML = 'Current Day <i class="fa-solid fa-arrow-down"></i>';
      tomorrowButton.style.backgroundColor = "#00712E";

      whatsappButton.classList.add("hide");
      // Create a new date object for tomorrow
      var tomorrow = new Date();
      tomorrow.setDate(tomorrow.getDate() + 1);

      let tomorrows_Day = tomorrow.getDate(); // getting the day of the month
      let tomorrows_Month = tomorrow.getMonth() + 1; // add a 1 since months are 0-based index

      // Adding a leading zeros for a single - digit months and days
      tomorrows_Month = tomorrows_Month < 10 ? `0${tomorrows_Month}` : tomorrows_Month;
      tomorrows_Day = tomorrows_Day < 10 ? `0${tomorrows_Day}` : tomorrows_Day;

      //formatting the date as YYYY-MM-DD
      let tomorrowsDate = `${currentYear}-${tomorrows_Month}-${tomorrows_Day}`;

      // Fetch the prayer times for tomorrow
      const response = await fetch("./Json/CompleteTimes26.json");
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const allPrayers = await response.json();
      // console.log(allPrayers);

      for (let prayer of allPrayers) {
        if (prayer.Date === tomorrowsDate) {
          console.log("Todays date: " + prayer.Date);
          out += `
          <p>Fajr</p>
          <p>Adhan: ${prayer.fajrAdhan}</p>
          <p>Iqama: ${prayer.fajrAdhanIqama}</p>
          <p>Duhr</p>
          <p>Adhan: ${prayer.Dhuhr}</p>
          <p>Iqama: ${prayer.DhuhrIqama}</p>
          <p>Asr</p>
          <p>Adhan: ${prayer.Asr}</p>
          <p>Iqama: ${prayer.AsrIqama}</p>
          <p>Maghrib</p>
          <p>Adhan: ${prayer.Maghrib}</p>
          <p>Iqama: ${prayer.MaghribIqama}</p>
          <p>Isha</p>
          <p>Adhan: ${prayer.Isha}</p>
          <p>Iqama: ${prayer.IshaIqama}</p>
        `;
          // Getting the prayer times
          sunriseTime = prayer.Sunrise;
          fajrAdhan = prayer.FajrAthan;
          fajrIqama = prayer.FajrIqama;
          dhuhrAdhan = prayer.DuhrAthan;
          dhuhrIqama = prayer.DuhrIqama;
          asrAdhan = prayer.AsrAthan;
          asrIqama = prayer.AsrIqama;
          maghrebAdhan = prayer.MaghribAthan;
          maghrebIqama = prayer.MaghribIqama;
          ishaAdhan = prayer.IshaAthan;
          ishaIqama = prayer.IshaIqama;
          break; // Stop looping once tomorrow's prayer times are found
        }
      }
      // Update HTML elements with tomorrow's prayer times
      // tomorrowPrayerTimes.innerHTML = out;

      fajrIqama_timing.innerHTML = fajrIqama;
      fajrAdhan_timing.innerHTML = fajrAdhan;
      sunrise_timing.innerHTML = sunriseTime;
      duhrAdhan_timing.innerHTML = dhuhrAdhan;
      duhrIqama_timing.innerHTML = dhuhrIqama;
      asrAdhan_timing.innerHTML = asrAdhan;
      asrIqama_timing.innerHTML = asrIqama;
      maghribAdhan_timing.innerHTML = maghrebAdhan;
      maghribIqama_timing.innerHTML = maghrebIqama;
      ishaAdhan_timing.innerHTML = ishaAdhan;
      ishaIqama_timing.innerHTML = ishaIqama;

      updateCurrentTime(true);
    } // Get the current year
    else {
      tomorrowButton_iconElement.classList.add("fa-arrow-right");

      tomorrowButton.textContent = "Next Day";
      tomorrowButton_iconElement.classList.remove("fa-arrow-down");
      tomorrowButton.style.backgroundColor = "";
      tomorrowButton.innerHTML = 'Next Day <i class="fa-solid fa-arrow-right"></i>';

      whatsappButton.classList.remove("hide");

      updateCurrentTime(false);
      getTodayPrayerTimes();
    }
    // console.log(out);
  } catch (error) {
    console.error("Error fetching tomorrow's prayer times:", error);
  }
}

// Update the current time every second

// Function to fetch and display today's prayer times
async function getTodayPrayerTimes() {
  try {
    const response = await fetch("./Json/CompleteTimes26.json");
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    const allPrayers = await response.json();

    // Create a new date object for tomorrow
    var today = new Date();
    today.setDate(today.getDate());

    let todays_Day = today.getDate(); // getting the day of the month
    let todays_Month = today.getMonth() + 1; // add a 1 since months are 0-based index

    // Adding a leading zeros for a single - digit months and days
    todays_Month = todays_Month < 10 ? `0${todays_Month}` : todays_Month;
    todays_Day = todays_Day < 10 ? `0${todays_Day}` : todays_Day;

    //formatting the date as YYYY-MM-DD
    let todaysDate = `${currentYear}-${todays_Month}-${todays_Day}`;

    let out = "";
    for (let prayer of allPrayers) {
      if (prayer.Date === todaysDate) {
        out += `
          <p>Fajr</p>
          <p>Adhan: ${prayer.fajrAdhan}</p>
          <p>Iqama: ${prayer.fajrAdhanIqama}</p>
          <p>Duhr</p>
          <p>Adhan: ${prayer.Dhuhr}</p>
          <p>Iqama: ${prayer.DhuhrIqama}</p>
          <p>Asr</p>
          <p>Adhan: ${prayer.Asr}</p>
          <p>Iqama: ${prayer.AsrIqama}</p>
          <p>Maghrib</p>
          <p>Adhan: ${prayer.Maghrib}</p>
          <p>Iqama: ${prayer.MaghribIqama}</p>
          <p>Isha</p>
          <p>Adhan: ${prayer.Isha}</p>
          <p>Iqama: ${prayer.IshaIqama}</p>
        `;

        // Getting the prayer times
        sunriseTime = prayer.Sunrise;
        fajrAdhan = prayer.FajrAthan;
        fajrIqama = prayer.FajrIqama;
        dhuhrAdhan = prayer.DuhrAthan;
        dhuhrIqama = prayer.DuhrIqama;
        asrAdhan = prayer.AsrAthan;
        asrIqama = prayer.AsrIqama;
        maghrebAdhan = prayer.MaghribAthan;
        maghrebIqama = prayer.MaghribIqama;
        ishaAdhan = prayer.IshaAthan;
        ishaIqama = prayer.IshaIqama;
        break; // Stop looping once today's prayer times are found
      }

      document.getElementById("whatsapp").addEventListener("click", function () {
        const currentDay_PrayerTime = `
        📢 Assalamu Alaikum Everyone, today's prayer time is as follows:
        📅 Date: ${formattedDate}

        ➡️الفجر|Fajr
        Adhan: ${prayer.fajrAdhan}
        Iqama: ${prayer.fajrAdhanIqama}

        ➡️الظهر|Duhr
        Adhan: ${prayer.Dhuhr}
        Iqama: ${prayer.DhuhrIqama}

        ➡️العصر|Asr
        Adhan: ${prayer.Asr}
        Iqama: ${prayer.AsrIqama}

        ➡️المغرب|Maghrib
        Adhan: ${prayer.Maghrib}
        Iqama: ${prayer.MaghribIqama}

        ➡️العشاء|Isha
        Adhan: ${prayer.Isha}
        Iqama: ${prayer.IshaIqama}

    `;

        // Encode the message for URL
        const encodedMessage = encodeURIComponent(currentDay_PrayerTime);

        // Open WhatsApp with the encoded message
        window.open(`whatsapp://send?text=${encodedMessage}`, "_blank");
      });
    }

    // Update HTML elements with tomorrow's prayer times

    fajrIqama_timing.innerHTML = fajrIqama;
    fajrAdhan_timing.innerHTML = fajrAdhan;
    sunrise_timing.innerHTML = sunriseTime;
    duhrAdhan_timing.innerHTML = dhuhrAdhan;
    duhrIqama_timing.innerHTML = dhuhrIqama;
    asrAdhan_timing.innerHTML = asrAdhan;
    asrIqama_timing.innerHTML = asrIqama;
    maghribAdhan_timing.innerHTML = maghrebAdhan;
    maghribIqama_timing.innerHTML = maghrebIqama;
    ishaAdhan_timing.innerHTML = ishaAdhan;
    ishaIqama_timing.innerHTML = ishaIqama;

    updateCurrentTime(false);

    // Usage
  } catch (error) {
    console.error("Error fetching today's prayer times:", error);
  }
}

// Function to update the current time
function updateCurrentTime(isNextDay) {
  var now = new Date();

  //Adding a day if isNextDay is true
  if (isNextDay) {
    now.setDate(now.getDate() + 1);
  }

  // Formatting the current time and date
  var currentTime = now.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
  var currentDate = now.toLocaleDateString("en-US");

  currentTimeID.textContent = currentTime.toUpperCase();
  currentDate_ID.textContent = currentDate;
}

function updateBackgroundBasedOnTime() {
  var now = new Date();

  // Get the current hour and AM/PM designation
  var current12_hourTime = parseInt(now.toLocaleDateString("en-us", { hour: "numeric", hour12: true }).slice(-5));
  var currentTimeSignature = now.toLocaleDateString("en-us", { hour: "numeric", hour12: true }).slice(-2);

  // Assume these variables are predefined somewhere in your code
  const sunRise_hours = 5; // Example sunrise time in 12-hour format (e.g., 5 AM)
  const duhrAdthanHours = 12; // Example time for Duhr prayer (e.g., 12 PM)
  const asrAdthanHours = 3; // Example time for Asr prayer (e.g., 3 PM)
  const maghribAdthanHours = 6; // Example time for Maghrib prayer (e.g., 6 PM)
  const ishaAdthanHours = 8; // Example time for Isha prayer (e.g., 8 PM)

  // Select the elements that will be updated
  const currentTimeID = document.getElementById("currentTime"); // Assuming you have these IDs in your HTML
  const currentDate_ID = document.getElementById("currentDate");

  // Check AM/PM and set the background accordingly
  if (currentTimeSignature.toLowerCase() === "am") {
    if (current12_hourTime >= sunRise_hours && current12_hourTime < 12) {
      // Daytime (AM)
      document.body.style.background = "url('./Images/bgMain.jpg')";
      document.body.style.backgroundPosition = "center";
      document.body.style.backgroundSize = "cover";
      document.body.style.backgroundRepeat = "no-repeat";
      currentTimeID.style.color = "#555";
      currentDate_ID.style.color = "#555";
    } else {
      // Nighttime (AM but after 12 PM, technically night)
      document.body.style.background = "url('./Images/bgNight.jpg')";
      document.body.style.backgroundPosition = "center";
      document.body.style.backgroundSize = "cover";
      document.body.style.backgroundRepeat = "no-repeat";
      currentTimeID.style.color = "#eee";
      currentDate_ID.style.color = "#eee";
    }
  } else if (currentTimeSignature.toLowerCase() === "pm") {
    if (current12_hourTime == duhrAdthanHours || current12_hourTime < asrAdthanHours) {
      // Duhr prayer time (noon)
      document.body.style.background = "url('./Images/bgMain.jpg')";
      document.body.style.backgroundPosition = "center";
      document.body.style.backgroundSize = "cover";
      document.body.style.backgroundRepeat = "no-repeat";
      currentTimeID.style.color = "#555";
      currentDate_ID.style.color = "#555";
    } else if (current12_hourTime >= asrAdthanHours && current12_hourTime < maghribAdthanHours) {
      // Asr time
      document.body.style.background = "url('./Images/bgAsr.jpg')";
      document.body.style.backgroundPosition = "center";
      document.body.style.backgroundSize = "cover";
      document.body.style.backgroundRepeat = "no-repeat";
      currentTimeID.style.color = "#eee";
      currentDate_ID.style.color = "#eee";
    } else if (current12_hourTime + 12 >= maghribAdthanHours + 12 && current12_hourTime + 12 <= ishaAdthanHours + 12) {
      // Maghrib to Isha (night)
      document.body.style.background = "url('./Images/bgNight.jpg')";
      document.body.style.backgroundPosition = "center";
      document.body.style.backgroundSize = "cover";
      document.body.style.backgroundRepeat = "no-repeat";
      currentTimeID.style.color = "#eee";
      currentDate_ID.style.color = "#eee";
    } else {
      // Default (if none of the above)
      document.body.style.background = "url('./Images/bgNight.jpg')";
      document.body.style.backgroundPosition = "center";
      document.body.style.backgroundSize = "cover";
      document.body.style.backgroundRepeat = "no-repeat";
      currentTimeID.style.color = "#555";
      currentDate_ID.style.color = "#555";
    }
  }
}

// Call the function to update the background when the page loads
setInterval(updateBackgroundBasedOnTime(), 1000);

// Call the function to fetch and display today's prayer times when the page loads
getTodayPrayerTimes();
setInterval(updateCurrentTime(), 1000); // Update current time when the page loads

// setInterval(updateCurrentTime, 1000);
