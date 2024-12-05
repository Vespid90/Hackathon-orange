let map, currentLocationMarker;

// Initialisation de la carte centrée sur Charleroi
function initMap() {
    map = L.map('map').setView([50.411461, 4.44424], 13); // Coordonnées de Charleroi

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '© OpenStreetMap contributors',
        maxZoom: 19
    }).addTo(map);

    // Marqueur initial sur Charleroi
    L.marker([50.411461, 4.44424])
        .addTo(map)
        .bindPopup("Charleroi")
        .openPopup();
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

// Initialisation
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