import os, re, tarfile, fileinput, urllib2

class LibBundle:
	def __init__(self):
		self.TARFILE = "js-lib/jslib.tar"
		self.ADAPTERS = "adapter/"
		self.JSLIB = "js-lib/"
		self.CANDIDATE_FILE = self.JSLIB + "candidate.txt"
		self.js_files = []
		self.potential_files = []
		self.regex_links = re.compile("src=\"(http[s]?:\/\/.*\/(\d.*\d)\/?.*\/(.+\.js))\"")

	# Create a list of all the files we will download
	def create_list(self):
		for root, dirs, files in os.walk(self.ADAPTERS):
			for name in files:
				filename = os.path.join(root, name)
				for line in fileinput.FileInput(filename):
					match = self.regex_links.search(line)
                                        
					if match:
						# Add the filename so we know what files to replace
						if not filename in self.potential_files:
							self.potential_files.append(filename)

						filepath = match.group(1).strip()
						filename = match.group(3).strip().split(".")
						version = match.group(2).strip().replace(".", "-")

						new_name = filename[0] + "." + version
						new_name += "." + ".".join(filename[1:])

						# Don't add duplicates
						if not (new_name in [x for x,y in self.js_files]):
							self.js_files.append((new_name, filepath))
                                                        

        def write_candidate(self):
		# If js-lib/ doesn't exist, create it
		if not os.path.exists(self.JSLIB):
			os.makedirs(self.JSLIB)

		# Create a file with all potential files
		with open(self.CANDIDATE_FILE, "w") as f:
			[f.write(x + "\n") for x in self.potential_files]
		print "Created", self.CANDIDATE_FILE

	def get_candidate_file(self):
		return self.CANDIDATE_FILE

	def get_list(self):
		return self.js_files

	def get_regex_links(self):
		return self.regex_links

	def get_jslib(self):
		return self.JSLIB;

        def get_tarfile(self):                
                return self.TARFILE;

	def get_files(self):
		for name, path in self.js_files:
			connection = urllib2.urlopen(path)
			content = connection.read()

			print "Downloaded", path

			with open(self.JSLIB + name, "w") as f:
				f.write(content)

	# Create a tar with all these files. If it exists, overwrite it
	def tar_package(self):
		with tarfile.open(self.TARFILE, "w") as target:
			# Add all the files from JSLIB
			[target.add(self.JSLIB + x, arcname=x) for x,y in self.js_files]

		print "Successfully packed", self.TARFILE

        # Remove .js files in jslib folder
        def remove_js_files(self):
                [os.remove(self.JSLIB + x) for x,y in self.js_files]

if __name__ == '__main__':
	lb = LibBundle()
	lb.create_list()
        lb.write_candidate()
	lb.get_files()
	lb.tar_package()
        lb.remove_js_files()
