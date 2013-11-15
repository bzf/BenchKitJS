/* 
 * Mozilla Kraken - JavaScript Benchmark (version 1.1)
 * https://wiki.mozilla.org/Kraken
 * 
 * Arguments into the Constructor are not used by this adapter.
 * 
 * The adapter will be default behaviour run the Kraken 1.1 test.
 * It will take no precautions against memory usage.
 * 
 * For the adapter to work properly we have to override the
 * finish() function in test/index.html, line 118 with
 * our own finish() function on line 33.
 */


// Constructor
var Adapter = function(args) {
	
	this.runTest();
}

Adapter.prototype.runTest = function() {
	var self = this;
	
	document.getElementById("adapterFrame").src = "test/index.html";
	
	var iframe = document.getElementById("adapterFrame");
	var contentWindow = iframe.contentWindow;

	// Wait for iframe to load
	iframe.onload = function() {
		// Write over the function finish in kraken
		contentWindow.finish = function() {
			self.parseData(contentWindow.output);
		}
	};
	

}

Adapter.prototype.parseData = function(data) {
	window.parent.adapterDone(data);
}

function createAdapter(args) {
	new Adapter(args)
}