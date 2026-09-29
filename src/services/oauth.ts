const TOKEN_URL = 'https://api.intra.42.fr/oauth/token';
const clientId = process.env.EXPO_PUBLIC_UID_INTRA_42;
const clientSecret = process.env.EXPO_PUBLIC_SECRET_INTRA_42;

let accessToken: string | null = null; // iniciamos la variabke que es un string en null

export async function getAccessToken(): Promise<string>
{
	if (!clientId || !clientSecret)
		throw new Error('Missing UID or SECRET in .env');
	if (accessToken) //si tenemos ya un token lo reutilizamos
		return accessToken;

	const response = await fetch(TOKEN_URL, { //peticion http
		method: 'POST', //enviamos informacion
		headers: { 'Content-Type': 'application/x-www-form-urlencoded' }, //Interpreta el body como una lista de parametros clave=valor separados por &
		body: `grant_type=client_credentials&client_id=${clientId}&client_secret=${clientSecret}`, //enviamos credenciales de la aplicacion registrada en la intra en modo clave valor separado por &
	});

	if (!response.ok)
		throw new Error(`Token error: ${response.status}`);

	//guardamos el token que nos da 42
	const data = await response.json();
	accessToken = data.access_token;

	return accessToken!; // la ! es que le dices que en este punto accessToken ya no es nunca null
}