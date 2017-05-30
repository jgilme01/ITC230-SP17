"use strict";

let expect = require("chai").expect;
let pizza = require("../lib/pizza");

describe("Pizza module", () => {
	it("returns requested pizza", ()=> {
		let result = pizza.get("margherita");
		expect(result).to.deep.equal({name: "margherita", cheese:"mozzarella", base:"marinara"});
	});
 
	it("fails w/ invalid item", () => {
		let result = pizza.get("fake");
		expect(result).to.be.undefined;
	});


	it("deletes requested pizza", () => {
		let result = pizza.delete("margherita");
		expect (result.deleted).to.deep.equal(true);
	});
	
	it("fails delete w/ invalid item", () => {
		let result = pizza.delete("invalid");
		expect(result.deleted).to.deep.equal(false);
	});
	
	it("adds requested pizza", () => {
		let item = {name: "hawaiian", cheese: "cheddar", base: "acidic"};
		let result = pizza.add(item);
		expect (result.added).to.deep.equal(true);
	});
	
	it("fails add", () => {
		let item = {name: "hawaiian", cheese: "cheddar"};
		let result = pizza.delete(item);
		expect(result.deleted).to.deep.equal(false);
	});
	
});