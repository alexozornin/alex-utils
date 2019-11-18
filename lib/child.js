'use strict'

const EventEmitter = require('events');
const child = require('child_process');
const readline = require('readline');

class ExecutableModule extends EventEmitter {
    /**
     * Creates a new instance of ExecutableModule
     * @param {string} command Exec command or module path
     * @param {string[]} [args]
     * @param {object} [options]
     * @param {'exec' | 'spawn' | 'fork'} options.childMethod
     * @param {string} options.outputEncoding
     * @param {boolean} options.exitOnError
     * @param {boolean} options.respawnOnError
     * @param {boolean} options.respawnOnExit
     */
    constructor(command, args, options) {
        super();
        let optionsValid = options && typeof options == 'object';
        this.private = {
            _command: command,
            _args: args,
            _options: {
                childMethod: optionsValid && options.childMethod ? options.childMethod : 'exec',
                outputEncoding: optionsValid && options.outputEncoding ? options.outputEncoding : 'utf8',
                exitOnError: optionsValid && options.exitOnError ? options.exitOnError : true,
                respawnOnError: optionsValid && options.respawnOnError ? options.respawnOnError : false,
                respawnOnExit: optionsValid && options.respawnOnExit ? options.respawnOnExit : false
            }
        }
        this.init();
    }

    /**
     * Forces instance initialization / reinitialization (invokes automatically by default)
     */
    init() {
        this.freeListeners();
        switch (this.private._options.childMethod) {
            case 'spawn':
                this.exe = child.spawn(this.private._command, this.private._args);
                break;
            case 'fork':
                this.exe = child.fork(this.private._command, this.private._args);
                break;
            default:
                this.exe = child.exec(this.private._command);
                break;
        }
        this.exe.stdout.setEncoding(this.private._options.outputEncoding);
        this.exe.stderr.setEncoding(this.private._options.outputEncoding);
        this.exe.once('error', (err) => {
            this.emit('error', err);
            if (this.private._options.exitOnError || this.private._options.respawnOnError) {
                this.exit();
            }
            if (this.private._options.respawnOnError) {
                this.init();
            }
        });
        this.exe.once('exit', (code, signal) => {
            this.exe.removeAllListeners('error');
            this.exe.removeAllListeners('exit');
            this.emit('exit', { code: code, signal: signal });
            if (this.private._options.respawnOnExit) {
                this.init();
            }
        });
        this.exe.on('message', (message, sendHandle) => {
            this.emit('message', message, sendHandle);
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

    /**
     * Writes to process stdin
     * @param {string} str 
     */
    write(str) {
        this.exe.stdin.write(str);
    }

    /**
     * Writes to process stdin ending with LF (line feed, new line)
     * @param {string} str 
     */
    writeline(str) {
        this.exe.stdin.write(str + '\n');
    }

    /**
     * Sends a message using IPC
     * @param {string} message 
     */
    send(message) {
        this.exe.send(message);
    }

    /**
     * Removes all listeners connetced to process
     */
    freeListeners() {
        if (this.exe) {
            this.exe.removeAllListeners('error');
            this.exe.removeAllListeners('exit');
            this.exe.removeAllListeners('message');
        }
        if (this.rlStdout) {
            this.rlStdout.removeAllListeners('line');
        }
        if (this.rlStderr) {
            this.rlStderr.removeAllListeners('line');
        }
    }

    /**
     * Stops the process
     * @param {string} signal 
     */
    exit(signal = 'SIGTERM') {
        this.freeListeners();
        this.exe.kill(signal);
    }
}

module.exports = {
    ExecutableModule
}
