
// Constructor
var Adapter = function() {
	this.runTest();
}

Adapter.prototype.runTest = function() {
	var self = this;
	window.testDone = function(data) {
		self.parseData(data);

	}
	document.getElementById("adapterFrame").src = "test/load.html";
}

Adapter.prototype.parseData = function(data) {
	window.parent.adapterDone(data);
}

function createAdapter(args) {
	new Adapter(args)
}
