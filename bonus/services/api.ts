const API_URL = 'https://api.intra.42.fr/v2';

export async function getUser(login: string, accessToken: string)
{
	const response = await fetch(
		`${API_URL}/users/${encodeURIComponent(login.toLowerCase())}`,
		{
			headers: {
				Authorization: `Bearer ${accessToken}`,
			},
		}
	);

	if (response.status === 404)
		throw new Error('USER_NOT_FOUND');

	if (response.status === 401)
		throw new Error('TOKEN_EXPIRED');

	if (!response.ok)
		throw new Error(`API error: ${response.status}`);

	return response.json();
}