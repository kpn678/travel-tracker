//Imports
import './css/styles.css';
import './images/turing-logo.png'

import { getAll } from "./apiCalls.js";

import Traveler from "./Traveler";

//Global Variables
let travelerData, tripData, destinationData;

//Query Selectors

//Event Listeners
window.addEventListener("load", (event) => {
  loadData();
});

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
