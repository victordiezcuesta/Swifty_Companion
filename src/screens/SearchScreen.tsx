import { StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { useState } from 'react';
import { getAccessToken } from '../services/oauth';
import { getUser } from '../services/api';
import { User } from '../types';

export default function SearchScreen({ onFound }: { onFound: (user: User) => void })
{
	const [login, setLogin] = useState('');
	const [error, setError] = useState(''); //guardamos el mensaje de error
	const [loading, setLoading] = useState(false);

	const handleSearch = async () =>
	{
		if (login.trim() === '')
		{
			setError('Please enter a login.');
			return;
		}
		setError('');//cuadno el usuario sea valido limpiamos el error
		setLoading(true);
		try
		{
			const token = await getAccessToken();
			const user = await getUser(login.trim(), token);
			onFound(user);
		}
		catch (error)
		{
			if (error instanceof Error && error.message === 'USER_NOT_FOUND')
				setError('User not found.');
			else if (error instanceof TypeError)
				setError('Network error. Check your connection.');
			else
				setError('Something went wrong. Try again.');
			console.error(error);
		}
		finally
		{
			setLoading(false);
		}
	};

	return (
		<View style={styles.container}>
			<Text style={styles.title}>Swifty Companion</Text>

			<Text style={styles.subtitle}>
				Search for a 42 student
			</Text>

			<TextInput
				style={styles.input}
				placeholder="Enter login..."
				placeholderTextColor="#999"
				value={login} //guardamos el valor  que introducimos en la variable login
				onChangeText={setLogin} //cada vez que escribamos algo actualizamos la variable login
			/>

			{error !== '' && (
				<Text style={styles.error}>{error}</Text>
			)}

			<TouchableOpacity
				style={styles.button}
				onPress={handleSearch} //Cuando el usuario pulse este botón, ejecuta handleSearch
				>
				<Text style={styles.buttonText}>SEARCH</Text>
			</TouchableOpacity>
		</View>
		);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: '#fff',
		alignItems: 'center',
		justifyContent: 'center',
		padding: 20,
	},

	title: {
		fontSize: 32,
		fontWeight: 'bold',
		marginBottom: 10,
	},

	subtitle: {
		fontSize: 18,
		color: '#666',
		marginBottom: 30,
	},

	input: {
		width: '100%',
		maxWidth: 400,
		height: 50,
		borderWidth: 1,
		borderColor: '#ccc',
		borderRadius: 8,
		paddingHorizontal: 15,
		fontSize: 16,
		marginBottom: 15,
	},

	button: {
		width: '100%',
		maxWidth: 400,
		height: 50,
		backgroundColor: '#000',
		borderRadius: 8,
		alignItems: 'center',
		justifyContent: 'center',
	},

	buttonText: {
		color: '#fff',
		fontSize: 16,
		fontWeight: 'bold',
	},

	error: {
		color: 'red',
		marginBottom: 15,
	},
});