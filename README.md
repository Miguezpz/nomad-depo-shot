# Depo Shot Scheduler

A lightweight, static web application designed to help clinic staff quickly calculate the next administration window for Depo-Provera (Depo Shot) injections. 

Instead of manually counting weeks on a calendar, the staff can input the date of the patient's last injection. The app calculates the safe 11 to 13-week window and provides specific internal scheduling instructions based on whether the patient is on time or past due.

## Features

*   **Accurate Window Calculation:** Automatically calculates the strict 77 to 91-day timeframe following standard Depo-Provera guidelines.
*   **Smart Scheduling Logic:** Displays specific instructions for the scheduling team:
    *   **On time:** Instructs staff to book a 30M-FP appointment (converted to 15M-FP) with an available provider (excluding specific staff members).
    *   **Past due:** Alerts the user that the window expired and prompts to book an initial OV/FU appointment with a PCP to restart treatment.
*   **Responsive UI:** Fully optimized for both desktop and mobile screens.
*   **No Setup Required:** 100% client-side vanilla HTML, CSS, and JavaScript. No database or server needed.

## How to Use

1. Clone or download the repository.
2. Open the `index.html` file in any modern web browser.
3. Select the date of the patient's last injection.
4. Press **Enter** or click **Calculate**.
5. Follow the generated instructions to schedule the appointment.

## Tech Stack

*   HTML5
*   CSS3 (with variables and media queries for responsiveness)
*   Vanilla JavaScript (DOM manipulation and Date object logic)