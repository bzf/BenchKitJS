Adapter - HTML5Test - Conformance
==========

## Origin
	GitHub - https://github.com/NielsLeenheer/html5test/

## Updating
	When updating the test only copy engine.js from origin.

## Issues
	Most of the tests work, however a few issues exist.

### detect.html
	This file most be present in the web root of the site or else a few tests will fail, it currently resides in 'test' folder.
	A good idea is to symlink this file with 'ln -s adapter/html5test/test/detect.html detect.html' from the web root.

### Security Test
	When the security tests fails it will fail for 3 points or more. 
	- 	Some(Content Security Policy) of the Security test will fail if the .htaccess file don't contain following lines:
<FilesMatch "index.html">
<IfModule mod_headers.c>
    Header set X-WebKit-CSP "default-src 'unsafe-inline' *; frame-src *; options inline-script;"
    Header set Content-Security-Policy "default-src 'unsafe-inline' *; frame-src *; options inline-script;"
    Header set X-Content-Security-Policy "default-src 'unsafe-inline' *; frame-src *; options inline-script;"
</IfModule>
</FilesMatch>

### Storage Test
	- Objectstore ArrayBuffer support sometimes says its fine, sometimes not. It is best not to count with this.
	  According to report success it will give the test 2 points.
  
### Conclusion
	This leads to that the test might vary 5 points from the real value time to time.
