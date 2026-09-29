import { useEffect, useState } from 'react';
import { BackHandler } from 'react-native';
import SearchScreen from './src/screens/SearchScreen';
import ProfileScreen from './src/screens/ProfileScreen';
import { User } from './src/types';

export default function App()
{
	const [user, setUser] = useState<User | null>(null);

	// El botón atrás de Android vuelve a la primera vista en vez de cerrar la app
	useEffect(() =>
	{
		const sub = BackHandler.addEventListener('hardwareBackPress', () =>
		{
			if (user)
			{
				setUser(null);
				return true;
			}
			return false;
		});
		return () => sub.remove();
	}, [user]);

	if (user)
		return <ProfileScreen user={user} onBack={() => setUser(null)} />;
	return <SearchScreen onFound={setUser} />;
}