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


function handleNumbersRequest(req,res){
	res.writeHead(200, {
				'Content-Type': mimeMap.json
	});
	
	res.end(JSON.stringify([{first:"123"},{second:"456"}]));
}

var books = [{title:"book 1", author : "author 1", code:1}, {title:"book 1", author : "author 1", code:1}];

function addBook(book){
	books.push(book);
}

function removeBook(code){
	for(var i = 0; i< books.length ; i++){
		if (books[i].code == code){
			books.pop(books[i]);
		}
	}
}

function handleBooksRequest(req,res){
	var handled = false;
	console.log(req.method,req.url);
	if (req.method == "POST"){
		req.on("data",function(data){
			addBook(JSON.parse(data));
		});
	}
	if (req.method == "DELETE"){
		console.log("delete" , req);
	}
	if (req.method == "GET"){
		if (req.url == "/books"){
			res.writeHead(200, {
				'Content-Type': mimeMap.json
			});	
			res.end(JSON.stringify(books));
			handled = true;	
		}				
	}
	
	return handled;
}

function main() {
	var server = http.createServer(function(req, res) {
		if(req.url == "/") {
			fs.readFile("index.html", function(err, text){
			  res.setHeader("Content-Type", "text/html");
			  res.end(text);
			});
			return;
		}   
		console.log("handle 1");
		if (handleBooksRequest(req,res)){
			return;			
		}
	  console.log("handle 2");
		var path = ('./' + req.url).replace('//','/').replace(/%(..)/g, function(match, hex){
			return String.fromCharCode(parseInt(hex, 16));
		});  
	
		fs.readFile(path, function(err, text){
			res.writeHead(200, {
				'Content-Type': mimeMap[path.split('.').pop()] || 'text/plain'
			});
			
			res.end(text);
		});
		console.log("handle 3");
	});
	console.log("Starting web server at localhost : " + DEFAULT_PORT);
	server.listen(DEFAULT_PORT);
};



main();
