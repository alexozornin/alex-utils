'use strict'

const { cloneObject } = require('./object.js');

/**
 * Converts error to JSON
 * @param {Error} err 
 */
function err2json(err) {
    if (typeof err == 'object') {
        return JSON.stringify(cloneObject(err, { cloneOwnProperties: true }));
    }
    return JSON.stringify(err);
}

module.exports = {
    err2json
};
