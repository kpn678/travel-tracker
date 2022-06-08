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

});
