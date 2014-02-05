'use strict';

function ResourceBooksController($scope, $location, $books) {
    $scope.books = $books.query();
    console.log($scope.books);

    $scope.book = {};

    $scope.addBook = function () {
        var book = new $books({
            _id: $scope.book.title + $scope.book.author,
            title: $scope.book.title,
            author: $scope.book.author
        });

        console.log(book);

        book.$save(book, function(){
            $scope.books.push(book);
            console.log($scope.books);
        });
    };

    $scope.deleteBook = function (index) {
        var bookForDeleting = $scope.books[index];

        console.log("Remove " + index);
        console.log(bookForDeleting);

//        bookForDeleting.$delete();

        bookForDeleting.$delete(function(){
            $scope.books.splice(index, 1);
        });
    };
}

app.controller("ResourceBooksController", ResourceBooksController);