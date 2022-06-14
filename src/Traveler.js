import Trip from './Trip';

class Traveler {
  constructor(travelerObj) {
    this.id = travelerObj.id;
    this.name = travelerObj.name;
    this.travelerType = travelerObj.travelerType;
    this.allTrips = [];
    this.pendingTrips = [];
    this.pastTrips = [];
    this.currentTrips = [];
    this.futureTrips = [];
  };

  returnTravelerFirstName() {
    if (this.name === undefined) {
      return "Oops it looks like your name is missing from our database";
    } else {
      const splitName = this.name.split(" ");
      return splitName[0];
    };
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
    this.pendingTrips = this.allTrips.filter(trip => trip.status === 'pending')
    return this.pendingTrips;
  };

  listPastTrips(today) {
    this.allTrips.forEach(trip => {
      if (trip.status === 'approved' && today > trip.date) {
        this.pastTrips.push(trip);
      };
    });
    return this.pastTrips;
  };

  listCurrentTrips(today) {
    this.allTrips.forEach(trip => {
      if (trip.status === 'approved' && today === trip.date) {
        this.currentTrips.push(trip);
      };
    });
    return this.currentTrips;
  };

  listFutureTrips(today) {
    this.allTrips.forEach(trip => {
      if (trip.status === 'approved' && today < trip.date) {
        this.futureTrips.push(trip);
      };
    });
    return this.futureTrips;
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
      {style: 'currency', currency: 'USD', minimumFractionDigits: 2}
    );
  };
};

export default Traveler;
