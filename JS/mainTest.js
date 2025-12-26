// import timeSeconds from "time.js";

// Defining = settings
const currentTimeID = document.getElementById("currentTime");
const currentDate_ID = document.getElementById("currentDate");

const fajrAdhan_label = document.getElementById("fair-prayer");
const fajrAdhan_timing = document.getElementById("fajr-adhan");
const fajrIqama_timing = document.getElementById("fajr-iqama");

const sunrise_timing = document.getElementById("sunrise-time");
const sunrise_label = document.getElementById("sunrise-label");

const duhrAdhan_timing = document.getElementById("duhr-adhan");
const duhrIqama_timing = document.getElementById("duhr-iqama");
const duhrPrayer_label = document.getElementById("duhr-prayer");

const ishaBox = document.getElementsByClassName("ishaBox");

const asrPrayer_label = document.getElementById("asr-prayer");
const asrAdhan_timing = document.getElementById("asr-adhan");
const asrIqama_timing = document.getElementById("asr-iqama");

const maghribPrayer_label = document.getElementById("maghrib-prayer");
const maghribAdhan_timing = document.getElementById("maghrib-adhan");
const maghribIqama_timing = document.getElementById("maghrib-iqama");

const ishaPrayer_label = document.getElementById("isha-prayer");
const ishaAdhan_timing = document.getElementById("isha-adhan");
const ishaIqama_timing = document.getElementById("isha-iqama");

const timeUntilNextPrayer_Label = document.getElementById("nextTime");

const hijriTime_label = document.getElementById("hirjiDate");

// prayer List

let apiPrayer = [];

var currentTime = new Date().toLocaleTimeString();
var timeSignature = currentTime.slice(-4).split(".").join(""); //// this will return either AM or PM

