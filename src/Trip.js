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
  };

  getCost(destinationData) {
    const destination = destinationData.find(datum => datum.id === this.destinationID);
    const costBeforeFee = (this.travelers * destination.estimatedFlightCostPerPerson) + (this.duration * destination.estimatedLodgingCostPerDay);
    const costAfterFee = costBeforeFee + (costBeforeFee * 0.1);
    return costAfterFee;
  };
};

export default Trip;
