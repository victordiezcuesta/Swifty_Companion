.PHONY: start cluster bonus bonus-cluster

start:
	EXPO_PUBLIC_BONUS=0 npm run start --dev-client -c

cluster:
	adb reverse tcp:8081 tcp:8081
	EXPO_PUBLIC_BONUS=0 npx expo start --dev-client --localhost -c

bonus:
	EXPO_PUBLIC_BONUS=1 npm run start --dev-client -c

bonus-cluster:
	adb reverse tcp:8081 tcp:8081
	EXPO_PUBLIC_BONUS=1 npx expo start --dev-client --localhost -c