async function getPrayer2() {
  //Getting the Date
  var str = "";
  var days = new Array("Sun", "Mon", "Tues", "Wed", "Thur", "Fri", "Sat");
  var months = new Array("Jan", "Feb", "Mar", "Apr", "May", "June", "July", "Aug", "Sept", "Oct", "Nov", "Dec");
  var now = new Date();

  str += days[now.getDay()] + ", " + months[now.getMonth()] + " " + now.getDate() + "/" + now.getFullYear().toString().slice(-2) + "";
  console.log(str);
  currentTime = new Date().toLocaleTimeString();

  //Setting the time
  document.getElementById("currentTime").innerHTML = currentTime.toUpperCase();

  //Setting the Date
  currentDate_ID.innerText = str;
  fetch("PrayerTimes22.json")
    .then(function (response) {
      return response.json();
    })

    // to access the data

    .then(function (allPrayers) {
      var now = new Date();
      const monthNumber = new Date().getMonth() + 1;
      const currentYear = new Date().getFullYear();
      var todaysMonthDay = now.getDate();
      var todaysDate = currentYear + "-" + monthNumber + "-" + todaysMonthDay;

      // current 12hr time for morning Prayer calc
      var current12_time = new Date();
      // console.log("current 12 Hr:", current12_time.toLocaleDateString("en-us", { hour: "numeric", hour12: true }));
      var current12_hour = parseInt(current12_time.toLocaleDateString("en-us", { hour: "numeric", hour12: true }).slice(-5));

      //Current 24hr time for afternoon Prayer Calculation
      var current24Hours = now.getHours();
      var currentMinutes = now.getMinutes();

      for (let prayer of allPrayers) {
        // console.log(todaysDate);
        if (prayer.Date == todaysDate) {
          var sunriseTime = prayer.Sunrise;
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

          //HIjRI

          var currentHijriTime = prayer.Hijri;

          // Morning Events

          if (timeSignature.toLowerCase() === "am") {
            // console.log("AM - The current Hour is: ", current24Hours);
            // console.log("AM - The current minutes is:", currentMinutes);

            //FaJR Indicator
            var fajrAdthan_Minutes = parseInt(prayer.Fajr.slice(-2));
            var fajrAdthan_hours = parseInt(prayer.Fajr);
            var fajrIqama_hours = parseInt(prayer.FajrIqama);
            var fajrIqama_minutes = parseInt(prayer.FajrIqama.slice(-2));

            FajrIndicator(current12_hour, currentMinutes, fajrAdthan_Minutes, fajrAdthan_hours, fajrIqama_hours, fajrIqama_minutes);

            //SunRise Indicator
            var sunRise_hours = parseInt(prayer.Sunrise);
            var sunRise_minutes = parseInt(prayer.Sunrise.slice(-2));

            SunRiseIndicator(current12_hour, currentMinutes, sunRise_hours, sunRise_minutes);
          }

          // Afternoon Events
          else if (timeSignature.toLowerCase() === "pm") {
            console.log("PM - The current Hour is: ", current12_hour);
            console.log("PM - The current minutes is:", currentMinutes);

            //Duhr Indicator
            var duhrAdthanMinutes = parseInt(prayer.Dhuhr.slice(-2));
            var duhrAdthanHours;
            var Temp_duhrAdthanHours = parseInt(prayer.Dhuhr);
            // var duhrIqama_hours = parseInt(prayer.DhuhrIqama) + 12;
            var duhrIqama_hours = parseInt(prayer.DhuhrIqama);

            var duhrIqama_minutes = parseInt(prayer.DhuhrIqama.slice(-2));

            DuhrIndicator(current12_hour, currentMinutes, duhrAdthanMinutes, duhrAdthanHours, Temp_duhrAdthanHours, duhrIqama_hours, duhrIqama_minutes);

            // Asr Indicator - Completed

            // Next Steps: CREATE 1 MINUTE COUNTDOWN TIMER BEFORE IQAMA

            var asrAdthanHours = parseInt(prayer.Asr);
            var asrAdthanMinutes = parseInt(prayer.Asr.slice(-2));
            var asrIqama_hours = parseInt(prayer.AsrIqama);
            var asrIqama_minutes = parseInt(prayer.AsrIqama.slice(-2));

            AsrIndicator(current12_hour, currentMinutes, asrAdthanHours, asrAdthanMinutes, asrIqama_hours, asrIqama_minutes);

            //Maghrib Indicator - Inprogress

            var maghribAdthanHours = parseInt(prayer.Maghrib) + 12;
            var maghribAdthanMinutes = parseInt(prayer.Maghrib.slice(-2));
            var maghribIqama_hours = parseInt(prayer.MaghribIqama) + 12;
            var maghribIqama_minutes = parseInt(prayer.MaghribIqama.slice(-2));

            MaghribIndicator(current12_hour, currentMinutes, maghribAdthanHours, maghribAdthanMinutes, maghribIqama_hours, maghribIqama_minutes);

            // Isha Prayer Hours
            var ishaAdthanHours = parseInt(prayer.Isha) + 12;
            var ishaIqamaHours = parseInt(prayer.IshaIqama) + 12;

            //Isha prayer Minutes
            var ishaAdthanMinutes = parseInt(prayer.Isha.slice(-2));
            var ishaIqamaMinutes = parseInt(prayer.IshaIqama.slice(-2));

            IshaIndicator(current12_hour, currentMinutes, ishaAdthanHours, ishaIqamaHours, ishaAdthanMinutes, ishaIqamaMinutes);
          }
        }
      }
      SetPrayerTime(currentHijriTime, sunriseTime, fajrIqama, fajrAdhan, duhrAdhan, duhrIqama, asrAdhan, asrIqama, maghribAdhan, maghribIqama, ishaAdhan, ishaIqama);
    });
}

async function SetPrayerTime(currentHijriTime, sunriseTime, fajrIqama, fajrAdhan, duhrAdhan, duhrIqama, asrAdhan, asrIqama, maghribAdhan, maghribIqama, ishaAdhan, ishaIqama) {
  hijriTime_label.innerHTML = currentHijriTime;
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
}

function FajrIndicator(current12_hour, currentMinutes, fajrAdthan_Minutes, fajrAdthan_hours, fajrIqama_minutes, fajrIqama_hours) {
  // console.log("current 12 Hr:", current12_hour);
  // console.log("current mins", currentMinutes);

  if (current12_hour >= fajrAdthan_hours && current12_hour <= fajrIqama_hours) {
    console.log("In Fajr Function");

    if (currentMinutes === fajrAdthan_Minutes) {
      console.log("Fajr Adthan");
      fajrAdhan_timing.classList.add("indicator");
      fajrAdhan_label.classList.add("indicator");
    }

    if (currentMinutes === fajrIqama_minutes) {
      console.log("Fajir Iqama");
      fajrAdhan_timing.classList.add("indicator");
      fajrAdhan_label.classList.add("indicator");
      fajrIqama_timing.style.backgroundColor = "rgba(246, 176, 176, 0.997)";
      fajrIqama_timing.style.color = "#eee";
    } else {
      console.log("No Fajr Time");
      fajrAdhan_timing.classList.remove("indicator");
      fajrAdhan_label.classList.remove("indicator");
      fajrIqama_timing.style.backgroundColor = "";
      fajrIqama_timing.style.color = "";
    }
  }

  // console.log(time.toLocaleDateString("en-us", { hour: "numeric", minute: "numeric", second: "numeric", hour12: true }));
}

