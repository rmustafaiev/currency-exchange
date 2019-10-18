const options = require('../config').db

const pgp = require('pg-promise')()

/**
 * Initialize and return
 * Postgres pgp promise reach framework,
 * It based on node-postgres module anyway though.
 * @type {{dbPool: *, dbClient: (function(): (void | * | ClientHttp2Session | this | Socket | TLSSocket | AudioNode))}}
 */
module.exports = pgp({...options})
