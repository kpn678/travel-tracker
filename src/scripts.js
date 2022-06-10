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
  getAll()
    .then(data => {
      const [travelerData, tripData, destinationData] = data;
      const randomTravelerObj = travelerData.travelers[Math.floor(Math.random() * travelerData.travelers.length)];
      const randomTraveler = new Traveler(randomTravelerObj);
      return {randomTraveler}
    })
    .then(({randomTraveler}) => {console.log(randomTraveler)})
    .catch((error) => console.log(`There has been an error! ${error}`));
};
