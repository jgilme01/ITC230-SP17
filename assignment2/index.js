'use strict'

var http = require("http"), fs = require("fs"), qs = require("querystring"); var pizza = require("./pizza.js");

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
    var url = req.url.split("?");//to split query on ? for search
    var query = qs.parse(url[1]);//to separate remainder of into objects
    var path = url[0].toLowerCase();//casing for consistency
    
    switch(path) {
        case '/':
            serveFile(res, '/public/home.html', 'text/html');
        break;
        
        case '/about':
        res.writeHead(200, {'Content-Type': 'text/plain'});
        res.end('About page')
        break;
        
        case '/get':
        //imports get function from pizza object
        var got = pizza.get(query.name); //pass name object from query to pizza object as name
        res.writeHead(200, {'Content-Type': 'text/plain'});
        res.write('For a search, enter "?" + search category + "=" + query. Example: "?name=neopolitan"\n')
        let resultsGet = (got) ? JSON.stringify(got) : "Nothing returned"; //convert to string object, if returned, if not, signal nothing returned
        res.end('Results of ' + query.name + ': \n' + resultsGet);
        break;
        
        case '/delete':
        var deleted = pizza.delete(query.name);//call to pizza object, delete function with same query path
        res.writeHead(200, {'Content-Type': 'text/plain'});
        res.write('To delete, enter "?" + delete category + "=" + query. Example: "?name=neopolitan"\n')
        //let resultsDel = (deleted) ? JSON.stringify(deleted) : "Doesn't exist, can't delete";
        res.end('Deleted: ' + query.name + '\n' + JSON.stringify(deleted))
        break;
        
        default:
        res.writeHead(404, {'Content-Type': 'text/plain'});
        console.log(404);
        res.end('Not Found');
    }
    
}).listen(process.env.PORT || 3000);