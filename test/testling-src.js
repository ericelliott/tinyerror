/*global require */
var test = require('testling'),
  error = require('./tinyerror.js');

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
