import { expect } from "chai";
import Traveler from "../src/Traveler";
import { travelers } from "../src/data/travelers-data";

describe('Traveler', () => {
  let traveler1, traveler7;

  beforeEach(() => {
    traveler1 = travelers[0];
    traveler7 = travelers[6];
  });

  it('should be a function', function() {
    expect(Traveler).to.be.a('function');
  });


});
