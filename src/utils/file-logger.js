const conf = require('../config')
const fs = require('fs')
const path = require('path')

const dir = path.resolve(conf.appRoot, 'logs')
const file = path.resolve(dir, 'application.log')

if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir)
}

const SEVERITY = {
    ALL  : 10,
    TRACE: 20,
    DEBUG: 30,
    INFO : 40,
    WARN : 50,
    ERROR: 60,
    FATAL: 75
}

const defaultOptions = {
    logLevel    : process.env.LOG_LEVEL,
    showTime    : true,
    showSeverity: true
}

const dtFormat = { hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: false }
const timestamp = new Date().toLocaleDateString('en-US', dtFormat)
const label = severity => Object.entries(SEVERITY).reduce((lable, [ k, v ]) => {
    lable = severity === v ? k : lable

    return lable
}, '')


// TODO buffer/stream issue might occur need to take care of ..
// Best way would be use read stream > pipe stream to the appenders > which are writable streams
const logWithOptions = ({ logLevel, showTime, showSeverity } = defaultOptions) => (callLevel, ...rest) => {
    const filterLevel = SEVERITY[logLevel.toUpperCase()]

    if (filterLevel > callLevel) {
        return
    }

    const ts = showTime && timestamp || ''
    const level = showSeverity && `[${label(callLevel)}]` || ''
    const message = ''.concat(ts, ' ', level, ' ', ...rest, '\n')

    fs.appendFile(file, message, () => {
    })
}

/**
 * Simple logger, appends traces to the file, it rather simplified...
 * supports severity levels lowest to highest: ALL < TRACE < INFO < DEBUG < WARN < ERROR < FATAL
 * @param {object} options [logLevel = 'warn', [showTime:boolean, [showSeverity:boolean]]]
 * @return {{warn: (function(...[*]): undefined),
 * trace: (function(...[*]): undefined),
 * debug: (function(...[*]): undefined),
 * error: (function(...[*]): undefined),
 * info: (function(...[*]): undefined),
 * fatal: (function(...[*]): undefined)}}
 */
module.exports = options => {
    const log = logWithOptions(options)
    return {
        all  : (...rest) => log(SEVERITY.ALL, ...rest),
        trace: (...rest) => log(SEVERITY.TRACE, ...rest),
        info : (...rest) => log(SEVERITY.INFO, ...rest),
        debug: (...rest) => log(SEVERITY.DEBUG, ...rest),
        warn : (...rest) => log(SEVERITY.WARN, ...rest),
        error: (...rest) => log(SEVERITY.ERROR, ...rest),
        fatal: (...rest) => log(SEVERITY.FATAL, ...rest)
    }
}
