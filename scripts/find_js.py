import os
import fileinput
import re

class FindJS:
	def __init__(self):
		self.filepath = "./adapter/"
		self.path, file = os.path.split(os.path.realpath(filepath))
		self.regex = re.compile("src=\"(http[s]*.+\/(.+js))")
		self.list_name = "scripts/js_list.txt"
		self.jsFiles = []
		self.run()

	def get_list(self):
		return self.jsFiles;

	def run(self):
		for root, dirs, files in os.walk(path):
		    for name in files:       
		        filename = os.path.join(root, name)
		        for line in fileinput.FileInput(filename):
		            match = regex.search(line)
		            if match:
		                url = match.group(1).strip()
		                uName = match.group(2).strip()
		                if url not in jsFiles:
		                    jsFiles.add(uName + ", " + url)

	def write_to_file(self):
		with open(fname, "w") as f:
		    [f.write(js + "\n") for js in found.get_list()]
                    
if __name__ == '__main__':
	found = FindJS()
	found.write_to_files()
