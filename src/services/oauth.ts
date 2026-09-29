const TOKEN_URL = 'https://api.intra.42.fr/oauth/token';
const clientId = process.env.EXPO_PUBLIC_42_CLIENT_ID;
const clientSecret = process.env.EXPO_PUBLIC_42_CLIENT_SECRET;

let accessToken: string | null = null;

export async function getAccessToken(): Promise<string>
{
	if (accessToken)
		return accessToken;

	const response = await fetch(TOKEN_URL, {
		method: 'POST',
		headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
		body: `grant_type=client_credentials&client_id=${clientId}&client_secret=${clientSecret}`,
	});

	if (!response.ok)
		throw new Error(`Token error: ${response.status}`);

	const data = await response.json();
	accessToken = data.access_token;
	return accessToken!;
}