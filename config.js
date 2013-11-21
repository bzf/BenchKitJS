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

	]
};

var listAll = [];
for(groupName in testsData) {
	listAll = listAll.concat(testsData[groupName])
}
