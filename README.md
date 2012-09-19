Tinyerror [![Build Status](https://secure.travis-ci.org/dilvie/tinyerror.png)](http://travis-ci.org/dilvie/tinyerror)
=========

Easy custom errors in browsers, Node, and Applitude

Here's a simple example:

    var e = error('Error Name', 'Error message');


Once you have your custom error object, you can do whatever you like with it. Suggestions:

* Pass it into a promise rejection
* Log it
* Throw it (use with caution, don't throw in asynchronous code)


That's not all it can do, of course. Here's the full call signature:

    var e = error(name, message, code, proto);


The `code` parameter lets you assign an error code to an error, and store it for later reference on the `error.errors` object.

    var e = error('Not Found', 'Where did you last see it?', '404');


You can get errors by code by calling the `error.code()` method:

    var e = error.code('404'); // Get the cached 404 error.


Error codes can be any valid string, as long as they're unique. This snippet will retrieve a cached error with the code, "my custom error code".

    var e = error.code('my custom error code');


If you define an error code that already exists, the most recent definition wins (the existing one gets overridden).

The `proto` parameter lets you pass in a custom error prototype. For example, to inherit from TypeError:

    var e = error('TypeError', 'Expected type: string',
      'TypeError.StringExpected', new TypeError());


A globally shared pool of standard errors is great, but what if you have domain-specific errors you want to limit to your own module? No problem, just create a new instance of the `error` object. For instance, a media player might need some playback errors:

    var mediaError = error.createInstance(),
      e = mediaError('PlayError', 'Can\'t play media file.', 'PlayError');


# Tips

* Don't throw from async functions. Instead, reject a promise with it, or pass it into a callback. Note that none of these methods will throw an error for you automatically, so they're safe to use anywhere.

* Too many error types is just as bad as too few. Keep it in check.

* You can store and pre-load application-level custom error types from json. Just set or extend the error.errors object after you load the error library.


# Credit

* Eric Elliott, author of ["Programming JavaScript Applications"](http://shop.oreilly.com/product/0636920024231.do)
* [Tout.com](http://tout.com/)