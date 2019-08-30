'use strict'

const path = require('path');

/**
 * Parses and splits filepath
 * @param {string} filepath
 */
function parseAndSplit(filepath) {
    let parsedPath = path.parse(filepath);
    parsedPath.dirParts = parsedPath.dir.replace(parsedPath.root, '').split(path.sep);
    return parsedPath;
}

module.exports = {
    parseAndSplit
};
