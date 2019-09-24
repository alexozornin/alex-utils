'use strict'

const ZoneDate = require('./date/ZoneDate.js');

/**
 * Converts number into a string with at least 2 characters
 * @param {number} num 
 */
function numberTo2chars(num) {
    return num < 10 ? `0${num}` : `${num}`;
}

module.exports = {
    ZoneDate,
    numberTo2chars
}
