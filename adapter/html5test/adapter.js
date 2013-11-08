
// Constructor
var Adapter = function() {
    this.config = {
	name : "HTML5test",
	version : "4.0"
    };
    this.runTest();
}

Adapter.prototype.runTest = function() {
    var self = this;
    
    document.getElementById("adapterFrame").src = "test/test.html";
    
    var iframe = document.getElementById("adapterFrame");
    var contentWindow = iframe.contentWindow;

    iframe.onload = function() {
	//Overwrite the finish function in test.html.
	contentWindow.finish = function(data) {
	    self.parseData(data);
	}
    }

}

Adapter.prototype.parseData = function(data) {
    
    result = {
	score: data.score,
	maximum: data.maximum,
	points: data.points,
	result: data.results
    }
    
    window.parent.adapterDone(result);
}
    
function createAdapter(args) {
    new Adapter()
}
