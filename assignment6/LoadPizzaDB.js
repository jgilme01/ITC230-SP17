"use strict";

//useful:https://developer.mozilla.org/en-US/docs/Learn/Server-side/Express_Nodejs/mongoose

let mongoose = require("mongoose");
const Pizza = require("./models/Pizza");

let pizzaInsert = [
{name: "margherita", cheese: "mozzarella", base: "marinara"},
{name: "greek", cheese: "feta", base: "pesto"},
{name: "california", cheese: "ricotta", base: "olive oil"},
{name: "neopolitan", cheese: "mozzarella", base: "marinara"},
{name: "hawaiian", cheese: "cheddar", base: "acidic"}];

// insert a new document into the database
Pizza.collection.insert(pizzaInsert);

Pizza.count((err, result)=>{
	console.log(result);
});

// find all documents 
Pizza.find((err, result)=> {
    // output error if one occurred
	if (err) {
		console.log(err);
	} else {
        // otherwise output the array of documents
		console.log(result);
		mongoose.disconnect();
	}
});