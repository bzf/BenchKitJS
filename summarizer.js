
/*
  - BenchKitJS
  Testing framework, for running several web browser tests in a synchronized order.
*/


/*
 * Constructor for Summerizer
 */
var Summarizer = function() {
	this.tests = parseUrl(window.getQueryString());//testsData;
	console.log(this.tests)
	this.counter = 0;
	this.currentTest = null;
	this.iframe = document.getElementById("mainFrame");
	this.data = {};

	this.progressbar = new Progressbar("progressbar", "Running", this.tests.length);

	this.startTime = Date.now();
	this.curTestTime = Date.now();

}

/*
 * Start the iteration of the adapters
 */ 
Summarizer.prototype.start = function() {
	
	this.runAdapter();
}

/*
 * Load adapter and start the adapter
 * @name    name of the adapater
 * @path    path to the adapter(e.g "/adapter/testing/")
 */
Summarizer.prototype.loadAdapter = function(test) {
	// Store this to make it accessible in a function scope
	var self = this;	

	this.currentTest = test;

	this.output("<br /><span id='output-" + this.currentTest.name + "'>" + this.currentTest.name + " </span><br />");

	this.progressbar(this.currentTest.name)
	
	// Callback for the adapater, so that it can send the data back
	// to the summarizer
	window.adapterDone = function(data) {
		self.doneAdapter(data);
	}
	// Print function for the left div, used by adapters to print results.
    window.output = function(text, sub_id, override) { 
    	self.output(text, sub_id, override);
    }

   	 //Toggles fullscreen to on or off depending if "state" is "on" or "off"
    window.toggleFullscreen = function(state) {

		//Set to fullscreen
		if (state === "on") {	
		    window.parent.document.getElementById("left").style.width = "0%";
		    window.parent.document.getElementById("left").style.display = "none";
		    window.parent.document.getElementById("right").style.width = "100%";
		}
	
		//Set to normal screen size
		if (state === "off") {
		    window.parent.document.getElementById("left").style.display = "block";
		    window.parent.document.getElementById("left").style.width = "50%";
		    window.parent.document.getElementById("right").style.width = "50%";
		}
    }


	// Load the adapter to the iframe
	this.iframe.src = test.path + "adapter.html";
	this.iframe.onload = function() {
		this.contentWindow.createAdapter(test.args);
	}
}
/*
 * Called when an adapter is done.
 * Iterate and run the next adapter.
 * If the counter is equal to test.lenght, run complete 
 * @data     formated data from the adapter(result)
 */
Summarizer.prototype.doneAdapter = function(data) {
	var time = Math.round((Date.now() - this.curTestTime)/100)/10
	var minutes = Math.floor((time)/60);
	var seconds = time - (minutes*60);
	this.output("finished in " + minutes + "m " +seconds + "s", "output-" + this.currentTest.name, false)
	this.curTestTime = Date.now();

	this.data[this.currentTest.name] = data;

	// Increase counter
	this.counter++;
	// Check if done
	if(this.counter < this.tests.length) {
		this.runAdapter();
	} else {
		this.complete();
	}
}

/*
 * Run adapter according to counter.
 */
Summarizer.prototype.runAdapter = function() {
	// Next test
	var test = this.tests[this.counter]

	this.loadAdapter(test)
}


function syntaxHighlight(json) {
    json = json.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
    return json.replace(/("(\\u[a-zA-Z0-9]{4}|\\[^u]|[^\\"])*"(\s*:)?|\b(true|false|null)\b|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?)/g, function (match) {
        var cls = 'number';
        if (/^"/.test(match)) {
            if (/:$/.test(match)) {
                cls = 'key';
            } else {
                cls = 'string';
            }
        } else if (/true|false/.test(match)) {
            cls = 'boolean';
        } else if (/null/.test(match)) {
            cls = 'null';
        }
        return '<span class="' + cls + '">' + match + '</span>';
    });
}

/*
 * Output the completed sessions data to both dom and console.
 */
Summarizer.prototype.complete = function() {
	this.iframe.onload = null;
	this.progressbar("done");

	this.iframe.src = "";

	var time = Math.round((Date.now() - this.startTime)/100)/10
	var minutes = Math.floor((time)/60);
	var seconds = time - (minutes*60);

	this.output("<br />Completed in " + minutes + "m " +seconds + "s<br />");

	this.data["metadata"] = {"completion-time-ms": Date.now() - this.startTime, "timestamp": Date.now(), "url": document.URL}

	this.output("<br />");
	console.log(JSON.stringify(this.data));
	this.output(syntaxHighlight(JSON.stringify(this.data, undefined, 2)));
}

/*
 * Output helper
 */
Summarizer.prototype.output = function(text, sub_id, override) {
	if (sub_id !== undefined && override === true) {
		document.getElementById(sub_id).innerHTML = text;
	} else if (sub_id !== undefined && (override === undefined || override === false)) {
		document.getElementById(sub_id).innerHTML += text;
	} else {
		document.getElementById("output").innerHTML += text;
	}
}

// New instance of summarizer
var summarizer = ""
function startSummarizer() {	
	document.getElementById("output").innerHTML = "";
	summarizer = new Summarizer();
	summarizer.start();
}
startSummarizer();

if ("onhashchange" in window) { // event supported?
    window.onhashchange = startSummarizer;
}
else { // event not supported:
    var storedHash = window.location.hash;
    window.setInterval(function () {
        if (window.location.hash != storedHash) {
            storedHash = window.location.hash;
			startSummarizer();
        }
    }, 100);
}

// Parse url pattern
function getQueryString() {
	var q = window.location.search.substring(1);
	return (function(a) {
		if (a == "") return {};
		var b = {};
		for (var i = 0; i < a.length; ++i) {
			var p = a[i].split('=');
			if (p.length != 2) continue;
			b[p[0]] = decodeURIComponent(p[1].replace(/\+/g, " "));
		}
		return b;
	})(q.split("&"));
};
