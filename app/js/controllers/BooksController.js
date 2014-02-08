'use strict';

function BooksController($scope, $httpbooks) {
    $scope.books = $httpbooks.getAll();
}
app.controller("BooksController", BooksController);