const https = require('https');

const Webhooks = require('./libs/Webhooks');
const Baskets = require('./libs/Baskets');
const Customers = require('./libs/Customers');
const Metadata = require('./libs/Metadata');
const Paypage = require('./libs/Paypage');

/**
 * Base Unzer class
 * used by the included function modules, but can be also used for makeing
 * direct access to the REST API
 *
 * @class Unzer
 * @author Alexander Merz
 * @licence Apache Licence 2.0
 */
class Unzer {
    static BASE_URL = 'https://api.unzer.com';
    static API_VERSION = 'v1';

    #privatekey = null;
    #verbose = false;

    /**
     * Init
     *
     * @param {string}  privatekey  Private key from Unzer
     * @param {boolean} verbose     enable log output to console
     */
    constructor(privatekey, verbose = false) {
        this.#privatekey = privatekey;
        this.#verbose = verbose;
    }

    /**
     * Makes a PUT call to the UNZER API
     *
     * @param {string}  urlpath path of the API url, excluding server and version number
     * @param {object}  params  data to pass as part of the https body request
     * @param {object}  headers optional header for the https request
     * @param {boolean} useJson if true, the params data is passed as JSON, also sets the header to JSON
     * @returns {Promise<object>}    resolves to an plain object with the Unzer responze
     */
    async put(urlpath, params, headers = {}, useJson = false) {
        headers['Content-Type'] = 'application/json';
        if(useJson) {
            headers['Content-Type'] = 'application/json';
        }
        let sparams = params;
        if(typeof params != 'string') {
            if(!useJson) {
                sparams = Unzer.formdata2body(params);
            } else {
                sparams = JSON.stringify(params);
            }
        }
        return Unzer.request(this.#privatekey, urlpath, 'PUT', sparams, headers, this.#verbose);
    }

    /**
     * Makes a DELETE call to the UNZER API
     *
     * @param {string}  urlpath path of the API url, excluding server and version number
     * @param {object}  headers optional header for the https request
     * @returns {Promise<object>}    resolves to an plain object with the Unzer responze
     */
    async delete(urlpath, headers = {}) {
        return Unzer.request(this.#privatekey, urlpath, 'DELETE', '', headers, this.#verbose);
    }

    /**
     * Makes a GET call to the UNZER API
     *
     * @param {string}  urlpath path of the API url, excluding server and version number
     * @param {object}  headers optional header for the https request
     * @returns {Promise<object>}    resolves to an plain object with the Unzer responze
     */
    async get(urlpath, headers = {}) {
        return Unzer.request(this.#privatekey, urlpath, 'GET', '', headers, this.#verbose);
    }

    /**
     * Makes a POST call to the UNZER API
     *
     * @param {string}  urlpath path of the API url, excluding server and version number
     * @param {object}  params  data to pass as part of the https body request
     * @param {object}  headers optional header for the https request
     * @param {boolean} useJson if true, the params data is passed as JSON, also sets the header to JSON
     * @returns {Promise<object>}    resolves to an plain object with the Unzer responze
     */
    async post(urlpath, params, headers = {}, useJson = false) {
        headers['Content-Type'] = 'application/x-www-form-urlencoded';
        if(useJson) {
            headers['Content-Type'] = 'application/json';
        }
        let sparams = params;
        if(typeof params != 'string') {
            if(!useJson) {
                sparams = Unzer.formdata2body(params);
            } else {
                sparams = JSON.stringify(params);
            }
        }
        return Unzer.request(this.#privatekey, urlpath, 'POST', sparams, headers, this.#verbose);
    }

    /**
     * Transforms data passed as object into a x-www-form-urlencoded string
     *
     * @param {object}  params  data to pass as part of the https body request
     * @return {string} string for https body data
     */
    static formdata2body(params) {
        const formdata = [];
        for(let key in params) {
            formdata.push(encodeURIComponent(key) + '=' + encodeURIComponent(params[key]));
        }
        return formdata.join('&');
    }

    /**
     * Most basic and generic https request method
     *
     * @static
     * @param {string}  privatekey  private key for Unzer
     * @param {string}  urlpath     path of the API url, excluding server and version number
     * @param {object}  params      data to pass as part of the https body request
     * @param {object}  headers     optional header for the https request
     * @param {boolean} useJson     if true, the params data is passed as JSON, also sets the header to JSON
     * @returns {Promise<object>}   resolves to an plain object with the Unzer responze
     */
    static async request(privatekey, urlpath, method = 'GET', body = '', headers = {}, verbose = false) {
        const url = Unzer.BASE_URL + '/' + Unzer.API_VERSION + urlpath;

        if(verbose) {
            console.log(url);
        }

        const result = new Promise((resolve, reject) => {
            let sbody = body;
            if(body != '') {
                if(typeof body !== 'string') {
                    sbody = JSON.stringify(body);
                }
                headers['Content-Length'] = sbody.length;
            }
            if(verbose) {
                console.log(sbody);
                console.log(headers);
            }
            const req = https.request(
                url,
                {
                    auth : privatekey + ':',
                    headers : headers,
                    method : method,
                },
                (response) => {
                    let data = '';
                    response.on('data', (d) => {
                        data = data + d;
                    });
                    response.on('end', () => {
                        try {
                            if(verbose) {
                                console.log(data);
                            }
                            const jdata = JSON.parse(data);
                            return resolve(jdata);
                        } catch(e) {
                            return reject(e);
                        }
                    });
                    response.on('error', (e) => {
                        return reject(e);
                    });
                }
            );
            if(sbody != '') {
                req.write(sbody);
            }
            req.end();
        });
        return result;
    }
}

module.exports = {
    Unzer,
    Webhooks,
    Baskets,
    Customers,
    Metadata,
    Paypage
};