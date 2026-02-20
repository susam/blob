help:
	@echo 'Usage: make pub'

clean:
	find . -name ".DS_Store" -exec rm {} +

index:
	sbcl --script index.lisp

reset:
	rm -rf .git
	git init
	git config user.name "Susam Pal"
	git config user.email "susam@susam.net"
	git remote add origin git@github.com:susam/blob.git
	git add .
	git commit -m "Reset repository and add blobs"
	du -sh .git

push:
	git push -f origin main

pub: clean index reset push
