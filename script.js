document.getElementById("eventForm").addEventListener("submit", function(e) {
  e.preventDefault();

  const eventName = document.getElementById("eventName").value;
  const eventDate = new Date(document.getElementById("eventDate").value).getTime();

  if (eventName && eventDate) {
    addCountdown(eventName, eventDate);
  }

  // Clear form fields
  document.getElementById("eventName").value = '';
  document.getElementById("eventDate").value = '';
});

function addCountdown(eventName, eventDate) {
  const eventCountdowns = document.getElementById("eventCountdowns");

  // Create the countdown card
  const countdownCard = document.createElement("div");
  countdownCard.classList.add("countdown-card", "p-3", "mb-3");

  countdownCard.innerHTML = `
    <h3>${eventName}</h3>
    <div class="countdown">
      <div><span class="days">0</span> Days</div>
      <div><span class="hours">0</span> Hours</div>
      <div><span class="minutes">0</span> Minutes</div>
      <div><span class="seconds">0</span> Seconds</div>
    </div>
    <button class="btn btn-danger btn-sm delete-event">Delete</button>
  `;

  // Append countdown card to the list
  eventCountdowns.appendChild(countdownCard);

  // Update countdown every second
  const interval = setInterval(function() {
    const now = new Date().getTime();
    const timeDifference = eventDate - now;

    if (timeDifference < 0) {
      clearInterval(interval);
      countdownCard.querySelector('.countdown').innerHTML = "Event has passed!";
    } else {
      const days = Math.floor(timeDifference / (1000 * 60 * 60 * 24));
      const hours = Math.floor((timeDifference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const minutes = Math.floor((timeDifference % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((timeDifference % (1000 * 60)) / 1000);

      countdownCard.querySelector('.days').textContent = days;
      countdownCard.querySelector('.hours').textContent = hours;
      countdownCard.querySelector('.minutes').textContent = minutes;
      countdownCard.querySelector('.seconds').textContent = seconds;
    }
  }, 1000);

  // Add delete function
  countdownCard.querySelector('.delete-event').addEventListener('click', function() {
    clearInterval(interval);
    countdownCard.remove();
  });
}
