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

	# Unpack a specific test, always unpack to "path/test/"
	def unpack_test(self, path, tarname):
		# Is the file broken?
		if not tarfile.is_tarfile(self.SOURCES_ROOT + tarname):
			sys.stderr.write("Couldn't unpack " + tarname)
			return

		# Unpack the tar to the folder
		with tarfile.open(self.SOURCES_ROOT + tarname) as t:
			t.extractall(path + self.TEST_FOLDER)

		# Run a command in the adapters pathdir and use patchfile as stdin
		# -s on the patch command disables messages from the command
		with open(path + self.PATCH_FILE, "r") as patch_file:
			patch_file = open(path + self.PATCH_FILE, "r")
			command = "patch", "-sp0"
			p = subprocess.Popen(command, stdin=patch_file, cwd=path)
			p.wait()

		print "Sucessfully unpacked", tarname

	# Starts the unpacking of all tests
	def unpack(self):
		tests = self.mkconfig.get_configs()

		# Unpack all tests
		for k, v in tests.items():
			path = v["path"][1:]
			source = v["source"] if "source" in v else None

			# Skip it if there's no source specified
			if source == None:
				sys.stderr.write("No tarfile for test " + k + ". Skips...\n")
				continue

			self.unpack_test(path, source)

# Run it when run as a program
if __name__ == '__main__':
	x = MakeSources()
	x.unpack()
