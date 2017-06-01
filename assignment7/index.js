"use strict";

const express = require("express");

const app = express();
const exphbs = require("express-handlebars");  
app.engine("html", exphbs({extname: ".html", defaultLayout: "main"}));
//app.engine("handlebars", exphbs({defaultLayout: "main"})); 
//app.engine("html", exphbs({extname: ".html"}));
app.set("view engine", "html");
app.set("port", process.env.PORT || 3000);
app.use(express.static("public")); // allows direct navigation to static files
app.use(require("body-parser").urlencoded({extended: true}));
app.use("/api", require("cors")());

let routes = require("./lib/routes")(app);

//handlebars.registerPartials(__dirname + "views/partials");

app.use((req,res) => {
	res.type("text/plain"); 
	res.status(404);
	res.send("404 - Not found");
});

// custom 500 page 
/*app.use((req, res) => {        
	//console.error(err.stack);            
	//res.type("text/plain");             
	res.status(500);        
	res.send("500 - Server Error"); 
});*/

app.listen(app.get("port"), () => {              
	console.log("Express started on http://localhost:" +
	app.get("port") + "; press Ctrl-C to terminate."); 
});
