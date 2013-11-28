/* 
 * progressbar.js
 * Creates a progressbar
 */


var Progressbar = function createProgressbar(parent_id, name, size)
{
	var clear = document.createElement("div");
	clear.setAttribute("class", "clear");

	/* Define the updateBar-function */
	var update = function() {
		progressbar.children[0].children[1].children[0].style["width"] = current + "%"
	};

	var current = 0;
	var iterator = -1;
	var current_test = "Nothing";

	/* Create the progressbar */
	var progressbar = document.createElement("div");
	progressbar.setAttribute("id", name);
	progressbar.innerHTML = "<div><span class='bar-title'>" + name +"</span><div class='progressbar'><div class='bar'></div></div></div>"


	/* Add the progressbar to the parent */
	var parent_div = document.getElementById(parent_id);
	parent_div.appendChild(progressbar);
	parent_div.appendChild(clear);

	update()
		
	/* Return the tick-function */
	return function(name_of_test) {
		/* Tick and set the name of next test */
		iterator += 1;
		current = Math.round((iterator/size)*100);

		update();

		progressbar.children[0].children[0].innerHTML = name + " " + name_of_test + "   " + current + "%"

		return (current >= 100);
	};
};
