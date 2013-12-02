#! coding: utf-8

# Iterates over all the config.json-files of the tests and
# unpacks + patches the adapters.

import os, tarfile, sys, subprocess
from make_config import MakeConfig

class MakeSources:
	def __init__(self):
		self.TEST_FOLDER = "test/"
		self.PATCH_FILE = "test.patch"
		self.SOURCES_ROOT = "./sources/"
		self.mkconfig = MakeConfig()
		self.PREFIX = " " * 4

	# Unpack a specific test, always unpack to "path/test/"
	def unpack_test(self, path, tarname, prepatch=None):
		# Is the file broken?
		if not tarfile.is_tarfile(self.SOURCES_ROOT + tarname):
			sys.stderr.write(self.PREFIX + "Couldn't unpack " + tarname)
			return

		# Unpack the tar to the folder
		with tarfile.open(self.SOURCES_ROOT + tarname) as t:
			t.extractall(path + self.TEST_FOLDER)
		print self.PREFIX, "Sucessfully unpacked", tarname

		if not prepatch == None:
			print self.PREFIX, "Pre-patch commands found!"

			# Run the commands in the context of the tests' folder
			# prepatch are in pairs command:context. All contexts prepends
			# with the adapters folder
			for p in prepatch:
				print self.PREFIX, "Executing:", p["cmd"], "in", path
				p = subprocess.Popen(p["cmd"].split(" "), cwd=path + p["context"])
				p.wait()

		# Check if the patch-file exists
		if not os.path.exists(path + self.PATCH_FILE):
			sys.stderr.write(self.PREFIX + " Not patching " + tarname + 
					" (no patchfile)\n")
			return

		# Run a command in the adapters pathdir and use patchfile as stdin
		# -s on the patch command disables messages from the command
		with open(path + self.PATCH_FILE, "r") as patch_file:
			patch_file = open(path + self.PATCH_FILE, "r")
			command = "patch", "-sp0"
			p = subprocess.Popen(command, stdin=patch_file, cwd=path)
			p.wait()


	# Starts the unpacking of all tests
	def unpack(self):
		tests = self.mkconfig.get_configs()

		# Unpack all tests
		for k, v in tests.items():
			path = v["path"][1:]
			source = v["source"] if "source" in v else None

			# Skip it if there's no source specified
			if source == None:
				sys.stderr.write("Skipping " + k + " (no *.tar.gz)\n")
				continue

			prepatch = v["pre-patch"] if "pre-patch" in v.keys() else None

			print "Extracting", k
			self.unpack_test(path, source, prepatch)

# Run it when run as a program
if __name__ == '__main__':
	x = MakeSources()
	x.unpack()
