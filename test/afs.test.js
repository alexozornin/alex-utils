'use strict'

const assert = require('chai').assert;
const afs = require('../lib/afs.js');
const fs = require('fs').promises;
const path = require('path');

const DIR_PATH = path.join(__dirname, 'test_dir');
const SUBDIR_PATH = path.join(DIR_PATH, 'subdir');
const FILE1_PATH = path.join(DIR_PATH, 'file1');
const FILE1_DATA = path.join('test1');
const FILE2_PATH = path.join(SUBDIR_PATH, 'file2');
const FILE2_DATA = path.join('test2');
const FILE3_PATH = path.join(DIR_PATH, 'path1', 'path2', 'file3');
const FILE3_DATA = path.join('test3');
const FAKE1_PATH = path.join(DIR_PATH, 'fake');
const FAKE2_PATH = path.join(SUBDIR_PATH, 'fake');
const DIR_FILES = [path.join('file1'), path.join('subdir', 'file2')];

describe('afs', () => {
    it('initializes', async () => {
        if (await afs.exists(DIR_PATH)) {
            await afs.removeDirRecursive(DIR_PATH);
        }
        await fs.mkdir(DIR_PATH);
        await fs.mkdir(SUBDIR_PATH);
        await fs.writeFile(FILE1_PATH, FILE1_DATA);
        await fs.writeFile(FILE2_PATH, FILE2_DATA);
    });

    it('exists', async () => {
        let dirStats = await afs.exists(DIR_PATH);
        assert.isNotNull(dirStats);
        assert.isObject(dirStats);
        assert.isTrue(dirStats.isDirectory());

        let subDirStats = await afs.exists(SUBDIR_PATH);
        assert.isNotNull(subDirStats);
        assert.isObject(subDirStats);
        assert.isTrue(subDirStats.isDirectory());

        let file1Stats = await afs.exists(FILE1_PATH);
        assert.isNotNull(file1Stats);
        assert.isObject(file1Stats);
        assert.isFalse(file1Stats.isDirectory());

        let file2Stats = await afs.exists(FILE2_PATH);
        assert.isNotNull(file2Stats);
        assert.isObject(file2Stats);
        assert.isFalse(file2Stats.isDirectory());

        let fake1Stats = await afs.exists(FAKE1_PATH);
        assert.isNull(fake1Stats);

        let fake2Stats = await afs.exists(FAKE2_PATH);
        assert.isNull(fake2Stats);
    });

    it('readDirRecursive', async () => {
        let dirFiles = await afs.readDirRecursive(DIR_PATH);

        assert.isArray(dirFiles);
        assert.lengthOf(dirFiles, DIR_FILES.length);
        for (let DIR_FILE of DIR_FILES) {
            assert.include(dirFiles, DIR_FILE);
        }
    });

    it('clearDirRecursive', async () => {
        await afs.clearDirRecursive(SUBDIR_PATH);
        
        let subDirFiles = await fs.readdir(SUBDIR_PATH);
        assert.isArray(subDirFiles);
        assert.lengthOf(subDirFiles, 0);
    });

    it('providePath', async () => {
        await afs.providePath(FILE3_PATH);
        await fs.writeFile(FILE3_PATH, FILE3_DATA);

        let file3Stats = await afs.exists(FILE3_PATH);
        assert.isNotNull(file3Stats);
        assert.isObject(file3Stats);
        assert.isFalse(file3Stats.isDirectory());
    });

    it('removeDirRecursive', async () => {
        await afs.removeDirRecursive(DIR_PATH);

        let dirStats = await afs.exists(DIR_PATH);
        assert.isNull(dirStats);
    });
});
