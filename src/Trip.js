import Destination from './Destination';

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

  getDestination(destinationData) {
    const destinationObj = destinationData.find(datum => datum.id === this.destinationID);
    return new Destination(destinationObj);
  }

  getCost(destinationData) {
    const destination = this.getDestination(destinationData);
    const costBeforeFee = (this.travelers * destination.estimatedFlightCostPerPerson) + (this.duration * destination.estimatedLodgingCostPerDay);
    const costAfterFee = costBeforeFee + (costBeforeFee * 0.1);
    return costAfterFee;
  };
};

export default Trip;
