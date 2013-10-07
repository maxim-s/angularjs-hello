'use strict';

function HttpBooksController($scope,$http, $hello) {
	console.log($hello.sayHello());
	$http.get('/books').success(function(data,status){		
		console.log(data);
		$scope.books = data;
	});
}
app.controller("HttpBooksController", HttpBooksController);