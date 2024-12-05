// const map = L.map('map').setView([50.411461, 4.44424], 15);
//
// let navigation = document.getElementById('map');
//
// L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
//     maxZoom: 19,
//     attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
// }).addTo(map);
//
// let marker = L.marker([50.411461, 4.44424]).addTo(map);
// marker.bindPopup("<b>Hello world!</b><br>Charleroi capitale du monde").openPopup();
//
// let circle = L.circle([50.411461, 4.44424], {
//     color: 'red',
//     fillColor: '#f03',
//     fillOpacity: 0.2,
//     radius: 200
// }).addTo(map);
// circle.bindPopup("La ZOZ");


const addressInput = document.getElementById('address-input');
const addZoneBtn = document.getElementById('add-zone-btn');
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


function addGeofencingZone(lat, lon, save=true) {

    const zoneRadius = 50;
    const circle = L.circle([lat, lon], {
        color: 'red',
        fillColor: '#f03',
        fillOpacity: 0.5,
        radius: zoneRadius
    }).addTo(map);


    map.setView([lat, lon], 15);

    if (save) {saveZonesToLocalStorage(lat, lon, zoneRadius)}
}

function saveZonesToLocalStorage(lat, lon, radius) {

    const zones = JSON.parse(localStorage.getItem('geofencingZones')) || [];
    zones.push({ lat, lon, radius });
    localStorage.setItem('geofencingZones', JSON.stringify(zones));
}

function loadZonesFromLocalStorage() {
    const zones = JSON.parse(localStorage.getItem('geofencingZones')) || [];
    zones.forEach(zone => {
        addGeofencingZone(zone.lat, zone.lon, false); // Ne pas resauvegarder
    });
}

addZoneBtn.addEventListener('click', async () => {
    const address = addressInput.value;
    if (!address) {
        alert('Veuillez entrer une adresse valide.');
        return;
    }

    try {
        const { lat, lon } = await geocodeAddress(address);
        addGeofencingZone(lat, lon);


        console.log('Zone ajoutée:', { lat, lon });

    } catch (error) {
        alert(`Erreur : ${error.message}`);
    }
});

loadZonesFromLocalStorage();