function SunRiseIndicator(current12_hour, currentMinutes, sunRise_hours, sunRise_minutes) {
  if (current12_hour === sunRise_hours && currentMinutes === sunRise_minutes) {
    console.log("It's SunRise");
    sunrise_label.classList.add("indicator");
    sunrise_timing.classList.add("indicator");
  } else {
    // reset all settings
    sunrise_label.classList.remove("indicator");
    sunrise_timing.classList.remove("indicator");
  }
}

function DuhrIndicator(
  //Current time for Prayer Calculation
  current12_hour,
  currentMinutes,
  duhrAdthanMinutes,
  duhrAdthanHours,
  Temp_duhrAdthanHours,
  duhrIqama_hours,
  duhrIqama_minutes
) {
  console.log("In Duhr Func");
  // duhr Adthan can be at 12pm or 1pm.
  if (Temp_duhrAdthanHours === 12) {
    duhrAdthanHours = Temp_duhrAdthanHours;
  } else if (Temp_duhrAdthanHours > 12) {
    duhrAdthanHours = Temp_duhrAdthanHours;
  }

  //Checking if it's duhr time
  if (current12_hour >= duhrAdthanHours && current24Hours <= duhrIqama_hours) {
    if (currentMinutes === duhrAdthanMinutes) {
      console.log("duhr Adhtan");

      duhrAdhan_timing.classList.add("indicator");
      duhrPrayer_label.classList.add("indicator");
    }

    // if currentMinutes - 2 < asrIqama_minutes then display 2 minute countDown timer

    if (currentMinutes === duhrIqama_minutes) {
      console.log("duhr Iqama");
      duhrPrayer_label.classList.add("indicator");
      duhrAdhan_timing.classList.add("indicator");
      duhrIqama_timing.style.backgroundColor = "rgba(246, 176, 176, 0.997)";
      duhrIqama_timing.style.color = "#eee";
    }

    //Reset Colors back to normal
    else {
      duhrPrayer_label.classList.remove("indicator");
      duhrAdhan_timing.classList.remove("indicator");
      duhrIqama_timing.style.backgroundColor = "";
      duhrIqama_timing.style.color = "";
    }
  }
}

function AsrIndicator(current12_hour, currentMinutes, asrAdthanHours, asrAdthanMinutes, asrIqama_hours, asrIqama_minutes) {
  document.body.style.backgroundImage = "url('bgAsr.jpg')";

  console.log("In Asr Func");

  // checking if it's Asr time
  if (current12_hour >= asrAdthanHours && current12_hour <= asrIqama_hours) {
    // checking if it's Adthan time
    console.log("in asr, current mins is");
    if (currentMinutes === asrIqama_minutes) {
      console.log("Asr Adthan Time! ");
      asrAdhan_timing.classList.add("indicator");
      asrPrayer_label.classList.add("indicator");
    }

    // TODO: Create a count down timer 2 mins before iqama time.

    // checking if it's Iqama time
    if (currentMinutes === asrIqama_minutes) {
      console.log("Asr Iqama Time! ");
      asrAdhan_timing.classList.add("indicator");
      asrPrayer_label.classList.add("indicator");
      asrIqama_timing.style.backgroundColor = "rgba(246, 176, 176, 0.997)";
      asrIqama_timing.style.color = "#eee";
    }

    //Reset Colors back to normal
    else {
      // console.log("Not Asr Time");
      var totalMinutes_UntilAsr = current12_hour * 60 + currentMinutes;
      var totalAsrAdthan_Mins = asrAdthanHours * 60 + asrAdthanMinutes;

      var totalMinutes_UntilAsrIqama = current12_hour * 60 + currentMinutes;
      var totalAsrIqama_Mins = asrIqama_hours * 60 + asrIqama_minutes;
      // console.log("Total time in mins", totalMinutes_UntilAsr);
      // console.log("Total asr adthan mins", totalAsrAdthan_Mins);
      console.log("Mins until Asr: ", totalAsrAdthan_Mins - totalMinutes_UntilAsr);
      var rTime = (totalAsrAdthan_Mins - totalMinutes_UntilAsr) * 60;
      // var qTime = totalAsrIqama_Mins - totalMinutes_UntilAsrIqama;
      // console.log(qTime * 60);
      // // console.log(typeof rTime)
      countDown(rTime, "Asr aSTHAN");

      asrAdhan_timing.classList.remove("indicator");
      asrPrayer_label.classList.remove("indicator");
      asrIqama_timing.style.backgroundColor = "";

      asrIqama_timing.style.color = "";
    }
  }
}

