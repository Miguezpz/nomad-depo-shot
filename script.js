document.addEventListener('DOMContentLoaded', () => {
    const inputElement = document.getElementById('lastShotDate');
    const buttonElement = document.getElementById('calculateBtn');
    const resultContainer = document.getElementById('resultContainer');

    // Restrict date input to prevent future dates
    const todayISO = new Date().toISOString().split('T')[0];
    inputElement.setAttribute('max', todayISO);

    // Allow pressing "Enter" instead of clicking the button
    inputElement.addEventListener('keypress', function (e) {
        if (e.key === 'Enter') {
            calculateDepoDates();
        }
    });

    buttonElement.addEventListener('click', calculateDepoDates);

    function calculateDepoDates() {
        const dateValue = inputElement.value;
        
        // If user clears the input and presses Enter/Calculate, hide previous result
        if (!dateValue) {
            resultContainer.style.display = 'none';
            alert("Please select the date of the last injection.");
            return;
        }

        // Use "T00:00:00" to avoid timezone offset issues
        const lastShotDate = new Date(dateValue + 'T00:00:00');
        
        // Calculations based on Depo-Provera calendar (11 to 13 weeks flexibility)
        const minDays = 77; // 11 weeks in days
        const maxDays = 91; // 13 weeks in days
        
        const minDate = new Date(lastShotDate.getTime() + (minDays * 24 * 60 * 60 * 1000));
        const maxDate = new Date(lastShotDate.getTime() + (maxDays * 24 * 60 * 60 * 1000));
        
        // Current date truncated to midnight for fair comparison
        const today = new Date();
        today.setHours(0, 0, 0, 0);

        // Date format (Example: Mar 19, 2026 - US Format: Month Day, Year)
        const options = { month: 'short', day: 'numeric', year: 'numeric' };
        const minDateStr = minDate.toLocaleDateString('en-US', options);
        const maxDateStr = maxDate.toLocaleDateString('en-US', options);

        resultContainer.style.display = 'block';

        // Scheduling logic
        if (today > maxDate) {
            // Window Time Expired
            resultContainer.className = 'result-box error';
            resultContainer.innerHTML = `
                <h3>⚠️ Time Window Expired</h3>
                <p>The patient missed their injection window (deadline was <strong>${maxDateStr}</strong>).</p>
                <p><strong>💡 Treatment must be restarted.</strong></p>
                <hr>
                <p><strong>Instructions for Agent:</strong></p>
                <ul>
                    <li><strong>Schedule with:</strong> PCP (Primary Care Provider).</li>
                    <li><strong>Appointment Type:</strong> OV/FU 15 minutes.</li>
                    <li><strong>Reason:</strong> Initial Depo Follow-Up</li>
                </ul>
            `;
        } else {
            // On time (or future valid window)
            resultContainer.className = 'result-box success';
            resultContainer.innerHTML = `
                <h3>✅ Next Injection Window</h3>
                <p>The next injection must be scheduled between:</p>
                <p><strong>${minDateStr}</strong> and <strong>${maxDateStr}</strong></p>
                <hr>
                <p><strong>Instructions for Agent (Depo Follow-Up):</strong></p>
                <ul>
                    <li><strong>Appointment Type:</strong> 30M-FP (Family Planning Education).</li>
                    <li><strong>Reason:</strong> Depo Follow-Up.</li>
                    <li><strong>Schedule with:</strong> PCP or Dalila. <strong>(Karen DOES NOT perform Depo follow-ups).</strong></li>
                    <li><strong>Internal Note:</strong> Dalila will convert this appointment into a 15M-FP.</li>
                </ul>
            `;
        }
    }
});