Adapter
==========

## Format
   {name : [test name],
   	version : [test version],
	result : [result as json object]}
[json object]

## Functions
Adapter starts tests when "createAdapter(args)" is called by the parent window.


### Args
Arguments to be sent to the adapter. Some adapters might have unique args. Args can contain:
	  group : group id for the current test group. E.g "js", "dom" etc.


## Return data 		 
3 ways to return data. Basically you return it to the parent window.

### Example
See files in "/example/" folder.