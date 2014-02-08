'use strict';

function HttpBooksService($http){
    return {
        getAll:function(){
            var result = [];
            $http.get('/books').success(function(data,status){
                console.log(data);
                result = data;
            });
            return result;
        },
        save:function(book, cb){
            //
        },
        getById:function(id){
            //
        },
        delete:function(book,cb){
            //
        }
    }

}

app.factory('$httpbooks', ['$http', HttpBooksService]);
