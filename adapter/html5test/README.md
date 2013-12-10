Adapter - HTML5Test - Conformance
==========

## Origin
	GitHub - (https://github.com/NielsLeenheer/html5test/)

## Version
Version: Commit 852f79f25a. Downloaded Tuesday 2013-12-10.

## Updating
When updating the test, copy engine.js from origin.

## Issues
Most of the tests work, however a few issues exist. These are "solved" by not including them in the final result.

### detect.html
This file most be present in the web root of the site or else a few tests will fail, it currently resides in 'test' folder.
A good idea is to symlink this file with 'ln -s adapter/html5test/test/detect.html detect.html' from the web root.
This can also be solved by a change to a relative path, this can be fixed by the build script. The lines affected are engine.js:3045, engine.js:3081, engine.js:3117 and engine.js:3153. 

### Security Test
When the security tests will fail if there is no server. The test will affect 3 points.
Some(Content Security Policy) of the Security test will fail if the .htaccess file on the server doesn't contain following lines:
	<FilesMatch "index.html">
	<IfModule mod_headers.c>
    	Header set X-WebKit-CSP "default-src 'unsafe-inline' *; frame-src *; options inline-script;"
    	Header set Content-Security-Policy "default-src 'unsafe-inline' *; frame-src *; options inline-script;"
    	Header set X-Content-Security-Policy "default-src 'unsafe-inline' *; frame-src *; options inline-script;"
	</IfModule>
	</FilesMatch>

### Storage Test
- Objectstore ArrayBuffer support is not reliable and should not be included in the results. According the success report the tests have a value of 2 points.
  
### Conclusion
This leads to the conclusion that the result includes 5 uncertain and unreliable points. These are removed before sending the report to the callback.
