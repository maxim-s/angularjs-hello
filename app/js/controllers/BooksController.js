'use strict';

function BooksController($scope,$http, $hello) {
	console.log($hello.sayHello());
	$http.get('/books').success(function(data,status){		
		console.log(data);
		$scope.books = data;
	});
}
app.controller("BooksController", BooksController);