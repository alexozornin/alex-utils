'use strict'

/**
 * Clones all properties of added object to main object recursively
 * @param {object} mainObj
 * @param {object} addedObj
 * @param {object} [options]
 * @param {boolean} options.cloneOwnProperties
 */
function deepAppendToObject(mainObj, addedObj, options = {
    cloneOwnProperties: false
}) {
    let getProps;
    if (options.cloneOwnProperties) {
        getProps = Object.getOwnPropertyNames;
    }
    else {
        getProps = Object.keys;
    }
    let props = getProps(addedObj);
    for (let prop of props) {
        if (typeof addedObj[prop] == 'object') {
            if (typeof mainObj[prop] != 'object') {
                if (Array.isArray(addedObj[prop])) {
                    mainObj[prop] = [];
                }
                else {
                    mainObj[prop] = {};
                }
            }
            deepAppendToObject(mainObj[prop], addedObj[prop], options);
        }
        else {
            mainObj[prop] = addedObj[prop];
        }
    }
}

/**
 * Returns an independant clone of an object
 * @param {object} obj
 * @param {object} [options]
 * @param {boolean} options.cloneOwnProperties
 */
function cloneObject(obj, options = {
    cloneOwnProperties: false
}) {
    let retval = {};
    deepAppendToObject(retval, obj, options);
    return retval;
}

module.exports = {
    deepAppendToObject,
    cloneObject
};
