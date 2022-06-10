import Trip from './trip';

class Traveler {
  constructor(travelerObj) {
    this.id = travelerObj.id;
    this.name = travelerObj.name;
    this.travelerType = travelerObj.travelerType;
    this.allTrips = [];
    this.pendingTrips = [];
    this.pastTrips = [];
    this.currentTrips = [];
  };

  returnTravelerFirstName() {
    if (this.name === undefined) {
      return "Oops it looks like your name is missing from our database";
    } else {
      const splitName = this.name.split(" ");
      return splitName[0];
    };
  };

  getTodaysDate() {
    let today = new Date();
    let yyyy = today.getFullYear();
    let dd = String(today.getDate()).padStart(2, '0');
    let mm = String(today.getMonth() + 1).padStart(2, '0');
    return `${yyyy}/${mm}/${dd}`;
  };

  listAllTrips(tripsData) {
    tripsData.forEach(trip => {
      if (this.id === trip.userID) {
        this.allTrips.push(new Trip(trip));
      };
    });
    return this.allTrips;
  };

  listPendingTrips() {
    let tripsPending = this.allTrips.filter(trip => trip.status === 'pending')
    this.pendingTrips = tripsPending;
    return this.pendingTrips;
  };

  listPastTrips() {
    const todaysDate = this.getTodaysDate();
    this.allTrips.forEach(trip => {
      if (trip.status === 'approved' && todaysDate > trip.date) {
        this.pastTrips.push(trip);
      };
    });
    return this.pastTrips;
  };

  listCurrentTrips() {
    const todaysDate = this.getTodaysDate();
    this.allTrips.forEach(trip => {
      if (trip.status === 'approved' && todaysDate === trip.date) {
        this.currentTrips.push(trip);
      };
    });
    return this.currentTrips;
  };

  calculateYearlyCost(destinationData) {
    let today = new Date();
    let yyyy = today.getFullYear();
    const yearlyCost = this.allTrips.reduce((sum, trip) => {
      if (trip.status === 'approved' && trip.date.includes(yyyy)) {
        sum += trip.getCost(destinationData);
      };
      return sum;
    }, 0);
    return yearlyCost.toLocaleString('en-IN',
      {style: 'currency',currency: 'USD', minimumFractionDigits: 2}
    );
  };
};

export default Traveler;
