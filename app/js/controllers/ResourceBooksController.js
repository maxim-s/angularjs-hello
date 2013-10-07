'use strict';

function ResourceBooksController($scope, $location, $books) {
	console.log("in");
	$scope.books = $books.query();	
	$scope.book = {};
	$scope.addBook = function(){
		$books.save($scope.book,function(){
			//console.log( window.location);
			//window.location.href = window.location.href;
			$scope.books.push($scope.book);
			$scope.$apply()
		});
	};
	
}
app.controller("ResourceBooksController", ResourceBooksController);