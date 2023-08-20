// Used only for local development
var http = require('http')
var fs = require('fs')
var path = require('path');

const PORT = 8080

fs.readFile('./index.html', function(error, html){
    if (error) throw error;
    http.createServer(function(request, response) {
        if (request.url === '/') {
            response.writeHead(200, {"Content-Type": "text/html"});
            response.end(html);
        } else if (request.url.startsWith('/images/')) {
            const imagePath = path.join(__dirname, request.url);
            fs.access(imagePath, fs.constants.F_OK, (err) => {
                if (err) {
                    response.writeHead(404);
                    response.end();
                } else {
                    const extension = path.extname(imagePath).toLowerCase();
                    const contentType = {
                        '.jpg': 'image/jpeg',
                        '.png': 'image/png',
                    }[extension];
                    if (contentType) {
                        response.writeHead(200, {"Content-Type": contentType});
                        fs.createReadStream(imagePath).pipe(response);
                    } else {
                        response.writeHead(404);
                        response.end();
                    }
                }
            });
        } else {
            response.writeHead(404);
            response.end();
        }
    }).listen(PORT);
});
