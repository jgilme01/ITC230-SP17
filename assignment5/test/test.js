var expect = require("chai").expect;
var pizza = require("../lib/pizza");

describe("Pizza module", () => {
 it("returns requested pizza", function() {
   var result = pizza.get("margherita");
   expect(result).to.deep.equal({name: "margherita", cheese:"mozzarella", base:"marinara"});
 });
 
 it("fails w/ invalid item", () => {
   var result = pizza.get("fake");
   expect(result).to.be.undefined;
 });


 it("deletes requested pizza", function(){
	 var result = pizza.delete("margherita");
	 expect (result.deleted).to.deep.equal(true);
 });
	
 it("fails delete w/ invalid item", () => {
	var result = pizza.delete("invalid");
	 expect(result.deleted).to.deep.equal(false);
 });
	
 it("adds requested pizza", function(){
	 var item = {name: "hawaiian", cheese: "cheddar", base: "acidic"};
	 var result = pizza.add(item);
	 expect (result.added).to.deep.equal(true);
 });
	
 it("fails add", () => {
	 var item = {name: "hawaiian", cheese: "cheddar"};
	 var result = pizza.delete(item);
	 expect(result.deleted).to.deep.equal(false);
 });
	
});