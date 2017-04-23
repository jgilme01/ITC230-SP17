'use strict'

let pizza = require("./pizza.js");
const express = require('express');
const app = express();
let handlebars = require("express-handlebars");  
app.engine('.html', handlebars({extname: '.html'})); 
app.set('view engine', '.html');
app.set('port', process.env.PORT || 3000);
app.use(express.static(__dirname + '/public')); // allows direct navigation to static files
app.use(require('body-parser').urlencoded({extended: true}));

app.get('/', function(req, res){
        res.type('text/html');
        res.sendFile(__dirname + '/public/home.html');
    });

//app.get or app.post
//everything after route is superfluous
app.get('/about', function(req, res){
        res.type('text/plain');
        res.send('About page');
    });

app.post('/get', function(req, res){
    console.log(req.body);    
        //res.type('text/plain');
        
        //imports get function from pizza object
        var got = pizza.get(req.body.name); //pass name object from query to pizza object as name
        let resultsGet = (got) ?JSON.stringify(got) : "Nothing returned"; //convert to string object, if returned, if not, signal nothing returned
        res.render('found', {query: req.body.name, result: resultsGet});
        
    });

app.get('/delete', function(req, res){
        res.type('text/plain');
        res.send('To delete, enter "?" + delete category + "=" + query. Example: "?name=neopolitan"\n');
        var deleted = pizza.delete(query.name);//call to pizza object, delete function with same query path
        //let resultsDel = (deleted) ? JSON.stringify(deleted) : "Doesn't exist, can't delete";
        res.send('Deleted: ' + query.name + '\n' + JSON.stringify(deleted));
    });

app.use(function(req, res, next){                     
        res.type('text/plain');                       
        res.status(404);        
        res.send('404 - Not Found'); 
    });

// custom 500 page 
app.use(function(err, req, res, next){              
        console.error(err.stack);                    
        res.type('text/plain');                      
        res.status(500);        
        res.send('500 - Server Error'); 
    });

app.listen(app.get('port'), function(){              
        console.log( 'Express started on http://localhost:' + app.get('port') + '; press Ctrl-C to terminate.' ); 
    });