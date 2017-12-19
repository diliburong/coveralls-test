const assert = require('assert');

const sum = require('./hello');
const hello = require('./await-hello');

describe('#hello.js', () => {

    describe('#sum()', () => {
        it('sum() should return 0', () => {
            assert.strictEqual(sum(), 0);
        });

        it('sum(1) should return 1', () => {
            assert.strictEqual(sum(1), 1);
        });

        it('sum(1, 2) should return 3', () => {
            assert.strictEqual(sum(1, 2), 3);
        });

        it('sum(1, 2, 3) should return 6', () => {
            assert.strictEqual(sum(1, 2, 3), 6);
        });
    });
});

describe('#async hello', () => {
    describe('#asyncCalculate()', () => {

        it('#async function', async () => {
            let r = await hello();
            assert.strictEqual(r, 15);
        });
    });
});