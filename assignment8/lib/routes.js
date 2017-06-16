"use strict";

module.exports = (app) => {
	const Pizza = require("../models/Pizza.js");
	const Reload = require("../models/Reload.js");
	//const Pizza = require("../models/pizzaLocal.js");


	app.get("/", (req, res) => {
		Pizza.find({}, (err, items) => {
			if (err) {
				console.log(err);
				return next(err);
			}
			else{
				//console.log(items);
				res.render("home", {pizzas:JSON.stringify(items), title:"Pizzas"});
			}
		});
	});

	app.get("/about", (req, res) => {
		res.type("text/plain");
		res.send("About page");
	});

	app.get("/contact", (req, res) => {             
		res.type("text/plain");
		res.send("Under Construction");
	});


	app.post("/get", (req, res) => {
		Pizza.find({"name":req.body.name}, (err, items) => {
			if (err){
				console.log(err);
				return next (err);
			}
			else{
				//console.log(items);
				res.render("found", {query: req.body.name, result: items});
			}
		}); 
	});

	app.get("/get", (req, res) => {
		Pizza.find({"name":req.query.name}, (err, items) => {
			if (err){
				console.log(err);
				return next (err);
			}
			else{
				console.log(items);
				res.render("found", {query: req.query.name, result: items});
			}
		});
	});

	app.post("/delete", (req, res) => {
		Pizza.remove({name:req.body.name}, (err, items) => {
			if (err){
				console.log(err);
				res.render("deleted", {delete:req.body.name});
			}
			else{
				//console.log(items);
				res.render("deleted", {delete: req.body.name, result: items.result.n});
			}
			//res.end();
		});	
	});

	app.post("/reload", (req, res) => {
		Reload.insert();
		res.redirect("back");
		//res.end();
	});
	
	app.post("/api/add", (req, res) => {
		console.log(req.body);
		let new_pizza = {name:req.body.name, cheese:req.body.cheese, base:req.body.base};
		Pizza.findOneAndUpdate({name:req.body.name}, {$set: new_pizza}, {upsert:true, new:true/*, runValidators:true*/}, (err, result) => {
			if (err) {
				res.json({"result":"unsuccessful"});
				console.log(err); 
				return next (err);
			}
			if (result) {//modify return result
				console.log(result);
				res.json({"result":{name:result.name, cheese:result.cheese, base:result.base}}); 
			}
			else {
				res.json({"result":"unsuccessful"});
			}
			//res.end();
		});
	});	
	
	app.post("/api/pizza(s)?(/:item)?", (req, res) => {
		if (req.params.item){
			Pizza.findOne({name:req.body.name}, (err, found) => {
				if (err){
					console.log(err);
					return next (err);
				}
				if (found) {
					//console.log(found);
					res.json({
						name: found.name,
						cheese: found.cheese,
						base: found.base,
					});
				}
				else {
					res.status(404).send("404 - not found");
				}
			});
		}
		if (!req.params.item) {
			Pizza.find({}, (err, pizzas) => {
				if (err){
					console.log(err);
					return next (err);
				}
				if (pizzas) {
					//console.log(pizzas);
					res.json(pizzas.map((pizza) => {
						return{
							name: pizza.name,
							cheese: pizza.cheese,
							base: pizza.base,
						};
					}));
				}
				else {
					res.status(404).send("404 - not found");
				}
			});
		}
	});
	
	app.post("/api/delete", (req, res) => {
		Pizza.remove({name:req.body.name}, (err, item) => {
			if (err){
				console.log(err);
				return next (err);
			}
			if (item.result.n === 1) {
				//console.log(item.result.n);
				res.json({"result":"deleted"});
			}
			else {
				res.status(404).send("404 - not found");
			}
		});	
	});
	
	app.get("/api/pizza(s)?/:item", (req, res) => {
		Pizza.findOne({"name":req.params.item}, (err, found) => {
			if (err){
				console.log(err);
				return next (err);
			}
			if (found) {
				//console.log(found);
				res.json({
					name: found.name,
					cheese: found.cheese,
					base: found.base,
				});
			}
			else {
				res.status(404).send("404 - not found");
			}
		});
	});
	
	app.get("/api/pizzas", (req, res) => {
		Pizza.find({}, (err, pizzas) => {
			if (err){
				console.log(err);
				return next (err);
			}
			if (pizzas) {
				//console.log(pizzas);
				res.json(pizzas.map((pizza) => {
					return{
						name: pizza.name,
						cheese: pizza.cheese,
						base: pizza.base,
					};
				}));
			}
			else {
				res.status(404).send("404 - not found");
			}
		});
	});
	
	app.get("/api/delete/:item", (req, res) => {
		Pizza.remove({_id:req.params.item}, (err, item) => {
			if (err){
				console.log(err);
				return next (err);
			}
			if (item.result.n === 1) {
				//console.log(item.result.n);
				res.json({"result":"deleted"});
			}
			else {
				res.status(404).send("404 - not found");
			}
		});	
	});
	
	

};