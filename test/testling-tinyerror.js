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

/*global require */
var test = require('testling'),
  error = require('../dist/tinyerror.js');

test('error properties', function (t) {
  t.equal(typeof error, 'function', 
    'error function should exist');

  t.ok(error.errors, 'error.errors object should exist');

  t.ok(error.proto, 'error.proto object should exist');

  t.equal(typeof error.create, 'function',
    'error.create method should exist');

  t.equal(typeof error.code, 'function',
    'error.code method should exist');

  t.equal(typeof error.createInstance, 'function',
    'error.createInstance method should exist');

  t.end();
});

test('error with two arguments', function (t) {
  var e = error('MyError', 'My custom error message.');

  t.ok(e.name === 'MyError' &&
    e.message === 'My custom error message.',
    'error() should return a custom error message.');

  t.end();
});

test('error with three arguments', function (t) {

  var e = error('MyError', 'My custom error message.', 'my-code'),
    c = error.code('my-code');

  t.ok(e.name === 'MyError' &&
    e.message === 'My custom error message.' &&
    e.code === 'my-code',
    'error() should return a custom coded error message.');

  t.ok(c.name === 'MyError' &&
    c.message === 'My custom error message.' &&
    c.code === 'my-code',
    '.code() should return a cached error message.');

  try {
    throw c;
  } catch (e) {
    t.ok(e.name === 'MyError' &&
      e.message === 'My custom error message.' &&
      e.code === 'my-code',
      'You should be able to throw and catch custom errors.');    
  }

  t.end();
});

test('instance safety', function (t) {
  var e, c, error2, e2, c2;
  e = error('MyError', 'My custom error message.', 'my-code');
  c = error.code('my-code');
  error2 = error.createInstance();
  e2 = error2('MyError', 'A different error message.', 'my-code');
  c2 = error2.code('my-code');

  t.ok(c.name === 'MyError' &&
    c.message === 'My custom error message.' &&
    c.code === 'my-code',
    'New instances should not override cached error message on old instances.');

  t.ok(c2.name === 'MyError' &&
    c2.message === 'A different error message.' &&
    c2.code === 'my-code',
    '.code() should retrieve errors from the correct instance.');

  t.end();
});