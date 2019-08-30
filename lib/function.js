'use strict'

/**
 * Executes and returns retval of sync or async function
 * @param {function} func
 * @param  {...any} args
 */
async function executeSyncOrAsync(func, ...args) {
    let retval = func(...args);
    if (retval instanceof Promise) {
        retval = await retval;
    }
    return retval;
}

module.exports = {
    executeSyncOrAsync
}
