'use strict'

const mathUtils = require('./math.js');

/**
 * Returns random byte
 */
function randomByte() {
    return Math.floor(Math.random() * 256);
}

/**
 * Shifts right
 * @param {number} byte 
 * @param {number} offset 
 */
function rightShift(byte, offset) {
    return (byte + offset) % 256;
}

/**
 * Shifts left
 * @param {number} byte 
 * @param {number} offset 
 */
function leftShift(byte, offset) {
    let res = byte - offset;
    return res < 0 ? res + 256 : res;
}

/**
 * Convert number into array of bytes
 * @param {number} num Integer number
 */
function numberToBytes(num) {
    let retval = [];
    while (num) {
        let { quotient, remainder } = mathUtils.intDiv(num, 256);
        retval.unshift(Math.floor(remainder));
        num = quotient;
    }
    return retval;
}

/**
 * Converts a byte into 2 hex chars
 * @param {number} byte 
 */
function byteToHex(byte) {
    let retval = (byte % 256).toString(16);
    return byte < 16 ? `0${retval}` : retval;
}

module.exports = {
    randomByte,
    rightShift,
    leftShift,
    numberToBytes,
    byteToHex
};
