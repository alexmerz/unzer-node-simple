const https = require('https');

/**
 * Base UnzerSimple class
 * used by the included function modules, but can be also used for makeing
 * direct access to the REST API
 *
 * @class UnzerSimple
 * @author Alexander Merz
 * @licence Apache Licence 2.0
 */
class UnzerSimple {

    /**
     * Init
     *
     * @param {string}  privatekey  Private key from UnzerSimple
     * @param {boolean} verbose     enable log output to console
     */
    constructor(privatekey, verbose = false) {
        this._privatekey = privatekey;
        this._verbose = verbose;
    }

    /**
     * Makes a PUT call to the UNZER API
     *
     * @param {string}  urlpath path of the API url, excluding server and version number
     * @param {object}  params  data to pass as part of the https body request
     * @param {object}  headers optional header for the https request
     * @param {boolean} useJson if true, the params data is passed as JSON, also sets the header to JSON
     * @returns {Promise<object>}    resolves to an plain object with the UnzerSimple responze
     */
    async put(urlpath, params, headers = {}, useJson = false) {
        headers['Content-Type'] = 'application/x-www-form-urlencoded';
        if(useJson) {
            headers['Content-Type'] = 'application/json';
        }
        let sparams = params;
        if(typeof params != 'string') {
            if(!useJson) {
                sparams = UnzerSimple.formdata2body(params);
            } else {
                sparams = JSON.stringify(params);
            }
        }
        return UnzerSimple.request(this._privatekey, urlpath, 'PUT', sparams, headers, this._verbose);
    }

    /**
     * Makes a DELETE call to the UNZER API
     *
     * @param {string}  urlpath path of the API url, excluding server and version number
     * @param {object}  headers optional header for the https request
     * @returns {Promise<object>}    resolves to an plain object with the UnzerSimple responze
     */
    async delete(urlpath, headers = {}) {
        return UnzerSimple.request(this._privatekey, urlpath, 'DELETE', '', headers, this._verbose);
    }

    /**
     * Makes a GET call to the UNZER API
     *
     * @param {string}  urlpath path of the API url, excluding server and version number
     * @param {object}  headers optional header for the https request
     * @returns {Promise<object>}    resolves to an plain object with the UnzerSimple responze
     */
    async get(urlpath, headers = {}) {
        return UnzerSimple.request(this._privatekey, urlpath, 'GET', '', headers, this._verbose);
    }

    /**
     * Makes a POST call to the UNZER API
     *
     * @param {string}  urlpath path of the API url, excluding server and version number
     * @param {object}  params  data to pass as part of the https body request
     * @param {object}  headers optional header for the https request
     * @param {boolean} useJson if true, the params data is passed as JSON, also sets the header to JSON
     * @returns {Promise<object>}    resolves to an plain object with the UnzerSimple responze
     */
    async post(urlpath, params, headers = {}, useJson = false) {
        headers['Content-Type'] = 'application/x-www-form-urlencoded';
        if(useJson) {
            headers['Content-Type'] = 'application/json';
        }
        let sparams = params;
        if(typeof params != 'string') {
            if(!useJson) {
                sparams = UnzerSimple.formdata2body(params);
            } else {
                sparams = JSON.stringify(params);
            }
        }
        return UnzerSimple.request(this._privatekey, urlpath, 'POST', sparams, headers, this._verbose);
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
     * @param {string}  privatekey  private key for UnzerSimple
     * @param {string}  urlpath     path of the API url, excluding server and version number
     * @param {object}  params      data to pass as part of the https body request
     * @param {object}  headers     optional header for the https request
     * @param {boolean} useJson     if true, the params data is passed as JSON, also sets the header to JSON
     * @returns {Promise<object>}   resolves to an plain object with the UnzerSimple responze
     */
    static async request(privatekey, urlpath, method = 'GET', body = '', headers = {}, verbose = false) {
        const url = UnzerSimple.BASE_URL + '/' + UnzerSimple.API_VERSION + urlpath;

        if(verbose) {
            console.log(url);
        }

        const result = new Promise((resolve, reject) => {
            let sbody = body;
            if(body != '') {
                if(typeof body !== 'string') {
                    sbody = JSON.stringify(body);
                }
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
UnzerSimple.BASE_URL = 'https://api.unzer.com';
UnzerSimple.API_VERSION = 'v1';

module.exports = UnzerSimple;