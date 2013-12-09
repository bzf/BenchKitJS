/* 
 * CanvasMark - Canvas Benchmark (version 1.1)
 * www.kevs3d.co.uk
 * 
 */

var Adapter = function(args) {
	this.runTest();
}

Adapter.prototype.runTest = function() {
	var self = this;
	
	document.getElementById("adapterFrame").src = "test/index.html";
	
	var iframe = document.getElementById("adapterFrame");
	var contentWindow = iframe.contentWindow;

	// Wait for iframe to load
	iframe.onload = function() {
		
		console.log("KVACK!");
		
		contentWindow.g_splashImg.onload = function()
		   {
			  // init our game with Game.Main derived instance
			  contentWindow.GameHandler.init();
			  contentWindow.GameHandler.start(new contentWindow.Benchmark.Main());
			  console.log("PROSIT!");
			  
			  contentWindow.Benchmark.InfoScene.prototype.ready = function(){
			    console.log("READY!");
				this.imagesLoaded = true;
				this.start = true;
			  };
			  
			  contentWindow.Benchmark.CompletedScene.prototype.intervalRenderer = function(interval, ctx){
				console.log("CRABBY!");
				 ctx.clearRect(0, 0, GameHandler.width, GameHandler.height);
				 var score = GameHandler.benchmarkScoreCount;
				 if (interval.framecounter === 0)
				 {
					var browser = BrowserDetect.browser + " " + BrowserDetect.version;
					var OS = BrowserDetect.OS;
					
					if (location.search === "?auto=true")
					{
					   alert(score);
					}
					else
					{
					   // write results to browser
					   $("#results").html("<p>CanvasMark Score: " + score + " (" + browser + " on " + OS + ")</p>");
					   // tweet this result link
					   var tweet = "http://twitter.com/home/?status=" + browser + " (" + OS + ") scored " + score + " in the CanvasMark HTML5 benchmark! Test your browser: http://bit.ly/canvasmark %23javascript %23html5";
					   $("#tweetlink").attr('href', tweet.replace(/ /g, "%20"));
					   $("#results-wrapper").fadeIn();
					}
				 }
				 Game.centerFillText(ctx, interval.label, "18pt Helvetica", GameHandler.height/2 - 32, "white");
				 Game.centerFillText(ctx, "Benchmark Score: " + score, "14pt Helvetica", GameHandler.height/2, "white");
				 
				 interval.complete = (this.exit || interval.framecounter++ > 400);
			  };
			  
		   };
		
		console.log("TWAT!");
		
		//contentWindow.finish = function() {
		//	self.parseData(contentWindow.output);
		//}
	};	
}

Adapter.prototype.parseData = function(data) {
	var len = data.length;
	//window.parent.adapterDone(data);
}




function createAdapter(args) {
	new Adapter(args)
}

createAdapter();