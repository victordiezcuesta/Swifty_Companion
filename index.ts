import { registerRootComponent } from 'expo';

// EXPO_PUBLIC_BONUS=1 lo activa el Makefile
const App = process.env.EXPO_PUBLIC_BONUS === '1'
	? require('./App.bonus').default
	: require('./App').default;

registerRootComponent(App);//usa App como componente raiz de mi appicacion