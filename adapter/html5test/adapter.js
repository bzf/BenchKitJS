/*
 * Html5Test -- Html5 conformance test
 * https://github.com/NielsLeenheer/html5test/ (2013-11-15)
 * 
 * Description: 
 *  "The HTML5 test score is an indication of how well your browser supports the upcoming 
 *   HTML5 standard and related specifications. Even though the specification isn't finalized yet, 
 *   many features are already supported and all major browser manufacturers are making sure their 
 *   browser is ready for the future."
 *
 */

var Adapter = function() {
    this.config = {
        name : "HTML5test",
        version : "5.0"
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




    var result = {
        score: data.score,
        maximum: data.maximum -5,
        points: data.points.split(",").reduce(function(result, kvalue) {
                    kvalue = kvalue.split("="); 
                    result[kvalue[0]] = kvalue[1]
                    return result; 
                }, {}),
        result: data.results.split(",").reduce(function(result, kvalue) {
                    kvalue = kvalue.split("="); 
                    result[kvalue[0]] = kvalue[1]
                    return result; 
                }, {})
    }

    if (result["result"]["security-csp10"] === "1") {
        result["score"]-= 2;        
    }

    delete result["result"]["security-csp10"]

    if (result["result"]["storage-indexedDB.arraybuffer"] === "1") {
        result["score"] -= 3;        
    }

    delete result["result"]["storage-indexedDB.arraybuffer"]

    var storage = result["points"]["storage"].split("/")
    var security = result["points"]["security"].split("/")

    result["points"]["storage"] = storage[0] + "/" + (storage[1]-2) 
    result["points"]["security"] = security[0] + "/" + (security[1]-3) 

    window.parent.adapterDone(result);
}
    
function createAdapter(args) {
    new Adapter()
}
