var fs = require('fs');
var seedrandom = require('seedrandom');

var randomSeed = -1;

//random exclusive
function getRandom(min, max) {
	rng = (randomSeed == -1) ? seedrandom() : seedrandom(randomSeed);
	randomSeed = randomSeed + 11;
    return Math.trunc(rng() * (max - min) + min);
}

Array.prototype.contains = function(obj) {
    var i = this.length;
    while (i--) {
        if (this[i] === obj) {
            return true;
        }
    }
    return false;
}

module.exports =  {
	getLetter : function(data){
		var seed = data['seed'];
		var toName = data['to'];
		var fromName = data['from'];
		
		randomSeed = seed === undefined ? -1 : seed;

		var greetings = ["Dear", "Hey", "Hey there", "For you"];
		var letterNames  = fs.readFileSync('./letterStuff/beginnings.txt').toString().split("\n");
		var letterSentences = fs.readFileSync('./letterStuff/letters.txt').toString().split("\n");
		var letterEndings = fs.readFileSync('./letterStuff/endings.txt').toString().split("\n");

		var greeting = greetings[getRandom(0, greetings.length)] + " ";
		greeting += (toName === undefined) ? letterNames[getRandom(0, letterNames.length)] : toName + ",";

		var numParagraphs = getRandom(1, 4);
		var body = [];
		var usedNums = [];
		for(var p = 0; p < numParagraphs; p++)
		{
			var numSentences = (numParagraphs == 1) ? getRandom(4, 7) : getRandom(2, 4);
			var paragraph = "&nbsp;&nbsp;&nbsp;&nbsp;"
			for(var s = 0; s < numSentences; s++)
			{
				var sentenceNum = getRandom(0, letterSentences.length);
				while(usedNums.contains(sentenceNum))
				{
					sentenceNum = getRandom(0, letterSentences.length);
				}
				if(s == 0){
					var sentArray = letterSentences[sentenceNum].split(" ");
					while(sentArray[0] == "But" || sentArray[0] == "That" || sentArray[0] == "And")
					{
						sentenceNum = getRandom(0, letterSentences.length);
						var sentArray = letterSentences[sentenceNum].split(" ");
					}
				}

				usedNums.push(sentenceNum);
				paragraph += letterSentences[sentenceNum] + " ";
			}
			body.push(paragraph);
		}

		var ending = letterEndings[getRandom(0, letterEndings.length)] + "<br>";
		ending += (fromName === undefined) ? "Cameron" : fromName;

		//console.log(greeting + '\n\n' + body + ending);
		return({ 	
					greeting: greeting,
					body: body,
					ending: ending
				});
		//res.send(greeting + '\n\n' + body + ending);
	}
}



