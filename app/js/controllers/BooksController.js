'use strict';

app.controller("BooksController", function($scope,$http) {
	$http.get('/books').success(function(data,status){
		console.log(data);
		$scope.books = data;
	});
});