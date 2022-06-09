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
  };
  //Methods:
  //link trip to userID
  //link trip to destinationID
  //calculate cost using travelers and duration with estimates in Destination
  //list dates of trip using date and duration
};

export default Trip;
