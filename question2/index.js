const readline = require('readline');

function quicksort(array) {
    if (array.length <= 1) {
        return array;
    } else {
        const pivotIndex = Math.floor(array.length / 2);
        const pivot = array[pivotIndex];
        const left = array.filter(element => element < pivot);
        const right = array.filter(element => element > pivot);
        const equal = array.filter(element => element === pivot);
        return quicksort(left).concat(equal, quicksort(right));
    }
}

function getUserInput() {
    return new Promise((resolve) => {
        const rl = readline.createInterface({
            input: process.stdin,
            output: process.stdout
        });

        rl.question('Enter numbers separated by spaces (max. 10): ', (userInput) => {
            const userArray = userInput.split(' ').map(Number);

            if (userArray.length <= 10) {
                rl.close();
                const result = quicksort(userArray);
                console.log('\x1b[32m', `Sorted array: ${result}`);
                console.log('\x1b[32m', `Your array: ${userArray}`);
                resolve();
            } else {
                console.log('\x1b[31m', '⚠ You entered more than 10 numbers');
                rl.close();
                resolve();
            }
        });
    });
}

module.exports = {
    quicksort,
    getUserInput
};

// Using async/await to handle the asynchronous nature
async function run() {
    await getUserInput();
}

run();
