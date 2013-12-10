/*
 * Sunspider *MODIFIED* - JavaScript Benchmark.
 * http://www.webkit.org/perf/sunspider/sunspider.html
 *
 * Modifications:
 * - Removed warmup.
 * - Change runtimes from 10 to 3.
 *
 * Gets data by overwriting the function "finish" in sunspider.
 */
var Adapter = function(args, path) {
	this.config = {
		name : "Sunspider",
		version : "1.0.1"
	};
	this.path = path;
	this.runTest();
}

Adapter.prototype.runTest = function() {
	var self = this;

	document.getElementById("adapterFrame").src = this.path + "test/sunspider-1.0.2/driver.html";
	
	var iframe = document.getElementById("adapterFrame");
	var contentWindow = iframe.contentWindow;

	// Wait for iframe to load
	iframe.onload = function() {
		// Write over the function finish in sunspider
		contentWindow.finish = function() {

			self.parseData(contentWindow.output);
		}
	};
	

}

Adapter.prototype.parseData = function(data) {
	window.parent.adapterDone(data);
}

function createAdapter(args, path) {
	new Adapter(args, path);
}

