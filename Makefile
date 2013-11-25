scripts = scripts

all : config.js

# Unpack and patch the third party stuff

# If a *.json-file has changed, update the ./config.js
config.js : $(shell find adapter/ -regex ".*/config.json")
	python $(scripts)/make-config.py
