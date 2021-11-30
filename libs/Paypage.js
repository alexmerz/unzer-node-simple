/**
 * Create a paypage resource
 *
 * @class Paypage
 * @author Alexander Merz
 * @licence Apache Licence 2.0
 */
class Paypage {

    /**
     * Init
     * @param {UnzerSimple} unzer Unzer main class
     */
    constructor(unzer) {
        this._urlpath = '/paypage';        
        this._unzer = unzer;
    }

    /**
     * Get a created paypage
     * @link https://docs.unzer.com/reference/api/#get-/v1/paypage/{id}
     * @param {string} paypageId    paypage identifier
     * @return {Promise<Object>}    paypage resource
     */
    async get(paypageId) {
        const url = this._urlpath + '/' + paypageId;
        return this._unzer.get(url);
    }

    /**
     * Create an authorize paypage
     * @link https://docs.unzer.com/reference/api/#post-/v1/paypage/authorize
     * @param {object} payload  paypage creation data
     * @return {Promise<Object>}
     */
    async authorize(payload) {
        const url = this._urlpath + '/authorize'
        return this._unzer.post(url, payload, {}, true);
    }

    /**
     * Create an charge paypage
     * @link https://docs.unzer.com/reference/api/#post-/v1/paypage/charge
     * @param {object} payload  paypage creation data
     * @return {Promise<Object>}
     */
    async charge(payload) {
        const url = this._urlpath + '/charge'
        return this._unzer.post(url, payload, {}, true);
    }
}

module.exports = Paypage;