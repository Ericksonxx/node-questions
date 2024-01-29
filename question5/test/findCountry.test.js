const assert = require('assert');
const sinon = require('sinon');
const { searchByCountry } = require('../queries/findCountry');

describe('searchByCountry function', () => {
  let mockUserInput;

  beforeEach(() => {
    // /mock user input
    mockUserInput = sinon.stub(require('readline-sync'), 'questionInt');
  });

  afterEach(() => {
    sinon.restore();
  });

  it('should display entries for a selected country', async () => {
    mockUserInput.returns(1);
    await searchByCountry();
  });

  it('should handle an invalid choice', async () => {
    mockUserInput.returns(0);
    await searchByCountry();
  });
});
