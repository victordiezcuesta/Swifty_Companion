import { ActivityIndicator, Image, KeyboardAvoidingView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { useState } from 'react';
import { getAccessToken } from '../services/oauth';
import { getUser } from '../services/api';
import { User } from '../types';
import { colors, mono, radius } from '../theme';

export default function SearchScreen({ onFound }: { onFound: (user: User) => void })
{
	const [login, setLogin] = useState('');
	const [error, setError] = useState(''); //guardamos el mensaje de error
	const [loading, setLoading] = useState(false);
	const [focused, setFocused] = useState(false); //para resaltar el borde del input al escribir

	const handleSearch = async () =>
	{
		if (login.trim() === '')
		{
			setError('Please enter a login.');
			return;
		}
		setError('');//cuando el usuario sea valido limpiamos el error
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
		// El KeyboardAvoidingView sube el panel cuando aparece el teclado
		<KeyboardAvoidingView style={styles.container} behavior="padding">
			<StatusBar style="dark" />

			{/* Zona superior clara con el logo */}
			<View style={styles.hero}>
				<Image
					source={require('../../assets/logo-42madrid.png')}
					style={styles.logo}
					resizeMode="contain"
				/>
				<Text style={styles.brand}>SWIFTY COMPANION</Text>
			</View>

			{/* Panel oscuro con el formulario */}
			<View style={styles.sheet}>
				{/* Limitamos el ancho para que en tablets no quede estirado */}
				<View style={styles.form}>
					<Text style={styles.title}>Find a student</Text>
					<Text style={styles.subtitle}>
						Enter a 42 login to see their level, skills and projects.
					</Text>

					<View style={[styles.inputBox, focused && styles.inputBoxFocused]}>
						<Text style={styles.prefix}>@</Text>
						<TextInput
							style={styles.input}
							placeholder="login"
							placeholderTextColor={colors.muted}
							value={login} //guardamos el valor que introducimos en la variable login
							onChangeText={setLogin} //cada vez que escribamos algo actualizamos la variable login
							onFocus={() => setFocused(true)}
							onBlur={() => setFocused(false)}
							onSubmitEditing={handleSearch} //buscar con la tecla del teclado
							autoCapitalize="none"
							autoCorrect={false}
							returnKeyType="search"
						/>
					</View>

					{error !== '' && (
						<View style={styles.errorBox}>
							<Text style={styles.errorText}>{error}</Text>
						</View>
					)}

					<TouchableOpacity
						style={[styles.button, loading && styles.buttonDisabled]}
						onPress={handleSearch} //Cuando el usuario pulse este botón, ejecuta handleSearch
						disabled={loading}
						activeOpacity={0.85}
					>
						{loading
							? <ActivityIndicator color={colors.background} />
							: <Text style={styles.buttonText}>Search</Text>}
					</TouchableOpacity>

					<Text style={styles.footer}>Data from the 42 intra API</Text>
				</View>
			</View>
		</KeyboardAvoidingView>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: colors.paper,
	},
	hero: {
		flex: 1,
		alignItems: 'center',
		justifyContent: 'center',
		paddingHorizontal: 32,
	},
	logo: {
		width: '100%',
		maxWidth: 240,
		height: 100,
		tintColor: colors.background, //pinta el logo de negro aunque el PNG sea de otro color
	},
	brand: {
		marginTop: 16,
		fontSize: 12,
		fontFamily: mono,
		letterSpacing: 3,
		color: '#5B5F6B',
	},
	sheet: {
		backgroundColor: colors.background,
		borderTopLeftRadius: 32,
		borderTopRightRadius: 32,
		paddingHorizontal: 24,
		paddingTop: 32,
		paddingBottom: 36,
	},
	form: {
		width: '100%',
		maxWidth: 420,
		alignSelf: 'center',
	},
	title: {
		fontSize: 26,
		fontWeight: '800',
		color: colors.text,
		letterSpacing: -0.5,
	},
	subtitle: {
		fontSize: 14,
		lineHeight: 21,
		color: colors.muted,
		marginTop: 6,
		marginBottom: 24,
	},
	inputBox: {
		flexDirection: 'row',
		alignItems: 'center',
		height: 56,
		paddingHorizontal: 16,
		backgroundColor: colors.surface,
		borderWidth: 1,
		borderColor: colors.border,
		borderRadius: radius.md,
	},
	inputBoxFocused: {
		borderColor: colors.accent,
	},
	prefix: {
		fontSize: 18,
		fontFamily: mono,
		color: colors.accent,
		marginRight: 8,
	},
	input: {
		flex: 1,
		fontSize: 17,
		fontFamily: mono,
		color: colors.text,
	},
	errorBox: {
		backgroundColor: colors.dangerSoft,
		borderRadius: radius.sm,
		paddingVertical: 10,
		paddingHorizontal: 14,
		marginTop: 12,
	},
	errorText: {
		color: colors.danger,
		fontSize: 14,
	},
	button: {
		height: 56,
		backgroundColor: colors.accent,
		borderRadius: radius.md,
		alignItems: 'center',
		justifyContent: 'center',
		marginTop: 16,
	},
	buttonDisabled: {
		opacity: 0.6,
	},
	buttonText: {
		color: colors.background,
		fontSize: 16,
		fontWeight: '700',
	},
	footer: {
		textAlign: 'center',
		fontSize: 12,
		color: colors.muted,
		marginTop: 20,
	},
});