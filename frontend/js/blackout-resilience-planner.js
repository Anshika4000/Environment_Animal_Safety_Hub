// Neighborhood Blackout Resilience Planner JS
// Handles map, vulnerability zones, tools, and guidance

document.addEventListener('DOMContentLoaded', () => {
    initBlackoutMap();
    renderFilters();
    renderResilienceTools();
    renderCommunityPoints();
    renderGuidance();
});

function initBlackoutMap() {
    const map = L.map('blackout-map').setView([28.6139, 77.2090], 13);
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; OpenStreetMap contributors'
    }).addTo(map);
    // Demo vulnerability blocks
    const blocks = [
        {coords: [[28.62,77.21],[28.62,77.22],[28.61,77.22],[28.61,77.21]], risk: 'high'},
        {coords: [[28.61,77.20],[28.61,77.21],[28.60,77.21],[28.60,77.20]], risk: 'medium'},
        {coords: [[28.615,77.215],[28.615,77.225],[28.605,77.225],[28.605,77.215]], risk: 'low'}
    ];
    blocks.forEach(block => {
        L.polygon(block.coords, {
            color: block.risk === 'high' ? 'red' : block.risk === 'medium' ? 'orange' : 'green',
            fillOpacity: block.risk === 'high' ? 0.4 : block.risk === 'medium' ? 0.2 : 0.1
        }).bindPopup(`<b>Block</b><br>Vulnerability: ${block.risk}`).addTo(map);
    });
}

function renderFilters() {
    const panel = document.getElementById('filters-panel');
    panel.innerHTML = `
        <h2>Filter Blocks</h2>
        <label>Vulnerability:
            <select id="risk-filter">
                <option value="all">All</option>
                <option value="high">High</option>
                <option value="medium">Medium</option>
                <option value="low">Low</option>
            </select>
        </label>
        <button id="apply-filters">Apply Filters</button>
    `;
    document.getElementById('apply-filters').onclick = () => {
        // For demo, just reload map (real: filter blocks)
        document.getElementById('blackout-map').innerHTML = '';
        initBlackoutMap();
    };
}

function renderResilienceTools() {
    const section = document.getElementById('resilience-tools');
    section.innerHTML = `
        <h2>Resilience Planning Tools</h2>
        <ul>
            <li>Backup power: solar, batteries, generators</li>
            <li>Passive and active cooling options</li>
            <li>Emergency communication plans</li>
            <li>Medicine storage safety (coolers, ice packs)</li>
        </ul>
    `;
}

function renderCommunityPoints() {
    const section = document.getElementById('community-points');
    section.innerHTML = `
        <h2>Community Support Points</h2>
        <ul>
            <li>Local communication hubs</li>
            <li>Cooling centers</li>
            <li>Medicine storage locations</li>
            <li>Volunteer support contacts</li>
        </ul>
    `;
}

function renderGuidance() {
    const section = document.getElementById('guidance-section');
    section.innerHTML = `
        <h2>Preparedness & Safety Guidance</h2>
        <ul>
            <li>Keep emergency kits and backup power ready</li>
            <li>Identify local support and communication points</li>
            <li>Plan for medicine and food storage during outages</li>
            <li>Check on vulnerable neighbors</li>
        </ul>
    `;
}
