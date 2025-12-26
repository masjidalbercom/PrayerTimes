const currentTimeID = document.getElementById("currentTime");
const currentDate_ID = document.getElementById("currentDate");
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

//button

const toggleButton = document.getElementsByClassName("toggle-button")[0];
const navbarLinks = document.getElementsByClassName("navbar-links")[0];

// toggleButton.addEventListener("click", () => {
//   navbarLinks.classList.toggle("active");
// });

// var currentTime = new Date().toLocaleTimeString();
var currentDate = new Date().toLocaleDateString("en-US");

// currentDate_ID.textContent = currentDate.slice(0, 10);

// prayer List

let apiPrayer = [];

function doDate() {
  var str = "";
  var days = new Array("Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday");

  var months = new Array("January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December");

  var now = new Date();

  str += "Today is: " + days[now.getDay()] + ", " + now.getDate() + " " + months[now.getMonth()] + "" + now.getFullYear() + " " + now.getHours() + ":" + now.getMinutes() + ":" + now.getSeconds();

  var currentTime = new Date().toLocaleTimeString();
  // var currentMinutes = now.getMinutes();

  document.getElementById("currentTime").innerHTML = currentTime.toUpperCase();
  currentDate_ID.textContent = currentDate;
}
// updating the time every second
setInterval(doDate, 1000);

