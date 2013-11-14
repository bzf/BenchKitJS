/*
 * Mozilla Dromaeo *MODIFIED* - JavaScript test suite.
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

	var cssquery = ["cssquery-ext", "cssquery-dojo", "cssquery-yui", "cssquery-jquery", "cssquery-prototype", "cssquery-mootools"];
	var jslib = ["jslib-attr", "jslib-event-jquery", "jslib-event-prototype", /*"jslib-mod",*/ "jslib-style", "jslib-traverse-prototype", "jslib-traverse-jquery"];
	var dromaeo = ["dromaeo-core", "dromaeo-object-array", "dromaeo-string", "dromaeo-object-regex", "dromaeo-object-string", "dromaeo-3d"];
	var dom = ["dom-attr", "dom-query", "dom-trav", "dom-mod"];
	var v8 = ["v8"];
	var sunspider = ["sunspider"];

	switch (args.group) {
		case "js":
			regexps = regexps.concat(sunspider);
			break;
		case "dom":
			regexps = regexps.concat(sunspider);
			break;
		default:
			regexps = regexps.concat(cssquery, jslib, dromaeo, dom);
	}
	
	cssquery, jslib, dromaeo, dom, v8, sunspider = null;

	this.runTest(regexps);
}

Adapter.prototype.runTest = function(regexps) {
	var self = this;

	var start = Date.now();

	var counter = regexps.length-1;

	document.getElementById("adapterFrame").src = null;
	document.getElementById("adapterFrame").src = "test/index.html?(" + regexps[counter] +")";
	window.parent.output("<br />" + regexps[counter]);

	window.testDone = function(data) {
		
		self.data = self.data.concat(data);
		if (0 != counter){
			counter--
			window.parent.output(": " + (Date.now() - start)/1000 + "s<br />");
			window.parent.output(regexps[counter]);
			document.getElementById("adapterFrame").src = null;
			setTimeout(function() {
				document.getElementById("adapterFrame").src = "test/index.html?(" + regexps[counter] +")";

				start = Date.now();
			}, 10000);
		}
		else {
			window.parent.output(": " + (Date.now() - start)/1000 + "s<br />");
			self.parseData(self.data);
		}
	}
}

Adapter.prototype.parseData = function(data) {
	window.parent.adapterDone(data);
}

function createAdapter(args){new Adapter(args);}