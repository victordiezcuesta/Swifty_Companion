import { useEffect, useState } from 'react';
import { BackHandler } from 'react-native';

import SearchScreen from './src/screens/SearchScreen';
import ProfileScreen from './src/screens/ProfileScreen';
import { User } from './src/types'; //importamos el array User donde tenemos el login, las moneditas, la localizacoio,...

export default function App()
{
	const [user, setUser] = useState<User | null>(null); //user puede ser User del types o null

	// El botón atrás de Android vuelve a la primera vista en vez de cerrar la app
	useEffect(() =>
	{
		const sub = BackHandler.addEventListener('hardwareBackPress', () =>
		{
			if (user)
			{
				setUser(null);
				return true; //devolvemos true para que android no intente cerrar la app
			}
			return false;
		});
		return () => sub.remove(); //limpiamosel listener que se proboca al pulsar para atras
	}, [user]);

	if (user)
		return <ProfileScreen user={user} onBack={() => setUser(null)} />;
	return <SearchScreen onFound={setUser} />;
}