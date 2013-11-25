#! coding: utf-8

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
		filepath = TEST_FOLDERS + t + "/" + CONFIG_NAME

		# Check if there is a config.js file in that folder
		if not os.path.exists(filepath):
			continue

		# Parse that file
		test = parse_json(filepath)

		for t in test:
			print t

	# Write the config to CONFIG_NAME in ./
	#with open(CONFIG_NAME, "w") as f:
	#	f.write(json.dumps(tests))

get_configs()
