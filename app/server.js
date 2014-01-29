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

// Books Repository

function BooksRepository (){
	var books = [];

	function getBookIndex(bookCode) {
		for (var i = 0; i < books.length; i++) {
			var book = books[i];
			
			if (book.code == bookCode){
				return i;
			}
		};

		return -1;
	}

	this.addBook = function (book) {
		book.code = books.length;
		books.push(book);
	};

	this.getBooks = function() {
		return books;
	}

	this.removeBook = function(book) {
		var bookIndex = getBookIndex(book.code);

		// todo: throw something when there is no such book.
		books.splice(bookIndex, 1);
	};

	this.updateBook = function(book) {
		var bookIndex = getBookIndex(book.code);

		// todo: throw something when there is no such book.
		books[bookIndex] = book;
	};
};

var booksRepository = new BooksRepository();

booksRepository.addBook({ title : "book 1", author : "author 1" })
booksRepository.addBook({ title : "book 2", author : "author 2" })


// Books Repository end 

function handleNumbersRequest(req,res){
	res.writeHead(200, {
				'Content-Type': mimeMap.json
	});
	
	res.end(JSON.stringify([{first:"123"},{second:"456"}]));
}

function getPostObject(data){
	for(var key in data){
				return key;
			};
}

function handleBooksRequest(req,res) {
	var handled = false;
	if (req.method == "POST") {
		 var body = '';
		req.on('data',function(data){
			body += data;
		});
		 req.on('end', function () {
		 	var book = JSON.parse(getPostObject(qs.parse(body)));
		 	booksRepository.addBook(book);
            //addBook(JSON.parse(getPostObject(qs.parse(body))));
			handled = true;	
        });
	}
	if (req.method == "DELETE") {
		console.log("delete" , req);
	}
	if (req.method == "GET") {
		var books = booksRepository.getBooks();

		console.log(books);
		if (req.url == "/books") {
			res.writeHead(200, {
				'Content-Type': mimeMap.json
			});	
			res.end(JSON.stringify(books));
			handled = true;	
		}				
	}
	
	return handled;
}

function handleRootUrl(req, res) {
	if(req.url == "/") {
		fs.readFile("index.html", function(err, text){
		  res.setHeader("Content-Type", "text/html");
		  res.end(text);
		});
		
		return true;
	}

	return false;
}

function handleStaticFile(req, res) {
	var path = ('./' + req.url).replace('//','/').replace(/%(..)/g, function(match, hex){
		return String.fromCharCode(parseInt(hex, 16));
	});

	fs.readFile(path, function(err, text){
		res.writeHead(200, {
			'Content-Type': mimeMap[path.split('.').pop()] || 'text/plain'
		});
		
		res.end(text);
	});
}

function main() {
	var server = http.createServer(function(req, res) {
		var handlers = [handleRootUrl, handleBooksRequest, handleStaticFile];

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
