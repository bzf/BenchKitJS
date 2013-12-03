SCRIPT_PATH = scripts

all : config.js unpacked list

# Create a list with all files that could be replaced
list : unpacked
	python $(SCRIPT_PATH)/findJs.py;

# Unpack and patch the third party stuff
unpacked : $(shell find sources -regex ".*\.tar\.gz$\")
	python $(SCRIPT_PATH)/make_sources.py

# If a *.json-file has changed, update the ./config.js
config.js : $(shell find adapter/ -regex ".*/config.json") clean
	python $(SCRIPT_PATH)/make_config.py

# Start a simple python-server
start :
	python -m SimpleHTTPServer

replace : 
	python $(SCRIPT_PATH)/wgetJS.py
	python $(SCRIPT_PATH)/replaceJS.py

# Remove config.js and all extracted tests
clean :
	rm -rf config.js adapter/*/test/ scripts/jsList.txt js-lib/
