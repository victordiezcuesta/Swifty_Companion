.PHONY: start android ios web

start:
	npm run start

android:
	npm run android

clean:
	rm -rf .expo

fclean: clean
	rm -rf node_modules
	rm -f package-lock.json