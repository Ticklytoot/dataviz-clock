/* =========================
   DIGITAL CLOCK
   ========================= */

function displayTime() {

  // Get the current date and time
  let now = new Date();

  let hours = now.getHours();
  let minutes = now.getMinutes();
  let seconds = now.getSeconds();

  // Set AM or PM
  let ampm = hours >= 12 ? "PM" : "AM";

  // Convert to 12-hour time
  hours = hours % 12 || 12;

  // Format the time
  let time =
    String(hours).padStart(2, "0") + ":" +
    String(minutes).padStart(2, "0") + ":" +
    String(seconds).padStart(2, "0") + " " + ampm;

  // Display the time and date
  $("#clock-time").text(time);
  $("#clock-date").text(now.toDateString());

  // Change the greeting and background color
  if (now.getHours() < 12) {

    $("#clock-greeting").text("Good morning ☆〜（ゝ。∂）");
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

// Display the clock immediately
displayTime();

// Update the clock every second
setInterval(displayTime, 1000);


/* =========================
   PROJECT CHART
   ========================= */

// Find the chart canvas
const ctx = document.getElementById("interestChart");

// Create the chart
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

      label: "Number of Projects",

      data: [3, 1, 1, 2],

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

    plugins: {

      legend: {
        display: true
      }

    },

    scales: {

      y: {

        beginAtZero: true,

        ticks: {
          stepSize: 1
        },

        title: {
          display: true,
          text: "Number of Projects"
        }

      }

    }

  }

});



// Update the clock every second
setInterval(displayTime, 1000);

