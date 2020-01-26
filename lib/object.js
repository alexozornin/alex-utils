'use strict'

/**
 * Clones all properties of added object to main object recursively ignoring already cloned refs
 * @param {Set<any>} refs
 * @param {object} mainObj
 * @param {object} addedObj
 * @param {object} [options]
 * @param {boolean} options.cloneOwnProperties
 */
function deepAppendToObjectSubs(refs, mainObj, addedObj, options = {
    cloneOwnProperties: false
}) {
    refs.add(addedObj);
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
            if (refs.has(addedObj[prop])) {
                continue;
            }
            if (typeof mainObj[prop] != 'object') {
                if (Array.isArray(addedObj[prop])) {
                    mainObj[prop] = [];
                }
                else {
                    mainObj[prop] = {};
                }
            }
            deepAppendToObjectSubs(refs, mainObj[prop], addedObj[prop], options);
        }
        else {
            mainObj[prop] = addedObj[prop];
        }
    }
}

/**
 * Clones all properties of added object to main object recursively ignoring circular structures
 * @param {object} mainObj
 * @param {object} addedObj
 * @param {object} [options]
 * @param {boolean} options.cloneOwnProperties
 */
function deepAppendToObject(mainObj, addedObj, options = {
    cloneOwnProperties: false
}) {
    deepAppendToObjectSubs(new Set(), mainObj, addedObj, options);
}

/**
 * Returns an independant clone of an object ignoring circular structures
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
