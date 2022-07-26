import subprocess
from subprocess import PIPE
import sys
import os

query = "{query}"
queries = query.split()
sys.stderr.write(queries)


project_name = queries[0]
content = queries[1]



sys.stderr.write(project_name)
sys.stderr.write(content)
command = "NOTION_API_KEY=secret_g7QAvurBg79HwmnzPhqClz56Vp88K7WweLR1crJd2Qk /Users/reon.nishimura/.nodenv/shims/node /Users/reon.nishimura/.ghq/src/github.com/ashigirl96/notion-example/dist/forgettable_words/index.js {} {}".format(project_name, content) 
sys.stderr.write(command)
os.system(command)
# proc = subprocess.call(command)
# print(proc.stdout)
