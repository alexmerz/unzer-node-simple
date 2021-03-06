/**
 * Work with Basket resources
 *
 * @class Basket
 * @author Alexander Merz
 * @licence Apache Licence 2.0
 */
class Baskets {

    /**
     * Init
     * @param {UnzerSimple} unzer Unzer main class
     */
    constructor(unzer) {
        this._urlpath = '/baskets';
        this._unzer = unzer;
    }

    /**
     * Get a basket resource
     * @link https://docs.unzer.com/reference/api/#get-/v1/baskets/{basketid}
     * @param {string} basketId     basket identifier
     * @return {Promise<Object>}    basket data
     */
    async get(basketId) {
        let url = this._urlpath + '/' + basketId;
        return this._unzer.get(url);
    }

    /**
     * Create a basket resource
     * @link https://docs.unzer.com/reference/api/#post-/v1/baskets
     * @param {Object} basket       basket data
     * @return {Promise<Object>}    basket resource
     */
    async post(basket) {
        return this._unzer.post(this._urlpath, basket, {}, true);
    }

    /**
     * Update a basket resource
     * @link https://docs.unzer.com/reference/api/#put-/v1/baskets/{basketid}
     * @param {string} basketId     basket identifier
     * @param {Object} basket       basket data
     * @return {Promise<Object>}    basket resource
     */
    async put(basketId, basket) {
        return this._unzer.put(this._urlpath+'/'+basketId, basket, {}, true);
    }
}

module.exports = Baskets;