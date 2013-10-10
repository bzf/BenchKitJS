BenchKitJS
==========

## BenchKitJS Overview
BenchKitJS is a testing framework for web browsers. It supports a large collection of 3rd party benchmarks.

### Summerizer
Summerizer will run each adapter and then store the data. The result will be visibe in the console when all tests are done.

### Adapter
An adapter is used as way to run a browser test in sandbox enviremont by using iframes. The adapter is responsible of starting the test and collecting the result when done. Each test needs its own adapter.

Check "adapter/example/" for ways to implement adapters

## Application flow
Creates an instance of summerizer (main), that handles the running of all the adapters that has been configuirated in the "config.js" file. The summerizer iterastes over all apdaters, each adapter is loaded inside an iframe. By using an iframe, the application can unload adapters that are done and save memory.

An adapters runs its test inside an iframe. When the adapter has decided it's done. It calls a callback function in the summerizer sends the formatted data with it.

When all the adapters are finished, the summerizer dumps the data to both the console and the DOM.
## Tests implemented
---
  - [Name](url)[version]

## Config.js
	{
		name: "Example", 
		path: "/adapter/example/",
		version: "0.1"
	}