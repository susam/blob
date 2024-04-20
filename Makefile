help:
	@echo 'Usage: make pub'

clean:
	find . -name ".DS_Store" -exec rm {} +

index:
	sbcl --script index.lisp

reset:
	git config user.name > /tmp/user.name
	git config user.email > /tmp/user.email
	rm -rf .git
	git init
	git config user.name "$$(cat /tmp/user.name)"
	git config user.email "$$(cat /tmp/user.email)"
	git remote add origin git@github.com:susam/blob.git
	git add .
	git commit -m "Reset repository and add blobs"
	du -sh .git

push:
	git push -f origin main

pub: clean index reset push
