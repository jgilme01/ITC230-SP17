var http = require("http"), fs = require("fs");  

function serveFile(res, path, contentType, responseCode) {
    if(!responseCode) responseCode = 200;
    fs.readFile(__dirname + path, function(err, data) {
        if(err) {
            res.writeHead(500, {'Content-Type': 'text/plain' });
            res.end('500: Internal Error');
        }else {
            res.writeHead(responseCode, { 'Content-Type': contentType });
            res.end(data);
        }
        
    });
}

http.createServer(function(req,res) {
    
    console.log("url =" + req.url)
    console.log("dir =" + __dirname)
    
    var path = req.url.toLowerCase()
    switch(path) {
        case '/':
            serveFile(res, '/public/home.html', 'text/html');
        
       /* fs.readFile(__dirname + '/public/home.html', function read(err, data){
            if (err) {throw err;}
            res.writeHead(200, {'Content-Type': 'text/plain'});
            res.end(data);})
            res.writeHead(200, {'Content_Type':'text/plain'});
            res.end(__dirname + '/public/home.html')*/
        
    
        //res.end('Home page')
        break;
        case '/about':
        res.writeHead(200, {'Content-Type': 'text/plain'});
        res.end('About page')
        break;
        default:
        res.writeHead(404, {'Content-Type': 'text/plain'});
        console.log(404);
        res.end('Not Found');
    }
}).listen(process.env.PORT || 3000);