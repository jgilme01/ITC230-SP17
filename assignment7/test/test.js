"use strict";

let expect = require("chai").expect;
let Pizza = require("../lib/models/Pizza");

describe("Pizza module", () => {
	
	it("returns requested pizza", ()=> {
		let result = Pizza.find({name:"greek"});
		expect(result).to.have.keys({name: 'greek'});
	});
 
	it("fails w/ invalid item", () => {
		let result = Pizza.find({"name":"fake"});
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