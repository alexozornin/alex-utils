'use strict'

/**
 * Returns a promise resolving after X ms
 * @param {number} ms
 * @returns {undefined}
 */
function sleep(ms) {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve();
        }, +ms);
    })
}

module.exports = {
    sleep
};
