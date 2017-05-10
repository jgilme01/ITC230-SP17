'use strict'

let pizzas = [
    {name: "margherita", cheese: "mozzarella", base: "marinara"},
    {name: "greek", cheese: "feta", base: "pesto"},
    {name: "california", cheese: "ricotta", base: "olive oil"},
    {name: "neopolitan", cheese: "mozzarella", base: "marinara"},
    {name: "neopolitan", cheese: "mozzarella de buffuo", base: "olive oil"},
    ];

exports.get = (name) => {
    return pizzas.find((item) => {
        return item.name == name;
    });
}

//delete function, using filter array higher order method
exports.delete = (name) => {
        let oldLength = pizzas.length;
        var newPizzas = pizzas.filter((item) => {
            return item.name !== name;
        });
        pizzas = newPizzas; 
        //returns JSON, to be converted to string
        return { deleted: pizzas.length !== oldLength, total: pizzas.length };   
    }

//add function
exports.add = (item) => {
	let oldLength = pizzas.length;
	var newLength = pizzas.push(item);
	return {added: newLength !== oldLength, total: pizzas.length};
}
