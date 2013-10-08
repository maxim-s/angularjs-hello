#!/usr/bin/env node

var util = require('util'),
    http = require('http'),
    fs = require('fs'),
    url = require('url'),
    events = require('events'),
	qs = require('querystring');

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

var books = [{title:"book 1", author : "author 1", code:1}, {title:"book 2", author : "author 2", code:2}];

function addBook(book){
		console.log(book);
	books.push(book);
}

function removeBook(code){
	for(var i = 0; i< books.length ; i++){
		if (books[i].code == code){
			books.pop(books[i]);
		}
	}
}

function getPostObject(data){
	for(var key in data){
				return key;
			};
}

function handleBooksRequest(req,res){
	var handled = false;
	if (req.method == "POST"){
		 var body = '';
		req.on('data',function(data){
			body += data;
		});
		 req.on('end', function () {
            addBook(JSON.parse(getPostObject(qs.parse(body))));
			handled = true;	
        });
	}
	if (req.method == "DELETE"){
		console.log("delete" , req);
	}
	if (req.method == "GET"){
		console.log(books);
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
		if (handleBooksRequest(req,res)){
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
