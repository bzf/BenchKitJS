import os, tarfile, re, fileinput
from make_jslib import LibBundle

class UseLocalFiles:
	def __init__(self):
		self.LibBundle = LibBundle()
		self.jslib = "sources/jslib.tar"
		self.LibBundle.create_list()

	def unpack(self):
		# If the jslib-folder doesn't exist, create it
                if not os.path.exists(self.LibBundle.get_jslib()):
			os.makedirs(self.LibBundle.get_jslib())
                
		# Unpack jslib.tar into js-lib/
                if os.path.exists(self.LibBundle.get_tarfile()):
                        print "Review and move", self.LibBundle.get_jslib() + self.LibBundle.get_tarfile(), "to ", self.jslib
                        return False

		with tarfile.open(self.jslib) as t:
                        t.extractall(self.LibBundle.get_jslib())
                
                return True

	def replace_src(self, filename):
		levels_deep = filename.split("/")[:-1]
		for i in range(0, len(levels_deep)):
			if (levels_deep[i] == "adapter"):
				levels_deep = levels_deep[i:]
				continue

		prefix = "../" * len(levels_deep)

		# Rewrite all lines in the file
		for line in fileinput.input(filename, inplace=True):
			for newname, path in self.LibBundle.get_list():
				if path in line:
					line = re.sub(path, prefix + self.LibBundle.get_jslib() + newname, line)
                        print line,

		print "Updated", filename

	# Replace OKAY_URLs with local urls
	def replace_urls(self):
		with open(self.LibBundle.get_candidate_file(), "r") as f:
			files = f.readlines()

		[self.replace_src(x[:-1]) for x in files]

if __name__ == '__main__':
	ulf = UseLocalFiles()
	if ulf.unpack():
                ulf.replace_urls()
