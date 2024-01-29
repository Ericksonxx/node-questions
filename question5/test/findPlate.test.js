const assert = require('assert');
const sinon = require('sinon');
const { lookupPlateEntries } = require('../queries/findPlate');

describe('lookupPlateEntries function', () => {
  let mockUserInput;

  beforeEach(() => {
    mockUserInput = sinon.stub(require('readline-sync'), 'question');
  });

  afterEach(() => {
    sinon.restore();
  });

  it('should display entries for a valid plate number', async () => {
    mockUserInput.returns('validPlateNumber');
    await lookupPlateEntries();
  });

  it('should handle no entries for an invalid plate number', async () => {
    mockUserInput.returns('invalidPlateNumber');
    await lookupPlateEntries();
  });
});
