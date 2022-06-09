class Trip {
  constructor(tripObj) {
    this.id = tripObj.id;
    this.userID = tripObj.userID;
    this.destinationID = tripObj.destinationID;
    this.travelers = tripObj.travelers
    this.date = tripObj.date;
    this.duration = tripObj.duration;
    this.status = tripObj.status;
    this.suggestedActivities = tripObj.suggestedActivities;
    this.totalCost = '';
  };

  getDestination(destinationData) {
    const tripDestination = destinationData.find(datum => datum.id === this.destinationID);
    return tripDestination;
  };

  getCost(destinationData) {
    const destination = this.getDestination(destinationData);
    const costBeforeFee = (this.travelers * destination.estimatedFlightCostPerPerson) + (this.duration * destination.estimatedLodgingCostPerDay);
    const costAfterFee = costBeforeFee + (costBeforeFee * 0.1);
    this.totalCost = costAfterFee
    return costAfterFee;
  };
};

export default Trip;
