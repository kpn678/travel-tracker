//Imports
import './css/styles.css';

import { getAll } from "./apiCalls.js";

import Traveler from "./Traveler";
import Trip from './Trip';
import Destination from './Destination';

//Global Variables
let travelers, currentTraveler, destinations;

//Query Selectors
const homeButton = document.querySelector('.home-button');
const homePage = document.querySelector('.home-page');
const nameWelcome = document.querySelector('.name-welcome');
const moneySpentWelcome = document.querySelector('h3');
const pastButton = document.querySelector('.past-trips-button');
const pastPage = document.querySelector('.past-page');
const presentButton = document.querySelector('.present-trips-button');
const presentPage = document.querySelector('.present-page');
const futureButton = document.querySelector('.future-trips-button');
const futurePage = document.querySelector('.future-page');
const pendingButton = document.querySelector('.pending-trips-button');
const pendingPage = document.querySelector('.pending-page');


//Functions
const loadData = () => {
  getAll().then(data => {
    createTraveler(data[0]);
    getTravelerTrips(data[1]);
    getDestinations(data[2]);
    })
    .catch((error) => console.log(`There has been an error! ${error}`));
};

const createTraveler = (travelersData) => {
  travelers = travelersData.travelers.map(traveler => new Traveler(traveler));
  currentTraveler = travelers[Math.floor(Math.random() * travelersData.travelers.length)];
  generateNameMessage();
};

const getTravelerTrips = (tripsData) => {
  currentTraveler.listAllTrips(tripsData.trips);
  //update grids
};

const getDestinations = (destinationsData) => {
  destinations = destinationsData.destinations.map(destination => new Destination(destination));
  generateMoneySpentMessage();
};

const generateNameMessage = () => {
  nameWelcome.innerText = `${currentTraveler.returnTravelerFirstName()}, Where Will You Go Next?`;
};

const generateMoneySpentMessage = () => {
  moneySpentWelcome.innerText = `You have spent ${currentTraveler.calculateYearlyCost(destinations)} this year. Keep exploring!`;
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
