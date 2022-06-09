import { expect } from 'chai';
import Destination from '../src/Destination';
import Trip from '../src/Trip';
import { destinations } from '../src/data/destinations-data';
import { trips } from '../src/data/trips-data';

describe('Trip', () => {
  let trip1, trip2, trip3;

  beforeEach(() => {
    trip1 = new Trip(trips[0]);
    trip2 = new Trip(trips[1]);
    trip3 = new Trip(trips[2]);
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
});
