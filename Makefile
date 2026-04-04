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
	git remote add gh git@github.com:susam/blob.git
	git remote add cb git@codeberg.org:susam/blob.git
	git add .
	git commit -m "Reset repository and add blobs"
	du -sh .git

push:
	git push -f cb main:pages
	git push -f gh main

pub: clean index reset push
