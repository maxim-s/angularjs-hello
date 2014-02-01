var BooksRepository = module.exports = function (fs, readline, stream){
	var books = readAll(fs,readline,stream);
    console.log(books);
	function getBookIndex(id) {
	    for (var i = 0; i < books.length; i++) {
			var book = books[i];

			if (book._id == id){
				return i;
			}
		};

		return -1;
	}

	this.addBook = function (book) {
		books.push(book);
	};

	this.getBooks = function() {
		return books;
	}

	this.removeBook = function(book) {
		var bookIndex = getBookIndex(book.code);

		// todo: throw something when there is no such book.
		books.splice(bookIndex, 1);
        save(fs,books);
	};

	this.updateBook = function(book) {
		var bookIndex = getBookIndex(book.code);

		// todo: throw something when there is no such book.
		books[bookIndex] = book;
        save(fs,books);
	};
};

function readAll(fs){
    return JSON.parse(fs.readFileSync(__dirname+ "/books.json").toString());
}


function save(fs, books){
    fs.writeFileSync(__dirname+ "/books.json", books.toString());

}