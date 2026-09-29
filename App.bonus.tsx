import { useEffect, useState } from 'react';
import { BackHandler } from 'react-native';

import SearchScreen from './bonus/screens/SearchScreen';
import ProfileScreen from './bonus/screens/ProfileScreen';
import { User } from './bonus/types';

export default function App()
{
	const [user, setUser] = useState<User | null>(null);

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