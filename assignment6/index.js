'use strict';

const Pizza = require('./models/Pizza.js');
const express = require('express');
const app = express();
let exphbs = require('express-handlebars');  
app.engine('html', exphbs({extname: '.html', defaultLayout: 'main'}));
//app.engine('handlebars', exphbs({defaultLayout: 'main'})); 
//app.engine('html', exphbs({extname: '.html'}));
app.set('view engine', 'html');
app.set('port', process.env.PORT || 3000);
app.use(express.static(__dirname + '/public')); // allows direct navigation to static files
app.use(require('body-parser').urlencoded({extended: true}));

//handlebars.registerPartials(__dirname + 'views/partials');

app.get('/', function(req, res){
	Pizza.find({}, function (err, items){
		if (err) {
			console.log(err);
			return next(err);
		}
		else{
		//console.log(items);
		res.render('home', {title: 'home', pizzas:items});
		}
	});
});

app.get('/about', function(req, res){
	res.type('text/plain');
	res.send('About page');
});

app.get('/contact', function(req, res) {             
	res.type('text/plain');
	res.send('Under Construction');
});


app.post('/get', function(req, res){
	Pizza.find({'name':req.body.name}, function (err, items){
		if (err){
			console.log(err);
			return next (err);
		}
		else{
			//console.log(items);
			res.render('found', {query: req.body.name, result: items});
		}
	}); 
});

app.get('/get', function(req, res) {
	Pizza.find({'name':req.query.name}, function (err, items){
		if (err){
			console.log(err);
			return next (err);
		}
		else{
			//console.log(items);
			res.render('found', {query: req.query.name, result: items});
		}
	});
});

app.post('/delete', function(req, res){
	Pizza.remove({name:req.body.name}, function (err, items){
		if (err){
			console.log(err);
			res.render('deleted', {delete:req.body.name});
		}
		else{
			//console.log(items);
			res.render('deleted', {delete: req.body.name, result: items.result.n});
		}
	});	
});

app.use(function(req, res){              
	res.type('text/plain');                
	res.status(404);        
	res.send('404 - Not Found'); 
});

// custom 500 page 
app.use(function(err, req, res){        
	console.error(err.stack);            
	res.type('text/plain');             
	res.status(500);        
	res.send('500 - Server Error'); 
});

app.listen(app.get('port'), function(){              
	console.log('Express started on http://localhost:' +
	app.get('port') + '; press Ctrl-C to terminate.'); 
});