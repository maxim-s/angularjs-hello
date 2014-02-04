var RequestHandler = module.exports = function (rootDir, booksRepository, fs, qs) {
    function getPostObject(data) {
        for (var key in data) {
            return key;
        }
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
            console.log("delete", req);
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

        var path = rootDir + "\\" + ('./' + req.url).replace('//', '\\').replace(/%(..)/g, function (match, hex) {
            return String.fromCharCode(parseInt(hex, 16));
        });
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
            fs.readFile(rootDir +  "\\index.html", function (err, text) {
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