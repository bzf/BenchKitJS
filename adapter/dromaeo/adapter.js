/*
 * Mozilla Dromaeo - JavaScript test suite.
 * http://dromaeo.com/
 *
 * Supported argument is group, if the group is defined in the constructor 
 * with a specific regexp a set of predetermined tests will be excecuted. 
 *
 * The default behaviour is to cluster the tests and run them in groups, 
 * this will prevent memory shortage on embedded devices. This will be managed by the testDone function 
 * wich will keep track of the tests with a counter, when all the tests are done the parseData function will 
 * run the callback and return to main.
 *
 * For then collection of data to work properly some lines of code are needed in the webrunner.js file.
 * Firstly, there is a callback on line 358 wich will serve data to this adapter when the test is done.
 * Second, on line 431 there's some code that will start the tests automatically when the page is loaded. 
 *
 */

var Adapter = function(args) {
	this.data = [];
	var regexps = [];

	this.config = {
		name : "Dromaeo",
		version : "?"
	};

	cssquery = ["cssquery-(ext|dojo)", "cssquery-(jquery|yui)", "cssquery-(mootools|prototype)"];
	jslib = ["jslib-attr", "jslib-event", "jslib-mod", "jslib-style", "jslib-trav"];

	switch (args.group) {
		case "js":
			regexps = regexps.concat(["sunspider"], jslib, ["v8", "dromaeo"]);
			break;
		case "dom":
			regexps = regexps.concat(cssquery, ["dom"]);
			break;
		default:
			regexps = regexps.concat(["sunspider", "dromaeo"], cssquery, jslib, ["dom", "v8"]);
	}
	
	this.runTest(regexps);
}

Adapter.prototype.runTest = function(regexps) {
	var self = this;


	counter = regexps.length-1;

	document.getElementById("adapterFrame").src = "test/index.html?(" + regexps[counter] +")";

	window.testDone = function(data) {
		
		self.data = self.data.concat(data);
		if (0 != counter){
			counter--
			document.getElementById("adapterFrame").src = "test/index.html?(" + regexps[counter] +")";
		}
		else {
			self.parseData(self.data);
		}
	}
}

Adapter.prototype.parseData = function(data) {
	window.parent.adapterDone(data);
}

function createAdapter(args){new Adapter(args);}

