document.addEventListener('DOMContentLoaded', () => {
    const inputElement = document.getElementById('lastShotDate');
    const buttonElement = document.getElementById('calculateBtn');
    const resultContainer = document.getElementById('resultContainer');

    // Restringir el input de fecha para que no permita fechas en el futuro
    const todayISO = new Date().toISOString().split('T')[0];
    inputElement.setAttribute('max', todayISO);

    // Permite presionar "Enter" en lugar de hacer clic en el botón
    inputElement.addEventListener('keypress', function (e) {
        if (e.key === 'Enter') {
            calculateDepoDates();
        }
    });

    buttonElement.addEventListener('click', calculateDepoDates);

    function calculateDepoDates() {
        const dateValue = inputElement.value;
        
        // Si el usuario vacía el input y presiona Enter/Calcular, se oculta el resultado anterior
        if (!dateValue) {
            resultContainer.style.display = 'none';
            alert("Por favor, selecciona la fecha de la última inyección.");
            return;
        }

        // Se usa "T00:00:00" para evitar desajustes de zona horaria
        const lastShotDate = new Date(dateValue + 'T00:00:00');
        
        // Cálculos según el calendario de Depo-Provera (flexibilidad entre las semanas 11 y 13)
        const minDays = 77; // 11 semanas en días
        const maxDays = 91; // 13 semanas en días
        
        const minDate = new Date(lastShotDate.getTime() + (minDays * 24 * 60 * 60 * 1000));
        const maxDate = new Date(lastShotDate.getTime() + (maxDays * 24 * 60 * 60 * 1000));
        
        // Fecha actual truncada a medianoche para comparación justa
        const today = new Date();
        today.setHours(0, 0, 0, 0);

        // Formato de fechas (Ejemplo: Mar 19, 2026)
        const options = { month: 'short', day: 'numeric', year: 'numeric' };
        const minDateStr = minDate.toLocaleDateString('en-US', options);
        const maxDateStr = maxDate.toLocaleDateString('en-US', options);

        resultContainer.style.display = 'block';

        // Lógica de agendamiento
        if (today > maxDate) {
            // Pasó el Window Time
            resultContainer.className = 'result-box error';
            resultContainer.innerHTML = `
                <h3>⚠️ Ventana de Tiempo Expirada</h3>
                <p>El paciente perdió su ventana de inyección (la fecha límite era el <strong>${maxDateStr}</strong>).</p>
                <p><strong>💡 El tratamiento debe ser reiniciado.</strong></p>
                <hr>
                <p><strong>Instrucciones para el Agente:</strong></p>
                <ul>
                    <li><strong>Agendar con:</strong> PCP (Primary Care Provider).</li>
                    <li><strong>Tipo de Cita:</strong> OV/FU 15 minutes.</li>
                    <li><strong>Razón:</strong> Initial Depo Follow-Up</li>
                </ul>
            `;
        } else {
            // Está a tiempo (o en el futuro)
            resultContainer.className = 'result-box success';
            resultContainer.innerHTML = `
                <h3>✅ Ventana de Próxima Inyección</h3>
                <p>La próxima inyección debe agendarse entre:</p>
                <p><strong>${minDateStr}</strong> y <strong>${maxDateStr}</strong></p>
                <hr>
                <p><strong>Instrucciones para el Agente (Depo Follow-Up):</strong></p>
                <ul>
                    <li><strong>Tipo de Cita:</strong> 30M-FP (Family Planning Education).</li>
                    <li><strong>Razón:</strong> Depo Follow-Up.</li>
                    <li><strong>Agendar con:</strong> PCP o Dalila. <strong>(Karen NO hace seguimientos de Depo).</strong></li>
                    <li><strong>Nota Interna:</strong> Dalila convertirá esta cita a una de 15M-FP.</li>
                </ul>
            `;
        }
    }
});