'use strict';

function ResourceBooksController($scope, $location, $books) {
    $scope.books = $books.getAll();
    console.log($scope.books);

    $scope.book = {};

    $scope.addBook = function () {
        var book = new $books({
            _id: $scope.book.title + $scope.book.author,
            title: $scope.book.title,
            author: $scope.book.author
        });

        console.log(book);
        $books.save(book, function(){
            $scope.books.push(book);
            console.log($scope.books);
        });
    };

    $scope.deleteBook = function (index) {
        var bookForDeleting = $scope.books[index];

        console.log("Remove " + index);
        console.log(bookForDeleting);

//        bookForDeleting.$delete();

        $books.delete(bookForDeleting,function(){
            $scope.books.splice(index, 1);
        });
    };
}

app.controller("ResourceBooksController", ResourceBooksController);