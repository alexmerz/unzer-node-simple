# unzer-node-simple
Thin, incomplete wrapper around the Unzer payment API for Node.js.

This package nor the author are related in any way with Unzer.com (formerly known as Heidelpay). I highly
recommend to checkout their official [Node.js-SDK](https://github.com/unzerdev/nodejs-sdk) first and only use
this package, when you run into trouble with the official one. You can use both packages simultaneously.

## Why should you NOT use this package?

* No support by Unzer (and no support by me)

* You need to be familiar with the [API reference](https://docs.unzer.com/reference/api/)

* Functions do not validate/check data passed to them , you should know what you are doing.

* The package offers only functions for stuff I need.

## Why should you use this package?

* The package has no external dependencies and is very lightweight.

* You need to set/get data properties not covered by the official SDK

* You want an easy way to handle retrieve URLs of webhook calls.

## How to use this package?

Install the package via your favourite node.js package manager.

In general you set up a *Unzer* instance with your private sandbox or production key,
then you pass that instance to one of the function modules:

```js
const {Unzer, Baskets, Customers} = require('../index');

const unzer = new Unzer('<your-private-key-here>');

const basket = new Baskets(unzer);
const customer = new Customers(unzer);
```

The function modules are named after the corresponding sections in the [API reference](https://docs.unzer.com/reference/api/)
and/or URL routes. For example:

- *Baskets* -> `https://https://api.unzer.com/v1/baskets`
- *Paypage* -> `https://https://api.unzer.com/v1/paypage`

Also the methods in the function modules are direct representations of the
REST API methods given in the reference. For example for
(https://docs.unzer.com/reference/api/#get-/v1/paypage/{id})[https://docs.unzer.com/reference/api/#get-/v1/paypage/{id}]
and
(https://docs.unzer.com/reference/api/#post-/v1/paypage/charge)[https://docs.unzer.com/reference/api/#post-/v1/paypage/charge]

```js
const {Unzer, Paypage} = require('../index');

const unzer = new Unzer('<your-private-key-here>');
const paypage = new Paypage(unzer);

const get_result = await paypage.get('paypage_id');

const payload = {
    orderId : 'abc-123456-hi',
    amount : "100",
    currency : "EUR",
    returnUrl : "https://example.com/unzer/back",
    resources : {
        customerId : ...,
        basketId : ...,
        metadataId : ...
    }
};
const post_result = await paypage.charge(payload);
```

The method names usually follow the HTTP method ( *post()*, *get()*, *put()*, *delete()* ), or references the
relevant URL part ( *charge()*, *authorize()* ). Parameter names are usually the same as in the API reference.
If a method requires data for the HTTP body, that parameter is named *payload* (see example above) or named after the
type of resource like *customer*.

The return value is always a Promise, that returns the decoded JSON data as plain old object after the call.
The methods do not check the result for an Unzer error/success message. The only reason the methods throw an exception is an error
with the underlaying (HTTPS request)[https://nodejs.org/api/https.html#httpsrequesturl-options-callback].

## Generic usage

Aside of the function modules you can always call any API route via the Unzer object methods: ```get()```, ```post()```,
```delete()```, ```put()```. These methods will take care of the authentication via key, also the server name and api version: you
need only to pass the correct url path.

```js
const {Unzer, Paypage} = require('../index');

const unzer = new Unzer('<your-private-key-here>');

const result = unzer.post('/types/my_method_id/recurring',
                    {some_body_data_1:..., other_body_data:....},
                    {'x-some-custom-header':'My header value'},
                    true)
```

