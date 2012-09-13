/**
 * TinyError
 *
 * Sugar for custom errors in JavaScript, for browsers, Node,
 * and Applitude. Easily define, use, and re-use custom errors.
 * How you handle them is up to you.
 *
 * Copyright (c) Eric Elliott 2012
 *
 * License: MIT
 **/

var global = global || this, module = module || undefined;

(function (app) {
  'use strict';
  var namespace = 'error',

    error = function () {
      return error.throwCustom.apply(error, [].slice.call(arguments));
    },

    api = error;

  error.errors = {};

  error.proto = new Error();

  error.create = function create(name, message, code) {
    var e = Object.create(this.proto);

    e.name = name;
    e.message = message;

    if (code) {
      this.errors[code] = e;
    }

    return e;
  };

  error.throwCustom = function throwCustom() {
    throw error.create.apply(error, [].slice.call(arguments));
  };

  error.throwCode = function throwCode(code, message) {
    var e = this.errors[code] || Object.create(error.proto);
    e.message = message || e.message || code;
    throw e;
  };

  // don't change anything from here down.
  if (app.register) {
    app.register(namespace, api);
  } else {
    namespace = app.exports ? 'exports' : namespace;
    app[namespace] = api;
  }

}(global.applitude || module || this));
