'use strict'

const assert = require('chai').assert;
const array = require('../lib/array.js');

const ARRAY = [
    {
        group: 'group1',
        name: 'name1'
    },
    {
        group: 'group1',
        name: 'name2'
    },
    {
        group: 'group2',
        name: 'name3'
    },
    {
        group: 'group2',
        name: 'name4'
    },
    {
        group: 'group3',
        name: 'name5'
    },
];

const GROUP = {
    group1: [
        { group: 'group1', name: 'name1' },
        { group: 'group1', name: 'name2' }
    ],
    group2: [
        { group: 'group2', name: 'name3' },
        { group: 'group2', name: 'name4' }
    ],
    group3: [
        { group: 'group3', name: 'name5' }
    ]
};

describe('array', () => {
    it('groupByKey', () => {
        let group = array.groupByKey(ARRAY, 'group');

        assert.isObject(group);
        assert.lengthOf(Object.keys(group), Object.keys(GROUP).length);
        assert.hasAllKeys(group, Object.keys(GROUP));
        for (let key in group) {
            assert.isArray(group[key]);
            assert.lengthOf(group[key], GROUP[key].length);
        }
    });
    
    it('groupByUniqueKey', () => {
        let group = array.groupByUniqueKey(ARRAY, 'group');

        assert.isObject(group);
        assert.lengthOf(Object.keys(group), Object.keys(GROUP).length);
        assert.hasAllKeys(group, Object.keys(GROUP));
    });
});
