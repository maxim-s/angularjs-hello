'use strict';

function ResourceBooksController($scope, $location, $books) {
    $scope.books = $books.getAll();
    console.log($scope.books);

    $scope.book = {};

    $scope.addBook = function () {
        var book = {
            _id: $scope.book.title + $scope.book.author,
            title: $scope.book.title,
            author: $scope.book.author
        };

        console.log(book);
        $books.save(book, function(){
            $scope.books.push(book);
            console.log($scope.books);
        });
    };

    $scope.deleteBook = function (code) {
        var index = $scope.getBookIndex(code);
        console.log("Remove " + index);

        var bookForDeleting = $scope.books[index];

        console.log(bookForDeleting);

        $books.delete(bookForDeleting, function(){
            $scope.books.splice(index, 1);
            console.log('deleted');
            console.log($scope.books);
        });
    };

    $scope.getBookIndex = function(id) {
        for (var i = 0; i < $scope.books.length; i++) {
            var book = $scope.books[i];

            if (book._id == id){
                return i;
            }
        }

        return -1;
    }
}

app.controller("ResourceBooksController", ResourceBooksController);