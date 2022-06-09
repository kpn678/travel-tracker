class Destination {
  constructor(destinationObj) {
    this.id = destinationObj.id;
    this.destination = destinationObj.destination;
    this.estimatedLodgingCostPerDay = destinationObj.estimatedLodgingCostPerDay;
    this.estimatedFlightCostPerPerson = destinationObj.estimatedFlightCostPerPerson;
    this.image = destinationObj.image;
    this.alt = destinationObj.alt;
  };
};

export default Destination;
