class Traveler {
  constructor(travelerObj) {
    this.id = travelerObj.id;
    this.name = travelerObj.name;
    this.travelerType = travelerObj.travelerType;
    this.allTrips = [];
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

  getAllTrips(tripsData) {
    tripsData.forEach(trip => {
      if (this.id === trip.userID) {
        this.allTrips.push(trip);
      };
    });
    return this.allTrips;
  };
  
};

export default Traveler;
