'use strict';

function ResourceBooksController($scope, $location, $books) {
    $scope.books = $books.query();
    console.log($scope.books);

    $scope.book = {};

    $scope.addBook = function () {
        $books.save($scope.book, function () {
            $scope.books.push($scope.book);
            console.log($scope.books);
        });
    };

    $scope.deleteBook = function (index) {
        console.log("Remove " + index);
    };
}

app.controller("ResourceBooksController", ResourceBooksController);