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
		contentWindow.g_splashImg.onload = function()
		   {
			  // init our game with Game.Main derived instance
			  contentWindow.GameHandler.init();
			  contentWindow.GameHandler.start(new contentWindow.Benchmark.Main());
			  
			  contentWindow.Benchmark.InfoScene.prototype.ready = function(){
			  this.imagesLoaded = true;
			  this.start = true;
			  };
			  
			  var compScene = contentWindow.Benchmark.CompletedScene.prototype;
			  
			  compScene.onInitScene = function()
			  {
				var allScores = contentWindow.GameHandler.benchmarkScores;
				var totalScore = contentWindow.GameHandler.benchmarkScoreCount
				
				 this.game.fps = 1;
				 this.interval.reset();
				 this.exit = false;
				 
				 self.parseData(allScores, totalScore);
			  }
			  
		   };
	};	
}

Adapter.prototype.parseData = function(allScores, totScore) {
	var data = {};
	data["Test 1 - Asteroids - Bitmaps"] = allScores[0];
	data["Test 2 - Asteroids - Vectors"] = allScores[1];
	data["Test 3 - Asteroids - Bitmaps, shapes, text"] = allScores[2];
	data["Test 4 - Asteroids - Shapes, shadows"] = allScores[3];
	data["Test 5 - Arena5 - Vectors, shadows, bitmaps, text"] = allScores[4];
	data["Test 6 - Plasma - Maths, canvas shapes"] = allScores[5];
	data["Test 7 - 3D Rendering - Maths, polygons, image transforms"] = allScores[6];
	data["Test 8 - Pixel blur - Math, getImageData, putImageData"] = allScores[7];
	data["Total Score"] = totScore;
	console.log(data);
	window.parent.adapterDone(data);
}




function createAdapter(args) {
	new Adapter(args)
}

createAdapter();