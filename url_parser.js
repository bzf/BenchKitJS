/*
 * url_parser.js
 * Date updated: 2013-11-21
 * Parses the URL and determines which tests should be run.
 */

// Takes a URL and returns a list with options
function parseUrl(url) {
	var list = {};
	var params;

	if(url["test"]) {
		/* Filter away all empty objects in the list and put them all
		 * in lower-case. */
		list = buildList(url["test"].replace("/", ""));
		
	}
	list = parse_options(url, list);
	var n_list = Object.keys(list).map(function (key) {
                return list[key];
    });
	
	return n_list;
}

function buildList(params)  {
	// The first parameter specifies which tests that should be run.

	var list = [];

	if(params === "all") {
		list = createList(function() {
			return true;
		});
	}
	else {
		var args = params.split(",")
		list = createList(function(test) {
			//console.log(group, test);

			return isNameOrGroup(args, test);
		});
	}

	// Filter the list with the parameters
	return list;
}

function isNameOrGroup(args, test) {
	for (var a in args) {
		var arg = args[a];

		if (test.groups.indexOf(arg) > -1) {
			return true;
		} else if (arg === test.name.toLowerCase()) {
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

/*
 *	Includes and excludes the specified tests
 */
function parse_options(url, tests) {

	if (url["include"]) {
		
		var args = url["include"].replace("/", "").split(",");

		// Add all tests which should be included
		for (index in testsData) {
			var object = testsData[index];
			if (!isNameOrGroup(args, object)) continue;

			tests[object.name] = object;
		}
	}

	// Modify the list based on the option
	if (url["exclude"]) {
		var new_list = {};
		var args = url["exclude"].replace("/", "").split(",");

		// Remove tests as specified
		for (index in tests) {
			var object = tests[index];
			if (isNameOrGroup(args, object)) continue;

			new_list[object.name] = object;
		}
		tests = new_list;
	} 

	return tests;
};
