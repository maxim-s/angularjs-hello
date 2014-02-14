'use strict';

function ResourceBooksService($resource){
	var res =  $resource('/books/:code', { code: '@_id' });
    return {
        getAll:function(){
            return res.query();
        },
        save:function(book, cb){
            res.save(book, cb);
        },
        getById:function(id){
            return res.get({"code":id});
        },
        delete:function(book,cb){
            console.log(book);
            console.log(cb);
            res.delete({_id: book._id}, cb);
        }
    }

}

app.factory('$books', ['$resource', ResourceBooksService]);
