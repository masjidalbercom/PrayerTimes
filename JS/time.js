const timeUntilNextPrayer_Label = document.getElementById("nextTime");

// adding to display
var timeSeconds;
DisplayTime(timeSeconds);

const countDown = setInterval(() => {
  timeSeconds -= 1;
  // DISPLAYING the changed time seconds
  console.log("hi");
  DisplayTime(timeSeconds);
  // checking if the seconds equals 0

  if (timeSeconds < 0 || timeSeconds < 1) {
    //When time is up
    EndTime();
    //   Ending the second count down timer
    clearInterval(countDown);
  }
}, 1000);

async function DisplayTime(seconds) {
  // converting the seconds into minutes and seconds
  console.log("hssi");

  const mins = Math.floor(seconds / 60);
  const secs = Math.floor(seconds % 60);

  // adding the leading zeros for the mis and secs
  timeUntilNextPrayer_Label.innerHTML = `

  ${mins < 10 ? "0" : ""}${mins}:${secs < 10 ? "0" : ""}${secs}`;
}

function EndTime() {
  timeUntilNextPrayer_Label.innerHTML = "IQAMA TIME";
}
