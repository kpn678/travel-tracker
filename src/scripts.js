//Imports
import './css/styles.css';
import './images/passport.png';
import { getAll, postTrip } from "./apiCalls.js";

import Traveler from "./Traveler";
import Destination from './Destination';
import Trip from './Trip';

//Global Variables
let travelers, currentTraveler, currentTravelerID, destinations, trips;

//Query Selectors
const loginPage = document.querySelector('.login-page');
const usernameInput = document.querySelector('.username');
const passwordInput = document.querySelector('.password');
export const errorBox = document.querySelector('.error-box');
const loginButton = document.querySelector('.login-button');
const navButtons = document.querySelector('.nav-buttons');
const homeButton = document.querySelector('.home-button');
const homePage = document.querySelector('.home-page');
const nameWelcome = document.querySelector('.name-welcome');
const moneySpentWelcome = document.querySelector('h3');
const calendarInput = document.querySelector('.calendar-input');
const durationInput = document.querySelector('.duration-input');
const travelersInput = document.querySelector('.travelers-input');
const destinationSelection = document.querySelector('select');
const costButton = document.querySelector('.cost-estimate-button');
const submitButton = document.querySelector('.submit-button');
export const messageBox = document.querySelector('.message-box');
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
const logoutButton = document.querySelector('.logout-button');

//Functions
const getTodaysDate = () => {
  let today = new Date();
  let yyyy = today.getFullYear();
  let dd = String(today.getDate()).padStart(2, '0');
  let mm = String(today.getMonth() + 1).padStart(2, '0');
  return `${yyyy}/${mm}/${dd}`;
};

const show = (element) => {
  element.classList.remove('hidden');
};

const hide = (element) => {
  element.classList.add('hidden');
};

const verifyTraveler = () => {
  event.preventDefault();
  let username = usernameInput.value.slice(0, 8);
  currentTravelerID = usernameInput.value.slice(8);
  if (username === 'traveler' && 0 < currentTravelerID && currentTravelerID < 51 && passwordInput.value === 'travel') {
    renderData(currentTravelerID);
  } else {
    errorBox.innerText = 'Please review your username and/or password and try again!';
  };
};

const renderData = (id) => {
  getAll()
  .then(data => {
    createTraveler(data[0], id);
    getDestinations(data[1]);
    getTripsRepo(data[2]);
    getTravelerTrips(data[2]);
    generatePage();
  })
  .catch((error) => console.log(`There has been an error! ${error}`));
};

const createTraveler = (travelersData, id) => {
  travelers = travelersData.travelers.map(traveler => new Traveler(traveler));
  currentTraveler = travelers[id - 1];
};

const getDestinations = (destinationsData) => {
  destinations = destinationsData.destinations.map(destination => new Destination(destination));
};

const getTripsRepo = (tripsData) => {
  trips = tripsData.trips.map(trip => new Trip(trip));
};

const getTravelerTrips = (tripsData) => {
  currentTraveler.allTrips = [];
  currentTraveler.listAllTrips(tripsData.trips);
  currentTraveler.allTrips.sort((a, b) => {
    return new Date(b.date) - new Date(a.date);
  });
};

const generatePage = () => {
  hide(loginPage);
  show(navButtons);
  show(homePage);
  generateWelcomeMessage();
  generateDestinationChoices();
  generateGrid((currentTraveler.listPastTrips(getTodaysDate())), pastGrid);
  generateGrid((currentTraveler.listPresentTrips(getTodaysDate())), presentGrid);
  generateGrid((currentTraveler.listFutureTrips(getTodaysDate())), futureGrid);
  generateGrid((currentTraveler.listPendingTrips()), pendingGrid);
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

const generateGrid = (trips, grid) => {
  grid.innerHTML =  '';
  if (trips.length > 0) {
    trips.forEach(trip => {
      grid.innerHTML +=
      `<article class='card'>
      <img class="card-image" src=${trip.getDestination(destinations).image} alt=${trip.getDestination(destinations).alt}/>
      <section class = 'card-text'>
      <p>Location: <b>${trip.getDestination(destinations).destination}</b></p>
      <p>Departure Date: <b>${dayjs(trip.date).format('ddd, MMM D, YYYY')}</b></p>
      <p>Duration: <b>${trip.duration} days</b></p>
      <p># of Travelers: <b>${trip.travelers}</b></p>
      </section>
      </article>`;
    });
  } else {
    grid.innerHTML = `<h4>You have no trips in this category.</h4>`;
  };
};

const getEstimate = () => {
  event.preventDefault();
  if (calendarInput.value && durationInput.value && travelersInput.value && destinationInput) {
    const destinationMatch = destinations.find(destination => destination.destination === destinationSelection.value);
    const costEstimateBeforeFee = (destinationMatch.estimatedLodgingCostPerDay * durationInput.value) + (destinationMatch.estimatedFlightCostPerPerson * travelersInput.value);
    const costEstimateAfterFee = costEstimateBeforeFee + (costEstimateBeforeFee * 0.1);
    messageBox.innerText = `Your estimated trip cost with a 10% travel agent fee is $${costEstimateAfterFee.toFixed(2)}.`;
  } else {
    messageBox.innerText = 'Please fill in all boxes.'
  };
};

const createFormTripObj = () => {
  event.preventDefault();
  if (calendarInput.value && durationInput.value && travelersInput.value && destinationInput) {
    const destinationMatch = destinations.find(destination => destination.destination === destinationSelection.value);
    let tripDataObj = {
      id: trips.length + 1,
      userID: currentTraveler.id,
      destinationID: destinationMatch.id,
      travelers: parseInt(travelersInput.value),
      date: calendarInput.value.split('-').join('/'),
      duration: parseInt(durationInput.value),
      status: 'pending',
      suggestedActivities: []
    };
    postTrip(tripDataObj);
  } else {
    messageBox.innerText = 'Please fill in all boxes.'
  };
};

export const updateData = () => {
  getAll()
  .then(data => {
    clearFormInput();
    getTripsRepo(data[2]);
    getTravelerTrips(data[2]);
    generateGrid((currentTraveler.listPendingTrips()), pendingGrid);
  })
  .catch((error) => console.log(`There has been an error! ${error}`));
};

const clearFormInput = () => {
  calendarInput.value = '';
  durationInput.value = '';
  travelersInput.value = '';
  destinationInput.value = '';
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

const refreshPage = () => {
  window.location.reload();
};

//Event Listeners
loginButton.addEventListener('click', verifyTraveler);
costButton.addEventListener('click', getEstimate);
submitButton.addEventListener('click', createFormTripObj);
homeButton.addEventListener('click', displayHome);
pastButton.addEventListener('click', displayPast);
presentButton.addEventListener('click', displayPresent);
futureButton.addEventListener('click', displayFuture);
pendingButton.addEventListener('click', displayPending);
logoutButton.addEventListener('click', refreshPage);