async function getPrayer2() {
  fetch("PrayerTimes22.json")
    .then(function (response) {
      return response.json();
    })

    // to access the data

    .then(function (allPrayers) {
      var now = new Date();
      var currentMinutes = now.getMinutes();
      var current12_hourTime = parseInt(now.toLocaleDateString("en-us", { hour: "numeric", hour12: true }).slice(-5));
      var currentTimeSignature = now.toLocaleDateString("en-us", { hour: "numeric", hour12: true }).slice(-2);
      var currentDate = now.toLocaleDateString("en-us", { hour: "numeric", hour12: true });
      // console.log(currentDate);

      // creating the unique ID for the JSON
      const tempMonth = new Date().getMonth() + 1;
      const currentYear = new Date().getFullYear();

      var todaysMonth = `${tempMonth < 10 ? "0" : ""}${tempMonth}`;

      // console.log("Todays months is:", todaysMonth);

      // console.log("Current Month Type", typeof mont);

      var temp_MonthDay = now.getDate();
      var todaysMonthDay = `${temp_MonthDay < 10 ? "0" : ""}${temp_MonthDay}`;

      // console.log("Months day: ", todaysMonthDay);
      var todaysDate = currentYear + "-" + todaysMonth + "-" + todaysMonthDay;
      // console.log("Todays date is: ", todaysDate);

      // let placeholder = document.querySelector(".container");
      let out = "";

      for (let prayer of allPrayers) {
        // console.log(todaysDate);
        if (prayer.Date == todaysDate) {
          var sunriseTime = prayer.Sunrise;
          // console.log(sunriseTime);
          var fajrAdhan = prayer.Fajr;
          var fajrIqama = prayer.FajrIqama;

          // Duhr timing
          var duhrAdhan = prayer.Dhuhr;
          var duhrIqama = prayer.DhuhrIqama;
          //Asr  timing
          var asrAdhan = prayer.Asr;
          var asrIqama = prayer.AsrIqama;

          // Maghrib timing
          var maghribAdhan = prayer.Maghrib;
          var maghribIqama = prayer.MaghribIqama;

          //Isha
          var ishaAdhan = prayer.Isha;
          var ishaIqama = prayer.IshaIqama;

          out += `
            <p> Fajr </p>
            <p> Adhan: ${prayer.Fajr}</p>
            <p> Iqama: ${prayer.FajrIqama}</p>
            <p> Duhr </p>
            <p> Adhan: ${prayer.Dhuhr}</p>
            <p> Iqama: ${prayer.DhuhrIqama}</p>
            <p> Asr </p>
            <p> Adhan: ${prayer.Asr}</p>
            <p> Iqama: ${prayer.AsrIqama}</p>
            <p> Maghrib </p>
            <p> Adhan: ${prayer.Maghrib}</p>
            <p> Iqama: ${prayer.MaghribIqama}</p>
             <p> Isha </p>
            <p> Adhan: ${prayer.Isha}</p>
            <p> Iqama: ${prayer.IshaIqama}</p>

          `;
        }
        // placeholder.innerHTML = out;
      }

      // console.log(out);

      fajrIqama_timing.innerHTML = fajrIqama;
      fajrAdhan_timing.innerHTML = fajrAdhan;

      duhrAdhan_timing.innerHTML = duhrAdhan;
      duhrIqama_timing.innerHTML = duhrIqama;

      asrAdhan_timing.innerHTML = asrAdhan;
      asrIqama_timing.innerHTML = asrIqama;

      maghribAdhan_timing.innerHTML = maghribAdhan;
      maghribIqama_timing.innerHTML = maghribIqama;

      ishaAdhan_timing.innerHTML = ishaAdhan;
      ishaIqama_timing.innerHTML = ishaIqama;

      sunrise_timing.innerHTML = sunriseTime;

      //Prayer Times
      var fajrAdthan_Minutes = parseInt(fajrAdhan.slice(-2));
      var fajrAdthan_hours = parseInt(fajrAdhan);
      var fajrIqama_hours = parseInt(fajrIqama);
      var fajrIqama_minutes = parseInt(fajrIqama.slice(-2));

      var sunRise_hours = parseInt(sunriseTime);
      var sunRise_minutes = parseInt(sunriseTime.slice(-2));
      var duhrAdthanMinutes = parseInt(duhrAdhan.slice(-2));
      var duhrAdthanHours = parseInt(duhrAdhan);
      var duhrIqama_hours = parseInt(duhrIqama);
      var duhrIqama_minutes = parseInt(duhrIqama.slice(-2));

      var asrAdthanHours = parseInt(asrAdhan);
      var asrAdthanMinutes = parseInt(asrAdhan.slice(-2));
      var asrIqama_hours = parseInt(asrIqama);
      var asrIqama_minutes = parseInt(asrIqama.slice(-2));

      var maghribAdthanHours = parseInt(maghribAdhan);
      var maghribAdthanMinutes = parseInt(maghribAdhan.slice(-2));
      var maghribIqama_hours = parseInt(maghribIqama);
      var maghribIqama_minutes = parseInt(maghribIqama.slice(-2));

      var ishaAdthanHours = parseInt(ishaAdhan);
      var ishaIqamaHours = parseInt(ishaIqama);
      var ishaAdthanMinutes = parseInt(ishaAdhan.slice(-2));
      var ishaIqamaMinutes = parseInt(ishaIqama.slice(-2));

      // Get the 12 time

      // ****************************************** TESTS *****************************************
      // var current12_hour = current12_time.toLocaleDateString("en-us", { hour: "numeric", hour12: true });
      // console.log("current12 hr is", current12_hourTime);
      // console.log("current12 min is", currentMinutes);
      // ****************************************** END OF TESTS *****************************************

      // Assigning the wallpaper for the time

      if (currentTimeSignature.toLowerCase() === "am") {
        if (current12_hourTime >= sunRise_hours && current12_hourTime < 12) {
          document.body.style.background = "url('./Images/bgMain.jpg')";
          document.body.style.backgroundPosition = "center";
          document.body.style.backgroundSize = "cover";
          document.body.style.backgroundRepeat = "no-repeat";
          currentTimeID.style.color = "#555";
          currentDate_ID.style.color = "#555";
        } else {
          console.log("x");
          document.body.style.background = "url('./Images/bgNight.jpg')";
          document.body.style.backgroundPosition = "center";
          document.body.style.backgroundSize = "cover";
          document.body.style.backgroundRepeat = "no-repeat";

          currentTimeID.style.color = "#eee";
          currentDate_ID.style.color = "#eee";
        }
      }
      if (currentTimeSignature.toLowerCase() === "pm") {
        // getting all afternoon prayer times
        // console.log("in");

        // maghribAdthanHours = 12;
        // current12_hourTime = 10;

        console.log("current 12 hr time", current12_hourTime);
        console.log("current duhrAdthan hrs", duhrAdthanHours);
        // console.log("current current12_hourTime", current12_hourTime);
        console.log("asrAdthanHours+1", asrAdthanHours + 1);

        if (current12_hourTime >= duhrAdthanHours && current12_hourTime < asrAdthanHours + 1) {
          document.body.style.background = "url('./Images/bgMain.jpg')";
          // alert("hi");
          document.body.style.backgroundPosition = "center";
          document.body.style.backgroundSize = "cover";
          document.body.style.backgroundRepeat = "no-repeat";
          currentTimeID.style.color = "#555";
          currentDate_ID.style.color = "#555";
        } else if (current12_hourTime >= asrAdthanHours && current12_hourTime < maghribAdthanHours) {
          document.body.style.background = "url('./Images/bgAsr.jpg')";
          document.body.style.backgroundPosition = "center";
          document.body.style.backgroundSize = "cover";
          document.body.style.backgroundRepeat = "no-repeat";
          currentTimeID.style.color = "#eee";
          currentDate_ID.style.color = "#eee";
        } else if (current12_hourTime >= maghribAdthanHours) {
          document.body.style.background = "url('./Images/bgNight.jpg')";
          document.body.style.backgroundPosition = "center";
          document.body.style.backgroundSize = "cover";
          document.body.style.backgroundRepeat = "no-repeat";
          currentTimeID.style.color = "#eee";
          currentDate_ID.style.color = "#eee";
        } else {
          document.body.style.background = "url('./Images/bgMain.jpg')";
          // alert("hi");
          document.body.style.backgroundPosition = "center";
          document.body.style.backgroundSize = "cover";
          document.body.style.backgroundRepeat = "no-repeat";
          currentTimeID.style.color = "#555";
          currentDate_ID.style.color = "#555";
        }
      }

      // ****************************************** TESTS *****************************************

      // console.log("Fajr Adthan Hrs: ", fajrAdthan_hours);
      // console.log("Fajr Adthan Mins: ", fajrAdthan_Minutes);
      // console.log("Fajr Iqama Hrs: ", fajrIqama_hours);
      // console.log("Fajr Iqama Mins: ", fajrIqama_minutes);

      // console.log("Sunrise HR: ", sunRise_hours);
      // console.log("Sunrise min: ", sunRise_minutes);

      // console.log("duhr Adthan hrs", duhrAdthanHours);
      // console.log("duhr Adthan Mins", duhrAdthanMinutes);
      // console.log("duhr Iqama Hours", duhrIqama_hours);
      // console.log("duhr Iqama mins", duhrIqama_minutes);

      // console.log("Asr Adthan Hrs", asrAdthanHours);
      // console.log("Asr Adthan Mins", asrAdthanMinutes);
      // console.log("Asr Iqama Hrs", asrIqama_hours);
      // console.log("Asr Iqama Mins", asrIqama_minutes);

      // console.log("Maghrib Adthan Hrs: ", maghribAdthanHours);
      // console.log("Maghrib Adthan Mins: ", maghribAdthanMinutes);
      // console.log("Maghrib Iqama Hrs: ", maghribIqama_hours);
      // console.log("Maghrib Iqama Mins: ", maghribIqama_minutes);

      // console.log("Isha Adthan Hrs", ishaAdthanHours);
      // console.log("Isha Adthan Mins", ishaAdthanMinutes);
      // console.log("Isha Iqama Hrs", ishaIqamaHours);
      // console.log("Isha Iqama Mins", ishaIqamaMinutes);

      // ************************************ END OF TESTS *****************************************
    });
}

getPrayer2();
