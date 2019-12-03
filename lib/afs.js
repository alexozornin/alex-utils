'use strict'

const fs = require('fs').promises;
const path = require('path');
const pathUtil = require('./path.js');

/**
 * Returns stats if file exists and null if not
 * @param {string} filepath
 */
async function exists(filepath) {
    try {
        return await fs.stat(filepath);
    }
    catch (err) {
        if (err.code == 'ENOENT') {
            return null;
        }
        throw new Error(err);
    }
}

/**
 * Cleares a directory recursively
 * @param {string} dirpath
 */
async function clearDirRecursive(dirpath) {
    let files = await fs.readdir(dirpath);
    for (let file of files) {
        let currentPath = path.join(dirpath, file);
        let stats = await fs.stat(currentPath);
        if (stats.isDirectory()) {
            await clearDirRecursive(currentPath);
            await fs.rmdir(currentPath);
        }
        else {
            await fs.unlink(currentPath);
        }
    }
}

/**
 * Removes a directory recursively
 * @param {string} dirpath
 */
async function removeDirRecursive(dirpath) {
    await clearDirRecursive(dirpath);
    await fs.rmdir(dirpath);
}

/**
 *
 * @param {string[]} resArray
 * @param {string} dirpath
 * @param {string} subpath
 * @param {'ascii' | 'utf8' | 'utf-8' | 'utf16le' | 'ucs2' | 'ucs-2' | 'base64' | 'latin1' | 'binary' | 'hex'} [encoding]
 */
async function readdirRecursiveSubs(resArray, dirpath, subpath, encoding) {
    let currentDir = path.join(dirpath, subpath);
    let files = await fs.readdir(currentDir, encoding);
    for (let file of files) {
        let currentPath = path.join(currentDir, file);
        let stats = await fs.stat(currentPath);
        if (stats.isDirectory()) {
            await readdirRecursiveSubs(resArray, dirpath, path.join(subpath, file), encoding);
        }
        else {
            resArray.push(path.join(subpath, file));
        }
    }
}

/**
 *
 * @param {string} dirpath
 * @param {'ascii' | 'utf8' | 'utf-8' | 'utf16le' | 'ucs2' | 'ucs-2' | 'base64' | 'latin1' | 'binary' | 'hex'} [encoding]
 */
async function readDirRecursive(dirpath, encoding) {
    let resArray = [];
    await readdirRecursiveSubs(resArray, dirpath, '', encoding);
    return resArray;
}

/**
 * Creates missing directories to provide a path
 * @param {string} filepath
 * @param {string | number} [mode]
 */
async function providePath(filepath, mode) {
    let parsedPath = pathUtil.parseAndSplit(filepath);
    let currentPath = parsedPath.root;
    for (let pathItem of parsedPath.dirParts) {
        currentPath = path.join(currentPath, pathItem);
        let stats = await exists(currentPath);
        if (!stats) {
            await fs.mkdir(currentPath, mode);
        }
        else {
            if (!stats.isDirectory()) {
                throw new Error('Not a directory');
            }
        }
    }
}

module.exports = {
    exists,
    clearDirRecursive,
    removeDirRecursive,
    readDirRecursive,
    providePath
};
