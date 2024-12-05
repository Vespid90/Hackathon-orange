const addZoneButton = document.getElementById('add_zone_button');
const addZoneLoc = document.getElementById('add_zone_loc');

addZoneButton.addEventListener('click', () => {
    addZoneLoc.style.display = 'block';
});

const addUserButton = document.getElementById('add_user_button');
const addUserLoc = document.getElementById('add_user_loc');

addUserButton.addEventListener('click', () => {
    addUserLoc.style.display = 'block';
});