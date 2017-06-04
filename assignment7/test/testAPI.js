"use strict";

let assert = require("chai").assert;
let http = require("http");
var rest = require("restler");

describe("Pizza module", () => {
	
	var base = "http://localhost:3000";
	
	it("returns requested pizzas array", ()=> {
		rest.get(base+"/api/margherita", )
		let result = pizza.get("margherita");
		expect(result).to.deep.equal({name: "margherita", cheese:"mozzarella", base:"marinara"});
	});
 
	it("fails w/ invalid item", () => {
		let result = pizza.get("fake");
		expect(result).to.be.undefined;
	});
}