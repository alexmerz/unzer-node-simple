/**
 * Enable recurring payments
 *
 * @class Recurring
 * @author Alexander Merz
 * @licence Apache Licence 2.0
 */
class Recurring {

    /**
     * Init
     * @param {UnzerSimple} unzer Unzer main class
     */
    constructor(unzer) {
        this._urlpath = '/types';        
        this._unzer = unzer;
    }

    /**
     * GET recurring state
     *
     * @link https://docs.unzer.com/reference/api/#get-/v1/types/{methodid}/recurring
     * @param {string} methodId Id of Payment method
     * @return {Promise<Object>} Unzer response
     */
    async get(methodId) {
        let url = this._urlpath + '/' + methodId + '/recurring';
        return this._unzer.get(url);
    }

    /**
     * Set reccuring state for given UUID
     * @link https://docs.unzer.com/reference/api/#post-/v1/types/recurring
     * @param {string} uuid UUID of payment method
     * @return {Promise<Object>}
     */
    async postUuid(uuid) {
        let url = this._urlpath + '/recurring';
        return this._unzer.post(url, {uuid: uuid});
    }

    /**
     * Set recurring state for given method id
     * @link https://docs.unzer.com/reference/api/#post-/v1/types/{methodid}/recurring
     * @param {string} methodId payment method id
     * @param {object} payload  post body payload
     * @return {Promise<Object>}
     */
    async postMethodId(methodId, payload) {
        let url = this._urlpath + '/' + methodId + '/recurring';
        return this._unzer.post(url, payload, {}, true);
    }

}

module.exports = Recurring;