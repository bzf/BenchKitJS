SCRIPT_PATH = scripts
JSLIB_PATH = js-lib 
.PHONY : all unpacked start update-local local clean
all : config.js unpacked update-local

# Unpack and patch the third party stuff
unpacked : $(shell find sources -regex ".*\.tar\.gz$\")
	python $(SCRIPT_PATH)/make_sources.py

# If a *.json-file has changed, update the ./config.js
config.js : $(shell find adapter/ -regex ".*/config.json") clean
	python $(SCRIPT_PATH)/make_config.py

# Start a simple python-server
start :
	python -m SimpleHTTPServer

# Download and tar nessecary 
update-local : 
	python $(SCRIPT_PATH)/make_jslib.py

# Makes use of the downloaded files from update-local
local :
	python $(SCRIPT_PATH)/make_local.py

# Remove config.js and all extracted tests
clean :
	rm -rf config.js adapter/*/test/ scripts/jsList.txt js-lib/

