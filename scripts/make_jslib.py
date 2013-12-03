import os, re, tarfile, fileinput, urllib2

class LibBundle():
	def __init__(self):
		self.TARFILE = "sources/jslib.tar"
		self.ADAPTERS = "adapter/"
		self.JSLIB = "js-lib/"
		self.js_files = []
		self.regex_links = re.compile("src=\"(.*\/(\d.*\d)\/?.*\/(.+\.js))\"")

	# Create a list of all the files we will download
	def create_list(self):
		print "Creating the list"
		for root, dirs, files in os.walk(self.ADAPTERS):
			for name in files:
				filename = os.path.join(root, name)
				for line in fileinput.FileInput(filename):
					match = self.regex_links.search(line)

					if match:
						filepath = match.group(1).strip()
						filename = match.group(3).strip().split(".")
						version = match.group(2).strip().replace(".", "-")

						new_name = filename[0] + "." + version
						new_name += "." + ".".join(filename[1:])

						# Don't add duplicates
						if not (new_name in [x for x,y in self.js_files]):
							self.js_files.append((new_name, filepath))
	
	def get_files(self):
		# If js-lib/ doesn't exist, create it
		if not os.path.exists(self.JSLIB):
			os.makedirs(self.JSLIB)

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
			[target.add(self.JSLIB + x) for x,y in self.js_files]

		print "Successfully packed", self.TARFILE

if __name__ == '__main__':
	lb = LibBundle()
	lb.create_list()
	lb.get_files()
	lb.tar_package()
