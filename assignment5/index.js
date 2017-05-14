 'use strict'

let pizza = require("./lib/pizza.js");
const express = require('express');
const app = express();
let exphbs = require("express-handlebars");  
app.engine('html', exphbs({extname: '.html', defaultLayout: 'main'}));
//app.engine('handlebars', exphbs({defaultLayout: 'main'})); 
//app.engine('html', exphbs({extname: '.html'}));
app.set('view engine', 'html');
app.set('port', process.env.PORT || 3000);
app.use(express.static(__dirname + '/public')); // allows direct navigation to static files
app.use(require('body-parser').urlencoded({extended: true}));

//handlebars.registerPartials(__dirname + 'views/partials');

app.get('/', function(req, res){
        var list = pizza.list();
        res.render('home', {title: 'home', pizzas:list});
    });

app.get('/about', function(req, res){
        res.type('text/plain');
        res.send('About page');
    });

app.get('/contact', function(req, res) {             
         res.type('text/plain');
        res.send('Under Construction');
    })


app.post('/get', function(req, res){
    console.log(req.body);
        var got = pizza.get(req.body.name); //pass name object from query to pizza object as name
        res.render('found', {query: req.body.name, result: got});
        
    });

app.get('/get', function(req, res) {
	var got = pizza.get(req.query.name);
        res.render('found', {query: req.query.name, result: got});
});

app.post('/delete', function(req, res){
        var deleted = pizza.delete(req.body.name);//call to pizza object
        res.render('deleted', {delete: req.body.name, result: deleted});
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