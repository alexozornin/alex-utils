'use strict'

/**
 * Returns true if a number is Integer
 * @param {number} num
 */
function isInteger(num) {
    return num == Math.floor(num);
}

/**
 * Returns random int between 0 and max (not including max)
 * @param {number} max Integer number
 */
function randomInt(max = Number.MAX_SAFE_INTEGER) {
    return Math.floor(Math.random() * max);
}

/**
 * Returns random int between min and max (including min and max)
 * @param {number} min
 * @param {number} max
 */
function randomIntBetween(min = 0, max = Number.MAX_SAFE_INTEGER) {
    return min + Math.floor(Math.random() * (max - min + 1));
}

/**
 * Performs an integer division
 * @param {number} numerator 
 * @param {number} denominator 
 */
function intDiv(numerator, denominator) {
    let remainder = numerator % denominator;
    let quotient = (numerator - remainder) / denominator;
    return {
        quotient,
        remainder
    };
}

/**
 * Represents an exact number with at max 15 digits after point
 */
class Decimal {
    /**
     * Creates an instance of Decimal
     * @param {string | number | Decimal} num Number or string representation of a number
     */
    constructor(num) {
        this.private = {
            _sign: 0,
            _integer: 0,
            _fracture: 0
        };
        if (num instanceof Decimal) {
            this.private._sign = num.private._sign;
            this.private._integer = num.private._integer;
            this.private._fracture = num.private._fracture;
            return;
        }
        if (typeof num != 'string') {
            num = `${num}`;
        }
        let match = num.match(/^(-)?(\d+)\.?(\d+)?$/);
        if (!match) {
            throw new TypeError(`Expected "num" arg to be a number or number-like (got ${num})`);
        }
        let _sign = Boolean(match[1]);
        let _integer = +match[2];
        let _fracture_string = match[3];
        if (_fracture_string && _fracture_string.length > 15) {
            throw new Error(`Fracture part exceeds the maximum length of 15 digits (got length ${_fracture_string.length})`);
        }
        while (_fracture_string && _fracture_string.length < 15) {
            _fracture_string = `${_fracture_string}0`;
        }
        let _fracture = +_fracture_string || 0;
        if (_integer > Number.MAX_SAFE_INTEGER || _integer < Number.MIN_SAFE_INTEGER) {
            throw new Error('Integer part exceeds maximum or minimum safe value');
        }
        if (_sign) {
            _integer = -_integer;
            _fracture = -_fracture;
        }
        this.private._sign = _sign;
        this.private._integer = _integer;
        this.private._fracture = _fracture;
    }

    /**
     * Returns true if number is negative (has a negative sign)
     */
    getSign() {
        return this.private._sign;
    }

    /**
     * Returns string representation of a decimal
     */
    toString() {
        let _integer_string = `${this.private._sign ? '-' : ''}${Math.abs(this.private._integer)}`;
        let _fracture_string = `${Math.abs(this.private._fracture)}`.replace(/0+$/, '');
        return `${_integer_string}${_fracture_string.length ? '.' : ''}${_fracture_string}`;
    }

    /**
     * Returns number representation of a decimal
     */
    valueOf() {
        return +this.toString();
    }

    /**
     * Inverts a decimal changing its sign
     */
    invert() {
        this.private._sign = !this.private._sign;
        this.private._integer = -this.private._integer;
        this.private._fracture = -this.private._fracture;
        return this;
    }

    /**
     * Floors a decimal
     * @param {number} [offset] Digits after point (defaults to 0)
     * @param {boolean} [modify] If set to true current decimal will be modified instead of returning a new one
     */
    floor(offset = 0, modify = false) {
        let currentDecimal = modify ? this : new Decimal(this);
        offset = +offset;
        if (isNaN(offset)) {
            throw new TypeError(`Expected "offset" arg to be a number or number-like (got ${offset})`);
        }
        if (offset < 0 || offset > 15) {
            throw new Error(`Expected "offset" arg to have a value between 0 and 15 (got ${offset})`);
        }
        let denominator = Math.pow(10, 15 - offset);
        let fracDiv = intDiv(Math.abs(currentDecimal.private._fracture), denominator);
        let _integer = currentDecimal.private._integer;
        let _fracture = fracDiv.quotient * denominator;
        if (currentDecimal.private._sign) {
            _fracture = -_fracture;
            if (fracDiv.remainder) {
                if (offset) {
                    _fracture -= denominator;
                }
                else {
                    --_integer;
                    if (_integer < Number.MIN_SAFE_INTEGER) {
                        throw new Error('Integer part exceeds minimum safe value');
                    }
                }
            }
        }
        currentDecimal.private._integer = _integer;
        currentDecimal.private._fracture = _fracture;
        return currentDecimal;
    }

