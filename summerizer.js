/**/

// Constructor
var Summerizer = function() {
	this.tests = testsData;
	this.counter = 0;
	this.currentTest = null;
	this.iframe = document.getElementById("mainFrame");
	this.data = {};
}

Summerizer.prototype.start = function() {	
	this.nextAdapter();
}

Summerizer.prototype.loadAdapter = function(name, path) {
	var self = this;
	this.currentTest = name;
	
	this.output("Running: " + this.currentTest);

	window.adapterDone = function(data) {
		self.doneAdapter(data);
	}

	this.iframe.src = path + "adapter.html";
}

Summerizer.prototype.doneAdapter = function(data) {
	this.data[this.currentTest] = data;
	this.nextAdapter();
}


Summerizer.prototype.nextAdapter = function() {
	if(this.counter == this.tests.length) {
		this.complete();
		return;
	}
		
	var test = this.tests[this.counter];
	this.loadAdapter(test.name, test.path);
	this.counter++;
}

Summerizer.prototype.complete = function() {
	this.iframe.src = "";
	this.output("Complete");
	this.output("");
	console.log(JSON.stringify(this.data));
	this.output(JSON.stringify(this.data));
}

Summerizer.prototype.output = function(text) {
	document.getElementById("output").innerHTML += "<p>" + text + "</p>";
}

var summerizer = new Summerizer();
summerizer.start();

