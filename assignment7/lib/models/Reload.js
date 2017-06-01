"use strict";

const Pizza = require("./Pizza");

let pizzaInsert = [
{name: "margherita", cheese: "mozzarella", base: "marinara"},
{name: "greek", cheese: "feta", base: "pesto"},
{name: "california", cheese: "ricotta", base: "olive oil"},
{name: "neopolitan", cheese: "mozzarella", base: "marinara"},
{name: "hawaiian", cheese: "cheddar", base: "acidic"}];

exports.insert = () => {
	Pizza.collection.insert(pizzaInsert);
};