import { Platform, StatusBar } from 'react-native';

export const colors = {
	paper: '#ECEDF0',
	background: '#0A0B0F',
	surface: '#14161C',
	surfaceAlt: '#1B1E26',
	border: '#242833',
	text: '#ECEDEF',
	muted: '#8A8F9C',
	accent: '#00BABC',
	accentSoft: 'rgba(0, 186, 188, 0.12)',
	success: '#34D399',
	successSoft: 'rgba(52, 211, 153, 0.12)',
	danger: '#F87171',
	dangerSoft: 'rgba(248, 113, 113, 0.12)',
};

export const radius = { sm: 8, md: 12, lg: 18 };

// adaptamos depende la plataforma
export const mono = Platform.select({
	ios: 'Menlo',
	android: 'monospace'
});

// es el espacio que dejamos que es la barra de notificaiones del movil
export const TOP_INSET = Platform.OS === 'android'
	? (StatusBar.currentHeight ?? 24) + 6
	: 54;