BenchKitJS
==========

## BenchKitJS Overview
BenchKitJS is a testing framework for web browsers. It supports a large collection of 3rd party benchmarks.

### Summerizer
Summerizer will run each adapter and then store the data. The result will be visibe in the console when all tests are done.

### Adapter
An adapter is used as way to run a browser test in sandbox enviremont by using iframes. The adapter is responsible of starting the test and collecting the result when done. Each test needs its own adapter.

Check "adapter/example/" for ways to implement adapters.

## Application flow
Creates an instance of summerizer (main), that handles the running of all the adapters that has been configuirated in the "config.js" file. The summerizer iterastes over all apdaters, each adapter is loaded inside an iframe. By using an iframe, the application can unload adapters that are done and save memory.

An adapters runs its test inside an iframe. When the adapter has decided it's done. It calls a callback function in the summerizer sends the formatted data with it.

When all the adapters are finished, the summerizer dumps the data to both the console and the DOM.
Tests implemented
---

  - [Mozilla Dromaeo](http://dromaeo.com/) [2013-11-NN]
  - [themaninblue-svg](http://themaninblue.com/experiment/AnimationBenchmark/svg/) [2013-10-17]
  - [themaninblue-canvas](http://themaninblue.com/experiment/AnimationBenchmark/canvas/) [2013-10-17]
  - [themaninblue-html](http://themaninblue.com/experiment/AnimationBenchmark/html/) [2013-10-17]

## config.json example
	[
		"name": "testName",
		"path": "/adapters/testFolder/",
		"version": "X.X",
		"groups": ["group1", "group2"],
		"args": "argumentToConstructor" // Optional
	]

How to start test via the URL
---
It is possible to call the page with some arguments in the URL to automatically start specified tests without any user interaction.

The format looks like this:
```URL: ?tests=<selected_tests>&[<options>]```

**selected_tests** is a comma-seperated list which specifies which tests should be selected. The elements of the list can either be *all*, testname (which will represents all available tests) or a *group/testname*.
The available testgroups as of now are:

* ```dom```
* ```js```
* ```canvas```
* ```conformance```
* ```svg```

**options** is filters for the given list. The available options are:

* ```exclude=<selected_tests>```
* ```include=<selected_tests>```

The **options** works as you would expect. If you use the exclude option you will filter out tests from the given list and if you use the include option you will include tests.

### Examples
*Run all tests*

	?tests=all

*Run the test sunspider and the testgroup dom*

	?tests=sunspider,dom

*Run all tests except sunspider*

	?tests=all&exclude=sunspider

*Run all tests except the group js but with the test sunspider (which belongs to the group js)*

	?tests=all&exclude=js?include=sunspider
