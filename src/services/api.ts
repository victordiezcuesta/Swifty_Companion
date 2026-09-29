const API_URL = 'https://api.intra.42.fr/v2';

export async function getUser(login: string, accessToken: string)
{
	const response = await fetch(`${API_URL}/users/${login}`, {
		headers: {
			Authorization: `Bearer ${accessToken}`,
		},
	});

	if (!response.ok)
	{
		throw new Error(`API error: ${response.status}`);
	}

	return response.json();
}