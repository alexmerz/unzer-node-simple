/**
 * Manage payments
 *
 * @class Payments
 * @author Alexander Merz
 * @licence Apache Licence 2.0
 */
class Payments {

    /**
     * Init
     * @param {UnzerSimple} unzer Unzer main class
     */
    constructor(unzer) {
        this.#urlpath = '/payments';
        this.#unzer = unzer;
    }

    /**
     * Does a charge based on typeId
     * @link https://docs.unzer.com/reference/api/#post-/v1/payments/charges
     * @param {Object} payload      Data structure of charge
     * @return {Promise<Object>}    Result of charge
     */
    async postCharges(payload) {
        return this.#unzer.post(this.#urlpath+'/charges', payload, {}, true);
    }

    /**
     * Return charge detail information for a charge
     * @link https://docs.unzer.com/reference/api/#get-/v1/payments/charges/{anyid}
     * @param {string} anyId        identifier of charge
     * @return {Promise<Object>}    Result of request
     */
    async getCharges(anyId) {
        let url = this.#urlpath + '/charges/' + anyId;
        return this.#unzer.get(url);
    }
}

module.exports = Payments;