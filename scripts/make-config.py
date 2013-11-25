#! coding: utf-8

# Iterates through the adapter configs and generates a config.js file int the root folder

import os, json, StringIO

TEST_FOLDERS = "./adapter/"
CONFIG_NAME = "config.json"

def parse_json(path):
	json_data = ""

	# Read the file and save it as a string
	with open(path) as f:
		return json.load(f)

# Returns a dictionary with all tests
def get_configs():
	tests = {}

	for t in os.listdir(TEST_FOLDERS):
		if t is "example":
			continue
		filepath = TEST_FOLDERS + t + "/" + CONFIG_NAME

		# Check if there is a config.js file in that folder
		if not os.path.exists(filepath):
			continue

		# Parse that file
		test = parse_json(filepath)

		for t in test:
			tests[t["name"]] = t

	# Write the config to CONFIG_NAME in ./
	with open("config.js", "w") as f:
		f.write("var testsData = " + json.dumps(tests))

# Run it when run as a program
if __name__ == '__main__':
	get_configs()
