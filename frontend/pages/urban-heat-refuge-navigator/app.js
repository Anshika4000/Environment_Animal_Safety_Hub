// Urban Heat Refuge Navigator - Main JS
// Author: Ayaanshaikh12243 & Contributors
// Description: Interactive map for finding cooling centers, shaded routes, water refill points, and low-risk travel windows

// --- CONFIGURATION ---
const DEFAULT_COORDS = [40.7128, -74.0060]; // Default to New York City
const DEFAULT_ZOOM = 13;

// Example data (replace with real API/data source in production)
const coolingCenters = [
    { name: "Central Library Cooling Center", coords: [40.7122, -74.0059], address: "5th Ave & 42nd St" },
    { name: "Community Pool", coords: [40.715, -74.002], address: "123 Main St" },
    { name: "City Hall Cooling Center", coords: [40.713, -74.007], address: "City Hall Park" }
];
const waterRefillPoints = [
    { name: "Water Refill - Bryant Park", coords: [40.7536, -73.9832] },
    { name: "Water Refill - Union Square", coords: [40.7359, -73.9911] }
];
const shadedRoutes = [
    // Each route is an array of [lat, lng] points
    [ [40.7122, -74.0059], [40.713, -74.007], [40.715, -74.002] ],
    [ [40.7536, -73.9832], [40.7359, -73.9911] ]
];
const lowRiskAreas = [
    { name: "Shaded Park Area", coords: [40.714, -74.004], radius: 200 },
    { name: "Riverside Walk", coords: [40.720, -74.010], radius: 150 }
];

// --- MAP INITIALIZATION ---
let map = L.map('map').setView(DEFAULT_COORDS, DEFAULT_ZOOM);
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; OpenStreetMap contributors'
}).addTo(map);

// --- MARKERS & LAYERS ---
const coolingLayer = L.layerGroup();
const waterLayer = L.layerGroup();
const shadedLayer = L.layerGroup();
const lowRiskLayer = L.layerGroup();

coolingCenters.forEach(center => {
    const marker = L.marker(center.coords, {
        icon: L.icon({
            iconUrl: 'https://cdn-icons-png.flaticon.com/512/684/684908.png',
            iconSize: [32, 32],
            iconAnchor: [16, 32],
            popupAnchor: [0, -32]
        })
    }).bindPopup(`<b>${center.name}</b><br>${center.address}`);
    marker.on('click', () => showInfo(center.name, center.address));
    coolingLayer.addLayer(marker);
});

waterRefillPoints.forEach(point => {
    const marker = L.marker(point.coords, {
        icon: L.icon({
            iconUrl: 'https://cdn-icons-png.flaticon.com/512/2917/2917990.png',
            iconSize: [28, 28],
            iconAnchor: [14, 28],
            popupAnchor: [0, -28]
        })
    }).bindPopup(`<b>${point.name}</b>`);
    marker.on('click', () => showInfo(point.name, 'Water refill point'));
    waterLayer.addLayer(marker);
});

shadedRoutes.forEach(route => {
    const polyline = L.polyline(route, { color: '#795548', weight: 6, opacity: 0.7, dashArray: '10,10' });
    polyline.on('click', () => showInfo('Shaded Route', 'This route offers maximum shade.'));
    shadedLayer.addLayer(polyline);
});

lowRiskAreas.forEach(area => {
    const circle = L.circle(area.coords, {
        color: '#ffd600',
        fillColor: '#ffd600',
        fillOpacity: 0.3,
        radius: area.radius
    }).bindPopup(`<b>${area.name}</b><br>Low heat risk area`);
    circle.on('click', () => showInfo(area.name, 'Low heat risk area'));
    lowRiskLayer.addLayer(circle);
});

coolingLayer.addTo(map);
waterLayer.addTo(map);
shadedLayer.addTo(map);
lowRiskLayer.addTo(map);

// --- LAYER CONTROL ---
L.control.layers(null, {
    'Cooling Centers': coolingLayer,
    'Water Refill Points': waterLayer,
    'Shaded Routes': shadedLayer,
    'Low-Risk Areas': lowRiskLayer
}).addTo(map);

// --- GEOLOCATION ---
document.getElementById('locate-btn').addEventListener('click', () => {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(pos => {
            const { latitude, longitude } = pos.coords;
            map.setView([latitude, longitude], 15);
            L.marker([latitude, longitude], {
                icon: L.icon({
                    iconUrl: 'https://cdn-icons-png.flaticon.com/512/684/684908.png',
                    iconSize: [24, 24],
                    iconAnchor: [12, 24],
                    popupAnchor: [0, -24]
                })
            }).addTo(map).bindPopup('You are here!').openPopup();
        }, err => {
            alert('Unable to access location.');
        });
    } else {
        alert('Geolocation not supported.');
    }
});

// --- SEARCH (Geocoding) ---
document.getElementById('search').addEventListener('keydown', function(e) {
    if (e.key === 'Enter') {
        geocodeAddress(this.value);
    }
});

function geocodeAddress(address) {
    if (!address) return;
    fetch(`https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(address)}`)
        .then(res => res.json())
        .then(data => {
            if (data && data.length > 0) {
                const { lat, lon, display_name } = data[0];
                map.setView([parseFloat(lat), parseFloat(lon)], 15);
                L.marker([parseFloat(lat), parseFloat(lon)], {
                    icon: L.icon({
                        iconUrl: 'https://cdn-icons-png.flaticon.com/512/684/684908.png',
                        iconSize: [24, 24],
                        iconAnchor: [12, 24],
                        popupAnchor: [0, -24]
                    })
                }).addTo(map).bindPopup(`Search result:<br>${display_name}`).openPopup();
            } else {
                alert('Location not found.');
            }
        });
}

// --- TIME WINDOW FILTER (Simulated) ---
document.getElementById('time-window').addEventListener('change', function() {
    // In a real app, filter data based on time of day and risk
    showInfo('Time Window', `Showing data for: ${this.options[this.selectedIndex].text}`);
});

// --- INFO PANEL ---
function showInfo(title, content) {
    document.getElementById('info-content').innerHTML = `<b>${title}</b><br>${content}`;
}

// --- Accessibility: Keyboard Navigation ---
document.addEventListener('keydown', function(e) {
    if (e.key === 'Tab') {
        // Optionally, highlight focused controls
    }
});

// --- Responsive Enhancements ---
window.addEventListener('resize', function() {
    // Optionally, adjust map or UI on resize
});

// --- Placeholder for future features (e.g., real-time risk overlays, user feedback, etc.) ---
// ...
