'use strict'

const assert = require('chai').assert;
const math = require('../lib/math.js');

describe('math', () => {
    it('randomInt', () => {
        let int = math.randomInt(8);
        assert.isNumber(int);
        assert.isAtLeast(int, 0);
        assert.isAtMost(int, 7);
        assert.isTrue(Number.isInteger(int));
    });

    it('randomIntBetween', () => {
        let int = math.randomIntBetween(4090, 4096);
        assert.isNumber(int);
        assert.isAtLeast(int, 4090);
        assert.isAtMost(int, 4096);
        assert.isTrue(Number.isInteger(int));
    });

    it('intDiv', () => {
        let div1 = math.intDiv(0, 2);
        assert.isObject(div1);
        assert.equal(div1.quotient, 0);
        assert.equal(div1.remainder, 0);

        let div2 = math.intDiv(4, 2);
        assert.isObject(div2);
        assert.equal(div2.quotient, 2);
        assert.equal(div2.remainder, 0);

        let div3 = math.intDiv(10, 3);
        assert.isObject(div3);
        assert.equal(div3.quotient, 3);
        assert.equal(div3.remainder, 1);

        let div4 = math.intDiv(-10, 3);
        assert.isObject(div4);
        assert.equal(div4.quotient, -3);
        assert.equal(div4.remainder, -1);

        let div5 = math.intDiv(10, -3);
        assert.isObject(div5);
        assert.equal(div5.quotient, -3);
        assert.equal(div5.remainder, 1);

        let div6 = math.intDiv(-10, -3);
        assert.isObject(div6);
        assert.equal(div6.quotient, 3);
        assert.equal(div6.remainder, -1);
    });

    it('Decimal', () => {
        let dec1 = new math.Decimal('0.3');
        let dec2 = new math.Decimal(0.3);
        let dec3 = new math.Decimal(dec1);
        let dec4 = new math.Decimal('0.03');

        assert.equal(+dec1, +dec2);
        assert.equal(+dec1, +dec3);
        assert.equal(+dec2, +dec3);
        assert.equal(`${dec1}`, `${dec2}`);
        assert.equal(`${dec1}`, `${dec3}`);
        assert.equal(`${dec2}`, `${dec3}`);
        assert.equal(`${dec4}`, '0.03');

        assert.throws(() => {
            new math.Decimal('123456789123456789');
        }, Error, /Integer part exceeds maximum or minimum safe value/);

        assert.throws(() => {
            new math.Decimal('0.123456789123456789');
        }, Error, /Fracture part exceeds the maximum length of 15 digits/);
    });

    it('Decimal.getSign', () => {
        let dec1 = new math.Decimal('6.1234');
        let dec2 = new math.Decimal('-167.672');

        assert.isFalse(dec1.getSign());
        assert.isTrue(dec2.getSign());
    });

    it('Decimal.toString', () => {
        let dec1 = new math.Decimal('6.1234');
        let dec2 = new math.Decimal('-167.672');
        let dec3 = new math.Decimal('0');
        let dec4 = new math.Decimal('-0');
        let dec5 = new math.Decimal('3.0');
        let dec6 = new math.Decimal('-3.0');

        assert.equal(dec1.toString(), '6.1234');
        assert.equal(dec2.toString(), '-167.672');
        assert.equal(dec3.toString(), '0');
        assert.equal(dec4.toString(), '-0');
        assert.equal(dec5.toString(), '3');
        assert.equal(dec6.toString(), '-3');
    });

    it('Decimal.valueOf', () => {
        let dec1 = new math.Decimal('6.1234');
        let dec2 = new math.Decimal('-167.672');
        let dec3 = new math.Decimal('0');
        let dec4 = new math.Decimal('-0');
        let dec5 = new math.Decimal('3.0');
        let dec6 = new math.Decimal('-3.0');

        assert.equal(dec1.valueOf(), 6.1234);
        assert.equal(dec2.valueOf(), -167.672);
        assert.equal(dec3.valueOf(), 0);
        assert.equal(dec4.valueOf(), -0);
        assert.equal(dec5.valueOf(), 3);
        assert.equal(dec6.valueOf(), -3);
    });

    it('Decimal.invert', () => {
        let dec1 = new math.Decimal('6.1234');
        let dec2 = new math.Decimal('-167.672');
        let dec3 = new math.Decimal('0');
        let dec4 = new math.Decimal('-0');
        let dec5 = new math.Decimal('3.0');
        let dec6 = new math.Decimal('-3.0');

        assert.equal(dec1.invert(), -6.1234);
        assert.equal(dec2.invert(), 167.672);
        assert.equal(dec3.invert(), -0);
        assert.equal(dec4.invert(), 0);
        assert.equal(dec5.invert(), -3);
        assert.equal(dec6.invert(), 3);
    });

    it('Decimal.floor', () => {
        let dec1 = new math.Decimal('6.1234');
        let dec2 = new math.Decimal('-167.672');
        let dec3 = new math.Decimal('1.5');
        let dec4 = new math.Decimal('-1.5');

        assert.equal(dec1.floor().toString(), '6');
        assert.equal(dec2.floor().toString(), '-168');
        assert.equal(dec3.floor().toString(), '1');
        assert.equal(dec4.floor().toString(), '-2');

        assert.equal(dec1.toString(), '6.1234');

        assert.equal(dec1.floor(1).toString(), '6.1');
        assert.equal(dec2.floor(2).toString(), '-167.68');
        assert.equal(dec3.floor(1).toString(), '1.5');
        assert.equal(dec4.floor(2).toString(), '-1.5');

        assert.equal(dec2.toString(), '-167.672');

        assert.equal(dec1.floor(0, true).toString(), '6');
        assert.equal(dec2.floor(0, true).toString(), '-168');
        assert.equal(dec3.floor(0, true).toString(), '1');
        assert.equal(dec4.floor(0, true).toString(), '-2');

        assert.equal(dec1.toString(), '6');
        assert.equal(dec2.toString(), '-168');
        assert.equal(dec3.toString(), '1');
        assert.equal(dec4.toString(), '-2');
    });

    it('Decimal.ceil', () => {
        let dec1 = new math.Decimal('6.1234');
        let dec2 = new math.Decimal('-167.672');
        let dec3 = new math.Decimal('1.5');
        let dec4 = new math.Decimal('-1.5');

        assert.equal(dec1.ceil().toString(), '7');
        assert.equal(dec2.ceil().toString(), '-167');
        assert.equal(dec3.ceil().toString(), '2');
        assert.equal(dec4.ceil().toString(), '-1');

        assert.equal(dec1.toString(), '6.1234');

        assert.equal(dec1.ceil(1).toString(), '6.2');
        assert.equal(dec2.ceil(2).toString(), '-167.67');
        assert.equal(dec3.ceil(1).toString(), '1.5');
        assert.equal(dec4.ceil(2).toString(), '-1.5');

        assert.equal(dec2.toString(), '-167.672');

        assert.equal(dec1.ceil(0, true).toString(), '7');
        assert.equal(dec2.ceil(0, true).toString(), '-167');
        assert.equal(dec3.ceil(0, true).toString(), '2');
        assert.equal(dec4.ceil(0, true).toString(), '-1');

        assert.equal(dec1.toString(), '7');
        assert.equal(dec2.toString(), '-167');
        assert.equal(dec3.toString(), '2');
        assert.equal(dec4.toString(), '-1');
    });

    it('Decimal.round', () => {
        let dec1 = new math.Decimal('6.1234');
        let dec2 = new math.Decimal('-167.672');
        let dec3 = new math.Decimal('1.5');
        let dec4 = new math.Decimal('-1.5');

        assert.equal(dec1.round().toString(), '6');
        assert.equal(dec2.round().toString(), '-168');
        assert.equal(dec3.round().toString(), '2');
        assert.equal(dec4.round().toString(), '-1');

        assert.equal(dec1.toString(), '6.1234');

        assert.equal(dec1.round(1).toString(), '6.1');
        assert.equal(dec2.round(2).toString(), '-167.67');
        assert.equal(dec3.round(1).toString(), '1.5');
        assert.equal(dec4.round(2).toString(), '-1.5');

        assert.equal(dec2.toString(), '-167.672');

        assert.equal(dec1.round(0, true).toString(), '6');
        assert.equal(dec2.round(0, true).toString(), '-168');
        assert.equal(dec3.round(0, true).toString(), '2');
        assert.equal(dec4.round(0, true).toString(), '-1');

        assert.equal(dec1.toString(), '6');
        assert.equal(dec2.toString(), '-168');
        assert.equal(dec3.toString(), '2');
        assert.equal(dec4.toString(), '-1');
    });

    it('Decimal.add', () => {
        let dec1 = new math.Decimal('0');
        assert.equal(dec1.add('0').toString(), '0');
        assert.equal(dec1.add('1').toString(), '1');
        assert.equal(dec1.add('1.2').toString(), '1.2');
        assert.equal(dec1.add('-1.2').toString(), '-1.2');

        let dec2 = new math.Decimal('0.2');
        assert.equal(dec2.add('0.1').toString(), '0.3');
        assert.equal(dec2.add('9.1').toString(), '9.3');
        assert.equal(dec2.add('9.8').toString(), '10');
        assert.equal(dec2.add('9.9').toString(), '10.1');
        assert.equal(dec2.add('-0.2').toString(), '0');
        assert.equal(dec2.add('-0.8').toString(), '-0.6');
        assert.equal(dec2.add('-1.1').toString(), '-0.9');
        assert.equal(dec2.add('-1.2').toString(), '-1');

        let dec3 = new math.Decimal('-0.2');
        assert.equal(dec3.add('-0.1').toString(), '-0.3');
        assert.equal(dec3.add('-9.1').toString(), '-9.3');
        assert.equal(dec3.add('-9.8').toString(), '-10');
        assert.equal(dec3.add('-9.9').toString(), '-10.1');
        assert.equal(dec3.add('0.2').toString(), '0');
        assert.equal(dec3.add('0.8').toString(), '0.6');
        assert.equal(dec3.add('1.1').toString(), '0.9');
        assert.equal(dec3.add('1.2').toString(), '1');
    });

    it('Decimal.sub', () => {
        let dec1 = new math.Decimal('0');
        assert.equal(dec1.sub('0').toString(), '0');
        assert.equal(dec1.sub('-1').toString(), '1');
        assert.equal(dec1.sub('-1.2').toString(), '1.2');
        assert.equal(dec1.sub('1.2').toString(), '-1.2');

        let dec2 = new math.Decimal('0.2');
        assert.equal(dec2.sub('-0.1').toString(), '0.3');
        assert.equal(dec2.sub('-9.1').toString(), '9.3');
        assert.equal(dec2.sub('-9.8').toString(), '10');
        assert.equal(dec2.sub('-9.9').toString(), '10.1');
        assert.equal(dec2.sub('0.2').toString(), '0');
        assert.equal(dec2.sub('0.8').toString(), '-0.6');
        assert.equal(dec2.sub('1.1').toString(), '-0.9');
        assert.equal(dec2.sub('1.2').toString(), '-1');

        let dec3 = new math.Decimal('-0.2');
        assert.equal(dec3.sub('0.1').toString(), '-0.3');
        assert.equal(dec3.sub('9.1').toString(), '-9.3');
        assert.equal(dec3.sub('9.8').toString(), '-10');
        assert.equal(dec3.sub('9.9').toString(), '-10.1');
        assert.equal(dec3.sub('-0.2').toString(), '0');
        assert.equal(dec3.sub('-0.8').toString(), '0.6');
        assert.equal(dec3.sub('-1.1').toString(), '0.9');
        assert.equal(dec3.sub('-1.2').toString(), '1');
    });

    it('Decimal.mul', () => {
        let dec1 = new math.Decimal('0');
        assert.equal(dec1.mul('0').toString(), '0');
        assert.equal(dec1.mul('1').toString(), '0');
        assert.equal(dec1.mul('1.2').toString(), '0');
        assert.equal(dec1.mul('-1.2').toString(), '-0');

        let dec2 = new math.Decimal('0.1');
        assert.equal(dec2.mul('0').toString(), '0');
        assert.equal(dec2.mul('0.1').toString(), '0.01');
        assert.equal(dec2.mul('9.1').toString(), '0.91');
        assert.equal(dec2.mul('69.9').toString(), '6.99');
        assert.equal(dec2.mul('-0.2').toString(), '-0.02');
        assert.equal(dec2.mul('-0.8').toString(), '-0.08');
        assert.equal(dec2.mul('-1.1').toString(), '-0.11');
        assert.equal(dec2.mul('-11.2').toString(), '-1.12');

        let dec3 = new math.Decimal('1.6');
        assert.equal(dec3.mul('0').toString(), '0');
        assert.equal(dec3.mul('0.1').toString(), '0.16');
        assert.equal(dec3.mul('2').toString(), '3.2');
        assert.equal(dec3.mul('1.6').toString(), '2.56');
        assert.equal(dec3.mul('-0.2').toString(), '-0.32');
        assert.equal(dec3.mul('-0.8').toString(), '-1.28');
        assert.equal(dec3.mul('-4').toString(), '-6.4');
        assert.equal(dec3.mul('-3.2').toString(), '-5.12');
    });

    it('Decimal.pow', () => {
        let dec1 = new math.Decimal('0');
        assert.equal(dec1.pow('0').toString(), '1');
        assert.equal(dec1.pow('1').toString(), '0');
        assert.equal(dec1.pow('2').toString(), '0');

        let dec2 = new math.Decimal('1');
        assert.equal(dec2.pow('0').toString(), '1');
        assert.equal(dec2.pow('1').toString(), '1');
        assert.equal(dec2.pow('2').toString(), '1');

        let dec3 = new math.Decimal('1.6');
        assert.equal(dec3.pow('0').toString(), '1');
        assert.equal(dec3.pow('1').toString(), '1.6');
        assert.equal(dec3.pow('2').toString(), '2.56');

        let dec4 = new math.Decimal('-1.6');
        assert.equal(dec4.pow('0').toString(), '1');
        assert.equal(dec4.pow('1').toString(), '-1.6');
        assert.equal(dec4.pow('2').toString(), '2.56');
    });

    it('Decimal.sumDec', () => {
        assert.equal(math.Decimal.sumDec('0.1', '0.2').toString(), '0.3');
        assert.equal(math.Decimal.sumDec('0.1', '-0.2').toString(), '-0.1');
        assert.equal(math.Decimal.sumDec('-0.1', '-0.2').toString(), '-0.3');
    });

    it('Decimal.subDec', () => {
        assert.equal(math.Decimal.subDec('0.1', '0.2').toString(), '-0.1');
        assert.equal(math.Decimal.subDec('0.1', '-0.2').toString(), '0.3');
        assert.equal(math.Decimal.subDec('-0.1', '-0.2').toString(), '0.1');
    });

    it('Decimal.mulDec', () => {
        assert.equal(math.Decimal.mulDec('0.1', '0.2').toString(), '0.02');
        assert.equal(math.Decimal.mulDec('0.1', '-0.2').toString(), '-0.02');
        assert.equal(math.Decimal.mulDec('-0.1', '-0.2').toString(), '0.02');
    });
});
