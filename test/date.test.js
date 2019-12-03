'use strict'

const assert = require('chai').assert;
const date = require('../lib/date.js');

describe('date', () => {
    it('numberTo2chars', () => {
        let str1 = date.numberTo2chars(8);
        assert.equal(str1, '08');

        let str2 = date.numberTo2chars(64);
        assert.equal(str2, '64');

        let str3 = date.numberTo2chars(512);
        assert.equal(str3, '512');
    });
});
