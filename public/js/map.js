let map, currentLocationMarker;

// Initialisation de la carte centrée sur Charleroi
function initMap() {
    map = L.map('map').setView([50.411461, 4.44424], 13); // Coordonnées de Charleroi

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '© OpenStreetMap contributors',
        maxZoom: 19
    }).addTo(map);
}

async function geocodeAddress(address) {
    const response = await fetch(`https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(address)}`);
    const data = await response.json();

    if (data && data.length > 0) {
        return {
            lat: parseFloat(data[0].lat),
            lon: parseFloat(data[0].lon),
        };
    } else {
        throw new Error('Adresse introuvable');
    }
}

function addGeofencingZone(lat, lon, radius, save = true) {
    const circle = L.circle([lat, lon], {
        color: 'red',
        fillColor: '#f03',
        fillOpacity: 0.5,
        radius: document.getElementById('radius').value,
    }).addTo(map);

    map.setView([lat, lon], 15);

    if (save) {
        saveZonesToLocalStorage(lat, lon, radius);
    }
}

function saveZonesToLocalStorage(lat, lon, radius) {
    const zones = JSON.parse(localStorage.getItem('geofencingZones')) || [];
    zones.push({ lat, lon, radius });
    localStorage.setItem('geofencingZones', JSON.stringify(zones));
}

// Mise à jour de la position du téléphone
async function updatePhoneLocation(phoneNumber) {
    try {
        const response = await fetch('/api/real-location', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ phoneNumber })
        });

        if (!response.ok) throw new Error('Erreur de récupération des données');

        const { latitude, longitude } = await response.json();
        updateMarker(latitude, longitude);
    } catch (error) {
        console.error('Erreur:', error);
        alert('Erreur lors de la localisation');
    }
}

function loadZonesFromLocalStorage() {
    const zones = JSON.parse(localStorage.getItem('geofencingZones')) || [];
    zones.forEach(zone => {
        addGeofencingZone(zone.lat, zone.lon, zone.radius, false);
    });
}

document.getElementById('geofencing-form').addEventListener('submit', async (e) => {
    e.preventDefault();

    const address = document.getElementById('address-input').value;
    const radius = parseFloat(document.getElementById('radius').value);
    const phoneNumber = document.getElementById('phoneNumber').value;

    if (!address || isNaN(radius) || !phoneNumber) {
        alert('Veuillez remplir tous les champs requis.');
        return;
    }

    try {

        const { lat, lon } = await geocodeAddress(address);


        const data = {
            latitude: lat,
            longitude: lon,
            radius: radius,
            phoneNumber: phoneNumber,
        };


        const response = await fetch('http://localhost:3000/api/geofencing', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        });

        const result = await response.json();

        if (response.ok) {
            alert(`Zone ajoutée avec succès : ${result.subscriptionId}`);
            addGeofencingZone(lat, lon, radius);
        } else {
            throw new Error(result.error || "Erreur lors de l'ajout de la zone");
        }
    } catch (error) {
        console.error('Erreur:', error);
        alert('Erreur lors de la localisation');
    }
}

// Mise à jour du marqueur sur la carte
function updateMarker(lat, lon) {
    if (currentLocationMarker) {
        currentLocationMarker.remove();
    }

    currentLocationMarker = L.marker([lat, lon])
        .addTo(map)
        .bindPopup(`<b>Position du téléphone</b><br>Lat: ${lat}<br>Lon: ${lon}`)
        .openPopup();

    map.setView([lat, lon], 15);
}

/ Initialisation
document.addEventListener('DOMContentLoaded', () => {
    initMap();

    // Gestion du formulaire de localisation
    const locationForm = document.getElementById('locationForm');
    locationForm?.addEventListener('submit', async (e) => {
        e.preventDefault();
        const phoneNumber = document.getElementById('phoneNumber').value;
        await updatePhoneLocation(phoneNumber);
    });
});

loadZonesFromLocalStorage();
