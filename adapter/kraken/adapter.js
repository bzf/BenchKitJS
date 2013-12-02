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
	var len = data.length;

	data = round(data.reduce(merge));

	window.parent.adapterDone(data);
}

var round = function(obj) {
	for (var key in obj) {
		if (!obj.hasOwnProperty(key)) {continue;}
		obj[key] = Math.round(obj[key]*100)/100;
	}
	return obj;
}

var merge = function(acc, next) {
	for (var key in acc) {
		if (!acc.hasOwnProperty(key)) {continue;}

		acc[key] += next[key];
		acc[key] /= 2;
		
	}
	return acc;
}


function createAdapter(args) {
	new Adapter(args)
}
