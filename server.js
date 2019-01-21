
// these are required for the express to work on the node.js

// require express-session for session initialization
var session = require("express-session");

// require express
var express = require("express");

// set a variable called app to store express object
var app = express();



// port no is defined here so we can now use the word "port" instead of putting the hardcoded port no
var port = 8000;

// require bodyParser to get the JSON data from the POST request
var bodyParser = require('body-parser');


// setting the directory name "views" where we will store all the templated stored
app.set('views', __dirname + '/views');

// letting the node know that we will be using ejs(Embedded JavaScript) as its templating engine
app.set('view engine', 'ejs');

// this is to let express know about the static files such as html, css and images
app.use(express.static(__dirname + "/static"));

// letting the express know about the bodyParser
app.use(bodyParser.urlencoded({extended: true}));

// letting express know about the sercet word to be used to enable session
app.use(session({secret: 'surveyform'}));


// this is the main route, localhost:8000/index. this will render the view called index which is a form
// since we also have another index in static folder, express will look for it first.
// contents of both indexes are same in case someone goes to root route, i.e. localhost:8000

app.get("/index", function(req, res){
    res.render("index"); 
});


// this is the POST request, once the form is submitted, this route is hit, 
// we are saving the JSON object in varaible called req.session.myData and then we are redirecting this route
app.post('/submit', function(req, res){
    console.log(req.body);
    req.session.myData = req.body;
    res.redirect("/results");
});


// this is where the POST route is redirected back to and we are now sending in the req.session.myData to results page
app.get("/results", function(req, res){
    res.render("results", req.session.myData);
});


// a route to handle the "return back" button, it is a get request
app.get("/Back", function(req, res){
    res.redirect("/index");
});


// this is where we tell the port to listen to the port that we choose at the top of the server
app.listen(port, function(){
    console.log(`Now listening on port no ${port}`);
});