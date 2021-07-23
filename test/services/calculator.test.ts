import { expect } from 'chai';
import { add } from '../../src/services/calculator';

describe('calculate', function() {
  it('add', function() {
    let result = add(5, 2);
    expect(result).equal(7);
  });
});