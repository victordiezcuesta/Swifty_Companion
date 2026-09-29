const TOKEN_URL = 'https://api.intra.42.fr/oauth/token';

const clientId = process.env.EXPO_PUBLIC_UID_INTRA_42;
const clientSecret = process.env.EXPO_PUBLIC_SECRET_INTRA_42;

let accessToken: string | null = null;
let tokenExpiresAt = 0;

export async function getAccessToken(forceRefresh = false): Promise<string>
{
	if (!clientId || !clientSecret)
		throw new Error('Missing UID or SECRET in .env');

	const now = Date.now();

	if (!forceRefresh && accessToken && now < tokenExpiresAt) //Tengo un token y todavía es válido y lo reuso
		return accessToken;

	const response = await fetch(TOKEN_URL, {
		method: 'POST',
		headers: {
			'Content-Type': 'application/x-www-form-urlencoded',
		},
		body: `grant_type=client_credentials&client_id=${clientId}&client_secret=${clientSecret}`,
	});

	if (!response.ok)
		throw new Error(`Token error: ${response.status}`);

	const data = await response.json();

	accessToken = data.access_token;

	if (!accessToken)
		throw new Error('Token error: missing access_token');

	const expiresIn = Number(data.expires_in);

	if (!Number.isFinite(expiresIn) || expiresIn <= 0)
		throw new Error('Token error: invalid expires_in');

	tokenExpiresAt = now + (expiresIn - 60) * 1000; //el token es valido hasta un minuto antes de que expire
	
	//defensa
	/*tokenExpiresAt = now + 10 * 1000;
	console.log('expires_in de 42 en segundos:', data.expires_in);
	console.log('created_at:', data.created_at);
	console.log('Token nuevo:', accessToken);
	console.log('Caduca en:', new Date(tokenExpiresAt).toLocaleTimeString());*/

	return accessToken;
}