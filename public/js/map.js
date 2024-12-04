const map = L.map('map').setView([50.411461, 4.44424], 15);

let navigation = document.getElementById('map');

// L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png?{foo}',
//     {foo: 'bar',
//         attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'}).addTo(map);

L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19,
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
}).addTo(map);

let marker = L.marker([50.411461, 4.44424]).addTo(map);
marker.bindPopup("<b>Hello world!</b><br>Charleroi capitale du monde").openPopup();

let circle = L.circle([50.411461, 4.44424], {
    color: 'red',
    fillColor: '#f03',
    fillOpacity: 0.2,
    radius: 200
}).addTo(map);
circle.bindPopup("La ZOZ");