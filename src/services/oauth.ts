import * as AuthSession from 'expo-auth-session';

const clientId = process.env.EXPO_PUBLIC_42_CLIENT_ID;
const redirectUri = AuthSession.makeRedirectUri({
	scheme: 'swiftycompanion',
	path: 'oauth',
});
console.log('REDIRECT URI:', redirectUri);

const discovery = {
	authorizationEndpoint: 'https://api.intra.42.fr/oauth/authorize',
};

export async function loginWith42()
{
	const request = new AuthSession.AuthRequest({
		clientId: clientId!,
		redirectUri,
		responseType: AuthSession.ResponseType.Code,
	});

	const result = await request.promptAsync(discovery);

	console.log('OAuth result:', result);

	if (result.type !== 'success')
		throw new Error('OAuth login failed');

	const code = result.params.code;

	console.log('Authorization code:', code);

	return code;
}