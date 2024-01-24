const assert = require('assert');
const { isPalindrome } = require('./index');

describe('Palindrome Test', function () {
  it('should return true', function () {
    const result = isPalindrome('Deleveled');
    assert.strictEqual(result, true);
  });

  it('should return false', function () {
    const result = isPalindrome('Hola');
    assert.strictEqual(result, false);
  });

  it('should handle empty string', function () {
    const result = isPalindrome('');
    assert.strictEqual(result, true);
  });
});