    /**
     * Ceils a decimal
     * @param {number} [offset] Digits after point (defaults to 0)
     * @param {boolean} [modify] If set to true current decimal will be modified instead of returning a new one
     */
    ceil(offset = 0, modify = false) {
        let currentDecimal = modify ? this : new Decimal(this);
        offset = +offset;
        if (isNaN(offset)) {
            throw new TypeError(`Expected "offset" arg to be a number or number-like (got ${offset})`);
        }
        if (offset < 0 || offset > 15) {
            throw new Error(`Expected "offset" arg to have a value between 0 and 15 (got ${offset})`);
        }
        let denominator = Math.pow(10, 15 - offset);
        let fracDiv = intDiv(Math.abs(currentDecimal.private._fracture), denominator);
        let _integer = currentDecimal.private._integer;
        let _fracture = fracDiv.quotient * denominator;
        if (currentDecimal.private._sign) {
            _fracture = -_fracture;
        }
        else if (fracDiv.remainder) {
            if (offset) {
                _fracture += denominator;
            }
            else {
                ++_integer;
                if (_integer > Number.MAX_SAFE_INTEGER) {
                    throw new Error('Integer part exceeds maximum safe value');
                }
            }
        }
        currentDecimal.private._integer = _integer;
        currentDecimal.private._fracture = _fracture;
        return currentDecimal;
    }

    /**
     * Rounds a decimal
     * @param {number} [offset] Digits after point (defaults to 0)
     * @param {boolean} [modify] If set to true current decimal will be modified instead of returning a new one
     */
    round(offset = 0, modify = false) {
        offset = +offset;
        if (isNaN(offset)) {
            throw new TypeError(`Expected "offset" arg to be a number or number-like (got ${offset})`);
        }
        if (offset < 0 || offset > 15) {
            throw new Error(`Expected "offset" arg to have a value between 0 and 15 (got ${offset})`);
        }
        let denominator = Math.pow(10, 15 - offset);
        let fracDiv = intDiv(Math.abs(this.private._fracture), denominator);
        let middle = denominator / 2;
        if (fracDiv.remainder == middle || (this.private._sign ^ fracDiv.remainder > middle)) {
            return this.ceil(offset);
        }
        else {
            return this.floor(offset, modify);
        }
    }

    /**
     * Adds X to a decimal
     * @param {string | number | Decimal} num 
     * @param {boolean} [modify] If set to true current decimal will be modified instead of returning a new one
     */
    add(num, modify = false) {
        if (!(num instanceof Decimal)) {
            num = new Decimal(num);
        }
        let currentDecimal = modify ? this : new Decimal(this);
        let _fracture_sum = currentDecimal.private._fracture + num.private._fracture;
        let div = intDiv(_fracture_sum, 1e15);
        let _integer = currentDecimal.private._integer + num.private._integer + div.quotient;
        let _fracture = div.remainder;
        let _fracture_sign = _fracture < 0;
        let _sign = _integer === 0 ? _fracture_sign : _integer < 0;
        if (_sign && !_fracture_sign) {
            ++_integer;
            _fracture -= 1e15;
        }
        if (!_sign && _fracture_sign) {
            --_integer;
            _fracture += 1e15;
        }
        if (_integer > Number.MAX_SAFE_INTEGER || _integer < Number.MIN_SAFE_INTEGER) {
            throw new Error('Integer part exceeds maximum or minimum safe value');
        }
        currentDecimal.private._sign = _sign;
        currentDecimal.private._integer = _integer;
        currentDecimal.private._fracture = _fracture;
        return currentDecimal;
    }

    /**
     * Subtracts X from a decimal
     * @param {string | number | Decimal} num 
     * @param {boolean} [modify] If set to true current decimal will be modified instead of returning a new one
     */
    sub(num, modify = false) {
        if (!(num instanceof Decimal)) {
            num = new Decimal(num);
        }
        return this.add(num.invert(), modify);
    }

