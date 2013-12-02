SCRIPT_PATH = scripts

all : config.js unpacked

# Unpack and patch the third party stuff
unpacked : $(shell find sources -regex ".*\.tar\.gz$\")
	python $(SCRIPT_PATH)/make_sources.py

# If a *.json-file has changed, update the ./config.js
config.js : $(shell find adapter/ -regex ".*/config.json")
	python $(SCRIPT_PATH)/make_config.py

# Start a simple python-server
start :
	python -m SimpleHTTPServer

# Remove config.js and all extracted tests
clean :
	rm -rf config.js adapter/*/test/
