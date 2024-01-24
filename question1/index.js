const readline = require('readline');

// check if palindrome
function isPalindrome(input) {
  const normalizedString = input.toLowerCase().replace(/[^a-z0-9]/g, '');
  return normalizedString === normalizedString.split('').reverse().join('');
}

//readline interface
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

rl.question('Enter a word to check if it\'s a palindrome: ', (userInput) => {
  rl.close();
  // log result
  const result = isPalindrome(userInput);
  if(result) {
    console.log(`"${userInput}" is a palindrome :D`)
  } else {
    console.log(`"${userInput}" is not a palindrome :'(`)
  }
});

module.exports = { isPalindrome };
