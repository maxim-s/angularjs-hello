'use strict';

function ResourceBooksController($scope, $location, $books) {
	$scope.books = $books.query();	
	console.log($scope.books );

	$scope.book = {};
	$scope.addBook = function(){
		$books.save($scope.book,function(){
			//console.log( window.location);
			//window.location.href = window.location.href;
			$scope.books.push($scope.book);
		});
	};
	
}
app.controller("ResourceBooksController", ResourceBooksController);