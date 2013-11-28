/* 
 * Mozilla Kraken - JavaScript Benchmark (version 1.1)
 * https://wiki.mozilla.org/Kraken
 * 
 * Arguments for the Constructor are not used by this adapter.
 * 
 * It will take no precautions against memory usage.
 * 
 * For the adapter to work properly we have to override the
 * finish() function in test/index.html, line 118.
 */

var Adapter = function(args) {
	
	this.runTest();
}

Adapter.prototype.runTest = function() {
	var self = this;
	
	document.getElementById("adapterFrame").src = "test/krakenbenchmark.mozilla.org/index.html";
	
	var iframe = document.getElementById("adapterFrame");
	var contentWindow = iframe.contentWindow;

	// Wait for iframe to load
	iframe.onload = function() {
		// Override the finish  function
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
