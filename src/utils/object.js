'use strict'


/**
 * Creates an object composed of the picked object properties.
 *
 * @param {Object} object
 * @param {Array.<String>} props
 * @returns {Object}
 */
exports.pick = (object, props) => {
    // support for functional programming
    if (!props && object instanceof Array) {
        props = object

        return object => exports.pick(object, props)
    }

    const result = {}

    props.forEach(prop => {
        result[prop] = object[prop]
    })

    return result
}

/**
 * The opposite of `pick` this method creates an object composed of the own and inherited enumerable
 * properties of `object` that are not omitted
 *
 * @param {Object} object
 * @param {Array} props The properties to omit
 * @param {Boolean} deep
 * @return {Object}
 */
exports.omit = (object, props, deep) => {
    return exports.omitBy(object, (value, prop) => props.includes(prop), deep)
}

/**
 * This method creates an object composed of the own and inherited enumerable string keyed properties
 * of object that predicate doesn't return truthy for.
 * The predicate is invoked with two arguments: (value, key).
 *
 * @param {Object} object
 * @param {Function} predicate
 * @param {Boolean} deep
 */
exports.omitBy = (object, predicate, deep) => {
    const result = {}

    Object.keys(object).forEach(prop => {
        if (!predicate(object[prop], prop)) {
            result[prop] = object[prop]

            if (deep && exports.isObject(result[prop])) {
                result[prop] = exports.omitBy(result[prop], predicate, deep)
            }
        }
    })

    return result
}

/**
 * Expose Object values by own key
 * @param object
 * @return {*[]}
 */
exports.values = object => Object.keys(object).map(key => object[key])

/**
 * Checks if two objects are equal by certain properties
 *
 * @param {Object} obj
 * @param {Object} anotherObj
 * @param {Array} properties names list
 * @return {Boolean}
 */
exports.isEqualBy = (obj, anotherObj, properties) => {
    return properties.reduce((memo, propertyName) => {
        return memo && obj[propertyName] === anotherObj[propertyName]
    }, true)
}

exports.keysToLowerCase = obj => {
    return Object.keys(obj).reduce(function(accum, key) {
        accum[key.toLowerCase()] = obj[key]
        return accum
    }, {})
}

exports.defineConstructorName = (obj, newName) => {
    Object.defineProperty(obj, 'name', { value: newName })
}


const clone = obj => {
    if (Array.isArray(obj)) {
        return obj.concat()
    }

    if (isObject(obj)) {
        return Object.assign({}, obj)
    }

    return obj
}

const deepClone = obj => {
    if (Array.isArray(obj)) {
        return obj.map(deepClone)
    }

    if (isObject(obj)) {
        const result = {}

        Object.keys(obj).forEach(key => {
            result[key] = deepClone(obj[key])
        })

        return result
    }

    return obj
}


exports.clone = clone
exports.deepClone = deepClone
