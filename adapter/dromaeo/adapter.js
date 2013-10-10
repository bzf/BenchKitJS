
// Constructor
var Adapter = function() {
	this.config = {
		name : "Dromaeo",
		version : "?"
	};
	this.runTest();
}

Adapter.prototype.runTest = function() {
	var self = this;

	document.getElementById("adapterFrame").src = "test/index.html?all";
	
	var iframe = document.getElementById("adapterFrame");
	var contentWindow = iframe.contentWindow;

	window.testDone = function(data) {
		self.parseData(data);
	}

	// Wait for iframe to load
	iframe.onload = function() {

	};
}

Adapter.prototype.parseData = function(data) {
	window.parent.adapterDone(data);
}

new Adapter();
