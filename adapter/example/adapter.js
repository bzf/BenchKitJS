/*
 * Constructor for Adapter
 */x
var Adapter = function(args) {
	this.group = args.group
	
	// Information about the adapter
	this.config = {
		name : "Example",
		version : "1.0.1"
	};
	this.runTest();
}

/*
 * Runs when a new instace of Adapter is created
 */
Adapter.prototype.runTest = function() {
	var self = this;
	// Reference to the iframe and contentWindow
	var iframe = document.getElementById("adapterFrame");
	var contentWindow = iframe.contentWindow;
	
	// Load the test
	document.getElementById("adapterFrame").src = "test/load.html";
	
	// There are three ways to get the data from the test.

	// ------------------------------------------------------------
	// The first way is to replace a function of the original test.
	// Like in the example below where we replace the "finish" function
	// of the test.

	// Wait for iframe to load
	iframe.onload = function() {
		// Write over the function finish
		contentWindow.finish = function() {
			// Send data to parseData for formatting
			self.parseData(contentWindow.output);
		}
	};
	
	// ------------------------------------------------------------
	// The second way is to edit the test with one line
	// by adding:
 	//     window.parent.testDone(data)
	//     - the data parameter is the data we are intrested in
	//       from the test
	window.testDone = function(data) {
		self.parseData(data);
	}
	
	// ------------------------------------------------------------
	// The third way is used when we don't know when the test is really
	// done or when we only want a test to run for certain time.
	var time = 2000; // 2000ms
	setTimeout(
		function() {
			var data = contentWindow.dataThatWeWant;
			self.parseData(data);
		}, time);
	
}

/*
 * Format the data. E.g sum of avg if several runs.
 * Sends the data back to the summerizer
 */
Adapter.prototype.parseData = function(data) {
	window.parent.adapterDone(data);
}

/* Called to create an adapter
 * @args [object]
 */
function createAdapter(args) {
	new Adapter(args)
}
