'use strict'

/**
 * Returns an object mapping items with the same key value
 * @param {object[]} array
 * @param {string} key
 */
function groupByKey(array, key) {
    let retval = {};
    for (let obj of array) {
        if (Array.isArray(retval[obj[key]])) {
            retval[obj[key]].push(obj);
        }
        else {
            retval[obj[key]] = [obj];
        }
    }
    return retval;
}

/**
 * Returns an object mapping an item to its unique key
 * @param {object[]} array
 * @param {string} key
 */
function groupByUniqueKey(array, key) {
    let retval = {};
    for (let obj of array) {
        retval[obj[key]] = obj;
    }
    return retval;
}

module.exports = {
    groupByKey,
    groupByUniqueKey
};
