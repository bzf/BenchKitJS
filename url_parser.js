function parseUrl(url) {
	var list = listAll;
	if(url) {
		url = url.replace(/#[\/]?/, "");
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
	var first = params.shift();
	var list = [];
	if(first == "all") {
		list = createList(function() {
			return true;
		});
	}
	else {
		var args = first.split(",")
		list = createList(function(group, test) {
			return ((args.indexOf(group.toLowerCase()) > - 1) ||
					(args.indexOf(test.name.toLowerCase()) > - 1));
		});
	}
	list = parse_options(params, list)
	return list
}


function createList(if_condition) {
	var list = []
	for(var groupName in testsData) {
		group = testsData[groupName];
		for(var idTest in group) {
			var test = group[idTest];
			test["group"] = groupName;
			if(if_condition(groupName, test)) {
				list.push(test);
			}
		}
	}
	return list
}


function parse_options(params, list) {
	if (params.length == 0) return list;
	var option = params.shift();
	var new_list = {};

	/* Modify the list based on the option */
	if (option == "exclude") {
		var args = params.shift().split(",");

		for (index in list) {
			var object = list[index];
			if (args.indexOf(object.group.toLowerCase()) != -1 ||
					args.indexOf(object.name.toLowerCase()) != -1) continue;

			new_list[object.name] = object;
		}
	} else if (option == "include") {
		var args = params.shift().split(",");
		new_list = list;

		for (index in listAll) {
			var object = listAll[index];
			if (args.indexOf(object.group.toLowerCase()) == -1 && 
					args.indexOf(object.name.toLowerCase()) == -1) continue;

			new_list[object.name] = object;
		}
	}

	return parse_options(params, new_list);
};


if ("onhashchange" in window) { // event supported?
    window.onhashchange = function () {
        hashChanged(window.location.hash);
    }
}
else { // event not supported:
    var storedHash = window.location.hash;
    window.setInterval(function () {
        if (window.location.hash != storedHash) {
            storedHash = window.location.hash;
            hashChanged(storedHash);
        }
    }, 100);
}
