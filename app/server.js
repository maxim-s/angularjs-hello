#!/usr/bin/env node

var util = require('util'),
    http = require('http'),
    fs = require('fs'),
    url = require('url'),
    events = require('events'),
    readline = require('readline'),
    stream = require('stream'),
	  qs = require('querystring'),
    RequestHandler = require('./infrastructure/RequestHandler.js'),
    BooksRepository = require('./BooksRepository.js');

var DEFAULT_PORT = 8000;

console.log(BooksRepository);

var booksRepository = new BooksRepository(fs,readline,stream);
var requestHandler = new RequestHandler(booksRepository,fs,qs);


function main() {
	var server = http.createServer(function(req, res) {
		var handlers = requestHandler.getHandlers();

		for (var i = 0; i < handlers.length; i++) {
			var isRequestHandled = handlers[i](req, res);
			if (isRequestHandled) {
				return;
			}
		}

	});
	console.log("Starting web server at localhost : " + DEFAULT_PORT);
	server.listen(DEFAULT_PORT);
};



main();
