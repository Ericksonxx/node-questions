const assert = require('assert');
const sinon = require('sinon');
const { lookupCameraEntries } = require('../queries/findCamera');

describe('lookupCameraEntries function', () => {
  let mockUserInput;
  beforeEach(() => {
    mockUserInput = sinon.stub(require('readline-sync'), 'question');
  });

  afterEach(() => {
    sinon.restore();
  });

  it('should display entries for a valid camera name', async () => {
    mockUserInput.returns('validCamera');
    await lookupCameraEntries();
  });

  it('should handle no entries for an invalid camera name', async () => {
    mockUserInput.returns('invalidCamera');
    await lookupCameraEntries();
  });
});
