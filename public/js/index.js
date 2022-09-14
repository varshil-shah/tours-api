/* eslint-disable */
import '@babel/polyfill';
import { login, logout } from './login';
import { displayMap } from './mapbox';

// DOM ELEMENTS -
const mapBox = document.getElementById('map');
const loginForm = document.querySelector('.form');
const logoutButton = document.querySelector('.nav__el--logout');

// DELEGATION -
if (mapBox) {
  const locations = JSON.parse(mapBox.dataset.locations);
  displayMap(locations);
}

if (loginForm)
  loginForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const email = document.querySelector('#email').value;
    const password = document.querySelector('#password').value;
    login(email, password);
  });

if (logoutButton) {
  logoutButton.addEventListener('click', logout);
}
