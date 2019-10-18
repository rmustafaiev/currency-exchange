'use strict'

/**
 * @param {String} str
 * @return {String}
 */
const isString       = str => typeof str === 'string'
/**
 * Returns boolean, check if not empty string
 * @param {*} value
 * @return {boolean}
 */
const notEmptyString = value => (typeof value === 'string' && value.trim() !== '')

const capitalize = str => str[0].toUpperCase() + str.substr(1)


/**
 * Get a digits of string
 *
 * @param {String} str
 * @return {String}
 */
const getDigits = str => str.replace(/\D+/g, '')

module.exports = {
  isString,
  capitalize,
  notEmptyString,
  getDigits
}
