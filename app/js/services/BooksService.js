'use strict';

function BooksSerrvice($resource){
	return $resource('/books/:code');
}

app.factory('$books', ['$resource', BooksSerrvice]);
