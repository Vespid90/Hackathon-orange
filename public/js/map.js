const map = L.map('map').setView([48.8566, 2.3522], 13); // Exemple : centre sur Paris

L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '© OpenStreetMap contributors'
}).addTo(map);

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
        alert(`Erreur : ${error.message}`);
    }
});

loadZonesFromLocalStorage();