function MaghribIndicator(current12_hour, currentMinutes, maghribAdthanHours, maghribAdthanMinutes, maghribIqama_hours, maghribIqama_minutes) {
  //changing the background when it's Maghrib time
  console.log("In Maghrib Function");
  console.log("current mins");
  // console.log("current 12hr is", current12_hour);

  //Time until Maghrib

  if (current12_hour >= maghribAdthanHours && current12_hour <= maghribIqama_hours) {
    // Changing the background if it's around Maghrib time

    document.body.style.backgroundImage = "url('bgNight.jpg')";

    // checking Adthan minutes
    if (currentMinutes === maghribAdthanMinutes) {
      console.log("Maghrib Adthan time ");
      maghribAdhan_timing.classList.add("indicator");
      maghribPrayer_label.classList.add("indicator");
    }

    // TODO: Create a count down timer 2 mins before iqama time.

    if (currentMinutes === maghribIqama_minutes) {
      console.log("Maghrib Iqama time ");

      maghribIqama_timing.style.backgroundColor = "rgba(246, 176, 176, 0.997)";
      maghribAdhan_timing.classList.add("indicator");
      maghribPrayer_label.classList.add("indicator");
      maghribIqama_timing.style.color = "#eee";
    }
    //Reset Colors back to normal
    else {
      console.log("Not Maghrib Time");
      maghribAdhan_timing.classList.remove("indicator");
      maghribPrayer_label.classList.remove("indicator");
      maghribIqama_timing.style.backgroundColor = "";
    }
  } else {
    console.log("Not Maghrib Time");
  }
}

function IshaIndicator(current12_hour, currentMinutes, ishaAdthanHours, ishaIqamaHours, ishaAdthanMinutes, ishaIqamaMinutes) {
  if (current12_hour >= ishaAdthanHours && current12_hour <= ishaIqamaHours) {
    // If it's Isha Adhan time
    if (currentMinutes === ishaAdthanMinutes) {
      ishaAdhan_timing.classList.add("indicator");
      ishaPrayer_label.classList.add("indicator");
    }
    // TODO: Create a count down timer 2 mins before iqama time.

    // if it's Isha Iqama time
    if (currentMinutes === ishaIqamaMinutes) {
      ishaAdhan_timing.classList.add("indicator");
      ishaPrayer_label.classList.add("indicator");

      ishaIqama_timing.style.backgroundColor = "rgba(246, 176, 176, 0.997)";
      ishaIqama_timing.style.color = "#eee";
    }

    // Resetting everything back to normal
    else {
      ishaAdhan_timing.classList.remove("indicator");
      ishaPrayer_label.classList.remove("indicator");

      ishaIqama_timing.style.backgroundColor = "";
      ishaIqama_timing.style.color = "";
    }
  }
}

// getPrayer2();
setInterval(getPrayer2, 1000);

// DisplayTime(timeSeconds);

function countDown(timeSeconds, prayerName) {
  const countDown = setInterval(() => {
    timeSeconds -= 1;
    // DISPLAYING the changed time seconds
    // console.log("hi");
    DisplayTime(timeSeconds, prayerName);
    // checking if the seconds equals 0

    if (timeSeconds < 0 || timeSeconds < 1) {
      //When time is up
      EndTime();
      //   Ending the second count down timer
      clearInterval(countDown);
    }
  }, 1000);
}

function DisplayTime(seconds, prayerName) {
  // converting the seconds into minutes and seconds

  const mins = Math.floor(seconds / 60);
  const secs = Math.floor(seconds % 60);

  // adding the leading zeros for the mis and secs
  timeUntilNextPrayer_Label.innerHTML = `${prayerName} is in

  ${mins < 10 ? "0" : ""}${mins}:${secs < 10 ? "0" : ""}${secs}`;
}

function EndTime() {
  timeUntilNextPrayer_Label.innerHTML = "IQAMA TIME";
}
