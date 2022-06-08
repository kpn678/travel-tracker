import { expect } from 'chai';
import Traveler from '../src/Traveler';
import { travelers } from '../src/data/travelers-data';

describe('Traveler', () => {
  let traveler1, traveler2, traveler10;

  beforeEach(() => {
    traveler1 = new Traveler(travelers[0]);
    traveler2 = new Traveler(travelers[1]);
    traveler10 = new Traveler(travelers[9]);
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

  it("should be able to return a message if a traveler has no first name", () => {
    expect(traveler10.returnTravelerFirstName()).to.equal("Oops it looks like your name is missing from our database");
  });
});
