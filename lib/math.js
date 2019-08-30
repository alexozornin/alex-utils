'use strict'

/**
 * Returns true if a number is Integer
 * @param {number} num
 */
function isInteger(num) {
    return num == Math.floor(num);
}

/**
 * Returns random int between 0 and max (not including max)
 * @param {number} max Integer number
 */
function randomInt(max = Number.MAX_SAFE_INTEGER) {
    return Math.floor(Math.random() * max);
}

/**
 * Returns random int between min and max (including min and max)
 * @param {number} min
 * @param {number} max
 */
function randomIntBetween(min = 0, max = Number.MAX_SAFE_INTEGER) {
    return min + Math.floor(Math.random() * (max - min + 1));
}

module.exports = {
    isInteger,
    randomInt,
    randomIntBetween
}
