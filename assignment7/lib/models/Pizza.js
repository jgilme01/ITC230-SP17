"use strict";

let mongoose = require("mongoose");
let credentials = require("../credentials.js");

// remote db connection settings. For security, connectionString should be in a separate file not committed to git
//console.log(credentials.user(), credentials.password());
let connectionString = "mongodb://"+credentials.user()+":"+credentials.password()+"@ds137271.mlab.com:37271/jgilmongo";
let options = { server: { socketOptions: { keepAlive: 1, connectTimeoutMS: 30000 } } };
mongoose.connect(connectionString, options);

// local db connection settings 
// var ip = process.env.ip || "127.0.0.1";
// mongoose.connect("mongodb://" +ip+ "/<DB_NAME>");

let conn = mongoose.connection; 
conn.on("error", console.error.bind(console, "connection error:"));

// define Pizza model in JSON key/value pairs
// values indicate the data type of each key
let mySchema = mongoose.Schema({
	name: { type: String, required: true },
	cheese: String,
	base: { type: String, required: true }
}); 

module.exports = mongoose.model("Pizza", mySchema);