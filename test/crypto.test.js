'use strict'

const assert = require('chai').assert;
const crypto = require('../lib/crypto.js');

describe('crypto', () => {
    it('randomBuffer', () => {
        let randomBuffer = crypto.randomBuffer(5, 10);
        assert.instanceOf(randomBuffer, Buffer);
        assert.isAtLeast(randomBuffer.length, 5);
        assert.isAtMost(randomBuffer.length, 10);

        let randomString = crypto.randomBuffer(12, 12, 'latin1');
        assert.isString(randomString);
        assert.lengthOf(randomString, 12);
    });
});
