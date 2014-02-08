'use strict';

function BooksService($resource){
	var res =  $resource('/books/:code', { code: '@_id' });
    return {
        getAll:function(){
            return res.query();
        },
        save:function(book, cb){
            book.$save(cb);
        },
        getById:function(id){
            return res.get({"code":id});
        },
        delete:function(book,cb){
            book.$delete(cb);
        }
    }

}

app.factory('$books', ['$resource', BooksService]);
