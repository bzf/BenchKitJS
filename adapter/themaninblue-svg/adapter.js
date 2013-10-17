/*
 * Testname: themaninblue-svg
 * Original link: http://themaninblue.com/experiment/AnimationBenchmark/svg/
 * Date: 2013-10-17
 *
 * Description:
 * The test produces 500 particles which are then animated to 'bounce' off the
 * edges of the screen. These particles are being drawn using SVG.
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
var Adapter = function() {
    // Information about the adapter
    this.config = {
		name : "themaninblue-svg",
		version : "0.1"
    };

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

    // Load the test
    document.getElementById("adapterFrame").src = "svg/index.xml";

    // Wait for iframe to load
    iframe.onload = function() {
	var results = [];
	var skip = 3;
	var interval = setInterval(
	    function() {
		var current_fps = contentWindow.document.getElementById("frameRate").innerHTML;
		
		//Skip the first few values due to slow start
		if (skip > 0) {
		    skip--;
		    return;
		}
		
		//Push the fps value as float.
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
    
    //Add the average to the result object
    this.config["result"] = average;    
    window.parent.adapterDone(this.config);
}

function createAdapter(args) {
	new Adapter();
}
