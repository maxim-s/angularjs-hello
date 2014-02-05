      
var pathHelper = require('path')

var RequestHandler = module.exports = function (rootDir, booksRepository, fs, qs) {
    function getPostObject(data) {
        for (var key in data) {
            return key;
        }
    }

    function getFilePathFromUri(uri) {
        var filePathParts = uri.split('//');

        var filePath = '';
        for (var i = 0; i < filePathParts.length; i++) {
            filePath = pathHelper.join(filePath, filePathParts[i]);
        }

        var encodedFilePath = filePath.replace(/%(..)/g, function (match, hex) {
            return String.fromCharCode(parseInt(hex, 16));
        });

        return pathHelper.join(rootDir, encodedFilePath);
    }

    function handleBooksRequest(req, res) {
        var handled = false;
        if (req.method == "POST") {
            var body = '';
            req.on('data', function (data) {
                body += data;
            });
            req.on('end', function () {
                var book = JSON.parse(getPostObject(qs.parse(body)));
                console.log(book);
                booksRepository.addBook(book);
                //addBook(JSON.parse(getPostObject(qs.parse(body))));
                handled = true;
            });
        }
        if (req.method == "DELETE") {
            console.log("delete", req.url);

            var urlParts = req.url.split('/');
            var code = urlParts[urlParts.length - 1];

            booksRepository.removeBook(code);

            return true;
        }
        if (req.method == "GET") {
            var books = booksRepository.getBooks();

            console.log(books);
            if (req.url == "/books") {
                res.writeHead(200, {
                    'Content-Type': mimeMap.json
                });
                res.end(JSON.stringify(books));
                handled = true;
            }
        }

        return handled;
    }

    function handleStaticFile(req, res) {
        if (req.url == '/') {
            return false;
        }

        var path = getFilePathFromUri(req.url);

        console.log("path is " ,path);

        fs.readFile(path, function (err, text) {

            res.end(text);
            return true;
        });
        return false;
    }

    function handleRootUrl(req, res) {
        if (req.url == "/") {
            //console.log("handle root",__dirname + "\\index.html");
            var indexPath = pathHelper.join(rootDir, "index.html");

            fs.readFile(indexPath, function (err, text) {
                console.log("reading file", err, text);
                res.setHeader("Content-Type", "text/html");
                res.end(text);
            });

            return true;
        }

        return false;
    }

    return {
        getHandlers: function () {
            return [handleBooksRequest, handleStaticFile, handleRootUrl];
        }
    };
};

var mimeMap = {
    'txt': 'text/plain',
    'html': 'text/html',
    'css': 'text/css',
    'xml': 'application/xml',
    'json': 'application/json',
    'js': 'application/javascript',
    'jpg': 'image/jpeg',
    'jpeg': 'image/jpeg',
    'gif': 'image/gif',
    'png': 'image/png',
    'svg': 'image/svg+xml'
};