const UnzerSimple = require('./UnzerSimple');

/**
 * Set/get webhooks
 *
 * @class Webhooks
 * @link https://docs.unzer.com/reference/webhook-supported-events/
 * @author Alexander Merz
 * @licence Apache Licence 2.0
 */
class Webhooks {

    /**
     * Init
     * @param {UnzerSimple} unzer Unzer main class
     */
    constructor(unzer) {
        this._urlpath = '/webhooks';
        this._unzer = unzer;
    }

    /**
     * Delete a webhook
     * @link
     * @param {string} eventId      identifier of the webhook
     * @return {Promise<Object>}    Unzer response
     */
    async delete(eventId = null) {
        let url = this._urlpath;
        if(eventId != null) {
            url = url + '/' + eventId;
        }
        return this._unzer.delete(url);
    }

    /**
     * Get information about a webhook
     * @link
     * @param {string} eventId      identifier of the webhook
     * @return {Promise<Object>}    webhook data
     */
    async get(eventId = null) {
        let url = this._urlpath;
        if(eventId != null) {
            url = url + '/' + eventId;
        }
        return this._unzer.get(url);
    }

    /**
     * Create a webhook
     * @link
     * @param {Object} webhook      webhook data
     * @return {Promise<Object>}    Unzer response
     */
    async post(webhook) {
        return this._unzer.post(this._urlpath, webhook);
    }

    /**
     * Update a webhook
     * @link
     * @param {string} eventId      identifier of the webhook
     * @param {Object} webhook      webhook data
    * @return {Promise<Object>}     Unzer response
     */
    async put(eventId, webhook) {
        return this._unzer.put(this._urlpath+'/'+eventId, webhook);
    }

    /**
     * Retrieves the content of the retrieveUrl
     * When Unzer calls a webhook URL, the retrieveUrl will be part of the body, the URL
     * provides additional information about the event
     *
     * @param {string|Object}   url URL to access or an object with the property retrieveUrl
     * @return {Promise<Object>}    Response of the retrieveUrl request
     */
    async getRetrieveUrl(url) {
        let rurl = url;
        if(typeof url != 'string') {
            if(typeof url != 'object') {
                throw "URL parameter is not a string, but also not an object.";
            }
            if(!url.hasOwnProperty('retrieveUrl')) {
                throw "URL parameter is not a string, but is missing the property retrieveURL.";
            }
            rurl = url.retrieveUrl;
        }
        rurl = rurl.replace(UnzerSimple.BASE_URL+'/'+UnzerSimple.API_VERSION, '');
        return this._unzer.get(rurl);
    }

    /**
     * Checks if for the url and event there is already an hook registered
     *
     * @param {string} url          webhook url
     * @param {string} event        event name
     * @return {Promise<boolean|Object>}    webhook data, if webhook is already registered, or false if not
     */
    async isRegistered(url, event = null) {
        const result = await this.get();
        const events = result.events;
        let eventmatch = false;
        events.forEach((e) => {
            console.log(e);
            let match = false;
            if(e.url == url) {
                match = true;
                if(null != event && e.event == event) {
                    match = true
                } else {
                    match = false;
                }
            }
            if(match) {
                eventmatch = e;
            }
        });
        return eventmatch;
    }
}

module.exports = Webhooks;