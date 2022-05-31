const moment = require("moment");
const LOG_LEVEL = {
    DEBUG: { key: 'DEBUG', priority: 0 },
    INFO: { key: 'INFO', priority: 1 },
    WARN: { key: 'WARN', priority: 2 },
    ERROR: { key: 'ERROR', priority: 3 }
};

/**
 * Valori ammessi: DEBUG, INFO, WARN, ERROR
 * Default: ERROR
 * @type {*|{priority: number, key: string}}
 */
const LEVEL = process.env.LOG_LEVEL && LOG_LEVEL[process.env.LOG_LEVEL] ?
    LOG_LEVEL[process.env.LOG_LEVEL] : LOG_LEVEL.ERROR;

module.exports = {
    debug: (...params) => {
        if(LEVEL.priority <= LOG_LEVEL.DEBUG.priority)
            console.log(moment().format(), LOG_LEVEL.DEBUG.key, ...params);
    },
    info: (...params) => {
        if(LEVEL.priority <= LOG_LEVEL.INFO.priority)
            console.log(moment().format(), LOG_LEVEL.INFO.key + ' ', ...params);
    },
    warn: (...params) => {
        if(LEVEL.priority <= LOG_LEVEL.WARN.priority)
            console.log(moment().format(), LOG_LEVEL.WARN.key + ' ', ...params);
    },
    error: (...params) => {
        if(LEVEL.priority <= LOG_LEVEL.ERROR.priority)
            console.log(moment().format(), LOG_LEVEL.ERROR.key, ...params);
    }
}