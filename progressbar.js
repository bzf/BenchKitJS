/* 
 * progressbar.js
 * Creates a progressbar
 */


var Progressbar = function createProgressbar(parent_id, name, size)
{
	var PROGRESSBAR_SIZE = 57;
	var clear = document.createElement("div");
	clear.setAttribute("class", "clear");

	/* Define the updateBar-function */
	var update = function() {
		var done = Math.floor((current / size) * PROGRESSBAR_SIZE);
		var progress = new Array(done).join("#");
		progress += new Array(PROGRESSBAR_SIZE - done + 1).join("-");
		progress = "[" + progress + "]";

		html_bar.innerHTML = progress;
	};

	/* Data worth holding onto */
	name = name;
	size = size;
	current = 0;
	current_test = "Nothing";

	/* Create the progressbar */
	progressbar = document.createElement("div");
	progressbar.setAttribute("class", "progressbar");

	/* Create and append content to the progressbar */
	html_name = document.createElement("p");
	html_name.innerHTML = name;
	progressbar.appendChild(html_name);

	running_test = document.createElement("p");
	running_test.innerHTML = "* Running: " + current_test;
	progressbar.appendChild(running_test);

	html_bar = document.createElement("p");
	html_bar.setAttribute("class", "bar");
	progressbar.appendChild(html_bar);
	update();

	/* Add the progressbar to the parent */
	var parent_div = document.getElementById(parent_id);
	parent_div.appendChild(progressbar);
	parent_div.appendChild(clear);

	/* Return the tick-function */
	return function(name_of_test) {
		/* Tick and set the name of next test */
		current += 1;
		current_test = (current == size) ? "Done" : name_of_test;

		/* Update the progressbar */
		running_test.innerHTML = "* Running: " + current_test
			+ "(" + current + "/" + size + ")";
		update();

		return (current == size);
	};
};

var tick_first = new Progressbar("pbc", "Ossler", 10);
t1 = setInterval(function() {
	if (tick_first("hej")) clearInterval(t1);
}, 100);
