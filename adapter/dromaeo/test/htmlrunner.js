var startTest = parent.window.startTest || function(){};
var test = parent.window.test || function(name, fn){ fn(); };
var endTest = parent.window.endTest || function(){};
var prep = parent.window.prep || function(fn){ fn(); };
