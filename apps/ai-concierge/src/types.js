export /**
 * @typedef {Object} Evidence
 * @property {string} id
 * @property {'review' | 'ingredient' | 'tips'} type
 * @property {string} source
 * @property {string} quote
 * @property {string} [url]
 */

export /**
 * @typedef {Object} Product
 * @property {string} id
 * @property {string} name
 * @property {string} brand
 * @property {string} category
 * @property {string[]} tags
 * @property {number} rating
 * @property {string} price
 * @property {string} image
 * @property {string} reason
 * @property {Evidence[]} evidence
 */

export /**
 * @typedef {Object} AskRequest
 * @property {string} query
 */

export /**
 * @typedef {Object} AskFollowUpResponse
 * @property {'follow-up'} type
 * @property {string} followUpQuestion
 * @property {Product} product
 * @property {string} topic
 * @property {string[]} options
 */

export /**
 * @typedef {Object} AskFinalResponse
 * @property {'final'} type
 * @property {string} answer
 * @property {Product} product
 * @property {Evidence[]} [evidence]
 */

export /**
 * @typedef {AskFollowUpResponse | AskFinalResponse} AskResponse
 */

export /**
 * @typedef {Object} Message
 * @property {string} id
 * @property {'user' | 'assistant'} role
 * @property {string} text
 * @property {{ product?: Product; followUpOptions?: string[] }} [payload]
 */

export /**
 * @typedef {Object} Memo
 * @property {Product} product
 * @property {string} savedAt
 */
