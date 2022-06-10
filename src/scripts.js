//Imports
import './css/styles.css';

import { getAll } from "./apiCalls.js";

import Traveler from "./Traveler";

//Global Variables
let travelerData, tripData, destinationData;

//Query Selectors
const homeButton = document.querySelector('.home-button');
const pastButton = document.querySelector('.past-trips-button');
const presentButton = document.querySelector('.present-trips-button');
const futureButton = document.querySelector('.future-trips-button');
const pendingButton = document.querySelector('.pending-trips-button');
const homePage = document.querySelector('.home-page');
const pastPage = document.querySelector('.past-page');
const presentPage = document.querySelector('.present-page');
const futurePage = document.querySelector('.future-page');
const pendingPage = document.querySelector('.pending-page');

//Functions
const loadData = () => {
  getAll().then(data => {
    travelerData = data[0];
    tripData = data[1];
    destinationData = data[2];
    renderData();
    })
    .catch((error) => console.log(`There has been an error! ${error}`));
};

const renderData = () => {
  const randomTravelerObj = travelerData.travelers[Math.floor(Math.random() * travelerData.travelers.length)];
  const randomTraveler = new Traveler(randomTravelerObj);
  const trips = tripData.trips;
  const destinations = destinationData.destinations;
};

const show = (element) => {
  element.classList.remove('hidden');
};

const hide = (element) => {
  element.classList.add('hidden');
};

const displayHome = () => {
  show(homePage);
  hide(pastPage);
  hide(presentPage);
  hide(futurePage);
  hide(pendingPage);
};

const displayPast = () => {
  hide(homePage);
  show(pastPage);
  hide(presentPage);
  hide(futurePage);
  hide(pendingPage);
};

const displayPresent = () => {
  hide(homePage);
  hide(pastPage);
  show(presentPage);
  hide(futurePage);
  hide(pendingPage);
};

const displayFuture = () => {
  hide(homePage);
  hide(pastPage);
  hide(presentPage);
  show(futurePage);
  hide(pendingPage);
};

const displayPending = () => {
  hide(homePage);
  hide(pastPage);
  hide(presentPage);
  hide(futurePage);
  show(pendingPage);
};

//Event Listeners
window.addEventListener("load", loadData);
homeButton.addEventListener('click', displayHome);
pastButton.addEventListener('click', displayPast);
presentButton.addEventListener('click', displayPresent);
futureButton.addEventListener('click', displayFuture);
pendingButton.addEventListener('click', displayPending);
