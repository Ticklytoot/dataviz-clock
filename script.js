$(document).ready(function () {

  // -------------------------
  // CLOCK
  // -------------------------

  let use24Hour = false;
  let showLongDate = false;
  let customMessage = false;

  const clockMessages = [
    "You're doing better than you think ♡",
    "Take a little break and enjoy the moment ✿",
    "Keep creating beautiful things!",
    "A little progress is still progress ✧",
    "Make today your own!"
  ];

  function displayTime() {
    let now = new Date();
    let hours = now.getHours();
    let period;

    // Change the greeting depending on the time
    if (hours < 12) {
      period = "morning";
    } else if (hours < 18) {
      period = "afternoon";
    } else {
      period = "evening";
    }

    // Update the greeting when the time of day changes
    if (period !== currentPeriod) {
      currentPeriod = period;
      customMessage = false;

      if (period === "morning") {
        $("#clock-greeting").text("Good morning!");
        $("#clock-message").text("A fresh start to a new day.");
      } else if (period === "afternoon") {
        $("#clock-greeting").text("Good afternoon!");
        $("#clock-message").text("Hope your day is going well.");
      } else {
        $("#clock-greeting").text("Good evening!");
        $("#clock-message").text("Time to slow down and relax.");
      }
    }

    // Display the time
    let time = now.toLocaleTimeString("en-US", {
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
      hour12: !use24Hour
    });

    $("#clock-time").text(time);

    // Display the date
    if (showLongDate) {
      $("#clock-date").text(
        now.toLocaleDateString("en-US", {
          weekday: "long",
          month: "long",
          day: "numeric",
          year: "numeric"
        })
      );
    } else {
      $("#clock-date").text(
        now.toLocaleDateString("en-US")
      );
    }

    // Change the clock card color depending on the time
    if (period === "morning") {
      $(".clock-card").css("background-color", "#f1e6ff");
    } else if (period === "afternoon") {
      $(".clock-card").css("background-color", "#e9dcfa");
    } else {
      $(".clock-card").css("background-color", "#ded0f0");
    }
  }

  let currentPeriod = "";

  // Run the clock every second
  displayTime();
  setInterval(displayTime, 1000);

  // Click the time to switch between 12-hour and 24-hour format
  $("#clock-time").on("click", function () {
    use24Hour = !use24Hour;
    $(this).css("font-size", use24Hour ? "2.2rem" : "2rem");
    displayTime();
  });

  // Click the date to change its format
  $("#clock-date").on("click", function () {
    showLongDate = !showLongDate;
    displayTime();
  });

  // Click the star to get a random message
  $("#clock-star").on("click", function () {
    let randomIndex = Math.floor(Math.random() * clockMessages.length);

    $("#clock-message").text(clockMessages[randomIndex]);
    customMessage = true;

    $(this).text("♡");
  });


  // -------------------------
  // ABOUT AND PROJECT CARDS
  // -------------------------

  function toggleCard(card) {
    $(card).toggleClass("active");

    let isExpanded = $(card).hasClass("active");

    $(card).attr("aria-expanded", isExpanded);
  }

  // Click a card to reveal more information
  $(".about-card, .project-card").on("click", function () {
    toggleCard(this);
  });

  // Allow cards to work with the keyboard too
  $(".about-card, .project-card").on("keydown", function (event) {
    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      toggleCard(this);
    }
  });


  // -------------------------
  // PROJECT CHART
  // -------------------------

  const chartCanvas = document.getElementById("interestChart");

  if (chartCanvas) {
    new Chart(chartCanvas, {
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
  }


  // -------------------------
  // SURPRISE BUTTON
  // -------------------------

  const surpriseMessages = [
    "You found a little bit of sparklessss! ✨",
    "Keep being creative, baddie! ♡",
    "Every project starts with a lot of caffeine and doomscrolling.",
    "Sending you a little virtual hug! ✿",
    "Don't forget to take a break!"
  ];

  $("#surprise-button").on("click", function () {
    let randomIndex = Math.floor(
      Math.random() * surpriseMessages.length
    );

    $("#surprise-message").text(
      surpriseMessages[randomIndex]
    );

    // Make the button change size when clicked
    $(this).css("transform", "scale(1.08)");

    setTimeout(function () {
      $("#surprise-button").css("transform", "scale(1)");
    }, 200);
  });

});


// Update the clock every second
setInterval(displayTime, 1000);

