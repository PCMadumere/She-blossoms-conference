// ========================================
// SHE BLOSSOMS '26 COUNTDOWN
// ========================================

const targetDate = new Date("2026-11-03T16:00:00+01:00").getTime();

function updateCountdown() {
    const now = new Date().getTime();
    const distance = targetDate - now;

    // ========================================
    // CONFERENCE HAS STARTED
    // ========================================
    if (distance <= 0) {
        const countdown = document.querySelector(".countdown");

        if (countdown) {
            countdown.innerHTML = `
                <div class="countdown-finished">

                    <h2>Evolve '26 is Here!</h2>

                    <p>
                        Welcome to an amazing time of worship and growth.
                    </p>
                `;
        }

        return;
    }

    // ========================================
    // CALCULATE TIME
    // ========================================

    const days = Math.floor(
        distance / (1000 * 60 * 60 * 24)
    );

    const hours = Math.floor(
        (distance % (1000 * 60 * 60 * 24)) /
        (1000 * 60 * 60)
    );

    const minutes = Math.floor(
        (distance % (1000 * 60 * 60)) /
        (1000 * 60)
    );

    const seconds = Math.floor(
        (distance % (1000 * 60)) /
        1000
    );

    // ========================================
    // DISPLAY
    // ========================================

    const daysElement = document.getElementById("days");
    const hoursElement = document.getElementById("hours");
    const minutesElement = document.getElementById("minutes");
    const secondsElement = document.getElementById("seconds");

    if (daysElement) {
        daysElement.textContent =
            String(days).padStart(2, "0");
    }

    if (hoursElement) {
        hoursElement.textContent =
            String(hours).padStart(2, "0");
    }

    if (minutesElement) {
        minutesElement.textContent =
            String(minutes).padStart(2, "0");
    }

    if (secondsElement) {
        secondsElement.textContent =
            String(seconds).padStart(2, "0");
    }
}


// ========================================
// START COUNTDOWN
// ========================================

updateCountdown();

setInterval(updateCountdown, 1000);