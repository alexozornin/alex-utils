'use strict'

class ZoneDate extends Date {
    /**
     * Creates an instance of ZoneDate
     * @param {string | number | Date} [date]
     * @param {number} [zoneOffset] If date argument is a string defines timezone offset
     */
    constructor(date, zoneOffset) {
        if (date === undefined || date === null) {
            super();
        }
        else if (typeof date == 'string' && zoneOffset !== undefined && zoneOffset > 0 && !date.match('GMT') && !date.match('UTC')) {
            super(`${date} UTC+${zoneOffset}`);
        }
        else {
            super(date);
        }
    }

    /**
     * Sets the full year using a specified timezone
     * @param {number} zoneOffset 
     * @param {number} year 
     * @param {number} [month] 
     * @param {number} [date] 
     */
    setZoneFullYear(zoneOffset, year, month, date) {
        this.setUTCHours(this.getUTCHours() + zoneOffset);
        this.setUTCFullYear(year);
        if (month !== undefined && month !== null) {
            this.setUTCMonth(month)
        }
        if (date !== undefined && date !== null) {
            this.setUTCDate(date)
        }
        this.setUTCHours(this.getUTCHours() - zoneOffset);
        return this.getTime();
    }

    /**
     * Sets the month using a specified timezone
     * @param {number} zoneOffset 
     * @param {number} month 
     * @param {number} [date] 
     */
    setZoneMonth(zoneOffset, month, date) {
        this.setUTCHours(this.getUTCHours() + zoneOffset);
        this.setUTCMonth(month)
        if (date !== undefined && date !== null) {
            this.setUTCDate(date)
        }
        this.setUTCHours(this.getUTCHours() - zoneOffset);
        return this.getTime();
    }

    /**
     * Sets the date of the month using a specified timezone
     * @param {number} zoneOffset 
     * @param {number} date 
     */
    setZoneDate(zoneOffset, date) {
        this.setUTCHours(this.getUTCHours() + zoneOffset);
        this.setUTCDate(date);
        this.setUTCHours(this.getUTCHours() - zoneOffset);
        return this.getTime();
    }

    /**
     * Sets the hour using a specified timezone
     * @param {number} zoneOffset 
     * @param {number} hours
     * @param {number} [min]
     * @param {number} [sec]
     * @param {number} [ms]
     */
    setZoneHours(zoneOffset, hours, min, sec, ms) {
        this.setUTCHours(this.getUTCHours() + zoneOffset);
        this.setUTCHours(hours);
        if (min !== undefined && min !== null) {
            this.setUTCMinutes(min)
        }
        if (sec !== undefined && sec !== null) {
            this.setUTCSeconds(sec)
        }
        if (ms !== undefined && ms !== null) {
            this.setUTCMilliseconds(ms)
        }
        this.setUTCHours(this.getUTCHours() - zoneOffset);
        return this.getTime();
    }

    /**
     * Gets the full year using a specified timezone
     * @param {number} zoneOffset 
     */
    getZoneFullYear(zoneOffset) {
        this.setUTCHours(this.getUTCHours() + zoneOffset);
        let year = this.getUTCFullYear();
        this.setUTCHours(this.getUTCHours() - zoneOffset);
        return year;
    }

    /**
     * Gets the month using a specified timezone
     * @param {number} zoneOffset 
     */
    getZoneMonth(zoneOffset) {
        this.setUTCHours(this.getUTCHours() + zoneOffset);
        let month = this.getUTCMonth();
        this.setUTCHours(this.getUTCHours() - zoneOffset);
        return month;
    }

    /**
     * Gets the date of the month using a specified timezone
     * @param {number} zoneOffset 
     */
    getZoneDate(zoneOffset) {
        this.setUTCHours(this.getUTCHours() + zoneOffset);
        let date = this.getUTCDate();
        this.setUTCHours(this.getUTCHours() - zoneOffset);
        return date;
    }

    /**
     * Gets the day of the week using a specified timezone
     * @param {number} zoneOffset 
     */
    getZoneDay(zoneOffset) {
        this.setUTCHours(this.getUTCHours() + zoneOffset);
        let day = this.getUTCDay();
        this.setUTCHours(this.getUTCHours() - zoneOffset);
        return day;
    }

    /**
     * Gets the hours using a specified timezone
     * @param {number} zoneOffset 
     */
    getZoneHours(zoneOffset) {
        this.setUTCHours(this.getUTCHours() + zoneOffset);
        let hours = this.getUTCHours();
        this.setUTCHours(this.getUTCHours() - zoneOffset);
        return hours;
    }
}

/**
 * Converts number into a string with at least 2 characters
 * @param {number} num 
 */
function numberTo2chars(num) {
    return num < 10 ? `0${num}` : `${num}`;
}

module.exports = {
    ZoneDate,
    numberTo2chars
};
