'use strict'

const mathUtils = require('./math.js');

/**
 * Returns random buffer or string
 * @param {number} minLength
 * @param {number} maxLength
 * @param {string} [encoding]
 * @returns {Buffer | string}
 */
function randomBuffer(minLength, maxLength, encoding) {
    let data = [];
    let length = mathUtils.randomIntBetween(minLength, maxLength);
    for (let i = 0; i < length; i++) {
        data[i] = mathUtils.randomInt(256);
    }
    let buffer = Buffer.from(data);
    if (encoding) {
        return buffer.toString(encoding);
    }
    return buffer;
}

module.exports = {
    randomBuffer
};
