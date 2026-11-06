// Design interests chart
const ctx = document.getElementById("interestChart");

new Chart(ctx, {
  type: "bar",

  data: {
    labels: [
      "Graphic & Visual Design",
      "Creative Coding",
      "Interaction / UI",
      "Data Storytelling"
    ],

    datasets: [{
      label: "Interest level",
      data: [2, 2, 1, 2],

      backgroundColor: [
        "#9670b5",
        "#c5a9df",
        "#684a83",
        "#e5d5f5"
      ],

      borderRadius: 8
    }]
  },

  options: {
    responsive: true,

    scales: {
      y: {
        beginAtZero: true,

        ticks: {
          stepSize: 1
        }
      }
    }
  }
});


// Digital clock
function displayTime() {

  // Get the current date and time
  let now = new Date();

  let hours = now.getHours();
  let minutes = now.getMinutes();
  let seconds = now.getSeconds();

  let ampm = hours >= 12 ? "PM" : "AM";

  // Convert to 12-hour time
  hours = hours % 12 || 12;

  // Add zeros to the time
  let time =
    String(hours).padStart(2, "0") + ":" +
    String(minutes).padStart(2, "0") + ":" +
    String(seconds).padStart(2, "0") + " " + ampm;

  // Display the time and date using jQuery
  $("#clock-time").text(time);
  $("#clock-date").text(now.toDateString());

  // Change the greeting and background based on the time
  if (now.getHours() < 12) {

    $("#clock-greeting").text("Good morning ☀");
    $("#clock-message").text("A fresh start to the day.");
    $(".clock-card").css("background-color", "#f5e8ff");

  } else if (now.getHours() < 18) {

    $("#clock-greeting").text("Good afternoon ✿");
    $("#clock-message").text("Make something creative today.");
    $(".clock-card").css("background-color", "#eee5f8");

  } else {

    $("#clock-greeting").text("Good evening ✦");
    $("#clock-message").text("Time to slow down and relax.");
    $(".clock-card").css("background-color", "#e5d8f0");

  }
}

// Show the clock immediately
displayTime();

// Update the clock every second
setInterval(displayTime, 1000);

