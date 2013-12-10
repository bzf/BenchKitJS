Adapter - HTML5Test - Conformance
==========

## Origin
	GitHub - (https://github.com/NielsLeenheer/html5test/)

## Version
Version: Commit 852f79f25a. Downloaded Tuesday 2013-12-10.

## Updating
When updating the test, copy engine.js from origin.

## Arguments
In the file config.json the following arguments can be used.

### remove_group
This argument is the key to a list of strings, each string representing a group name to exclude from the final result. Group names which can be read from points in the output from the test. This argument will remove any points each of the named groups it can find has attributed, both maximum and actual, and remove all it's test from the output.
If entering a group which doesn't exist nothing will happen.

## Issues
Most of the tests work, however a few issues exist. These are "solved" by not including them in the final result.

### interaction
Group interaction (named "User interaction" on the official page) is removed by default in the config. This because it generated a result conflicting with the official pages result.
This group is worth 25 points.

### Security Test
When the security tests will fail if there is no server. The test will affect up to 4 points, 2 points for CSP 1.0 and 2 points for CSP 1.1. CSP is short for Contect Security Policy.
These tests (CSP 1.0 and CSP 1.1) of the Security test will fail if the .htaccess file on the server doesn't contain following lines:
	<FilesMatch "index.html">
	<IfModule mod_headers.c>
    	Header set X-WebKit-CSP "default-src 'unsafe-inline' *; frame-src *; options inline-script;"
    	Header set Content-Security-Policy "default-src 'unsafe-inline' *; frame-src *; options inline-script;"
    	Header set X-Content-Security-Policy "default-src 'unsafe-inline' *; frame-src *; options inline-script;"
	</IfModule>
	</FilesMatch>

### Storage Test
- Objectstore ArrayBuffer support is not reliable and should not be included in the results. According the success report the tests have a value of 3 points.
  
### Conclusion
This leads to the conclusion that the result will differ from the official result by up to 32 points. These are removed before sending the report to the callback.
