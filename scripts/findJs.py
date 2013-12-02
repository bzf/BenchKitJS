import os
import fileinput
import re
filepath = "../adapter/"
path, file = os.path.split(os.path.realpath(filepath))
regex = re.compile("src=\"(http[s]*.+\/(.+js))")

jsFiles = set()
for root, dirs, files in os.walk(path):
    for name in files:       
        filename = os.path.join(root, name)
        for line in fileinput.FileInput(filename):
            match = regex.search(line)
            if match:
                url = match.group(1).strip()
                uName = match.group(2).strip()
                if url not in jsFiles:
                    print
                    print filename
                    print url
                    jsFiles.add(uName + ", " + url)
                    
fname = "jsList.txt"
with open(fname, "w") as f:
    for js in jsFiles:
        f.write(js + "\n")
            
print "Wrote result to: " + fname + "" 
