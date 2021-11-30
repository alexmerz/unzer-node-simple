/**
 * Work with Metadata resources
 *
 * @class Metadata
 * @author Alexander Merz
 * @licence Apache Licence 2.0
 */

class Metadata {

    /**
     * Init
     * @param {UnzerSimple} unzer Unzer main class
     */
    constructor(unzer) {
        this.#urlpath = '/metadata';        
        this.#unzer = unzer;
    }

    /**
     * Get a metadata resource
     * @link https://docs.unzer.com/reference/api/#get-/v1/metadata/{id}
     * @param {string} metadataId   metadata identifier
     * @return {Promise<Object>}    metadata
     */
    async get(metadataId) {
        let url = this.#urlpath + '/' + metadataId;
        return this.#unzer.get(url);
    }

    /**
     * Create a metadata resource
     * @link https://docs.unzer.com/reference/api/#post-/v1/metadata
     * @param {Object} metadata metadata resource data
     * @return {Promise<Object>} metadata resource
     */
    async post(metadata) {
        return this.#unzer.post(this.#urlpath, metadata);
    }

    /**
     * Update a metadata resource
     * @link https://docs.unzer.com/reference/api/#put-/v1/metadata/{id}
     * @param {string} metadataId   metadata identifier
     * @param {Object} metadata     metadata resource data
     * @return {Promise<Object>}    metadata resource
     */
    async put(metadataId, metadata) {
        return this.#unzer.put(this.#urlpath+'/'+metaId, metadata);
    }
}

module.exports = Metadata;