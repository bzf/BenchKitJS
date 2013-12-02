import os, urllib2

JS_FILE = "jsList.txt"
PATH = "../js-lib/"

def read_js_file():
    with open(JS_FILE) as jsfile:
        lines = jsfile.readlines()

    for line in lines:
        line = line.rstrip('\n')
        if not line == "done":
            print line
            line = line.split(", ")
            url = line[1]
            filename = line[0]
        
            response = urllib2.urlopen(url)
            content_js = response.read()
        
            with open(PATH + filename, 'w') as f:
                f.write(content_js)


read_js_file()





