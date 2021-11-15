/**
 * Manage payments
 *
 * @class Payments
 * @author Alexander Merz
 * @licence Apache Licence 2.0
 */
class Payments {

    #urlpath = '/payments';
    #unzer = null;

    /**
     * Init
     * @param {UnzerSimple} unzer Unzer main class
     */
    constructor(unzer) {
        this.#unzer = unzer;
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