/**
 * Currency Converter function, which change the base currency rate.
 * @param {string} - baseCode eg USD
 * @param {number} - sourceRate -
 * @param {string} - sourceCode - initial data rates where calculus based upon
 * @return {function(*=, *, *): {descr: string, amount: number, code: *, rate: number, base: *}}
 */
function converter(baseCode, sourceRate) {
    return function(rate, code, amount = 1) {
        const baseToSource = 1 / parseFloat(sourceRate)

        return {
            base  : baseCode,
            descr : `${amount} ${code} = ${amount * parseFloat(rate) * baseToSource} ${baseCode}`,
            rate  : 1 / (parseFloat(rate) * baseToSource),
            amount: amount * 1 / (parseFloat(rate) * baseToSource),
            code
        }
    }
}

module.exports = {
    converter
}
