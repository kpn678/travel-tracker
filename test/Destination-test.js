import { expect } from 'chai';
import Destination from '../src/Destination';
import { destinations } from '../src/data/destinations-data';

describe('Destination', () => {
  let destination1, destination2;

  beforeEach(() => {
    destination1 = new Destination(destinations[0]);
    destination2 = new Destination(destinations[1]);
  });

  it('should be a function', () => {
    expect(Destination).to.be.a('function');
  });

  it('should be an instance of Destination', () => {
    expect(destination1).to.be.an.instanceOf(Destination);
    expect(destination2).to.be.an.instanceOf(Destination);
  });
});
