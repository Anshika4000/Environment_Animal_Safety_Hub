document.addEventListener('DOMContentLoaded', function() {
    const simulateButton = document.getElementById('simulate-btn');
    const resultDiv = document.getElementById('simulation-result');

    if (simulateButton) {
        simulateButton.addEventListener('click', function() {
            // Simple simulation: viral load increases during dormancy
            const baseLoad = 100;
            const dormancyMultiplier = 2.5; // Increased during dormancy
            const simulatedLoad = Math.round(baseLoad * dormancyMultiplier);

            resultDiv.innerHTML = `
                <h3>Simulation Result</h3>
                <p>Base viral load (active state): ${baseLoad} units</p>
                <p>Simulated viral load during winter dormancy: ${simulatedLoad} units</p>
                <p>Increase factor: ${dormancyMultiplier}x</p>
                <p><em>Note: This is a simplified model. Actual results depend on specific organisms and conditions.</em></p>
            `;
            resultDiv.style.display = 'block';
        });
    }
});