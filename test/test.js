const assert = require('assert');

const readFile = require('../');

describe('#async await-read-file.js', () => {
  describe('#asyncCalculate()', () => {
      it('#async function', async () => {
          let r = await readFile();
          assert.strictEqual(r, 16);
      });
  });
});
