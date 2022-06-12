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
const destinationSelection = document.querySelector('select');
const pastButton = document.querySelector('.past-trips-button');
const pastPage = document.querySelector('.past-page');
const pastGrid = document.querySelector('.past-grid');
const presentButton = document.querySelector('.present-trips-button');
const presentPage = document.querySelector('.present-page');
const presentGrid = document.querySelector('.present-grid');
const futureButton = document.querySelector('.future-trips-button');
const futurePage = document.querySelector('.future-page');
const futureGrid = document.querySelector('.future-grid');
const pendingButton = document.querySelector('.pending-trips-button');
const pendingPage = document.querySelector('.pending-page');
const pendingGrid = document.querySelector('.pending-grid');

//Functions
const renderData = () => {
  getAll()
  .then(data => {
    createTraveler(data[0]);
    getDestinations(data[1]);
    getTravelerTrips(data[2]);
    generatePage();
  })
  .catch((error) => console.log(`There has been an error! ${error}`));
};

const createTraveler = (travelersData) => {
  travelers = travelersData.travelers.map(traveler => new Traveler(traveler));
  currentTraveler = travelers[Math.floor(Math.random() * travelersData.travelers.length)];
};

const getDestinations = (destinationsData) => {
  destinations = destinationsData.destinations.map(destination => new Destination(destination));
};

const getTravelerTrips = (tripsData) => {
  currentTraveler.listAllTrips(tripsData.trips);
  currentTraveler.allTrips.sort((a, b) => {
    return new Date(b.date) - new Date(a.date);
  });
};

const generatePage = () => {
  generateWelcomeMessage();
  generateDestinationChoices();
  generatePastGrid();
  generateCurrentGrid();
  generateFutureGrid();
  generatePendingGrid();
};

const generateWelcomeMessage = () => {
  nameWelcome.innerText = `${currentTraveler.returnTravelerFirstName()}, Where Will You Go Next?`;
  moneySpentWelcome.innerText = `You have spent ${currentTraveler.calculateYearlyCost(destinations)} this year. Keep exploring!`;
};

const generateDestinationChoices = () => {
  destinations.forEach(destination => {
    const destinationChoice = document.createElement('option');
    destinationChoice.innerText = destination.destination;
    destinationChoice.value = destination.destination;
    destinationSelection.appendChild(destinationChoice);
  });
};

const generatePastGrid = () => {
  currentTraveler.listPastTrips().forEach(trip => {
    pastGrid.innerHTML +=
    `<article class='card'>
      <img class="card-image" src=${trip.getDestination(destinations).image} alt=${trip.getDestination(destinations).alt}/>
      <section class = 'card-text'>
        <p>Location: <b>${trip.getDestination(destinations).destination}</b></p>
        <p>Departure Date: <b>${trip.date}</b></p>
        <p>Duration: <b>${trip.duration} days</b></p>
        <p># of Travelers: <b>${trip.travelers}</b></p>
      </section>
    </article>`;
  });
};

const generateCurrentGrid = () => {
  currentTraveler.listCurrentTrips().forEach(trip => {
    currentGrid.innerHTML +=
    `<article class='card'>
      <img class="card-image" src=${trip.getDestination(destinations).image} alt=${trip.getDestination(destinations).alt}/>
      <section class = 'card-text'>
        <p>Location: <b>${trip.getDestination(destinations).destination}</b></p>
        <p>Departure Date: <b>${trip.date}</b></p>
        <p>Duration: <b>${trip.duration} days</b></p>
        <p># of Travelers: <b>${trip.travelers}</b></p>
      </section>
    </article>`;
  });
};

const generateFutureGrid = () => {
  currentTraveler.listFutureTrips().forEach(trip => {
    futureGrid.innerHTML +=
    `<article class='card'>
      <img class="card-image" src=${trip.getDestination(destinations).image} alt=${trip.getDestination(destinations).alt}/>
      <section class = 'card-text'>
        <p>Location: <b>${trip.getDestination(destinations).destination}</b></p>
        <p>Departure Date: <b>${trip.date}</b></p>
        <p>Duration: <b>${trip.duration} days</b></p>
        <p># of Travelers: <b>${trip.travelers}</b></p>
      </section>
    </article>`;
  });
};

const generatePendingGrid = () => {
  currentTraveler.listPendingTrips().forEach(trip => {
    pendingGrid.innerHTML +=
    `<article class='card'>
      <img class="card-image" src=${trip.getDestination(destinations).image} alt=${trip.getDestination(destinations).alt}/>
      <section class = 'card-text'>
        <p>Location: <b>${trip.getDestination(destinations).destination}</b></p>
        <p>Departure Date: <b>${trip.date}</b></p>
        <p>Duration: <b>${trip.duration} days</b></p>
        <p># of Travelers: <b>${trip.travelers}</b></p>
      </section>
    </article>`;
  });
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
window.addEventListener("load", renderData);
homeButton.addEventListener('click', displayHome);
pastButton.addEventListener('click', displayPast);
presentButton.addEventListener('click', displayPresent);
futureButton.addEventListener('click', displayFuture);
pendingButton.addEventListener('click', displayPending);
