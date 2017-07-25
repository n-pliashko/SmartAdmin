process.env.NODE_ENV='testing';

const jsdom = require("jsdom");
const { JSDOM } = jsdom;
require('mock-local-storage');

var exposedProperties = ['window', 'navigator', 'document'];

const dom = new JSDOM('<!doctype html><html lang="en"><head></head><body></body></html>');

global.window = dom.window;
global.document = dom.window.document;
global.window.jQuery = global.window.$ =  require("jquery");
global.window.moment = require('moment');
global.window._ = require('lodash');

Object.keys(dom.window).forEach((property) => {
  if (typeof global[property] === 'undefined') {
    exposedProperties.push(property);
    global[property] = dom.window[property];
  }
});

global.navigator = {
  userAgent: 'node.js'
};


require('core-js/es6/promise');
require('jquery-ui-npm/jquery-ui.min.js');
require('imports-loader?jQuery=jquery!jquery-color/jquery.color.js');
require("bootstrap");

context = require.context('../', true, /\.js$/);
context.keys().forEach(context);
module.exports = context;