
var testsData = {
	"dom" : [
		{
			name: "themaninblue-html",
			path: "/adapter/themaninblue-html/",
			version: "0.1",
		}
	],
	"js" : [
		{
			name: "kraken", 
			path: "/adapter/kraken/",
			version: "1.1",
		},
		{
			name: "dromaeo", 
			path: "/adapter/dromaeo/",
			version: "0.1",
		},
		{
			name: "Sunspider", 
			path: "/adapter/sunspider/",
			version: "1.0.1",
		}
	],
	"canvas" : [

		{
			name: "themaninblue-canvas",
			path: "/adapter/themaninblue-canvas/",
			version: "0.1",
		},
	],
	"svg" : [
		{
			name: "themaninblue-svg",
			path: "/adapter/themaninblue-svg/",
			version: "0.1",
		},
		
	],
	"conformance" : [
		{
			name: "HTML5test", 
			path: "/adapter/html5test/",
			version: "4.0"
		}

	]
};

var listAll = [];
for(groupName in testsData) {
	listAll = listAll.concat(testsData[groupName])
}