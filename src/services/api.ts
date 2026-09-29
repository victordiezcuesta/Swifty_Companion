const API_URL = 'https://api.intra.42.fr/v2'; //la api que estamos consultando

export async function getUser(login: string, accessToken: string)
{
	//encodeURIComponent por si hubiera caracteres especiales
	const response = await fetch(`${API_URL}/users/${encodeURIComponent(login.toLowerCase())}`, {
		headers: {
			Authorization: `Bearer ${accessToken}`, //la peticion la hago mediante esta autentificacoin de token
		},
	});

	if (response.status === 404)
		throw new Error('USER_NOT_FOUND');
	if (!response.ok)
		throw new Error(`API error: ${response.status}`);

	//log del json
	/*const data = await response.json();
	console.log(JSON.stringify(data));
	//console.log(JSON.stringify(data, null, 2));
	return data;*/

	return response.json();
}