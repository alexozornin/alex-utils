'use strict'

const EventEmitter = require('events');

/**
 * Returns a promise resolving after X ms
 * @param {number} ms
 * @returns {undefined}
 */
function sleep(ms) {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve();
        }, +ms);
    })
}

/**
 * Implements advances promise-based timeouts
 */
class Sleeper {
    /**
     * Creates an instance of sleeper
     */
    constructor() {
        let _timeout = null;
        let _emitter = new EventEmitter();
        let _promise = new Promise((resolve) => {
            _emitter.once('wake', (arg) => {
                resolve(arg);
            });
        });
        this.private = {
            _timeout,
            _emitter,
            _promise
        };
    }

    /**
     * Returns a promise that resolves as the sleeper wakes up
     * @returns {any} Passed arg
     */
    promise() {
        return this.private._promise;
    }
    
    /**
     * Wakes up the sleeper immediately passing arg to the promise
     * @param  {any} arg Any arg to be passed to the promise
     */
    wake(arg) {
        this.private._emitter.emit('wake', arg);
        return this;
    }

    /**
     * Wakes up the sleeper after custom delay passing arg to the promise
     * @param {number} ms Delay in miliseconds
     * @param {any} [arg] Any arg to be passed to the promise
     */
    setWakeTimeout(ms, arg) {
        this.clearWakeTimeout();
        this.private._timeout = setTimeout(() => {
            this.wake(arg);
        }, ms);
        return this;
    }

    /**
     * Cleares wake timeout preventing the sleeper from waking
     */
    clearWakeTimeout() {
        if (this.private._timeout) {
            clearTimeout(this.private._timeout);
        }
        return this;
    }
}

module.exports = {
    sleep,
    Sleeper
};
