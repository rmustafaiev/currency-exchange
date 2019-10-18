const { Router } = require('express')
const routes = require('../api/routes')
const { values } = require('../utils/object')

/**
 * Combine all the routers and returns
 * the only Root router
 * @returns {Router}
 */
module.exports = values(routes)
    .filter(router => Object.getPrototypeOf(router) == Router)
    .reduce((rootRouter, router) => rootRouter.use(router), Router({ mergeParams: true }))



