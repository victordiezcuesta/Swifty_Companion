.PHONY: start cluster android ios web clean fclean

start:
	npm run start --dev-client

cluster:
	adb reverse tcp:8081 tcp:8081
	npx expo start --dev-client --localhost

android:
	npm run android

clean:
	rm -rf .expo

fclean: clean
	rm -rf node_modules