import { expect } from 'chai';
import Destination from '../src/Destination';
import Trip from '../src/Trip';
import { destinations } from '../src/data/destinations-data';
import { trips } from '../src/data/trips-data';

describe('Trip', () => {
  let trip1, trip2, trip3, trip4, trip5;

  beforeEach(() => {
    trip1 = new Trip(trips[0]);
    trip2 = new Trip(trips[1]);
    trip3 = new Trip(trips[2]);
    trip4 = new Trip(trips[3]);
    trip5 = new Trip(trips[4]);
  });

  it('should be a function', () => {
    expect(Trip).to.be.a('function');
  });

  it('should be an instance of Trip', () => {
    expect(trip1).to.be.an.instanceOf(Trip);
    expect(trip2).to.be.an.instanceOf(Trip);
  });

  it('should have a unique ID', () => {
    expect(trip1.id).to.equal(1);
    expect(trip2.id).to.equal(2);
  });

  it('should have an ID that links it to the traveler', () => {
    expect(trip1.userID).to.equal(2);
    expect(trip2.userID).to.equal(1);
  });

  it('should have an ID that links it to the destination', () => {
    expect(trip1.destinationID).to.equal(8);
    expect(trip2.destinationID).to.equal(3);
  });

  it('should include the number of travelers', () => {
    expect(trip1.travelers).to.equal(1);
    expect(trip2.travelers).to.equal(5);
  });

  it('should have the start date', () => {
    expect(trip1.date).to.equal("2022/09/16");
    expect(trip2.date).to.equal("2022/10/04");
  });

  it('should include the duration', () => {
    expect(trip1.duration).to.equal(8);
    expect(trip2.duration).to.equal(18);
  });

  it('should include the approval status', () => {
    expect(trip1.status).to.equal('approved');
    expect(trip4.status).to.equal('pending');
    expect(trip5.status).to.equal('denied');
  });

  it('should include a list of suggested activities', () => {
    expect(trip1.suggestedActivities).to.deep.equal([]);
  });
});
