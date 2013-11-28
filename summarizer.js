
/*
  - BenchKitJS
  Testing framework, for running several web browser tests in a synchronized order.
*/


/*
 * Constructor for Summerizer
 */
var Summarizer = function() {
	this.tests = parseUrl(window.location.hash);//testsData;
	this.counter = 0;
	this.currentTest = null;
	this.iframe = document.getElementById("mainFrame");
	this.data = {};
	this.progressbar = new Progressbar("progressbar", "Running", this.tests.length)
}

/*
 * Start the iteration of the adapters
 */ 
Summarizer.prototype.start = function() {
	
	this.runAdapter();
}

/*
 * Load adapter and start the adapter
 * @name    name of the adapater
 * @path    path to the adapter(e.g "/adapter/testing/")
 */
Summarizer.prototype.loadAdapter = function(test) {
	// Store this to make it accessible in a function scope
	var self = this;	

	this.currentTest = test;

	this.output("Running: " + this.currentTest.name + "<br />");

	this.progressbar(this.currentTest.name)
	
	// Callback for the adapater, so that it can send the data back
	// to the summarizer
	window.adapterDone = function(data) {
		self.doneAdapter(data);
	}
	// Print function for the left div, used by adapters to print results.
    window.output = function(text) { 
    	self.output(text);
    }

   	 //Toggles fullscreen to on or off depending if "state" is "on" or "off"
    window.toggleFullscreen = function(state) {

		//Set to fullscreen
		if (state === "on") {	
		    window.parent.document.getElementById("left").style.width = "0%";
		    window.parent.document.getElementById("left").style.display = "none";
		    window.parent.document.getElementById("right").style.width = "100%";
		}
	
		//Set to normal screen size
		if (state === "off") {
		    window.parent.document.getElementById("left").style.display = "block";
		    window.parent.document.getElementById("left").style.width = "50%";
		    window.parent.document.getElementById("right").style.width = "50%";
		}
    }


	// Load the adapter to the iframe
	this.iframe.src = test.path + "adapter.html";
	this.iframe.onload = function() {
		this.contentWindow.createAdapter(test.args);
	}
}
/*
 * Called when an adapter is done.
 * Iterate and run the next adapter.
 * If the counter is equal to test.lenght, run complete 
 * @data     formated data from the adapter(result)
 */
Summarizer.prototype.doneAdapter = function(data) {
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
Summarizer.prototype.runAdapter = function() {
	// Next test
	var test = this.tests[this.counter]

	this.loadAdapter(test)
}

/*
 * Output the completed sessions data to both dom and console.
 */
Summarizer.prototype.complete = function() {
	this.iframe.onload = null;
	this.progressbar("done");

	this.iframe.src = "";
	this.output("Complete");
	this.output("");
	console.log(JSON.stringify(this.data));
	this.output(JSON.stringify(this.data));
}

/*
 * Output helper
 */
Summarizer.prototype.output = function(text) {
	document.getElementById("output").innerHTML += text ;
}

// New instance of summarizer
var summarizer = ""
function startSummarizer() {	
	document.getElementById("output").innerHTML = "";
	summarizer = new Summarizer();
	summarizer.start();
}
startSummarizer();

if ("onhashchange" in window) { // event supported?
    window.onhashchange = startSummarizer;
}
else { // event not supported:
    var storedHash = window.location.hash;
    window.setInterval(function () {
        if (window.location.hash != storedHash) {
            storedHash = window.location.hash;
			startSummarizer();
        }
    }, 100);
}
