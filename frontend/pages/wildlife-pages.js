// Wildlife Pages JS
// Sample wildlife sightings and species info

const sampleSightings = [
    {
        species: "Red Fox",
        location: "Central Park, NYC",
        date: "2026-02-20 08:15",
        photo: "images/red-fox.jpg",
        notes: "Observed hunting in early morning."
    },
    {
        species: "Bald Eagle",
        location: "Lake Tahoe, CA",
        date: "2026-02-18 14:30",
        photo: "images/bald-eagle.jpg",
        notes: "Soaring above the lake, seen by multiple visitors."
    },
    {
        species: "Eastern Bluebird",
        location: "Raleigh, NC",
        date: "2026-02-19 10:00",
        photo: "images/eastern-bluebird.jpg",
        notes: "Pair nesting in backyard birdhouse."
    },
    {
        species: "White-Tailed Deer",
        location: "Rock Creek Park, DC",
        date: "2026-02-17 17:45",
        photo: "images/white-tailed-deer.jpg",
        notes: "Group grazing near trail."
    },
    {
        species: "Monarch Butterfly",
        location: "Austin, TX",
        date: "2026-02-16 12:20",
        photo: "images/monarch-butterfly.jpg",
        notes: "Migrating through wildflower patch."
    },
    // ...add 20+ more diverse sightings for sample data...
];

const speciesInfo = {
    "Red Fox": {
        description: "A small, adaptable mammal found in urban and rural areas across North America.",
        habitat: "Forests, grasslands, cities",
        diet: "Omnivore: rodents, birds, fruit",
        status: "Least Concern"
    },
    "Bald Eagle": {
        description: "Iconic bird of prey, national symbol of the USA, found near large bodies of water.",
        habitat: "Lakes, rivers, coastal regions",
        diet: "Fish, waterfowl, carrion",
        status: "Least Concern"
    },
    "Eastern Bluebird": {
        description: "Small thrush with vivid blue plumage, common in eastern North America.",
        habitat: "Open woodlands, farmlands, suburbs",
        diet: "Insects, berries",
        status: "Least Concern"
    },
    "White-Tailed Deer": {
        description: "Large herbivore, widespread in North America, recognized by its white tail.",
        habitat: "Forests, fields, urban parks",
        diet: "Grasses, leaves, twigs",
        status: "Least Concern"
    },
    "Monarch Butterfly": {
        description: "Famous for its long migration, orange and black wings, vital pollinator.",
        habitat: "Meadows, gardens, forests",
        diet: "Nectar, milkweed",
        status: "Near Threatened"
    }
    // ...add more species info as needed...
};

function renderSightings() {
    const list = document.getElementById('species-list');
    list.innerHTML = '';
    sampleSightings.forEach(s => {
        const li = document.createElement('li');
        li.className = 'sighting-card';
        li.innerHTML = `
            <strong>${s.species}</strong> <span style="color:#388e3c;">(${s.location})</span><br>
            <span style="color:#888;font-size:0.9em;">${s.date}</span><br>
            ${s.photo ? `<img src="${s.photo}" alt="${s.species}" class="sighting-photo">` : ''}
            ${s.notes ? `<div class="sighting-notes">${s.notes}</div>` : ''}
            <button class="info-btn" data-species="${s.species}">View Info</button>
        `;
        list.appendChild(li);
    });
}

document.addEventListener('click', function(e) {
    if (e.target.classList.contains('info-btn')) {
        const species = e.target.getAttribute('data-species');
        renderSpeciesInfo(species);
    }
});

function renderSpeciesInfo(species) {
    const info = speciesInfo[species];
    const content = document.getElementById('info-content');
    if (!info) {
        content.innerHTML = '<p>No information available.</p>';
        return;
    }
    content.innerHTML = `
        <h3>${species}</h3>
        <p><strong>Description:</strong> ${info.description}</p>
        <p><strong>Habitat:</strong> ${info.habitat}</p>
        <p><strong>Diet:</strong> ${info.diet}</p>
        <p><strong>Status:</strong> ${info.status}</p>
    `;
}

// Initial render
renderSightings();
