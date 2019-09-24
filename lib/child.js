'use strict'

const EventEmitter = require('events');
const child = require('child_process');
const readline = require('readline');

class ExecutableModule extends EventEmitter {
    /**
     * Creates a new instance of ExecutableModule
     * @param {string} command
     * @param {string[]} [args]
     * @param {object} [options]
     * @param {'exec' | 'spawn'} options.childMethod
     * @param {string} options.outputEncoding
     * @param {boolean} options.exitOnError
     * @param {boolean} options.respawnOnError
     * @param {boolean} options.respawnOnExit
     */
    constructor(command, args, options = {
        childMethod: 'exec',
        outputEncoding: 'utf8',
        exitOnError: true,
        respawnOnError: false,
        respawnOnExit: false
    }) {
        super();
        this.command = command;
        this.args = args;
        this.options = options;
        this.init();
    }

    init() {
        if (this.exe) {
            this.exe.removeAllListeners('error');
            this.exe.removeAllListeners('exit');
        }
        if (this.rlStdout) {
            this.rlStdout.removeAllListeners('line');
        }
        if (this.rlStderr) {
            this.rlStderr.removeAllListeners('line');
        }
        switch (this.options.childMethod) {
            case 'spawn':
                this.exe = child.spawn(this.command, this.args);
                break;
            default:
                this.exe = child.exec(this.command);
                break;
        }
        this.exe.stdout.setEncoding(this.options.outputEncoding);
        this.exe.stderr.setEncoding(this.options.outputEncoding);
        this.exe.once('error', (err) => {
            this.emit('error', err);
            if (this.options.exitOnError || this.options.respawnOnError) {
                this.exit();
            }
            if (this.options.respawnOnError) {
                this.init();
            }
        });
        this.exe.once('exit', (code, signal) => {
            this.exe.removeAllListeners('error');
            this.exe.removeAllListeners('exit');
            this.emit('exit', { code: code, signal: signal });
            if (this.options.respawnOnExit) {
                this.init();
            }
        });
        this.rlStdout = readline.createInterface({
            input: this.exe.stdout
        });
        this.rlStderr = readline.createInterface({
            input: this.exe.stderr
        });
        this.rlStdout.on('line', (line) => {
            this.emit('stdout', line);
        })
        this.rlStderr.on('line', (line) => {
            this.emit('stderr', line);
        })
    }

    write(str) {
        this.exe.stdin.write(str);
    }

    writeline(str) {
        this.exe.stdin.write(str + '\n');
    }

    exit(signal = 'SIGTERM') {
        this.exe.removeAllListeners('error');
        this.exe.removeAllListeners('exit');
        this.exe.kill(signal);
    }
}

module.exports = {
    ExecutableModule
}
