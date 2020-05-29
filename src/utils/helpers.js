/**
 * Pseudo-random string generator
 * http://stackoverflow.com/a/27872144/383904
 * Default: return a random alpha-numeric string
 *
 * @param {Integer} len Desired length
 * @param {String} an Optional (alphanumeric), "a" (alpha), "n" (numeric)
 * @return {String}
 */
export function randomString(len = 15, an) {
	an = an && an.toLowerCase()
	var str = '',
		i = 0,
		min = an === 'a' ? 10 : 0,
		max = an === 'n' ? 10 : 62
	for (; i++ < len; ) {
		var r = (Math.random() * (max - min) + min) << 0
		str += String.fromCharCode((r += r > 9 ? (r < 36 ? 55 : 61) : 48))
	}
	return str
}

export function hasErrors(fieldsError) {
	return Object.keys(fieldsError).some((field) => fieldsError[field])
}

// Ref: http://zparacha.com/phone_number_javascript_regex
export const phoneValidationRegex = new RegExp(/^\(?(\d{3})\)?[- ]?(\d{3})[- ]?(\d{4})$/)
export const faxValidationRegex = new RegExp(/^[01]?[- .]?\(?[2-9]\d{2}\)?[- .]?\d{3}[- .]?\d{4}$/)
// Ref: https://stackoverflow.com/a/160583/8465770
export const zipCodeValidationRegex = new RegExp(/(^\d{5}$)|(^\d{5}-\d{4}$)/)
export const passwordValidationRegex = new RegExp(
	/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/
)

export const validatePhone = (mobile = '') => {
	return phoneValidationRegex.test(mobile)
}

export function limitNumberWithinRange(num, min, max) {
	const MIN = min || 0
	const MAX = max || 100
	const parsed = parseInt(num)
	return Math.min(Math.max(parsed, MIN), MAX)
}

export const isEmpty = (value) =>
	value === undefined ||
	value === null ||
	(typeof value === 'object' && Object.keys(value).length === 0) ||
	(typeof value === 'string' && value.trim().length === 0)
