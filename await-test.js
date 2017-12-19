const assert = require('assert');

const hello = require('./await-hello');

describe('#async hello', () => {
    describe('#asyncCalculate()', () => {
        // function(done) {}

        it('#async function', async () => {
            let r = await hello();
            assert.strictEqual(r, 15);
        });


    });
});