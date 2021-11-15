/**
 * central include file
 * @author Alexander Merz
 * @licence Apache Licence 2.0
 */

const UnzerSimple = require('./libs/UnzerSimple');
const Webhooks = require('./libs/Webhooks');
const Baskets = require('./libs/Baskets');
const Customers = require('./libs/Customers');
const Metadata = require('./libs/Metadata');
const Paypage = require('./libs/Paypage');

module.exports = {
    UnzerSimple,
    Webhooks,
    Baskets,
    Customers,
    Metadata,
    Paypage
};