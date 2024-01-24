const assert = require('assert');
const sinon = require('sinon');
const { quicksort, getUserInput } = require('./index');


//test quicksort function
describe('Quicksort', () => {
    it('should correctly sort an array in ascending order', () => {
        const unsortedArray = [3, 1, 4, 1, 5, 9, 2, 6, 5, 3, 5];
        const sortedArray = quicksort(unsortedArray);
        const expectedArray = [1, 1, 2, 3, 3, 4, 5, 5, 5, 6, 9];
        assert.deepStrictEqual(sortedArray, expectedArray);
    });

    it('should handle an empty array', () => {
        const emptyArray = [];
        assert.deepStrictEqual(quicksort(emptyArray), emptyArray);
    });
});

//test user input
describe('getUserInput', () => {
    it('should correctly handle valid user input', (done) => {
        const rlStub = sinon.stub(require('readline'), 'createInterface').returns({
            question: sinon.stub().callsArgWith(1, '1 2 3 4 5\n'),
            close: sinon.stub()
        });
        getUserInput().then(() => {
            assert.strictEqual(rlStub.calledOnce, true);
            assert.strictEqual(rlStub.getCall(0).args[0].input, process.stdin);
            assert.strictEqual(rlStub.getCall(0).args[0].output, process.stdout);
            rlStub.restore();
            done();
        }).catch(done);
    });

    it('should handle more than 10 numbers entered', (done) => {
        const rlStub = sinon.stub(require('readline'), 'createInterface').returns({
            question: sinon.stub().callsArgWith(1, '1 2 3 4 5 6 7 8 9 10 11\n'),
            close: sinon.stub()
        });
        getUserInput().then(() => {
            assert.strictEqual(rlStub.calledOnce, true);
            assert.strictEqual(rlStub.getCall(0).args[0].input, process.stdin);
            assert.strictEqual(rlStub.getCall(0).args[0].output, process.stdout);
            rlStub.restore();
            done();
        }).catch(done);
    });
});
