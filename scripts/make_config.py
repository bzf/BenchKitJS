#! coding: utf-8

# Iterates through the adapter configs and generates a config.js file int the root folder

import os, json

class MakeConfig:
	TEST_FOLDERS = "./adapter/"
	CONFIG_NAME = "config.json"
	tests = {}

	def parse_json(self, path):
		json_data = ""
	
		# Read the file and save it as a string
		with open(path) as f:
			return json.load(f)

	def get_configs(self):
		return self.tests
	
	# Returns a dictionary with all tests
	def load_configs(self):
		for t in os.listdir(self.TEST_FOLDERS):
			if t == "example": continue
			filepath = self.TEST_FOLDERS + t + "/" + self.CONFIG_NAME
	
			# Check if there is a config.js file in that folder
			if not os.path.exists(filepath):
				continue
	
			# Parse that file
			test = self.parse_json(filepath)
	
			for t in test:
				self.tests[t["name"]] = t

	def write_to_file(self):
		# Write the config to CONFIG_NAME in ./
		with open("config.js", "w") as f:
			f.write("var testsData = " + json.dumps(self.tests))

# Run it when run as a program
if __name__ == '__main__':
	mc = MakeConfig()
	mc.load_configs()
	mc.write_to_file()
