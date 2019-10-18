const fs = require('fs')
const path = require('path')

const dir = path.resolve(process.env.PWD, 'logs')
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

const dtFormat = { hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: false }
const timestamp = new Date().toLocaleDateString('en-US', dtFormat)
const label = severity => Object.entries(SEVERITY).reduce((lable, [ k, v ]) => {
    lable = severity === v ? k : lable

    return lable
}, '')

const log = ({ logLevel = process.env.LOG_LEVEL, showTime = true, showSeverity = true }) => (callLevel, ...rest) => {
    const filterLevel = SEVERITY[logLevel.toUpperCase()]

    if (filterLevel > callLevel) {
        return
    }

    const ts = showTime && timestamp || ''
    const level = showSeverity && `[${label(callLevel)}]` || ''
    const message = ''.concat(ts, ' ', level, ' ', ...rest, '\n')

    //TODO buffer/stream issue might occur need to take care of ..
    fs.appendFile(file, message, () => {
    })
}

/**
 * Simple file logger
 * severity levels lowest to highest: ALL < TRACE < INFO < DEBUG < WARN < ERROR < FATAL
 * @param {object} options [logLevel = 'warn', [showTime:boolean, [showSeverity:boolean]]]
 * @return {{warn: (function(...[*]): undefined), trace: (function(...[*]): undefined), debug: (function(...[*]): undefined), error: (function(...[*]): undefined), info: (function(...[*]): undefined), fatal: (function(...[*]): undefined)}}
 */
module.exports = options => {
    const withOptions = log(options)
    return logger = {
        all  : (...rest) => withOptions(SEVERITY.ALL, ...rest),
        trace: (...rest) => withOptions(SEVERITY.TRACE, ...rest),
        info : (...rest) => withOptions(SEVERITY.INFO, ...rest),
        debug: (...rest) => withOptions(SEVERITY.DEBUG, ...rest),
        warn : (...rest) => withOptions(SEVERITY.WARN, ...rest),
        error: (...rest) => withOptions(SEVERITY.ERROR, ...rest),
        fatal: (...rest) => withOptions(SEVERITY.FATAL, ...rest)
    }
}
