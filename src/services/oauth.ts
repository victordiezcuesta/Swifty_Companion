import * as AuthSession from 'expo-auth-session';

const clientId = process.env.EXPO_PUBLIC_42_CLIENT_ID;

const redirectUri = AuthSession.makeRedirectUri({
	scheme: 'swiftycompanion',
	path: 'oauth',
});

//URL utilizada para iniciar el proceso OAuth.
const authorizationUrl =
	`https://api.intra.42.fr/oauth/authorize` + //endpoint que utilizamos para iniciar la autorización OAuth
	`?client_id=${clientId}` + //el id de la aplicacion de la intra
	`&redirect_uri=${encodeURIComponent(redirectUri)}` + //despues del login vuelve a swiftycompanion://oauth | lo del enconde es porque usamos caracteres especiales como /
	`&response_type=code`; //Este parámetro le dice a 42 qué queremos recibir después de la autenticación

console.log('Redirect URI:', redirectUri);
console.log('Authorization URL:', authorizationUrl);