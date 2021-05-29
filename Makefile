all: index reset

reset:
	mv .git/config gitconfig
	rm -rf .git
	git init
	mv gitconfig .git/config
	git add .
	git commit -m "Reset repository and add blobs"
	git push -f origin master

index:
	python3 index.py
