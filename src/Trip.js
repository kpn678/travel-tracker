class Trip {
  constructor(tripData, destinationData) {
    this.id = tripData.id;
    this.userID = tripData.userID;
    this.destinationID = tripData.destinationID;
    this.travelers = tripData.travelers
    this.date = tripData.date;
    this.duration = tripData.duration;
    this.status = tripData.status;
    this.suggestedActivities = tripData.suggestedActivities;
    // this.destination;
  };
  getDestination(destinationData) {
    const tripDestination = destinationData.find(datum => datum.id === this.destinationID);
    // tripDestination = this.destination;
    return tripDestination;
  }
  // getTotalCost(destinationData) {
  //
  // }
  //Methods:
  //link trip to userID
  //link trip to destinationID
  //calculate cost using travelers and duration with estimates in Destination
};

export default Trip;