    /**
     * Multiplies a decimal by X
     * @param {string | number | Decimal} num 
     * @param {boolean} [modify] If set to true current decimal will be modified instead of returning a new one
     */
    mul(num, modify = false) {
        if (!(num instanceof Decimal)) {
            num = new Decimal(num);
        }
        let currentDecimal = modify ? this : new Decimal(this);
        let frac1str = `${Math.abs(currentDecimal.private._fracture)}`.replace(/0+$/, '');
        let frac2str = `${Math.abs(num.private._fracture)}`.replace(/0+$/, '');
        let sumLength = frac1str.length + frac2str.length;
        if (sumLength > 15) {
            throw new Error(`Total fracture part length of two decimals exceeds the maximum length of 15 digits (got ${sumLength})`);
        }
        let _sign = currentDecimal.private._sign ^ num.private._sign;
        let _integer = Math.abs(currentDecimal.private._integer) * Math.abs(num.private._integer);
        let _fracture = 0;
        let fracFactor, intFactor, _num, _abs_fracture;

        fracFactor = 1;
        intFactor = 1;
        _num = Math.abs(currentDecimal.private._integer);
        _abs_fracture = Math.abs(num.private._fracture);
        while (_num > 0) {
            let numDiv = intDiv(_num, 10);
            let _term = _abs_fracture * numDiv.remainder;
            let termDiv = intDiv(_term, 1e15 / fracFactor);
            _integer += intFactor * termDiv.quotient;
            _fracture += fracFactor * termDiv.remainder;
            if (fracFactor < 1e15) {
                fracFactor *= 10;
            }
            else {
                intFactor *= 10;
            }
            _num = numDiv.quotient;
        }

        fracFactor = 1;
        intFactor = 1;
        _num = Math.abs(num.private._integer);
        _abs_fracture = Math.abs(currentDecimal.private._fracture);
        while (_num > 0) {
            let numDiv = intDiv(_num, 10);
            let _term = _abs_fracture * numDiv.remainder;
            let termDiv = intDiv(_term, 1e15 / fracFactor);
            _integer += intFactor * termDiv.quotient;
            _fracture += fracFactor * termDiv.remainder;
            if (fracFactor < 1e15) {
                fracFactor *= 10;
            }
            else {
                intFactor *= 10;
            }
            _num = numDiv.quotient;
        }

        if (currentDecimal.private._fracture && num.private._fracture) {
            fracFactor = 1e15;
            _num = Math.abs(num.private._fracture);
            _abs_fracture = Math.abs(currentDecimal.private._fracture);
            while (_num > 0) {
                let numDiv = intDiv(_num, 10);
                let _term = _abs_fracture * numDiv.remainder / fracFactor;
                _fracture += _term;
                fracFactor /= 10;
                _num = numDiv.quotient;
            }
        }

        let div = intDiv(_fracture, 1e15);
        _integer += div.quotient;
        _fracture = div.remainder;
        if (_sign) {
            _integer = -_integer;
            _fracture = -_fracture;
        }
        currentDecimal.private._sign = _sign;
        currentDecimal.private._integer = _integer;
        currentDecimal.private._fracture = _fracture;
        return currentDecimal;
    }

    /**
     * Returns a new decimal raised to power X
     * @param {number} num Non-negative integer power
     */
    pow(num) {
        let power = Math.floor(num);
        if (num != power || num < 0) {
            throw new Error(`Expected "num" arg to be a non-negative integer (got ${num})`);
        }
        let retval = new Decimal(1);
        for (let i = 0; i < power; i++) {
            retval.mul(this, true);
        }
        return retval;
    }

    /**
     * Returns a sum of two decimals (dec1 + dec2)
     * @param {string | number | Decimal} dec1 
     * @param {string | number | Decimal} dec2 
     */
    static sumDec(dec1, dec2) {
        return (new Decimal(dec1)).add(dec2, true);
    }

    /**
     * Returns a difference between two decimals (dec1 - dec2)
     * @param {string | number | Decimal} dec1 
     * @param {string | number | Decimal} dec2 
     */
    static subDec(dec1, dec2) {
        return (new Decimal(dec1)).sub(dec2, true);
    }

    /**
     * Returns a product of two decimals (dec1 * dec2)
     * @param {string | number | Decimal} dec1 
     * @param {string | number | Decimal} dec2 
     */
    static mulDec(dec1, dec2) {
        return (new Decimal(dec1)).mul(dec2, true);
    }
}

module.exports = {
    isInteger,
    randomInt,
    randomIntBetween,
    intDiv,
    Decimal
};
