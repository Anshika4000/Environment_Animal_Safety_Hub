// Wildlife Sighting Explorer JS
// Handles logging, listing, and mapping wildlife sightings

let sightings = [];

document.addEventListener('DOMContentLoaded', function() {
  const sightingForm = document.getElementById('sightingForm');
  const speciesName = document.getElementById('speciesName');
  const locationInput = document.getElementById('location');
  const sightingTime = document.getElementById('sightingTime');
  const sightingList = document.getElementById('sightingList');
  const mapArea = document.getElementById('mapArea');

  // Render map (placeholder)
  function renderMap() {
    mapArea.innerHTML = 'Map will show sightings here.';
  }

  // Render sightings
  function renderSightings() {
    sightingList.innerHTML = '';
    sightings.slice(-10).reverse().forEach(s => {
      sightingList.innerHTML += `<div class='sighting-row'><strong>${s.species}</strong><span>Location: ${s.location}</span><span>Time: ${s.time}</span></div>`;
    });
    renderMap();
  }

  // Log sighting
  sightingForm.onsubmit = function(e) {
    e.preventDefault();
    const species = speciesName.value.trim();
    const location = locationInput.value.trim();
    const time = sightingTime.value;
    if (!species || !location || !time) return;
    sightings.push({ species, location, time });
    renderSightings();
    sightingForm.reset();
  };

  // Initial render
  renderSightings();
});
