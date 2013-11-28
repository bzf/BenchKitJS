/*
 * url_parser.js
 * Date updated: 2013-11-21
 * Parses the URL and determines which tests should be run.
 */

// Takes a URL and returns a list with options
function parseUrl(url) {
	var list = testsData;
	var params;

	if(url) {
		url = url.replace(/#[\/]?/, "");

		/* Filter away all empty objects in the list and put them all
		 * in lower-case. */
		params = url.split("/").filter(function(n){return n});
		params = params.map(function(n){return n.toLowerCase()});
		list = buildList(params);
	}
	var n_list = Object.keys(list).map(function (key) {
                return list[key];
    });
	
	return n_list;
}

function buildList(params)  {
	// The first parameter specifies which tests that should be run.
	var first = params.shift();
	var list = [];

	if(first == "all") {
		list = createList(function() {
			return true;
		});
	}
	else {
		var args = first.split(",")
		list = createList(function(test) {
			//console.log(group, test);

			return isNameOrGroup(args, test);
		});
	}

	// Filter the list with the parameters
	list = parse_options(params, list);
	return list;
}

function isNameOrGroup(args, test) {
	for (var a in args) {
		var arg = args[a];

		if (test.groups.indexOf(arg) > -1) {
			return true;
		} else if (arg == test.name.toLowerCase()) {
			return true;
		}
	}

	return false;
}


function createList(if_condition) {
	var list = []

	for(var testName in testsData) {
		var test = testsData[testName];

		if(if_condition(test)) {
			list.push(test);
		}
	}

	return list;
}

// Takes a list of parameters, and filters the given list so it matches
// the specified parameters.
function parse_options(params, list) {
	if (params.length == 0) return list;

	var option = params.shift();
	var new_list = {};

	// Modify the list based on the option
	if (option == "exclude") {
		// Next parameter is the options
		var args = params.shift().split(",");

		// Remove tests as specified
		for (index in list) {
			var object = list[index];
			if (isNameOrGroup(args, object)) continue;

			new_list[object.name] = object;
		}
	} else if (option == "include") {
		// Next parameter is the options
		var args = params.shift().split(",");
		new_list = list;

		// Add all tests which should be included
		for (index in testsData) {
			var object = testsData[index];
			console.log(object)
			if (!isNameOrGroup(args, object)) continue;

			new_list[object.name] = object;
		}
	}

	/* Recursion is pretty */
	return parse_options(params, new_list);
};
