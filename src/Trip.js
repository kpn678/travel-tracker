class Trip {
  constructor(tripData) {
    this.id = tripData.id;
    this.userID = tripData.userID;
    this.destinationID = tripData.destinationID;
    this.travelers = tripData.travelers
    this.date = tripData.date;
    this.duration = tripData.duration;
    this.status = tripData.status;
    this.suggestedActivities = tripData.suggestedActivities;
    this.totalCost = '';
  };
  getDestination(destinationData) {
    const tripDestination = destinationData.find(datum => datum.id === this.destinationID);
    return tripDestination;
  };
  getTotalCost(destinationData) {
    const destination = this.getDestination(destinationData);
    const cost = (this.travelers * destination.estimatedFlightCostPerPerson) + (this.duration * destination.estimatedLodgingCostPerDay);
    this.totalCost = cost;
    return cost;
  };
};

export default Trip;
