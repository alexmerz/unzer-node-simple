/**
 * Work with Customer resources
 *
 * @class Customers
 * @author Alexander Merz
 * @licence Apache Licence 2.0
 */
class Customers {    

    /**
     * Init
     * @param {UnzerSimple} unzer Unzer main class
     */
    constructor(unzer) {
        this.#urlpath = '/customers';        
        this.#unzer = unzer;
    }

    /**
     * Delete customer resource
     * @link https://docs.unzer.com/reference/api/#delete-/v1/customers/{codeorexternalid}
     * @param {string} customerId customer resource identifier
     * @return {Promise<Object>} Unzer result
     */
    async delete(customerId) {
        let url = this.#urlpath + '/' + customerIdId;
        return this.#unzer.delete(url);
    }

    /**
     * Get customer resource
     * @link https://docs.unzer.com/reference/api/#get-/v1/customers/{codeorexternalid}
     * @param {string} customerId customer resource identifier
     * @return {Promise<Object>} Unzer result
     */
    async get(customerId) {
        let url = this.#urlpath + '/' + customerIdId;
        return this.#unzer.get(url);
    }

    /**
     * Create customer resource
     * @link https://docs.unzer.com/reference/api/#post-/v1/customers/{codeorexternalid}
     * @param {Object} customer customer data
     * @return {Promise<Object>} Unzer result
     */
    async post(customer) {
        return this.#unzer.post(this.#urlpath, customer, {}, true);
    }

    /**
     * Update customer resource
     * @link https://docs.unzer.com/reference/api/#put-/v1/customers/{codeorexternalid}
     * @param {string} customerId   customer resource identifier
     * @param {Object} customer     customer data
     * @return {Promise<Object>} Unzer result
     */
    async put(customerId, customer) {
        return this.#unzer.put(this.#urlpath+'/'+customerId, customer, {}, true);
    }
}

module.exports = Customers;