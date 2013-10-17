
/*
  -BenchKitJS
  Testing framework, for running several web browser tests in a synchronized order.
*/


/*
 * Constructor for Summerizer
 */
var Summerizer = function() {
	this.tests = testsData;
	this.counter = 0;
	this.currentTest = null;
	this.iframe = document.getElementById("mainFrame");
	this.data = {};
}

/*
 * Start the iteration of the adapters
 */ 
Summerizer.prototype.start = function() {	
	this.runAdapter();
}

/*
 * Load adapter and start the adapter
 * @name    name of the adapater
 * @path    path to the adapter(e.g "/adapter/testing/")
 */
Summerizer.prototype.loadAdapter = function(test) {
	// Store this to make it accessible in a function scope
	var self = this;	
	this.currentTest = test;
	
	this.output("Running: " + this.currentTest.name);

	// Callback for the adapater, so that it can send the data back
	// to the summerizer
	window.adapterDone = function(data) {
		self.doneAdapter(data);
	}

	// Load the adapter to the iframe
	this.iframe.src = test.path + "adapter.html";
	this.iframe.onload = function() {
		var args = {};
		args["group"] = test.group[0];
		this.contentWindow.createAdapter(args)
	}
}
/*
 * Called when an adapter is done.
 * Iterate and run the next adapter.
 * If the counter is equal to test.lenght, run complete 
 * @data     formated data from the adapter(result)
 */
Summerizer.prototype.doneAdapter = function(data) {
	this.data[this.currentTest.name] = data;

	// Increase counter
	this.counter++;
	// Check if done
	if(this.counter < this.tests.length) {
		this.runAdapter();
	} else {
		this.complete();
	}
}

/*
 * Run adapter according to counter.
 */
Summerizer.prototype.runAdapter = function() {
	// Next test
	var test = this.tests[this.counter]
	this.loadAdapter(test)
}

/*
 * Output the completed sessions data to both dom and console.
 */
Summerizer.prototype.complete = function() {
	this.iframe.onload = null
	this.iframe.src = "";
	this.output("Complete");
	this.output("");
	console.log(JSON.stringify(this.data));
	this.output(JSON.stringify(this.data));
}

/*
 * Output helper
 */
Summerizer.prototype.output = function(text) {
	document.getElementById("output").innerHTML += "<p>" + text + "</p>";
}

// New instance of summerizer
var summerizer = new Summerizer();
summerizer.start();

