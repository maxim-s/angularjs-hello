'use strict';

function BooksService($resource){
	return $resource('/books/:code', { code: '@_id' });
}

app.factory('$books', ['$resource', BooksService]);
