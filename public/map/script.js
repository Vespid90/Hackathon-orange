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

const CloseButtonZone = document.getElementById('close_button_zone');
const CloseZoneLoc = document.getElementById('add_zone_loc');

CloseButtonZone.addEventListener('click', () => {
    CloseZoneLoc.style.display = 'none';
});

const CloseButtonUser = document.getElementById('close_button_user');
const CloseUserLoc = document.getElementById('add_user_loc');

CloseButtonUser.addEventListener('click', () => {
    CloseUserLoc.style.display = 'none';
});


const users = [
    { id: 1, name: 'Maxime' },
    { id: 2, name: 'Farid' },
    { id: 3, name: 'Cristelle' },
    { id: 4, name: 'Mohab' },
    { id: 5, name: 'Hugo' }
];

const userSelect = document.getElementById('user_select');

userSelect.innerHTML = '';

users.forEach(user => {
    const option = document.createElement('option');
    option.value = user.id;
    option.textContent = user.name;
    userSelect.appendChild(option);
});