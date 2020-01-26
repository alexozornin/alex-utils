'use strict'

/**
 * Returns an object mapping objects with the same key
 * @param {object[]} array
 * @param {string} key
 * @example // Grouping array of objects by key 'a'
 * let arr = [{ a: 1, b: 2}, {a: 2, b: 3}, {a: 1, b: 3}];
 * let map = groupByKey(arr, 'a');
 * // { '1': [ { a: 1, b: 2 }, { a: 1, b: 3 } ], '2': [ { a: 2, b: 3 } ] }
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
 * Returns an object mapping an object to its unique key
 * @param {object[]} array
 * @param {string} key
 * @example // Grouping array of objects by unique key 'a'
 * let arr = [{ a: 1, b: 2}, {a: 2, b: 3}];
 * let map = groupByUniqueKey(arr, 'a');
 * // { '1': { a: 1, b: 2 }, '2': { a: 2, b: 3 } }
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
