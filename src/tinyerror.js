/**
 * TinyError
 *
 * Sugar for custom errors in JavaScript, for browsers, Node,
 * and Applitude. Easily define, use, and re-use custom errors.
 * How you handle them is up to you.
 *
 * Copyright (c) Eric Elliott 2012
 *
 * With contributions Copyright (c) Tout.com
 *
 * License: MIT
 **/

// Polyfill
(function () {
  'use strict';
  if (!Object.create) {
    Object.create = function (o) {
      function F() {}
      F.prototype = o;
      return new F();
    };
  }  
}());

var global = global || this, module = module || undefined;

(function (app) {
  'use strict';
  var namespace = 'error',
    factory = function factory() {
      var error = function () {
          return error.create.apply(error, [].slice.call(arguments));
        };

      error.errors = {};

      error.proto = new Error();

      error.create = function create(name, message, code, proto) {
        var e = Object.create(proto || this.proto);

        // easily identify this as an error object:
        e.error = true;

        e.name = name;
        e.message = message;

        if (code) {
          e.code = code;
          this.errors[code] = e;
        }

        return e;
      };

      error.code = function getByCode(code, message) {
        var e = this.errors[code] || Object.create(error.proto);
        e.message = message || e.message || code;
        return e;
      };

      return error;
    },
    api = factory();
  api.createInstance = factory;

  // don't change anything from here down.
  if (app.register) {
    app.register(namespace, api);
  } else {
    namespace = app.exports ? 'exports' : namespace;
    app[namespace] = api;
  }

}(global.applitude || module || this));
