/*
 * Testname: themaninblue-html
 * Original link: http://themaninblue.com/experiment/AnimationBenchmark/html/
 * Date: 2013-10-17
 *
 * Description:
 * The test produces 500 particles which are then animated to 'bounce' off the
 * edges of the screen. These particles are being drawn using HTML.
 *
 * Each second we look for a value in the #frameRate of the iframe, and that's the
 * FPS value that we use for calculating the average later on.
 * The test runs for 13 seconds. The first 3 seconds are discarded and the
 * last 10 FPS results are saved. The test then calculates the average of these 
 * and returns that average.
 */

/*
 * Constructor for Adapter
 */
var Adapter = function(args) {
	// Information about the adapter
	this.config = {
	};
	switch(args) {
    case "canvas":
		this.suit = "test/canvas/index.htm";
		break;	
	case "html":
		this.suit = "test/html/index.htm";
		break;
	case "svg":
		this.suit = "test/svg/index.xml";
		break;
	}
	this.runTest();
}

/*
 * Runs automaticlly when a new instace of Adapter is created
 */
Adapter.prototype.runTest = function() {
    var self = this;

    // Reference to the iframe and contentWindow
    var iframe = document.getElementById("adapterFrame");
    var contentWindow = iframe.contentWindow;
    
    window.parent.toggleFullscreen("on");
    
    // Load the test
    document.getElementById("adapterFrame").src = this.suit;

    // Wait for iframe to load
    iframe.onload = function() {
		var results = [];
		var skip = 3;
		var interval = setInterval(function() {
			var current_fps = contentWindow.document.getElementById("frameRate")
				.innerHTML;
			
			// Skip the first few values due to slow start
			if (skip > 0) {
			    skip--;
			    return;
			}
			
			// Push the fps value as float.
			results.push(parseFloat(current_fps.split(" ")[0]));
			
			if (results.length == 10) {
			    clearInterval(interval);
			    self.parseData(results);
			}
	    }, 1000);	
    };   
}

/*
 * Format the data. E.g sum of avg if several runs.
 * Sends the data back to the summerizer
 */
Adapter.prototype.parseData = function(data) {
    //Calculate the average of our result array.
    var average = data[0];
    for (var i = 1; i < data.length; i++) {
		average += data[i];
		average /= 2;
    }
    
    window.parent.toggleFullscreen("off");

    //Add the average to the result object
    this.config["result"] = average;    
    window.parent.adapterDone(this.config);
}

/* Called to create an adapter
 * @args [object]
 */
function createAdapter(args) {
	new Adapter(args)
}