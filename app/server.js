#!/usr/bin/env node

var util = require('util'),
    http = require('http'),
    fs = require('fs'),
    url = require('url'),
    events = require('events');

var DEFAULT_PORT = 8000;

var mimeMap = {
  'txt': 'text/plain',
  'html': 'text/html',
  'css': 'text/css',
  'xml': 'application/xml',
  'json': 'application/json',
  'js': 'application/javascript',
  'jpg': 'image/jpeg',
  'jpeg': 'image/jpeg',
  'gif': 'image/gif',
  'png': 'image/png',
  'svg': 'image/svg+xml'
};

function main() {
	var server = http.createServer(function(req, res) {
		if(req.url == "/") {
			fs.readFile("index.html", function(err, text){
			  res.setHeader("Content-Type", "text/html");
			  res.end(text);
			});
			return;
		}   
	  
		var path = ('./' + req.url).replace('//','/').replace(/%(..)/g, function(match, hex){
			return String.fromCharCode(parseInt(hex, 16));
		});  
	
		fs.readFile(path, function(err, text){
			res.writeHead(200, {
				'Content-Type': mimeMap[path.split('.').pop()] || 'text/plain'
			});
			
			res.end(text);
		});
	});
	console.log("Starting web server at localhost : " + DEFAULT_PORT);
	server.listen(DEFAULT_PORT);
};

main();
