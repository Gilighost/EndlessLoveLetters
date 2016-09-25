var letterGenerator = require('./letterGenerator');
var express = require('express');
var app = express();
var path = require('path');
var fs = require('fs');

const MAX_SEED = 9007199254749000;

function getRandomArbitrary(min, max) {
    return Math.trunc(Math.random() * (max - min) + min);
}

app.get('/', function(req, res) {
	var seed = req.query["seed"];
	if(isNaN(seed) || seed === undefined || seed > MAX_SEED || seed == "") 
	{ 
		seed = getRandomArbitrary(1, MAX_SEED);
		var redirectUrl = "?seed=" + seed;

		if(req.query["to"])
			redirectUrl += "&to=" + req.query["to"];
		if(req.query["from"])
			redirectUrl += "&from=" + req.query["from"];

		res.redirect(redirectUrl);
	} 
	else{
    	res.sendFile(path.join(__dirname + '/page/index.html'));
	}
});

app.get('/randomLetter', function(req, res) {
	var seed = (req.query['seed'] === undefined) ? "n/a" : req.query['seed'];
	var toName = (req.query['to'] === undefined) ? "n/a" : req.query['to'];
	var fromName = (req.query['from'] === undefined) ? "n/a" : req.query['from'];
	var requestQuery = "Seed: " + seed + "\nTo: " + toName + "\nFrom: " + fromName;

	var currentdate = new Date(); 
	var requestTime = "Request Time: " + (currentdate.getMonth()+1)  + "/" 
                + currentdate.getDate() + "/"
                + currentdate.getFullYear() + " @ "  
                + currentdate.getHours() + ":"  
                + currentdate.getMinutes() + ":" 
                + currentdate.getSeconds();

	fs.appendFile('request.log', requestTime + "\n" + requestQuery + "\n\n");
	var letter = letterGenerator.getLetter(req.query);
    res.json(letter);
});

app.use(express.static('page'));

console.log("Listening on 3000...")
app.listen(3000);