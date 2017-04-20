var http = require("http"), fs = require("fs"), qs = require("querystring"); var pizza = require("./pizza.js");

//import get from 'pizza';//imports default query function from pizza object

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
    
    //console.log("url =" + req.url)
    //console.log("dir =" + __dirname)
    var url = req.url.split("?");//to split query on ? for search
    var query = qs.parse(url[1]);//to separate remainder of into objects
    var path = url[0].toLowerCase();
    console.log(query);
    
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
        case '/get':
        //import get from 'pizza';//imports default query function from pizza object
        var results = pizza.get(query.name); //pass name object from query to pizza object as name
        res.writeHead(200, {'Content-Type': 'text/plain'});
        res.end('For a search, enter "?" + search category + "=" + query. "?name=neopolitan"')
        res.end(JSON.stringify(results));
        break;
        default:
        res.writeHead(404, {'Content-Type': 'text/plain'});
        console.log(404);
        res.end('Not Found');
    }
}).listen(process.env.PORT || 3000);