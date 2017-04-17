'use strict'

//const expose = require("expose-js");

let pizzas = [
    {name: "margherita", cheese: "mozzarella", base: "marinara"},
    {name: "Greek", cheese: "feta", base: "pesto"},
    {name: "California", cheese: "ricotta", base: "olive oil"},
    {name: "neopolitan", cheese: "mozzarella", base: "marinara"},
    {name: "neopolitan", cheese: "mozzarella de buffuo", base: "olive oil"},
    ];

var searched = [];

exports.get = (name, item, array) => {
    pizzas.forEach(function(item, array) {
        if (item.name == name) {
            searched.push(item);
        }});
   
    
    console.log(searched);
}
 
//export get;