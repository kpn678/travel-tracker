import { expect } from 'chai';
import Traveler from '../src/Traveler';
import Trip from '../src/Trip';
import { destinations } from '../src/data/destinations-data';
import { travelers } from '../src/data/travelers-data';
import { trips } from '../src/data/trips-data';

describe('Traveler', () => {
  let traveler1, traveler2, traveler10, todaysDate;

  beforeEach(() => {
    traveler1 = new Traveler(travelers[0]);
    traveler2 = new Traveler(travelers[1]);
    traveler10 = new Traveler(travelers[9]);
    todaysDate = "2022/06/09";
  });

  it('should be a function', function() {
    expect(Traveler).to.be.a('function');
  });

  it('should be an instance of Traveler', () => {
    expect(traveler1).to.be.an.instanceOf(Traveler);
    expect(traveler2).to.be.an.instanceOf(Traveler);
  });

  it('should have an id', () => {
    expect(traveler1.id).to.equal(1);
    expect(traveler2.id).to.equal(2);
  });

  it('should have a name', () => {
    expect(traveler1.name).to.equal('Ham Leadbeater');
    expect(traveler2.name).to.equal('Rachael Vaughten');
  });

  it('should have a type of traveler', () => {
    expect(traveler1.travelerType).to.equal('relaxer');
    expect(traveler2.travelerType).to.equal('thrill-seeker');
  });

  it("should be able to return a traveler's first name", () => {
    expect(traveler1.returnTravelerFirstName()).to.equal('Ham');
    expect(traveler2.returnTravelerFirstName()).to.equal('Rachael');
  });

  it('should be able to return a message if a traveler has no first name', () => {
    expect(traveler10.returnTravelerFirstName()).to.equal("Oops it looks like your name is missing from our database");
  });

  it("should be able to return a list of all the traveler's trips", () => {
    expect(traveler1.listAllTrips(trips)).to.deep.equal(
      [
        {
          "id": 2,
          "userID": 1,
          "destinationID": 3,
          "travelers": 5,
          "date": "2022/10/04",
          "duration": 18,
          "status": "approved",
          "suggestedActivities": []
        },
        {
          "id": 3,
          "userID": 1,
          "destinationID": 10,
          "travelers": 4,
          "date": "2022/05/22",
          "duration": 17,
          "status": "approved",
          "suggestedActivities": []
        },
        {
          "id": 5,
          "userID": 1,
          "destinationID": 2,
          "travelers": 3,
          "date": "2022/04/30",
          "duration": 18,
          "status": "denied",
          "suggestedActivities": []
        },
        {
          "id": 8,
          "userID": 1,
          "destinationID": 9,
          "travelers": 6,
          "date": "2022/02/07",
          "duration": 4,
          "status": "approved",
          "suggestedActivities": []
        },
        {
          "id": 10,
          "userID": 1,
          "destinationID": 1,
          "travelers": 6,
          "date": "2022/06/09",
          "duration": 17,
          "status": "approved",
          "suggestedActivities": []
        }
      ]
    );
    expect(traveler2.listAllTrips(trips)).to.deep.equal(
      [
        {
          "id": 1,
          "userID": 2,
          "destinationID": 8,
          "travelers": 1,
          "date": "2022/09/16",
          "duration": 8,
          "status": "approved",
          "suggestedActivities": []
        },
        {
          "id": 4,
          "userID": 2,
          "destinationID": 6,
          "travelers": 2,
          "date": "2022/02/25",
          "duration": 10,
          "status": "pending",
          "suggestedActivities": []
        },
        {
          "id": 6,
          "userID": 2,
          "destinationID": 8,
          "travelers": 3,
          "date": "2022/06/29",
          "duration": 9,
          "status": "approved",
          "suggestedActivities": []
        },
        {
          "id": 9,
          "userID": 2,
          "destinationID": 5,
          "travelers": 5,
          "date": "2022/12/19",
          "duration": 19,
          "status": "approved",
          "suggestedActivities": []
        }
      ]
    );
  });

  it("should return a list of a traveler's pending trips", () => {
    traveler2.listAllTrips(trips);
    expect(traveler2.listPendingTrips(todaysDate)).to.deep.equal(
      [
        {
          "id": 4,
          "userID": 2,
          "destinationID": 6,
          "travelers": 2,
          "date": "2022/02/25",
          "duration": 10,
          "status": "pending",
          "suggestedActivities": []
        }
      ]
    );
  });

  it("should return an empty array if a traveler has no pending trips", () => {
    traveler1.listAllTrips(trips);
    expect(traveler1.listPendingTrips(todaysDate)).to.deep.equal([]);
  });

  it("should return a traveler's past trips", () => {
    traveler1.listAllTrips(trips);
    expect(traveler1.listPastTrips(todaysDate)).to.deep.equal(
      [
        {
          "id": 3,
          "userID": 1,
          "destinationID": 10,
          "travelers": 4,
          "date": "2022/05/22",
          "duration": 17,
          "status": "approved",
          "suggestedActivities": []
        },
        {
          "id": 8,
          "userID": 1,
          "destinationID": 9,
          "travelers": 6,
          "date": "2022/02/07",
          "duration": 4,
          "status": "approved",
          "suggestedActivities": []
        }
      ]
    );
    traveler2.listAllTrips(trips);
    expect(traveler2.listPastTrips(todaysDate)).to.deep.equal([]);
  });

  it("should return a traveler's present trips", () => {
    traveler1.listAllTrips(trips);
    expect(traveler1.listPresentTrips(todaysDate)).to.deep.equal(
      [
        {
          "id": 10,
          "userID": 1,
          "destinationID": 1,
          "travelers": 6,
          "date": "2022/06/09",
          "duration": 17,
          "status": "approved",
          "suggestedActivities": []
        }
      ]
    );
    traveler2.listAllTrips(trips);
    expect(traveler2.listPresentTrips(todaysDate)).to.deep.equal([]);
  });

  it("should return a traveler's future trips", () => {
    traveler1.listAllTrips(trips);
    expect(traveler1.listFutureTrips(todaysDate)).to.deep.equal(
      [
        {
          "id": 2,
          "userID": 1,
          "destinationID": 3,
          "travelers": 5,
          "date": "2022/10/04",
          "duration": 18,
          "status": "approved",
          "suggestedActivities": []
        },
      ]
    );
    traveler2.listAllTrips(trips);
    expect(traveler2.listFutureTrips(todaysDate)).to.deep.equal(
      [
        {
          "id": 1,
          "userID": 2,
          "destinationID": 8,
          "travelers": 1,
          "date": "2022/09/16",
          "duration": 8,
          "status": "approved",
          "suggestedActivities": []
        },
        {
          "id": 6,
          "userID": 2,
          "destinationID": 8,
          "travelers": 3,
          "date": "2022/06/29",
          "duration": 9,
          "status": "approved",
          "suggestedActivities": []
        },
        {
          "id": 9,
          "userID": 2,
          "destinationID": 5,
          "travelers": 5,
          "date": "2022/12/19",
          "duration": 19,
          "status": "approved",
          "suggestedActivities": []
        }
      ]
    );
  })

  it("should calculate the total amount a traveler has spent on trips in a year", () => {
    traveler1.listAllTrips(trips);
    expect(traveler1.calculateYearlyCost(destinations)).to.equal('$22,121.00');
    traveler2.listAllTrips(trips);
    expect(traveler2.calculateYearlyCost(destinations)).to.equal('$13,447.50');
  });

  it("should calculate 0 if a traveler has no approved trips in a year", () => {
    traveler10.listAllTrips(trips);
    expect(traveler10.calculateYearlyCost(destinations)).to.equal('$0.00');
  });
});
